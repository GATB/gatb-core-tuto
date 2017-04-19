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
  Kmer<span>::ModelDirect model (kmerSize);

  /* and we create a corresponding kmer iterator */
  Kmer<span>::ModelDirect::Iterator itKmer (model);

  /* we open the sequence file for which we want to get kmers */
  IBank * inbank = Bank::open(argv[1]);

  /* let us iterate over all sequences from that file */
  Iterator<Sequence>* it = inbank->iterator();

  for (it->first(); !it->isDone(); it->next()){
    Sequence& seq = it->item();

    /* print the sequence */
    std::cout << seq.toString() << std::endl;

    /* so, we have a kmer iterator (itKmer)
     * but it needs to know which sequences to iterate kmers from 
     * the following line sets the data of the kmer iterator
     * to be the data of the sequences iterator
     */
    itKmer.setData ((*it)->getData());

    /* we iterate over all kmers contained in our sequence */
    for (itKmer.first(); !itKmer.isDone(); itKmer.next()){
      /* print the kmer. This line also shows how to convert 
       * a kmer to its corresponding sequence. Indeed, GATB
       * uses a binary representation to reduce memory 
       * footprint.
       */
      cout << model.toString (itKmer->value()) << endl;
    }
  }
}
