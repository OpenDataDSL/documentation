import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const TRACKS = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    color: '#4a9eff',
    description: 'Log in, navigate the portal, and find the data you need.',
    modules: [
      { number: '01', title: 'Portal Overview', description: 'Navigate the OpenDataDSL portal — menus, search, master data, and your workspace.', href: '/training/user/portal-overview', tags: ['Portal'], status: 'coming-soon' },
      { number: '02', title: 'Finding & Viewing Data', description: 'Search for objects, browse timeseries, and view forward curves in the portal.', href: '/training/user/viewing-data', tags: ['Portal', 'Data'], status: 'coming-soon' },
    ],
  },
  {
    id: 'excel',
    label: 'Excel Add-in',
    color: '#22c55e',
    description: 'Load, edit, and upload data — events, timeseries, and curves — directly from Excel.',
    modules: [
      { number: '03', title: 'Excel Add-in Setup', description: 'Install, authenticate, and configure the OpenDataDSL Excel Add-in.', href: '/training/user/excel-setup', tags: ['Excel'], status: 'available' },
      { number: '04', title: 'Working with Events in Excel', description: 'Download event lists, make changes, add new events, and upload back to the platform.', href: '/training/technical/events-excel', tags: ['Excel', 'Events'], status: 'available' },
      { number: '05', title: 'TimeSeries in Excel', description: 'Load timeseries data into Excel, analyse it, and upload revised values.', href: '/training/user/timeseries-excel', tags: ['Excel', 'TimeSeries'], status: 'coming-soon' },
    ],
  },
  {
    id: 'monitoring',
    label: 'Monitoring & Reporting',
    color: '#f59e0b',
    description: 'Track data delivery, review quality results, and work with reports.',
    modules: [
      { number: '06', title: 'Dataset Monitoring Dashboard', description: 'Read the dataset monitoring dashboard — completeness, quality, and delivery status.', href: '/training/user/dataset-dashboard', tags: ['Portal', 'Monitoring'], status: 'coming-soon' },
      { number: '07', title: 'Reports & Dashboards', description: 'Create and share reports from platform data using the portal report builder.', href: '/training/user/reports', tags: ['Portal', 'Reports'], status: 'coming-soon' },
      { number: '08', title: 'Alerts & Notifications', description: 'Subscribe to alerts for data delivery failures and quality issues.', href: '/training/user/alerts', tags: ['Portal', 'Alerts'], status: 'coming-soon' },
    ],
  },
  {
    id: 'tutorials',
    label: 'Official Tutorials',
    color: '#fb923c',
    description: 'Topic-specific tutorials from the OpenDataDSL documentation site covering reports, searching, and reference tools.',
    externalNote: 'Hosted on doc.opendatadsl.com',
    modules: [
      { number: 'T1', title: 'Getting Started with Reports', description: 'Build and share reports from platform data in the portal.', href: 'https://doc.opendatadsl.com/docs/tutorials/reports-getting-started', tags: ['Portal', 'Reports'], status: 'coming-soon' },
      { number: 'T2', title: 'Searching using the find Command', description: 'Understand how to find and filter data across all platform services.', href: 'https://doc.opendatadsl.com/docs/tutorials/searching', tags: ['Portal', 'Search'], status: 'coming-soon' },
      { number: 'T3', title: 'SQL Cheatsheet', description: 'A quick-reference guide for SQL users mapping familiar concepts to OpenDataDSL.', href: 'https://doc.opendatadsl.com/docs/tutorials/sql_cheatsheet', tags: ['Reference', 'SQL'], status: 'coming-soon' },
      { number: 'T4', title: 'Working with TimeSeries', description: 'Explore timeseries data in the OpenDataDSL language and portal.', href: 'https://doc.opendatadsl.com/docs/tutorials/workingtimeseries', tags: ['TimeSeries'], status: 'coming-soon' },
    ],
  },
];

const STATS = [
  { value: '4', label: 'Learning Tracks' },
  { value: '2', label: 'Available Modules' },
  { value: '4', label: 'Official Tutorials' },
  { value: '~4h', label: 'Total Duration' },
];

function StatusBadge({ status }) {
  if (status === 'available') return null;
  return <span className={styles.badge} data-status={status}>Coming Soon</span>;
}

function ModuleCard({ mod }) {
  const isAvailable = mod.status === 'available' || mod.status === 'external';
  const CardWrapper = isAvailable ? Link : 'div';
  const props = isAvailable
    ? { to: mod.href, className: styles.moduleCard }
    : { className: `${styles.moduleCard} ${styles.moduleCardDisabled}` };
  return (
    <CardWrapper {...props}>
      <div className={styles.moduleNumber}>{mod.number}</div>
      <div className={styles.moduleBody}>
        <div className={styles.moduleTitleRow}>
          <h3 className={styles.moduleTitle}>{mod.title}</h3>
          <StatusBadge status={mod.status} />
        </div>
        <p className={styles.moduleDesc}>{mod.description}</p>
        <div className={styles.moduleTags}>{mod.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
      </div>
      {isAvailable && <div className={styles.moduleArrow}>→</div>}
    </CardWrapper>
  );
}

function TrackSection({ track }) {
  return (
    <section className={styles.track}>
      <div className={styles.trackHeader}>
        <span className={styles.trackPill} style={{ '--track-color': track.color }}>{track.label}</span>
        <p className={styles.trackDesc}>{track.description}</p>
      </div>
      <div className={styles.moduleGrid}>
        {track.modules.map(mod => <ModuleCard key={mod.number} mod={mod} />)}
      </div>
    </section>
  );
}

export default function UserTrainingHome() {
  return (
    <Layout title="User Training" description="OpenDataDSL user training — portal, Excel Add-in, monitoring, and reports.">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroInner}>
            <Link to="/training" className={styles.breadcrumb}>← All Tracks</Link>
            <div className={styles.heroEyebrow}>User Track</div>
            <h1 className={styles.heroTitle}>Business & Analyst User Training</h1>
            <p className={styles.heroSubtitle}>Navigate the portal, manage data with Excel, monitor datasets, and build reports — no coding required.</p>
            <div className={styles.statsRow}>
              {STATS.map(s => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.heroActions}>
              <Link className={styles.btnPrimary} to="/training/user/excel-setup">Start Learning</Link>
              <Link className={styles.btnSecondary} to="/training">All Tracks</Link>
            </div>
          </div>
        </header>
        <div className={styles.prereqBanner}>
          <span className={styles.prereqIcon}>⚙</span>
          <span><strong>Before you begin:</strong> You need access to an OpenDataDSL tenant and Microsoft Excel with the OpenDataDSL Add-in installed. No coding experience is required.</span>
        </div>
        <div className={styles.tracks}>
          {TRACKS.map(track => <TrackSection key={track.id} track={track} />)}
        </div>
      </main>
    </Layout>
  );
}
