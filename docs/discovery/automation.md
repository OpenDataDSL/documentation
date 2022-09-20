---
title: Automation
hide_title: true
sidebar_position: 5
tags:
  - discovery
  - odsl
  - production
---
import StartBuilding from '/src/components/StartBuilding.js';
import {Discovery, InDepth} from '/src/components/Discovery.js';

<Discovery title="Automation" text="This discovery guide is an overview on how you can build scripts and workflows to automate tasks and use processes to configure and trigger them." />

## Scripts
Scripts are blocks of OpenDataDSL code that are stored in the cloud and can be run either locally or in the cloud.

You can create scripts using the OpenDataDSL extension to Microsoft Visual Studio Code, simply create a file with the extension `.odsl`.
Whenever you create or open an odsl file, the OpenDataDSL extension assists you with the OpenDataDSL syntax and even lets you debug through you scripts.
You can also upload you scripts to the cloud directly from Visual Studio Code.

<InDepth href="/docs/user/vscode" />

## Workflows
Workflows define a flowchart of actions that you want to perform in order to automate a specific task.

Actions are a piece of OpenDataDSL code which perform a specific self-contained task which can be embedded in a workflow.
You can create sophisticated flows which can use the `public` actions that we provide, or you can build your own actions and deploy them to your own `private` action repository.
We use Workflows extensively for our ETL processes to load all the public data.

<InDepth href="/docs/odsl/dm/workflow" />

## Processes
Processes are a configuration that you define in order to execute a workflow or script.

Processes are usually triggered using a cron schedule and consist of some data that is used to configure the workflow or script that you want to run.

### Process Execution Dashboard
You can monitor your processes in the Web Portal and you can also subscribe to a real-time feed of process execution information in order to use an external process monitoring tool. 

![](/videos/OpenDataDSL-Process.gif)

### Process Timeline
Using the **Process Timeline** functionality in the Web Portal, you can see see when processes are going to run according the schedules that have been set.
You can also view your processes running in real-time.

![](/videos/OpenDataDSL-ProcessTimeline.gif)

<InDepth href="/docs/odsl/dm/workflow" />

---

<StartBuilding />