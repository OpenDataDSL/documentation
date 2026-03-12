---
slug: /odsl/function/functions-constructor
title: Construction Functions
sidebar_position: 8
---

This document provides a reference for all built-in construction functions available in OpenDataDSL.

### AIAgent()

**Category:** Construction

**Description:** Creates a new AI Agent

**Parameters:**

**Returns:** AIAgent



---

### AIAssistant()

**Category:** Construction

**Description:** Creates a new AI Assistant

**Parameters:**

**Returns:** AIAssistant



---

### AITool()

**Category:** Construction

**Description:** Creates a new AI Tool

**Parameters:**

**Returns:** AITool



---

### Alert(name)

**Category:** Construction

**Description:** Creates a new Alert

**Parameters:**
* `name` (String) - The alert name

**Returns:** Alert



---

### AlertRecord(name, type)

**Category:** Construction

**Description:** Creates a new Alert Record

**Parameters:**
* `name` (String) - The alert name
* `type` (String) - The alert type

**Returns:** AlertRecord



---

### AnnualCalendar()

**Category:** Construction

**Description:** Creates a new Annual Calendar

**Parameters:**

**Returns:** Calendar



---

### ApprovalGroup()

**Category:** Construction

**Description:** Creates a new curve approval group

**Parameters:**

**Returns:** ApprovalGroup



---

### AutomationBuilder(service, source, key)

**Category:** Construction

**Description:** Creates a new OpenDataDSL automation using a builder

**Parameters:**
* `service` (String) - The name of the service you want to use for this automation
* `source` (String) - The source of the item or null for no source
* `key` (String) - The key of the item to use for this automation

**Returns:** Automation



---

### AutomationBuilder(service, source)

**Category:** Construction

**Description:** Creates a new OpenDataDSL automation using a builder

**Parameters:**
* `service` (String) - The name of the service you want to use for this automation
* `source` (String) - The source of the item or null for no source

**Returns:** Automation



---

### AutomationTarget()

**Category:** Construction

**Description:** Creates a new OpenDataDSL automation target

**Parameters:**

**Returns:** AutomationTarget



---

### Batch()

**Category:** Construction

**Description:** Creates a batch to be sent to a message queue

**Parameters:**

**Returns:** Batch



---

### BlockCalendar(holiday, observed, start, end)

**Category:** Construction

**Description:** Creates a new Block Calendar

**Parameters:**
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded (null = Daily)
* `observed` (Calendar) - The intraday calendar which determines the frequency of the observations (null = Hourly)
* `start` (Numeric) - The start of the start hour of the block (0 - 23)
* `end` (Numeric) - The start of the end hour of the block (0 - 23)

**Returns:** Calendar



---

### BlockCalendar(holiday, observed, start, end, timezone)

**Category:** Construction

**Description:** Creates a new Block Calendar

**Parameters:**
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded (null = Daily)
* `observed` (Calendar) - The intraday calendar which determines the frequency of the observations (null = Hourly)
* `start` (Numeric) - The start of the start hour of the block (0 - 23)
* `end` (Numeric) - The start of the end hour of the block (0 - 23)
* `timezone` (String) - The timezone for this block calendar

**Returns:** Calendar



---

### BuildGroup()

**Category:** Construction

**Description:** Creates a new curve build group

**Parameters:**

**Returns:** BuildGroup



---

### BusinessCalendar()

**Category:** Construction

**Description:** Creates a new Business (Monday to Friday) Calendar

**Parameters:**

**Returns:** Calendar



---

### Calendar(code)

**Category:** Construction

**Description:** Creates a new Calendar

**Parameters:**
* `code` (String) - The code for the calendar, e.g. DAILY

**Returns:** Calendar



---

### CombinedHolidayCalendar(cal1, cal2)

**Category:** Construction

**Description:** Creates a new Combined Holiday Calendar using the 2 passed in Holiday Calendars

**Parameters:**
* `cal1` (Calendar or calendar code) - The first holiday calendar to use
* `cal2` (Calendar or calendar code) - The second holiday calendar to use

**Returns:** Calendar



---

### CombinedHolidayCalendar()

**Category:** Construction

**Description:** Creates a new Combined Holiday Calendar

**Parameters:**

