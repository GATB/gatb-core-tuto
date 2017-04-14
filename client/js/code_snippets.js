/**
 * This package contains methods to handle GATB code snippets that are
 * available for the tutorial.
 * 
 * Author: Patrick Durand, Inria - October 2016
 * 
 * License: release under the terms of Affero-GPL
 * https://www.gnu.org/licenses/agpl-3.0.txt
 */

/**
 * Return a snippet code URL given its name.
 *
 * @param snippet_name a snippet name
 *
 * @return a snippet URL or undefined if not found
 */
function getSnippetUrl(snippet_name){
  var i,j;
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
      if (ALL_SNIPPETS[i].snippets[j].name==snippet_name){
        return ALL_SNIPPETS[i].snippets[j].url;
      }
    }
  }
  return undefined;
}

/**
 * Return a snippet data-set key name given its name.
 *
 * A data-set key name is used on the A||GO server side to
 * figure out which data file has to be used with the code
 * snippet. 
 *
 * @param snippet_name a snippet name
 *
 * @return a data-set key name or undefined if not found
 *
 * @see /home/allgo/data/data-file-mapper.txt on the
 * GATB-Compiler VM on A||GO.
 */
function getSnippetDataSet(snippet_name){
  var i,j;
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
      if (ALL_SNIPPETS[i].snippets[j].name==snippet_name){
        return ALL_SNIPPETS[i].snippets[j].data_set;
      }
    }
  }
  return undefined;
}

/**
 * Return a snippet argsline, if any, given its name.
 *
 * A argsline contains snippet arguments to be used on the
 * command-line 'as is'.
 *
 * @param snippet_name a snippet name
 *
 * @return a string containing the arguments or undefined 
 * if not found
 */
function getSnippetArgsLine(snippet_name){
  var i,j;
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
      if (ALL_SNIPPETS[i].snippets[j].name==snippet_name){
        return ALL_SNIPPETS[i].snippets[j].cmdline;
      }
    }
  }
  return undefined;
}

/**
 * Display the title of the lesson.
 * This function actually updates "lesson-title" in gatb-compiler HTML page.
 *
 * @param snippet_name a snippet name
 */
function updateLessonTitle(snippet_name){
  var i,j;
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
      if (ALL_SNIPPETS[i].snippets[j].name==snippet_name){
        $( "#lesson-title" ).html(ALL_SNIPPETS[i].snippets[j].title);
        return;
      }
    }
  }
}

/**
 * Display the description of the lesson.
 * This function actually updates "lesson-description" in gatb-compiler HTML page.
 *
 * @param snippet_name a snippet name
 */
function updateLessonDescription(snippet_name){
  var i,j;
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
      if (ALL_SNIPPETS[i].snippets[j].name==snippet_name){
        $( "#lesson-description" ).html(ALL_SNIPPETS[i].snippets[j].description);
        return;
      }
    }
  }
}

/**
 * Display the list of classes to learn for a given lesson.
 * This function actually updates "classes-to-learn" in gatb-compiler HTML page.
 *
 * @param snippet_name a snippet name
 */
function updateClassesUsed(snippet_name){
  var i, j, k;
  var out=""; 
  
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
      if (ALL_SNIPPETS[i].snippets[j].name==snippet_name){
        var classes_used = ALL_SNIPPETS[i].snippets[j].classes;
        if (classes_used!==undefined){
          if (ALL_SNIPPETS[i].snippets[j].type==SNIPPET_TYPE_LESSON){
            out += CLASSES_TO_LEARN_INTRO;
          }
          else{
            out += "<span class='glyphicon glyphicon-comment' aria-hidden='true'></span>&nbsp;&nbsp;";
            out += EXERCICE_HINT_INTRO;
          }
          out += " <ul>";
          for(k = 0; k < classes_used.length; k++) {
            out += '<li>';
            out += '<a href="' + classes_used[k].doc_url + '" target="_blank">' + classes_used[k].name + '</a>: ';
            out += classes_used[k].doc;
            out += '</li>';
          }
          out += '</ul>';
          if (ALL_SNIPPETS[i].snippets[j].type==SNIPPET_TYPE_EXERCISE){
            out += EXERCICE_HINT_WORK;
          }
        }
        
        if (ALL_SNIPPETS[i].snippets[j].classes_description!==undefined){
          out+=ALL_SNIPPETS[i].snippets[j].classes_description;
        }
        $( "#classes-to-learn" ).html(out);
        return;
      }
    }
  }
}

