---
title: Command Line Interface
description: User guide for the OpenDataDSL command line interface (CLI)
sidebar_position: 4
slug: /user/cli
tags:
  - cli
  - odsl
---
## Introduction
The OpenDataDSL command line interface or CLI allows you to
* Run ODSL scripts from the command line
* Create an interactive session working with ODSL

## Getting Started
The CLI is included in the java SDK, download the jar file from [Maven Central Repository](https://mvnrepository.com/artifact/com.opendatadsl/odsl-sdk)

## Interactive Mode
To use the CLI in interactive mode, simply run the odsl without any arguments.
When you see the ODSL prompt, type in your command, pressing enter will execute your command.

### Run odsl at a command prompt
```
java -jar {path to odsl-sdk jar file}
```

### Options

|Option|Example|Description|
|-|-|-|
|--session|--session /temp/odsl.json|Loads in the variables from a previous session and saves the session at the end|

### Multi-line commands
If you want to enter multiple lines of commands, end each line with a `/`, then the next time you don't end the line with a `/` the entire set of commands will be executed.

Example:
```js
for i=1 to 10/
print i/
next
```

### Saving and reloading variables
You can use the --session option to automatically load and save session variables, but you can also do this manually.
You can utilise the [Memory Service](/docs/odsl/service/memory) to save and reload sessions, e.g.

#### Saving
```js
save ${memory:"/temp/session.json"}
```

#### Loading
```js
mem = ${memory:"/temp/session.json"}
```

### Finishing the session
To finish the session and exit back to the command prompt, press ctrl-c

## Script Mode
To run a script, simply pass the script path and name as an argument to the CLI.

For example if you have a script in the /temp directory called test.odsl, you can call:

```
java -jar {path to odsl-sdk jar file} /temp/test.odsl
```