**Returns:** Calendar



---

### Contract(ondate, tenor, value)

**Category:** Construction

**Description:** Creates a new Forward Contract

**Parameters:**
* `ondate` (CurveDate) - The curve ondate for this contract
* `tenor` (String) - The absolute or relative tenor for this contract
* `value` (Number) - The value for this contract

**Returns:** Contract



---

### Contract(ondate, tenor, value, absolute, start, end, expiry)

**Category:** Construction

**Description:** Creates a new *Custom* Forward Contract

**Parameters:**
* `ondate` (CurveDate) - The curve ondate for this contract
* `tenor` (String) - The absolute or relative tenor for this contract
* `value` (Number) - The value for this contract
* `absolute` (String) - The absolute tenor for this contract - uses tenor if null
* `start` (Date) - The start of delivery date for this contract
* `end` (Date) - The end of delivery date for this contract
* `expiry` (Date) - The last trading date for this contract

**Returns:** Contract



---

### Contract(ondate, tenor, value, start, end)

**Category:** Construction

**Description:** Creates a new *Hybrid* Forward Contract

**Parameters:**
* `ondate` (CurveDate) - The curve ondate for this contract
* `tenor` (String) - The absolute or relative tenor for this contract
* `value` (Number) - The value for this contract
* `start` (Date) - The start of delivery date for this contract
* `end` (Date) - The end of delivery date for this contract

**Returns:** Contract



---

### Curve(ondate)

**Category:** Construction

**Description:** Creates a new Curve

**Parameters:**
* `ondate` (CurveDate) - The date index for this curve

**Returns:** Curve



---

### CurveDate(date, calendar, timezone)

**Category:** Construction

**Description:** Creates a new Curve Date variable

**Parameters:**
* `date` (Date) - The date as a string in ISO Date Time, ISO Date format or ODSL Period Code format
* `calendar` (Calendar) - The expiry calendar
* `timezone` (String) - The timezone for this Curve Ondate

**Returns:** CurveDate



---

### CurveDate(date, calendar)

**Category:** Construction

**Description:** Creates a new Curve Date variable

**Parameters:**
* `date` (Date) - The date as a string in ISO Date Time, ISO Date format or ODSL Period Code format
* `calendar` (Calendar) - The expiry calendar

**Returns:** CurveDate



---

### CurveSeries(calendar, ondate)

**Category:** Construction

**Description:** Creates a new Curve Series

**Parameters:**
* `calendar` (Calendar) - The calendar for the timeseries of this curve timeseries
* `ondate` (CurveDate) - The date index for this curve timeseries

**Returns:** CurveSeries



---

### CurveSeries(calendar, ondate, start, data)

**Category:** Construction

**Description:** Creates a new Curve Series

**Parameters:**
* `calendar` (Calendar) - The calendar for the timeseries of this curve timeseries
* `ondate` (CurveDate) - The date index for this curve timeseries
* `start` (VarDate) - Start index for curve timeseries
* `data` (List) - All the values of this TimeSeries

**Returns:** CurveSeries



---

### CurveSeries(calendar, ondate, data)

**Category:** Construction

**Description:** Creates a new Curve Series

**Parameters:**
* `calendar` (Calendar) - The calendar for the timeseries of this curve timeseries
* `ondate` (CurveDate) - The date index for this curve timeseries
* `data` (List) - All the values of this TimeSeries

**Returns:** CurveSeries



---

### DailyCalendar()

**Category:** Construction

**Description:** Creates a new Daily Calendar

**Parameters:**

**Returns:** Calendar



---

### Date(date, format)

**Category:** Construction

**Description:** Creates a new Date variable

**Parameters:**
* `date` (Scalar) - The date as a string
* `format` (Scalar) - The format of the date, e.g. 'dd-MM-yyyy'

**Returns:** Date



---

### Date(date)

**Category:** Construction

**Description:** Creates a new Date variable

**Parameters:**
* `date` (Scalar) - The date as a string in ISO Date Time, ISO Date format or ODSL Period Code format

**Returns:** Date



---

### Date()

**Category:** Construction

**Description:** Creates a new Date variable as the current date

**Parameters:**

**Returns:** Date



---

### Documentation()

**Category:** Construction

