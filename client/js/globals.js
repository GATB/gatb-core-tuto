/**
 * This package contains global declarations.
 * 
 * Author: Patrick Durand, Inria - October 2016
 * 
 * License: release under the terms of Affero-GPL
 * https://www.gnu.org/licenses/agpl-3.0.txt
 */

/**
 * HTML pages stuffs
 */
 
// URL parameter to specify which code snippet to display in editor.
//   e.g. http://xxxx/gatb-compiler.html?snippet=bank_2
//
//   If not provided, a default code snippet will be displayed.
//   Value of 'snippet' should match one of 'name' attributes from 
//   code_snippets.js->CODE_SNIPPETS json data structure
var URL_PARAMETER_SNIPPET = "snippet";

// the c++ code editor
var HTML_ELEMENT_CODE_EDITOR = "g-editor";

// the status bar
var HTML_ELEMENT_STATUS_BAR = "g-statusBar";

// the console
var HTML_ELEMENT_CONSOLE = "g-console";
// the console, displays compiling status
var HTML_ELEMENT_COMP_CONSOLE_TAB = "compile-status";
var HTML_ELEMENT_COMP_CONSOLE = "g-comp-console";
// the console, displays execution status
var HTML_ELEMENT_RUN_CONSOLE = "g-run-console";

//the "compile and run" button
var HTML_ELEMENT_COMPILE_BTN = "compile-btn";

//the job monitor label
var HTML_ELEMENT_JB_MON = "job_monitor";

// Name of file used to compile code on server side
var DEFAULT_SNIPPET_CODE_NAME = "gatb-snippet.cpp";
var DEFAULT_DATA_SET_NAME="fasta_small";

// display trail lessons using flat panels or collapsible panels
var TRAIL_CONCEPTS_FLAT_PANELS = false;

var TRAIL_NAV_BAR_INTRO="Other available trails: ";

/**
 * Tutorial snippet stuffs
 */

// Name of the tutorial for beginners
var ROOKIE_TRAIL = "Rookie";

// Name of the tutorial for experts
var EXPERT_TRAIL = "Expert";

// Name of the tutorial for advanced
var ADVANCED_TRAIL = "Advanced";

// Name of the tutorial for training (GATB team courses)
var TRAINING_TRAIL = "Training";

// default snippet to show when URL parameter "snippet" is not provided
//to gatb-compiler.html
var DEFAULT_SNIPPET = "bank1";

// Some strings to format snippet pages
var CLASSES_TO_LEARN_INTRO = "In this lesson, you will learn to use: ";
var EXERCICE_HINT_INTRO = "Have a look at: ";
var EXERCICE_HINT_WORK="Then, modify the code below to try some code...";
var NAV_BAR_INTRO = "You are here: ";
var SNIPPET_TYPE_LESSON="lesson";
var SNIPPET_TYPE_EXERCISE="exercise";

// time (in seconds) to wait before showing a solution
var WAIT_TIME_SOLUTION = 60;
// #times to get a valid answer from Allgo. After that: job timed out.
var RETRY_CONNECT_ALLGO=10;

// the release of GATB-Core used for the Tutorial.
// Be very, very careful when changing that value.
// Notice: b1.2.2 *IS* official v1.2.2 release of GATB-Core where some changes
// have been made on snippet codes.
var GATB_RELEASE="b1.2.2";

//we have a specific release numbering on this tutorial
var GATB_ONLINE_TUTO_RELEASE="1.0.2";

// The URL that can be used to let the user access data set used in the lessons
var DATA_SET_LOADER_URL="http://gatb-core.gforge.inria.fr/training/data/";
var DATA_MAPPER_FILE="data-file-mapper.txt";

// Hash data strings
var DATA_HASHA = ["5","4","0","7","f","b","3","e","d","3","a","0","d","c","4","b"];
var DATA_HASHB = ["f","0","b","4","a","9","c","3","b","0","5","3","a","4","d","9"];

/**
 * Snippet declarations
 */

/**
 * Here, we programmatically define the list of available code snippets.
 * Each snippet must contain:
 *   - a name: uniquely identify a code snippet. For internal use.
 *   - a type: one of: lesson, exercise. For internal use.
 *   - a nav label: navigation label; should be short. For internal use.
 *   - a title: the title of the lesson to which this snippet belongs to. 
 *              This information is displayed on the main page, within element
 *              "lesson-title".
 *   - a description: a description of the lesson.
 *              This information is displayed on the main page, within element
 *              "lesson-description".
 *   - a url: give access to the c++ code of the snippet. Should match GATB-Core
 *            repository on Github.
 * 
 * Each snippet may provide:
 *   - a data_set: target a data file available on the server side. When provided,
 *        code snippet will be executed on the A||GO server side using that file.
 *        Otherwise, code is executed using default "fasta_small" file available  
 *        on the server.
 *        Such a data_set is a key name defined in the
 *        /home/allgo/data/data-file-mapper.txt file on the GATB-Compiler VM.
 *   - a cmdline: optional command-line arguments. 
 *       Some keys can be used:
 *        @DATA_FILE@: replaced, on the server side, by the data-file-name.
 *   - a list of class description: classes that are learnt in the lesson.
 *
 * In turn, "classes" is defined as a list where each entry must provide:
 *   - name
 *   - a short documentation
 *   - a URL to full class description. Should match GATB core official 
 *     documentation page.
 *
 * Future evolution: put these array structures within JSON files.
 */