/**
 * Utility method to prepare the lesson navigation bar.
 * This function actually updates "lesson-nav-bar" in gatb-compiler HTML page.
 
 * @param snippet_name a snippet name. 
 */
function updateNavBar(snippet_name){
  var i,j;
  var out="<small>";
  
  out+=NAV_BAR_INTRO;
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
      if (ALL_SNIPPETS[i].snippets[j].name==snippet_name){
        out+="<a href='index.html?trail=";
        out+=ALL_SNIPPETS[i].trail_path;
        out+="'>";
        out+=ALL_SNIPPETS[i].trail_path;
        out+=" Trail</a> &#x25b8; <a href='index.html?trail=";
        out+=ALL_SNIPPETS[i].trail_path;
        out+="&cat=";
        out+=ALL_SNIPPETS[i].nav;
        out+="'>";
        out+=ALL_SNIPPETS[i].name;
        out+="</a> &#x25b8; ";
        out+=ALL_SNIPPETS[i].snippets[j].nav;
      }
    }
  }
  out+="</small>";
  $( "#lesson-nav-bar" ).html(out);
}

/**
 * Utility method to prepare the trails navigation bar.
 * This function actually updates "trail-nav-bar" in main HTML page.
 *
 * @param trailName a trail name. 
 */
function updateTrailNavBar(trailName){
  var i,j;
  var tokens="";
  var out="<small>";
  
  // Special case: Training trail is the GATB Team onsite course. So, 
  // during such a session, we do not allow an easy access to other 
  // trails, so that trainees focus on the course!
  if (trailName.indexOf(TRAINING_TRAIL)>=0){
    out+="</small>";
    $( "#trail-nav-bar" ).html(out);
    return;
  }
  // We display Trails Navigation Bar for all other trail types
  out+=TRAIL_NAV_BAR_INTRO;
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    
    if (ALL_SNIPPETS[i].trail_path!=trailName){
      console.log(trailName+" : "+ALL_SNIPPETS[i].trail_path);
      if (tokens.indexOf(ALL_SNIPPETS[i].trail_path)<0){
        if (tokens.length!=0){
          out+=", ";
        }
        out+="<a href='index.html?trail=";
        out+=ALL_SNIPPETS[i].trail_path;
        out+="'>";
        out+=ALL_SNIPPETS[i].trail_path;
        out+="</a>";

        tokens+=",";
        tokens+=ALL_SNIPPETS[i].trail_path;
      }
    }
  }
  out+="</small>";
  $( "#trail-nav-bar" ).html(out);
}

/**
 * Utility method to list available lessons for a particular Tutorial Trail.
 * This function actually updates "trail-concepts" in index HTML page.
 * 
 * @param trailName a trail name. 
 */
function updateTrailConceptsFlatPanels(trailName){
  var i,j;
  var out="";
  
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    if (ALL_SNIPPETS[i].trail_path==trailName){
      out+="<div class='panel panel-info'>";
      out+="<div class='panel-heading'>";
      out+="<span class='glyphicon glyphicon-folder-open' aria-hidden='true'></span> ";
      out+="&nbsp;&nbsp;Learn "+ALL_SNIPPETS[i].name+" APIs</div>";
      out+="<div class='panel-body'>";
      out+="<table border='0'><tr><td>";
      out+="<span class='glyphicon glyphicon-hand-right' aria-hidden='true'></span>&nbsp;&nbsp;";
      out+="</td><td>&nbsp;&nbsp;</td><td>";
      out+=ALL_SNIPPETS[i].description;
      out+="</td></tr></table>";
      out+="<br/><ul>";
      //it is possible to use bootstrap glyphicon to replace standard <li> bullet: 
      //http://stackoverflow.com/questions/31196980/using-a-glyphicon-as-an-li-bullet-point-bootstrap-3
      //maybe of interest to highlight lesson vs. exercise type...
      for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
        out+="<li><a href='";
        out+="gatb-compiler.html?snippet=";
        out+=ALL_SNIPPETS[i].snippets[j].name;
        out+="'>";
        out+=ALL_SNIPPETS[i].snippets[j].title;
        out+="</a><br/>";
        out+=ALL_SNIPPETS[i].snippets[j].description;
        out+="<br/><br/></li>";
      }
      out+="</ul>";
      out+="</div>";
      out+="</div>";
    }
  }
  $( "#trail-concepts" ).html(out);
}

