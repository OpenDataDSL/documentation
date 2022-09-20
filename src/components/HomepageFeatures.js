import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const AboutList = [
  {
    title: 'Our Story',
    jpg: require('../../static/img/home/our-story.png').default,
    description: (
      <>
        After many years of building and using data management systems, 
        we condensed all this knowledge into a domain specific language 
        which encapsulates all aspects of data management in a simple and intuitive way.
      </>
    )
  },
  {
    title: 'Our Vision',
    jpg: require('../../static/img/home/our-vision.png').default,
    description: (
      <>
        Our vision is to make high quality, flexible and low cost data modelling, 
        management and reporting for all sizes of businesses and all types of markets.
      </>
    )
  },
  {
    title: 'Our Technology',
    jpg: require('../../static/img/home/our-technology.png').default,
    description: (
      <>
        As a cloud SAAS company, we leverage elastic scaling and serverless technology 
        to provide high quality, high performance, world scale software and services.
      </>
    )
  }
]

const FeatureList = [
  {
    title: 'Easy to Use',
    jpg: require('../../static/img/home/easy-to-use.png').default,
    description: (
      <>
        OpenDataDSL was designed from the ground up to be a Software As A Service (SAAS) 
        product, always up-to-date and easy-to-install software.
      </>
    ),
    link: "easy-to-use"
  },
  {
    title: 'Make It Yours',
    jpg: require('../../static/img/home/make-it-yours.png').default,
    description: (
      <>
        Build applications using our APIs and customise the portal with your own domain, logo and colours to
        make it your own.
      </>
    ),
    link: "make-it-yours"
  },
  {
    title: 'Big Savings',
    jpg: require('../../static/img/home/big-savings.png').default,
    description: (
      <>
        In OpenDataDSL you only pay for what you use with a generous FREE monthly allowance.
      </>
    ),
    link: "big-savings"
  },
  {
    title: 'Focus on What Matters',
    jpg: require('../../static/img/home/focus-on-data.png').default,
    description: (
      <>
        Moving your data management to OpenDataDSL allows you to focus on the important things that add value to your business.
      </>
    ),
    link: "focus-on-what-matters"
  },
  {
    title: 'Any Data Anywhere',
    jpg: require('../../static/img/home/data-anywhere.png').default,
    description: (
      <>
        Create 'real-world' data structures, add geo-tagging and use
        machine-learning to enrich and automate your data.
      </>
    ),
    link: "any-data-anywhere"
  },
  {
    title: 'Secure',
    jpg: require('../../static/img/home/secure.png').default,
    description: (
      <>
        Use your own Azure Active Directory to authenticate your users and
        secure your data.
      </>
    ),
    link: "secure"
  },
];

function Feature({jpg, title, description, link}) {
  var result;
  if (jpg) {
    result = (
      <div className={clsx('col col--4')}>
        <a href={link}>
          <div className="text--center">
            <img src={jpg} className={styles.featureSvg} alt={title} />
          </div>
        </a>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  } else {
    result = (
      <div className={clsx('col col--4')}>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }
  return result;
}

export function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomepageAbout() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {AboutList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

