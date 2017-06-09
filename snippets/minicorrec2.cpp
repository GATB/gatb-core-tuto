
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
  
  
  ///////////////  SOLUTION: create graph here ////////////
  Graph graph = Graph::create (" -in %s -abundance-min %d  -kmer-size %d -verbose %d", 
    argv[1], 3, kmerSize, (verbose ? 1 : 0) );
  if(verbose)
    std::cout << graph.getInfo() << std::endl;

  //for information, print bank size (not exact numbers, only estimation from extrapolation)
  u_int64_t  nbseq = inbank->estimateNbItems();
  u_int64_t totalsize =  inbank->estimateSequencesSize();
  std::cout << "#sequences: " << nbseq << " - #nucleotides: " << totalsize << std::endl;
  ////////////////////////////////////////////////////////
  
  //To get kmers from sequences, we need:
  // 1- a kmer model with a given span size.
  Kmer<span>::ModelCanonical model (kmerSize);
  // 2- a kmer iterator
  Kmer<span>::ModelCanonical::Iterator itKmer (model);
  
  // We loop over sequences from source file.
  Iterator<Sequence>* it = inbank->iterator();
  for (it->first(); !it->isDone(); it->next())
  {
    // we get the sequence object
    Sequence& seq = it->item();
    
    if (verbose)
    {
      // We dump the data size and the comment
      std::cout << "[" << seq.getDataSize() << "] " << seq.getComment()  << std::endl;
      
      // We dump the data
      std::cout << seq.toString() << std::endl;
    }
    
    ///////////////  SOLUTION: iterate over kmer here////////////
    // We set the sequence data from which we want to extract kmers.
    itKmer.setData ((*it)->getData());
    // We iterate over all kmers.
    for (itKmer.first(); !itKmer.isDone(); itKmer.next())
    {
      //"Convert" a kmer to a graph node
      Node node(Node::Value(itKmer->value()));
      // query the graph to figure out whether or not the node (i.e. kmer)
      // is present
      if(graph.contains(node)) {
        printf("1");
      }
      else {
        printf("0");
      }
    }
    printf("\n");
    ////////////////////////////////////////////////////////    
    
    outBank->insert (seq);
  }
  
  outBank->flush();
}