**Description:** Creates a new default documentation configuration

**Parameters:**

**Returns:** Documentation



---

### DocumentationLink(url, selector)

**Category:** Construction

**Description:** Creates a new documentation URL Link configuration

**Parameters:**
* `url` (String) - The HTML URL of the documentation
* `selector` (String) - The html selector to be used to select part of the HTML page

**Returns:** Documentation



---

### DocumentationLink(url)

**Category:** Construction

**Description:** Creates a new documentation URL Link configuration

**Parameters:**
* `url` (String) - The HTML URL of the documentation

**Returns:** Documentation



---

### Duration(dur, calendar)

**Category:** Construction

**Description:** Creates a new Duration with a calendar

**Parameters:**
* `dur` (String) - The code for the duration, e.g. 1D
* `calendar` (Calendar or String) - The calendar to use for this duration

**Returns:** Duration



---

### Duration(dur)

**Category:** Construction

**Description:** Creates a new Duration

**Parameters:**
* `dur` (String) - The code for the duration, e.g. 1D

**Returns:** Duration



---

### DynamicReport()

**Category:** Construction

**Description:** Creates a new dynamic report configuration

**Parameters:**

**Returns:** Report



---

### Event(ondate, tenor)

**Category:** Construction

**Description:** Creates an event that can be added to an object

**Parameters:**
* `ondate` (CurveDate) - The ondate for this event
* `tenor` (String) - The tenor for this event

**Returns:** Event



---

### Event(time)

**Category:** Construction

**Description:** Creates an event that can be added to an object

**Parameters:**
* `time` (Date) - The observed time of this event

**Returns:** Event



---

### EventCurve(eventlist, calendar, property, tenor)

**Category:** Construction

**Description:** Creates a new EventCurve

**Parameters:**
* `eventlist` (String, EventSummary or Ref) - The eventlist to use to build this Curve
* `calendar` (String) - The expiry calendar for this Curve
* `property` (String) - The name of the property used as the value for this Curve
* `tenor` (String) - The name of the property used as the tenor for the forward contract

**Returns:** EventCurve



---

### EventTimeSeries(eventlist, property)

**Category:** Construction

**Description:** Creates a new Event TimeSeries using an EventList and the name of the property to use for the TimeSeries values

**Parameters:**
* `eventlist` (String, EventSummary or Ref) - The eventlist to use to build this TimeSeries
* `property` (String) - The name of the property used as the value for this TimeSeries, the property itself can either be a String or Numeric

**Returns:** EventTimeSeries



---

### ExpiryCalendar(code)

**Category:** Construction

**Description:** Reads an expiry Calendar

**Parameters:**
* `code` (String) - The code for the calendar, e.g. DAILY

**Returns:** ExpiryCalendar



---

### ExpiryCalendar(holiday, delivery)

**Category:** Construction

**Description:** Creates a new expiry Calendar

**Parameters:**
* `holiday` (Calendar or String) - The holiday or trading calendar to use with this expiry calendar. Can either be the name or a calendar or an actual calendar.
* `delivery` (Calendar or String) - The delivery calendar to use with this expiry calendar. Can either be the name or a calendar or an actual calendar.

**Returns:** ExpiryCalendar



---

### ExpiryCalendar(holiday)

**Category:** Construction

**Description:** Creates a new expiry Calendar

**Parameters:**
* `holiday` (Calendar or String) - The holiday or trading calendar to use with this expiry calendar. Can either be the name or a calendar or an actual calendar.

**Returns:** ExpiryCalendar



---

### ExportGroup()

**Category:** Construction

**Description:** Creates a new curve export group

**Parameters:**

**Returns:** ExportGroup



---

### Extension()

**Category:** Construction

**Description:** Creates a new OpenDataDSL extension

**Parameters:**

**Returns:** Extension



---

### FeaturePolicy()

**Category:** Construction

**Description:** Creates a new feature policy

**Parameters:**

**Returns:** Policy



---

### FinancialExpiryCalendar(code, holiday, cross, base, offset)

**Category:** Construction

**Description:** Creates a financial expiry Calendar

