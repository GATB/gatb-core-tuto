#!/bin/bash
#*****************************************************************************************
# GATB-compiler script.
#
# This script compile and run a GATB-based c++ source code on the A||GO platform. 
# 
# Usage:
#   use option -h
# 
# Author: Patrick Durand, Inria
# Created: October 2016
#*****************************************************************************************

# !!!! WARNING !!!!
# This script does not produce any output on stdout, but only in a log file
# denoted by ${COMP_LOG_FILE} and ${EXEC_LOG_FILE} variables.
COMP_LOG_FILE=/tmp/compile.log
EXEC_LOG_FILE=/tmp/output.log
echo "check for info/error messages, if any, in: ${COMP_LOG_FILE}"

# for debugging only
# set -xv

# ------------------------------------------------------------------------
# Some variables to store environment
# ------------------------------------------------------------------------
# Home of GATB-Compiler app
ALLGO_SCRIPT_DIR=$( cd -P -- "$(dirname -- "$(command -v -- "$0")")" && pwd -P )
# Home of compiled GATB-Core library
GATB_HOME=/opt/gatb-core-1.2.2-bin-Linux
# Authorised directory for execution
EXEC_DIR=${ALLGO_SCRIPT_DIR}
# All source codes are compiled to produce this binary
PRGM_NAME=gatb-bin
# Home of data sets
DATA_SET_HOME=${EXEC_DIR}/data
# Data set mapping file
DATA_SET_MAPPER=${DATA_SET_HOME}/data-file-mapper.txt

ALL_ARGS=("$@")
NB_ALL_ARGS=${#ALL_ARGS[@]}

# ------------------------------------------------------------------------
# Some variables to handle command-line arguments
# ------------------------------------------------------------------------
# source code file
SOURCE=""
# key name of data-set to use during code execution. Default is fasta_small.
DATA_SET_KEY="fasta_small"
# corresponding entry from $DATA_SET_MAPPER file
DATA_SET_ENTRY=""
# corresponding data set path
DATA_SET_FILE=""
# optional additional arguments
CMD_ARGS=""

# ------------------------------------------------------------------------
# Some error codes
# ------------------------------------------------------------------------
ERR_MISSING_ARG=1
ERR_UNKNOWN_DATA_SET=2
ERR_COMPILING=3
ERR_EXECUTION=4

# ------------------------------------------------------------------------
# FUNCTION: display help message
# ------------------------------------------------------------------------
function help(){
	printf "\n$0: a tool to compile and run GATB-based c++ code.\n\n"
  printf "usage: $0 [-h] [-d <data-set-key>] [-a \"<cmdline>\"] -s <source_code>\n"
  printf "\n"
  printf "  -s <value>   : path to a source code. Mandatory.\n"
  printf "  -d <value>   : key name of a data-set.\n"
  printf "  -a \"<value>\" : additional cmdline arguments.\n" 
  printf "  -h           : this message.\n"
  printf "\n"
  exit 0
}

# ------------------------------------------------------------------------
# Prepare arguments for processing
# ------------------------------------------------------------------------
while getopts hs:d:a: opt
do
    case "$opt" in
      s)  SOURCE="$OPTARG";;
      d)  DATA_SET_KEY="$OPTARG";;
      a)  CMD_ARGS="$OPTARG";;
      h)  help;;
      \?)	help;;
    esac
done
shift `expr $OPTIND - 1`

# Start processing, open log file
echo "**********************************************************************************" > $COMP_LOG_FILE
echo "*** PREPARING ENVIRONMENT" >> $COMP_LOG_FILE
echo ""  >> $COMP_LOG_FILE
#echo "Provided arguments are:"  >> $COMP_LOG_FILE
#for (( i=0;i<$NB_ALL_ARGS;i++)); do 
#    echo "  ${ALL_ARGS[${i}]}"  >> $COMP_LOG_FILE
#done
#echo ""  >> $COMP_LOG_FILE

