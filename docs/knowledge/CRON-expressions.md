---
slug: /kb/cron
description: CRON expression specification
tags:
  - cron
---
CRON expressions
================

The cron expression is comprised of 6 or 7 fields separated by spaces, e.g.
```
MINUTE HOUR DOM MONTH DOW YEAR [TZ]
```

## Minute

The minute field represents the minute of the hour that you want to run the process, it can take one of the following forms:

*   A specific minute, e.g. 20
*   A list of minutes, e.g. 20,25,30
*   A range of minutes, e.g. 20-30 - this will fire every minute between 20 and 30 inclusive
*   An increment, e.g. 0/15 which fires every 15 minutes from 0, e.g. 0, 15, 30, 45
*   A * if every minute of the hour

:::note
From the April 2024 release - the minute entered relates to the minute in the selected timezone
:::

## Hour

The hour field represents the hour of the day that you want to run the process, it can take one of the following forms:

*   A specific hour, e.g. 10
*   A list of hours, e.g. 10,12
*   A range of hours, e.g. 10-12 - this will fire at 10, 11 and 12
*   An increment, e.g. 0/4 which fires every 4 hours from 0, e.g. 0, 4, 8, 12, 16, 20
*   A * for every hour of the day
    
:::note
From the April 2024 release - the hour entered relates to the hour in the selected timezone
:::

## DOM

The dom field represents the day of the month that you want to run the process, it can take one of the following forms:

*   A specific day of the month, e.g. 15
*   The closest weekday to a specific day of the month, e.g. 15W - if the 15th day falls on a Saturday, the process is fired on Friday 14th, if the 15th falls on a Sunday, the process is fired on Monday 16th
*   A list of days, e.g. 5, 15, 20
*   A range of days, e.g. 10-12 - this will fire on the 10th, 11th and 12th of the month
*   An increment, e.g. 1/10 which fires on the 1st, 11th, 21st and 31st
*   A * for every day of the month
*   A ? for any day of the month, DOW will decide which days the process will fire on
*   An L for the last day of the month
    

## Month

The month field represents the month of the year that you want to run the process, it can take one of the following forms:

*   A specific month, e.g. 5 for May
*   A list of months, e.g. 5,6,7
*   A range of months, e.g. 5-7 - this will fire in months 5,6 and 7
*   An increment, e.g. 1/3 which fires in Jan, Apr, Jul and Oct
*   A * for every month
    

## DOW

The dow field represents the day of the week that you want to run the process, it can take one of the following forms:

*   A specific day defined in text as one of SUN, MON, TUE, WED, THU, FRI or SAT
*   A list of days, e.g. MON,TUE,WED
*   A range of days, e.g. MON-FRI
*   A * for every day of the week
*   A ? for any day of the week
*   An L for the last day of the week, e.g. Saturday
*   A specific day of a week of the month with 0=Sunday, e.g. 1#1 is the 1st Monday of the month
*   A list of specific dow#week in the month e.g. 1#1,1#3 which is the 1st and 3rd Monday of the month
    

## Year

The year field represents the year that you want to run the process, it can take one of the following forms:

*   A specific year, e.g. 2021
*   A list of years, e.g. 2021,2022
*   A range of years, e.g. 2020-2030
*   A * for every year
    
## Timezone

The optional tz field represents the timezone used for schedule, it can be one of the following:

* UTC - Universal Coordinated Time - no DST 
* EU1 - UK and Portugal - DST
* EU2 - Most of Western Europe - DST

### DST handling

#### March DST - missing hour
Makes sure filter checks for missing hour during cron executions made for the following hour

e.g. EU2 DST misses 02:00, so for all requests between 03:00 and 03:59 on march DST day, check for schedules in hour 02:00 to 02:59 also

#### October DST - additional hour
Skip all requests in the repeated DST hour, unless the hour is specified as '*'

e.g. EU2 DST repeats 02:00, so during the second 02:00 DST hour, ignore any EU2 02:00-02:29 scheduled tasks
