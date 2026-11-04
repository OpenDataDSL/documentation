import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './ExtensionCatalog.module.css';

// Cards for the plug-ins of one extension, from docs/extensions/<extension>/plugins.
// The lists are built at build time by plugins/plugin-catalog.
// Usage in an mdx page: <PluginCatalog extension="integration" />
function PluginCard({plugin}) {
  const image = useBaseUrl(plugin.image || '');
  return (
    <Link to={plugin.url} className={styles.card}>
      <div className={styles.shot}>
        {plugin.image ? (
          <img src={image} alt={`The ${plugin.title}`} loading="lazy" />
        ) : (
          <span className={styles.noshot}>{plugin.title}</span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{plugin.title}</h3>
        {plugin.pluginId && <code className={styles.pluginId}>{plugin.pluginId}</code>}
        <p className={styles.summary}>{plugin.summary}</p>
        {plugin.sends.length > 0 && (
          <div className={styles.tags}>
            {plugin.sends.map((s) => (
              <span key={s} className={styles.tag}>{s}</span>
            ))}
          </div>
        )}
        <span className={styles.more}>Read the guide</span>
      </div>
    </Link>
  );
}

export default function PluginCatalog({extension}) {
  const {plugins = {}} = usePluginData('plugin-catalog') || {};
  const list = plugins[extension] || [];
  return (
    <div className={styles.grid}>
      {list.map((p) => (
        <PluginCard key={p.id} plugin={p} />
      ))}
    </div>
  );
}

export function PluginCount({extension}) {
  const {plugins = {}} = usePluginData('plugin-catalog') || {};
  return <>{(plugins[extension] || []).length}</>;
}
