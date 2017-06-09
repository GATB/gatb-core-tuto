
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
  
  Graph graph = Graph::create (" -in %s -abundance-min %d  -kmer-size %d -verbose %d", 
    argv[1], 3, kmerSize, (verbose ? 1 : 0) );
  if(verbose)
    std::cout << graph.getInfo() << std::endl;

  //for information, print bank size (not exact numbers, only estimation from extrapolation)
  u_int64_t  nbseq = inbank->estimateNbItems();
  u_int64_t totalsize =  inbank->estimateSequencesSize();
  std::cout << "#sequences: " << nbseq << " - #nucleotides: " << totalsize << std::endl;
  
  //To get kmers from sequences, we need:
  // 1- a kmer model with a given span size.
  Kmer<span>::ModelCanonical model (kmerSize);
  // 2- a kmer iterator
  Kmer<span>::ModelCanonical::Iterator itKmer (model);
  
  // we declare some utility variables
  int64_t nb_simple_error_corrected=0;
  int gap_size=0;

  // We loop over sequences from source file.
  Iterator<Sequence>* it = inbank->iterator();
  for (it->first(); !it->isDone(); it->next())
  {
    // we get the sequence object
    Sequence& seq = it->item();
    // we get the data buffer from the sequence: we'll use it to correct the sequence
    char* data = seq.getDataBuffer();
    
    if (verbose)
    {
      // We dump the data size and the comment
      std::cout << "[" << seq.getDataSize() << "] " << seq.getComment()  << std::endl;
      
      // We dump the data
      std::cout << seq.toString() << std::endl;
    }
    
    int pos = 0;
    for (itKmer.first(); !itKmer.isDone(); itKmer.next())
    {
      //build node from a kmer
      Node node(Node::Value(itKmer->value())); // , itKmer->strand()
      
      if(graph.contains(node))
      {
        if (verbose) printf("1");
        
        //check previous gap size
        if(gap_size == kmerSize) //simple isolated error detection
        {
          char bin2NT[4] = {'A','C','T','G'};
          for(int i = 0; i < 4; i++)
          {
            char nt = data[pos-1];
            //change the sequence nucleotide at this pos
            data[pos-1] = bin2NT[i]; 
            
            ///////////// TODO: create the putative kmer with model.codeSeed() method
            
            Kmer<span>::ModelCanonical::Kmer  putative_corrected_kmer =   . . .
            
            ///////////// TODO: use graph.contains inside the if() to check if the 
            /////////////       putative_corrected_kmer is solid
            if( . . . )
            {
              printf("found correction at pos %i  :%c \n",pos,bin2NT[i]);
              nb_simple_error_corrected++;
              break;
            }
            //revert to original nt if kmer was not solid
            data[pos-1] = nt; 
          }
        }
        gap_size=0;
      }
      else
      {
        if (verbose) printf("0");
        gap_size++;
      }
      
      if (verbose)  {  cout << model.toString (itKmer->value()) << endl;  }
      pos++;
    }

    
    outBank->insert (seq);
  }
  printf("  nb_simple_error corrected %lli\n",nb_simple_error_corrected);
  outBank->flush();
}