var ROOKIE_BANK_SNIPPETS = [
  {
    "name":"bank1",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 1",
    "title" : "lesson 1: read a Fasta file",
    "description" : "Let's see how to read a sequence file (Fasta format) using GATB API.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/bank/bank1.cpp",
    "data_set" : "fasta_small",
    "classes" : [
      {
        "name" : "BankFasta",
        "doc" : "to read Fasta files in compressed or plain text format.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1impl_1_1BankFasta.html#details"
      }
    ] 
  },
  {
    "name":"bank2",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 2",
    "title" : "lesson 2: read a Fastq file",
    "description" : "Let's see how to read a Fastq file.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/bank/bank2.cpp" ,
    "data_set" : "fastq_small",
    "classes" : [
      {
        "name" : "Bank",
        "doc" : "a more generic class than BankFasta to read either Fasta or Fastq files in compressed or plain text format.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1impl_1_1Bank.html#details"
      }
    ] 
  },
  {
    "name":"bank3",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 3",
    "title" : "lesson 3: read a Fasta file and get progress information",
    "description" : "Let's see how to read a sequence file and display progression. Quite useful to monitor large file reading.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/bank/bank4.cpp" ,
    "data_set" : "fasta_medium",
    "classes" : [
      {
        "name" : "Bank",
        "doc" : "a more generic class than BankFasta to read either Fasta or Fastq files in compressed or plain text format.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1impl_1_1Bank.html#details"
      },
      {
        "name" : "SubjectIterator",
        "doc" : "an Iterator that notifies some listener during iteration. Here we iterate over Sequences.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1dp_1_1impl_1_1SubjectIterator.html#details"
      },
      {
        "name" : "IteratorListener",
        "doc" : "an interface for listening to iteration progress. Here we listen to sequences read from the file.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1dp_1_1IteratorListener.html#details"
      }
    ] 
  },
  {
    "name":"bank4",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 4",
    "title" : "lesson 4: filter Fasta file by sequence length",
    "description" : "Let's see how to read a sequence file and only retain sequences having a particular size.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/bank/bank7.cpp" ,
    "data_set" : "fasta_medium",
    "classes" : [
      {
        "name" : "Bank",
        "doc" : "a more generic class than BankFasta to read either Fasta or Fastq files in compressed or plain text format.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1impl_1_1Bank.html#details"
      },
      {
        "name" : "FilterIterator",
        "doc" : "an Iterator that filters out some iterated items. Here we filter Sequences read from the file.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1dp_1_1impl_1_1FilterIterator.html#details"
      }
    ] 
  },
  {
    "name":"ex_bank2",
    "type":SNIPPET_TYPE_EXERCISE,
    "nav":"exercise",
    "title" : "exercise: get quality of reads",
    "description" : "Try to get the quality data associated to reads in a Fastq file.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/bank/bank2.cpp",
    "data_set" : "fastq_small",
    "solution":{
         "code":"std::cout << seq.getQuality() << std::endl;",
         "line":"49",
      },
    "classes" : [
      {
        "name" : "Sequence",
        "doc" : "maybe there is a method of interest to get quality information.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1bank_1_1Sequence.html"
      }
    ] 
  }
];

var ROOKIE_KMER_SNIPPETS = [
  {
    "name":"kmer1",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 1",
    "title" : "lesson 1: Iterating kmers from a sequence",
    "description" : "Let's see how to iterate over all k-mers contained in a DNA sequence.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/kmer/kmer3.cpp",
    "classes" : [
      {
        "name" : "Data",
        "doc" : "define a simple data chunk.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1misc_1_1Data.html#details"
      }
      ,
      {
        "name" : "ModelDirect",
        "doc" : "a Model that handles 'direct' kmers, ie sequences of nucleotides.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1kmer_1_1impl_1_1Kmer_1_1ModelDirect.html#details"
      }
    ] 
  },
  {
    "name":"kmer2",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 2",
    "title" : "lesson 2: computing k-mers using various models",
    "description" : "Let's see how to compute k-mers from sequences using different types of k-mer models.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/kmer/kmer2.cpp",
    "classes" : [
      {
        "name" : "ModelDirect",
        "doc" : "a Model that handles 'direct' kmers, ie sequences of nucleotides.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1kmer_1_1impl_1_1Kmer_1_1ModelDirect.html#details"
      },
      {
        "name" : "ModelCanonical",
        "doc" : "a Model that handles 'canonical' kmers.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1kmer_1_1impl_1_1Kmer_1_1ModelCanonical.html#details"
      },
      {
        "name" : "ModelMinimizer",
        "doc" : "a Model that handles one of the above augmented with a minimizer.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1kmer_1_1impl_1_1Kmer_1_1ModelMinimizer.html#details"
      }
    ] 
  }
];

