/**
 * This package contains methods to handle A||GO connections:
 * 
 * 1. submit a job with a c++ code snippet
 * 2. retrieve results
 *
 * Author: Patrick Durand, Inria - October 2016
 * 
 * License: release under the terms of Affero-GPL
 * https://www.gnu.org/licenses/agpl-3.0.txt
 */

/**
 * Call function 'fn' asynchronously.
 */
function async(fn) {
    setTimeout(function() {
        fn();
    }, 0);
}

/**
 * Reset content of compile and results Ace Editors.
 */
function cleanConsoles(){
    setResultText(HTML_ELEMENT_COMP_CONSOLE, "-");
    $("#"+HTML_ELEMENT_COMP_CONSOLE+"-icon").html("");
    setResultText(HTML_ELEMENT_RUN_CONSOLE, "-");
    $("#"+HTML_ELEMENT_RUN_CONSOLE+"-icon").html("");
}

/**
 * Submit a new job to A||GO server.
 */
function call_allgo(dataSetName, cmdline) {
    // retrieve the c++ code snippet from the editor
    var editor = document.getElementById(HTML_ELEMENT_CODE_EDITOR).env.editor;
    var blob = new Blob([editor.getValue()], {type: "text/plain;charset=utf-8"});
    var tk = getDataHash();
    
    // prepare form data
    var formData = new FormData();
    // the A||GO/GATB-Compiler application ID (mandatory)
    formData.append("job[webapp_id]", 151);
    //A||GO/GATB-Compiler script accepts arguments-based command line:
    // -s <source_code_file_name> (mandatory)
    // -d <data_set_key_name> (optional)
    // -a "<"cmdline>" (optional)
    var args="-s ";
    args+=DEFAULT_SNIPPET_CODE_NAME;
    if (dataSetName===undefined){
      dataSetName=DEFAULT_DATA_SET_NAME;
    }
    args+=" -d ";
    args+=dataSetName;
    
    if (cmdline!==undefined){
      args+=" -a ";
      args+=cmdline;
    }
    
    console.log("args: "+args);
    formData.append("job[param]", args);
    formData.append("files[0]", blob, DEFAULT_SNIPPET_CODE_NAME);
    
    $("#"+HTML_ELEMENT_COMPILE_BTN).attr('disabled','disabled');
    async(cleanConsoles);
    
    //send GET to A||GO
    console.log("Sending request to Allgo...");
    $.ajax({
        type: 'POST',
        url: 'https://allgo.inria.fr/api/v1/jobs',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        headers: { 'Authorization': 'Token token='+tk,
        'Accept':'application/json'
       },
        success: function(d, s, ex) {
          console.log("job submission: success");
          console.log(d);
          $( "#"+HTML_ELEMENT_JB_MON ).html( "<p style='color:green;font-weight: bold;'>Job running...</p>" );
          setResultText(HTML_ELEMENT_COMP_CONSOLE, "-");
          setResultText(HTML_ELEMENT_RUN_CONSOLE, "-");
          getAllgoResponseLoop(d, tk, 0);
        },
        error : function(d, s, ex){
          $("#"+HTML_ELEMENT_COMPILE_BTN).removeAttr('disabled');
          console.log("!!!!!");
          console.log("job submission: error. Status: "+s);
          console.log("Exception: "+ex);
          console.log("!!!!!");
          $( "#"+HTML_ELEMENT_JB_MON ).html( "<p style='color:red;font-weight: bold;'>Error: "+d.status+": "+d.statusText+". Job aborted. </p>");
       }
      })
    return false;
}

/**
 * Start some kin of loop to monitor A||GO job execution.
 * 
 * Every 2 seconds, this code sends a request to A||GO to checker
 * whether or not the job is done.
 *
 * @param data original A||GO response obtained as a result of the
 * job submission (actually a JSON object where we are interested in
 * reusing 'url' data element)
 *
 * @param token authentication  token to access the A||GO/GATB-Compiler
 * using A||GO API.
 */
