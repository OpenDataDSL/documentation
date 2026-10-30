/**
 * insight-catalog
 *
 * Builds the list of insight reports shown on the Insights overview page
 * (docs/public/insights/index.mdx) by scanning docs/public/insights at build time.
 *
 * Every page in docs/public/insights (one page per insight report) is listed,
 * except index.md / index.mdx:
 *   - name       : front matter `catalog_title`, else `title`
 *   - summary    : front matter `catalog_summary`, else `description`, else the first paragraph
 *   - screenshot : front matter `catalog_image`, else the page's first image
 *   - link       : the page's slug (or its path)
 *   - order      : alphabetical by name, or front matter `catalog_position`
 *
 * To leave a page out, add `catalog: false` to its front matter.
 * New pages are picked up automatically on the next start or build, and while
 * `npm start` is running. Same approach as plugins/extension-catalog.
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

function firstParagraph(content) {
  const blocks = content
    .replace(/^import .*$/gm, '')
    .split(/\r?\n\s*\r?\n/)
    .map((b) => b.trim())
    .filter((b) => b && !/^(#|!\[|<|\||-|\*|```|:::)/.test(b));
  return blocks.length ? blocks[0].replace(/\*\*/g, '').replace(/\s+/g, ' ') : '';
}

function docUrl(file, frontMatter) {
  const slug = frontMatter.slug;
  if (slug) return DOCS_BASE + (slug.startsWith('/') ? slug : `/public/insights/${slug}`);
  const name = file.replace(/\.mdx?$/, '').replace(/^\d+[-_]/, '');
  return `${DOCS_BASE}/public/insights/${frontMatter.id || name}`;
}

module.exports = function insightCatalog(context) {
  const dir = path.join(context.siteDir, 'docs', 'public', 'insights');
  return {
    name: 'insight-catalog',

    getPathsToWatch() {
      // Glob patterns need forward slashes (see plugins/extension-catalog)
      return [path.join(dir, '*.{md,mdx}').replace(/\\/g, '/')];
    },

    async loadContent() {
      if (!fs.existsSync(dir)) return [];
      const items = [];
      const files = fs
        .readdirSync(dir)
        .filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_') && !/^index\.mdx?$/.test(f))
        .sort();
      for (const file of files) {
        const filePath = path.join(dir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const {frontMatter: fm, content} = await DEFAULT_PARSE_FRONT_MATTER({filePath, fileContent});
        if (fm.catalog === false) continue;
        const title = fm.catalog_title || fm.title || file.replace(/\.mdx?$/, '');
        items.push({
          id: file.replace(/\.mdx?$/, ''),
          title: title,
          summary: fm.catalog_summary || fm.description || firstParagraph(content),
          image: fm.catalog_image || firstImage(content),
          url: docUrl(file, fm),
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
      actions.setGlobalData({insights: content});
    },
  };
};