var ROOKIE_DBG_SNIPPETS = [
  {
    "name":"debruijn3",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 1",
    "title" : "lesson 1: creating a De Bruijn graph from a Fasta file",
    "description" : "Let's see how to create a de Bruijn graph from DNA reads contained in a Fasta File.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/debruijn/debruijn3.cpp",
    "data_set" : "fasta_medium",
    "classes" : [
      {
        "name" : "Bank",
        "doc" : "to represent a generic definition of Bank of things. Things being sequences in this example.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1impl_1_1Bank.html#details"
      }
      ,
      {
        "name" : "Graph",
        "doc" : "represent a de Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1debruijn_1_1impl_1_1GraphTemplate.html#details"
      }
    ] 
  },
  {
    "name":"debruijn6",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 2",
    "title" : "lesson 2: iterate over the nodes of a De Bruijn graph",
    "description" : "Let's see how to iterate over all nodes of a dD Bruijn graph created from DNA reads contained in a Fasta File.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/debruijn/debruijn6.cpp",
    "data_set" : "fasta_medium",
    "classes" : [
      {
        "name" : "Graph",
        "doc" : "represent a de Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1debruijn_1_1impl_1_1GraphTemplate.html#details"
      }
    ] 
  },
  {
    "name":"debruijn9",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 3",
    "title" : "lesson 3: analysing nodes neighbours.",
    "description" : "Let's see how to work with neighbours of nodes in a De Bruijn graph.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/debruijn/debruijn9.cpp",
    "classes" : [
      {
        "name" : "Node",
        "doc" : "to represent a node in a De Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1debruijn_1_1impl_1_1Node__t.html"
      }
      ,
      {
        "name" : "Graph",
        "doc" : "represent a de Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1debruijn_1_1impl_1_1GraphTemplate.html#details"
      }
    ] 
  }
];

var EXPERT_DBG_SNIPPETS = [
  {
    "name":"debruijn16",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 1",
    "title" : "lesson 1: work with branching neighbours of a node",
    "description" : "Let's see how to get branching neighbours of a node and get some useful information using branching edges.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/debruijn/debruijn16.cpp",
    "data_set" : "none",
    "classes" : [
      {
        "name" : "Node",
        "doc" : "to represent a node in a De Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1debruijn_1_1impl_1_1Node__t.html"
      }
      ,
      {
        "name" : "Graph",
        "doc" : "represent a de Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1debruijn_1_1impl_1_1GraphTemplate.html#details"
      },
      {
        "name" : "BranchingEdge",
        "doc" : "a specific Edge structure representing a transition between two branching nodes.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1debruijn_1_1impl_1_1BranchingEdge__t.html#details"
      }
    ],
    "classes_description":"A BranchingEdge object is made of:"+
      "<ul>"+
      "<li>the source branching node</li>"+
      "<li>the target branching node</li>"+
      "<li>the direction of the neighbours (in/out coming)</li>"+
      "<li>the nucleotide of the transition between the initial branching node and the first</li> neighbour on the simple path between the two branching nodes.</li>"+
      "<li>the number of transitions that link the two branching nodes.</li>"+
      "</ul>"
  },
  {
    "name":"debruijn14",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 2",
    "title" : "lesson 2: iterate simple path from a node",
    "description" : "Let's see how to iterate through nodes fo follow some paths in a De Bruijn graph.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/debruijn/debruijn14.cpp",
    "data_set" : "none",
    "classes" : [
      {
        "name" : "Node",
        "doc" : "to represent a node in a De Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1debruijn_1_1impl_1_1Node__t.html"
      }
      ,
      {
        "name" : "Graph",
        "doc" : "represent a de Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1debruijn_1_1impl_1_1GraphTemplate.html#details"
      }
    ],
    "classes_description":"A simple node is defined as having indegree==1 and outdegree==1. "+
      "It is often useful to iterate successive simple nodes in order to build some path in the De Bruijn graph."+
      "<br/><br/>This snippet shows how to iterate such a simple path. Here, the iterated items are the successive"+
      " nodes of the path."
  }
];

