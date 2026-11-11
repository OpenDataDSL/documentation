---
title: What other extensions add
description: The tabs and actions other extensions add to the Data Explorer, and how to add your own
slug: /extensions/data-explorer/extensions
sidebar_position: 7
tags: [extension, data explorer, extensions, contributions, master data management, smart data, event data, validation]
---

# What other extensions add

The Data Explorer is the place for anything about a record or a data item, so other extensions add their own tabs and actions to it. A tab is named with its extension beside it; actions are in the **More** menus. They only appear when that extension is installed and you may use it.

---

## Tabs and actions

| Extension | On master data | On data | With a selection |
|-|-|-|-|
| Master Data Management | **Edit** tab: change the record's properties | | **Bulk update in Master Data Management**: change properties or the type of the selected records together |
| Data Management | | **Edit** tab on curves and timeseries: change the definition and values | **Bulk update in Data Management** |
| Smart Data | **Smart Data** tab, and **New smart curve** / **New smart timeseries** actions that open it ready to make one on this record | **Smart Data** tab on smart curves and timeseries: open it in the smart data workspace | |
| Event Data | **Event Data** tab: the record's event lists | **Events** tab on event lists, with **New event curve**, **New event timeseries** and **New event options** actions; **Event list** tab on event curves, timeseries and options, opening the list with the definition | |
| Validation | | **Validation** tab on curves and timeseries | **Add validation**: bulk changes with the selected curves or timeseries |
| Group Manager | **Groups** tab: the groups it is in | **Groups** tab | |
| Composer | **Composer** tab: the compositions on the record | | |

Selection actions take at most a set number of items (200 for these). Items an action does not work with are left out, with a note; select fewer, or make a group of them, if there are too many.

An action opens in a panel beside the screen; **Close** (or **Esc**) closes it, and the item's own tabs are read again in case the action changed it.

---

## Adding your own

An extension adds tabs and actions in its `create-extension.odsl`, in `e.configuration.data_explorer.contributions`. Nothing changes for it until the Data Explorer is installed, and it does not depend on it. The Smart Data extension's entries are a good example:

```js
dxRecord = dxTab("record", "Smart Data", "magic", "record", ["object"], "Master Data", "", 30)
dxNewCurve = dxAction("new_curve", "New smart curve", "magic", "record", ["object"], "Master Data", '{"ACTION": "new", "KIND": "curve"}', "A curve calculated from this record's data")
dxNewCurve.set("tab", "record")
dxOpen = dxTab("open", "Smart Data", "magic", "data", ["smartcurve", "smarttimeseries"], "Manage", '{"ITEM": "@id", "EMBEDDED": "true"}', 15)
e.configuration.data_explorer.contributions = [dxRecord, dxNewCurve, dxOpen]
```

`dxTab` and `dxAction` are two small functions at the end of the same file that build each entry as a `SimpleObject`; copy them from any of the extensions above.

| Field | What it is |
|-|-|
| `name` | The entry's name, unique in the extension |
| `label`, `icon`, `description` | What the tab or menu shows (a Bootstrap icon name) |
| `place` | `record` (master data), `data` (a data item) or `selection` (the ticked results) |
| `kind` | `tab`, or `action` (the item's More menu; the results' More menu for `selection`) |
| `types` | What it is for: `object`, `curve`, `timeseries`, `options`, `eventlist`, or a precise type such as `smartcurve`, `eventcurve`, `eventoptions`, `curvedates`, also `smart` and `event`. Empty: everything of the place |
| `sources` | `private`, `public` or both (the default) |
| `view` | The id of the view to open (`e.addView("...")`) |
| `properties` | Text holding JSON, passed to the view. `@id`, `@source`, `@type`, `@kind`, `@ids` and `@field.NAME` (a field of the data item, such as `@field.event`) are filled in |
| `open` | `panel` (the default for actions) or `navigate`, with `navigate` = the menu name of the view, to open it in the portal |
| `tab` | For an action: the `name` of a tab of the same extension to open with the action's properties added |
| `max` | The most items a selection action takes (default 100) |
| `order` | Where a tab goes among the others (lower first) |

The view always gets `ID` (the item, or the first item of a selection), `SOURCE`, `DX_TYPE`, `DX_KIND`, `DX_MODE` (`data` or `record`) and `EXPLORER` (`odsl.data_explorer`), and for a selection `IDS`, the ids separated by commas. The view reads them with the usual `viewProps()` in its script.

:::tip
A view your extension already adds to the portal's Master Data screen (`v.name = "Master Data"` with a `v.tabname`) or Data screen (`v.name = "Data"`) shows as a tab in the Data Explorer without any entry. Add an entry only to choose which items it is for, its order, or to add actions.
:::

See [Building extensions](/docs/extensions/building/manifest) for the rest of `create-extension.odsl`.

---

## Next

[Reference](/docs/extensions/data-explorer/reference)
