---
title: Scheduling & Automation
sidebar_position: 4
tags: [smart-curves, scheduling, automation, caching]
---

# Scheduling & Automation

Smart Curves are automatically rebuilt and cached by the platform based on a **cache configuration** set on the curve itself. This controls when the platform calculates and stores a new version of the curve — from never caching at all, through to rebuilding whenever dependencies are updated or on a fixed schedule.

---

## Setting the Cache Type

Cache behaviour is configured via the `cacheOptions.type` property on the SmartCurve:

```odsl
MY_OBJECT = Object()

sc = SmartCurve("ICE.NBP_M:SETTLE", "bootstrapCurve(BASE)")
sc.cacheOptions.type = "OnDependencies"

MY_OBJECT.CURVE = sc
save ${object:MY_OBJECT}
```

---

## Cache Types

| Type | Description |
|---|---|
| `Never` | Never saves a cached version — the curve is always calculated on demand when requested |
| `OnDemand` | Calculates and caches the curve the first time it is read |
| `OnDependencies` | Builds and caches the curve automatically whenever its dependencies are updated |
| `OnSchedule` | Rebuilds and caches based on a cron schedule — typically used for realtime curves |
| `External` | Curve is built and saved by an external application; only triggered on dependencies or manually |

---

## OnDependencies

`OnDependencies` is the most common setting for end-of-day forward curves. The platform monitors the input data sources defined in the SmartCurve and automatically rebuilds the curve whenever new data arrives.

```odsl
NBP_OBJECT = Object()

sc = SmartCurve("ICE.NBP_M:SETTLE", "bootstrapCurve(BASE, VAR1)")
sc.VAR1 = ref("data", "ICE.NBP_Q:SETTLE")
sc.cacheOptions.type = "OnDependencies"

NBP_OBJECT.CURVE = sc
save ${object:NBP_OBJECT}
```

:::tip
`OnDependencies` is ideal for curves that depend on exchange settlement prices — the curve will rebuild automatically as soon as the settlement data lands on the platform, with no manual intervention required.
:::

---

## OnDemand

`OnDemand` is a lightweight option that defers the build until the curve is first requested. The result is then cached for subsequent reads.

```odsl
sc.cacheOptions.type = "OnDemand"
```

:::note
Use `OnDemand` for curves that are infrequently accessed or where you want to avoid rebuilding on every dependency update. The first read after a dependency changes will trigger a fresh build.
:::

---

## OnSchedule

`OnSchedule` rebuilds the curve on a fixed cron schedule, independent of when dependencies arrive. This is typically used for realtime or intraday curves that need to refresh at regular intervals.

```odsl
sc.cacheOptions.type = "OnSchedule"
sc.cacheOptions.schedule = "0 * * * MON-FRI"
```

:::note
Cron expressions follow standard format: `minute hour day month weekday`. The example above rebuilds the curve every hour on weekdays.
:::

Common scheduling patterns:

| Pattern | Cron Expression |
|---|---|
| Every hour on weekdays | `0 * * * MON-FRI` |
| Weekdays at 18:00 | `0 18 * * MON-FRI` |
| Daily at midnight | `0 0 * * *` |
| Every 15 minutes | `*/15 * * * *` |

---

## Never

`Never` disables caching entirely. The curve is recalculated from scratch on every request and no cached version is stored.

```odsl
sc.cacheOptions.type = "Never"
```

:::note
Use `Never` during development or for diagnostic curves where you always want the latest calculation without any cached state.
:::

---

## External

`External` is used when an external application is responsible for building and saving the curve. The platform will only trigger a build on explicit request or when dependencies update — it will not build the curve automatically on its own schedule.

```odsl
sc.cacheOptions.type = "External"
```

---

## Full Example

Here is a complete Smart Curve definition using `OnDependencies` caching:

```odsl
NBP_OBJECT = Object()
NBP_OBJECT.description = "NBP Gas Forward Curve - daily bootstrapped curve"

sc = SmartCurve("ICE.NBP_M:SETTLE", "bootstrapCurve(BASE, VAR1)")
sc.VAR1 = ref("data", "ICE.NBP_Q:SETTLE")
sc.cacheOptions.type = "OnDependencies"

NBP_OBJECT.CURVE = sc
save ${object:NBP_OBJECT}
```

---

## Summary

| Cache Type | When to Use |
|---|---|
| `Never` | Development, diagnostics, or always-fresh on-demand calculation |
| `OnDemand` | Infrequently accessed curves; defer build until first read |
| `OnDependencies` | End-of-day curves driven by incoming market data |
| `OnSchedule` | Realtime or intraday curves on a fixed refresh interval |
| `External` | Curves built and managed by an external system |