var EXPERT_THREAD_SNIPPETS = [
  {
    "name":"thread1",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 1",
    "title" : "lesson 1: have a look at the basics of GATB-Core Multithreading.",
    "description" : "Let's see how to use GATB Multithreading API through a very simple example.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/tools/multithreading1.cpp",
    "data_set" : "none",
    "classes" : [
      {
        "name" : "Dispatcher",
        "doc" : "to launch commands in different threads.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1dp_1_1impl_1_1Dispatcher.html#details"
      }
    ] 
  },
  {
    "name":"thread2",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 2",
    "title" : "lesson 2: synchronise multithreading operations.",
    "description" : "Let's see how to use GATB Synchronize API to secure parallel processing.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/tools/multithreading3.cpp",
    "data_set" : "none",
    "classes" : [
      {
        "name" : "ISynchronizer",
        "doc" : "defines a synchronization abstraction layer.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1system_1_1ISynchronizer.html#details"
      },
      {
        "name" : "Dispatcher",
        "doc" : "to launch commands in different threads.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1dp_1_1impl_1_1Dispatcher.html#details"
      }
    ] 
  },
  {
    "name":"thread3",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 3",
    "title" : "lesson 3: use multithreading to iterate over sequences in a Fasta file.",
    "description" : "Let's see how to use GATB Multithreading API to compute nucleotides content of a sequence file.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/tools/multithreading6.cpp",
    "data_set" : "fasta_medium",
    "classes" : [
      {
        "name" : "BankFasta",
        "doc" : "to read Fasta files in compressed or plain text format.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1impl_1_1BankFasta.html#details"
      },
      {
        "name" : "Dispatcher",
        "doc" : "to launch commands in different threads.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1dp_1_1impl_1_1Dispatcher.html#details"
      }
    ] 
  }
];


var EXPERT_APP_SNIPPETS = [
  {
    "name":"app1",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 1",
    "title" : "lesson 1: setup easily new arguments for your command-line GATB-based software.",
    "description" : "GATB-Core provides few APIs to help you building a comprehensive command-line for your own softwares.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/tools/optionsparser2.cpp",
    "data_set" : "none",
    "classes" : [
      {
        "name" : "OptionsParser",
        "doc" : "to prepare a command-line parser.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1misc_1_1impl_1_1OptionsParser.html#details"
      },
      {
        "name" : "OptionOneParam",
        "doc" : "to declare an Option that has one argument.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1misc_1_1impl_1_1OptionOneParam.html#details"
      },
      {
        "name" : "OptionNoParam",
        "doc" : "to declare an Option that has no argument.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1misc_1_1impl_1_1OptionNoParam.html#details"
      }
    ] 
  },
  {
    "name":"app2",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 2",
    "title" : "lesson 2: setup a command-line that inherits existing arguments.",
    "description" : "GATB-Core provides few APIs to combine new arguments and existing ones, inherited from GATB-Core algorithm's parameters (graph, bloom, etc.).",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/tools/optionsparser1.cpp",
    "data_set" : "none",
    "classes" : [
      {
        "name" : "OptionsParser",
        "doc" : "to prepare a command-line parser.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1misc_1_1impl_1_1OptionsParser.html#details"
      },
      {
        "name" : "OptionOneParam",
        "doc" : "to declare an Option that has one argument.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1misc_1_1impl_1_1OptionOneParam.html#details"
      },
      {
        "name" : "OptionNoParam",
        "doc" : "to declare an Option that has no argument.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1misc_1_1impl_1_1OptionNoParam.html#details"
      }
    ] 
  },
  {
    "name":"app3",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 3",
    "title" : "lesson 3: setup a complete GATB-based software using the Tool class.",
    "description" : "Let's see how to create a complete application in a few line of codes.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/tools/ToyTool.cpp",
    "data_set" : "none",
    "classes" : [
      {
        "name" : "Tool",
        "doc" : "to prepare a GATB-Tool.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1misc_1_1impl_1_1Tool.html#details"
      }
    ],
    "classes_description":"We define our own tool as a class that inherits from the <i>Tool</i> class. By doing this, we will get:"+
      "<ul>"+
      "<li>a command line parser with default options; we will add specific options</li>"+
      "<li>a mean to retrieve command line options values in our code</li>"+
      "<li>a mean to get configurable progression bar for our ongoing job</li>"+
      "<li>a dispatcher object for easy multi-threading</li>"+
      "<li>a mean to get time execution information</li>"+
      "<li>a mean to gather any piece of information for output</li>"+
      "<li>a mean to run the tool in the 'main' function</li>"+
      "</ul>"+
      "<i>Exercise:</i>"+ 
      "<ol>"+
      "<li>Have a look at the code as it is, then run it. Observer software output.</li>"+
      "<li>Then, update '-max' declaration (line:55) so that it is not mandatory anymore"+
      " and has a default value of 1000.<br/>"+
      " Run the software again... Have you seen the difference ?</li>"+
      "</ol>"
  }
];

