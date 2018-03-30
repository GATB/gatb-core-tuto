### Allgo check application -------------------------------------------------------------
#
#   This simple application automatically checks that GATB-Compiler is up and running
#   on the Allgo platform.
#
#   For internal use by the Genscale team on Inria's Jenkins CI platform.
#
#   Use as follows:
#      python check.py <app_id> <app_token> [<verbose>]
#
#      with:  <app_id>: Allgo application to run (Mandatory)
#             <app_token>: Allgo API access token (Mandatory)
#             <verbose>: y or n (default is n) 
#
#   Requirements: tested with Python 2.7; not compatible with Python 3.
#
#   Author: Patrick G. Durand, Inria - April 2017
#
#   License: release under the terms of Affero-GPL
#   https://www.gnu.org/licenses/agpl-3.0.txt

import sys
import os
import urllib
import urllib2
import json
import time

from multipart import *

### Globals -----------------------------------------------------------------------------

# do we provide some logs on std::out?
# can be overridden using optional cmd-line 3rd argument 
__VERBOSE__=False
# URL to use Allgo API
__ALLGO_API_URL__="https://allgo.inria.fr/api/v1/jobs"
# we wait no more than 5 seconds to get an answer from Allgo
__TIMEOUT__=5
# Application ID: (use cmd-line 1st argument)
__APP_ID__="n/a"
# Application token (use cmd-line 2nd argument)
__APP_TOKEN__="n/a"
# Sample snippet to send to GATB-Compiler
__DEFAULT_CPP_CODE__="bank1.cpp"
__DEFAULT_DATA_SAMPLE__="fasta_medium"
# We will try this number of times to get a valid job result from Allgo
__TRIALS_MAX__=5

### Function ----------------------------------------------------------------------------
#
#   Check whether or not server answer and header are OK. If not, program exit.
#
#   Argument: request handle from urllib2
#   Return: n/a
#
def requestOK(handle):
  # Request OK means HTTPcode=200
  if handle.getcode()!=200:
    print ("ERROR: server does not answer OK. Answer is: %d " % handle.getcode())
    sys.exit(1)
  # This is used to handle "old" Allgo problem where a server mis-configuration
  # sent more than one (expected) Access-Control-Allow-Origin in response headers.
  # Use lower() to ensure correct string comparison.
  allowOrigin=0
  response_headers=handle.info()
  for key in response_headers.keys():
    if key.lower()=="access-control-allow-origin":
      allowOrigin+=1
  if allowOrigin!=1:
    print ("ERROR: server response des not contain expected Access-Control-Allow-Origin.")
    print (response_headers)
    sys.exit(1)

### Function ----------------------------------------------------------------------------
#
#   Send a request.
#
#   Argument: urllib2 request
#   Return: request handle
#
def sendRequest(request):
  # http://www.voidspace.org.uk/python/articles/urllib2_francais.shtml#number-2
  try:
    handle = urllib2.urlopen(request, timeout=__TIMEOUT__)
  except IOError, e:
    print ("ERROR")
    if hasattr(e, "reason"):
      print ("  unable to reach server: %s " % e.reason)
    elif hasattr(e, "code"):
      print ("  server cannot handle request. Code is: %s" % e.code)
    sys.exit(1)
  return handle

### Function ----------------------------------------------------------------------------
#
#   Prepare the initial request to send to Allgo. Here, we simply prepare some data to
#   send to GATB-Compiler: a c++ snippet.
#
#   Argument: none
#   Return: an urllib2 request
#
def prepareInitialRequest():
  # Create the form with simple fields
  form = MultiPartForm()
  # Allgo app ID
  form.add_field("job[webapp_id]", "%s" % __APP_ID__)
  # cmd-line for app 
  form.add_field("job[param]", "-s %s -d %s" % (__DEFAULT_CPP_CODE__, __DEFAULT_DATA_SAMPLE__))
  # Add a c++ snippet file
  with open(__DEFAULT_CPP_CODE__, "r") as sc:
    form.add_file("files[0]", os.path.basename(__DEFAULT_CPP_CODE__), sc )
  # Build the request
  request = urllib2.Request(__ALLGO_API_URL__)
  body = str(form)
  # we request a JSON response from Allgo
  request.add_header("Accept", "application/json")
  # we identity ourself
  request.add_header("Authorization", "Token token=%s" % __APP_TOKEN__)
  # we prepare the POST
  request.add_header("Content-type", form.get_content_type())
  request.add_header("Content-length", len(body))
  request.add_data(body)

  if __VERBOSE__:
    print
    print ("INFO: outgoing data: start:")
    print (request.get_data())
    print ("INFO: outgoing data: end.")
  return request

