
#include <gatb/gatb_core.hpp>
#include <iostream>

static const size_t span =  32;

bool verbose = false;
int kmerSize = 31;

/** 
  * Prepare a unique temporary file name to write out sequences.
  */
string getOutFileName(){
  struct timeval tp;
  gettimeofday(&tp, NULL);
  long long mslong = (long long) tp.tv_sec * 1000L + tp.tv_usec / 1000; //get current timestamp in milliseconds
  string fN = "outbank_";
  fN.append(to_string(mslong));
  return fN;
}

/** 
  * Start program here.
  */
int main (int argc, char* argv[])
{
  
  if(argc != 2)
  {
    printf("%s filename\n",argv[0]);
    exit(1);
  }
  
  // We get the sequence file name from the user arguments
  const char* filename = argv[1] ;
  
  // Open the source file to read sequences
  IBank * inbank = Bank::open(filename);
  // Open a target file to write sequences
  IBank*  outBank = new BankFasta (getOutFileName());
  
  
  ///////////////  TODO  create graph here ////////////
  
  
  //To get kmers from sequences, we need:
  // 1- a kmer model with a given span size.
  Kmer<span>::ModelCanonical model (kmerSize);
  // 2- a kmer iterator
  Kmer<span>::ModelCanonical::Iterator itKmer (model);
  
  // We loop over sequences from source file.
  Iterator<Sequence>* it = inbank->iterator();
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