var EXPERT_STO_SNIPPETS = [
  {
    "name":"sto1",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 1",
    "title" : "lesson 1: handle graph file created by 'dbgh5' tool.",
    "description" : "load '.h5' file and get kmer content... without using a Fasta/Fastq file.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/storage/storage6.cpp",
    "data_set" : "h5_small",
    "classes" : [
      {
        "name" : "StorageFactory",
        "doc" : "to create an instance of a particular storage.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1storage_1_1impl_1_1StorageFactory.html#details"
      },
      {
        "name" : "Storage",
        "doc" : "the entry point for managing collections and groups for storage (I/O) purpose.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1storage_1_1impl_1_1Storage.html#details"
      },
      {
        "name" : "Group",
        "doc" : "define a container concept for other items that can be stored in a storage (like groups, partitions, collections)..",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1tools_1_1storage_1_1impl_1_1Group.html#details"
      }
    ],
    "classes_description":"GATB-Core comes with a software called 'dbgh5'; it is located in the 'bin' directory of a GATB-Core "+
    "distribution, as well as with all GATB-Tools (e.g. DiscoSNP). 'dbgh5' is capable of reading a Fasta/Fastq "+
    "files containing reads, then it computes kmers, creates a De Bruijn graph and stores all the information, including the graph,"+
    " in a file formated using the well-known <a href='https://www.hdfgroup.org/hdf5/' target='_blank'>HDF5 format</a>. <br/><br/>"+
    "Using GATB-Core Storage API, you can directly handle such a file for further processing. Working from "+
    " such an HDF5 file provides you with a unique feature: you do not have to recreate the De Bruijn graph from your Fasta/Fastq file." 
  }
];

var ADVANCED_SNP_SNIPPETS = [
  {
    "name":"adv1",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"SNP lesson",
    "title" : "lesson: making a software to detect isolated SNPs without a reference sequence.",
    "description" : "in this lesson we show how to switch from theory to practice by making part of"+
      " <a href='http://nar.oxfordjournals.org/content/43/2/e11.full' target='_blank'>DiscoSNP</a> from its publication.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core/"+GATB_RELEASE+"/gatb-core/examples/protos/MicroSNP.cpp",
    "data_set" : "snp_small",
    "cmdline" : "-kmer-size#7#-abundance-min#1#-verbose#0#-in#@DATA_FILE@",
    "classes_description":"<B>The theory to locate isolated SNPs in reads without a reference sequence is...</B> <br/><br/>"+
      "<div style='margin-left: 3%;'>"+
      "A de Bruijn graph is a directed graph that contains all the k-mers present in the read dataset as vertices"+
      ", and all the possible (k − 1)-overlaps between k-mers as edges.<br/><br/>"+
      "<a href='http://nar.oxfordjournals.org/content/43/2/e11.full#sec-2'>The idea is the following</a>: if a dataset "+
      "contains two sequences that are identical, except for one character, then these sequences generate a bubble in the graph. "+
      "<br/><br/><i>Example</i>: given sequences CTG<u>A</u>CCT and CTG<u>T</u>CCT, we have"+
      " <a href='http://nar.oxfordjournals.org/content/43/2/e11/F2.medium.gif'>this</a> de Bruijn graph (k=4)."+
      "<br/><br/><i>Formally</i>, a bubble in a de Bruijn graph is composed of two distinct paths of k + 2 nodes, "+
      "having the start and the end nodes in common. <br/><br/>"+
      "It is worth noting that this is a very basic SNP detection algorithm: it only locates clean bubbles. Check out the "+
      "<a href='https://github.com/GATB/DiscoSnp'>DiscoSNP</a> software for a real SNP detection tool that takes into account many more features."+
      " Nevertheless, let's see how to write a software to locate such clean bubbles, and consequently isolated SNPs."+
      "<br/><br/></div>"+
      "<B>The practice is...</B> <br/><br/>"+
      "<div style='margin-left: 3%;'>"+
      "The above-mentioned method to detect isolated SNP by looking for bubbles in a de Bruijn graph, can be implemented using "+
      "GATB-Core library as follows: "+
      "<ol><li>create a graph from some sequences;</li>"+
      "<li>find a node (i.e. a kmer) having two 'out' branching nodes;</li>"+
      "<li>check that the two paths going out from that node have the same length <b>k</b>;</li>"+
      "<li>check that we have the same node at the end of paths.</li></ol>"+
      "</div>"
  }
];

