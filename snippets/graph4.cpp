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
    Graph graph = Graph::create (Bank::open(argv[1]), "-abundance-min %d -verbose 0", 10);

    /* we create a start node, that we know exists in graph */
    Node node = graph.buildNode("GACTGGGAAAACCCTGGCGTTACCCAACTTA");

    uint32_t nb_traversed_nodes = 0;

    std::stack<Node> to_traverse;
    to_traverse.push(node);
    
    std::set<Node> already_traversed;

    while (to_traverse.size() > 0)
    {
        Node node = to_traverse.top();
        to_traverse.pop();
        nb_traversed_nodes++;
        
        std::cout << "traversing " << graph.toString(node) << std::endl;
        
        /* ADD CODE HERE */
        

        /* you might want to use this template:        
        Graph::Vector<Node> vector = ... 
        for (int i = 0; i < vector.size(); i++)
        {
            Node neighbor = vector[i]; 
        }
        */
    }
   
    std::cout << "traversed " << nb_traversed_nodes << " nodes" << std::endl;


  }
  catch (Exception& e) {
    std::cerr << "EXCEPTION: " << e.getMessage() << std::endl;
    return EXIT_FAILURE;
  }
}

