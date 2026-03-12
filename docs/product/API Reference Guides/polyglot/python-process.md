---
title: Python
---

Python can be used to run processes in the OpenDataDSL platform.

Processes can be triggered:
* On a schedule by setting a cron property
* Event-driven, using an automation
* Manually in the web portal, REST API or ODSL code

## Creating a process

There are 3 specific properties to set on a process to run it as a Node.js process:
* image - The name of docker image to run, you can use the ODSL standard one - `odslacr.azurecr.io/odsl_python:latest`
* job - This is always set to `prod_python`
* commandline - The command to run, see below

### Commandline
The commandline is what the compute pool runs in the docker container, what you specify depends on how you want to run your python code.

#### Using odslrun.py

odslrun.py has the following features:

* Creates context variables that can be used in your script:
    * PROCESS_CONFIG - contains the JSON of the process configuration
    * TASK - contains the JSON of the task configuration
    * SDK - the javascript sdk, already connected using the process runners credentials
    * PROCESS - the process class which allows you to communicate with the process execution log
* Checks for the name of a private script as the input parameter
* Pulls the script from the platform and applies to the current context
* Starts the process and runs your script in a MAIN phase

##### Example commandline for the process

```
"/bin/sh -c 'cd /app;python3 odslrun.py odsl-extensions\\extensions\\python\\python_sample'"
```
