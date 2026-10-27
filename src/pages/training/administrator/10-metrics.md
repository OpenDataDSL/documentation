---
slug: /training/administrator/metrics
title: "Module 10: Metrics & Health"
sidebar_position: 11
tags: [training, administrator, metrics, operations, portal]
---

# Module 10: Metrics & Health

The platform records a metric for every API request and every process execution, and collects metrics from the messaging subsystem. In this module you will turn those metrics into timeseries, store the ones you want to watch, and check your tenant's quotas and usage.

## Learning Objectives

By the end of this module you will be able to:

- Name the metric providers and the metrics each one offers
- Build a metric timeseries on the fly in ODSL and with the REST API
- Store metric timeseries on a master data record for charts and reports
- Track API usage by service, user and application
- Track process runs, queue backlogs and dead-lettered messages
- Check quotas, environment sizes and billed usage

---

## Step 1: Metric Providers

| Provider | Records | Metrics | Filter fields |
|----------|---------|---------|---------------|
| `ODSLRequest` | Every API request, from any application | `ReadRequests`, `WriteRequests`, `DeleteRequests`, `ReadRequestDuration`, `ReadRequestResponseSize` | `service`, `key`, `action`, `application`, `httpstatus`, `user` |
| `ODSLProcess` | Every process execution | `RunRequests`, `RunRequestDuration` | `name`, `trigger`, `status` |
| `AzureServiceBus` | The messaging subsystem | `ActiveMessages`, `DeadletteredMessages`, `IncomingMessages`, `OutgoingMessages`, `ServerErrors`, `ThrottledRequests` and more | `queue` |

List the metric names a provider offers with the metric service:

```
GET https://api.opendatadsl.com/api/metric/v1?_function=listMetrics&provider=ODSLRequest
Authorization: Bearer {{token}}
```

:::note
Some pages call the request provider `ODSLRequests`. The examples on the [Metrics](/docs/odsl/os/metrics) topic page use `ODSLRequest`, which is the name used here. Use `listMetrics` to confirm the names in your tenant.
:::

---

## Step 2: A Metric Timeseries on the Fly

The `metric()` function aggregates metrics into a timeseries. Give it the provider and metric, a calendar for the interval, how to aggregate (`summed`, `averaged`, `high`, `low`), a range and, optionally, a filter:

```js
//#region Dynamic metric timeseries
// Average duration of reads of object AAA yesterday, per 15 minutes
mts = metric("ODSLRequest/ReadRequestDuration", "#PT15M", "averaged", "between(T-1Dh0m0s0,T-1Dh23m59s59)", ?service='object' and key='AAA')
print mts

// Total process runs yesterday, per 15 minutes
runs = metric("ODSLProcess/RunRequests", "#PT15M", "summed", "between(T-1Dh0m0s0,T-1Dh23m59s59)")
print runs
//#endregion
```

Common calendars are `#PT5M`, `#PT15M`, `#PT1H` and `#P1D`.

---

## Step 3: API Usage with the REST API

Add `_metric` to a request on any service to get the metrics for that service, or for one item:

```
GET https://api.opendatadsl.com/api/object/v1
  ?_metric=ODSLRequest/ReadRequests
  &_calendar=%23PT1H
  &_observed=summed
  &_range=between(T-1Dh0m0s0,T-1Dh23m59s59)
  &_filter={"application":"api"}
Authorization: Bearer {{token}}
```

| Question | Try |
|----------|-----|
| Which service is busiest? | `ReadRequests` and `WriteRequests` on each service |
| Is the Excel Add-in or the API driving load? | Filter on `application` |
| Which responses are largest? | `ReadRequestResponseSize` with `_observed=high` on the `data` service |
| Are requests slowing down? | `ReadRequestDuration` with `_observed=averaged` |

---

## Step 4: Store Metrics to Watch

A **MetricTimeSeries** saved on a master data record behaves like any other timeseries, so you can chart it, report on it and check it every day:

```js
//#region Store platform health metrics
cal = ${calendar:"#PT1H"}

health = Object()
health.id = "ODSL.METRICS.HEALTH"
health.name = "Platform health metrics"

// Hourly writes across all services
Writes_1h = MetricTimeSeries("ODSLRequest", "WriteRequests")
Writes_1h.calendar = cal
Writes_1h.observed = "summed"
health.Writes_1h = Writes_1h

// Hourly failed process runs
FailedRuns_1h = MetricTimeSeries("ODSLProcess", "RunRequests")
FailedRuns_1h.calendar = cal
FailedRuns_1h.observed = "summed"
FailedRuns_1h.filter = ?status='failed'
health.FailedRuns_1h = FailedRuns_1h

// Average backlog on the ETRM queue
EtrmBacklog = MetricTimeSeries("AzureServiceBus", "ActiveMessages")
EtrmBacklog.calendar = cal
EtrmBacklog.observed = "averaged"
EtrmBacklog.filter = ?queue='etrm-curves'
health.EtrmBacklog = EtrmBacklog

save health
//#endregion
```

:::tip
Add `DeadletteredMessages` for each queue an external system consumes. Any value above zero means messages are not being delivered.
:::

---

## Step 5: Process Health

Alongside the `ODSLProcess` metrics, the process dashboard shows for each process a calendar of the days it ran, the total processing time for the month, the year and all time, and a chart of runs by status. Long-running processes cost more to run, so compare `RunRequestDuration` with the process type: `Ristretto` processes are meant for runs under 6 minutes.

---

## Step 6: Resource Consumption

| What | Where |
|------|-------|
| Quotas and how much you have used | `GET tenant/v1?_function=quota` returns `service`, `quota` and `used` for each limited service |
| Storage per environment | The `_size` of each environment from `find ${environment}` |
| Billed usage | The billing service: `billing/v1/current` (this month so far), `billing/v1/storage`, `billing/v1/process`, `billing/v1/ai` and `billing/v1/users` |
| Fusion AI tokens | The AI usage service: one record per conversation per day, with input and output tokens |

```js
//#region Storage by environment
env = find ${environment}
for e in env
    print e._id + ": " + e._size + " bytes"
next
//#endregion
```

The raw metric records behind all of this are read-only in the metric service, `find ${metric}`, with fields such as `service`, `user`, `application`, `duration`, `responseSize`, `httpstatus`, `environment` and `type`.

:::note
If a metric request fails, the reason is in the `x-odsl-error` response header.
:::

---

## Exercise

1. Use `metric()` to get yesterday's hourly `ReadRequests` for the `object` service.
2. Save the `ODSL.METRICS.HEALTH` record above, with a queue name from your own tenant.
3. Read back `ODSL.METRICS.HEALTH:FailedRuns_1h` and check the last day.
4. Call the tenant `quota` function and note how close you are to each quota.

---

## Summary

| Need | Use |
|------|-----|
| Ad hoc look at usage | `metric()` in ODSL, or `_metric` on any REST call |
| A metric to watch every day | A `MetricTimeSeries` on a master data record |
| Queue health | `AzureServiceBus` `ActiveMessages` and `DeadletteredMessages` |
| Process health | `ODSLProcess` metrics and the process dashboard |
| Quotas and usage | Tenant `quota` function, environment `_size`, billing and AI usage services |

:::note Track Complete
You have completed the Administrator track. Return to the [Administrator Training](/training/administrator) home page to review the official tutorials.
:::
