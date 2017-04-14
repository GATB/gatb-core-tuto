#include <gatb/gatb_core.hpp>

int main (int argc, char* argv[]){
  /* we expect a sequence file name on the cmd-line*/
  if(argc != 2){
    printf("%s filename\n",argv[0]);
    exit(1);
  }

  /* we open that file to read sequences from */
  IBank * inbank = Bank::open(argv[1]);
  /* we open a second file to write sequences.
   * Using BankFasta means we create a fasta file
   */
  IBank*  outBank = new BankFasta ("outbank");

  /* we iterate over sequences from inout file */
  Iterator<Sequence>* it = inbank->iterator();
  for (it->first(); !it->isDone(); it->next()){
    /* we write the sequence into the new bank */
    Sequence& seq = it->item();
    outBank->insert (seq);
  }
  /* do not forget to flush content */
  outBank->flush();
}