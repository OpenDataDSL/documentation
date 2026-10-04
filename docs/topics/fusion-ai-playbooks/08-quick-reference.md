---
title: Quick reference and troubleshooting
description: A one-page summary of the playbook format, and what the editor's error and warning messages mean
slug: /topics/fusion-ai-playbooks/reference
sidebar_position: 8
tags: [fusion-ai, playbooks, reference]
---

# Quick reference and troubleshooting

## The format on one page

````markdown
---
id: my-playbook                 # required; '#name' (quoted) for library playbooks
name: My playbook               # required
category: Reports
assistant: General              # General, Analyst, Code, Curve, Integrate, Operations or custom
description: One line on what it does
icon: graph-up text-primary
tags: [reports]
featured: false
maxTokens: 1000000
---

Guidance for every run. Headings group the inputs on the form.

```input
name: region                    # required; @{input.region}
label: Region
type: choice                    # text longtext number boolean date choice multichoice
                                # curve timeseries dataset calendar script report user
required: true
options: [EU, US]               # choice and multichoice
default: EU
help: Shown under the field
validate: "^[A-Z]{2}$"          # regex, or {min: 1, max: 10} for numbers
```

```step
id: research                    # required; @{steps.research.<value>}
title: Look at the data
assistant: Analyst
tools: [find_data, find_types]
instructions: >                 # required
  What to do, with @{input.region}.
produces: [table, count]
```

```check
step: research                  # required
rule: Every market was covered  # required
onFail: retry                   # retry (default) | fail | <step id>
maxRetries: 2
```

```transition
from: research                  # required
when: "@{steps.research.count} == 0"   # optional; none means always
to: end                         # required; <step id> | end
```

```gate
after: research                 # required; one gate per step
message: Check the table
approvers: [ops@example.com, Data Ops]  # emails and groups; empty means anyone
```

```output
name: table                     # required
type: text
from: steps.research.table      # steps.<step>.<value> | input.<name>
description: The table
```
````

| Reference | Meaning |
|-|-|
| `@{input.name}` | A task value |
| `@{steps.step.value}` | A value an earlier step produced |
| `@@{` | A literal `@{` |

| Conditions | |
|-|-|
| Compare | `==` `!=` `<` `<=` `>` `>=` |
| Combine | `and` `or` `not` `( )` |
| Values | references, `'text'`, numbers, `true`, `false`, `null` |

---

## Editor messages

The editor checks the playbook as you type and lists problems by line. **Errors** must be fixed before the playbook can be saved. **Warnings** can be saved but are worth reading.

### Errors

| Message | Cause and fix |
|-|-|
| A playbook must start with front matter (--- lines) holding at least id and name | The document must begin with a `---` line. Check nothing comes before it, not even a blank line. |
| The front matter starting on line 1 is not closed with a --- line | Add the closing `---` after the last front matter field. |
| The front matter is not valid YAML: mapping values are not allowed here | A value contains `: ` (a colon and a space). Reword it, or put the whole value in quotes. The same message can appear for any marker block. |
| The id '...' may only use letters, numbers, '.', '-' and '_' | Remove spaces and other characters from the id. Only library playbooks start with `#`. |
| The code block starting on line N is not closed | A fenced block has no closing fence. If the block contains a code block of its own, open it with four backticks. |
| Input '...' has unknown type '...' | Use one of the [input types](/docs/topics/fusion-ai-playbooks/syntax#input-types). |
| Input '...' is a choice so it needs options | Add `options: [...]` to `choice` and `multichoice` inputs. |
| Input '...' has an invalid validate pattern | The regular expression does not compile. Quote it, and escape backslashes as `\\` inside double quotes. |
| Step '...' needs instructions | Every step needs `instructions`. |
| Step id '...' is used more than once | Step ids, and input names, must be unique. |
| A playbook needs at least one step | Add a `step` block. |
| Check refers to unknown step '...' / Gate refers to unknown step '...' | The `step` or `after` value must be the id of a step. |
| Step '...' has more than one gate after it | Combine the gates into one, with a message covering both. |
| Check onFail must be retry, fail or a step id | Fix the `onFail` value. |
| Transition to must be a step id or end | Fix the `to` value. |
| Transition from '...': use == or != to compare, not = | Conditions use `==` for equals. |
| Transition from '...': '...' is not a value; put text in quotes and references in @&#123;...&#125; | Put text in quotes, `'EU'`, and check the reference spelling. |
| Reference @&#123;...&#125; names an unknown input / step | Check the spelling of the input name or step id. |
| Step '...' refers to @&#123;...&#125;, which is not produced until later | A step can only use values from steps above it. Move the step, or the reference. |

### Warnings

| Message | Meaning |
|-|-|
| Step '...' can change the platform (...) but no gate comes before it | The step can save, create, run, raise or send something without anyone approving it. Add a [gate](/docs/topics/fusion-ai-playbooks/flow#gate) unless that is intended. |
| Step '...' uses tool '...', which is not a known tool | Check the spelling of the tool name against [Available tools](/docs/product/mcp/tools). Fusion cannot use a tool that does not exist. |
| Reference @&#123;steps.s.v&#125;: step 's' does not list 'v' in produces | Add the value to the step's `produces`, or Fusion will not be asked to record it. |

---

## Troubleshooting runs

| Symptom | What to look at |
|-|-|
| A step keeps failing its check | Open the step on the run to see each check's reason. The rule may be stricter than intended, or the instructions may not ask for what the rule expects. |
| The run stopped with "the most allowed for this playbook" | A check or transition sent the run round in a loop. Give the loop a way out, then **Resume**. |
| The run stopped at its token cap | **Resume** gives it another allowance. If this happens often, raise `maxTokens` or narrow what the steps read. |
| I cannot approve a run | You started it, and your tenant does not allow approving your own runs, or you are not one of the gate's approvers. |
| Approvers were not emailed | Approvers must be users of your tenant, or groups with members. With no approvers listed, only a background run's starter is emailed. |
| A scheduled task did not run | Open the task: it shows when the schedule last fired and why a run did not start. Check **Schedule enabled** and that every required value is filled in. |
| A reference appears as written in a step's instructions | The value is missing, usually because the step that produces it was skipped. Check the transitions, or handle the missing value in the instructions. |
| Fusion says it cannot find a playbook from the chat | Check the playbook's `name`, `description` and `tags` describe the job in the words people use. |
