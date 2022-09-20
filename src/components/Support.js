import React from 'react';
import clsx from 'clsx';
import styles from './Support.module.css';
import { Badge, Card, Container, Button, Col } from 'react-bootstrap';

export function SupportHeader(props) {
    return (
        <div className={styles.header}>
            <div className={styles.textheader}>
                <span className={styles.titleline}><span className={styles.bluetitle}>Support</span> Information</span>
                <br />
                <span className={styles.tagline}>Do you have a question, found an issue or have an idea how we can make OpenDataDSL even better?</span>
            </div>
            <div className={styles.sectionskip} />
        </div>
    );
}

export function SupportBody(props) {
return (
    <div className={styles.container}>
        <div className={styles.item}>
            <div className={styles.rowheader}>QUESTIONS</div>
            <div className={styles.rowinfo}>I have a question</div>
            <div className={styles.rowimage}><img src="/img/home/questions.png" /></div>
            <ul className={styles.support}>
                <li className={styles.support}>
                    <div className={styles.bodyinfo}>You can ask technical or data questions into stackoverflow using the tag <a href="https://stackoverflow.com/questions/tagged/odsl" target="_blank" rel="noopener noreferrer">ODSL</a></div>
                </li>
                <li className={styles.support}>
                    <div className={styles.bodyinfo}>Alternatively please email <a href="mailto:support@opendatadsl.com" target="_blank" rel="noopener noreferrer">support@opendatadsl.com</a></div>
                </li>
                <li className={styles.support}>
                    <div className={styles.bodyinfo}>For all other questions, please email <a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">info@opendatadsl.com</a></div>
                </li>
            </ul>
        </div>
        <div className={styles.item}>
            <div className={styles.rowheader}>ISSUES</div>
            <div className={styles.rowinfo}>I have found an issue</div>
            <div className={styles.rowimage}><img src="/img/home/issues.png" /></div>
            <ul className={styles.support}>
                <li className={styles.support}>
                    <div className={styles.bodyinfo}>Log an issue in the <a href="https://portal.opendatadsl.com" target="_blank" rel="noopener noreferrer">PORTAL</a>. Go to Manage Account and select the Support tab</div>
                </li>
                <li className={styles.support}>
                    <div className={styles.bodyinfo}>Alternatively please email <a href="mailto:support@opendatadsl.com" target="_blank" rel="noopener noreferrer">support@opendatadsl.com</a></div>
                </li>
                <li className={styles.support}>
                    <div className={styles.bodyinfo}>For data issues, email <a href="mailto:data@opendatadsl.com" target="_blank" rel="noopener noreferrer">data@opendatadsl.com</a></div>
                </li>
            </ul>
        </div>
        <div className={styles.item}>
            <div className={styles.rowheader}>ENHANCEMENTS</div>
            <div className={styles.rowinfo}>I would like something new</div>
            <div className={styles.rowimage}><img src="/img/home/enhancements.png" /></div>
                <ul className={styles.support}>
                    <li className={styles.support}>
                        <div className={styles.bodyinfo}>Log an enhancement in the <a href="https://portal.opendatadsl.com" target="_blank" rel="noopener noreferrer">PORTAL</a>. Go to Manage Account and select the Support tab</div>
                    </li>
                    <li className={styles.support}>
                        <div className={styles.bodyinfo}>Alternatively please email <a href="mailto:support@opendatadsl.com" target="_blank" rel="noopener noreferrer">support@opendatadsl.com</a></div>
                    </li>
                    <li className={styles.support}>
                        <div className={styles.bodyinfo}>For data additions, email <a href="mailto:data@opendatadsl.com" target="_blank" rel="noopener noreferrer">data@opendatadsl.com</a></div>
                    </li>
                </ul>
        </div>
    </div>
    );
}

export function SupportBody1(props) {
return (
    <div className="container-fluid">
        <div className={styles.sectionskip2} />
        <div className="row">
            <div className="col">
                <table>
                <tbody>
                    <tr>
                        <td className={styles.rowheader}>QUESTIONS</td>
                    </tr>
                    <tr>
                        <td className={styles.rowinfo}>I have a question about</td>
                    </tr>
                    <tr>
                        <td className={styles.rowimage}><img src="/img/home/questions.png" /></td>
                    </tr>
                    <tr>
                        <td>
                        <ul>
                            <li><a href="https://stackoverflow.com/questions/tagged/odsl" target="_blank" rel="noopener noreferrer">ODSL Language</a></li>
                            <li><a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">Company Information</a></li>
                            <li><a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">Pricing</a></li>
                            <li><a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">Invoices and Payments</a></li>
                        </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="col">
                <table>
                <tbody>
                    <tr>
                        <td className={styles.rowheader}>ISSUES</td>
                    </tr>
                    <tr>
                        <td className={styles.rowinfo}>I have found an issue with</td>
                    </tr>
                    <tr>
                        <td className={styles.rowimage}><img src="/img/home/issues.png" /></td>
                    </tr>
                    <tr>
                        <td>
                        <ul>
                            <li><a href="https://stackoverflow.com/questions/tagged/odsl" target="_blank" rel="noopener noreferrer">ODSL language</a></li>
                            <li><a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">Data</a></li>
                            <li><a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">Integration</a></li>
                            <li><a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                        </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="col">
                <table>
                <tbody>
                    <tr>
                        <td className={styles.rowheader}>ENHANCEMENTS</td>
                    </tr>
                    <tr>
                        <td className={styles.rowinfo}>I would like</td>
                    </tr>
                    <tr>
                        <td className={styles.rowimage}><img src="/img/home/enhancements.png" /></td>
                    </tr>
                    <tr>
                        <td>
                            <ul>
                                <li><a href="https://stackoverflow.com/questions/tagged/odsl" target="_blank" rel="noopener noreferrer">A new feature</a></li>
                                <li><a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">Some specific data</a></li>
                                <li><a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">A new integration</a></li>
                                <li><a href="mailto:info@opendatadsl.com" target="_blank" rel="noopener noreferrer">Training</a></li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
    );
}

