---
title: Writing pages
description: How an extension page is put together, the shared partials, the data API, the house style, and the Mustache rules to follow
slug: /extensions/building/pages
sidebar_position: 4
tags: [extension, building-extensions, mustache, html]
---

# Writing pages

Each view of an extension is a **page**: a Mustache script holding HTML, CSS and JavaScript. When a user opens the view, the platform renders the script with Mustache and shows the result in the portal, signed in as that user.

Write pages in VS Code with the OpenDataDSL extension and save them to the platform as scripts, or let Fusion AI write them with the [Build an extension](/docs/extensions/building/fusion-ai) playbook.

There are two styles of page:

| Style | Uses | Best for |
|-|-|-|
| **House style** | The shared house style, the data API and your own JavaScript | Lists, forms, dashboards and insights that look like the rest of the portal. The OpenDataDSL extensions and the Build an extension playbook use this style. |
| **HTML components** | Ready-made, data-connected components such as lists, grids and charts | Quick pages assembled from components with little code. See the [Example extension](/docs/odsl/extension/odsl.example). |

The rest of this page describes the house style.

---

## Anatomy of a page

```html
{{! Positions extension - Positions view. Paged open positions by book and period. }}
{{> #odsl-portal}}
{{> #odsl-service}}

{{> #insight-report-style}}
{{> acme\extensions\positions\acme.positions.style}}
{{> acme\extensions\positions\acme.positions.common}}

<div class="controls-container">
    <h2>Positions</h2>
    <div class="controls"><div class="controls-left">
        <div class="filter-picker"><label for="book">Book</label>
            <select id="book" onchange="reload()"><option value="">All books</option></select></div>
    </div></div>
</div>

<div class="top-bar">
    <div class="kpi-cards">
        <div class="kpi-card primary"><div class="kpi-label">Net volume (MWh)</div><div class="kpi-value" id="kpiVolume">-</div></div>
    </div>
    <div class="pager-row"><span class="pager-summary" id="pagerSummary"></span></div>
</div>

<div class="section">
    <table><thead><tr><th>Book</th><th>Period</th><th class="num">Volume (MWh)</th></tr></thead>
    <tbody id="rows"></tbody></table>
</div>

<script>
'use strict';
const paging = new Paging();
paging.limit = 50;

async function reload() {
    const book = document.getElementById('book').value;
    const filter = Object.assign({ _type: 'POSITION' }, book ? { book: book } : {});
    try {
        const rows = await find({ service: 'object', filter: filter, sort: { book: 1, period: 1 }, paging: paging });
        document.getElementById('rows').innerHTML = rows.map(r => '<tr><td>' + POS.escapeHtml(r.book) +
            '</td><td>' + POS.escapeHtml(r.period) + '</td><td class="num">' + POS.fmtNumber(r.volume) + '</td></tr>').join('');
        document.getElementById('pagerSummary').textContent = paging.summary;
    } catch (e) {
        POS.setStatus(document.getElementById('rows'), 'err', 'The positions could not be loaded: ' + e);
    }
}
reload();
</script>
```

1. **A comment** saying what the page is, using a Mustache comment.
2. **Platform partials**, whose names start with `#`: `#odsl-portal` (icons, and the portal's theme), `#odsl-service` (sign-in and the data API). Add `#odsl-signalr` for live updates from the platform.
3. **The house style**, `#insight-report-style`, then the extension's own style partial, so its rules win.
4. **The extension's own helpers** partial last.
5. **The HTML**, using the house style classes.
6. **The script**, which loads the data and fills in the page.

Partials without `#` are your own scripts, included by their full script name.

---

## The data API

`#odsl-service` gives every page these functions. Each returns a promise, and each request runs as the signed-in user, so the platform's policies apply.

| Function | What it does |
|-|-|
| `find({service, source, filter, projection, sort, paging})` | Queries a service and returns an array |
| `ODSLGet({service, source, id, projection})` | Reads one record |
| `ODSLaggregate({service, source, pipeline})` | Runs an aggregation pipeline on the server, with stages such as `$match`, `$group`, `$sort` and `$limit` |
| `ODSLUpdate({service, source, body})` | Saves a record |
| `ODSLDelete({service, source, id})` | Deletes a record |
| `new Paging()`, `UnlimitedPaging()` | Paging for `find`: set `limit`, then use `nextPage()`, `prevPage()`, `summary` and `items` for the pager |

Good practice:

- **Page long lists** with `Paging`, rather than loading everything into the browser.
- **Sort and aggregate on the server**: pass `sort` to `find`, and build totals and breakdowns with `ODSLaggregate`. Sorting one page in the browser gives the wrong order across pages.
- **Project only the fields you show**, so requests stay small.
- **Show the reason when a request fails.** The error a failed request throws includes the platform's reason.

---

## The house style

`#insight-report-style` gives pages the look of the rest of the portal:

| Classes | For |
|-|-|
| `controls-container`, `controls`, `filter-picker` | The header with the title and filters |
| `top-bar`, `kpi-cards`, `kpi-card` (`primary`, `positive`, `negative`, `watch`), `pager-row` | Summary figures and the pager, at the top |
| `tab-bar`, `tab-btn` | Tabs within a page |
| `section`, `card-block` | Panels with an `h3` heading |
| A plain `table`, with `num`, `id` and `message-cell` cells | Tables of results |
| `badge` (`pos`, `neg`, `watch`) | Statuses |

Use its colour variables, such as `var(--primary)`, `var(--positive)` and `var(--negative)`, in your own style partial rather than fixed colours, and prefix your own classes with a short code for the extension.

---

## The helpers partial

Give the extension one JavaScript helper object, defined in its `.common` partial and included by every page, rather than repeating code in each page:

```js
<script>
const POS = (function () {
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text == null ? '' : String(text);
        return div.innerHTML;
    }
    function fmtNumber(v, dp) {
        return v == null ? '' : Number(v).toLocaleString(undefined, { minimumFractionDigits: dp || 0, maximumFractionDigits: dp || 0 });
    }
    function setStatus(el, cls, text) { /* show a message in the page */ }
    return { escapeHtml, fmtNumber, setStatus };
})();
</script>
```

**Escape every value that comes from a record** before you put it in the page.

---

## Mustache rules

The platform renders every page with Mustache before the browser sees it, so anything that looks like a Mustache tag is processed, wherever it is:

- **Never write two opening braces in a row in your JavaScript**, even inside a string. Mustache reads them as a tag and the text disappears. Build the text from single characters instead.
- **Use Mustache comments for notes in a page**, never HTML comments containing Mustache tags: an include tag inside an HTML comment still includes the partial.
- **Only the view's own data is available to Mustache tags.** Load everything else with the data API in the script.

---

## Reusing a component

A component used by several extensions, such as the Fusion AI chat, is written as a partial configured by a `window` object set before it is included. See [Using the chat in your own extension](/docs/extensions/fusion-ai/administration#using-the-chat-in-your-own-extension).

---

## Checking a page

- Validate the script before saving it: VS Code reports Mustache errors, and Fusion AI checks pages with its `validate_script` tool.
- Open the view in the portal and check the browser's developer console for errors.
- Try it as a user with fewer permissions, to check what they see when a request is refused.
