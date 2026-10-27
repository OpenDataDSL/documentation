---
title: Kafka Service
description: The kafka service in the ODSL language
slug: /odsl/service/kafka
tags:
  - service
  - kafka
---

# Kafka Service

The **kafka** active variable service reads JSON messages from Apache Kafka topics and returns them as a [list](/docs/odsl/variable/list) of [objects](/docs/odsl/variable/object), the same shape the [JSON service](./json) returns for a JSON array.

## Using the service

```js
messages = ${kafka:"prices-*","bootstrap=b-1.example.com:9196;b-2.example.com:9196,group=nge_prices,username=nge_reader"}
```

The id is a topic name, several topic names separated by `;`, or a pattern: an id with `*` is a wildcard pattern, and an id starting with `^` is a regular expression.

Each read returns the messages published since the consumer group last read the topic, up to `maxRecords`. A message that is a JSON array gives one object per element.

## Options

Options are given after the id as `name=value` pairs separated by commas. Use `;` to separate several values inside one option.

|**Option**|**Description**|**Default**|
|-|-|-|
|bootstrap|The broker list, e.g. b-1:9196;b-2:9196 (required)||
|group|The consumer group id (required)||
|username|The SASL username||
|password|The SASL password. Without it, the KAFKA_SASL_PASSWORD environment variable is used||
|protocol|SASL_SSL, SSL, SASL_PLAINTEXT or PLAINTEXT|SASL_SSL|
|mechanism|SCRAM-SHA-512, SCRAM-SHA-256 or PLAIN|SCRAM-SHA-512|
|maxRecords|The most messages returned by one read|1000|
|maxWait|The most milliseconds one read can take|30000|
|idleTimeout|Stop after this many milliseconds with no new messages|3000|
|offsetReset|earliest or latest: where a new consumer group starts|earliest|
|commit|true or false: whether to record that the returned messages have been read|true|
|metadata|true adds _topic, _partition, _offset, _key and _timestamp to each object|false|
|failOnBadMessage|true fails the read on a message that is not JSON, instead of skipping it|false|
|kafka.name|Any Kafka consumer property, e.g. kafka.fetch.max.bytes=52428800||

:::caution
With commit=true, the messages are marked as read before the read returns. If your script fails afterwards, those messages are not read again. Use commit=false while you test.
:::
