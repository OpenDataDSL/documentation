import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './ExtensionsBanner.module.css';

// Clickable banner on the documentation home page that opens the Extensions overview.
// The names underneath come from plugins/extension-catalog, so they stay current.
export default function ExtensionsBanner() {
  const {extensions = []} = usePluginData('extension-catalog') || {};
  const image = useBaseUrl('/img/extensions/extensions-banner.png');
  return (
    <div className={styles.wrap}>
      <Link to="/docs/extensions" className={styles.banner} aria-label="Explore the OpenDataDSL extensions">
        <img src={image} alt="OpenDataDSL extensions: ready-made apps for the portal and the Excel add-in" />
      </Link>
      {extensions.length > 0 && (
        <p className={styles.names}>
          {extensions.length} extensions:{' '}
          {extensions.map((ext, i) => (
            <React.Fragment key={ext.id}>
              {i > 0 && ', '}
              <Link to={ext.url}>{ext.title}</Link>
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
  );
}
