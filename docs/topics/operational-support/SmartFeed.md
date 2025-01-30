---
slug: /odsl/os/smartfeed
title: Smart Feeds 🆕
description: Creating and using smart feeds for collecting data
tags:
- operations
- smart
- cron
- scheduling
- datafeed
- topics
- new
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

Smart feeds are a component within DataSet Monitoring that provides a methodology used to load data into OpenDataDSL in a smart way.

## Components of a smart feed

A smart feed is configured on a dataset feed and comprises all the necessary processes to load all the datasets that this feed covers.

The smart feed continues to trigger processes until all datasets for this feed are deemed to be complete.
A dataset is deemed to be complete when it passes all its completeness checks, these are:
* Minimum total tenors
* Minimum specific tenors
* Custom checks such as checking for a specific tenor

Each loader within a smart feed consists of:
* The process to run
* A calendar to define the days the loader should not run
* The start time and timezone
* A run type:
    * Standard - attempts to load data, then defaults to the configured retry strategy
    * Auto
    * Manual
* A retry strategy with a back-off algorithm:
    * Linear - a set retry delay
    * Random - a random retry delay
    * Eager - random retries, but with shortening delays
    * Lazy - random retries, but with lengthening delays





