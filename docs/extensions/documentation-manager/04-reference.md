---
title: Reference
description: How documents are kept, who can change them, opening the screen on a document, and troubleshooting
slug: /extensions/documentation-manager/reference
sidebar_position: 4
tags: [extension, documentation manager, documentation, reference]
---

# Reference

## How documents are kept

Every document is a record in the platform's documentation service. A record has:

| Field | What it is |
|-|-|
| `scope`, `entity`, `name` | What the document is about. Together with `language` they identify it |
| `language` | The language code, `en` by default |
| `documentationType` | `Default` (markdown in `content`), `Link` (`url` and an optional CSS `selector`) or `JSON` (`json` and an optional `template`) |
| `tags` | A list of tags. The title is kept as a tag starting `title:` |

The same documents can be read in ODSL, for example `d = ${documentation:"private"/"guides:curves:gas-curve-build"}`, and through the REST API (`documentation/v1/private/guides:curves:gas-curve-build`).

When the scope is the name of a platform service, such as `object`, and the entity is the id of one of its records, saving the document adds a documentation link named after the document to that record.

## Who can read and change documents

Reading and changing documents follows the security policies on the documentation service in your company. Common and public documentation is shared with every client and can only be changed by OpenDataDSL: if you try, the screen shows the reason the platform gives. The extension's feature policy, `extension.odsl.documentation_manager`, controls who sees the **Documentation** menu item.

## Opening the screen on a document

Home page tasks and other extensions can open the screen with these properties:

| Property | What it does |
|-|-|
| `SOURCE` | `private`, `common` or `public` |
| `Q` | Text to find |
| `CONTENT` | `true` to search the text of the documents too |
| `SCOPE` | Show only this scope |
| `ID` | Open the document with this id |
| `SCOPE`, `ENTITY`, `NAME`, `LANGUAGE` | Open the document with this key (and language) |
| `ACTION` | `new` to start a new document, with `SCOPE`, `ENTITY`, `NAME` and `TITLE` filled in |

## Troubleshooting

| What you see | What to do |
|-|-|
| **The documents could not be read** | You may not be allowed to read this documentation. Ask your administrator about the security policies on the documentation service |
| **Could not save: ... not authorised** | You are not allowed to change this documentation, for example common or public documentation |
| **There is already a document ...** | A document with the same scope, entity, name and language exists. Choose another name, or open that one |
| A web page link shows nothing | The page may not be reachable from the platform, or the selector finds nothing on it. Check the address and selector |
| The record still shows a link to a deleted document | Deleting a document does not remove the link the platform added to the record |
