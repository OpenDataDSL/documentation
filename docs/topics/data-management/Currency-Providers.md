---
slug: /odsl/dm/currency-providers
sidebar_position: 9
title: Currency Providers
description: Choose which FX rates are used when curves and timeseries are converted to another currency
tags:
- data_management
- currency
- fx
- conversion
- topics
---

# Currency Providers

Whenever OpenDataDSL converts a curve or timeseries to another currency, it needs a set of exchange rates to do it. The set of rates it uses is the **currency provider**: an FX dataset such as `ECB_FX` (European Central Bank reference rates) or `BOE_FX` (Bank of England daily spot rates).

By default every conversion uses `ECB_FX`. This page explains how to choose a different provider for your whole organisation, for a single Smart Curve or Smart TimeSeries, for a Composer worksheet or column, or for a single request.

---

## When you need a different provider

The ECB reference rates are a good default, but they are not always the right rates for the job:

- Your finance team reports in GBP and expects Bank of England rates, so every converted price should agree with their numbers.
- Your trades settle against your bank's daily rates, for example `ABN_FX`, and your positions should be valued with the same rates.
- You hold your own rates, such as month-end rates agreed with your auditors, and want specific curves converted with those.
- One curve needs a different source from the rest, for example an Indian product converted with Reserve Bank of India rates (`RBI_FX`).

The public FX datasets you can choose from are listed on the [Foreign Exchange Rates](/docs/data/fx) page.

---

## How the provider is chosen

When a value is converted, the provider is taken from the first of these that is set:

| Order | Where it is set | Applies to | Example |
|-|-|-|-|
| 1 | The target currency itself, as `CURRENCY@DATASET` | That one conversion | `GBP@BOE_FX` |
| 2 | The `CCY_DATASET` property of a Smart Curve or Smart TimeSeries, or the **FX provider** in Composer | Everything that Smart Curve, Smart TimeSeries or Composer column converts | `BOE_FX` |
| 3 | The `CCY_DATASET` property of your tenant | Every conversion in your organisation | `BOE_FX` |
| 4 | The platform default | Everything else | `ECB_FX` |

So you can set your organisation's default once on the tenant, and still override it for a curve or a single request.

:::note
Only currency conversion uses a provider. Unit and timezone conversions are not affected by any of these settings.
:::

---

## Setting your organisation's default

Add a `CCY_DATASET` property to your tenant record with the id of the FX dataset to use. For example, to use Bank of England rates for every conversion:

| Property | Example | Notes |
|-|-|-|
| `CCY_DATASET` | `BOE_FX` | The FX dataset used for every conversion that doesn't choose its own |
| `CCY_DATASET_SOURCE` | `public` | Optional. `public` (the default) for a platform dataset, `private` for one you load yourself |

You update the tenant record with the [Tenant Service](/docs/api/rest/service/tenant):

```js
POST https://api.opendatadsl.com/api/tenant/v1

{
  "properties": {
    "name": "Acme Energy Trading Ltd",
    "address1": "1 Canary Wharf",
    "city": "London",
    "postcode": "E14 5AB",
    "CCY_DATASET": "BOE_FX"
  }
}
```

:::caution
The tenant service replaces the whole `properties` object; it does not merge it. Read your tenant first with `GET https://api.opendatadsl.com/api/tenant/v1` and send every existing property back along with the new one. Any property you leave out, such as your address or Fusion AI budget settings, is removed.
:::

The new default applies to conversions started after the change, although it can take a few minutes to reach every server. A process or build that is already running keeps the provider it started with.

---

## Choosing a provider for a Smart Curve or Smart TimeSeries

A Smart Curve or Smart TimeSeries with a `currency` converts its inputs to that currency when it is built. To use a different provider for those conversions, add a `CCY_DATASET` property to it:

```js
sc = SmartCurve("#ICE.NBP:FUT", "BASE")
sc.currency = "EUR"
sc.CCY_DATASET = "BOE_FX"
```

The same works on a Smart TimeSeries:

```js
sts = SmartTimeSeries("#ICE.NBP:SPOT", "BASE")
sts.currency = "EUR"
sts.CCY_DATASET = "BOE_FX"
```

If the provider is a private dataset, also set `CCY_DATASET_SOURCE` to `private`:

```js
sc.CCY_DATASET = "ACME_FX"
sc.CCY_DATASET_SOURCE = "private"
```

A Smart Curve or Smart TimeSeries without these properties uses your tenant's default, or `ECB_FX` if your tenant doesn't set one.

---

## Choosing a provider in Composer