/**
 * Utility method to list available lessons for a particular Tutorial Trail.
 * This function actually updates "trail-concepts" in index HTML page.
 * 
 * @param trailName a trail name. 
 */
function updateTrailConceptsCollapsePanels(trailName, catToShow){
  var i,j;
  var out="<div class='panel-group' id='accordion'>";
  var key="";
  var bFirst=true;
  
  if (catToShow===undefined){
    for(i = 0; i < ALL_SNIPPETS.length; i++) {
      if (ALL_SNIPPETS[i].trail_path==trailName){
        catToShow=ALL_SNIPPETS[i].nav;
        break;
      }
    }
  }
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    if (ALL_SNIPPETS[i].trail_path==trailName){
      key="collapse"+i;
      out+="<div class='panel panel-info'>";
      out+="<div class='panel-heading'>";
      out+="<h4 class='panel-title'>";
      out+="<a data-toggle='collapse' data-parent='#accordion' href='#"+key+"'>";
      out+="<span class='glyphicon glyphicon-folder-open' aria-hidden='true'></span>&nbsp;&nbsp;";
      out+="Learn "+ALL_SNIPPETS[i].name+" APIs";
      out+="</a></h4></div>";
      if (bFirst==true && ALL_SNIPPETS[i].nav==catToShow){
        bFirst=false;
        out+="<div id='"+key+"' class='panel-collapse collapse in'>";
      }
      else{
        out+="<div id='"+key+"' class='panel-collapse collapse'>";
      }
      out+="<div class='panel-body'>";
      out+="<table border='0'><tr><td style='vertical-align:top'>";
      out+="<span class='glyphicon glyphicon-hand-right' aria-hidden='true'></span>&nbsp;&nbsp;";
      out+="</td><td>&nbsp;&nbsp;</td><td>";
      out+=ALL_SNIPPETS[i].description;
      out+="</td></tr></table>";
      out+="<br/><ul>";
      //it is possible to use bootstrap glyphicon to replace standard <li> bullet: 
      //http://stackoverflow.com/questions/31196980/using-a-glyphicon-as-an-li-bullet-point-bootstrap-3
      //maybe of interest to highlight lesson vs. exercise type...
      for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
        out+="<li><a href='";
        out+="gatb-compiler.html?snippet=";
        out+=ALL_SNIPPETS[i].snippets[j].name;
        out+="'>";
        out+=ALL_SNIPPETS[i].snippets[j].title;
        out+="</a><br/>";
        out+=ALL_SNIPPETS[i].snippets[j].description;
        out+="<br/><br/></li>";
      }
      if(ALL_SNIPPETS[i].more!==undefined){
        out+="<li>More code";
        if(ALL_SNIPPETS[i].trail_path==ADVANCED_TRAIL){
          out+="s";
        }
        else{
          out+=" snippets";
        }
        out+=" are available <a href='";
        out+=ALL_SNIPPETS[i].more;
        out+="' target='_blank'>here</a></li>";
      }
      out+="</ul>";
      out+="</div>";
      out+="</div>";
      out+="</div>";
    }
  }
  out+="</div>";
  $( "#trail-concepts" ).html(out);
}

/**
 * Utility method to list available lessons for a particular Tutorial Trail.
 * This function actually updates "trail-concepts" in index HTML page.
 * 
 * @param trailName a trail name. 
 */
function updateTrailConcepts(trailName, catToShow){
  if (TRAIL_CONCEPTS_FLAT_PANELS==true){
    updateTrailConceptsFlatPanels(trailName);
  }
  else{
    updateTrailConceptsCollapsePanels(trailName, catToShow);
  }
}
/**
 * Utility method to display exercice solution after some time delay. 
 *
 * @param snippet_name a snippet name 
 */
