#include <gatb/gatb_core.hpp>

int main (int argc, char* argv[]){
  
  /* we expect a sequence file name on the cmd-line*/
  if(argc != 2){
    printf("%s filename\n",argv[0]);
    exit(1);
  }
  
  /* we open that file to read sequences from */
  IBank * inbank = Bank::open(argv[1]);

  /* we iterate over sequences from inout file */
  Iterator<Sequence>* it = inbank->iterator();
  for (it->first(); !it->isDone(); it->next()){
    /* we display some sequence data on standard output (console) */
    Sequence& seq = it->item();
    /* sequence size and comment (i.e. header) */
    std::cout << "[" << seq.getDataSize() << "] " << seq.getComment()  << std::endl;
    /* sequence itself (i.e. nucleotides) */
    std::cout << seq.toString() << std::endl;
  }

}