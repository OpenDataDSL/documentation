---
title: Studio
description: "Chat with Fusion AI in the Studio: conversations, choosing an assistant, tool activity, questions Fusion asks you, feedback, and saving a conversation as an agent"
slug: /extensions/fusion-ai/studio
sidebar_position: 2
tags: [extension, fusion-ai, chat, ai-assistant]
---

# Studio

**Information > Fusion AI > Studio** is where you chat with Fusion. A new chat opens with a greeting, the message box in the centre and some suggestions to start from.

![A new chat in the Studio](/img/extensions/fusion-ai/studio-new-chat.png)

Type your question and press **Enter** to send it. **Shift+Enter** starts a new line, and the box grows as you type. Select a suggestion to send it straight away.

---

## Asking questions

Ask the way you would ask a colleague. Fusion looks up the data it needs, so name things the way your team does:

> How has the TTF front month moved over the last week? Compare it with NBP.

> Show me all the failed processes for yesterday, with the reason for each.

> Write an ODSL script that loads the EEX Phelix futures file and saves it as a dataset.

> Which of our gas curves had missing tenors yesterday?

> Build a SMART curve for the TTF minus NBP spread.

Fusion answers in formatted text, with tables for figures and code blocks for scripts. Each code block has a language label and a **Copy** button, and wide tables scroll.

![An answer with a table](/img/extensions/fusion-ai/studio-conversation.png)

Follow-up questions keep the context of the conversation, so you can ask "and for the second month?" or "now email that to the gas desk".

:::tip
Fusion can make mistakes. Check important figures against the source data, especially before you send them on.
:::

---

## Choosing an assistant

The button in the message box shows the assistant that answers. **Auto**, the default, lets Fusion pick the best assistant for each question. To use a particular one, select the button and choose it:

![The assistant picker](/img/extensions/fusion-ai/studio-assistant-picker.png)

| Assistant | Best for |
|-|-|
| **General** | OpenDataDSL concepts and documentation |
| **Analyst** | Analysing data, and creating reports, insights and extensions |
| **Code** | Writing and checking ODSL scripts |
| **Curve** | SMART curves and curve building |
| **Integrate** | Getting data in or out of the platform |
| **Operations** | Monitoring processes and data, and investigating issues |

Your tenant's [custom assistants](/docs/extensions/fusion-ai/assistants) appear in the same list. An assistant can have its own suggested questions, which are shown on a new chat when it is selected.

The name of the assistant that answered is shown above each answer.

---

## Tool activity

While Fusion works, the tools it calls and its log lines appear live in a **Working** block, with a line saying what it is doing now:

![Fusion at work, with the tools it is calling](/img/extensions/fusion-ai/studio-working.png)

When the answer arrives, the block folds into a summary such as **Used 3 tools, 1 log entry**. Select it to see each tool and the values Fusion passed to it. This is a good way to check where an answer came from: which curve, which dates, which dataset.

---

## When Fusion asks you a question

When Fusion needs a decision from you before it can carry on, it asks instead of guessing. For example, it might ask which of several matching curves you mean, which date range or currency to use, or which of two approaches to take. The question appears as a card with two to four options:

- **Pick an option** to answer. Your choice is sent as your next message, and Fusion carries on from there.
- When more than one option can apply, tick the ones you want and select **Send**.
- **Or type your own answer** in the message box if none of the options fit.

Any text Fusion wrote while working shows above the question, so you can see what led to it. Once you have answered, the card shows the option you picked. The question and your answer stay in the conversation when you reopen it later.

Fusion stops at the question and does nothing else until you answer, so no tokens are spent on a path you did not want. Fusion asks in the same way when you use it in other extensions: in [Composer](/docs/extensions/composer/fusion-ai#when-fusion-asks-you-a-question), [Smart Data](/docs/extensions/smart-data/fusion-ai#when-fusion-asks-you-a-question) and the [Scripts](/docs/extensions/script-manager/fusion-ai#when-fusion-asks-you-a-question) Fusion AI panel. Agents and playbook runs work without anyone watching, so they never stop to ask.

---

## Actions on an answer

Under each answer:

| Action | What it does |
|-|-|
| **Copy** | Copies the answer as markdown |
| **Thumbs up** or **Thumbs down** | Rates the answer, with an optional comment. Feedback is collected in the [Fusion AI Feedback](/docs/extensions/fusion-ai/insights#feedback) insight. |
| **Retry** | Asks the last question again (latest answer only) |
| **Remove** | Removes the last question and answer from the conversation (latest answer only) |

Under your latest question, **Edit** puts it back in the message box to change and send again.

---

## Conversations

Every conversation is saved and listed in the sidebar, newest first, grouped into **Today**, **Yesterday**, **Previous 7 days**, **Previous 30 days** and **Older**. Fusion names each conversation after its first question.

- **Search chats** filters the list by name.
- **New chat**, or **Alt+N**, starts a new conversation.
- Select a conversation to open it and carry on where you left off.
- To delete a conversation, hover over it in the sidebar and select the bin, or use the bin at the top of an open conversation.
- The button at the top of the sidebar closes it, to give the chat the full width. The Studio remembers your choice.

---

## Save as agent

The **Save as agent** button at the top of a conversation saves its questions, in order, as an [agent](/docs/extensions/fusion-ai/agents). The agent can then be run again at any time, on a schedule or from an automation. Use it once a conversation does something you want repeated, such as a morning summary.

---

## Running a playbook from the chat

Ask Fusion to run a [playbook](/docs/extensions/fusion-ai/playbooks/overview) and it finds the one that fits, fills in a task from what you have said, and shows it as a card:

![A playbook task prepared in the chat](/img/extensions/fusion-ai/studio-playbook-card.png)

Check the values, then select **Run in background**, or **Open on Tasks tab** to change them first. Fusion never starts a run itself. See [The library, extensions and chat](/docs/extensions/fusion-ai/playbooks/library-and-chat#running-a-playbook-from-the-chat).

---

## Fusion in other extensions

Other extensions can include the same chat, set up for their subject: for example an EPR assistant fixed to its own assistant, with its own name, suggestions and conversations. These work the same way as the Studio. See [Administration](/docs/extensions/fusion-ai/administration#using-the-chat-in-your-own-extension).
