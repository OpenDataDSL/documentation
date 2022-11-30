---
title: Web Portal
description: Web portal information
sidebar_position: 1
slug: /user/portal
tags:
  - portal
---
import {InDepth} from '/src/components/Discovery.js';
import {Portal} from '/src/components/Schema'

<Portal />

## Accessing The Portal
You can access the web portal from the `Portal` link on this web site or by clicking [here](https://portal.opendatadsl.com/).

Once on the main portal page, you will need to Sign in by clicking the Blue Sign In button in the top right corner of the page.

Enter your company log-in details to gain access to the portal.

### First-time login 
If this is the first time you have logged into the Web Portal, you will be required to enter some additional information to get you onboarded as a client.
You will be presented with a number of Microsoft screens which will authenticate you against your own Active Directory and you may be asked to accept some permissions for the OpenDataDSL application.

Once authenticated, if you are the first person to log-in from your organisation, you will be asked for the name of your company.
You will then be asked for your own name and a few other details. 

## Portal Layout
:::note
The portal is rapidly evolving, so the layout shown below may not exactly match what you see. 
:::

![](/img/portal/main_screen.png)

## Home Screen
The home screen of the portal contains an up-to-date summary of all your vital statistics. 

<InDepth href="/docs/user/portal/home" />

## Dashboards
OpenDataDSL dashboards allow you to perform real-time monitoring and drill-down into historic events in order to resolve any issues.

### Execution Dashboard
The execution dashboard is used to monitor process executions in real-time.
You can also drill-down into specific executions to check the correct flow and understand why and where they failed.

<InDepth href="/docs/user/portal/executions" />

### Process Dashboard
The process dashboard is similar to the execution dashboard, but is focussed on the processes rather than the process executions.
It gives you vital summary information about the executions of a specific process.

<InDepth href="/docs/user/portal/process" />

### Process Timeline
The process timeline gives you a 24 hour snapshot of processes that have run and are going to run.
It also provides a real-time view of running processes.

<InDepth href="/docs/user/portal/timeline" />

### Auditing
The auditing dashboard allows you to drill-down into specific events that have happened by specific users or on specific entities.

<InDepth href="/docs/user/portal/auditing" />

## Views
OpenDataDSL views focus on various aspects of information in both the public and private spaces

### Smart Data View
The smart data view allows you to create, edit and view all your smart timeseries and curves.

### Geo Data
The geo data view gives you access to the stored geometry in your objects/documents.
You can filter your data to zoom-in on the locations within the map

### Data View
The data view gives you direct access to all the TimeSeries and Curves in OpenDataDSL.
You can filter and find, chart and export data.

### Objects View
The objects view shows all the public and private objects in OpenDataDSL allowing you to filter, find and navigate through the object database.
Clicking on data assets in an object allows you to inspect and chart that data.

### Events View
The events view gives you access to all the stored events

## Manage

### Account Management
The account management tool allows you to update your own personal details, your organization details and settings, billing information and support.

### Data Packages
Data packages are pre-configured ETL processes for data sets you may want to load into your private repository.
These data sets generally require you have have an account with the vendor or are not freely distributable.

### Subscriptions
You can manage your subscribed data here along with the targets of these subscriptions

### Queues
You can view or manage you message queues here

## Tools
OpenDataDSL tools allow you to configure your settings

### Settings Tool
The settings tool allows you to personalise the portal to suit your own preferences.