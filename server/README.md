#About

Contains the elements going on the GATB-Compiler Linux VM hosted on the A||GO Platform.

#Test

Script 'gatbcompiler.sh' can be used for testing/debugging purposes as follows:

    [open an SSH connection to GATB-Compiler VM]
    cd /home/allgo
    ./gatbcompiler.sh -s code_sample/bank1.cpp -d fasta_small

Log files are created in the /tmp directory.