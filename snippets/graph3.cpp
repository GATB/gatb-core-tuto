/* we include GATB-Core API */
#include <gatb/gatb_core.hpp>

int main (int argc, char* argv[]){

  /* we expect a sequence file name on the cmd-line */
  if(argc != 2){
    printf("%s filename\n",argv[0]);
    return EXIT_FAILURE;
  }

  try {
    /* we create the graph from the a sample Fastq file */
    Graph graph = Graph::create (Bank::open(argv[1]), "-abundance-min %d -verbose 0", 1);

    /* we get an arbitrary node in the graph */
    Graph::Iterator<Node> it = graph.iterator ();
    it.first();
    Node start_node = it.item();

    int path_len = 0;
    while ( 0 /* replace by some condition */)
    {
        /* ADD CODE HERE */
    }

    std::cout << "length of the path starting from start_node, and following nodes with single out-neighbors: " << path_len << std::endl;

  }
  catch (Exception& e) {
    std::cerr << "EXCEPTION: " << e.getMessage() << std::endl;
    return EXIT_FAILURE;
  }
}
