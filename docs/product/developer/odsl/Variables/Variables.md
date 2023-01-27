---
slug: /odsl/variable/variables
sidebar_position: 1
---

## Introduction

Variables are used within the language to represent some data, this could simply be a number or it could be a more complex object such as a TimeSeries.

Variables in OpenDataDSL are typeless, meaning you don't need to initialise a variable of a certain type although it is implied by the value you give it or the way you construct it, e.g.

```js
// This creates a String or rather a Scalar variable of type String 
myvar = "Hello World"

// This creates a Date variable (initialised as now) using a constructor
mydate = Date()
```

## Naming Conventions
In OpenDataDSL, you can have both public and private data and objects, so it is important to understand how you reference these in your scripts and objects.

If an id is prefixed with a '#' character denotes that an object is public - which is available to everyone. If not, then the object is private - which is visible only to users within your own tenancy.

Below is an example of how this works with types and objects
```js
// private type
pritype = ${type:"Person"}
// public type
pubtype = ${type:"#Location"}
// private object
johndoe = ${object:"JohnDoe"}
// public object
gb = ${object:"#LOC_GBR"}
```

## Built-in Variable Types

### [Scalar](Scalar)
A scalar is a single value of either string, boolean (true/false) or numeric

### [Date](Date)
A date variable is a representation of a Date or a Date and Time in the UTC timezone

### [Duration](Duration)
A duration variable represents a period of time such as 3 days or 4 and a half minutes

### [Object](Object)
An object is a very versatile variable type that allows you to add any other variables to it including Object variable types. This creates a dynamic JSON type structure

### [Secret](Secret)
A secret is a scalar whose value cannot be printed or logged, it only really is useful when used with the Secret Service where secrets can be stored and then retrieved by scripts or workflows. Usually secrets are used to store passwords and database connection information etc.

### [Calendar](Calendar)
A calendar variable type represents an [ODSL Calendar](/docs/odsl/calendar/calendars). It is used with [timeseries](TimeSeries), curves and other time-bound resources

### [Expiry Calendar Variable](ExpiryCalendar)
An expiry calendar variable type represents an Expiry Calendar which is a special type of calendar that uses rules to calculate when trading stops for a future price for a particular commodity

### [Transformer](Transformer)
A wrapper for a data transformer, used with the transformer service
    
### [Extractor](Extractor)
A wrapper for an extractor, used by the extractor service
    
### [Link](Link)
A wrapper variable for creating links or relationships between objects
    
### [DeclaredType](DeclaredType)
A DeclaredType variable is a wrapper for a type and is used by the type service and creating objects
    
### [Executable](Executable)
An executable wrapper variable holds either an expression of a method
    
### [Void](Void)
This is an empty variable used for methods that don’t return a specific variable
    
### [Null](Null)
Null represents an empty or no value variable
    
### [MissingValue](MissingValue)
A MissingValue is a real variable but it doesn’t have a value yet, it is usually used in [TimeSeries](TimeSeries) to represent a [TimeValue](TimeValue) in a [calendar](Calendar) that has no value
    


### [List](List)
---------------------------------------
A list represents a list of other variables

[VirtualList](VirtualList)
A VirtualList is a list that is paged to improve performance and is used with the find command when listing resources from services
    

### [TimeSeries](TimeSeries)
---------------------------------------
A timeseries is a list of values which are indexed by dates. A timeseries could be the price of a particular stock recorded at a certain time of each day (say the time that the stock exchange closes)

### [Smart TimeSeries](smarttimeseries)
A Smart TimeSeries is an expression that is used to build TimeSeries on demand


### [TimeValue](TimeValue)
A TimeValue represents a single observed value in a [timeseries](TimeSeries)
    

### [Curve](Curve)
---------------------------------------
A curve is a structure that represents a set of values with a time index sometime in the future. It can be used for commodity and financial forward curves, yield curves and forecasts (weather, prices etc.)

### [SmartCurve](SmartCurve)
A Smart Curve is an expression that is used to build curves on demand

### [CurveDate](CurveDate)
A CurveDate is used as the valuation [date](Date) of a curve. It is a date with an [expiry calendar](ExpiryCalendar)
    
### [Contracts](Contracts)
Contracts are used on a [curve](Curve) as a set of contract objects that represent the future periods and values
    
### [Contract](Contract)
A contract is a single future period in time that represents a tradable future contract or a forecasted value on a [curve](Curve)
    

### [Spreadsheet](Spreadsheet)
---------------------------------------

A spreadsheet represents a set of cells within a row and column bound matrix

### [Cell](Cell)
A cell represents a single location-aware cell within a [spreadsheet](Spreadsheet)   

### [Table](Table)
A table is a set of rows within a column oriented matrix

### [Row](Row)
A row represents a single row of data usually associated with a row in a relational database table. A row is similar to an object in that it has dynamic properties except that you can only add Scalars or Dates as elements to a row

### [Matrix](Matrix)
A matrix represents a 2-dimensional array of numeric values

### [Workflow](Workflow)
---------------------------------

A workflow represents a set of actions and transitions that form an executable flow diagram

### [Action](Action)
An action variable is the definition of an action that can be used in a [workflow](Workflow)
    
### [Arg](Arg)
An arg variable is a configuration of an input or output argument of a workflow [action](Action)
    
### [Transition](Transition)
A transition variable is the definition of a transition that is used in a [workflow](Workflow)
    
### [Process](Process)
---------------------------------------

A process variable contains all the information to configure and run a process

### [Batch](Batch)
A batch variable is a custom [list](List) variable that contains variables and supplemental information needed to update into the object repository
    
### [Script](Script)
A script variable is a wrapper for an ODSL script. It is used by the script service and can also run the script
    
### [Task](Task)
A task is a physical task assigned to a user from either a user or the system
