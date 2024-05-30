import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import {HomepageFeatures, HomepageAbout} from '../components/HomepageFeatures';
import { Badge, Card, Container, Button, Col } from 'react-bootstrap';
import CookieConsent from "react-cookie-consent";

function Video() {
    return (
    <div className={styles.header}>
        <div className={styles.h_text_block}>
            <div className={styles.h_text_major}>
                <div className={styles.h_text_inner}>
                    <span>Welcome to the <span className={styles.h_text_highlight}>OpenDataDSL</span> Documentation</span>
                </div>
            </div>
            <div className={styles.h_text_minor}>
                <div className={styles.h_text_inner}>
                    <div className={styles.tagline}>Go beyond the basics - more than a data feed and curve builder</div>
                    <br />
                </div>
            </div>
            <div className={styles.h_text_minor}>
                <div className={styles.h_text_inner}>
                    <Button className={styles.signupbutton} href="/docs">Get Started</Button>
                </div>
            </div>
        </div>
    </div>
);
}

function SmartCurves() {
    return (
        <div className="row">
            <a href="/blog/smartcurves">
                <picture>
                      <source media="(max-width: 640px)" srcset="/img/home/SmartCurvesBanner-mobile.png" />
                      <source media="(min-width: 641px)" srcset="/img/home/SmartCurvesBanner.png" />
                      <img src="/img/home/SmartCurvesBanner.png" />
                </picture>
            </a>
        </div>
    );
}

function Products() {
    return (
    <div className={styles.products}>
        <div className={styles.productBanner}>Dive into the documentation</div>

        <div className="row padding-vert--md">
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
            <div className="col  text-left col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <div className="row">
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="image_container">
                            <a href="/docs/category/proof-of-concept"><img src="/img/gallery.png"/></a>
                        </div>
                    </div>
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div>
                            <a href="/docs/tutorials/qs/mongodb"><h2>Starting a POC?</h2></a>
                        </div>
                        <div>
                            <h3>Make the most of your Proof of Concept</h3>
                        </div>
                        <div>
                            <p>A selection of topics to help you make the most of your time getting to understand all aspects of the OpenDataDSL platform</p>
                            <p>Includes a concepts topic that introduces you to the concepts and terminology used throughout the platform and documentation</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
        </div>

        <div className="row padding-vert--md">
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
            <div className="col  text-left col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <div className="row">
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div>
                            <h2><a href="/docs/user/excel">Excel Add-in</a></h2>
                        </div>
                        <div>
                            <h3>Read/Write MongoDB data In Excel</h3>
                        </div>
                        <div>
                            <p>Create, read and update all your data in MongoDB Atlas directly from within your own Excel spreadsheets</p>
                            <p>Available for both desktop and web Excel</p>
                        </div>
                    </div>
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="image_container">
                            <a href="/docs/user/excel"><img src="/img/home/excel-addin.png"/></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
        </div>

        <div className="row padding-vert--md">
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
            <div className="col  text-left col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <div className="row">
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="image_container">
                            <a href="/docs/tutorials/qs/mongodb"><img src="/img/mongodb.png"/></a>
                        </div>
                    </div>
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div>
                            <a href="/docs/tutorials/qs/mongodb"><h2>MongoDB - Getting Started</h2></a>
                        </div>
                        <div>
                            <h3>Make the most of your MongoDB data</h3>
                        </div>
                        <div>
                            <p>Create data models that help you navigate your MongoDB Atlas data like never before - search, browse and visualise documents and timeseries</p>
                            <p>Get a complete view of every document and make it easy for your business to fully exploit them</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
        </div>

        <div className="row padding-vert--md">
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
            <div className="col  text-left col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <div className="row">
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div>
                            <a href="/docs/user/portal"><h2>Web Portal - Visualise Your Data</h2></a>
                        </div>
                        <div>
                            <h3>Geo-Tag any data!</h3>
                        </div>
                        <div>
                            <p>Take your data visualisation to the next level by geo-tagging your documents; filter on any properties and drill down to data-mine any linked information</p>
                            <p>Bring your data to life and make locational data easy to use</p>
                        </div>
                    </div>
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="image_container">
                            <a href="/docs/user/portal"><img src="/img/home/document-visualization.png"/></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
        </div>

        <div className="row padding-vert--md">
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
            <div className="col  text-left col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <div className="row">
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="image_container">
                            <a href="/docs/tutorials/gettingstartedodsl"><img src="/img/home/odsl-code.png"/></a>
                        </div>
                    </div>
                    <div className="col  text-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div>
                            <a href="/docs/tutorials/gettingstartedodsl"><h2>Easy 4GL Language</h2></a>
                        </div>
                        <div>
                            <h3>Powerful scripting language</h3>
                        </div>
                        <div>
                            <p>Let your creativity shine with our easy yet powerful scripting language. Use our VS Code extension to make coding easy with intellsense, syntax highlighting, code snippets, breakpoints and debugging</p>
                            <p>Perform aggregations like this one with ease!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-left col-xs-12 col-sm-3 col-md-3 col-lg-3"> </div>
        </div>
    </div>
    );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="Smart Data Management Tools">
        <main>
            <CookieConsent location="top" overlay>We use cookies to personalise content and to analyse our traffic, if you continue we'll assume that you are happy to receive them. For more information, see our <a href="/legal/Cookie-Policy">cookie policy</a></CookieConsent>
            <Video />
            <div className={styles.smallsectionskip} />
            <Products />
            <div className={styles.smallsectionskip} />

            <div className={styles.hidden} itemScope itemType="https://schema.org/WebSite">
              <meta itemProp="url" content="https://www.opendatadsl.com/"/>
              <form itemProp="potentialAction" itemScope itemType="https://schema.org/SearchAction">
                <meta itemProp="target" content="https://www.opendatadsl.com/search?q={search_term_string}"/>
                <input itemProp="query-input" type="text" name="search_term_string" required/>
                <input type="submit"/>
              </form>
            </div>

        </main>
    </Layout>
  );
}
