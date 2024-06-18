---
slug: /odsl/dm/monitoring
sidebar_position: 6
title: Data Monitoring
description: An explanation of how to use the data monitoring capabilities
tags:
- data_management
- monitoring
- dsid
- topics
---

This guide gives detailed information about best-practices for utilising the data monitoring capabilities of the OpenDataDSL platform.

## Monitoring Terminology

Monitoring of the loading of data is organised using the following entities:

![](/img/dataset-entities.png)

### Process
A process defines the workflow or script that is run to extract, transform and load data into the platform.

### Dataset feed
A dataset feed is a configuration which defines the time window that you expect to receive all the data for a specific feed.

The identifier for a dataset feed is of the following format:

```{provider id}.{feed id}```

e.g. **ICE.IFEU**

### Dataset
A dataset is an individual product within a dataset feed, this defines the quantity of data we expect to receive on a daily basis.

The identifier for a dataset feed is of the following format:

```{provider id}.{feed id}.{product id}```

e.g. **ICE.IFEU.B**

### Dataset delivery
A dataset delivery is a record of all information regarding the process of getting the data for a dataset for a single day.
It also calculates a score which identifies how well the process worked for each day. 

The identifier for a dataset delivery is of the following format:

```{provider id}.{feed id}.{product id}:{ondate}```

e.g. **ICE.IFEU.B:2024-06-12**

### Scoring
Every day that dataset loading occurs, a score is calculated which is a measurement used to indicate how well the process worked that day.

The scores are as follows:
* 4 - Data was loaded on time
* 3 - Data was maximum of 1 hour late
* 2 - Data was between 1 hour and 4 hours late
* 1 - Data was more than 4 hours late
* 0 - No data was expected, e.g. a holiday

## Monitoring Lifecycle

The dataset delivery record represents the lifecycle for the dataset loading for a single day.

![](/img/dataset-lifecycle.png)

### Initialisation

Each day begins with an initialisation of the dataset delivery record.
This sets the following default values:
* status - waiting
* score - 4 (0 if it is a holiday) ( any lateness will start reducing that number)
* completeness - 0
* initialised - the timestamp of when the intialisation was run

### Data loaded
When data is loaded that includes a _dsid property, the following occurs:

* Check for corrections - if the data for this data was previously loaded, it is checked to see if any of the values have changed.
* Calculate metrics
    * Determine the quantity of tenors by tenor type loaded during this update
    * Determine if all the expected tenors have been loaded
* Update the timeline and delivery information in the dataset delivery
* Update the status

### Quality checks
Any quality checks that have been configured on the dataset are triggered after data has been loaded.
The quality checks are always performed on the entire dataset, not just the most recently loaded.

### Check for lateness
Periodically, a process runs that determines if any datasets are late according to the dataset feed time window.
If a dataset is determined to be late, the dataset delivery score is updated and a message is sent to any subscriptions that are triggered by a ```late``` action.
