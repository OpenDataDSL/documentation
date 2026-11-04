/**
 * plugin-catalog
 *
 * Builds the lists of plug-ins shown on an extension's Plug-ins landing page
 * (for example docs/extensions/integration/plugins/index.mdx) by scanning
 * docs/extensions/<extension>/plugins at build time.
 *
 * Every page in a plugins folder, apart from index.md(x) and files starting with _,
 * is one plug-in. A plug-in with several pages can be a sub-folder instead: its page
 * with sidebar_position 1 (or the first numbered file) is the one listed.
 *   - name     : front matter catalog_title, else title
 *   - summary  : front matter catalog_summary, else description
 *   - link     : the page's slug (or its path)
 *   - image    : front matter catalog_image, else the page's first image
 *   - id       : front matter plugin_id (the plug-in's extension id), shown on the card
 *   - sends    : front matter plugin_sends, a list shown as tags on the card
 *   - order    : front matter catalog_position, else alphabetical
 *
 * The data is keyed by the extension folder name:
 *   usePluginData('plugin-catalog').plugins.integration
 * New plug-in pages are picked up on the next start or build, and while `npm start` runs.
 */
const fs = require('fs');
const path = require('path');
const {DEFAULT_PARSE_FRONT_MATTER} = require('@docusaurus/utils');

const DOCS_BASE = '/docs';

function firstImage(content) {
  const md = content.match(/!\[[^\]]*\]\(\s*([^)\s]+)[^)]*\)/);
  if (md) return md[1];
  const html = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return html ? html[1] : null;
}

async function readDoc(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const {frontMatter, content} = await DEFAULT_PARSE_FRONT_MATTER({filePath, fileContent});
  return {file: path.basename(filePath), frontMatter, content};
}

function isPage(f) {
  return /\.mdx?$/.test(f) && !f.startsWith('_') && !/^index\.mdx?$/.test(f);
}

async function folderOverview(dir) {
  const files = fs.readdirSync(dir).filter(isPage).sort();
  let fallback = null;
  for (const f of files) {
    const doc = await readDoc(path.join(dir, f));
    if (String(doc.frontMatter.sidebar_position) === '1') return doc;
    if (!fallback && /^0?1[-_]/.test(f)) fallback = doc;
  }
  return fallback;
}

function docUrl(relDir, doc) {
  const slug = doc.frontMatter.slug;
  if (slug) return DOCS_BASE + (slug.startsWith('/') ? slug : `/${relDir}/${slug}`);
  const name = doc.file.replace(/\.mdx?$/, '').replace(/^\d+[-_]/, '');
  return `${DOCS_BASE}/${relDir}/${doc.frontMatter.id || name}`;
}

function entry(id, relDir, doc) {
  const fm = doc.frontMatter;
  const sends = fm.plugin_sends;
  return {
    id,
    title: fm.catalog_title || fm.title || id,
    summary: fm.catalog_summary || fm.description || '',
    image: fm.catalog_image || firstImage(doc.content),
    url: docUrl(relDir, doc),
    pluginId: fm.plugin_id || null,
    sends: Array.isArray(sends) ? sends.map(String) : sends ? [String(sends)] : [],
    position: fm.catalog_position != null ? Number(fm.catalog_position) : null,
  };
}

function bySetOrder(a, b) {
  if (a.position != null && b.position != null) return a.position - b.position;
  if (a.position != null) return -1;
  if (b.position != null) return 1;
  return a.title.localeCompare(b.title);
}

module.exports = function pluginCatalog(context) {
  const extDir = path.join(context.siteDir, 'docs', 'extensions');
  return {
    name: 'plugin-catalog',

    getPathsToWatch() {
      return [path.join(extDir, '*', 'plugins', '**', '*.{md,mdx}').replace(/\\/g, '/')];
    },

    async loadContent() {
      const all = {};
      if (!fs.existsSync(extDir)) return all;
      for (const ext of fs.readdirSync(extDir).sort()) {
        const dir = path.join(extDir, ext, 'plugins');
        if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;
        const items = [];
        for (const f of fs.readdirSync(dir).sort()) {
          const p = path.join(dir, f);
          const relDir = `extensions/${ext}/plugins`;
          if (fs.statSync(p).isDirectory()) {
            const doc = await folderOverview(p);
            if (doc) items.push(entry(f, `${relDir}/${f}`, doc));
          } else if (isPage(f)) {
            const doc = await readDoc(p);
            if (doc.frontMatter.catalog === false) continue;
            items.push(entry(f.replace(/\.mdx?$/, '').replace(/^\d+[-_]/, ''), relDir, doc));
          }
        }
        items.sort(bySetOrder);
        all[ext] = items;
      }
      return all;
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({plugins: content});
    },
  };
};
