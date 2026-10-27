/**
 * extension-catalog
 *
 * Builds the list of extensions shown on the Extensions overview page
 * (docs/extensions/index.mdx) by scanning docs/extensions at build time.
 *
 * Every folder under docs/extensions that has an overview page is listed:
 *   - name and summary  : label and link.description in the folder's _category_.json
 *   - link              : the overview page's slug (or its path)
 *   - screenshot        : the overview's first image, or front matter `catalog_image`
 *   - order             : alphabetical, or front matter `catalog_position`
 *
 * The overview page is the doc with sidebar_position 1 (normally 01-overview.md).
 * To leave a folder out (for example Building extensions), add
 *   "customProps": { "catalog": false }
 * to its _category_.json. Optional overrides in the overview front matter:
 *   catalog_title, catalog_summary, catalog_image, catalog_position
 *
 * New extension folders are picked up automatically on the next start or build,
 * and while `npm start` is running.
 */
const fs = require('fs');
const path = require('path');
const {DEFAULT_PARSE_FRONT_MATTER} = require('@docusaurus/utils');

const DOCS_BASE = '/docs';

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return {};
  }
}

function firstImage(content) {
  const md = content.match(/!\[[^\]]*\]\(\s*([^)\s]+)[^)]*\)/);
  if (md) return md[1];
  const html = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return html ? html[1] : null;
}

function firstParagraph(content) {
  const blocks = content
    .replace(/^import .*$/gm, '')
    .split(/\r?\n\s*\r?\n/)
    .map((b) => b.trim())
    .filter((b) => b && !/^(#|!\[|<|\||-|\*|```|:::)/.test(b));
  return blocks.length ? blocks[0].replace(/\*\*/g, '').replace(/\s+/g, ' ') : '';
}

async function findOverview(dir) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_'))
    .sort();
  let fallback = null;
  for (const f of files) {
    const filePath = path.join(dir, f);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const {frontMatter, content} = await DEFAULT_PARSE_FRONT_MATTER({filePath, fileContent});
    const entry = {file: f, frontMatter, content};
    if (String(frontMatter.sidebar_position) === '1') return entry;
    if (!fallback && /^0?1[-_]/.test(f)) fallback = entry;
  }
  return fallback;
}

function docUrl(folder, overview) {
  const slug = overview.frontMatter.slug;
  if (slug) return DOCS_BASE + (slug.startsWith('/') ? slug : `/extensions/${folder}/${slug}`);
  const name = overview.file.replace(/\.mdx?$/, '').replace(/^\d+[-_]/, '');
  return `${DOCS_BASE}/extensions/${folder}/${overview.frontMatter.id || name}`;
}

module.exports = function extensionCatalog(context) {
  const extDir = path.join(context.siteDir, 'docs', 'extensions');
  return {
    name: 'extension-catalog',

    getPathsToWatch() {
      return [path.join(extDir, '**', '*.{md,mdx,json}')];
    },

    async loadContent() {
      if (!fs.existsSync(extDir)) return [];
      const items = [];
      for (const folder of fs.readdirSync(extDir).sort()) {
        const dir = path.join(extDir, folder);
        if (!fs.statSync(dir).isDirectory()) continue;
        const category = readJson(path.join(dir, '_category_.json'));
        if (category.customProps && category.customProps.catalog === false) continue;
        const overview = await findOverview(dir);
        if (!overview) continue;
        const fm = overview.frontMatter;
        items.push({
          id: folder,
          title: fm.catalog_title || category.label || fm.title || folder,
          summary:
            fm.catalog_summary ||
            (category.link && category.link.description) ||
            fm.description ||
            firstParagraph(overview.content),
          image: fm.catalog_image || firstImage(overview.content),
          url: docUrl(folder, overview),
          position: fm.catalog_position != null ? Number(fm.catalog_position) : null,
        });
      }
      items.sort((a, b) => {
        if (a.position != null && b.position != null) return a.position - b.position;
        if (a.position != null) return -1;
        if (b.position != null) return 1;
        return a.title.localeCompare(b.title);
      });
      return items;
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({extensions: content});
    },
  };
};
