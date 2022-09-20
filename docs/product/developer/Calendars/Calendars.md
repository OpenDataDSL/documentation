---
sidebar_position: 1
slug: /odsl/calendar/calendars
tags:
  - calendar
---

Calendars
=========

A detailed explanation of all the supported calendars in OpenDataDSL

## Introduction

The calendars in OpenDataDSL are one of the fundamental components necessary for a smart data management platform. 
They provide time-based intelligence for understanding when things should happen and enable you to highlight issues when things don’t happen. 
The key to the way calendars work in ODSL is in the flexibility and ease of use, this section describes all the built-in calendar types and how you can customise them to suit your needs.

## Contents

### [Daily Calendar](daily)
A daily calendar is a simple calendar that represents every calendar day

### [Holiday Calendar](holiday)
A holiday or trading calendar is a [daily calendar](daily) with rules that determine which days are non-working or holiday days

### [Business Calendar](business)
A business calendar is a basic [holiday calendar](holiday) that represents a standard working week with every day from Monday to Friday

### [Intraday Calendar](intraday)
An intraday calendar represents all regular calendars that have time intervals of less than a whole day, e.g. Hourly

### [Sparse Calendar](sparse)
A sparse calendar is used when there is no pre-defined period between intervals, each index can represent any point in time

### [Expiry Calendar](expiry)
An expiry calendar is used to calculate the last trading date and the conversion of absolute and relative futures contracts

### [Period Code](period-code)
A period code represents an absolute or relative delivery period for some commodity or financial future

### [Custom Calendar Examples](examples)
A set of examples that showcase the flexibility of the calendars in OpenDataDSL

### [Time Series Scaling](scaling)
In-depth information about how to rescale TimeSeries