function getAllgoResponseLoop(data, token, counter) {
  var result;
  
  counter++;
  
  setTimeout(function() {
    //connect to A||GO abd get its status (A JSON object)
    result = getAllgoResponse(data,token);
    console.log("Attempt #"+counter);
    
    if (result.status !== undefined) {
      if (counter>RETRY_CONNECT_ALLGO){
      $("#"+HTML_ELEMENT_JB_MON).html("<p style='color:red;font-weight: bold;'>Job timed out.</p>");
        $("#"+HTML_ELEMENT_COMPILE_BTN).removeAttr('disabled');
        return;
      }
      //result not yet ready
      getAllgoResponseLoop(data,token,counter);
    }
    else {
      //job ready, check for result
      if (result[data.id] !== undefined) {
        processResultFile(HTML_ELEMENT_COMP_CONSOLE, "compile.log", result[data.id]['compile.log']);
        processResultFile(HTML_ELEMENT_RUN_CONSOLE, "output.log", result[data.id]['output.log']);
        $("#"+HTML_ELEMENT_JB_MON).html("<p style='color:green;font-weight: bold;'>Job done.</p>");
        $("#"+HTML_ELEMENT_COMPILE_BTN).removeAttr('disabled');
        $('[href="#'+HTML_ELEMENT_COMP_CONSOLE_TAB+'"]').tab('show');
      }
    }
  }, 2000 /*Time to wait between successive Allgo call: 2 seconds */);
}

/**
 * Retrieve a log file and display the content in the appropriate console.
 *
 * @consoleID element ID of the console.
 * @resUrlName resource Url name. One of the log to retrieve from A||GO server.
 * @outLogUrl the URL of the resource file to retrieve.
 */
function processResultFile( consoleID, resUrlName, outLogUrl){
  // Check over here if outLogUrl is not empty
  if(outLogUrl == null){
    // outLogUrl is undefined, we stop the script and display an error message
    console.log(resUrlName+" is null");
    $( "#"+HTML_ELEMENT_JB_MON ).html( "<p style='color:red;font-weight: bold;'>Job done with error: no result file from Allgo</p>" );
    manageResultIcon(consoleID, "");
  }
  else{
    // got a result: displat it
    console.log("Getting result from: "+outLogUrl);
    $.get({
      url: outLogUrl,
      success: function(data) {
        console.log("Result ok for: "+outLogUrl);
        console.log("  now update: "+consoleID);
        setResultText(consoleID, data);
        manageResultIcon(consoleID, data);
      },
      error: function(data) {
        console.log("Result error for: "+outLogUrl);
        setResultText(consoleID, "");
        manageResultIcon(consoleID, "");
      }
    });
  }
}

function manageResultIcon(consoleID, data){
  if (data.search("SUCCESS")!=-1){
    console.log("    success for: "+consoleID);
    $("#"+consoleID+"-icon").html("<span class='glyphicon glyphicon-ok-sign' aria-hidden='true'style='color:green'></span>");
  }
  else{
    console.log("    failure for: "+consoleID);
    $("#"+consoleID+"-icon").html("<span class='glyphicon glyphicon-warning-sign' aria-hidden='true' style='color:red'></span>");
  }
}

/**
 * Send a query to A||GO.
 * 
 * @param data original A||GO response obtained as a result of the
 * job submission (actually a JSON object where we are interested in
 * reusing 'url' data element)
 *
 * @param token authentication  token to access the A||GO/GATB-Compiler
 * using A||GO API.
 *
 * @return a JSON object (success) or undefined (failure)
 */
function getAllgoResponse(data, token) {
  var result;
  console.log("Connecting Allgo to get job result...");
  $.get({
    url: data.url,
    async: false,
    headers: {
      'Authorization': 'Token token='+token,
      'Accept': 'application/json',
    },
    success: function(d, s, ex) {
      console.log('A||GO request: ok');
      console.log(d);
      console.log(s);
      console.log(ex);
      result = d;
    },
    error: function(d, s, ex) {
      console.log('A||GO request: error');
      console.log(d);
      console.log(s);
      console.log(ex);
    }
  });
  return result;
}

/**
 * Return a data hash.
 */
function getDataHash(){
  var tkf = "";
  var tk2=DATA_HASHA.concat(DATA_HASHB).reverse();
  for(var i=0;i<tk2.length;i++){
    tkf+=tk2[i];
  }
  return tkf;
}

/**
 * Update content of console.
 */
function setResultText( consoleID, data ){
  var editor = document.getElementById(consoleID).env.editor;
  editor.setValue(data, 1);
  editor.scrollToRow(1);
  //editor.resize();
  //editor._emit('change');
  //document.getElementById(consoleID).click();
}

