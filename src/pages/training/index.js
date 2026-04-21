import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const TRACKS = [
  {
    id: 'technical',
    href: '/training/technical',
    color: '#00c2a8',
    colorRgb: '0,194,168',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 9l5 5-5 5M13 19h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Technical',
    audience: 'Developers & Data Engineers',
    description: 'Build data workflows in ODSL — events, timeseries, smart curves, quality checks, and automation. Hands-on scripting from day one.',
    modules: 12,
    available: 8,
    duration: '~8 hours',
    highlights: ['ODSL scripting', 'EventTimeSeries', 'SmartTimeSeries', 'Quality checks', 'Automations', 'ETRM integration'],
  },
  {
    id: 'user',
    href: '/training/user',
    color: '#4a9eff',
    colorRgb: '74,158,255',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'User',
    audience: 'Business & Analyst Users',
    description: 'Navigate the portal, manage data with Excel, monitor datasets, and build reports — no coding required.',
    modules: 8,
    available: 2,
    duration: '~4 hours',
    highlights: ['Portal navigation', 'Excel Add-in', 'Data browsing', 'Dataset monitoring', 'Reports & dashboards', 'Alerts'],
  },
  {
    id: 'administrator',
    href: '/training/administrator',
    color: '#a78bfa',
    colorRgb: '167,139,250',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3M6.93 6.93l2.12 2.12M18.95 18.95l2.12 2.12M6.93 21.07l2.12-2.12M18.95 9.05l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Administrator',
    audience: 'Tenant Admins & Platform Owners',
    description: 'Configure environments, manage users and policies, connect external systems, and maintain platform health.',
    modules: 10,
    available: 1,
    duration: '~5 hours',
    highlights: ['Environments', 'Users & policies', 'Secrets & connections', 'Audit & compliance', 'Integrations', 'Tenant management'],
  },
];

function TrackCard({ track }) {
  return (
    <Link to={track.href} className={styles.trackCard} style={{ '--tc': track.color, '--tc-rgb': track.colorRgb }}>
      <div className={styles.tcTop}>
        <div className={styles.tcIcon}>{track.icon}</div>
        <div className={styles.tcMeta}>
          <span className={styles.tcLabel}>{track.label}</span>
          <span className={styles.tcAudience}>{track.audience}</span>
        </div>
        <div className={styles.tcArrow}>→</div>
      </div>
      <p className={styles.tcDesc}>{track.description}</p>
      <div className={styles.tcStats}>
        <span><strong>{track.available}</strong> available</span>
        <span className={styles.tcDot} />
        <span><strong>{track.modules}</strong> modules total</span>
        <span className={styles.tcDot} />
        <span>{track.duration}</span>
      </div>
      <div className={styles.tcHighlights}>
        {track.highlights.map(h => <span key={h} className={styles.tcTag}>{h}</span>)}
      </div>
    </Link>
  );
}

export default function TrainingIndex() {
  return (
    <Layout title="Training" description="OpenDataDSL training — choose your track.">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>OpenDataDSL</div>
            <h1 className={styles.heroTitle}>Training Centre</h1>
            <p className={styles.heroSub}>
              Structured learning paths for every role — from hands-on developers
              to business users and platform administrators.
              Choose the track that matches your role to get started.
            </p>
          </div>
        </header>
        <div className={styles.cards}>
          {TRACKS.map(t => <TrackCard key={t.id} track={t} />)}
        </div>
        <div className={styles.footer}>
          <p>Not sure where to start? Begin with <Link to="/training/technical/core-concepts">Core Concepts</Link> — it covers the platform model that all three tracks build on.</p>
        </div>
      </main>
    </Layout>
  );
}
