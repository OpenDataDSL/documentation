---
slug: /api/realtime
---
Realtime Services
=================

An API reference guide to the realtime services

## Introduction

OpenDataDSL allows you to listen to server-side events that you can use to trigger client-side actions such as:

*   Update the view in a GUI
*   Run a local process
    
It uses [SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr) which is a free and open-source library available from Microsoft which is used for building real-time web applications.

## Methods

We expose a number of server-side methods which are detailed in this section.

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

### Objects

#### updateObject

This method is triggered when an object is updated and the object message is the latest full merged object (minus any extracted data)