**Parameters:**
* `code` (String) - The code for the calendar
* `holiday` (String or Calendar) - The holiday calendar
* `cross` (String or Calendar) - The cross currency calendar
* `base` (String or Calendar) - The base calendar
* `offset` (Int) - Offset to use (usually 0)

**Returns:** ExpiryCalendar



---

### FixedReport()

**Category:** Construction

**Description:** Creates a new Fixed report configuration

**Parameters:**

**Returns:** Report



---

### GeometryCollection()

**Category:** Geometry construction

**Description:** Creates a GeometryCollection geometry object

**Parameters:**

**Returns:** GeometryCollection



---

### GeometryCollection()

**Category:** Geometry construction

**Description:** Creates an empty GeometryCollection geometry object

**Parameters:**

**Returns:** GeometryCollection



---

### Group()

**Category:** Construction

**Description:** Creates a new group

**Parameters:**

**Returns:** Group



---

### HolidayCalendar()

**Category:** Construction

**Description:** Creates a new Holiday Calendar

**Parameters:**

**Returns:** Calendar



---

### HourlyBlockCalendar(holiday, start, end)

**Category:** Construction

**Description:** Creates a new Hourly Block Calendar

**Parameters:**
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded (null = Daily)
* `start` (Numeric) - The start of the start hour of the block (0 - 23)
* `end` (Numeric) - The start of the end hour of the block (0 - 23)

**Returns:** Calendar



---

### HourlyBlockCalendar(holiday, start, end, timezone)

**Category:** Construction

**Description:** Creates a new Hourly Block Calendar

**Parameters:**
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded (null = Daily)
* `start` (Numeric) - The start of the start hour of the block (0 - 23)
* `end` (Numeric) - The start of the end hour of the block (0 - 23)
* `timezone` (String) - The timezone for this block calendar

**Returns:** Calendar



---

### IdentityMatrix(size)

**Category:** Construction

**Description:** Creates a new identity matrix of the given size

**Parameters:**
* `size` (Integer) - The size of the matrix

**Returns:** Matrix



---

### Index()

**Category:** Construction

**Description:** Creates a new Database Index

**Parameters:**

**Returns:** Index



---

### InsightReport()

**Category:** Construction

**Description:** Creates a new insight report configuration

**Parameters:**

**Returns:** Report



---

### IntradayCalendar(period, holiday, withoutHours, timezone, useHolidays)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded
* `withoutHours` (List) - A list of integers representing hours of the day to exclude from this calendar
* `timezone` (String) - The timezone for this intraday calendar
* `useHolidays` (Boolean) - True to include holiday days in the block, i.e. for off-peak calendars

**Returns:** Calendar



---

### IntradayCalendar(period, holiday, withoutHours, timezone)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded
* `withoutHours` (List) - A list of integers representing hours of the day to exclude from this calendar
* `timezone` (String) - The timezone for this intraday calendar

**Returns:** Calendar



---

### IntradayCalendar(period, holiday, withoutHours)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded
* `withoutHours` (List) - A list of integers representing hours of the day to exclude from this calendar

**Returns:** Calendar



---

### IntradayCalendar(period)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly

**Returns:** Calendar



---

### IntradayCalendar(period, holiday)

**Category:** Construction

**Description:** Creates a new Intraday Calendar

**Parameters:**
* `period` (Duration) - The periodicity of this calendar, e.g. 1h for hourly
* `holiday` (Calendar) - The holiday calendar which determines the days that observations are recorded

**Returns:** Calendar



---

### ISODate(date)

**Category:** Construction

**Description:** Creates a new Date variable from the supplied ISO Date formatted string

**Parameters:**
* `date` (Scalar) - The date as a string in ISO Date Time or ISO Date format

**Returns:** Date



---

### LineString()

**Category:** Geometry construction

**Description:** Creates a LineString geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### LineString()

**Category:** Geometry construction

**Description:** Creates a LineString geometry object with the supplied list of coordinates

**Parameters:**

**Returns:** GeoSpatial



---

### Link()

**Category:** Construction

**Description:** Creates a link that can be added to an item

**Parameters:**

**Returns:** Reference



---

### List()

**Category:** Construction

**Description:** Creates a new List

**Parameters:**

**Returns:** List



---

### Matrix(x, y)

**Category:** Construction

**Description:** Creates a new matrix

