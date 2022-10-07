---
title: Tools
hide_title: true
sidebar_position: 8
tags:
  - discovery
  - odsl
  - tools
---
import StartBuilding from '/src/components/StartBuilding.js';
import {Discovery, InDepth} from '/src/components/Discovery.js';

<Discovery title="Tools" text="This discovery guide gives an overview of the applications that OpenDataDSL has to offer including some OpenSource tools that could help you find the inspiration for your data management experience." />

## Portal Overview
The OpenDataDSL [Web Portal](https://portal.opendatadsl.com) is the place to visit to create and manage your account and offers an ever-expanding wealth of functionality such as:
* Process management
* Process execution dashboard
* Object and data visualisation including charting and interactive discovery
* Forward curve building configuration management
* Audit records

<InDepth href="/docs/user/portal" />

## Excel Add-in
The OpenDataDSL Excel Add-in provides functionality to read and update objects and data directly from within Microsoft Excel.

Like the Web Portal, the Excel Add-in is regularly updated with new and improved functionality. 

<InDepth href="/docs/user/excel" />

## Microsoft Visual Studio Code Extension
The VS Code extension provides support for `.odsl` files which contain OpenDataDSL programming language code.

If you create a file with the extension `odsl` in VS Code, it will prompt you to install our extension. 
The extension adds support for:
* Syntax highlighting ODSL scripts
* Code completion
* Problem highlighting
* Hover support (showing information about the item under the pointer)
* Code snippets

<InDepth href="/docs/user/vscode" />

## Miscellaneous OpenSource Tools
As well as providing our off-the-shelf applications, we also have a number of OpenSource products accessible from [GitHub](https://github.com/OpenDataDSL) which you are free to pull, use, change and extend.

Example repositories include:
* Source code for a c# application to load subscriptions in a SQL Server database - [Tutorial](/docs/tutorials/localsqlserver)
* ODSL source code examples
