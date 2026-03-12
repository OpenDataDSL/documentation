---
slug: /odsl/function/functions-curve
title: Curve Functions
sidebar_position: 13
---

This document provides a reference for all built-in curve functions available in OpenDataDSL.

### asDays(contract)

**Category:** Curve

**Description:** Splits a Contract into day contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into days

**Returns:** Contracts



---

### asHours(contract, timezone)

**Category:** Curve

**Description:** Splits a Contract into hourly contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into hours
* `timezone` (Contract) - The timezone to use

**Returns:** Contracts



---

### asHours(contract)

**Category:** Curve

**Description:** Splits a Contract into hourly contracts

**Parameters:**
* `contract` (Contract) - The input contract to split into hours

**Returns:** Contracts



---

### asMonths(contract)

**Category:** Curve

**Description:** Splits a Contract into month contracts - usually used with Quarters, Seasons or Cals

**Parameters:**
* `contract` (Contract) - The input contract to split into months

**Returns:** Contracts



---

### asStrips(input)

**Category:** Curve

**Description:** Creates an arbitrage free curve comprised of calendar year strips

**Parameters:**
* `input` (Curve) - The input curve to create the strips from

**Returns:** Curve

**Works with:** `curve` 

---

### bootstrapCurve(input)

**Category:** Curve

**Description:** Creates an arbitrage free monthly curve from the input curve

**Parameters:**
* `input` (Curve) - The input curve to bootstrap

**Returns:** Curve

**Works with:** `curve` 

---

### combine(base, other, replace)

**Category:** Curve

**Description:** Combines 2 curves into 1 - uses the date and expiry calendar from the base

**Parameters:**
* `base` (Curve) - The base curve
* `other` (Curve) - The curve to combine the base with
* `replace` (Boolean) - If true, matching tenors from the base are overwritten; if false, only new tenors in other are added to the base

**Returns:** Curve

**Works with:** `curve` 

---

### extendCurve(input, years)

**Category:** Curve Interpolation

**Description:** Extends a curve by taking the last period and extending out the required number of years

**Parameters:**
* `input` (Curve) - The input curve to extend
* `years` (Number) - The number of years to extend

**Returns:** Curve



---

### forwardFillCurve(input)

**Category:** Curve Interpolation

**Description:** Fills any gaps by forward filling and missing periods

**Parameters:**
* `input` (Curve) - The input curve to fill

**Returns:** Curve



---

### normaliseCurve(input)

**Category:** Curve

**Description:** Normalises a curve such that all the inputs average to 1

**Parameters:**
* `input` (Curve) - The input curve to normalise

**Returns:** Curve

**Works with:** `curve` 

---

### priority(curves)

**Category:** Curve

**Description:** Adds tenors from a list of curves in order of priority

**Parameters:**
* `curves` (List of Curves) - A list of curves in order of priority

**Returns:** Curve

**Works with:** `curve` 

---

### shape(input)

**Category:** Curve

**Description:** Simple shaping algorithm used to shape a monthly curve

**Parameters:**
* `input` (Curve) - The input curve to shape

**Returns:** Curve

**Works with:** `curve` 

---


