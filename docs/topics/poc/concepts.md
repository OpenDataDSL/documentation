---
slug: /poc/concepts
title: Concepts
sidebar_position: 1
tags:
- poc
- concepts
---
import Components from './_components.md';

# Concepts

This section introduces the core concepts of OpenDataDSL — what it is, how it works, and the key components and terminology used throughout the platform.

## What is OpenDataDSL?

The name OpenDataDSL reflects the three fundamental aspects of the platform:

* **Open** — an open and transparent data management platform
* **Data** — data management is the primary focus
* **DSL** — Domain Specific Language: ODSL is a fourth-generation language (4GL) used throughout the platform

## Architecture

The diagram below shows the functional architecture of the platform.

![](/img/poc/architecture.png)

**Architecture notes:**

* All layers except "ON PREM" run in the Microsoft Azure Cloud
* All access to the platform is [secured using your own Azure Active Directory](security)
* The process layer runs on a scalable cluster of Azure Batch servers

## Data Location

All data is stored in MongoDB Atlas, a cloud-based database service. Data falls into two categories:

* **Public** — freely distributable data accessible to all platform users
* **Private** — your own data, accessible only to users on your Azure AD tenant

:::info
Your proprietary private data is stored in its own dedicated database, completely isolated from other tenants.
:::

## Components and Terminology

The section below summarises the key components and terminology used within OpenDataDSL.

<Components />

## Next Steps

* [Getting Started](/docs/poc/getting-started) — sign in, onboard your company, and install the tools
* [Security](/docs/poc/security) — configure access policies for your users
* [Find Data](/docs/poc/find-data) — search and filter the data catalog
* [Smart Data](/docs/poc/smart) — build derived curves and timeseries using expressions
* [Loading Data](/docs/poc/loading-data) — ETL workflows, events, queues, and direct API writes
* [Extracting Data](/docs/poc/extracting-data) — portal, Excel, API, automations, and reports
* [Auditing](/docs/poc/auditing) — automatic audit trail, versioning, and rollback
* [Dataset Monitoring](/docs/poc/dataset-monitoring) — completeness, quality, and timeliness tracking
* [Extensions](/docs/poc/extensions) — build custom portal and Excel views
* [Data Identities](/docs/odsl/dm/identities) — map data items to the IDs used by downstream systems
