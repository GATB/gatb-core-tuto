# About

Contains the elements going on the GATB-Compiler Linux VM hosted on the A||GO Platform.

# GATB-Core version

This tutorial relies on release v1.2.2 of GATB-Core library. Fore more information about
the exact source code of GATB-Core used by the tutorial, please refer to file 'global.js'
located in [client/js](https://github.com/GATB/gatb-core-tuto/blob/master/client/js); see
declaration: GATB_RELEASE="b1.2.2".


# Test

Script 'gatbcompiler.sh' can be used for testing/debugging purposes as follows:

    [open an SSH connection to GATB-Compiler VM]
    cd /home/allgo
    ./gatbcompiler.sh -s code_sample/bank1.cpp -d fasta_small

Log files are created in the /tmp directory.
