---
title: Simple Portfolio
description: A portfolio application to record trades and calculate profit and loss
slug: /public/extensions/simple-portfolio
tags:
- application
- portfolio
- odsl
- javascript
---

## Description
The simple portfolio application allows you to create portfolios (groups of timeseries containing prices) and log trades against that portfolio.
The application tracks how much profit (or loss) each item makes based on the prices and quanitites traded and also aggregates the profits to give a portfolio total.

:::info
The simple portfolio application is also provided as a tutorial about how to build an OpenDataDSL Application.
:::

## Features

### Trade Entry
The P&L is calculated based upon the trades made by entering details about the products, quantity and price paid.

Each trade event contains the following information:

|Name|Type|Description|
|-|-|-|
|TRADE_ID|String|Unique trade id|
|INSTRUMENT|String|The data id of the product traded|
|PRICE|Number|The price traded at|
|VOLUME|Number|The volume traded, negative for a bid (sell trade)|


Trades can be entered in one of the following ways:
* In the portal
* In the Excel Add-in
* Using the REST API or one of the SDK's

### Reports

The following reports are provided with the application:

* Trade report - a report of all your trades over a time period
* Open positions - a report showing all your current open trades
* Profit and Loss - a report showing a daily P&L for each portfolio
* Summary P&L - a summary report showing the current P&L for each portfolio

### Widgets

The following widgets are provided with the application:

* A portfolio widget is provided which shows the current holdings and P&L for a specific portfolio
* A P&L widget showing the current aggregated P&L for all portfolios