### Function ----------------------------------------------------------------------------
#
#   Get Allgo job ID.
#
#   Argument: initial server response.
#   Return: job ID
#
def getJobId(data):
  return data["id"]

### Function ----------------------------------------------------------------------------
#
#   Get Allgo job URL.
#
#   Argument: initial server response.
#   Return: job URL
#
def getJobUrl(data):
  return data["url"]

### Function ----------------------------------------------------------------------------
#
#   Get Allgo job status.
#
#   Argument: job URL.
#   Return: job status
#
def getJobStatus(job_url):
  if __VERBOSE__:
    print ("INFO: getJobStatus: %s" % job_url)
  # Build the request
  request = urllib2.Request(job_url)
  request.add_header("Accept", "application/json")
  request.add_header("Authorization", "Token token=%s" % __APP_TOKEN__)
  # send request
  handle=sendRequest(request)
  # check answer
  requestOK(handle)
  # read server response
  return handle.read()

### Function ----------------------------------------------------------------------------
#
#   Enter a finite loop to query Allgo and get a result. Nb. loop steps is fixed
#   using global __TRIALS_MAX__. Sleep __TIMEOUT__ seconds between successive allgo 
#   requests.
#
#   Argument: job ID and job URL.
#   Return: url of compile.log file if OK, "n/a" otherwise.
#
def waitForResult(job_id, job_url):
  if __VERBOSE__:
    print ("INFO: waitForResult: %s" % job_url)
  trials=0
  jobLogFile="n/a"
  sid="%d"%job_id
  while(True):
    if __VERBOSE__:
      print ("INFO: try %d" % (trials+1))
    job_status=json.loads(getJobStatus(job_url))
    # job_status obtained above looks like:
    # { "16755":
    #   { "bank1.cpp":"https://.../bank1.cpp",
    #     "output.log":"https://.../output.log",
    #     "compile.log":"https://.../compile.log",
    #     "allgo.log":"https://.../allgo.log",
    #     "gatb-bin":"https://.../gatb-bin"
    #   },
    #   "status":"done"
    # }

    # we display status information (in progress, done, error) whatever verbose mode
    print("INFO: Job: {}".format(job_status["status"]))
    if job_status["status"] == "done":
        jobLogFile=job_status[sid]["compile.log"]
        break
    trials+=1
    if trials>__TRIALS_MAX__:
      break
    time.sleep( __TIMEOUT__ )
  return jobLogFile

### Function ----------------------------------------------------------------------------
#
#   Check whether or not GATB-Compile was able to do its job.
#
#   Argument: url of compile.log file.
#   Return: -
#
def checkCompileLog(log_url):
  if __VERBOSE__:
    print ("INFO: checkCompileLog: %s" % log_url)
  if log_url=="n/a":
    print("ERROR: unable to get compile.log file from server")
    sys.exit(1)
  # Build the request
  request = urllib2.Request(log_url)
  request.add_header("Accept", "application/json")
  request.add_header("Authorization", "Token token=%s" % __APP_TOKEN__)
  # send request
  handle=sendRequest(request)
  # check an,swer
  requestOK(handle)
  # read server response and check for ERROR
  response=handle.read()
  if response.find("ERROR")!=-1:
    print("ERROR: GATB-Compiler failed. Check: %s "% log_url)
    sys.exit(1)

#####################################################################################
# MAIN                                                                              #
#####################################################################################
# we get the appID, token and verbose mode (optional) from the command line
if len(sys.argv)<3:
  print ("ERROR: please provide token")
  sys.exit(1)
__APP_ID__=sys.argv[1]
__APP_TOKEN__=sys.argv[2]
if len(sys.argv)==4:
  if sys.argv[3].lower()[0]=="y":
    __VERBOSE__=True
  else:
    __VERBOSE__=False
# start GATB-Compiler job on Allgo
rq=prepareInitialRequest()
sr=sendRequest(rq)
# check request
requestOK(sr)
# read server first response
response=sr.read()
if __VERBOSE__:
  print("INFO: Server initial answer:")
  print response
# we have a JSON data structure like:
#  {"avg_time":2,"id":8033,"url":"https://allgo.inria.fr/api/v1/jobs/8033"}
# from which we can get job ID and URL to use to get Job status
data=json.loads(response)
jid=getJobId(data)
jurl=getJobUrl(data)
if __VERBOSE__:
  print("INFO: Job id: %s " % jid)
  print("INFO: Job url: %s "% jurl)
# loop a finite amount of time to get a valid anwser
checkCompileLog(waitForResult(jid, jurl))
# Get here: cool!
print ("INFO: SUCCESS: GATB-Compiler: online and working fine!")
