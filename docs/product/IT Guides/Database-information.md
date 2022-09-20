---
slug: /it/database
sidebar_position: 2
tags:
  - database
  - environment
---
Database Information
====================

IT information regarding the storage of data within the OpenDataDSL platform

## Database

The OpenDataDSL services persist their data to a MongoDB database in the [Atlas MongoDB cloud](https://www.mongodb.com/cloud).

All data is stored in a replica set cluster of servers in cloud, this adds to the resilience and availability of the platform.

NOTE: You can also use your own MongoDB Atlas cluster - contact us for more information

## Data Environments

Users can create multiple data environments, e.g. for testing. These are configured as separate physical databases in the same cluster.