function updateSnippetExerciseSolution(snippet_name){
  var snippet_obj=undefined;
  for(i = 0; i < ALL_SNIPPETS.length; i++) {
    for(j = 0; j < ALL_SNIPPETS[i].snippets.length; j++) {
      if (ALL_SNIPPETS[i].snippets[j].name==snippet_name){
      snippet_obj=ALL_SNIPPETS[i].snippets[j];
      }
    }
  }
  if (snippet_obj===undefined){
    return;
  }
  if (snippet_obj.type!=SNIPPET_TYPE_EXERCISE){
    return;
  }
  // setup waiting message
  out="<div class='panel-group'>";
   out+="<div class='panel panel-default'>";
    out+="<div class='panel-heading'>";
     out+="<a data-toggle='collapse' href='#collapse1'>Solution</a>";
    out+="</div>";
    out+="<div id='collapse1' class='panel-collapse collapse'>";
     out+="<div style='margin: auto; width: 90%;'>";
      out+="<span class='glyphicon glyphicon-eye-close' aria-hidden='true'></span> solution available in one minute...";
       out+="<div id='pb-wait-sol' class='progress'>";
        out+="<div class='progress-bar progress-bar-info progress-bar-striped' role='progressbar' aria-valuemin='0' aria-valuemax='60' style='width: 100%;'>";
         out+="<span class='sr-only'></span>";
        out+="</div>";
       out+="</div>";
     out+="</div>";
    out+="</div>";
   out+="</div>";
  out+="</div>";
  
  // setup solution message
  solution="<div style='margin: auto; width: 90%;'>Add the following code:</div>";
  //<!-- Future evolution: pretiffy solution code snippet -->
  //<!-- http://stackoverflow.com/questions/10862021/syntax-highlighting-on-twitter-bootstrap -->
  solution+="<pre style='margin: auto; width: 90%;'>";
  solution+=snippet_obj.solution.code;
  solution+="</pre>";
  solution+="<div style='margin: auto; width: 90%;'>after line ";
  solution+=snippet_obj.solution.line;
  solution+="</div>";
  
  // display waiting message
  $( "#snippet-solution" ).html(out);

  var i = WAIT_TIME_SOLUTION;
  var counterBack = setInterval(function(){
    i--;
    if (i > 0){
      $('#pb-wait-sol').css('width', (100*i/WAIT_TIME_SOLUTION)+'%');
    }
    else {
      clearInterval(counterBack);
      // discard waiting message and display solution
      $("#collapse1").html(solution);
    }
  }, 1000);
}

/**
 * Utility method to display data-set download URL. 
 *
 * @param snippet_name a snippet name 
 */
function updateDataSetUrl(snippet_name){
  var dFile=undefined;
  var dMapperUrl=DATA_SET_LOADER_URL+DATA_MAPPER_FILE;
  var dataSetName=getSnippetDataSet(snippet_name);
  var codeUrl=getSnippetUrl(snippet_name);
  
  $.get({
    url: dMapperUrl,
    success: function(data) {
      // 'data' is the String repr of the "data-file-mapper.txt" file, 
      // so we scan that String line by line
      var parts = data.split("\n");
      // we locate lines having format: dataSetName=dataSetPath
      // e.g. fasta_small=/home/allgo/data/celegans_reads.fasta
      for(var i = 0;i<parts.length;i++){
        if (parts[i].indexOf(dataSetName)!=-1){
          dFile=parts[i].split("=")[1];
          // as stated above, right parts[i] of "=" is a file path
          // and from that path, we retrieve file name
          if (parts[i].indexOf("/")!=-1){
            var fparts=dFile.split("/");
            dFile=fparts[fparts.length-1];
          }
          // having file name, we can setup the URL
          var out="<small>The&nbsp;";
          out+="<span class='glyphicon glyphicon-download-alt' aria-hidden='true'></span>&nbsp;";
          out+="<a href='"+codeUrl+"' target='_blank'>";
          out+="above code</a> will be executed using&nbsp;";
          out+="<span class='glyphicon glyphicon-download-alt' aria-hidden='true'></span>&nbsp;";
          out+="<a href='"+DATA_SET_LOADER_URL+dFile+"' target='_blank'> this sample data file</a>&nbsp;";
          out+="(it is passed to the program as the first argument)</small><p>&nbsp;</p>";
          $("#g-run-console-dset").html(out);
        }
      }
    },
    error: function(data) {
      console.log("Error while handling: "+dMapperUrl);
      alert("Unable to locate data-set: "+dataSetName+".");
    }
  });
}

/**
 * Utility method to get a URL value given a key name.
 *
 * Sample:
 *   if   URL is: http://xxx/index.html?snippet=bank1
 *   then getUrlParameter("snippet") returns bank1
 *
 * @param sParam a URL parameter
 *
 * @return sParam value or undefined
 */
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

