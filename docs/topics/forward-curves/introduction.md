---
slug: /topics/curves/intro
title: Introduction
description: What are forward curves?
sidebar_position: 1
tags:
- curve_management
- curve
- topics
---
Introduction
=============

This guide introduces you to what forward curves are, how they are created and used in OpenDataDSL.  

## What is a Forward Curve?
A forward curve is a structure that represents future delivery prices of a certain instrument at various future delivery time periods.

There are 4 types of forward curve in OpenDataDSL:

* **Curve**
> This is a basic curve which contains all the metadata and forward contracts for a specific date
* **EventCurve**
> This is a dynamic curve built on-the-fly from data in events
* **SmartCurve**
> This is a custom curve built using an expression and optionally other data
* **CurveSeries**
> This is a curve represented as a timeseries, usually used for high frequency curves such as hourly power curves


