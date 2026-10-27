---
sidebar_position: 3
slug: /user/vscode
---
Microsoft VS Code Extension
===========================

Our free extension to Microsoft VSCode allows you to easily edit and debug ODSL source files and browse the ODSL Services

## Installation

Installation of our VS Code extension is easy, follow these steps:

### Install VSCode

If you haven’t done already, download and install the latest version of Microsoft VS Code [here](https://code.visualstudio.com/download)

![The VSCode download screen](/attachments/33374/33387.png)

### Install the ODSL Extension

Open VSCode and click on the extensions icon in the Activity Bar on the left or press (ctrl-shift-X) and then search for odsl

![](/attachments/33374/296943770.png)

Click on the **Install** button to start the installation of the ODSL extension

Once installed, opening or creating a file with the extension **.odsl** initiates the ODSL editor

## Choosing the stage

The extension connects to one stage of the platform at a time: production (`prod`), `preview`, `dev`, or `local` (the platform's functions running on your computer). The code completion, the **Platform** panel and every run and debug use it.

The status bar shows the stage and the data environment, for example **ODSL: prod · production**. To change the stage, select it in the status bar, select **Stage** at the top of the **Platform** panel, or run **ODSL: Choose the stage to connect to** from the Command Palette, then pick the stage. You stay signed in: every stage uses the same account.

`dev` and `local` are offered only to members of the admin group.

The stage is kept in the setting **ODSL: Environment** (`odsl.environment`), for you in every window. To use a stage only in one folder, set it in that folder's workspace settings; choosing a stage then changes it there.

:::note
Before this, the stage was set in the file `.odslenv` in `%APPDATA%\ODSL`. That file is still read when the setting is empty, so nothing changes until you choose a stage.
:::

## Choosing the data environment

Within a stage, your company can have several data environments, each with its own scripts, data and processes: `production` (the default), `preview`, and any others your administrator adds.

To change the data environment, select **Environment** under **Stage** in the **Platform** panel, the database button at the top of the panel, or run **ODSL: Choose the data environment**. The panel then lists what that environment holds, and runs and debugging read and write there. The extension remembers your choice for each stage.

## Uploading a script

To send a script to the platform, right-click it in the editor or in the Explorer and select **Upload this script**. Unsaved changes are saved first.

To send several at once, select them in the Explorer (`Ctrl`+click or `Shift`+click), or right-click a folder, and select **Upload scripts to the platform**. A folder sends every script in it and in its subfolders: `.odsl`, `.html`, `.mustache`, `.css`, `.py`, `.js`, `.mjs` and `.cjs` files, leaving out `node_modules` and folders whose names start with a dot. The extension lists the scripts and asks you to confirm before sending them, shows its progress (you can cancel it), and tells you how many went up. If some fail, it says why for the first one, and **Show the details** lists them all in the **ODSL** output.

The extension asks which data environment of the stage to upload to, with the one you use first. The script is saved as a private script. Its id depends on where it came from:

| The script | Its id |
|-|-|
| Opened from the **Platform** panel, or started there with **New script** | Its id on the platform, so uploading it always updates the same script |
| Written in VS Code | The name of the folder you have open, then its path in that folder, without the extension: `eon\load-prices.odsl` in the folder `odsl-demo` is the script `odsl-demo\eon\load-prices` |
| A file whose name starts with `#` | Its name, without the extension: `#odsl-portal.mustache` is the script `#odsl-portal` |

## The Platform panel

Select the OpenDataDSL icon in the Activity Bar to open the **Platform** panel. It shows the stage you are connected to, then what that stage holds:

| Group | What it lists |
|-|-|
| **Scripts** | Your private scripts and the public ones, in folders: a backslash in a script id is a folder, as in the Script Manager |
| **Types**, **Transformers**, **Calendars** | Private and public |
| **Actions**, **Workflows** | Private and public, by category |
| **Processes** | Your processes, with the ones that are disabled marked |

A list is read when you open it, and kept until you refresh it or change the stage. Select **Refresh** at the top of the panel to read everything again, or the refresh button next to a group or folder to read just that. If a list cannot be read, the panel says why: select the message to try again.

Select a script to open it. With a folder open in VS Code, it opens as a file in that folder with the script's id as its name, so **Save** keeps it there and **Upload this script** sends your changes back. If the file is already there and differs from the platform's version, you can compare the two or take the platform's.

Selecting a type, transformer, action, workflow or process opens it as ODSL that saves it again when you run it.

Right-click an item for more:

| Choice | What it does |
|-|-|
| **Open** | Opens it, as selecting it does |
| **Copy reference** | Copies the reference to use in a script, for example `${script:private/eon\load-prices}` |
| **Copy id** | Copies the id |
| **Delete...** | Deletes it from the stage, after you confirm |

To start a new script, select the new file button next to **private** under **Scripts** (or next to one of its folders) and give the new script's id.

## Editing ODSL files

There are many language features which are available when editing .odsl files, below is an introduction to what is available:

### Standard VSCode Features

VSCode has many standard features to make editing source code easier, check out this [link](https://code.visualstudio.com/docs/getstarted/userinterface) to get a flavour of what is available

### Syntax Highlighting

The VSCode editor understands and highlights various parts of your source in order to make editing easier and the code to be more readable:

![](/attachments/33374/33408.png)

### Code Completion

Code completion is a feature that helps you write code by suggesting options for you where the cursor is placed. Code completion is triggered as you type and specifically when you press the '.' dot character. Code completion can also be forced by pressing ctrl-space.

An example of variable and function suggestion:

![](/attachments/33374/66113.png)

An example of property and method suggestion:

![](/attachments/33374/33422.png)

### Problem Highlighting

The ODSL language server is constantly scanning your code to spot problems and it makes you aware of those problems by placing a squiggley red underline beneath the piece of code where the problem is, for example:

![](/attachments/33374/262784.png)

The statement when is not recognised, so it highlights it in order for you to fix it.

A problem message is also placed in the problems console giving you the line, column and error message:

![](/attachments/33374/262792.png)

### Hover Information

Where it can, the ODSL language server gives you information about the code under your cursor. This can be information about syntax or details about a specific variable, e.g.

#### Syntax Information

![](/attachments/33374/33438.png)

#### Variable Information

![](/attachments/33374/131569.png)

### Snippets

There are also a number of built in code snippets that help you with the language syntax, these are triggered when typing certain character combinations at the start of a line and also by pressing ctrl-space at the start of a line.

E.g. typing the word **for** prompts the following:

![](/attachments/33374/66127.png)

Selecting for by pressing the **enter** key gives you the following code:

![](/attachments/33374/262802.png)

You can now tab through the highlighted elements and change the variable names to the desired ones.

Pressing ctrl-space at the start of a line gives you a full list of the available snippets:

| Snippet | What it gives you |
|-|-|
| `function` | A function |
| `docfunction` | A function with a `/** */` description, which shows when another script imports it |
| `if`, `ifelse` | An if block, with or without else |
| `for`, `fori` | A loop over a list, or a counted loop |
| `while` | A while loop |
| `region` | A `//#region`, which you can run or debug on its own |
| `find` | A find in a service |
| `import` | `import ${script:"id"}`, to use the functions of another script |
| `onerror` | `on error ignore` |
| `doc` | The script header: the description and category the platform shows |

### The outline

The **Outline** view, the breadcrumbs above the editor and **Go to Symbol in Editor** (`Ctrl+Shift+O`) list the script's functions and regions. A function inside a region is shown under it.

### Scripts you import

When you type `import ${script:"`, the code completion lists the scripts on the platform, private ones first. The functions of the scripts you import are then offered as you type, with their arguments, and hovering over a call shows the function's description and the script it comes from.

The list of scripts is read once and kept for five minutes. Run **ODSL: Refresh the list of platform scripts** from the Command Palette to read it again, for example after uploading a script.

## Running ODSL files

You run a script, one of its functions or one of its regions on your computer, as you. It reads and writes data on the platform with your own access, as everything else you do does.

| To run | Do this |
|-|-|
| The whole script | `Ctrl+Enter`, the **Run the script** button at the top right of the editor, or right-click and **Run the script** |
| One function | Select **Run** above the function, or right-click and **Run a function...** |
| One region | Select **Run region** above the `//#region` line, press `Ctrl+Shift+Enter` with the cursor in the region, or right-click and **Run the region at the cursor** |
| Some lines | Select them, then right-click and **Run the selected text** |

The script runs as the editor shows it, so you do not need to save your changes first.

### Running a function

When you run a function, you give each of its arguments as an ODSL expression, such as `10`, `"EEX"` or `a * 2`. The extension remembers the arguments you gave for each function, and offers them the next time.

Only the function call runs, but the script's other functions and the scripts it imports are there for it to use.

### Running a region

A region runs on its own: the functions of the script and the scripts it imports are there, but variables set outside the region are not. Put what a region needs inside it, or use the input.

### The script's input

A script can read an `input` variable, as it does when a process or the Script Manager runs it with an input. In VS Code, the input is a JSON object in a file next to the script with the same name and `.input.json` at the end, for example `spark-spread.input.json` for `spark-spread.odsl`.

To create or open it, right-click in the script and select **Edit the script's input**. Every run and debug of the script uses it while the file exists.

```json
{
    "ondate": "2026-10-23",
    "efficiency": 0.55
}
```

### The result

The output of `print` and `log` goes to the **Debug Console**. When the script ends, the Debug Console shows whether it succeeded, how long it took, and its result. If it fails, the error shows with the line it happened on: select it to go to that line.

To see the whole result as JSON, run **ODSL: Show the result of the last run** from the Command Palette. The **ODSL** output channel keeps a line for every run.

A script with syntax errors is not run: the Debug Console lists the errors.

## Debugging ODSL Files

A very powerful feature of the ODSL extension in VSCode is the ability to debug ODSL files: stop the script where you choose, see every variable, step through it a line at a time, and follow it into its functions.

| To debug | Do this |
|-|-|
| The whole script | `F5`, the **Debug the script** button at the top right of the editor, or right-click and **Debug the script** |
| One function | Select **Debug** above the function, or right-click and **Debug a function...** |
| One region | Select **Debug** above the `//#region` line, or right-click and **Debug the region at the cursor** |

As with running, the script is debugged as the editor shows it, and its input file is used.

`F5` needs no launch configuration. To keep one, for example to always debug the same function, add a `.vscode/launch.json`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "odsl",
            "request": "launch",
            "name": "Debug sparkSpread",
            "program": "${file}",
            "function": "sparkSpread(85.2, 31.7)",
            "stopOnEntry": false
        }
    ]
}
```

| Setting | What it does |
|-|-|
| `program` | The script to debug, `${file}` for the one in the editor |
| `function` | Debug only this function, as a call with its arguments |
| `region` | Debug only the region that holds this line |
| `input` or `inputFile` | The script's input variable, as an object or a JSON file |
| `stopOnEntry` | Stop before the first statement |
| `environment` | The platform environment, such as `dev`, when it is not the one you use by default |

### Breakpoints

Breakpoints can be toggled by clicking on the **editor margin** or using `F9` on the current line.

Code will run to the first breakpoint and then pause, at which point you can examine the variables and stack trace. You can also add watches or execute commands on the debugger.

Right-click the margin for more kinds of breakpoint:

| Kind | What it does |
|-|-|
| **Conditional breakpoint**, Expression | Stops only when an ODSL expression is true, for example `i == 10` |
| **Conditional breakpoint**, Hit Count | Stops on the given pass, for example `3`, or from it, for example `>= 3`, or every so many passes, for example `% 10` |
| **Logpoint** | Writes a message to the Debug Console and carries on. Put an expression in braces to show its value: `ondate is {ondate}` |

A breakpoint on a comment, a blank line or an `end` shows as a hollow circle, because the script never stops there.

You can also set breakpoints in a script the script imports, once the debugger has opened it (see below).

### Examining Variables

In the variables viewer, you can see a list of the variables that have been created in your code up to the current line (which is highlighted in your code)

![](/attachments/33374/33466.png)

When the script is in a function, you see the function's own variables first, then the script's global variables.

The **Watch** view, the **Debug Console** and hovering over a variable take any ODSL expression, such as `emissionFactor / efficiency` or `power.currency`, worked out where the script stopped.

### The call stack

The **Call Stack** view shows the functions the script is in, the innermost first. Select one to see the line that called it.

When the script steps into a function of a script it imports, the debugger opens that script, read only, so you can follow the function and set breakpoints in it.

### Stepping through the code

You can now step through your code using the debug toolbar

![](/attachments/33374/66149.png)

Or using the following keys:

*   Continue / Pause `F5` / `F6`
    
*   Step Over `F10`: runs the line, including any function it calls
    
*   Step Into `F11`: when the line calls a function, stops at the first line of that function
    
*   Step Out `Shift+F11`: runs to the end of the current function and stops in the script that called it
    
*   Restart `Ctrl+Shift+F5`
    
*   Stop `Shift+F5`

**Pause** stops a script that is running, for example a long loop, at its next statement.

### Debugging regions of code

You can create folding regions within your code that can break large scripts up into manageable sections that can be debugged independently.

A region wrapper looks like this:

```js
//#region Add a name here if you like

//#endregion
```

You can also use the ```region``` snippet to create a region.

To debug a region of code, select **Debug** above its `//#region` line.

### Good to know

| | |
|-|-|
| Data | A debug run is a real run: it reads and writes data as you. A save after the line where the script stopped has not happened yet; **Stop** ends the run there. |
| Selected text | You cannot debug selected text: run it instead |
| JavaScript | Only ODSL scripts can be run and debugged in VS Code |
| The Script Manager | The [Script Manager](/docs/extensions/script-manager/debugging) in the portal has the same debugger, for scripts on the platform |
