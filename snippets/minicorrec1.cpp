
#include <gatb/gatb_core.hpp>
#include <iostream>

static const size_t span =  32;

bool verbose = false;
int kmerSize = 31;

int main (int argc, char* argv[])
{
  
  if(argc != 2)
  {
    printf("%s filename\n",argv[0]);
    exit(1);
  }
  
  // We get the file name from the user arguments
  const char* filename = argv[1] ;
  
  IBank * inbank = Bank::open(filename);
  IBank*  outBank = new BankFasta ("outbank");
  
  
  ///////////////  TODO  create graph here ////////////
  
  
  //simple iterator
  Iterator<Sequence>* it = inbank->iterator();
  
  //or wrapped with a progress iterator
  //ProgressIterator<Sequence> *it = new ProgressIterator<Sequence> (*inbank, "Iterating sequences");
  
  //for kmerisation
  // We declare a kmer model with a given span size.
  Kmer<span>::ModelCanonical model (kmerSize);
  
  // We declare a kmer iterator
  Kmer<span>::ModelCanonical::Iterator itKmer (model);
  
  // We loop over sequences.
  for (it->first(); !it->isDone(); it->next())
  {
    // Shortcut
    Sequence& seq = it->item();
    
    if (verbose)
    {
      // We dump the data size and the comment
      std::cout << "[" << seq.getDataSize() << "] " << seq.getComment()  << std::endl;
      
      // We dump the data
      std::cout << seq.toString() << std::endl;
    }
    
    ///////////////  TODO  iterate over kmer here////////////
    
    
    outBank->insert (seq);
  }
  
  outBank->flush();
}