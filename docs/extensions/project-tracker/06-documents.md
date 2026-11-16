---
title: Documents
description: Write project documents in markdown, keep them in the documentation service, and link them to the tasks they belong to
slug: /extensions/project-tracker/documents
sidebar_position: 6
tags: [extension, projects, documents, markdown, documentation]
---

# Documents

Requirements, designs, meeting notes and runbooks belong with the project. The **Documents** tab keeps them as markdown documents in the platform's documentation service, and links each one to the tasks it is about.

![The curve requirements document of the Northgate project](/img/extensions/project-tracker/documents.png)

---

## Creating a document

1. Choose the project and open the **Documents** tab.
2. Select **New document**.
3. Give it a title and choose what to **Start from**: Blank, Meeting notes, Requirements, Design or Runbook.
4. Select **Create**. The document opens for editing.

You can also create a document from a task: select **New document** in the task panel, and the new document is linked to the task. Save the task to keep the link.

---

## Editing a document

Select a document, then **Edit**. Write markdown on the left; the right shows how it will look as you type. Select **Save** when you are done, or **Cancel** to leave it as it was.

![Editing a document with the preview beside it](/img/extensions/project-tracker/document-edit.png)

| Markdown | Gives |
|-|-|
| `# Title`, `## Section` | Headings |
| `**bold**`, `*italic*` | **bold**, *italic* |
| `- item` | A bullet list |
| `- [ ] step` and `- [x] step` | A check list |
| A row of `\| a \| b \|` lines, the second `\|-\|-\|` | A table |
| `[text](https://...)` | A link |

The download button saves the document as a markdown file.

---

## Linking documents and tasks

- While editing a document, choose a task in **Link to tasks**; the link is saved at once.
- In the task panel, choose a document in **Link a project document**, then save the task.

The document shows the tasks it is linked to, and the task panel lists its documents: select one to read it there. Linking and unlinking are written in the task's activity log.

---

## Where documents are kept

Each document is a documentation record in your private documentation service, with the scope `odsl.project`, the project code as its entity and the document name as its name, for example `odsl.project:NORTHGATE:curve-requirements`. Deleting a document removes it from the documentation service and unlinks it from its tasks.
