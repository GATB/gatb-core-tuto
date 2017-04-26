/* we include GATB-Core API */
#include <gatb/gatb_core.hpp>
#include <stack>

int main (int argc, char* argv[]){

  /* we expect a sequence file name on the cmd-line */
  if(argc != 2){
    printf("%s filename\n",argv[0]);
    return EXIT_FAILURE;
  }

  try {
    /* we create the graph from the a sample Fastq file */
    Graph graph = Graph::create (Bank::open(argv[1]), "-abundance-min %d -verbose 0", 3);

    /* we get an arbitrary node in the graph */
    Graph::Iterator<Node> it = graph.iterator ();
    it.first();
    Node start_node = it.item();

    uint32_t nb_traversed_simple_paths = 0;

    std::stack<Node> to_traverse;
    to_traverse.push(start_node)
    {
        /* ADD CODE HERE */
    }
   
    std::cout << "traversed " << nb_traversed_simple_paths << " simple paths" << std::endl;


  }
  catch (Exception& e) {
    std::cerr << "EXCEPTION: " << e.getMessage() << std::endl;
    return EXIT_FAILURE;
  }
}
