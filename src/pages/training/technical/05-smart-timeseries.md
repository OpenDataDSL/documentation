---
slug: /training/technical/smart-timeseries
title: "Module 05: Smart TimeSeries – Currency & Unit Conversion"
sidebar_position: 6
tags: [training, smart-timeseries, odsl]
---

# Module 05: Smart TimeSeries – Currency & Unit Conversion

A **SmartTimeSeries** holds a mathematical expression rather than raw values. When the timeseries is requested, the expression is evaluated against one or more referenced input series. This makes SmartTimeSeries ideal for currency conversion, unit conversion, and any derived calculation you want to keep in sync automatically.

## The SmartTimeSeries Model

```
SmartTimeSeries
├── BASE        → the primary input (referenced timeseries)
├── Expression  → a formula using BASE and optional named variables
└── Named vars  → additional inputs (e.g. VAR1, FX_RATE)
```

The `BASE` keyword in the expression always refers to the primary input series. Additional named variables are set as properties on the SmartTimeSeries object.

---

## Step 1: Unit Conversion — therm to MWH

The `SETTLEMENT_PRICE` series is in GBP per therm. We will create a SmartTimeSeries that converts it to GBP per MWH. The platform handles the unit conversion automatically when you set the `units` property — no manual formula is required.

```js
//#region
use training
hub = ${object:"MY.GAS.HUB"}

// Reference the settlement price series
baseRef = ref("data", "MY.GAS.HUB:SETTLEMENT_PRICE")

// Setting units to MWH triggers automatic unit conversion from therm
settleMwh = SmartTimeSeries(baseRef, "BASE")
settleMwh.description = "Settlement price in GBP per MWH"
settleMwh.units = "MWH"
settleMwh.currency = "GBP"

hub.SETTLEMENT_GBP_MWH = settleMwh
save hub

print "SETTLEMENT_GBP_MWH SmartTimeSeries saved"
//#endregion
```

---

## Step 2: Currency Conversion — GBP to EUR

The platform handles currency conversion automatically when you set the `currency` property. Setting `currency` to `"EUR"` on a GBP-denominated series will convert the values using the platform's built-in FX rates — no need to reference an FX series manually.

```js
//#region
use training
hub = ${object:"MY.GAS.HUB"}

// Reference the GBP/MWH settlement series as BASE
baseRef = ref("data", "MY.GAS.HUB:SETTLEMENT_GBP_MWH")

// Setting currency to EUR triggers automatic FX conversion
settleEur = SmartTimeSeries(baseRef, "BASE")
settleEur.description = "Settlement price in EUR per MWH"
settleEur.units = "MWH"
settleEur.currency = "EUR"

hub.SETTLEMENT_EUR_MWH = settleEur
save hub

print "SETTLEMENT_EUR_MWH SmartTimeSeries saved"
//#endregion
```

---

## Step 3: Volume Conversion — MWH to GWH

Create a SmartTimeSeries that converts the BUY_VOLUME series from MWH to GWH. Setting `units` to `"GWH"` triggers automatic unit conversion — no division expression is needed.

```js
//#region
use training
hub = ${object:"MY.GAS.HUB"}

baseRef = ref("data", "MY.GAS.HUB:BUY_VOLUME")

buyVolGwh = SmartTimeSeries(baseRef, "BASE")
buyVolGwh.description = "Daily BUY nomination volumes in GWH"
buyVolGwh.units = "GWH"

hub.BUY_VOLUME_GWH = buyVolGwh
save hub

print "BUY_VOLUME_GWH SmartTimeSeries saved"
//#endregion
```

---

## Step 4: Combined Conversion — Two Named Inputs

A SmartTimeSeries can reference multiple named series. Here we calculate the **gross value** of the BUY nominations (volume in MWh × price in £/MWh).

```js
//#region
use training
hub = ${object:"MY.GAS.HUB"}

// Use the BUY volume as BASE
baseRef = ref("data", "MY.GAS.HUB:BUY_VOLUME")

grossValue = SmartTimeSeries(baseRef, "BASE * PRICE")

// Second input: the GBP/MWH price series
grossValue.PRICE = ref("data", "MY.GAS.HUB:SETTLEMENT_GBP_MWH")

grossValue.description = "Gross value of BUY nominations in GBP"
grossValue.units = "MWH"
grossValue.currency = "GBP"

hub.BUY_GROSS_VALUE = grossValue
save hub

print "BUY_GROSS_VALUE SmartTimeSeries saved"
//#endregion
```

---

## Step 5: Inspect the SmartTimeSeries

Read the series directly to verify the conversions are applied correctly.

```js
//#region
use training
// Inspect the EUR settlement price
eurSettle = ${data:"MY.GAS.HUB:SETTLEMENT_EUR_MWH"}
print "EUR settlement price:"
print eurSettle

// Inspect the gross value series
grossVal = ${data:"MY.GAS.HUB:BUY_GROSS_VALUE"}
print "Gross BUY value (GBP):"
print grossVal
//#endregion
```

---

## Step 6: Using the Built-in `.convert()` Method

For simple one-off conversions, timeseries objects expose a `.convert(currency, units)` method that applies platform-managed FX and unit conversion:

```js
//#region
use training
// Fetch the base settlement series
settle = ${data:"MY.GAS.HUB:SETTLEMENT_PRICE"}

// Convert to EUR/MWh using the platform's currency conversion
convertedSettle = settle.convert("EUR", "MWh")

print "Converted settlement price:"
print convertedSettle
//#endregion
```

:::tip When to Use `.convert()` vs SmartTimeSeries
Use `.convert()` when you want a one-time conversion in a script. Use **SmartTimeSeries** when you want the conversion to be persisted as a named series on the object — so other users or automations can access it by name without re-running the conversion logic.
:::

---

## Summary

| Series Name | Base Series | Expression | Extra Inputs |
|-------------|-------------|-----------|--------------|
| `SETTLEMENT_GBP_MWH` | `SETTLEMENT_PRICE` | `BASE` | units: MWH |
| `SETTLEMENT_EUR_MWH` | `SETTLEMENT_GBP_MWH` | `BASE` | currency: EUR |
| `BUY_VOLUME_GWH` | `BUY_VOLUME` | `BASE` | units: GWH |
| `BUY_GROSS_VALUE` | `BUY_VOLUME` | `BASE * PRICE` | `PRICE` ref / units: MWH |

## Exercise

1. Verify all four SmartTimeSeries appear under **MY.GAS.HUB → Data** in the portal
2. Inspect `BUY_GROSS_VALUE` in the portal and check the values are approximately correct (volume × price)
3. Create an additional SmartTimeSeries `SELL_GROSS_VALUE` following the same pattern for `SELL_VOLUME`

:::note Next Step
In [Module 06](/training/technical/dataset-monitoring) you will configure dataset monitoring in the portal to track daily delivery of the settlement price.
:::
