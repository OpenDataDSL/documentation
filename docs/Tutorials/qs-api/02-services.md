---
title: Services
description: QuickStart for API developers - Overview of services
sidebar_position: 3
slug: /tutorials/qs/api/services
tags:
  - quickstart
  - api
  - developer
  - coding
  - services
---
import {QuickStartModule, MoreInfo} from '/src/components/Discovery.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<QuickStartModule text="This quickstart module gives you a basic understanding of working with ODSL services" />

## Services URL

All the REST remote service resources are accessible through a single URL endpoint:

```
https://api.opendatadsl.com/service
```

## Environments
### What is an environment
Within the OpenDataDSL infrastructure you can create multiple physically separate environments.
These are generally used for non-production purposes, such as development and testing.
All the `public` data is available in every environment, it is just your proprietary `private` data that is segregated.

<MoreInfo href="/docs/tutorials/workingenvironments" />

All the code and examples in the QuickStart track use an environment called `quickstart` and this information is passed to the services via a request header.

### Creating an environment
If you haven't already done so, you can create an environment using Web Portal under Account Management/Organization/Data Environment.
If you don't have the access rights to create one, ask your ODSL Administrator.

### Using an environment
To use the `quickstart` environment, you need to pass a request header with every request as follows:

```
x-odsl-environment: quickstart
```

## Useful Links
Below is a list of links to some useful introductory information about the services which you should read before commencing.

* [Standards and Conventions](/docs/api/rest/standards)
* [Searching and Filtering](/docs/api/rest/searching)
* [Aggregation](/docs/api/rest/aggregation)
* [Service List](/docs/api/rest/rest)