var TRAINING_BANK_SNIPPETS = [
  {
    "name":"T-bank1",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"Lesson 1",
    "title" : "lesson 1: read a sequence file",
    "description" : "Let's see how to read a sequence file (FastQ format) using GATB API.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/io1.cpp",
    "data_set" : "fastq_small",
    "classes" : [
      {
        "name" : "Bank",
        "doc" : "entrypoint to open a sequence file",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1impl_1_1Bank.html#details"
      },
      {
        "name" : "IBank",
        "doc" : "represent a bank, i.e. a set of sequences whatever the format",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1IBank.html#details"
      },
      {
        "name" : "Sequence",
        "doc" : "represent a sequence of nucleotides",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1bank_1_1Sequence.html#details"
      }
    ] 
  },
  {
    "name":"T-ex_bank1",
    "type":SNIPPET_TYPE_EXERCISE,
    "nav":"exercise 1",
    "title" : "exercise 1: get quality of reads",
    "description" : "Try to get the quality data associated to reads in a FastQ file.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/io2.cpp",
    "data_set" : "fastq_small",
    "solution":{
         "code":"std::cout << seq.getQuality() << std::endl;",
         "line":"22",
      },
    "classes" : [
      {
        "name" : "Sequence",
        "doc" : "maybe there is a method of interest to getQuality() information.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1bank_1_1Sequence.html#details"
      }
    ] 
  },
  {
    "name":"T-ex_bank2",
    "type":SNIPPET_TYPE_EXERCISE,
    "nav":"exercise 2",
    "title" : "exercise 2: get bank size",
    "description" : "Try to get bank size, i.e. the number of sequences and total length of all sequences present in the file.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/io3.cpp",
    "data_set" : "fastq_small",
    "solution":{
         "code":' int64_t   nbseq = inbank ->estimateNbItems ();\n u_int64_t totalsize =   inbank ->estimateSequencesSize ();\n std::cout  << "# sequences: " << nbseq     << std::endl;\n std::cout  << "# letters: "   << totalsize << std::endl;',
         "line":"14",
      },
    "classes" : [
      {
        "name" : "IBank",
        "doc" : "can you see some estimateXXX() methods?",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1IBank.html#details"
      }
    ] 
  },
  {
    "name":"T-bank2",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 2",
    "title" : "lesson 2: write/convert a sequence file",
    "description" : "Let's see how to read a sequence file (FastQ format), then write a new sequence file (FastA format).",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/io4.cpp",
    "data_set" : "fastq_small",
    "classes" : [
      {
        "name" : "BankFasta",
        "doc" : "to read Fasta files in compressed or plain text format.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1bank_1_1impl_1_1BankFasta.html#details"
      }
    ] 
  }
];

var TRAINING_KMER_SNIPPETS = [
  {
    "name":"T-kmer1",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 1",
    "title" : "lesson 1: Iterating kmers from sequences",
    "description" : "Let's see how to iterate over all k-mers contained in a Fasta file.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/kmer1.cpp",
    "data_set" : "fasta_small",
    "classes" : [
      {
        "name" : "ModelDirect",
        "doc" : "a Model that handles 'direct' kmers.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1kmer_1_1impl_1_1Kmer_1_1ModelDirect.html#details"
      }
    ] 
  },
  {
    "name":"T-kmer2",
    "type":SNIPPET_TYPE_EXERCISE,
    "nav":"exercise 1",
    "title" : "exercise 1: Iterating kmers using ModelCanonical",
    "description" : "In this lesson we will use ModelCanonical instead of ModelDirect to get kmers from sequences.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/kmer2.cpp",
    "data_set" : "fasta_small",
    "classes_description":"<B>The problem with ModelDirect is:</B> "+
      "reads can be on forward or reverse strand, we do not know. So, each kmer may appear twice.<br/><br/>"+
      "A widespread solution consists in keeping only the forward or the reverse complement of a kmer.<br/>"+
      "By convention, the minimum (in lexical order) between a kmer and its reverse complement "+
      "is known as the <i>Canonical kmer</i>.<br/><br/>"+
      "Using GATB-Core API, canonical kmers are accessible using instances of class "+
      "<a href='http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1kmer_1_1impl_1_1Kmer_1_1ModelCanonical.html#details' target='_blank'>"+
      "ModelCanonical</a>.<br/><br/>"+
      "<B>Exercice.</B> Modify the code below as follows:"+
      "<ul>"+
      "<li>use ModelCanonical instead of ModelDirect (~line 18)</li>"+
      "<li>have a look at <a href='http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1kmer_1_1impl_1_1Kmer_1_1KmerCanonical.html' target='_blank'>KmerCanonical</a> API...<br>"+
      "(this will be the type of kmers returned by kmer iterator)</li>"+
      "<li>... and display kmer as well as its forward and reverse complement (~line 37)</li>"+
      "</ul>"+
      "</div>",
    "solution":{
         "code":'std::cout << "-------------------- CANONICAL --------------------" << std::endl;\n'+
            'std::cout << "kmer  value is: "    << itKmer->value()                    << std::endl;\n'+
            'std::cout << "kmer string is: "    << model.toString(itKmer->value())    << std::endl;\n'+
            'std::cout << "forward value  is: " << itKmer->forward()                  << std::endl;\n'+
            'std::cout << "forward string is: " << model.toString(itKmer->forward())  << std::endl;\n'+
            'std::cout << "revcomp value  is: " << itKmer->revcomp()                  << std::endl;\n'+
            'std::cout << "revcomp string is: " << model.toString(itKmer->revcomp())  << std::endl;\n'+
            'std::cout << "used strand is   : " << toString(itKmer->strand())         << std::endl;\n'+
            '// we only display first kmer for each sequence\n'+
            'break;\n',
         "line":"37",
      },
  }
];