In a Composer worksheet, the **FX provider** setting under **Conversion defaults** sets the provider for every column on the worksheet, and a column's own **FX provider** overrides it for that column. Leave it empty to use your organisation's default. See [Composer workspace](/docs/extensions/composer/workspace) for the conversion settings.

:::note
The Composer **FX provider** setting picks a public FX dataset. To convert with your own private rates in Composer, make the private dataset your tenant's default, as described in [Using your own rates](#using-your-own-rates).
:::

---

## Choosing a provider for a single conversion

Anywhere you give a target currency, you can add the provider after an `@`. This always wins over the Smart Curve, Composer and tenant settings.

The full format is `CURRENCY:PROFILE@DATASET`, where the profile and the dataset are both optional:

| Value | Meaning |
|-|-|
| `GBP` | Convert to GBP with the default provider and the `SPOT` profile |
| `GBP@BOE_FX` | Convert to GBP with Bank of England rates |
| `GBP:SPOT@BOE_FX` | The same, with the profile given explicitly |

:::caution
Put the profile before the `@`. `GBP@BOE_FX:SPOT` is read as a dataset called `BOE_FX:SPOT`, which doesn't exist.
:::

In the REST API, use it in the `currency` query parameter of the [Data Service](/docs/api/rest/service/data):

```js
GET https://api.opendatadsl.com/api/data/v1/public/%23ICE.TTF:SPOT?currency=GBP@BOE_FX
```

In ODSL, use it in the `convert` method of a curve or timeseries:

```js
ttf = ${data:"#ICE.TTF:SPOT"}
ttf_gbp = ttf.convert("GBP@BOE_FX", "MWh")
```

The second argument of `convert` is the target units; giving the series' own units converts the currency only.

---

## Using your own rates

You can load your own rates as a private FX dataset and use it as a provider. The platform finds rates in the currency service, so your data needs to look like the public FX datasets:

| Requirement | Details |
|-|-|
| Type | Each currency pair is an object of type `#ForeignExchange` |
| `dataset` | The dataset id, for example `ACME_FX`. This is the value you use as the provider |
| `base` | The base currency of the pair, for example `EUR` |
| `currency` | The quote currency of the pair, for example `USD` |
| Rates | A timeseries on the pair (for example `ACME_FX.EURUSD:SPOT`) holding the amount of `currency` per 1 `base` |

Then point the conversions at it with `CCY_DATASET_SOURCE` set to `private`, for example on your tenant:

| Property | Value |
|-|-|
| `CCY_DATASET` | `ACME_FX` |
| `CCY_DATASET_SOURCE` | `private` |

:::note
The tenant's `CCY_DATASET_SOURCE` is only used when its own `CCY_DATASET` is the provider. If a Smart Curve or a request picks a public dataset such as `BOE_FX`, those rates are still read from the public data, so a private tenant default doesn't break other conversions.
:::

---

## How rates are found

For a conversion from one currency to another, the provider is searched in this order:

| Step | Looks for | Example converting USD to GBP with `ECB_FX` |
|-|-|-|
| 1 | The direct pair | A pair with base `USD` and currency `GBP` |
| 2 | The inverse pair, using 1 / rate | A pair with base `GBP` and currency `USD` |
| 3 | A cross rate through the dataset's base currency | `EUR` to `GBP` divided by `EUR` to `USD` |

A provider therefore doesn't need every pair: a dataset quoted against one base currency, like `ECB_FX` against EUR or `BOE_FX` against GBP, can convert between any two of its currencies.

Each value is converted with the rate for its own date: a timeseries value uses the rate on that day, and a curve uses the rate on the curve date.

| What happens | Why |
|-|-|
| The converted value is `NaN` | The provider has the pair but no rate for that date, for example a bank holiday |
| The conversion fails with "Currency for conversion between ..." | The provider has no way to convert between the two currencies |

:::tip
If converted values come out as `NaN` on some days, check the provider's calendar. Central bank datasets only publish on their own business days, so a different provider may cover the dates you need.
:::

---

## Summary

| To | Set |
|-|-|
| Change the provider for your whole organisation | `CCY_DATASET` on the tenant |
| Use your own rates for your whole organisation | `CCY_DATASET` and `CCY_DATASET_SOURCE` = `private` on the tenant |
| Change the provider for one Smart Curve or Smart TimeSeries | `CCY_DATASET` (and `CCY_DATASET_SOURCE` for private rates) on it |
| Change the provider in Composer | **FX provider** on the worksheet or column |
| Change the provider for one request or calculation | `CURRENCY@DATASET` as the target currency |