**Parameters:**
* `x` (Number) - The number of rows
* `y` (Number) - The number of columns

**Returns:** Matrix



---

### Matrix(y, x, v)

**Category:** Construction

**Description:** Creates a new matrix, initialising all values to the provided value

**Parameters:**
* `y` (Number) - The number of rows
* `x` (Number) - The number of columns
* `v` (Number) - The value to initialise the matrix with

**Returns:** Matrix



---

### Matrix(labels)

**Category:** Construction

**Description:** Creates a new matrix from a list of labels

**Parameters:**
* `labels` (List) - The labels to use

**Returns:** Matrix



---

### Matrix(labels, v)

**Category:** Construction

**Description:** Creates a new matrix from a list of labels

**Parameters:**
* `labels` (List) - The labels to use
* `v` (Number) - The value to initialise the matrix with

**Returns:** Matrix



---

### Matrix(labels)

**Category:** Construction

**Description:** Creates a new matrix from a list of labels

**Parameters:**
* `labels` (List) - The labels to use

**Returns:** Matrix



---

### Matrix(labels, v)

**Category:** Construction

**Description:** Creates a new matrix from a list of labels

**Parameters:**
* `labels` (List) - The labels to use
* `v` (Number) - The value to initialise the matrix with

**Returns:** Matrix



---

### Message()

**Category:** Construction

**Description:** Creates a new coded message

**Parameters:**

**Returns:** Message



---

### MetricTimeSeries(provider, metric)

**Category:** Construction

**Description:** Creates a new Metric TimeSeries

**Parameters:**
* `provider` (String) - The metric provider
* `metric` (String) - The name of the metric

**Returns:** MetricTimeSeries



---

### MonthlyCalendar(code, name, period)

**Category:** Construction

**Description:** Creates a new Monthly Calendar with a period specifier

**Parameters:**
* `code` (String) - The code for this calendar
* `name` (String) - The name of this calendar
* `period` (Int) - The number of months each observation covers, has to be one of 1,2,3,4,6,12

**Returns:** Calendar



---

### MonthlyCalendar()

**Category:** Construction

**Description:** Creates a new Monthly Calendar

**Parameters:**

**Returns:** Calendar



---

### MultiLineString()

**Category:** Geometry construction

**Description:** Creates an empty MultiLineString geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### MultiLineString()

**Category:** Geometry construction

**Description:** Creates an empty MultiLineString geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### MultiPoint()

**Category:** Geometry construction

**Description:** Creates a MultiPoint geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### MultiPoint()

**Category:** Geometry construction

**Description:** Creates a MultiPoint geometry object with the supplied list of coordinates

**Parameters:**

**Returns:** GeoSpatial



---

### MultiPolygon()

**Category:** Geometry construction

**Description:** Creates an empty MultiPolygon geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### MultiPolygon()

**Category:** Geometry construction

**Description:** Creates a MultiPolygon geometry object with the supplied polygons

**Parameters:**

**Returns:** GeoSpatial



---

### Null()

**Category:** Construction

**Description:** Creates a Null variable

**Parameters:**

**Returns:** Null



---

### Object()

**Category:** Construction

**Description:** Creates a new Object of type #Object

**Parameters:**

**Returns:** Object



---

### Object(type)

**Category:** Construction

**Description:** Creates a new Object of the specified type

**Parameters:**
* `type` (String) - The name of the type to use for this Object

**Returns:** Object



---

### ObjectId()

**Category:** Construction

**Description:** Creates a unique object id

**Parameters:**

**Returns:** String



---

### ObjectWrapper()

**Category:** Construction

**Description:** Creates a new OpenDataDSL object wrapper

**Parameters:**

**Returns:** ObjectWrapper



---

### OffsetDailyCalendar(timezone, dayOffset, hour)

**Category:** Construction

**Description:** Creates a new Offset Daily Calendar

**Parameters:**
* `timezone` (String) - The timezone for this intraday calendar
* `dayOffset` (Int) - The number of days offset, usually 0 or -1
* `hour` (Int) - The hour of the offset day in the supplied timezone to use

**Returns:** Calendar



---

### Point(longitude, latitude)

**Category:** Geometry construction

**Description:** Creates a single coordinate point

