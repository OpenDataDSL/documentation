---
title: Check functions
description: The functions in the validation library, with what they check and their parameters
slug: /extensions/validation/functions
sidebar_position: 4
tags: [extension, validation, functions, reference]
---

# Check functions

The public script `#ValidationLibrary` holds the check functions every configuration can use. Pick them with **Add check from a function**, which lists the functions that fit the check and asks for their parameters, or type them in the **Expression** column. The **Functions** tab of **Information > Validation** lists them with their parameters and shows the code.

"The previous value" is the same tenor on the previous stored curve, or the previous observation of a timeseries. "Earlier values" are the values in `#HISTORY`: the previous observations (see **Lookback**) or the same tenor on the previous curves (see **Previous values**), newest first.

---

## Value checks

For each tenor of a curve and each observation of a timeseries.

| Function | Fails when | Example |
|-|-|-|
| `checkMissing()` | the value is missing | `checkMissing()` |
| `checkZero()` | the value is zero | `checkZero()` |
| `checkNegative()` | the value is below zero | `checkNegative()` |
| `checkRange(min, max)` | the value is outside min to max (inclusive) | `checkRange(0, 500)` |
| `checkChange(maxChange)` | the value moved by more than maxChange from the previous value | `checkChange(25)` |
| `checkChangePct(maxPct)` | the value moved by more than maxPct percent from the previous value | `checkChangePct(20)` |
| `checkZScore(threshold)` | the value is more than threshold standard deviations from the mean of the earlier values (needs at least 5) | `checkZScore(4)` |
| `checkBand(n, pct)` | the value is more than pct percent from the average of the last n values | `checkBand(10, 15)` |
| `checkStale(n)` | the value is the same as each of the n values before it (gives a **warning**) | `checkStale(5)` |

A value check is **Skipped** when it has nothing to work with: the value is missing (except for `checkMissing`), there is no previous value, or there are not enough earlier values.

## Timeseries checks

| Function | Fails when | Example |
|-|-|-|
| `checkGap(maxDays)` | there are more than maxDays days since the previous observation | `checkGap(5)` for daily data, `checkGap(35)` for monthly |

## Curve checks

On the whole curve (scope **Curve**).

| Function | Fails when | Example |
|-|-|-|
| `checkCurveMissing()` | any contract has a missing value | `checkCurveMissing()` |
| `checkCurveZero()` | any contract is zero | `checkCurveZero()` |
| `checkCurveGaps()` | there are gaps between the delivery periods of the contracts | `checkCurveGaps()` |
| `checkCurveStructure(months, quarters, seasons, years)` | there are fewer months, quarters, seasons or years than given (use 0 for any you do not need) | `checkCurveStructure(3, 2, 1, 2)` |
| `checkCurveMinContracts(n)` | there are fewer than n contracts | `checkCurveMinContracts(12)` |
| `checkCurveTenors(tenors)` | a listed tenor is not on the curve | `checkCurveTenors("M01,M02,Q01")` |
| `checkCurveTenorsKept()` | tenors on the previous curve are missing from this one (gives a **warning**) | `checkCurveTenorsKept()` |
| `checkCurveStale()` | every value is the same as on the previous curve (gives a **warning**) | `checkCurveStale()` |
| `checkCurveArbitrage(tolPct)` | a quarter differs from the simple average of its three months by more than tolPct percent (quarters without all three months are not checked) | `checkCurveArbitrage(1)` |

A check that "gives a warning" returns `"warning"` itself, whatever its severity.

---

## Expressions without a function

An expression can be any single line of ODSL that gives true or false, using the [variables](/docs/extensions/validation/writing-checks#variables), for example:

| Expression | Fails when |
|-|-|
| `#VALUE > 0` | the value is not above zero |
| `#VALUE < 1000` | the value is 1000 or more |

For anything longer, write a function in a [private script](/docs/extensions/validation/writing-checks).

---

## Curve quality group functions

The functions of the curve quality group script `#QualityCheckCurves`, such as `gapCheck()`, `missingCheck()`, `zeroCheck()` and `curveStructure(3, 2, 1, 2, true)`, work as curve checks (scope **Curve**): add `#QualityCheckCurves` to the configuration's scripts. They use `#CURVE` and `#LOG`, which validation sets in the same way as quality groups.

---

## What a result shows

Each check result has a message, and many functions add details. For example `checkChangePct` records the change in percent, and `checkZScore` the z-score, mean and standard deviation. They show under the message when you open a record.
