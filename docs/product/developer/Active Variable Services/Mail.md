---
title: Mail Service
description: The mail service in the ODSL language
slug: /odsl/service/mail
tags:
  - service
  - mail
---

# Mail Service

The **mail** active variable service reads emails from a mailbox over IMAP or POP3, and reads their attachments with the file service that matches each attachment's type, for example CSV or XLS. Zip and gzip attachments are unpacked. The result is a list of the files read.

## Using the service

The id is the mail server host:

```js
files = ${mail:"imap.example.com","user=prices@northgate-energy.com,password=" + pwd + ",sender=settlements@example-broker.com,subject=Daily settlement prices"}
```

## Options

|**Option**|**Description**|**Default**|
|-|-|-|
|user|The mailbox user||
|password|The mailbox password. Keep it in a [secret](./secret)||
|agent|imap or pop3|imap|
|port|The server port|993 for IMAP, 995 for POP3|
|folder|The folder to read|INBOX|
|seen|true reads emails that have been read, false reads unread emails|false|
|sender|Only read emails from these senders||
|subject|Only read emails with this subject||
|fromDateTime|Only read emails received on or after this date, as dd-MM-yyyy||
|toDateTime|Only read emails received on or before this date, as dd-MM-yyyy||
|filter_files|Only read the attachments with these file names, separated by ;||
