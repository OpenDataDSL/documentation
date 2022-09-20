---
title: Performance and Scaling
hide_title: true
sidebar_position: 6
tags:
  - discovery
  - odsl
  - performance
  - scalaing
---
import StartBuilding from '/src/components/StartBuilding.js';
import {Discovery, InDepth, MoreInfo} from '/src/components/Discovery.js';

<Discovery title="Performance and Scaling" text="This discovery guide gives an overview of the infrastructure that powers OpenDataDSL and the options available for you to optimise performance." />

## Technical Overview
All the OpenDataDSL services that you use run in the Microsoft Azure Cloud and are continually monitored and automatically optimised and scaled according to usage.

The system can be seen as 3 individually optimised infrastructures:  
* The service infrastructure scales automatically based on the amount of requests (load) at any given point in time.
* The process infrastructure is optimised to ensure extremely high-reliabilty especially when using longer running processes.
* The database infrastructure is handled by MongoDB Atlas using a multi-region cluster

:::info
For your own private data, you can also provide your own MongoDB Atlas connection.

<MoreInfo href="/docs/it/database" />
:::  


## Improving Data Performance
With storing vast quantities of data, we regularly run query performance tests to profile and improve the indexing schemes.
On your own private data, you can also run similar performance tests to optimise the query performance by adding indexes specific to your own data schemas.

## Process Optimisation
The Web Portal allows you to monitor process executions in order for you to detect issues.

Workflows offer various smart features that help with adapting to the standard operational issues you could face, such as:
* Splitting the workflow into phases to time and monitor individual segments
* Providing phase specific retries, especially useful when interacting with the outside-world
* Providing re-schedules to handle 3rd-party system downtimes and optimise the process running time  

<InDepth href="/docs/odsl/dm/workflow" />

---

<StartBuilding />