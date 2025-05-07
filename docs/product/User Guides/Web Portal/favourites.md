---
title: Favourites 🆕
description: Dataset monitoring dashboard in the web portal
sidebar_position: 7
slug: /user/portal/favourites
tags:
- portal
- groups
- favourites
- new
---
## What are favourites?

Favourites are groups of master data records or data items which you can categorise and have easy access to.
Favourites are accessed through the **Favourites** toolbar button on the following screens:

* Master Data
* Data

## Creating Favourites

Favourites are groups which can be created in [ODSL code](/docs/odsl/variable/group) or in the Web Portal.

### Types of favourite groups
There are 2 types of favourite groups:
* Dynamic
* Static

#### Dynamic favourite groups
Dynamic favourite groups use an expression to create the list of items in the group

#### Static favourite groups
Static favourite groups are a list of items which you manually maintain.

### Creating a dynamic favourite group

#### Select the content type
To create a dynamic favourite group, go to either:
* Master Data - to create a group of master data records
* Data - to create a group a data items

#### Create a filter
Use the filter widget to define the dynamic filter to find the items

For example:

![](/img/portal/fav_filter.png)

#### Save the filter

Click the save button to save the filter expression to a favourite group:

![](/img/portal/fav_save.png)

This will open up a dialog to create a new dynamic favourites group:

![](/img/portal/fav_add_group.png)

Fill in the details and click ok to save the new favourites group.

### Creating a static favourite group

#### Select the content type
To create a dynamic favourite group, go to either:
* Master Data - to create a group of master data records
* Data - to create a group a data items

#### Add an item
Find the item you want to add to a group and click the add to group button, e.g.

![](/img/portal/fav_item.png)

After clicking the **Add to group** button, a dialog will pop-up where you can eithee:
* Add the item to an existing group or groups
* Create a new group and add the item to it.

Click ok to add the item.

## Using Favourites

Clicking the **Favourites* button shows a menu of all the favourite groups that you have either created or are shared with you.

![](/img/portal/fav_screen1.png)

Each top level name if the type of group (**Providers, Commodity, Features, Favourites**)

:::note
These may be different in your portal
:::

Then the groups are organised by category, so in this case the categories are:
* FX
* Power
* Natural Gas
* Crude Oil

Under each category are a list of 1 or more groups.

Clicking on a group will focus back to the underlying screen and show the items belonging to that group.

