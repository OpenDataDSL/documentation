---
title: Getting Started
hide_title: true
sidebar_position: 1
tags:
  - discovery
  - odsl
  - quickstart
---
import StartBuilding from '/src/components/StartBuilding.js';
import {Discovery, InDepth} from '/src/components/Discovery.js';
import DiscoveryPages from '/docs/discovery/_discovery.md';

<Discovery title="Getting Started" text="This discovery guide is a brief introduction to the features and ecosystem of OpenDataDSL." />

## What is OpenDataDSL

OpenDataDSL is designed as a high-performance, cloud-based, SAAS data management toolkit.

OpenDataDSL is comprised of the following:
* A DSL (Domain Specific Language) specifically built for Data Management, the language can be run:
    * Within Microsoft Visual Studio Code
    * As a local application
    * As a remote process in the cloud that can be triggered by time or event
* Remote Services that the DSL uses and can also be accessed via REST
* A Messaging layer based on Microsoft Azure Service Bus
* A cluster of MongoDB Atlas databases
* User interface tools such as the Portal, Excel Add-in and VSCode Extension

<DiscoveryPages />
