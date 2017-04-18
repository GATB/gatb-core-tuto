/* we include GATB-Core API */
#include <gatb/gatb_core.hpp>

/* we setup the kmer model */
static const size_t span =  32;
int kmerSize = 31;

int main (int argc, char* argv[]){
  /* we expect a sequence file name on the cmd-line */
  if(argc != 2){
    printf("%s filename\n",argv[0]);
    return EXIT_FAILURE;
  }

  try {
    /* we load the graph from the given graph file */
    Graph graph = Graph::create (Bank::open(argv[1]), "-abundance-min %d", 5);
    /* we get an iterator for all nodes of the graph */
    GraphIterator<Node> it = graph.iterator ();
    /* we loop over each node */
    for (it.first(); !it.isDone(); it.next()) {
      /* The currently iterated node is available with it.item()
       * We dump an ascii representation of the current node. */
      std::cout << graph.toString (it.item()) << std::endl;
    }
  }
  catch (Exception& e) {
    std::cerr << "EXCEPTION: " << e.getMessage() << std::endl;
    return EXIT_FAILURE;
  }
}