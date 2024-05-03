const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'OpenDataDSL - Smart SAAS Data Management',
  tagline: 'A real-world solution for getting your DATA and PROCESSES in the CLOUD',
  url: 'https://www.opendatadsl.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'OpenDataDSL', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.
  themeConfig: {
    colorMode: { disableSwitch: true},
    navbar: {
      title: 'OpenDataDSL',
      logo: {
        alt: 'OpenDataDSL Logo',
        src: 'img/logo.png',
      },
      items: [
        {type: 'doc', docId: 'home',position: 'left',label: 'Getting Started'},
        {href: 'https://opendatadsl.com', label: 'Web site', position: 'left'},
        {href: 'https://portal.opendatadsl.com', label: 'Portal', position: 'left'}
      ],
    },
    metadata: [{name: 'keywords', content: 'smart, smart curves, forward curves, market data, commodity, energy, timeseries, data management, blog'}],
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} OpenDataDSL Ltd.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java'],
    },
    algolia: {
      apiKey: 'a8b0e275e6e4c02b53e5dffadd88e2c7',
      indexName: 'website',

      // Optional: see doc section below
      contextualSearch: false,

      // Optional: see doc section below
      appId: 'GNGE5W5WZ3',

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {trackingID: 'G-BXX397L1KH'},
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          postsPerPage: 'ALL',
          showReadingTime: true,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
        }
      },
    ],
  ],
  scripts: [
    '/js/visitorqueue.js',
    'https://ipmeta.io/plugin.js',
    '/js/ipmeta.js',
    '/js/mc.js'
  ],
  stylesheets: [{
        rel: "dns-prefetch",
        href: "//t.visitorqueue.com",
        style: 'display: none !important;'
    },{
        rel: "stylesheet",
        href: "https://p.visitorqueue.com/styles/fc3243b6-c174-4cce-8a2a-99b8221faa22.css",
        type: 'text/css',
        id: 'vq_flick_styles'
    },{
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css",
        integrity: "sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We",
        crossorigin: "anonymous"
    }
  ]
};
