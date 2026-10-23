---
title: Script Manager reference
description: Permissions, where scripts and their runs are kept, the REST functions to run and check a script, and what the Script Manager extension contains
slug: /extensions/script-manager/reference
sidebar_position: 7
tags: [extension, script manager, scripts, reference, rest api]
---

# Script Manager reference

---

## Permissions

| Action | Security policy action on the script service |
|-|-|
| See and open scripts | **read** |
| Create a script | **create** |
| Change and save a script, edit its details, restore a version | **update** on that script |
| Run a script, a function or a region | **run** on that script |
| Use the Script Manager screen | The feature `odsl.script_manager.manage`, in the feature policy `extension.odsl.script_manager` |
| Create, change, run and delete schedules | **create**, **update**, **run** and **delete** on the process service |

The Script Manager asks the platform which actions you have on the script you open, and shows **Can edit** or **Read only**. Public scripts are read only.

---

## Where things are kept

| What | Where |
|-|-|
| Scripts | The `script` service, `private` source for your company's scripts and `public` for the published ones. The text is stored in the `script` field. |
| Versions | Every save makes a version: `script/v1/{source}/{id}/*` lists them and `script/v1/{source}/{id}/{version}` reads one |
| Audit trail | The `audit` service, records with `service` `script` and `key` the script's id. The reason of a save is the record's `description`. |
| Runs | The `scriptlog` service, one record per run with `script`, `status`, `message`, `trigger`, `scriptVersion` (0 for unsaved text) and `log`. Results are not kept. |
| Schedules | Processes in the `process` service whose `script` is the script's id, with the service `Scripts`. Their runs are `process-exec` records. |
| Fusion AI conversations | The Fusion AI chat history, category `scripts` |

The reason of a save is sent as the `_reason` query parameter, which you can also use when you save a script through the API.

---

## Running a script through the API

**Run the saved script**

```
GET https://api.opendatadsl.com/api/script/v1/private/{id}?_function=run
```

This runs the stored script as an automation would, and triggers the script's automations (`success`, `warning` and `failed`). The run is logged as `Direct(email)`.

**Run text as a script**

```
POST https://api.opendatadsl.com/api/script/v1/private?_function=run
```

| Body field | Type | Required | What it does |
|-|-|-|-|
| `_id` | Text | Yes | The id of a saved script: the text runs as that script |
| `_type` | Text | Yes | `VarScript` |
| `script` | Text | Yes | The text to run, base64 encoded (UTF-8) |
| `scriptType` | Text | No | `odsl` (the default) or `js` |
| `input` | Object | No | The script's `input` variable |
| `function` | Text | No | Run only this function call, such as `sparkSpread(power, gas, carbon, 0.5, 0.202)` |
| `region` | Number | No | Run only the top level `//#region` that contains this line |

Add `_automations=true` to trigger the script's automations; by default a run of posted text does not. The run is logged as `Editor(email)`. ODSL with syntax errors is not run.

The response:

| Field | What it holds |
|-|-|
| `status` | `success`, `warning` or `failed` |
| `message` | The platform's message, such as the error |
| `result` | What the script returned, as JSON |
| `resultType` | The type of the result, such as `Curve` or `Scalar` |
| `log` | The lines the script logged, each `time level message` |
| `errors` | The syntax errors, when the script was not run: `line`, `column` and `message` |
| `scriptVersion` | The saved version that ran, or 0 for text that is not a saved version |
| `draft` | `true` when the text was not the saved version |
| `function`, `region` | What ran, when it was a function or a region |
| `duration` | How long it took, in milliseconds |

Both need the **run** action on the script.

**Check text for syntax errors**

```
POST https://api.opendatadsl.com/api/script/v1/private?_function=check
```

With `_id`, `_type` and `script` as above, the response is `{"errors": [{"line": 25, "column": 1, "message": "missing ')' at 'print'"}]}`. Nothing is run or saved.

---

## What the extension contains

| Part | Id | What it is |
|-|-|-|
| Extension | `odsl.script_manager` | The Script Manager |
| View | **Scripts**, in **Information** | The screen described in this guide |
| Feature policy | `extension.odsl.script_manager` | Gives the feature `odsl.script_manager.manage` |
| Scripts | `odsl-extensions\extensions\script_manager\odsl.script_manager.manage`, `.common`, `.fusion` and `.schedules` | The screen and its parts |

The editor is loaded from a public content network the first time the screen opens, so the screen needs internet access to `unpkg.com`.

---

## Troubleshooting

| What you see | Why, and what to do |
|-|-|
| **Read only** next to the script's name | Your policies do not give you **update** on this script, or it is a public script |
| **Run** is greyed out | The script is not ODSL or JavaScript, or your policies give you neither **run** nor **update** on it |
| The run says the platform needs an update | The platform you are on cannot run scripts from the editor yet |
| The run fails with *Not Allowed* | Your policies do not give you **run** on this script |
| The description or category goes back after a save | The platform reads them from the script's header: use **Edit details**, which updates the header |
| No syntax errors are underlined | Syntax checking is for ODSL scripts, on platforms that support it |
| A schedule does not run your latest change | Schedules run the saved script: save it |