**Parameters:**
* `longitude` (Scalar) - The longitude geographic coordinate as a decimal fraction between -180 and 180
* `latitude` (Scalar) - The latitude geographic coordinate as a decimal fraction between -90 and 90

**Returns:** GeoSpatial



---

### Policy()

**Category:** Construction

**Description:** Creates a new security policy

**Parameters:**

**Returns:** Policy



---

### Polygon()

**Category:** Geometry construction

**Description:** Creates a Polygon geometry object with a multiple rings containing the supplied geometries

**Parameters:**

**Returns:** GeoSpatial



---

### Polygon()

**Category:** Geometry construction

**Description:** Creates a empty Polygon geometry object

**Parameters:**

**Returns:** GeoSpatial



---

### Polygon()

**Category:** Geometry construction

**Description:** Creates a Polygon geometry object with a single ring containing the supplied coordinates

**Parameters:**

**Returns:** GeoSpatial



---

### Process()

**Category:** Construction

**Description:** Creates a new Process

**Parameters:**

**Returns:** Process



---

### QualityGroup()

**Category:** Construction

**Description:** Creates a new curve quality group

**Parameters:**

**Returns:** QualityGroup



---

### QuarterlyCalendar()

**Category:** Construction

**Description:** Creates a new Quarterly Calendar

**Parameters:**

**Returns:** Calendar



---

### Queue(name)

**Category:** Construction

**Description:** Creates a new queue

**Parameters:**
* `name` (String) - The name of the queue

**Returns:** Queue



---

### Report()

**Category:** Construction

**Description:** Creates a new report configuration

**Parameters:**

**Returns:** Report



---

### ReportCreator()

**Category:** Construction

**Description:** Creates a new report creator

**Parameters:**

**Returns:** ReportCreator



---

### Row()

**Category:** Construction

**Description:** Creates a new Row

**Parameters:**

**Returns:** Row



---

### Script()

**Category:** Construction

**Description:** Creates a new Script

**Parameters:**

**Returns:** Script



---

### Secret(value)

**Category:** Construction

**Description:** Creates a new Secret Value

**Parameters:**
* `value` (String) - The value of this secret

**Returns:** Secret



---

### SimpleObject()

**Category:** Construction

**Description:** Creates a new SimpleObject or JSON Document

**Parameters:**

**Returns:** SimpleObject



---

### SmartCurve()

**Category:** Construction

**Description:** Creates a new Smart Curve

**Parameters:**

**Returns:** SmartCurve



---

### SmartCurve(base, expression)

**Category:** Construction

**Description:** Creates a new Smart Curve using a base curve and expression

**Parameters:**
* `base` (String, Curve or Ref) - The BASE curve this curve uses for CurveDates
* `expression` (String) - The expression used to generate the curves

**Returns:** SmartCurve



---

### SmartTimeSeries(start, calendar, expression)

**Category:** Construction

**Description:** Creates a new Smart TimeSeries using a base TimeSeries and expression

**Parameters:**
* `start` (Date) - The Start Date
* `calendar` (Calendar) - The TimeSeries calendar
* `expression` (String) - The expression used to generate the TimeSeries

**Returns:** SmartTimeSeries



---

### SmartTimeSeries(expression)

**Category:** Construction

**Description:** Creates a new Smart TimeSeries using an expression

**Parameters:**
* `expression` (String) - The expression used to generate the TimeSeries

**Returns:** SmartTimeSeries



---

### SmartTimeSeries(base, expression)

**Category:** Construction

**Description:** Creates a new Smart TimeSeries using a base TimeSeries and expression

**Parameters:**
* `base` (String, TimeSeries or Ref) - The BASE TimeSeries this curve uses for Start Date and Calendar
* `expression` (String) - The expression used to generate the TimeSeries

**Returns:** SmartTimeSeries



---

### Sphere()

**Category:** Geometry construction

**Description:** Creates a nearSphere geometry object used in geospatial queries

**Parameters:**

**Returns:** GeoSpatial



---

### Sphere()

**Category:** Geometry construction

**Description:** Creates a centerSphere geometry object used in geospatial queries

**Parameters:**

**Returns:** GeoSpatial



---

### String(text)

**Category:** Construction

