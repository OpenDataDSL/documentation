---
slug: /api/realtime
title: Realtime Services
description: An API reference guide to the realtime services
tags:
  - realtime
  - signalr
---

An API reference guide to the realtime services

## Introduction

OpenDataDSL allows you to listen to server-side events that you can use to trigger client-side actions such as:

*   Update the view in a GUI
*   Run a local process
    
It uses [SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr) which is a free and open-source library available from Microsoft which is used for building real-time web applications.

## Methods

We expose a number of server-side methods which are detailed in this section.

### General

| **Service** | **Methods** |
|-|-|
|Master Data (object)|OnObjectCreate, OnObjectUpdate, OnObjectDelete|
|Data (data)|OnDataCreate, OnDataUpdate, OnDataDelete|
|Events (event)|OnEventCreate, OnEventUpdate, OnEventDelete|
|Curve Management (curve)|OnCurveCreate, OnCurveUpdate, OnCurveDelete, OnCurveMessage|
|Calendars (calendar)|OnCalendarCreate, OnCalendarUpdate, OnCalendarDelete|
|Expiry Calendars (expiry)|OnExpiryCreate, OnExpiryUpdate, OnExpiryDelete|


### Processes

#### executionMessage

This method is triggered by a running process at one of the following stages:

*   The process starts running
    
*   The process completes
    
*   A new workflow phase starts
    
*   A workflow phase ends
    
*   The workflow goes into a retry phase
    
*   The workflow goes into a reschedule phase
    
*   The process doesn’t exist
    
*   The process throws an exception
    

The execution message contains the latest full execution log for a running process.

### Extensions

#### extensionMessage

This method is triggered when installing or uninstalling an extension to an environment.



