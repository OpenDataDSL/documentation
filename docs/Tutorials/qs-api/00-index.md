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
We will then do a deep-dive into some of the services, following up with running processes and using the real-time services to follow their progress.
We will end with subscribing to data updates using message queues.

In each module, we will give examples in various languages and all the code for these examples are available in our GitHub repositories as shown below:

|Language|GitHub Repository Link|
|-|-|
|Python|-|
|Java|-|     
|C#|-|
|NodeJS|-|

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

For Python, you can use your own favourite IDE, but you will need to install some libraries as shown below:
* [Requests](https://docs.python-requests.org/en/latest/) library for making HTTP requests
```
pip install requests
```

</TabItem>
<TabItem value="java" label="Java">

For Java, you can use your own favourite IDE and we have used Maven as our software management tool.

The maven `pom.xml` to create your java project

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.opendatadsl</groupId>
    <artifactId>odsl-api-developer</artifactId>
    <version>1.0-SNAPSHOT</version>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>8</source>
                    <target>8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <dependencies>
        <dependency>
            <groupId>com.microsoft.azure</groupId>
            <artifactId>msal4j</artifactId>
            <version>1.11.0</version>
        </dependency>
    </dependencies>

</project>
```

</TabItem>
</Tabs>

---

<StartBuilding />