**Description:** Creates a new string scalar using the supplied text

**Parameters:**
* `text` (String) - The text of the string

**Returns:** String



---

### Subscription()

**Category:** Construction

**Description:** Creates a new subscription

**Parameters:**

**Returns:** Subscription



---

### SystemAlert(name)

**Category:** Construction

**Description:** Creates a new System Alert

**Parameters:**
* `name` (String) - The alert name

**Returns:** Alert



---

### SystemAlertMessage(message)

**Category:** Construction

**Description:** Creates a new System Alert Record sent to the #SYSTEM.MESSAGE alert with the provided message

**Parameters:**
* `message` (String) - The message to send

**Returns:** AlertRecord



---

### SystemAlertRecord(name)

**Category:** Construction

**Description:** Creates a new System Alert Record

**Parameters:**
* `name` (String) - The alert name

**Returns:** AlertRecord



---

### Table()

**Category:** Construction

**Description:** Creates a new Table

**Parameters:**

**Returns:** Table



---

### TargetGroup()

**Category:** Construction

**Description:** Creates a new subscription target group

**Parameters:**

**Returns:** TargetGroup



---

### Task()

**Category:** Construction

**Description:** Creates a new user task

**Parameters:**

**Returns:** Task



---

### TimeOfDay(time)

**Category:** Construction

**Description:** Creates a new TimeOfDay variable using the supplied String in the format [+]hh

**Parameters:**
* `time` (String) - The time of day in the format [+]hh:mm [tz]

**Returns:** TimeOfDay



---

### TimeSeries(calendar)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `calendar` (Scalar) - The calendar to use for this TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(calendar, dataType)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `calendar` (Scalar) - The calendar to use for this TimeSeries
* `dataType` (Scalar) - Data type of TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(start, Calendar, value)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `start` (Scalar) - The start date/time for this TimeSeries
* `Calendar` (Scalar or Calendar) - The calendar to use for this TimeSeries
* `value` (Scalar) - The first value of this TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(start, Calendar, value, dataType)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `start` (Scalar) - The start date/time for this TimeSeries
* `Calendar` (Scalar or Calendar) - The calendar to use for this TimeSeries
* `value` (Scalar) - The first value of this TimeSeries
* `dataType` (Scalar) - Data type of TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(start, end, Calendar, value, dataType)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `start` (List) - Set of start date/time for this TimeSeries
* `end` (List) - Set of end date/time for this TimeSeries
* `Calendar` (Scalar or Calendar) - The calendar to use for this TimeSeries
* `value` (List) - All the values of this TimeSeries
* `dataType` (Scalar) - Data type of TimeSeries

**Returns:** TimeSeries



---

### TimeSeries(start, Calendar, intervalPositions, value, dataType, positionCalendar)

**Category:** Construction

**Description:** Creates a new TimeSeries variable

**Parameters:**
* `start` (Scalar) - The start date/time for this TimeSeries
* `Calendar` (Scalar or Calendar) - The calendar to use for this TimeSeries
* `intervalPositions` (Scalar) - Interval positions to create index based on calendar
* `value` (Scalar) - The first value of this TimeSeries
* `dataType` (Scalar) - Data type of TimeSeries
* `positionCalendar` (Scalar) - Calendar to calculate positions

**Returns:** TimeSeries



---

### TimeStamp()

**Category:** Construction

**Description:** Creates a new Date variable as the current date and time

**Parameters:**

**Returns:** Date



---

### WeeklyCalendar(dow)

**Category:** Construction

**Description:** Creates a new Weekly Calendar

**Parameters:**
* `dow` (String) - The day of week for this weekly calendar, e.g. Monday

**Returns:** Calendar



---

### WeeklyCalendar(dow, holcal, rollbackwards)

**Category:** Construction

**Description:** Creates a new Weekly Calendar

**Parameters:**
* `dow` (String) - The day of week for this weekly calendar, e.g. Monday
* `holcal` (String) - The id of the holiday calendar to use
* `rollbackwards` (Boolean) - True if holiday days roll backwards

**Returns:** Calendar



---

### WidgetReport()

**Category:** Construction

**Description:** Creates a new widget report configuration

**Parameters:**

**Returns:** Report



---