var TRAINING_GRAPH_SNIPPETS = [
  {
    "name":"T-graph1",
    "type":SNIPPET_TYPE_LESSON,
    "nav":"lesson 1",
    "title" : "lesson 1: create a De Bruijn graph from a sequence file, then iterate over the nodes.",
    "description" : "Let's see how to iterate over all nodes contained in a De Bruijn graph.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/graph1.cpp",
    "data_set" : "fasta_small",
    "classes" : [
      {
        "name" : "Node",
        "doc" : "to represent a node in a De Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1debruijn_1_1impl_1_1Node__t.html"
      }
      ,
      {
        "name" : "Graph",
        "doc" : "represent a de Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1debruijn_1_1impl_1_1GraphTemplate.html#details"
      }
    ]
  },
  {
    "name":"T-graph2",
    "type":SNIPPET_TYPE_EXERCISE,
    "nav":"exercice 1",
    "title" : "exercice 1: compute the in- and out-degrees of all nodes.",
    "description" : "Iterate all the nodes of the graph, and compute their number of in-neighors and out-neighbors (those numbers are also known respectively as in-degree and out-degree). Then, print the mean in-degree and mean out-degree across the entire graph.",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/graph2.cpp",
    "data_set" : "fasta_medium",
    "solution":{
         "code":' Node node = it.item();\n nb_in_neighbors = graph.indegree(node);\n nb_out_neighbors = graph.outdegree(node);',
         "line":"24",
      },

    "classes" : [
      {
        "name" : "Node",
        "doc" : "to represent a node in a De Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1debruijn_1_1impl_1_1Node__t.html"
      }
      ,
      {
        "name" : "Graph",
        "doc" : "represent a de Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1debruijn_1_1impl_1_1GraphTemplate.html#details"
      }
    ]
  },
  {
    "name":"T-graph3",
    "type":SNIPPET_TYPE_EXERCISE,
    "nav":"exercice 2",
    "title" : "exercice 2: traverse the graph from a given node.",
    "description" : "Given a node in the de Bruijn graph, keep traversing the path that starts at that node and follows its out-neighbor, as long as there is a single out-neighbor",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/graph3.cpp",
    "data_set" : "fasta_medium",
    "solution":{
         "code":'  while ( graph.outdegree(node) == 1) \n { node = graph.successors(node)[0];\n path_len++;\n  }',
         "line":"23",
      },


    "classes" : [
      {
        "name" : "Node",
        "doc" : "to represent a node in a De Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1debruijn_1_1impl_1_1Node__t.html"
      }
      ,
      {
        "name" : "Graph",
        "doc" : "represent a de Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1debruijn_1_1impl_1_1GraphTemplate.html#details"
      }
    ]
  },
  {
    "name":"T-graph4",
    "type":SNIPPET_TYPE_EXERCISE,
    "nav":"exercice 3",
    "title" : "exercice 3: traverse many paths in depth-first order",
    "description" : "Given a node in the de Bruijn graph, keep traversing the graph that starts at that node and keep following its out-neighbors, in a depth-first search fashion. ",
    "url":"https://raw.githubusercontent.com/GATB/gatb-core-tuto/master/snippets/graph4.cpp",
    "data_set" : "fasta_medium",
    "solution":{
         "code":'         Graph::Vector<Node> vector = graph.successors(node);\n        for (int i = 0; i < vector.size(); i++)\n        {\n            Node neighbor = vector[i];\n            if (already_traversed.find(neighbor) == already_traversed.end())\n            {   \n                to_traverse.push(neighbor);\n                already_traversed.insert(neighbor);\n            }\n        }',
         "line":"38",
      },


    "classes" : [
      {
        "name" : "Node",
        "doc" : "to represent a node in a De Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/structgatb_1_1core_1_1debruijn_1_1impl_1_1Node__t.html"
      }
      ,
      {
        "name" : "Graph",
        "doc" : "represent a de Bruijn graph.",
        "doc_url" : "http://gatb-core.gforge.inria.fr/doc/api/classgatb_1_1core_1_1debruijn_1_1impl_1_1GraphTemplate.html#details"
      }
    ]
  },


];
/**
 * Contains all available snippets
 */
