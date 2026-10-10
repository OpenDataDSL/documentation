---
title: Library templates
description: The OpenDataDSL composition templates in the Composer library
slug: /extensions/composer/library
sidebar_position: 7
tags: [extension, composer, templates, library]
---

# Library templates

The Composer **Library** has these OpenDataDSL templates. Open one in the Library tab to preview it with its default inputs, use it, or copy it to change it. Featured templates are marked (featured).

Inputs such as plant efficiencies, emission factors and densities come with typical defaults that you can change when you use the template.


---

## Curves

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Curve spread** (featured)<br/>`#CT_CURVE_SPREAD` | Two forward curves side by side with the spread between them, tenor by tenor. | curve | First curve, Second curve, Name for the first curve, Name for the second curve |
| **Curve in another currency**<br/>`#CT_CURVE_IN_CURRENCY` | A curve as published and converted to another currency (and optionally units), using the tenant FX provider. | curve | Curve, Convert to currency, Convert to units |
| **Weighted basket**<br/>`#CT_WEIGHTED_BASKET` | A weighted average of up to three curves by tenor, for example a blended fuel or a portfolio price. | curve | First curve, Second curve, Third curve, First weight, Second weight, Third weight |

---

## Power

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Clean dark spread** (featured)<br/>`#CT_CLEAN_DARK_SPREAD` | The margin of a coal-fired plant by tenor: power less the cost of coal and carbon for each MWh generated. | curve | Power curve, Coal curve, Carbon curve, Currency, Coal energy content, Plant efficiency, Emission factor |
| **Clean spark spread** (featured)<br/>`#CT_CLEAN_SPARK_SPREAD` | The margin of a gas-fired plant by tenor: power less the cost of gas and carbon for each MWh generated. | curve | Power curve, Gas curve, Carbon curve, Plant efficiency, Emission factor |
| **Coal to gas switching price**<br/>`#CT_FUEL_SWITCHING_PRICE` | The gas price at which a gas plant costs the same to run as a coal plant, by tenor, and how far the gas curve is below it. | curve | Gas curve, Coal curve, Carbon curve, Currency, Coal energy content, Gas plant efficiency, Coal plant efficiency, Gas emission factor, Coal emission factor |
| **Cross-border power spread**<br/>`#CT_CROSS_BORDER_POWER_SPREAD` | Two power markets side by side by tenor, with the spread before and after the cost of moving power between them. | curve | First market, Second market, Name for the first market, Name for the second market, Transmission cost |
| **Market implied heat rate**<br/>`#CT_IMPLIED_HEAT_RATE` | The heat rate and efficiency implied by power and gas prices by tenor: the efficiency at which a gas plant just breaks even before carbon. | curve | Power curve, Gas curve |
| **Peak and baseload spread**<br/>`#CT_PEAK_BASE_SPREAD` | Peak against baseload power by tenor: the peak premium and the peak to base ratio. | curve | Baseload curve, Peak curve |

---

## Gas

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Gas hub basis** (featured)<br/>`#CT_GAS_HUB_BASIS` | A gas hub against a benchmark hub by tenor, converted to the benchmark's currency and units, with the basis before and after transport. | curve | Hub curve, Benchmark curve, Benchmark currency, Benchmark units, Transport cost |
| **Oil-indexed gas price**<br/>`#CT_OIL_INDEXED_GAS` | An oil-indexed gas price (slope on Brent plus a constant) against a gas hub converted to the same currency and units, by tenor. | curve | Brent curve, Gas hub curve, Slope, Constant, Currency, Units |

---

## Oil

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **3:2:1 crack spread** (featured)<br/>`#CT_CRACK_SPREAD_321` | The refining margin of turning three barrels of crude into two of gasoline and one of distillate, by tenor, with the products converted to barrels. | curve | Crude curve, Gasoline curve, Distillate curve, Crude units, Gasoline density, Distillate density |
| **Product crack spread**<br/>`#CT_PRODUCT_CRACK` | One refined product against crude by tenor, with the product converted to barrels using its density. | curve | Crude curve, Product curve, Product name, Crude units, Product density |

---

## Carbon

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Carbon cost by fuel**<br/>`#CT_CARBON_COST_BY_FUEL` | The carbon cost of generating one MWh of power from gas, hard coal and lignite, by tenor. | curve | Carbon curve, Gas plant efficiency, Coal plant efficiency, Lignite plant efficiency, Gas emission factor, Coal emission factor, Lignite emission factor |

---

## Pricing

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Indexed contract price**<br/>`#CT_INDEXED_CONTRACT_PRICE` | A contract price by tenor set by a formula on a market curve: a multiplier on the index plus a fixed adder. | curve | Index curve, Multiplier, Adder, Name for the price |

---

## Risk

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Hedge mark to market**<br/>`#CT_HEDGE_MARK_TO_MARKET` | The value of a fixed price hedge by tenor against today's curve: the difference to the hedge price times the volume. | curve | Market curve, Hedge price, Volume per tenor |

---

## Timeseries

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Price statistics on a calendar** (featured)<br/>`#CT_PRICE_STATISTICS` | The average, high and low of a timeseries for each period of a calendar, for example daily statistics of hourly prices, with the range between them. | timeseries | Timeseries, Calendar, Range |
| **Clean spark spread history**<br/>`#CT_CLEAN_SPARK_HISTORY` | The daily clean spark spread from spot power, gas and carbon prices: what a gas plant earned each day. | timeseries | Power timeseries, Gas timeseries, Carbon timeseries, Plant efficiency, Emission factor, Calendar, Range |
| **Price with markup**<br/>`#CT_PRICE_WITH_MARKUP` | A timeseries on a calendar alongside the same price with a markup applied, for example a customer price over day-ahead. | timeseries | Price timeseries, Markup factor, Calendar, Aggregation to the calendar |
| **Rolling front month crack**<br/>`#CT_ROLLING_CRACK_SPREAD` | The history of a product crack on the front month: product less crude each day, with the product converted to barrels. | timeseries | Crude curve, Product curve, Tenor, Crude units, Product density, Calendar, Range |
| **Rolling front months**<br/>`#CT_ROLLING_FRONT_MONTHS` | The history of the first three months of a forward curve as rolling timeseries, with the prompt spread between month one and two. | timeseries | Curve, Calendar, Range |
| **Spot against front month**<br/>`#CT_SPOT_VS_FRONT_MONTH` | A spot or day-ahead price against the front month of the forward curve, day by day, with the spot premium. | timeseries | Spot timeseries, Forward curve, Calendar, Range |
| **Timeseries in another currency**<br/>`#CT_TIMESERIES_IN_CURRENCY` | A timeseries as published and converted to another currency, and optionally other units, at each date's exchange rate. | timeseries | Timeseries, Convert to currency, Convert to units, Calendar, Range |
| **Timeseries spread**<br/>`#CT_TIMESERIES_SPREAD` | Two timeseries aligned on a calendar with the spread and ratio between them. | timeseries | First timeseries, Second timeseries, Name for the first, Name for the second, Calendar, Aggregation to the calendar, Range |

---

## Publishing the library

The library templates are public report configurations with ids starting `#CT_`. OpenDataDSL publishes and updates them, increasing each template's revision so that copies in My templates show an **update** badge.
