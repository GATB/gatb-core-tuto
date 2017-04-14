/* we include GATB-Core API */
#include <gatb/gatb_core.hpp>

/* we setup the kmer model */
static const size_t span =  32;
int kmerSize = 31;

int main (int argc, char* argv[]){
  /* we expect a sequence file name on the cmd-line*/
  if(argc != 2){
    printf("%s filename\n",argv[0]);
    exit(1);
  }

  /* we declare a kmer model */
  
  /*** USE ModelCanonical here ***/
  Kmer<span>::ModelDirect model (kmerSize);
  Kmer<span>::ModelDirect::Iterator itKmer (model);

  /* we open the sequence file for which we want to get kmers */
  IBank * inbank = Bank::open(argv[1]);

  /* let us iterate over all sequences from that file */
  Iterator<Sequence>* it = inbank->iterator();

  for (it->first(); !it->isDone(); it->next()){
    Sequence& seq = it->item();

    /* print the sequence */
    std::cout << seq.toString() << std::endl;

    /* wet provide our kmer model ietrator with the sequence 
     * from which we want to extract kmers.
     */
    itKmer.setData ((*it)->getData());

    /* we iterate over all kmers contained in our sequence */
    for (itKmer.first(); !itKmer.isDone(); itKmer.next()){
      /* print the kmer */
      cout << model.toString (itKmer->value()) << endl;
      
       /*** ADD YOUR CODE HERE ***/

    }
  }
}