var ALL_SNIPPETS = [
  {
    "name": "Bank",
    "nav":"bank",
    "description":"Bank APIs provide classes and methods to read and write sequence files. Supported formats are Fasta and Fastq, plain text or compressed (gzip) files. In the following lessons, discover how easy it is to handle sequence files using GATB-Core 'Bank' API.",
    "trail_path":ROOKIE_TRAIL, 
    "snippets": ROOKIE_BANK_SNIPPETS
  },
  {
    "name": "k-mer",
    "nav":"kmer",
    "description":"k-mer APIs provide classes and methods to handle the basics of De Bruijn graphs: k-mers, i.e. short sequences of 'k' nucleotides. GATB-Core provides a convenient API to deal with k-mers, as illustrated in these lessons.",
    "trail_path":ROOKIE_TRAIL, 
    "snippets": ROOKIE_KMER_SNIPPETS
  },
  {
    "name": "De Bruijn graph",
    "nav":"dbg",
    "description":"This is probably the key component of the entire GATB-Core library: its optimized De Bruijn graph object representation. This graph can be used as a powerful building block of algorithms to decypher DNA reads information.",
    "trail_path":ROOKIE_TRAIL, 
    "snippets": ROOKIE_DBG_SNIPPETS
  },
  {
    "name": "more on De Bruijn graph",
    "nav":"dbg2",
    "description":"More tips on De Bruijn graphs management using GATB-Core API.",
    "trail_path":EXPERT_TRAIL, 
    "snippets": EXPERT_DBG_SNIPPETS,
    "more":"http://gatb-core.gforge.inria.fr/doc/api/snippets_graph.html"
  },
  {
    "name": "Multithreading",
    "nav":"threads",
    "description":"GATB-Core provides some APIs to handle multithreading.",
    "trail_path":EXPERT_TRAIL, 
    "snippets": EXPERT_THREAD_SNIPPETS,
    "more":"http://gatb-core.gforge.inria.fr/doc/api/snippets_multithread.html"
  },
  {
    "name": "Application",
    "nav":"app",
    "description":"GATB-Core provides you with convenient APIs to setup full-featured applications in a few line of codes.",
    "trail_path":EXPERT_TRAIL, 
    "snippets": EXPERT_APP_SNIPPETS
  },
  {
    "name": "Storage",
    "nav":"sto",
    "description":"GATB-Core provides you with convenient APIs to handle HDF5-based storage of De Bruijn graphs and kmers.",
    "trail_path":EXPERT_TRAIL, 
    "snippets": EXPERT_STO_SNIPPETS,
    "more":"http://gatb-core.gforge.inria.fr/doc/api/snippets_storage.html"
  },
  {
    "name": "SNP detection",
    "nav":"snp",
    "description":"From theory to practice: how did we create DiscoSNP?",
    "trail_path":ADVANCED_TRAIL, 
    "snippets": ADVANCED_SNP_SNIPPETS,
    "more":"https://github.com/GATB"
  },
  {
    "name": "Bank",
    "nav":"bank",
    "description":"Bank APIs provide classes and methods to read and write sequence files.<br/>Supported formats are Fasta and Fastq, plain text or compressed (gzip) files.<br/>In the following lessons, discover how easy it is to handle sequence files using GATB-Core 'Bank' API.",
    "trail_path":TRAINING_TRAIL, 
    "snippets": TRAINING_BANK_SNIPPETS
  },
  {
    "name": "k-mer",
    "nav":"kmer",
    "description":"k-mer APIs provide classes and methods to handle the basics of De Bruijn graphs: k-mers, i.e. short sequences of 'k' nucleotides.<br/>GATB-Core provides a convenient API to deal with k-mers, as illustrated in these lessons.",
    "trail_path":TRAINING_TRAIL, 
    "snippets": TRAINING_KMER_SNIPPETS
  },
  {
    "name": "graph",
    "nav":"graph",
    "description":"Graph API provides classes and methods to handle De Bruijn graphs.",
    "trail_path":TRAINING_TRAIL, 
    "snippets": TRAINING_GRAPH_SNIPPETS
  }
];


/*
 * Added since this tutorial only works on Firefox and Chrome, for now.
 * Problem comes from new File() in allgo connection code. This constructor is only
 * available for Firefox and Chrome.
 */
function checkBrowser(){
  //from: http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
      // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
      // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
      // Safari 3.0+ "[object HTMLElementConstructor]" 
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
      // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
      // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
      // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;
      // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;
  
  var notice="<br /><br />";
  notice+="<small>";
  if ((isFirefox || isChrome || isSafari) == false){
    notice+="<span style='color: red;' class='glyphicon glyphicon-warning-sign' aria-hidden='true'></span> ";
    notice+="<i>For now, this tutorial works only with recent release of <u>Firefox</u>, <u>Safari</u> and <u>Chrome</u> ";
    notice+="web browsers...<br/>";
  }
  notice+="<a href='https://github.com/GATB/gatb-core-tuto/issues' target='_blank'>Contact us</a> if you have any comments regarding this tutorial.</i>";
  notice+="</small>";
  $("#nav-beta-notice").html(notice);
}

