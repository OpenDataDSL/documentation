import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const TRACKS = [
  {
    id: 'foundations',
    label: 'Foundations',
    color: '#00c2a8',
    description: 'Core concepts, data model, and your first hands-on exercises with events and timeseries.',
    modules: [
      { number: '01', title: 'Core Concepts', description: 'The OpenDataDSL data model — objects, services, events, timeseries, datasets, and quality checks.', href: '/training/technical/core-concepts', tags: ['Concepts'], status: 'available' },
      { number: '02', title: 'Working with Events in ODSL', description: 'Create a training environment, define event types, add and update events using ODSL scripts.', href: '/training/technical/events-odsl', tags: ['ODSL', 'Events'], status: 'available' },
      { number: '03', title: 'Working with Events in Excel', description: 'Download, edit, and upload events using the OpenDataDSL Excel Add-in.', href: '/training/technical/events-excel', tags: ['Excel', 'Events'], status: 'available' },
    ],
  },
  {
    id: 'timeseries',
    label: 'TimeSeries',
    color: '#4a9eff',
    description: 'Build derived timeseries from events and apply currency and unit conversions.',
    modules: [
      { number: '04', title: 'Creating EventTimeSeries', description: 'Build EventTimeSeries from event lists with filters and custom index fields.', href: '/training/technical/event-timeseries', tags: ['ODSL', 'TimeSeries'], status: 'available' },
      { number: '05', title: 'Smart TimeSeries', description: 'Apply currency and unit conversions using expression-based SmartTimeSeries.', href: '/training/technical/smart-timeseries', tags: ['ODSL', 'SmartTimeSeries'], status: 'available' },
      { number: '06', title: 'Forward Curves', description: 'Construct and manage forward curves from event data and Smart Curve expressions.', href: '/training/technical/forward-curves', tags: ['ODSL', 'Curves'], status: 'coming-soon' },
    ],
  },
  {
    id: 'data-quality',
    label: 'Data Quality',
    color: '#f59e0b',
    description: 'Configure dataset monitoring, write quality check functions, and track daily data delivery.',
    modules: [
      { number: '07', title: 'Dataset Monitoring', description: 'Configure datasets in the portal to track expected daily delivery and completeness.', href: '/training/technical/dataset-monitoring', tags: ['Portal', 'Monitoring'], status: 'available' },
      { number: '08', title: 'Quality Checks in ODSL', description: 'Write quality and critical check functions and attach them to a dataset.', href: '/training/technical/quality-checks', tags: ['ODSL', 'Quality'], status: 'available' },
      { number: '09', title: 'Alerts & Notifications', description: 'Configure alerts for delivery failures and quality check violations.', href: '/training/technical/alerts', tags: ['Portal', 'Alerts'], status: 'coming-soon' },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    color: '#a78bfa',
    description: 'Schedule data loads, automate curve builds, and integrate with external systems.',
    modules: [
      { number: '10', title: 'Introduction to Automations', description: 'Create and schedule automations to trigger scripts and data workflows.', href: '/training/technical/automations', tags: ['Portal', 'Automations'], status: 'coming-soon' },
      { number: '11', title: 'Loading External Data', description: 'Use extractors and transformers to load data from FTP, HTTP, and cloud storage.', href: '/training/technical/loading-data', tags: ['ODSL', 'ETL'], status: 'coming-soon' },
      { number: '12', title: 'ETRM Integration', description: 'Map data identities to downstream ETRM systems using data identities.', href: '/training/technical/etrm-integration', tags: ['Integration', 'ETRM'], status: 'coming-soon' },
    ],
  },
  {
    id: 'quickstart',
    label: 'QuickStart Developer',
    color: '#34d399',
    description: 'A fast-paced track covering all aspects of ODSL development — from language basics through to ETL and automation.',
    modules: [
      { number: 'QS1', title: 'ODSL Code Basics', description: 'Variables, looping, conditional statements and testing.', href: '/training/technical/qs-basics', tags: ['ODSL', 'Basics'], status: 'available' },
      { number: 'QS2', title: 'Variable Types', description: 'Scalars, dates, durations, calendars, timeseries, curves, and custom types.', href: '/training/technical/qs-variables', tags: ['ODSL', 'Types'], status: 'available' },
      { number: 'QS3', title: 'Functions', description: 'Built-in string, date, list, statistical, and curve functions. Writing your own.', href: '/training/technical/qs-functions', tags: ['ODSL', 'Functions'], status: 'available' },
      { number: 'QS4', title: 'Services', description: 'Active variables, variable services, remote services, and external data services.', href: '/training/technical/qs-services', tags: ['ODSL', 'Services'], status: 'available' },
      { number: 'QS5', title: 'Searching', description: 'Finding and filtering data, unique values, profiles, and geo-spatial queries.', href: '/training/technical/qs-searching', tags: ['ODSL', 'Search'], status: 'available' },
      { number: 'QS6', title: 'Data', description: 'Creating, saving, and updating TimeSeries and Curve data.', href: '/training/technical/qs-data', tags: ['ODSL', 'TimeSeries'], status: 'available' },
      { number: 'QS7', title: 'Analysis', description: 'Aggregation pipelines, distinct queries, and statistical functions.', href: '/training/technical/qs-analysis', tags: ['ODSL', 'Analytics'], status: 'available' },
      { number: 'QS8', title: 'ETL', description: 'Extracting from URLs and files, transforming with pipelines, loading via batch.', href: '/training/technical/qs-etl', tags: ['ODSL', 'ETL'], status: 'available' },
      { number: 'QS9', title: 'Automation', description: 'Workflows, actions, phases, processes, and cron scheduling.', href: '/training/technical/qs-automation', tags: ['ODSL', 'Automation'], status: 'available' },
    ],
  },
  {
    id: 'general',
    label: 'General Tutorials',
    color: '#fb923c',
    description: 'Topic-specific tutorials covering tooling, environments, searching, timeseries, and smart curves.',
    modules: [
      { number: 'GT1', title: 'Running ODSL Code', description: 'All the ways to run code in VS Code — full script, region, and selected text.', href: '/training/technical/gt-running-code', tags: ['ODSL', 'Tooling'], status: 'available' },
      { number: 'GT2', title: 'Working with Data Environments', description: 'Creating, switching, listing, and deleting data environments.', href: '/training/technical/gt-environments', tags: ['ODSL', 'Environments'], status: 'available' },
      { number: 'GT3', title: 'Smart Curves', description: 'Creating, testing, and chaining Smart Curves with single and multiple inputs.', href: '/training/technical/gt-smart-curves', tags: ['ODSL', 'Curves'], status: 'available' },
      { number: 'GT4', title: 'Searching with the find Command', description: 'Full syntax reference and service-by-service examples for the find command.', href: '/training/technical/gt-searching', tags: ['ODSL', 'Search'], status: 'available' },
      { number: 'GT5', title: 'Working with TimeSeries', description: 'Calendars, observations, statuses, saving, and reading back timeseries data.', href: '/training/technical/gt-timeseries', tags: ['ODSL', 'TimeSeries'], status: 'available' },
    ],
  },
];

const STATS = [
  { value: '6', label: 'Learning Tracks' },
  { value: '8', label: 'Core Modules' },
  { value: '9', label: 'QuickStart Modules' },
  { value: '5', label: 'General Tutorials' },
];

function StatusBadge({ status }) {
  if (status === 'available') return null;
  return <span className={styles.badge} data-status={status}>Coming Soon</span>;
}

function ModuleCard({ mod }) {
  const isAvailable = mod.status === 'available';
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

export default function TechnicalTrainingHome() {
  return (
    <Layout title="Technical Training" description="OpenDataDSL technical training — ODSL scripting, timeseries, quality checks, and automation.">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroInner}>
            <Link to="/training" className={styles.breadcrumb}>← All Tracks</Link>
            <div className={styles.heroEyebrow}>Technical Track</div>
            <h1 className={styles.heroTitle}>Developer & Data Engineer Training</h1>
            <p className={styles.heroSubtitle}>Hands-on scripting with the ODSL language — build event workflows, timeseries, smart curves, quality checks, and automated data pipelines. Includes the full QuickStart Developer track and general tutorials.</p>
            <div className={styles.statsRow}>
              {STATS.map(s => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.heroActions}>
              <Link className={styles.btnPrimary} to="/training/technical/core-concepts">Start Learning</Link>
              <Link className={styles.btnSecondary} to="/training">All Tracks</Link>
            </div>
          </div>
        </header>
        <div className={styles.prereqBanner}>
          <span className={styles.prereqIcon}>⚙</span>
          <span><strong>Before you begin:</strong> You need access to an OpenDataDSL tenant, the VS Code extension or web IDE, and Microsoft Excel with the OpenDataDSL Add-in installed.</span>
        </div>
        <div className={styles.tracks}>
          {TRACKS.map(track => <TrackSection key={track.id} track={track} />)}
        </div>
      </main>
    </Layout>
  );
}
