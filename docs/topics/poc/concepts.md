---
slug: /poc/concepts
title: Concepts
sidebar_position: 1
tags:
- poc
- concepts
---
import Components from './_components.md';

Get a greater understanding of everything OpenDataDSL

This section helps you to understand the basic concepts of what OpenDataDSL is, how it works and how it can help you.

## What is OpenDataDSL?
OpenDataDSL is a concatenation of the 3 fundamental aspects of what the platform is:

* **Open**
  > OpenDataDSL is an open and transparent data management platform
* **Data**
  > Data management is the primary focus of the platform
* **DSL**
  > Domain Specific Language - ODSL is our 4GL language which is used throughout the platform

### Architecture

The diagram below shows the functional architecture of the platform.

![](/img/poc/architecture.png)

#### Architecture notes

* All the layers that not 'ON PREM' are based in the Microsoft Azure Cloud.
* All access to the platform is [secured using your own Azure Active Directory](security)
* The process layer is handled by a scalable cluster of servers using Azure Batch

### Data Location
All data is stored in MongoDB Atlas - a cloud based data service.

There are 2 (sometimes more) sources for data:
* **Public**
  > This is data that is freely distributable and accessible by everyone who uses the platform
* **Private**
  > This is your own private data which is only accessible to users on your Azure AD tenant (your company)

:::info Important
Your proprietary private data is stored in your own dedicated database.
:::

## Components and Terminology
This section gives a brief summary of all the components and related terminology within OpenDataDSL.

<Components />

