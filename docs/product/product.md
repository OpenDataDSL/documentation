---
id: intro
title: Getting Started
sidebar_position: 1
tags:
  - introduction
  - odsl
---
import Language from './_language.md';

Getting Started
===============================

An introduction to what OpenDataDSL is and what it can do for you

## What is OpenDataDSL?
OpenDataDSL has at its core, a simple programming language with data management as its specialist capability. 
It has specific constructs allowing you to:

*   Create data models that mimic the real world    
*   Create relationships between your data objects    
*   Easily work with complex data types such as time-series and forward curves
*   Collect data from anywhere on the internet
*   Create transform maps to easily convert from one format to another
*   Create workflows to automate data processing and delivery
*   Build derived and calculated data with our vast library of actions
    *   Forward Curve Building
    *   Machine Learning
    *   Forecasting
*   Build your own custom actions or extend ours to create your own personalised library

### Why a dedicated programming language?
OpenDataDSL is no ordinary language, it has been built from scratch to simplify all aspects of data management.
When deciding to buy or build a data management system, you generally only have 2 choices for interaction with it:
* A [User Interface](/docs/user) (Web/Excel/Desktop/Mobile)
* An API (REST/Web Services/Proprietary)

A dedicated programming language provides a 3rd option whose features rank between a GUI and an API:

<Language />

As you can see, it fills the gap in flexibility that user interfaces have and because it requires minimal programming skills and has a small learning curve,
it makes it easier to use than a regular programming language.

### What other features are there?
As well as the above, here are a selection of additional features:

#### APIs and SDKs
*   Use [Python](/docs/sdk/python), .NET, R, [MatLab](/docs/sdk/matlab), [Java](/docs/sdk/java) or NodeJS client SDK to interact with the Cloud Services and Data

#### User Interfaces
*   Free [Excel Add-in](/docs/user/excel) to read/write your data
*   Free [Web Portal](/docs/user/portal) to manage your account and visualise your data
*   Free [VSCode ODSL language extension](/docs/user/vscode) for editing scripts

#### Easy to integrate
*   Integrate with many popular OpenSource and paid-for applications

#### Secure
*   Use your own IDP for authorization and access control (Azure AD)

#### Flexible, scalable and performant 
*   Utilise multiple environments in the cloud, e.g. DEV, TEST etc.
*   Cloud scale infrastructure
    
## Proprietary Data
Below is a graphic showing how proprietary data and components are used within the OpenDataDSL architecture.
All the red shaded items are owned and only accessible to a single client.
![](/img/capability.png)

## What can it do for me?


You can use OpenDataDSL is many different ways, from simply subscribing to a set of pre-built data feeds and loading the data into your own on-premise database, right up to building a fully-managed data management system with hundreds of workflows and data integrations.

This section will introduce some scenarios and give you links in the documentation on how it works.

### Subscribe to standard data feeds

If you simply want to take advantage of our world-class data feeds to pull data into your own database, start by [reading about subscriptions](/docs/tutorials/gettingstarted1) and the on-premise ODSL Feed Service.

[![](/attachments/8978718/8913193.png)](/docs/tutorials/gettingstarted1)

### Add custom data feeds

If you need to grab some specific data that we don’t have, you can create your own workflows to extract and transform the data into your own custom data feed to feed into your on-premise database.

![](/attachments/8978718/8913199.png)

### Read data from ODSL Services

If you want to regularly read some data into Excel or other applications, but don’t want to have your own local database, you can use our Excel add-in or the API Services to pull data from the cloud.

![](/attachments/8978718/8945906.png)

### Reading and writing data

If you want to also create your own proprietary database with your own generated data, you can start writing data via the API Services to your own private database (and multiple environments)

![](/attachments/8978718/8945916.png)

### Adding custom data feeds

If you want to collect and store data from the internet in your own proprietary database too, you can build data collection and transformation workflows and schedule them to run in the cloud.

![](/attachments/8978718/8913213.png)

### Adding custom  workflows

If you want to create derived data, such as forward curves or machine-learning models, you can create workflows and either schedule them or trigger them from watchlists of data.

![](/attachments/8978718/8913225.png)

### Feeding internal systems using queues

If you have other internal systems like risk systems or SAP that require any public of private data you have created, you can push this data to message queues which can then feed your internal systems.

![](/attachments/8978718/9011498.png)

## Next steps

Check out some of the interesting links below:

* [Take a **Discovery Tour** for an overview of the product features](/docs/discovery)
* [Get started quickly with one of our **QuickStart Tracks**](/docs/discovery/quick-start)
* [Browse through the **Data Catalog** to see what data is available](/docs/data/catalog)
* [Check out our **Tutorials** section](/docs/tutorials)    
