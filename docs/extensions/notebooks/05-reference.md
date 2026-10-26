---
title: Notebooks reference
description: How a notebook is saved as a script, what is kept in your browser, the notebook kernel service, the extension's contents and troubleshooting
slug: /extensions/notebooks/reference
sidebar_position: 5
tags: [extension, notebooks, reference, kernel]
---

# Notebooks reference

---

## How a notebook is saved

A notebook is an ODSL script in the script service:

| Notebook | Script |
|-|-|
| My notebooks | Private scripts with the category `notebook` |
| Examples | Public scripts with the category `notebook`, ids starting `#notebook-` |
| Description | The script's description |
| Each version | A version of the script, with the reason `Notebook saved (N cells)` |

The script starts with a header comment that gives the description and category, and each cell is a top level region:

```odsl
/**
 * Clean spark spread for German base power over the last six weeks
 * @category notebook
 */

//#region markdown
/*
# German clean spark spread
*/
//#endregion

//#region code
efficiency = 0.55
spread = cleanSpark(power, gas, carbon)
//= spread
//#endregion
```

| Part | What it is |
|-|-|
| `//#region markdown` | A markdown cell: its text is the block comment inside the region |
| `//#region code` | A code cell (any other region name is a code cell too, shown as the cell's title) |
| `//= spread` | The cell's value line. A value on its own is not an ODSL statement, so it is kept as a comment: the script stays valid and the line does nothing when the script runs outside a notebook. |

Any ODSL script can be opened as a notebook: its regions become cells, and code outside regions becomes code cells. Avoid lines starting `//#` other than the region markers in a cell (ODSL cannot read them) and regions inside a cell.

---

## What is kept in your browser

| Kept | For |
|-|-|
| The last outputs of each notebook | Shown the next time you open it, marked **from an earlier session**. Matched to cells by their text. |
| Unsaved changes | Offered when you open the notebook again |
| The input variable | Given to the kernel when it starts |
| The tab you last used | My notebooks or Examples |

They are kept in this browser only: a colleague, or you on another computer, does not see them. Clearing the browser's site data removes them.

---

## The notebook kernel

The kernel is the platform's script debug service (the one the Script Manager uses to debug scripts), started for a notebook. It runs in its own service, not in the platform's API, and reaches the platform through its REST API with your own sign-in, so your security policies apply exactly as they do to you.

| Setting (service) | Default | What it does |
|-|-|-|
| `KERNEL_IDLE_MINUTES` | 30 | A kernel with no cell running and no message from the screen for this long ends |
| `KERNEL_MAX_MINUTES` | 480 | The longest a kernel can last |

Before a kernel starts, the service checks with the platform that you have the run (or update) right on the notebook's script. A kernel does not count as your debug session in the Script Manager: you can debug a script and have notebooks open at the same time.

---

## Extension contents

| Item | Id |
|-|-|
| Extension | `odsl.notebooks` |
| View | **Notebooks**, **Manage** menu (`odsl.notebooks.manage`) |
| Feature | `odsl.notebooks.manage`, in the feature policy `extension.odsl.notebooks` |
| Scripts | `odsl.notebooks.common`, and the Script Manager's `odsl.script_manager.common` (the editor and the ODSL language) |
| Example notebooks | 50 public scripts with ids starting `#notebook-`, listed in [Example notebooks](/docs/extensions/notebooks/examples#the-examples) |

---

## Troubleshooting

| What you see | Why, and what to do |
|-|-|
| **Replay mode** | The kernel service could not be reached, or does not have notebook kernels yet. Cells still run (see [Replay mode](/docs/extensions/notebooks/running#replay-mode)). Ask your administrator if it persists. |
| **Kernel failed** with "Your security policies do not let you run ..." | You need the run or update right on the notebook's script |
| A cell says a variable does not exist, though the cell that makes it is above | That cell has not run since the kernel started (or the kernel ended). Run it, or **Run all**. |
| A value is shown that does not match the code | The kernel has the values of the cells as they were when you ran them. **Restart** and **Run all**. |
| **A new kernel was started** | The last kernel ended (idle, too long, or the service restarted). Run the earlier cells again. |
| No value under a cell | The last line is a statement, not a value: add a line with the variable's name. |
| The notebook opens read only | It is an example (use **Use this notebook**), or you do not have the update right on it |
| **The value is too large to show here** | Values over 4 MB are not sent to the screen. Show part of it, for example a few contracts or a shorter range. |
