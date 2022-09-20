---
slug: /odsl/service/expiry
tags:
  - service
  - expiry
---
Expiry Calendar Service
=======================

The expiry calendar service allows you to manage and use [expiry calendars](/docs/odsl/calendar/expiry) in your scripts

## Introduction

The expiry calendar service is the interface to the expiry calendar repository.

Expiry calendars are either:

*   Public - they are available to everybody and maintained by OpenDataDSL    
*   Private - they are proprietary and only available to you and your colleagues
    

All public expiry calendar codes start with the # character in order to distinguish them from private expiry calendar codes.

## Getting an expiry calendar

To use an expiry calendar, you assign the active variable to a local variable in your script using this syntax:
```js
ecal = ${expiry:code}
```
Example:
```js
// Get the end of month expiry calendar with business frequency trading calendar
eombus = ${expiry:"#EOMBUSINESS"}
```
This returns a new [expiry calendar](/docs/odsl/calendar/expiry) with the expiry rules configured.

## Saving an expiry calendar

If you create a new expiry calendar or edit an existing one, you can save it back to the service using the **save** command.

Example:
```js
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
save ${expiry:eombus}
```

## Listing expiry calendars

To get a list of available expiry calendars, you can use the **find** command with the expiry calendar service.

Example:
```js
calendars = find ${expiry:public/""}
print calendars
```
This gets a list of all the public expiry calendars and prints them to the console

