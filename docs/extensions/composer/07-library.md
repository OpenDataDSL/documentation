---
title: Library templates
description: The OpenDataDSL composition templates in the Composer library
slug: /extensions/composer/library
sidebar_position: 7
tags: [extension, composer, templates, library]
---

# Library templates

The Composer **Library** has 50 OpenDataDSL templates, in twelve categories: Curves, Power, Gas, Oil, Carbon, Coal, Pricing, Risk, FX, Metals, Agriculture and Timeseries. Open one in the Library tab to preview it with its default inputs, use it, or copy it to change it. Featured templates are marked (featured).

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
| **Baseload from peak and off-peak**<br/>`#CT_BASELOAD_FROM_PEAK_OFFPEAK` | A baseload price by tenor made from peak and off-peak curves, weighted by the share of hours in the peak block. | curve | Peak curve, Off-peak curve, Share of hours in peak |
| **Gas against coal generation margins**<br/>`#CT_GAS_VS_COAL_MARGINS` | The clean spark and clean dark spreads side by side by tenor, and the difference between them: which fuel earns more for each MWh generated. | curve | Power curve, Gas curve, Coal curve, Carbon curve, Currency, Gas plant efficiency, Coal plant efficiency, Coal energy content |
| **Off-peak from baseload and peak**<br/>`#CT_OFFPEAK_FROM_BASE_PEAK` | The implied off-peak price by tenor from baseload and peak curves, for markets that only trade base and peak. | curve | Baseload curve, Peak curve, Share of hours in peak |
| **Spark spread**<br/>`#CT_SPARK_SPREAD` | The margin of a gas-fired plant by tenor before carbon: power less the cost of the gas burned for each MWh generated. | curve | Power curve, Gas curve, Plant efficiency |
| **Tolling margin**<br/>`#CT_TOLLING_MARGIN` | The margin of a gas-fired tolling agreement by tenor from its heat rate: power less fuel, carbon and variable operating costs. | curve | Power curve, Gas curve, Carbon curve, Heat rate, Emission factor, Variable operating cost |

---

## Gas

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Gas hub basis** (featured)<br/>`#CT_GAS_HUB_BASIS` | A gas hub against a benchmark hub by tenor, converted to the benchmark's currency and units, with the basis before and after transport. | curve | Hub curve, Benchmark curve, Benchmark currency, Benchmark units, Transport cost |
| **Oil-indexed gas price**<br/>`#CT_OIL_INDEXED_GAS` | An oil-indexed gas price (slope on Brent plus a constant) against a gas hub converted to the same currency and units, by tenor. | curve | Brent curve, Gas hub curve, Slope, Constant, Currency, Units |
| **Oil to gas price ratio**<br/>`#CT_OIL_TO_GAS_RATIO` | Crude oil against natural gas by tenor: the oil to gas price ratio and crude expressed per MMBtu, to see how far gas trades below oil parity. | curve | Crude curve, Gas curve, Currency, Gas units, Crude energy content |
| **Seasonal storage spread history**<br/>`#CT_SEASONAL_STORAGE_SPREAD` | Two seasons of a gas curve day by day and the spread between them, less the cost of storage: the value of filling storage in one season and selling in the next. | timeseries | Gas curve, Injection season, Withdrawal season, Storage cost, Calendar, Range |
| **US LNG export margin**<br/>`#CT_LNG_EXPORT_MARGIN` | The margin of a US LNG cargo by tenor: the destination hub price, less shipping and regasification, against the cost of Henry Hub gas and liquefaction. | curve | Destination hub curve, Henry Hub curve, Currency, Units, Feedgas multiplier, Liquefaction fee, Shipping cost, Regasification cost |

---

## Oil

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **3:2:1 crack spread** (featured)<br/>`#CT_CRACK_SPREAD_321` | The refining margin of turning three barrels of crude into two of gasoline and one of distillate, by tenor, with the products converted to barrels. | curve | Crude curve, Gasoline curve, Distillate curve, Crude units, Gasoline density, Distillate density |
| **Product crack spread**<br/>`#CT_PRODUCT_CRACK` | One refined product against crude by tenor, with the product converted to barrels using its density. | curve | Crude curve, Product curve, Product name, Crude units, Product density |
| **5:3:2 crack spread**<br/>`#CT_CRACK_SPREAD_532` | The refining margin by tenor for five barrels of crude making three of gasoline and two of distillate, per barrel of crude. | curve | Crude curve, Gasoline curve, Distillate curve, Units, Gasoline density, Distillate density |
| **Hi-5 fuel oil spread**<br/>`#CT_FUEL_OIL_HI5` | Very low sulphur fuel oil against high sulphur fuel oil by tenor: the premium shipowners pay for compliant fuel. | curve | Very low sulphur fuel oil curve, High sulphur fuel oil curve |

---

## Carbon

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Carbon cost by fuel**<br/>`#CT_CARBON_COST_BY_FUEL` | The carbon cost of generating one MWh of power from gas, hard coal and lignite, by tenor. | curve | Carbon curve, Gas plant efficiency, Coal plant efficiency, Lignite plant efficiency, Gas emission factor, Coal emission factor, Lignite emission factor |
| **UK and EU carbon spread**<br/>`#CT_UKA_EUA_SPREAD` | UK allowances against EU allowances by tenor, with the UKA converted to the EUA currency, and the discount or premium between them. | curve | UKA curve, EUA curve, Currency |

