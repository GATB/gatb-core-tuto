/**
 * This package contains methods to handle Ace editor and console.
 * 
 * The former is used to display a c++ code editor.
 * The latter is used to display a console; it serves at displaying
 * results coming from Allgo/GATB-Compiler job execution.
 *
 * Author: Patrick Durand, Inria - October 2016
 * 
 * License: release under the terms of Affero-GPL
 * https://www.gnu.org/licenses/agpl-3.0.txt
 */

/**
 * Prepare the Ace c++ code editor.
 */
function prepareAceEditor(){
  //create and init the editor
  var editor = ace.edit(HTML_ELEMENT_CODE_EDITOR);
  editor.setTheme("ace/theme/chrome");
  editor.session.setMode("ace/mode/c_cpp");
  
  //create and init a status bar
  var StatusBar = ace.require("ace/ext/statusbar").StatusBar;
  var statusBar = new StatusBar(editor, document.getElementById(HTML_ELEMENT_STATUS_BAR));
  
  //pre-load a GATB sample code from github
  $(document).ready(function(){
    var snippet = getUrlParameter(URL_PARAMETER_SNIPPET);
    if (snippet === undefined){
      console.log("No snippet found. Use default snippet: "+DEFAULT_SNIPPET);
      snippet = DEFAULT_SNIPPET;
    }
    var snippet_url = getSnippetUrl(snippet);
    if (snippet_url === undefined){
      console.log("No snippet URL found for: "+snippet);
      snippet_url=getSnippetUrl(DEFAULT_SNIPPET);
      console.log("Use default snippet: "+DEFAULT_SNIPPET);
    }
    console.log("Load snippet from: "+snippet_url);
    $.ajax(
    {
      url: snippet_url, 
      success: 
        function(result){
          editor.setValue(result, 1);
          editor.scrollToRow(1);
          //here is another way to get the editor, FYI:          
          //var el = $("#"+HTML_ELEMENT_CODE_EDITOR);
          //editor.xxx();
        }
    });
    updateLessonTitle(snippet);
    updateNavBar(snippet);
    updateLessonDescription(snippet);
    updateClassesUsed(snippet);
    updateDataSetUrl(snippet);
  });
}

/**
 * Prepare the console read-only Ace editor. It is used to display
 * compiling status.
 */
function prepareAceCompConsole(){
  //create the editor
  var result = ace.edit(HTML_ELEMENT_COMP_CONSOLE);
  result.setTheme("ace/theme/chrome");
  result.session.setMode("ace/mode/c_cpp");
  result.setReadOnly(true);
}

/**
 * Prepare the console read-only Ace editor. It is used to display
 * program running status.
 */
function prepareAceRunConsole(){
  //create the editor
  var result = ace.edit(HTML_ELEMENT_RUN_CONSOLE);
  result.setTheme("ace/theme/chrome");
  result.session.setMode("ace/mode/c_cpp");
  result.setReadOnly(true);
}
