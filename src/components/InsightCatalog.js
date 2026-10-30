import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
// Same card look as the Extensions overview
import styles from './ExtensionCatalog.module.css';

// Cards for every insight report page in docs/public/insights.
// The list is built at build time by plugins/insight-catalog.
function InsightCard({insight}) {
  const image = useBaseUrl(insight.image || '');
  return (
    <Link to={insight.url} className={styles.card}>
      <div className={styles.shot}>
        {insight.image ? (
          <img src={image} alt={`The ${insight.title} report`} loading="lazy" />
        ) : (
          <span className={styles.noshot}>{insight.title}</span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{insight.title}</h3>
        <p className={styles.summary}>{insight.summary}</p>
        <span className={styles.more}>Read about this report</span>
      </div>
    </Link>
  );
}

export default function InsightCatalog() {
  const {insights = []} = usePluginData('insight-catalog') || {};
  if (!insights.length) return <p>No insight reports are documented yet.</p>;
  return (
    <div className={styles.grid}>
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  );
}

export function InsightCount() {
  const {insights = []} = usePluginData('insight-catalog') || {};
  return <>{insights.length}</>;
}
