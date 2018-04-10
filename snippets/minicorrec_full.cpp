#include <gatb/gatb_core.hpp>

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
  
  // We get the file name from the user arguments
  const char* filename = argv[1] ;
  
  IBank * inbank = Bank::open(filename);
  IBank*  outBank = new BankFasta (getOutFileName());
  
  Graph graph = Graph::create (" -in %s -abundance-min %d  -kmer-size %d -debloom original -verbose %d", 
    argv[1], 3, kmerSize, (verbose ? 1 : 0) );
  
  if(verbose)
    std::cout << graph.getInfo() << std::endl;
  
  //not exact numbers, only estimation from extrapolation
  int64_t  nbseq = inbank->estimateNbItems();
  u_int64_t totalsize =  inbank->estimateSequencesSize();
  std::cout << "nbseq : " << nbseq << " totalsize " << totalsize << std::endl;
  
  //wrapped with a progress iterator
  Iterator<Sequence>* it;
  if (verbose){
    it = new ProgressIterator<Sequence> (*inbank, "Iterating sequences");
  }
  else {
    it = inbank->iterator();
  }
  // We declare a kmer model with a given span size.
  Kmer<span>::ModelCanonical model (kmerSize);
  
  // We declare a kmer iterator
  Kmer<span>::ModelCanonical::Iterator itKmer (model);
  
  int64_t nb_simple_error_corrected=0;
  int gap_size=0;
  int readnum=0;
  
  // We loop over sequences.
  for (it->first(); !it->isDone(); it->next())
  {
    // we get the sequence object
    Sequence& seq = it->item();
    // we get the data buffer from the sequence: we'll use it to correct the sequence
    char* data = seq.getDataBuffer();
    
    // We set the data from which we want to extract kmers.
    itKmer.setData ((*it)->getData());
    
    if (verbose)
    {
      // We dump the data size and the comment
      std::cout << "[" << seq.getDataSize() << "] " << seq.getComment()  << std::endl;
      // We dump the data
      std::cout << seq.toString() << std::endl;
    }
    
    int pos = 0;
    // We iterate the kmers.
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
            // change the sequence nulceotide at this pos
            data[pos-1] = bin2NT[i]; 
            Kmer<span>::ModelCanonical::Kmer  putative_corrected_kmer = model.codeSeed(data,Data::ASCII,pos-1);
            if(graph.contains(  Node(Node::Value(putative_corrected_kmer.value()))  ))
            {
              printf("found correction on read %d at pos %i: %c \n",readnum, pos,bin2NT[i]);
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
    readnum++;
    outBank->insert (seq);
  }
  printf("\nnb_simple_error corrected %lli\n",nb_simple_error_corrected);
  outBank->flush();
}