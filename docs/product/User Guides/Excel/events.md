---
title: Working with Events
description: Working with events in the Excel Add-in
sidebar_position: 5
slug: /user/excel/events
tags:
- excel
- events
---

## What are events?

Events are a thing that has happened at a point in time, similar to an observation in a TimeSeries only with a lot more information.

Example events are:
* An order placed with a broker, exchange etc.
* A trade made with a broker, exchange etc.
* A planned or unplanned outage (REMIT Urgent Market Message)

You have access to all public and your own private data from the Excel Add-in, this document shows you how to find the data you need.

### Creating a new event
1.	From the toolbar select **New > Event**. 
      
![img.png](event-create1.png)

Alternatively, you can click on the Create link from the Event card on the home page. 

![img.png](event-create2.png)

2.	On the new event configuration pane select **Object Type**, **Event Type** and specify **Id** for the event being created. 

:::info Id Format
The id should include the object id and event id in the format ```<object id>:<event id>```
:::

Additionally, you can specify **Unit** and **Timezone** fields for the event.

:::info Multiple Events
To create multiple events, specify multiple ids separated by comma, space, or semicolon.
:::

![img.png](event-create3.png)

3.	Under **Options** you can choose how you want to create the events.

![](create-timeseries4.png)

:::info
#### Add only template to worksheet
This option will only add the event layout to the worksheet, but the event is not created.
You need to manually upload the data for the event to get created.

#### Create and add to worksheet
This option will create the event first and upon successful will add the event layout to the worksheet.

#### Create Only
This option will only create the event, it does not add to the worksheet.
You can load the newly created event later from the Downloads section.
:::

4.	Select the display layout for the event on the worksheet.

![](display-layout.png)

:::info
#### Horizontal
This option will put the event ids on the first column, properties on the first row and data flows horizontally

#### Vertical
This option will put the event ids on the first row, properties on the first column and data flows vertically.
:::

5.	Click **Create** to create the event based on the configuration.

### Downloading existing events
1.	From the toolbar select **Download > Events**. 
      
![img.png](event-download1.png)

Alternatively, you can click on the **Download** link from the **Event** card on the home page. 

![img.png](event-download2.png)

2.	Search for the events you want to download. You can use filters and or the search box to narrow down the search results.

![img.png](event-download3.png)

3.	Click the ![](icon-download2.png)  download icon on each item to download data to the spreadsheet. To add multiple events, you can click the  ![](icon-plus.png) plus icon to add to the selection and then click the **Download** button.

![img.png](event-download4.png)

4.	Optionally, before downloading you can select **Range**, **Timezone** and the **Properties** to be displayed from the **Options** tab.

![img.png](event-download5.png)

5.	Select the display layout for the events on the worksheet.

![](display-layout.png)

:::info
#### Horizontal
This option will put the event ids on the first column, properties on the first row and data flows horizontally.

#### Vertical
This option will put the event ids on the first row, properties on the first column and data flows vertically.
:::

6.	Click **Download** to download the events onto the worksheet.

![img.png](event-download6.png)

### Updating existing events
1.	From the toolbar select **Upload**. 
      
![img.png](event-update1.png)
![img.png](event-update2.png)

Alternatively, you can click on the **Upload** link from the **Events** card on the home page.

![img.png](event-update3.png)

2.	Select the event range from the available ranges listed from the worksheet.

![img.png](event-update4.png)

3.	Click the ![](icon-upload2.png) upload icon to upload the data. 
      To update multiple events, use the check boxes to toggle on/off from the range items listed and then click **Upload** button.
      
![img.png](event-update5.png)

4.	Optionally, before uploading you can specify default settings for new events which are not yet created. This step can be ignored if all the items already exist.

![img.png](event-update6.png)

### Refreshing existing events

1.	From the toolbar select **Refresh**. 
      
![img.png](event-refresh1.png)

Alternatively, you can click on the **Events** link from the **Refresh** card on the home page.

![img.png](event-refresh2.png)

2.	Select the event range from the available ranges listed from the worksheet.

![img.png](event-refresh3.png)

3.	Click the ![](icon-refresh2.png)  refresh icon to refresh the data. 
      To refresh multiple events, use the check boxes to toggle on/off from the range items listed and then click Refresh button.
      
![img.png](event-refresh4.png)

4.	Click **Refresh** to refresh the event data on your worksheet.
