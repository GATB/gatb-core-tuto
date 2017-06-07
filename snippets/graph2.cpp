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
    Graph graph = Graph::create (Bank::open(argv[1]), "-abundance-min %d -verbose 0", 4);

    /* we get an iterator for all nodes of the graph */
    Graph::Iterator<Node> it = graph.iterator ();

    /* we loop over each node */
    for (it.first(); !it.isDone(); it.next()) {

        int nb_in_neighbors = 0, nb_out_neighbors = 0;
       
        /* ADD CODE HERE */

      std::cout << "node: " << graph.toString (it.item()) << " number of in-neighbors: " << nb_in_neighbors << " number of out-neighbors:" << nb_out_neighbors << std::endl;
    }

    /* ADD CODE HERE */
    std::cout << "overall across all nodes, mean in-degree: " << /*TODO << */ "mean out-degree:" << /*TODO <<*/ std::endl;

  }
  catch (Exception& e) {
    std::cerr << "EXCEPTION: " << e.getMessage() << std::endl;
    return EXIT_FAILURE;
  }
}
