import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './ExtensionCatalog.module.css';

// Cards for every extension in docs/extensions.
// The list is built at build time by plugins/extension-catalog.
function ExtensionCard({ext}) {
  const image = useBaseUrl(ext.image || '');
  return (
    <Link to={ext.url} className={styles.card}>
      <div className={styles.shot}>
        {ext.image ? (
          <img src={image} alt={`The ${ext.title} extension`} loading="lazy" />
        ) : (
          <span className={styles.noshot}>{ext.title}</span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{ext.title}</h3>
        <p className={styles.summary}>{ext.summary}</p>
        <span className={styles.more}>Read the guide</span>
      </div>
    </Link>
  );
}

export default function ExtensionCatalog() {
  const {extensions = []} = usePluginData('extension-catalog') || {};
  return (
    <div className={styles.grid}>
      {extensions.map((ext) => (
        <ExtensionCard key={ext.id} ext={ext} />
      ))}
    </div>
  );
}

export function ExtensionCount() {
  const {extensions = []} = usePluginData('extension-catalog') || {};
  return <>{extensions.length}</>;
}
