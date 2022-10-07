---
title: Uploading Data
hide_title: true
sidebar_position: 2
tags:
  - discovery
  - odsl
  - upload
  - data
---
import StartBuilding from '/src/components/StartBuilding.js';
import {Discovery, InDepth} from '/src/components/Discovery.js';

<Discovery title="Uploading Data" text="This discovery guide gives an overview on how to prepare, send, and update your data, along with guidance on how to automate data loading and data environments." />

## Data Environments
A data environment in OpenDataDSL is an independent environment where everything you create and save into the cloud is stored.

When you first sign up to OpenDataDSL, you are given a single `production` environment, but you can easily create other environments for testing, development or even short-term experimentation. 

<InDepth href="/docs/tutorials/workingenvironments" />

## Create Your Data Model
All the data that is stored in OpenDataDSL is dynamic but we impose a pseudo-structure using Types. 
Types allow you to define the properties that you expect to be available on a specific object and is completely customisable and extensible.

OpenDataDSL data links allow you to create relationships between any data in the system which improves navigation and the overall user experience.     

<InDepth href="/docs/odsl/dm/modelling#types-and-objects" />

## Data Loading
The OpenDataDSL language has been written to simplify the entire ETL (Extract, Transform, Load) process. 

Here are a few of the built-in ETL features:
* **Extract**
    * Support for all the major file formats
    * Pull in most data from the internet with 1 line of code
    * For more complex extractions, create an extractor to automate web page navigation
* **Transform**
    * Create a [transformer](/docs/odsl/dm/transformation) to map input data to output objects
    * Use an optional XSLT to transform XML data
    * Use the ODSL language for more complex transformations
* **Load**
    * Add all your objects to a batch as a secure, robust, transactional loading process
    * Create a [workflow](/docs/odsl/dm/workflow) that breaks the ETL process down into phases with managed retries and re-schedules
    * Create a time-triggered process for automation and monitoring 

<InDepth href="/docs/odsl/dm/workflow" />
