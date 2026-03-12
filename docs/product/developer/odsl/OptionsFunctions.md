---
slug: /odsl/function/functions-options
title: Options Functions
sidebar_position: 16
---

This document provides a reference for all built-in options functions available in OpenDataDSL.

### blackScholesCall(F, K, sigma, T)

**Category:** Options

**Description:** Calculate the (undiscounted) Black option price for a call option

**Parameters:**
* `F` (Double) - The underlying futures price
* `K` (Double) - The strike price
* `sigma` (Double) - The annualized standard deviation, or volatility
* `T` (Double) - The time-to-expiration in years

**Returns:** Double



---

### blackScholesPut(F, K, sigma, T)

**Category:** Options

**Description:** Calculate the (undiscounted) Black option price for a put option

**Parameters:**
* `F` (Double) - The underlying futures price
* `K` (Double) - The strike price
* `sigma` (Double) - The annualized standard deviation, or volatility
* `T` (Double) - The time-to-expiration in years

**Returns:** Double



---


