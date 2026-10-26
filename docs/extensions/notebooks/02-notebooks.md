---
title: Working with notebooks
description: Find, create and edit notebooks, write code and markdown cells, use the keyboard shortcuts, and save, copy, rename and delete notebooks
slug: /extensions/notebooks/notebooks
sidebar_position: 2
tags: [extension, notebooks, odsl, editor, markdown]
---

# Working with notebooks

Open **Notebooks** from the **Manage** menu. This page covers finding and creating notebooks and editing their cells. Running them is on the next page.

---

## The notebooks list

**My notebooks** shows your company's notebooks as cards: the name, the description, the script id, the version, when it was last saved and by whom. Type in the filter box to show only the notebooks whose name, id or description contain every word you type.

![My notebooks with four Northgate Energy notebooks](/img/extensions/notebooks/library.png)

| Control | What it does |
|-|-|
| **Open** (or a click on the card) | Opens the notebook |
| **Refresh** | Reads the list again, for notebooks a colleague saved since you opened the screen |
| **New notebook** | Creates a notebook, see below |
| **Examples** tab | The example notebooks, see [Example notebooks](/docs/extensions/notebooks/examples) |

A notebook is any private script with the category `notebook`, so a notebook a colleague saved from the Script Manager with that category shows here too.

---

## Creating a notebook

Select **New notebook**.

![The New notebook dialog filled in for a TTF and NBP spread notebook](/img/extensions/notebooks/new-notebook.png)

| Field | Example | Notes |
|-|-|-|
| **Title** | `TTF and NBP spread` | The heading of the first cell |
| **Script id** | `notebooks\northgate\ttf-nbp-spread` | The private script the notebook is saved as. A backslash makes a folder, as in the Script Manager. The id must not exist yet. |
| **Description** | `Daily TTF against NBP in EUR/MWh, with the spread and its average` | Shown on the card |

**Create** saves the notebook straight away with a markdown cell (the title and description) and an empty code cell, and opens it.

:::tip
To start from something that already works, use an [example notebook](/docs/extensions/notebooks/examples#using-an-example) instead.
:::

---

## Cells

A notebook is a list of cells, each one either code or markdown.

![A code cell with its run button, execution count and cell tools](/img/extensions/notebooks/cell-tools.png)

| Part | What it is |
|-|-|
| Run button | Runs the cell (code cells only) |
| `[1]` | The execution count: the order in which the cells were run since the kernel started. `[*]` while the cell runs, `[ ]` before it has run. |
| **ODSL** or **MARKDOWN** | The cell's type, at the left of the cell tools, which show when you point at a cell or select it |
| Up and down arrows | Move the cell |
| Two arrows | Change a code cell to markdown or back |
| Eraser | Clear the cell's output |
| Bin | Delete the cell. **Undo** in the message that appears (or **Z**) puts it back. |

To add a cell, point between two cells and select **+ Code** or **+ Markdown**, or use the keyboard shortcuts below.

---

## Editing code

Code cells use the same editor as the Script Manager, with ODSL colouring and intellisense: built-in functions with their parameters, the functions of scripts you import, keywords, snippets and the services after `${`. In a notebook the intellisense also knows the variables and functions of every other cell, and of the kernel once it has run cells, so `spread` is offered in the fourth cell even though it was made in the second.

Syntax errors are underlined a moment after you stop typing. Hover over the underline to read the error.

---

## Writing markdown

Double-click a markdown cell (or select it and press **Enter**) to edit it, and press **Shift+Enter** or **Esc** to show it again.

![Editing the notes cell of the spark spread notebook](/img/extensions/notebooks/markdown-edit.png)

| Write | To get |
|-|-|
| `# Heading`, `## Heading`, `### Heading` | Headings |
| `**bold**`, `*italic*`, `~~struck~~` | Emphasis |
| `` `code` `` and lines between ```` ``` ```` | Code |
| `- item` or `1. item` | Lists |
| `> text` | A quote |
| A header row, a row of dashes and more rows, with a vertical bar between the columns | A table |
| `[text](https://...)` | A link, opened in a new tab |
| `---` | A line across the cell |

:::note
Markdown cells show only text: HTML written in a cell is shown as it is, not run, so a notebook shared with you cannot run code in your browser.
:::

---

## Keyboard shortcuts

In a cell you are editing:

| Keys | What they do |
|-|-|
| **Shift+Enter** | Run the cell and go to the next one (a new code cell is added at the end) |
| **Ctrl+Enter** | Run the cell and stay in it |
| **Alt+Enter** | Run the cell and add a new code cell below it |
| **Esc** | Stop editing: the cell stays selected |
| **Ctrl+S** | Save the notebook |

With a cell selected and nothing being edited:

| Keys | What they do |
|-|-|
| **Up**, **Down** (or **K**, **J**) | Select the cell above or below |
| **Enter** | Edit the selected cell |
| **A**, **B** | Add a code cell above or below |
| **M**, **Y** | Change the cell to markdown or to code |
| **D** **D** | Delete the cell (press D twice) |
| **Z** | Undo the last delete |
| **Shift+Enter**, **Ctrl+Enter** | Run the cell, as above |

The shortcuts are listed under the last cell too.

---

## Saving

**Save** (or **Ctrl+S**) saves the notebook as a new version of its script. The chip next to the name says **Unsaved changes** until you do. If a colleague saved the notebook after you opened it, you are told who and when before your version replaces theirs; theirs stays in the history.

- **Outputs are not saved in the notebook.** Your browser keeps the last outputs of each notebook and shows them the next time you open it, marked **from an earlier session**. The kernel does not have their values any more: run the cells again to use them.
- **Unsaved changes are kept in your browser** too. If you close the screen without saving, the next time you open the notebook you are asked whether to restore them.
- **Edit description** in the **...** menu changes the description shown on the card. It is saved with the notebook.

![The ... menu of a notebook](/img/extensions/notebooks/more-menu.png)

---

## Copying, renaming and moving

From the **...** menu:

| Item | What it does |
|-|-|
| **Make a copy** | Saves the notebook, with any unsaved changes, under a new id and opens the copy. The original keeps its unsaved changes. |
| **Rename or move** | Gives the notebook a new id, for example to move it from `notebooks` to `notebooks\northgate`. Save or undo your changes first. Its versions and audit trail move with it. |
| **Download as .odsl** | Downloads the notebook as an ODSL file, with your unsaved changes |

---

## Deleting a notebook

**Delete notebook** in the **...** menu deletes the notebook and all its versions, with the reason you give. It needs the delete right on scripts. Its outputs and draft are removed from your browser too.

---

## Permissions

Notebooks are scripts, so your security policies on the script service apply:

| You need | To |
|-|-|
| Read on scripts | See and open notebooks |
| Update | Change and save a notebook. Without it the notebook opens read only. |
| Run (or update) | Run cells |
| Delete | Delete a notebook |

---

## Next

[Running cells](/docs/extensions/notebooks/running): the kernel, values, charts and the variables panel.
