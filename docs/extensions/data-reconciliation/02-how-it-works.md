---
title: How it works
description: Trades as events, reconciliation models, matchers, rules and rule functions, and what matched, partial and unmatched mean
slug: /extensions/data-reconciliation/how-it-works
sidebar_position: 2
tags: [extension, data reconciliation, trade reconciliation, rules]
---

# How it works

---

## Trades are events

Each source is loaded into its own private **event list**, one event per trade, with the trade time as the event time. The Trade Capture extension has loaders for common sources, including Aligne, ABN, EEX, ETPA, Eurex and ICE.

The sources do not need to use the same field names or values. Each rule says which ETRM fields to compare with which fields of the external record. The examples in this guide use these event lists:

| Event list | Source | Fields used |
|-|-|-|
| `ETRM_TRADES` | ETRM (master) | `product`, `buy_sell`, `absolute` (contract), `price`, `lots`, `venue`, `broker`, `clearer` |
| `ICE_ENDEX_TRADES` | ICE Endex trade file | `instrument`, `side`, `absolute`, `price`, `lots` |
| `MAREX_CONFIRMS` | Marex broker confirmations | `commodity`, `direction`, `absolute`, `price`, `volume` |
| `ABN_CLEARING` | ABN AMRO Clearing statement | `exchange_code`, `bs`, `absolute`, `price`, `quantity` |

A reconciliation runs for one day: it reads the events of that day from the master and from every matcher.

---

## Models, matchers and rules

A **reconciliation model** names the master event list and the matchers to compare it with. Each matcher has:

| Part | What it does | Example |
|-|-|-|
| **Event** | The event list holding the source's records | `ICE_ENDEX_TRADES` |
| **Pre-rules** | Prepare the data before matching, usually by choosing which ETRM trades belong to this source | Only compare ETRM trades with `venue=ICE Endex` |
| **Rules** | Each compares one or more ETRM fields with fields of the external record, using a rule function | `price` and `price` must be equal |
| **Post-rules** | Run after matching, for trades that do not compare one to one | An ETRM quarter against three monthly exchange legs |

Models are kept as private master data objects of type `DATA_RECONCILIATION_SPEC`.

---

## Rule functions

| Function | Type | Required | Matches when |
|-|-|-|-|
| `exact_match` | Rule | Yes | The values are equal, field by field in the order selected |
| `abs_number` | Rule | Yes | The absolute values are equal, so a sell booked as -10 lots matches 10 lots |
| `string_map` | Rule | No | A saved [mapping](/docs/extensions/data-reconciliation/reconciling#review-the-mappings) says the two values mean the same thing, such as `TTF Gas Futures` in the ETRM and `TFM` on ICE Endex, or `B` and `Buy` |
| `filter_master_data` | Pre-rule | | Keeps only the ETRM trades matching the value, such as `venue=ICE Endex`, or `book=GAS_FUT,GAS_OTC` for either of two books |
| `filter_matcher_data` | Pre-rule | | The same filter on the external records |
| `strip` | Post-rule | | An ETRM quarter or year contract matches the monthly legs reported by the exchange, using the `absolute` field |
| `stripDates` | Post-rule | | An ETRM trade's delivery period (`eventstart` to `eventend`) covers the external trades' delivery periods. With a value such as `lots=quantity`, the external quantities must also add up to the ETRM quantity |

Use `exact_match` and `abs_number` for the terms of the trade that must agree: contract, price and quantity. Use `string_map` where the sources name the same thing differently: product names and buy/sell codes.

### Your own rule functions

You can add rule functions of your own in a private JavaScript script, and list the script under **Custom Scripts** on the model. The script registers each function:

```js
registerReconciliationFunction({
	name: "price_within_tolerance",
	category: "rule",          // "rule", "pre" or "post"
	required: true,
	function: function(rule, meta, master, matcher) {
		// master and matcher hold the values of the fields selected on the rule
		return Math.abs(master[0] - matcher[0]) <= 0.005;
	}
});
```

The function then appears in the list of functions when you edit a rule.

---

## Results

For each source, every ETRM trade gets one of these results:

| Result | Meaning |
|-|-|
| **Matched** | Every rule found the same single external record. The trade is confirmed. |
| **Partial** | The required rules (`exact_match`, `abs_number`) found candidates, but the rules do not all agree on one external record, or a `string_map` rule found no mapping. The trade needs a look. |
| **Unmatched** | At least one required rule found nothing: the trade is missing from the source, or its contract, price or quantity disagree with every record. |

And the source's own records can be:

| Result | Meaning |
|-|-|
| **Unmatched Matchers** | External records that are not a match or a candidate for any ETRM trade: trades the exchange, broker or bank has that your ETRM does not. |

The result of a day is saved as the model's report for that date, which is what the [dashboard](/docs/extensions/data-reconciliation/dashboard) shows.
