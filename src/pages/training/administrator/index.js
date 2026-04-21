import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const TRACKS = [
  {
    id: 'environments',
    label: 'Environments & Setup',
    color: '#a78bfa',
    description: 'Create and manage environments, configure tenant settings, and onboard users.',
    modules: [
      { number: '01', title: 'Tenant Overview', description: 'Understand the tenant model — environments, users, roles, and resource isolation.', href: '/training/administrator/tenant-overview', tags: ['Concepts'], status: 'available' },
      { number: '02', title: 'Managing Environments', description: 'Create test and production environments, manage access, and promote configurations.', href: '/training/administrator/environments', tags: ['Portal', 'Environments'], status: 'coming-soon' },
      { number: '03', title: 'Users & Groups', description: 'Invite users, assign roles, and manage group-based access control.', href: '/training/administrator/users', tags: ['Portal', 'Security'], status: 'coming-soon' },
    ],
  },
  {
    id: 'security',
    label: 'Security & Policies',
    color: '#f43f5e',
    description: 'Define access policies, manage secrets, and enforce data governance.',
    modules: [
      { number: '04', title: 'Policies & Permissions', description: 'Create fine-grained access policies for data services and platform features.', href: '/training/administrator/policies', tags: ['Security', 'Policies'], status: 'coming-soon' },
      { number: '05', title: 'Secrets Management', description: 'Store API keys, credentials, and connection strings securely in the secrets service.', href: '/training/administrator/secrets', tags: ['Security', 'Secrets'], status: 'coming-soon' },
      { number: '06', title: 'Audit & Compliance', description: 'Review the audit log, track changes to data and configuration, and export records.', href: '/training/administrator/audit', tags: ['Portal', 'Compliance'], status: 'coming-soon' },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations & Operations',
    color: '#fb923c',
    description: 'Connect external systems, manage queues, and keep the platform healthy.',
    modules: [
      { number: '07', title: 'Connections & Extractors', description: 'Configure FTP, HTTP, Azure, and S3 connections for automated data ingestion.', href: '/training/administrator/connections', tags: ['Integration', 'ETL'], status: 'coming-soon' },
      { number: '08', title: 'Queue Management', description: 'Monitor message queues, replay failed messages, and configure dead-letter handling.', href: '/training/administrator/queues', tags: ['Operations', 'Queues'], status: 'coming-soon' },
      { number: '09', title: 'Process Monitoring', description: 'Review execution logs, diagnose automation failures, and manage scheduled processes.', href: '/training/administrator/processes', tags: ['Portal', 'Operations'], status: 'coming-soon' },
      { number: '10', title: 'Metrics & Health', description: 'Track platform metrics, API usage, and tenant resource consumption.', href: '/training/administrator/metrics', tags: ['Portal', 'Metrics'], status: 'coming-soon' },
    ],
  },
  {
    id: 'tutorials',
    label: 'Official Tutorials',
    color: '#34d399',
    description: 'Integration, environments, API, and MongoDB tutorials from the OpenDataDSL documentation site.',
    externalNote: 'Hosted on doc.opendatadsl.com',
    modules: [
      { number: 'T1', title: 'Working with Data Environments', description: 'A detailed tutorial on creating and using data environments for isolation and promotion.', href: 'https://doc.opendatadsl.com/docs/tutorials/workingenvironments', tags: ['Environments'], status: 'coming-soon' },
      { number: 'T2', title: 'Custom Local SQL Server Loader', description: 'Subscribe to data updates in OpenDataDSL and load them into a local SQL Server database.', href: 'https://doc.opendatadsl.com/docs/tutorials/localsqlserver', tags: ['Integration', 'SQL Server'], status: 'coming-soon' },
      { number: 'T3', title: 'QuickStart API Developer', description: 'Security, authentication, and service deep-dives for building applications on the OpenDataDSL API.', href: 'https://doc.opendatadsl.com/docs/tutorials/qs/api', tags: ['API', 'Security'], status: 'coming-soon' },
      { number: 'T4', title: 'QuickStart MongoDB User', description: 'Connect to MongoDB, model data, load, search, aggregate, and manage data quality.', href: 'https://doc.opendatadsl.com/docs/tutorials/qs/mongodb', tags: ['MongoDB', 'Integration'], status: 'coming-soon' },
      { number: 'T5', title: 'Subscribing to Data', description: 'Set up subscriptions to receive notifications when data changes in the platform.', href: 'https://doc.opendatadsl.com/docs/category/subscribing', tags: ['Integration', 'Queues'], status: 'coming-soon' },
    ],
  },
];

const STATS = [
  { value: '4', label: 'Learning Tracks' },
  { value: '1', label: 'Available Module' },
  { value: '5', label: 'Official Tutorials' },
  { value: '~5h', label: 'Total Duration' },
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

export default function AdminTrainingHome() {
  return (
    <Layout title="Administrator Training" description="OpenDataDSL administrator training — environments, security, integrations, and operations.">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroInner}>
            <Link to="/training" className={styles.breadcrumb}>← All Tracks</Link>
            <div className={styles.heroEyebrow}>Administrator Track</div>
            <h1 className={styles.heroTitle}>Tenant Admin & Platform Owner Training</h1>
            <p className={styles.heroSubtitle}>Configure environments, manage users and policies, connect external systems, and maintain platform health. Includes official integration and API tutorials from the OpenDataDSL documentation site.</p>
            <div className={styles.statsRow}>
              {STATS.map(s => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.heroActions}>
              <Link className={styles.btnPrimary} to="/training/administrator/tenant-overview">Start Learning</Link>
              <Link className={styles.btnSecondary} to="/training">All Tracks</Link>
            </div>
          </div>
        </header>
        <div className={styles.prereqBanner}>
          <span className={styles.prereqIcon}>⚙</span>
          <span><strong>Before you begin:</strong> You need administrator access to an OpenDataDSL tenant. Familiarity with identity management and cloud platform concepts is helpful but not required.</span>
        </div>
        <div className={styles.tracks}>
          {TRACKS.map(track => <TrackSection key={track.id} track={track} />)}
        </div>
      </main>
    </Layout>
  );
}
