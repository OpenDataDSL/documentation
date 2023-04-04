---
slug: /tutorials/running-code
title: Running ODSL code
description: A tutorial showing you all the different ways of running ODSL code
tags:
- tutorial
- odsl
- code
- debug
---

A tutorial showing you all the different ways of running ODSL code

## Using Visual Studio Code
If you haven't installed Visual Studio Code, you can download and install it using [this link](https://code.visualstudio.com/download)

OpenDataDSL uses the file extension ```.odsl```, so if you create a file called e.g. **test.odsl** - VS Code recognises this and initiates the OpenDataDSL extension.

### OpenDataDSL Extension
If you don't have the extension installed you will be prompted to install it.

There are 2 versions of the OpenDataDSL extension:
* FREE Community Version
* Standard Commercial Version

If you are registered for a commercial plan, select the Standard Commercial Version, otherwise select the FREE Community Version.

### Running an entire script 
To run or debug the entire script, right click anywhere in the text editor and select **Debug Editor Contents**

If you have created breakpoints in the script, by clicking in the margin to the left of the line number, the code will execute up to this line and then halt waiting for you to decide what action to take next.

### Running a code region
You can create regions in the code which act as mini-scripts that can be run independently, an example of a region is below:

```js
//#region 
zips=find ${object:"m101:sample_training.zips"} where state="NY" and city="ALBANY"
print zips
//#endregion
```

:::info
You can easily create a region in your code by typing the word **region** at the start of the line and pressing enter
:::

To run or debug a region, right click anywhere in the text editor and select **Debug Region**

If you have created breakpoints within the region, by clicking in the margin to the left of the line number, the code will execute up to this line and then halt waiting for you to decide what action to take next.

### Running selected text
You can select one or more lines of code within a script, right click in the text editor and select **Run Selected Text**

The code will run independent of the rest of the script, but you won't be able to debug this code

<!--
## Using the CLI

## Running as a server managed process
-->