# ------------------------------------------------------------------------
#Do we have all mandatory arguments ?
# ------------------------------------------------------------------------
mandatory_params=( "-s" )
mandatory_values=( "$SOURCE" )
for ((i=0;i<${#mandatory_params[@]};++i)); do
  if [ -z "${mandatory_values[i]}" ]; then
    echo "[ERROR:${ERR_MISSING_ARG}] - Missing mandatory argument: ${mandatory_params[i]}" >> $COMP_LOG_FILE
    echo "    use option -h to get help." >> $COMP_LOG_FILE
    exit 1
  fi
done

echo "   source: $SOURCE" >> $COMP_LOG_FILE

# ------------------------------------------------------------------------
#Do we have an existing data-set?
# ------------------------------------------------------------------------
echo " data-map: $DATA_SET_MAPPER" >> $COMP_LOG_FILE
if [ ! -e "${DATA_SET_MAPPER}" ]; then
  echo "[ERROR:${ERR_UNKNOWN_DATA_MAPPER}] - Unknown data-set mapper: ${DATA_SET_MAPPER}" >> $COMP_LOG_FILE
  exit 1
fi

echo " data-set: $DATA_SET_KEY" >> $COMP_LOG_FILE

if [ "${DATA_SET_KEY}" != "none" ]; then
  DATA_SET_ENTRY=`cat ${DATA_SET_MAPPER} | grep -e "^${DATA_SET_KEY}="`

  if [ -z "${DATA_SET_ENTRY}" ]; then
    echo "[ERROR:${ERR_UNKNOWN_DATA_SET}] - Unknown data-set: ${DATA_SET_KEY}" >> $COMP_LOG_FILE
    exit 1
  fi

  DATA_SET_FILE=`echo ${DATA_SET_ENTRY} | cut -d '=' -f 2`
fi


echo "data-file: $DATA_SET_FILE" >> $COMP_LOG_FILE

if [ ! -z "${CMD_ARGS}" ]; then
  CMD_ARGS=$(echo $CMD_ARGS | sed -e "s|#|\ |g")  
  echo " cmd-line: $CMD_ARGS" >> $COMP_LOG_FILE
fi

# Start processing
echo ""  >> $COMP_LOG_FILE
echo "**********************************************************************************" >> $COMP_LOG_FILE
echo "*** COMPILING: $SOURCE" >> $COMP_LOG_FILE
echo ""  >> $COMP_LOG_FILE

# Prepare the compile command in to a variable
GATB_CMD="g++ $SOURCE -I$GATB_HOME/include -L$GATB_HOME/lib -Llib -lgatbcore -lhdf5 -ldl -lz -lpthread  -static -static-libgcc -static-libstdc++ -std=c++0x -O3 -o /tmp/$PRGM_NAME"

# report cmd to user, so that he/she knows how to compile code using gatb
echo $GATB_CMD >> $COMP_LOG_FILE 2>&1

# Execute the compile command
$GATB_CMD >> $COMP_LOG_FILE 2>&1

# Compile ok?
if [ "$?" != "0" ]; then
  echo "[ERROR:${ERR_COMPILING}] - Cannot compile code. Fix above errors." >> $COMP_LOG_FILE 2>&1 
  exit 1
fi

echo "" >> $COMP_LOG_FILE 2>&1
echo "[SUCCESS]" >> $COMP_LOG_FILE 2>&1
echo "" >> $COMP_LOG_FILE 2>&1

echo "**********************************************************************************" > $EXEC_LOG_FILE 2>&1
echo "*** RUNNING PROGRAM" >> $EXEC_LOG_FILE 2>&1 
echo "" >> $EXEC_LOG_FILE 2>&1

# On ALLGO, binary cannot be executed in tmp, so we use $EXEC_DIR
cp /tmp/$PRGM_NAME $EXEC_DIR
cd $EXEC_DIR
# Ensure execution flag is set
chmod +x $EXEC_DIR/$PRGM_NAME 

# do we have additonal cmd line arguments?
if [ ! -z "${CMD_ARGS}" ]; then
  CMD_LINE=$(echo $CMD_ARGS | sed -e "s|@DATA_FILE@|${DATA_SET_FILE}|g")
  GATB_CMD="./$PRGM_NAME $CMD_LINE"
else
  GATB_CMD="./$PRGM_NAME $DATA_SET_FILE"
fi

echo $GATB_CMD >> $EXEC_LOG_FILE 2>&1
echo "" >> $EXEC_LOG_FILE 2>&1
$GATB_CMD >> $EXEC_LOG_FILE 2>&1

# Execution ok?
if [ "$?" != "0" ]; then
  echo "[ERROR:${ERR_EXECUTION}] - Cannot execute GATB application. Review above errors." >> $EXEC_LOG_FILE 2>&1
  exit 1
fi

echo "" >> $EXEC_LOG_FILE 2>&1
echo "[SUCCESS]" >> $EXEC_LOG_FILE 2>&1
echo "" >> $EXEC_LOG_FILE 2>&1
