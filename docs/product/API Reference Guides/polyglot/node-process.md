---
title: Node JS
---

Node.js can be used to run processes in the OpenDataDSL platform.

Processes can be triggered:
* On a schedule by setting a cron property
* Event-driven, using an automation
* Manually in the web portal, REST API or ODSL code

## Creating a process

There are 3 specific properties to set on a process to run it as a Node.js process:
* image - The name of docker image to run, you can use the ODSL standard one - `odslacr.azurecr.io/odsl_node:latest`
* job - This is always set to `prod_node`
* commandline - The command to run, see below

### Commandline
The commandline is what the compute pool runs in the docker container, what you specify depends on how you want to run your node js code.

#### Using odslrun.js

odslrun.js has the following features:

* Creates global context variables that can be used in your script:
    * global.vm - to load other scripts and apply to the context
    * global.PROCESS_CONFIG - contains the JSON of the process configuration
    * global.TASK - contains the JSON of the task configuration
    * global.SDK - the javascript sdk, already connected using the process runners credentials
    * global.PROCESS - the process class which allows you to communicate with the process execution log
* Checks for the name of a private script as the input parameter
* Pulls the script from the platform and applies to the current context
* Starts the process and runs your script in a MAIN phase

##### Example commandline for the process

```
"/bin/sh -c 'cd /app;node odslrun.js odsl-extensions\\extensions\\nodejs\\node_sample'"
```
