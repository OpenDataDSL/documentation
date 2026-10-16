---
title: Reference
description: The reconciliation model, mapping and result formats, and the services behind the Data Reconciliation extension
slug: /extensions/data-reconciliation/reference
sidebar_position: 7
tags: [extension, data reconciliation, reference, api]
---

# Reference

---

## Where the data is kept

| What | Service and source | Id |
|-|-|-|
| Reconciliation models | `object`, `private`, type `DATA_RECONCILIATION_SPEC` | The model id, such as `TRADE.RECON` |
| Mappings | `object`, `data_reconciliation_matches` | A generated id |
| Results | `report`, `private` | `<model id>:REPORT:<date>`, such as `TRADE.RECON:REPORT:2026-10-14` |
| Trades | `event`, `private` | One event list per source |

The latest saved result of a model is `<model id>:REPORT:L`.

---

## Reconciliation model

```json
{
  "_id": "TRADE.RECON",
  "_type": "DATA_RECONCILIATION_SPEC",
  "name": "Gas Trade Reconciliation",
  "master": "ETRM",
  "master_event": "ETRM_TRADES",
  "dashboard": "Trading",
  "scripts": [{"script": "MY_RECON_FUNCTIONS"}],
  "matchers": [
    {
      "name": "ICE Endex",
      "event": "ICE_ENDEX_TRADES",
      "preRules": [
        {"name": "Exchange trades", "function": "filter_master_data", "value": "venue=ICE Endex"}
      ],
      "rules": [
        {"name": "Product", "function": "string_map", "master": ["product"], "matcher": ["instrument"]},
        {"name": "Buy/Sell", "function": "string_map", "master": ["buy_sell"], "matcher": ["side"]},
        {"name": "Contract", "function": "exact_match", "master": ["absolute"], "matcher": ["absolute"]},
        {"name": "Price", "function": "abs_number", "master": ["price"], "matcher": ["price"]},
        {"name": "Lots", "function": "abs_number", "master": ["lots"], "matcher": ["lots"]}
      ],
      "postRules": []
    }
  ],
  "REPORT": {
    "_id": "REPORT",
    "_type": "VarReportConfiguration",
    "reportType": "Fixed",
    "template": "odsl-extensions\\extensions\\data_reconciliation\\odsl.data_reconciliation.results_chart"
  }
}
```

| Field | Meaning |
|-|-|
| `master` | The name shown for the master trades |
| `master_event` | The master event list |
| `dashboard` | The dashboard the model is shown on |
| `scripts` | Private JavaScript scripts with your own rule functions |
| `matchers` | One entry per source: its `event` list, `preRules`, `rules` and `postRules` |
| Rule `function` | The rule function: see [Rule functions](/docs/extensions/data-reconciliation/how-it-works#rule-functions) |
| Rule `master`, `matcher` | The fields compared, in order |
| Pre-rule and post-rule `value` | The setting for the function, such as `venue=ICE Endex` |
| `REPORT` | The report configuration for the saved results, added when the model is saved |

---

## Mapping

```json
{
  "_id": "8c0f6f1e-2b3c-4a51-9b0e-2f4a6d1c9e77",
  "model": "TRADE.RECON",
  "matcher_name": "ICE Endex",
  "rule": "Product",
  "master": ["TTF Gas Futures"],
  "matcher": ["TFM"]
}
```

A `string_map` rule matches when there is a mapping for its model, matcher and rule whose `master` values equal the ETRM trade's values and whose `matcher` values equal the source record's values.

---

## Result

```json
{
  "matched": 52,
  "partial": 2,
  "unmatched": 4,
  "unmatched_matchers": 3,
  "matchers": [
    {
      "matcher": "ICE Endex",
      "matched": 22,
      "partial": 1,
      "unmatched": 1,
      "unmatched_matchers": 1,
      "matched_items": [
        {"master": "ETRM_TRADES:T260100", "matcher": ["ICE_ENDEX_TRADES:ICE8812000"]}
      ],
      "partial_items": [
        {
          "master": "ETRM_TRADES:T260198",
          "status": 1,
          "rules": [
            {"name": "Buy/Sell", "matches": [], "master_data": ["B"], "matcher_data": ["Sell"]}
          ]
        }
      ],
      "unmatched_master_ids": ["ETRM_TRADES:T260163"],
      "unmatched_matcher_ids": ["ICE_ENDEX_TRADES:ICE8819999"]
    }
  ]
}
```

| Field | Meaning |
|-|-|
| `matched`, `partial`, `unmatched`, `unmatched_matchers` | Counts over all sources |
| `matchers[].matched_items` | Each matched ETRM trade and the source record(s) it matched |
| `matchers[].partial_items` | Each partly matched ETRM trade, with the candidates and values of every rule |
| `matchers[].unmatched_master_ids` | ETRM trades with no match at this source |
| `matchers[].unmatched_matcher_ids` | Source records with no ETRM trade |

---

## Extension contents

| Item | Name |
|-|-|
| Type | `DATA_RECONCILIATION_SPEC` |
| Views | Dashboard, Manage, Mappings |
| Insight | Data Analysis (`odsl.data_reconciliation.data_analysis`) |
| Feature | `odsl.data_reconciliation.manage`, needed to use the views |
| Automation target | Run a data reconciliation task |
| Task runner script | `odsl-extensions\extensions\data_reconciliation\odsl.data_reconciliation.task_runner_node` |
