---
title: API Developer
description: Home page of the QuickStart for API developers
sidebar_position: 1
slug: /tutorials/qs/api
tags:
  - quickstart
  - api
  - developer
---
import StartBuilding from '/src/components/StartBuilding.js';
import {QuickStart, InDepth, MoreInfo} from '/src/components/Discovery.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<QuickStart text="This quickstart track will help you learn the OpenDataDSL API's and build your own applications." />

---
## Introduction
#### Welcome to the OpenDataDSL API developer quickstart track!

Here you will start with the fundamentals of using the OpenDataDSL services including security.
We will then do a deep-dive into some of the services, including subscribing to data updates using message queues.

In each module, we will give examples in various languages and all the code for these examples are available in our GitHub repositories as shown below:

|Language|GitHub Repository Link|
|-|-|
|Python|[odsl-python-sdk-demo](https://github.com/OpenDataDSL/odsl-python-sdk-demo)|
|Java|[odsl-java-sdk-demo](https://github.com/OpenDataDSL/odsl-java-sdk-demo)|     

## Preparation
This quickstart track requires some preparation in order to follow along with the content.

### Language specific preparation
<Tabs groupId="language">
<TabItem value="rest" label="REST" default>

Although not a language, the REST tabs in this series give you a good idea of the raw requests that the other examples are making.
It is also great for testing requests and evaluating the responses.

For submitting REST requests, it is a good idea to use one of the many great tools - below are a few of our favourites:
* VS Code with the [REST Client](https://github.com/Huachao/vscode-restclient) extension
* [Postman](https://www.postman.com/product/what-is-postman/)

</TabItem>
<TabItem value="python" label="Python">

We have an SDK for Python which you can install from [PyPI](https://pypi.org/project/odsl/)

```
pip install odsl
```

</TabItem>
<TabItem value="java" label="Java">

For Java, you can use your own favourite IDE and we have used Maven as our software management tool.

Add the following dependency to your mavan ```pom```

```xml
<dependency>
    <groupId>com.opendatadsl</groupId>
    <artifactId>odsl-sdk</artifactId>
    <version>1.1.21</version>
</dependency>
```

</TabItem>
<TabItem value="javascript-browser" label="Javascript Browser">

For Javascript in the browser, you can pull the latest source from [here](https://github.com/OpenDataDSL/odsl-javascript-browser-sdk)

</TabItem>
</Tabs>
