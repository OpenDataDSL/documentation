---
slug: /odsl/service/services
tags:
  - service
  - action
sidebar_position: 1
---
Introduction
============

Detailed information on Active Variables and the services used by them

Active variables are the defining feature of OpenDataDSL which allows the user to interact directly with the Data Management System through the use of a well-defined, simple to use variable construct.

In OpenDataDSL, active variables provide a way to interact with the database and services to help you collect, validate, manage and report on your data.

The syntax of an active variable is as follows:
```js
${service (:source)? }
${service: (source/)? id (:version)? (,option)* } (for range)?
```
Examples:
```js
actvar = ${action:"#name"}
save ${action:actvar}
tag ${action:actvar} as PROD
actvarprod = ${action:"#name":PROD}

objects = find ${object:public} where dataset == "BOE_FX"
```

## External Data Collection Services

A list of services that help you collect data from various locations and various file formats

### [Azure File Service (azfile)](./azfile)
A service to read files from an Azure Storage Account
    
### [CSV](./csv)
A service to read CSV files as a [list](/docs/odsl/variable/list) of [row](/docs/odsl/variable/row) variables or as a [table](/docs/odsl/variable/table) variable
    
### [DHTML](./dhtml)
A service to read Dynamic HTML pages as an [object](/docs/odsl/variable/object) variable
    
### [File](./file)
A service to read files from the local file system
    
### [FTP](./ftp)
A service to read files from an FTP site
    
### [GZIP](./gzip)
A service to handle the extraction of data from a compressed zip file
    
### [HTML](./html)
A service to read a HTML page as an [object](/docs/odsl/variable/object) variable
    
### [JSON](./json)
A service to read a JSON format file as an [object](/docs/odsl/variable/object) variable
    
### [ODS](./ods)
A service to read an ODS (OpenDocument) format file as a [spreadsheet](/docs/odsl/variable/spreadsheet) variable
    
### [PDF](./pdf)
A service to read a PDF format file as an [object](/docs/odsl/variable/object) variable
    
### [S3](./s3)
A service to read files from an AWS S3 bucket
    
### [XLS](./xls)
A service to read XLS spreadsheet files as a [spreadsheet](/docs/odsl/variable/spreadsheet) variable
    
### [XML](./xml)
A service to read XML format files as an [object](/docs/odsl/variable/object) or [list](/docs/odsl/variable/list) variable
    

### [Archive](./archive)
A service to keep a copy of a source file in your file archive

### [Azure Blob Service (azblob)](./azblob)
A service to read and write files in Azure Blob Storage

### [CURL](./curl)
A service to download files with the curl tool

### [Kafka](./kafka)
A service to read JSON messages from Apache Kafka topics

### [Mail](./mail)
A service to read emails and their attachments from a mailbox

## OpenDataDSL Remote Services

This is a list of active variable services that interact with the OpenDataDSL remote services

### [Action Service](./action)
Workflow actions allow you to personalise your processes with snippets of code to perform a specialised action within a workflow

### [Audit Service](./audit)
The audit service allows you to view all the changes that have happened in your environment
    
### [Calendar Service](./calendar)
The calendar service allows you to create and use all the [calendars](/docs/odsl/calendar/calendars) in the system
    
### [Currency Service](./currency)
A service to use the publically available FX rates
    
### [Curve Service](./curve)
The curve service is used for interacting with Forward Curve configurations
    
### [Environment Service](./environment)
This service allows you to manage your data environments
    
### [Expiry Calendar Service](./expiry)
The expiry calendar service allows you to manage and use [expiry calendars](/docs/odsl/calendar/expiry) in your scripts
    
### [Extractor Service](./extractor)
The extractor service allows you to manage and use data extractors
    
### [Object Service](./object)
The object service allows you to manage, browse, search for and use stored objects
    
### [Process Service](./process)
The process service allows you to manage your scheduled and event driven remote processes

### [Secret Service](./secret)
The secret service allows you to securely store secrets such as passwords or security tokens

### [Script Service](./script)
The script service allows you to store and retrieve ODSL scripts
    
### [Tenant Service](./tenant)
A service to view and record your company information and tenancy configuration
    
### [Transformer Service](./transformer)
The transformer service allows you to store and manage data transformers
    
### [Type Service](./type)
The type service allows you to store and maintain data types used in [data modelling](/docs/odsl/dm/modelling)
    
### [User Service](./user)
A service to view and record your user information

### [Workflow Service](./workflow)
The workflow services allows you to store and manage [workflows](/docs/odsl/dm/workflow)
    
    

### [AI Agent Service](./aiagent)
Your Fusion AI agents

### [AI Assistant Service](./aiassistant)
The Fusion AI assistants, built-in and custom

### [AI Playbook Service](./aiplaybook)
Fusion AI playbooks

### [AI Run Service](./airun)
The records of Fusion AI playbook runs

### [AI Task Service](./aitask)
Fusion AI playbook tasks

### [AI Tool Service](./aitool)
Your Fusion AI custom tools

### [AI Usage Service](./aiusage)
Fusion AI token usage

### [Alert Service](./alert)
Alerts about your data and the shared data you use

### [Automation Service](./automation)
Your automations

### [Automation Target Service](./automationtarget)
Automation targets

### [Automation Log Service](./automationlog)
The log of each automation run

### [Batch Service](./batch)
The summaries of batch updates

### [Correction Service](./correction)
Corrections to dataset data

### [Data Service](./data)
Timeseries, curves and other data

### [Dataset Service](./dataset)
Dataset monitoring

### [Dataset Delivery Service](./dataset_delivery)
Dataset deliveries

### [Documentation Service](./documentation)
Documentation for items and services

### [Group Service](./group)
Groups of items

### [Index Service](./index)
Database indexes

### [Metric Service](./metric)
Usage metrics

### [Policy Service](./policy)
Security policies

### [Process Execution Service](./exec)
Process execution logs

### [Queue Service](./queue)
Message queues

### [Queue Log Service](./queuelog)
The log of queue messages

### [Report Service](./report)
Stored reports

### [Report Configuration Service](./reportconfig)
Report configurations

### [Report Creator Service](./reportcreator)
Report creators

### [Script Log Service](./scriptlog)
The log of each script run

### [Task Service](./task)
Tasks assigned to users

### [Validation Service](./validation)
Validation records

### [Validation Config Service](./validationconfig)
Validation configurations

## Variable Services

These services help you work with OpenDataDSL variables

### [Date Service](./date)
Create and utilise dates
    
### [Memory Service](./memory)
Recreate the current session by saving all variables in memory, then re-loading them later
