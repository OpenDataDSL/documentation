---
title: FAQ
description: IT related frequently asked questions
slug: /it/faq
sidebar_position: 10
tags:
  - it
  - faq
  - security
  - database
---

IT related frequently asked questions

## Security

### Logging in

<details>
<summary>Can I use a personal email address to log into OpenDataDSL?</summary>
<div>
  
No, you must use a Microsoft work (B2B) email account, such as your corporate login to your organization.
  
</div>
</details>
<details>
<summary>Can I use a service (unattended) account to log into OpenDataDSL?</summary>
<div>

Yes, you can create an `App registration` in Azure Active Directory and then use either a
* Client Secret
* Certificate

To get a token to authorize the application with OpenDataDSL

See [here](/docs/tutorials/qs/api/security#unattended-login) for an example of using a client secret programmatically.

</div>
</details>