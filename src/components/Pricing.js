import React from 'react';
import styles from './Pricing.module.css';
import { Button } from 'react-bootstrap';

var prices = [
    { name: "Storage", units: "GB/Hour", free: "0.005 (5Mb)", price: "£ 0.10" },
    { name: "API request", units: "Thousand Requests", free: "2 (2,000)", price: "£ 0.01" },
    { name: "Message", units: "Message", free: "1000", price: "£ 0.01" },
    { name: "Process", units: "Hours", free: "0.25 (15 Minutes)", price: "£ 2.00" },
    { name: "Subscription", units: "Fulfilled Subscription", free: "25", price: "£ 0.05" }
];

var levels = [
    { name: "BASIC", price: "FREE", issues: "Web Only", l1: "24 hours", l2: "24 hours", l3: "48 hours", l4: "72 hours", hours: "M-F 8am to 6pm UK"},
    { name: "BRONZE", price: "£25/month", issues: "Web Only", l1: "8 hours", l2: "10 hours", l3: "12 hours", l4: "24 hours", hours: "M-F 8am to 6pm UK"},
    { name: "SILVER", price: "£100/month", issues: "Web Only", l1: "2 hours", l2: "4 hours", l3: "8 hours", l4: "24 hours", hours: "M-F 8am to 6pm UK"},
    { name: "GOLD", price: "£ request", issues: "Web/account manager", l1: "30 mins", l2: "1 hour", l3: "4 hours", l4: "24 hours", hours: "24 x 5 UK"}
];

export function BasicPricingTable() {
    return (
        <table>
            <thead>
                <tr>
                    <th><strong>Item</strong></th>
                    <th><strong>Units</strong></th>
                    <th><strong>FREE Usage</strong></th>
                    <th><strong>Rate</strong></th>
                </tr>
            </thead>
            <tbody>
                  {prices.map((props, idx) => (
                    <tr key={idx}>
                        <td>{props.name}</td>
                        <td>{props.units}</td>
                        <td>{props.free}</td>
                        <td>{props.price}</td>
                    </tr>
                  ))}
            </tbody>
        </table>
    );
}

export function SupportLevels() {
    return (
        <div className="absolute flex row">
              {levels.map((props, idx) => (
                    <table className="col" key={idx}>
                        <thead className={styles[props.name]}>
                            <tr>
                                <th className={styles[props.name]}>{props.name}</th>
                            </tr>
                        </thead>
                        <tbody className={styles[props.name]}>
                            <tr><td className={styles.price}>{props.price}</td></tr>
                            <tr><td className={styles.section_header}><b>Issue Logging</b></td></tr>
                            <tr><td className={styles.thincell_c}><span className={styles.blue}>{props.issues}</span></td></tr>
                            <tr><td className={styles.section_header}><b>Response times</b></td></tr>
                            <tr><td className={styles.thincell}>Blocker&nbsp; - <span className={styles.blue}>{props.l1}</span></td></tr>
                            <tr><td className={styles.thincell}>Critical - <span className={styles.blue}>{props.l2}</span></td></tr>
                            <tr><td className={styles.thincell}>Major&nbsp;&nbsp;&nbsp; - <span className={styles.blue}>{props.l3}</span></td></tr>
                            <tr><td className={styles.thincell}>Minor&nbsp;&nbsp;&nbsp; - <span className={styles.blue}>{props.l4}</span></td></tr>
                            <tr><td className={styles.section_header}><b>Support Hours</b></td></tr>
                            <tr><td className={styles.thincell_c}>{props.hours}</td></tr>
                            <tr><td className={styles.section_header}><Button className={styles.signupbutton} href="/SignUp">Sign Up</Button></td></tr>
                        </tbody>
                    </table>
              ))}
        </div>
    );
}

export function PricingHeader(props) {
    return (
        <div className={styles.header}>
            <div className={styles.textheader}>
                <span className={styles.titleline}><span className={styles.bluetitle}>Pricing</span> Information</span>
                <br />
                <span className={styles.tagline}>Everything you need to know about how OpenDataDSL is priced</span>
            </div>
            <div className={styles.sectionskip} />
        </div>
    );
}
