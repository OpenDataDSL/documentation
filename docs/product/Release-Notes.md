---
title: Release Notes
sidebar_position: 10
---

Release Notes
=============

## Latest Release - Jan24

#### Timeseries auto-scaling
When retrieving timeseries with a large amount of observations, we now auto-scale the timeseries according to the following rules:
* Intradaily -> Daily
* Daily -> Monthly
* Monthly -> Yearly

The auto-scale thresholds are:
* Portal = 5000 observations
* Excel = 25000 observations
* api = 25000 observations

#### Curve Management Dashboard
We have introduced a curve management dashboard to monitor the lifecycle of curves managed in the system.

It has the following features:
* Configuration of build, quality, approval and export groups
* Build cut-off times with missing curve substitution rules
* Automated curve quality checks
* Manual approvals
* Export scripts to manage the export and feedback from the export system

#### Python SDK
Added a python SDK in [PyPI](https://pypi.org/project/odsl/)

The python SDK for OpenDataDSL has the following features:

* Find any data in OpenDataDSL using the ```list``` command
* Retrieve any data using the ```get``` command
* Update any data (if you have permission) using the ```update``` command

## Release History

<details>
<summary>2023</summary>

#### New data type - Events
Events are data that happened at a point in time for an amount of time, such as power station outages.
We allow capturing these events and creating dynamic timeseries and curves from them.

#### New data type - Matrix
Added support for storing matrices for various statistical uses, e.g. correlation and covariance matrices.
Added support for converting timeseries and curves into matrices

#### New service - Reports
New custom report functionality using custom ODSL code to generate any shape data to be presented in a report.
Reports can be formatted using ```Mustache``` which is a popular HTML templating syntax.

#### Granular Security Policies
Support for more granular security policies which can filter down to an individual document.

#### Correlation and covariance matrix functions
Add function to calculate correlation and covariance matrices.

#### Improvements to searching
Added more ways to perform searching for data

#### ODSL language improvements
* Added publish command to publish data to other tenants
* Added sendmail command to send data as an email
* Added set credentials command to store custom source user credentials
* Added element-wise multiply and divide operators for matrices
* Added single line if statements and conditional expressions
* Improved type creation, adding support for bespoke error messages
* Extended run command to support running reports

</details>

<details>
<summary>2022</summary>
#### Smart Data on Types
We add the ability to define smart timeseries and curves on a type.
All objects that directly implement the type will have those smart data objects dynamically added.

#### User Tasks
User tasks are manual tasks assigned to users either by other users or by processes such as data quality.
Tasks can be:
* Emailed
* Pushed to JIRA

#### More Statistics Functions
We will be adding for statistical functions for Timeseries and Curves.

#### More Statistics Functions
We have added a few more functions that can be used in your ODSL scripts:
* csum - Cumulative Sum
* cmax - Cumulative Maximum
* cmin - Cumulative Minimum
* cave - Cumulative Average

#### Calendar improvements
Improvements to the Intraday calendars:
* Add timezone
* Add a flag to indicate that it is an intraday calendar

#### Bulk updates and deletes
Add support for performing bulk updates and deletes

#### Added community version
Added FREE community version of the ODSL VSCode editor.

#### Quality Checks on Objects
Added support for defining constraints (checks) on an object type, and also defaults for null values 

#### Aggregation Framework in the ODSL Language
Added language support for defining aggregations and aggregation stages.

#### Custom MongoDB Collections
We have added support for clients to connect to your own MongoDB clusters and use the tools directly on the collections holding your own data.

#### Data Packages
Data packages are pre-defined processes that users can deploy to their own environment to load data from providers into their private database.
These data providers do not provide data that we can freely distribute, therefore the client has to load the data into their own private environment.

#### Events
Events are a thing that has happened at a point in time, similar to an observation in a TimeSeries only with a lot more information.
Example events are:
* An order placed with a broker, exchange etc.
* A trade made with a broker, exchange etc.
* A planned or unplanned outage (REMIT Urgent Market Message)

#### Curve Change Values
Added a 'change' value to show the absolute change of all tenors in a curve from the previous built curve

#### Region support in ODSL code
Allow users to create regions in ODSL code to break a script up into smaller sections.
These regions can be folded and run/debugged independently

#### Date Rule Grammar
Added support for using dynamic dates such as T-1W (go back 1 week)

#### Support for unit conversion custom factors
You can now add properties on TimeSeries or Curves to provide absolute conversion factors to a specified unit

#### Smart Curve Caching Improvements
Added support for caching options, you can now choose from:
* Never cache
* Cache on demand
* Cache when any dependencies are updated
* Cache based on a cron schedule

#### Curve Calendar Enhancements
Various minor improvements
* Use of holiday calendars for absolute movement of expiry calendars
* Add support for timezone offsets when using hourly period codes

#### Add support for TOP in FIND command
Allows you to return a small sample of items when using the find command in ODSL

#### Smart TimeSeries
The exciting introduction of Smart TimeSeries allowing you to create on-demand TimeSeries using a formula/expression.

#### Portal Smart Curves and TimeSeries
A new `Smart Data` section in the portal to 'play around' with Smart Curves and TimeSeries and save them to the Database.

#### Excel Add-in
Initial release of the Excel Add-in which will allow you to:
* Retrieve and update [Objects](/docs/odsl/variable/object)
* Retrieve and update [TimeSeries](/docs/odsl/variable/timeseries), [Curves](/docs/odsl/variable/curve), [Smart Curves](/docs/odsl/variable/smartcurve) and Smart TimeSeries

#### Gas Days
A new calendar supporting Gas Day hourly data aggregation and reporting.

#### Smart Curves
The exciting introduction of [Smart Curves](/docs/odsl/variable/smartcurve) allowing you to create on-demand curves without using a Curve Builder.

#### Custom Period Codes
Support for custom, one-off and special period codes for use on contracts on Curves.
See [documentation](/docs/kb/pc#custom)

</details>

<details>
<summary>2021</summary>

#### Command Line Interface
Initial release of the CLI which will allow you to run scripts locally and initiate interactive sessions

#### New account management option in the Portal
This is the place to go to manage your OpenDataDSL account:
* Edit your personal details and upload an image
* Edit your company details and configuration settings
* Accounting information such as cost analysis, invoices and payments
* Support - raise a support ticket, data or enhancement request

#### TimeSeries Scaling
Added support for rescaling TimeSeries for both aggregation to a lower frequency and distribution to a higher frequency.
See the documentation [here](/docs/odsl/calendar/scaling)

#### Improvement to calendar holiday rules
Added support for options on the following rule types:
* [Every](/docs/odsl/calendar/holiday#every-rule)
* All [Named](/docs/odsl/calendar/holiday#named-rule) rules

#### New pause command
Add added a new command `pause` allowing you to pause execution of a script.

Syntax:
```js
pause number ('second'|'seconds'|'minute'|'minutes'|'hour'|'hours')
```

#### Added support for using XSLTs in the [XML](/docs/odsl/service/xml#using-an-xslt) Service
You can now use an XSLT transformer when reading XML data, e.g.

```js
xdata = ${xml:xml,"xslt="+xslt}
```

#### Added new email target for queues
You can now emails using a subscription - see [here](/docs/odsl/dm/subscriptions#emailtarget) for more information

A few minor enhancements
* Added [daylightSavings](/docs/odsl/function/date#daylightsavings) function to test if the passed in date is a DST changeover day

#### Getting ready for the soft launch!

We are putting the finishing touches on the Web Portal that will allow us to start welcoming prospective clients to start using it.
Designing the screens that will get you started

#### Added support for real-time events

We completed the first stage of the [real-time API](/docs/api/realtime) allowing for a more responsive experience in the GUI and the more collaboration opportunities in other applications

#### Curve configurations in the web portal

We have added the capability of creating and editing curve configurations in the web portal:

![](/attachments/131316/365232608.png)

#### Added unit REST API

Added support for getting a list of units of measure symbols and details

#### ODSL grammar updates

Added support for manually triggering configured subscriptions

trigger subscriptionname for date

Added logout command to log your user account out and clear the user cache

logout

Added support for referencing tenors in a curve

tenor = curve\["M01"\]

#### Improvements to CRON configuration for processes

We have added support for the following special characters in cron expressions for processes:

*   '-' for a range of values in all fields
    
    *   `22 13-15 ? * MON-FRI *`
        
*   '/' for increments in the MINUTE, HOUR, DOM and MONTH fields
    
    *   `0/15 13 ? * FRI-SUN *`
        
    *   `0 0/4 ? * FRI-SUN *`
        
    *   `0 0 1/5 * FRI-SUN *`
        
    *   `0 0 5 1/3 FRI-SUN *`
        
*   'W' for nearest weekday - this will fire on a Friday if the DOM falls on a Saturday or a Monday if the DOM falls on a Sunday
    
    *   `0 0 15W 1 ? *`
        
*   '#' for week of month as DOW#week number
    
    *   `0 0 ? 1 6#3 *`
        
    *   `0 0 ? 1 6#1,6#3 *`
        
*   'L' for last DOM or DOW
    
    *   `0 0 L 1 ? *`
        
    *   `0 0 * 1 L *`
        
#### REST API improvements

We added a \_search query parameter to allow for text searching of objects. Simply pass in a search expression to get results based on values in the fields: \_id, name, description and classification.

#### Base Object Type

We defined a base object type that all types derive from which contain the following fields:

*   name
*   description
*   classification
*   geolocation
    

#### Objects and Data in the web portal

![](/attachments/131316/305856952.png)

#### Charts in the web portal

![](/attachments/131316/305889704.png)

#### Links in the web portal

Links allow you to view related data and information

![](/attachments/131316/305889696.png)

#### Curve Building Support

We added support for creating your own forward curves using logic created in OpenDataDSL scripts. You can create an object of type #CurveConfig with 1 or more inputs and 1 or more outputs and save to the new CURVE service, example configuration:

```js
MY_CURVE = object as #CurveConfig
    name = "My Curve"
    expiryCalendar = "REOMHENG"
    buildScript = "simplecurve"
    inputs\[0\] = object as #CurveConfigInput
        key = "PRIMARY"
        id = "#MATBAROFEX.ROS.SOJA.FUT:CLOSE"
        required = true
    end
    outputs\[0\] = object as #CurveConfigOutput
        name = "CURVE"
        code = "multiplyByFactor(PRIMARY, factor)"
        factor = 1.5
        currency = "EUR"
        units = "MWH"
        expiryCalendar = "REOMHENG"
    end
end
save ${curve:MY_CURVE}
```
#### Data aggregation support

Added the ability to filter, group and aggregate any data using ODSL and the REST services, e.g.

```js
summary = aggregate ${exec}
    match service="ETL"
    group _id="$status", qty=count()
    sort qty desc
end
```

#### Add range support for time-series

Add _range query option to specify a date range for time-series retrieval. Add 3 methods:

*   last(n) - last n observations
*   from(d) - from date d to the latest
*   between(d1, d2) - between 2 dates, d1 and d2
    
#### Object and data storage

Improvements to the way objects and data is stored to allow greater query flexibility. Users can now query across all types of objects.

#### Custom save and delete reasons

Added the ability to define a ‘reason’ on all save and delete methods. This reason is placed in the audit log and the saved object (if versioned)

#### Search object properties and return data

Added the ability to query object properties, but return data entities using the profile command, e.g.

// Fetch all data for all ECB_FX currencies
data = find profile SPOT from ${currency:public} where source == "ECB_FX"

#### Process Executions in the web portal

Added the ability to view process executions in the web portal:

![](/attachments/131316/187269165.png)

#### Indexes

Add ability for users to create custom database indexes to improve query performance.

#### Queues

Add ability for users to create and manage their own queues. Each queue can either be consumed by the loader process or can be left open to be consumed on-premises - see more [here](/docs/odsl/dm/queues)

</details>
<details>
<summary>2020</summary>

#### Geospatial queries

Add ability to add geometric shapes as a data property on objects and support geospatial queries on data, such as finding all objects within a radius of a point or within a polygon - see more [here](/docs/odsl/dm/geospatial)

#### Versioning

Add consistent versioning of data in the following services:

*   Types
    
*   Objects - definable by object type
    
*   Transformers
    
*   Extractors
    
*   Calendars
    
*   Actions
    
*   Workflows
    
*   Scripts
    
*   Processes
    

#### Auditing

Add audit records for all create, update and delete actions on all services

#### Queue Management

Allow users to add new queues and configure automatic data loading into proprietary ODSL database

#### Maths Functions

*   Simple regression
*   Basic descriptive statistics (min, max, mean etc)
    
</details>