---

## Coal

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Coal arbitrage API2 against API4**<br/>`#CT_COAL_API2_API4_ARBITRAGE` | European delivered coal against South African export coal by tenor, less the freight between them: whether shipping Richards Bay coal to Europe pays. | curve | API2 curve, API4 curve, Freight |
| **Coal price per MWh**<br/>`#CT_COAL_PER_MWH` | A coal curve per tonne and per MWh of thermal energy, in the currency you choose, so it can be compared with gas and power. | curve | Coal curve, Currency, Energy content |

---

## Pricing

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Indexed contract price**<br/>`#CT_INDEXED_CONTRACT_PRICE` | A contract price by tenor set by a formula on a market curve: a multiplier on the index plus a fixed adder. | curve | Index curve, Multiplier, Adder, Name for the price |
| **Contract for difference payment**<br/>`#CT_CFD_PAYMENT` | The payment under a contract for difference by tenor: the strike price less the market reference price, per MWh and for the contracted volume. | curve | Reference price curve, Strike price, Volume |
| **Retail price build-up**<br/>`#CT_RETAIL_PRICE_BUILDUP` | An end-user energy price by tenor built up from the wholesale curve: network charges, levies and supplier margin, before and after VAT. | curve | Wholesale curve, Network charges, Taxes and levies, Supplier margin, VAT rate |

---

## Risk

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Hedge mark to market**<br/>`#CT_HEDGE_MARK_TO_MARKET` | The value of a fixed price hedge by tenor against today's curve: the difference to the hedge price times the volume. | curve | Market curve, Hedge price, Volume per tenor |
| **PPA value against the forward curve**<br/>`#CT_PPA_VALUE` | A fixed-price power purchase agreement against the market by tenor: the price the generator captures and the value of the PPA per MWh to the buyer. | curve | Baseload power curve, PPA price, Capture rate |
| **Two-leg position value**<br/>`#CT_TWO_LEG_POSITION` | The value by tenor of a position in two curves, such as long power and short gas, with a signed volume for each leg. | curve | First curve, First volume, Second curve, Second volume |

---

## FX

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **ECB Major FX Rebased to 100**<br/>`#CT_ECB_MAJOR_FX_REBASED` | ECB daily euro reference rates for the major currencies each rebased to 100 at the start of the window so you can compare how each currency moved against the euro. | timeseries | None: it reads the ECB euro reference rates |
| **FX cross rate**<br/>`#CT_FX_CROSS_RATE` | A cross rate made from two rates against the same base currency, for example GBP/USD from EUR/USD and EUR/GBP, day by day. | timeseries | First rate, Second rate, Cross rate name, Calendar, Range |

---

## Metals

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Gold to silver ratio**<br/>`#CT_GOLD_SILVER_RATIO` | Gold and silver prices day by day and how many ounces of silver buy one ounce of gold. | timeseries | Gold timeseries, Silver timeseries, Calendar, Range |

---

## Agriculture

| Template | What it shows | Worksheet | Inputs |
|-|-|-|-|
| **Soybean crush spread**<br/>`#CT_SOYBEAN_CRUSH` | The board crush margin by tenor: the value of the soybean meal and oil from a bushel of soybeans less the cost of the beans, in dollars per bushel. | curve | Soybean curve, Soybean meal curve, Soybean oil curve, Soybean price divisor |

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
| **Calendar spread history**<br/>`#CT_CALENDAR_SPREAD_HISTORY` | Two tenors of the same curve day by day, for example two quarters or two years, and the spread between them. | timeseries | Forward curve, Near tenor, Far tenor, Calendar, Range |
| **Clean dark spread history**<br/>`#CT_CLEAN_DARK_HISTORY` | The clean dark spread day by day from power, coal and carbon prices: the margin of a coal-fired plant over time. | timeseries | Power timeseries, Coal timeseries, Carbon timeseries, Currency, Coal energy content, Plant efficiency, Emission factor, Calendar, Range |
| **Implied heat rate history**<br/>`#CT_IMPLIED_HEAT_RATE_HISTORY` | Day by day, the heat rate and efficiency implied by a power price and a gas price: where a gas plant breaks even before carbon. | timeseries | Power timeseries, Gas timeseries, Calendar, Range |
| **Rebased performance**<br/>`#CT_REBASED_PERFORMANCE` | Three timeseries each rebased to 100 at the start of the range, so prices in different units and currencies can be compared by how far they moved. | timeseries | First timeseries, Second timeseries, Third timeseries, Calendar, Range |
| **Term structure history**<br/>`#CT_TERM_STRUCTURE_HISTORY` | The front month, sixth month and twelfth month of a curve day by day, with the front to twelfth month spread: whether the market is in contango or backwardation. | timeseries | Forward curve, Calendar, Range |

---

## Publishing the library

The library templates are public report configurations with ids starting `#CT_`. OpenDataDSL publishes and updates them, increasing each template's revision so that copies in My templates show an **update** badge.

Platform administrators publish them from Composer itself:

- **Upload to library**, on the **My templates** tab, takes one or more template `.json` files.
- **Publish to library**, in the **More** menu of a saved template, publishes that template as `#` followed by its id.

Before anything is published, Composer compares each template with the library and lists it as **new**, **changed** (with the revision it will get) or **unchanged**. Only new and changed templates are published.
