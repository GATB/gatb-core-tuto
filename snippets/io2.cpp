#include <gatb/gatb_core.hpp>

int main (int argc, char* argv[]){
  
  /* we expect a sequence file name on the cmd-line*/
  if(argc != 2){
    printf("%s filename\n",argv[0]);
    exit(1);
  }
  
  /* we open that file to read sequences from */
  IBank * inbank = Bank::open(argv[1]);

  /* we get bank information */
  int64_t   nbseq = inbank ->estimateNbItems ();
  u_int64_t totalsize =   inbank ->estimateSequencesSize ();
  std::cout  << "# sequences: " << nbseq     << std::endl;
  std::cout  << "# letters: "   << totalsize << std::endl;

}