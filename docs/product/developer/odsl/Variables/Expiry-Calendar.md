---
slug: /odsl/variable/expirycalendar
tags:
  - calendar
  - curve
---
Expiry Calendar
========================================

An expiry calendar variable type represents an Expiry Calendar which is a special type of calendar that uses rules to calculate when trading stops for a future price for a particular commodity

## Introduction

The expiry calendar variable wraps an [expiry calendar](/docs/odsl/calendar/expiry) and allows you to use them in your scripts.

## Construction

Expiry calendars are usually read in from the [expiry calendar service](/docs/odsl/service/expiry) using their code, but can also be constructed using the ExpiryCalendar function. Below are a few examples of constructing an expiry calendar:

```js
// Creating an expiry calendar using a standard business calendar
eombus = ExpiryCalendar(BusinessCalendar())

// Add an expiry rule to go to the end of the previous month as the expiry date
eombus.addRule("go to the end of the previous month")

// Read an expiry calendar from the expiry calendar service
eomeng = ${expiry:"#EOMENG"}
```

## Methods

An expiry calendar variable has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|addRule(String)|Adds the supplied expiry rule string to this expiry calendar|Void|

See [Expiry Calendar](/docs/odsl/calendar/expiry) for full details about the rules that can be added to an expiry calendar

