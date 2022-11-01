---
slug: /it/database
sidebar_position: 2
tags:
  - database
  - environment
---
import {MoreInfo} from '/src/components/Discovery.js';

Database Information
====================

IT information regarding the storage of data within the OpenDataDSL platform

## Database

The OpenDataDSL services persist their data to a MongoDB database in the [Atlas MongoDB cloud](https://www.mongodb.com/cloud).

All data is stored in a replica set cluster of servers in cloud, this adds to the resilience and availability of the platform.

### Using your own MongoDB Atlas Cluster
You can use your own MongoDB Atlas cluster for your ```private``` data (Your objects, data, actions, audit etc.)

You can also create named connections to other MongoDB Atlas clusters

<MoreInfo href="/docs/tutorials/qs/mongodb/connecting" />

## Data Environments

Users can create multiple data environments, e.g. for testing. These are configured as separate physical databases in the same cluster.

