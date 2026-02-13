---
title: REMIT Compliance AI Assistant
description: The REMIT compliance assistant helps energy traders and asset managers navigate the complex requirements of REMIT
slug: /public/extensions/assistant-remit
tags:
- fusion
- remit
- compliance
- aiassistant
---

# REMIT Compliance Monitor - Documentation

## Overview

The REMIT Compliance Monitor is a specialized AI assistant designed to help energy trading firms, market participants, and compliance teams navigate the EU Regulation on Wholesale Energy Market Integrity and Transparency (REMIT). This assistant provides expert guidance on regulatory obligations, identifies reportable events, flags potential compliance risks, and assists in maintaining proper documentation for insider information and market abuse surveillance.

## Key Features

### Insider Information Management
- **Rapid Assessment**: Evaluate whether operational events constitute inside information requiring public disclosure
- **Disclosure Guidance**: Receive step-by-step guidance on disclosure timing, platforms, and content
- **Materiality Analysis**: Assess price sensitivity and market impact of operational changes
- **Multi-asset Coverage**: Support for generation assets, transmission infrastructure, storage facilities, LNG terminals, and consumption facilities

### Market Abuse Surveillance
- **Pattern Detection**: Identify trading behaviors that may indicate market manipulation
- **Risk Flagging**: Automatic alerts for suspicious order patterns, excessive cancellations, or coordinated trading
- **Commercial Justification**: Help document legitimate trading rationale for unusual activities
- **Red Flag Analysis**: Detection of wash trades, layering, spoofing, and artificial price movements

### Transaction Reporting Support
- **Reporting Obligations**: Clear guidance on EMIR and REMIT transaction reporting requirements
- **Data Quality**: Assistance with UTI management, counterparty details, and reportable fields
- **Recordkeeping**: 5-year documentation requirements and audit trail maintenance
- **Error Remediation**: Guidance on correcting and resubmitting transaction reports

### Regulatory Compliance
- **Policy Development**: Assistance creating surveillance systems, insider lists, and information barriers
- **Staff Training**: Educational support on REMIT obligations and best practices
- **Cross-regulation Navigation**: Integration with MAR, MiFID II, and national requirements
- **Enforcement Awareness**: Understanding penalties, enforcement trends, and regulatory priorities

## Getting Started

### Initial Setup

1. **Define Your Organization Profile**
    - Identify your asset types (generation, transmission, storage, trading)
    - Specify markets where you operate (power, gas, both)
    - List jurisdictions (which EU member states and national regulatory authorities)
    - Determine your registration status with ACER

2. **Configure Alert Thresholds**
    - Set materiality thresholds for your assets (e.g., outages >50 MW, duration >4 hours)
    - Define price sensitivity parameters for your market position
    - Establish surveillance parameters for trading pattern monitoring

3. **Integrate Data Sources**
    - Connect operational data feeds (generation, availability, outages)
    - Link trading system data for surveillance monitoring
    - Import market price data for materiality assessments
    - Access ACER guidance documents and regulatory updates

### Quick Start Examples

#### Example 1: Unplanned Generation Outage

**User Query:**
"Our 600 MW CCGT plant just tripped offline unexpectedly. Initial estimate is 24-48 hours to restore. What do I need to do?"

**Assistant Response:**
This event likely constitutes inside information under REMIT requiring immediate disclosure. Here's your action plan:

**Immediate Actions (Next 15-30 minutes):**
1. Verify the facts: Confirm 600 MW capacity loss and estimated 24-48 hour duration
2. Assess market impact: Given the capacity size and duration, this is material
3. Prepare disclosure: Draft inside information notice for publication

**Disclosure Requirements:**
- **Platform**: Publish on your national transparency platform (e.g., EEX for Germany, REMIT IIP for UK)
- **Timing**: As soon as possible after verification - aim for within 1 hour of trip
- **Content**: Include capacity affected, location, estimated return-to-service date
- **Language**: English and local language if required by national rules

**Draft Disclosure Template:**
```
Inside Information - Unplanned Outage
Facility: [Plant Name] CCGT
Location: [Market Zone]
Capacity Affected: 600 MW
Event Type: Unplanned trip
Start Time: [DD/MM/YYYY HH:MM]
Estimated Return to Service: 24-48 hours from event time
Additional Information: Technical investigation ongoing. Further updates will be published when available.
```

**Follow-up Requirements:**
- Update disclosure when return-to-service estimate changes by >4 hours
- Publish restoration notice when unit returns to normal operations
- Maintain internal records of event timeline and disclosure decisions
- Log in REMIT compliance register for audit purposes

**Additional Considerations:**
- Notify your Balance Responsible Party immediately
- Update day-ahead and intraday trading positions
- Document commercial impact for internal analysis
- If timing was suspicious (during tight market), prepare documentation of technical cause

---

#### Example 2: Suspicious Trading Pattern

**User Query:**
"Our surveillance system flagged that a trader placed 30 large sell orders in the last 10 minutes of trading, then cancelled 28 of them right before gate closure. The two that executed were at better prices than when he started. Is this a problem?"

**Assistant Response:**
This pattern raises **HIGH RISK** concerns for potential market manipulation (layering/spoofing). Here's your compliance assessment:

**Red Flags Identified:**
1. ✗ High cancellation rate (93%) - suggests orders placed without intent to execute
2. ✗ Timing concentrated near gate closure - maximizes market impact, minimizes execution risk
3. ✗ Executed trades benefited from order book impact - potential manipulation profit
4. ✗ Pattern suggests creating false signals of selling pressure

**Immediate Actions Required:**

**Step 1: Trading Desk Interview (Within 24 hours)**
Ask the trader to document:
- What was the commercial rationale for this strategy?
- Why were so many orders cancelled?
- Was there a legitimate change in market view or hedging need?
- Has this pattern occurred in previous sessions?

**Step 2: Commercial Justification Assessment**
Acceptable rationales might include:
- ✓ Working a large position with genuine intent to sell
- ✓ Rapid market conditions change requiring strategy adjustment
- ✓ Systematic algorithm with legitimate parameters

Unacceptable rationales would be:
- ✗ "Testing liquidity" without intent to execute
- ✗ "Wanted to see how the market would react"
- ✗ Creating selling pressure to buy at lower prices

**Step 3: Compliance Decision Tree**

If legitimate commercial rationale exists:
- Document thoroughly in surveillance log
- Implement enhanced monitoring for this trader
- Consider trading desk controls (max cancellation ratios)
- Provide trader education on manipulation risks
- No self-reporting necessary

If no legitimate rationale or trader cannot explain:
- **CRITICAL**: Likely REMIT Article 5 violation (market manipulation)
- Escalate to legal counsel immediately
- Consider voluntary self-reporting to National Regulatory Authority
- Suspend trader pending investigation
- Preserve all communications and system logs
- Prepare Suspicious Transaction and Order Report (STOR)

**Recommended Policy Enhancement:**
Implement pre-trade controls:
- Maximum order-to-trade ratios (e.g., 10:1 in final 15 minutes)
- Automated alerts for high cancellation rates near gate closure
- Supervisory approval for large order placement/cancellation strategies
- Regular surveillance pattern reviews

**Regulatory Context:**
ACER Guidance on market manipulation specifically identifies "entering orders with the intention of cancelling them before execution" as manipulative behavior. Your NRA may impose significant fines (€1M+ individual, up to 10% turnover for firms) plus potential criminal liability depending on jurisdiction.

---

## Core Use Cases

### Inside Information Disclosure Workflow

**When to Use**: Any operational event affecting your assets' capacity or availability

**Typical Questions:**
- "Is this inside information?"
- "When must I disclose?"
- "What platform do I use?"
- "What details must I include?"
- "When do I publish restoration?"

**Assistant Capabilities:**
- Four-factor test application (precise, non-public, price-sensitive, relates to wholesale energy)
- Materiality threshold assessment based on asset size and market conditions
- Disclosure template generation with required fields
- Multi-jurisdiction guidance for cross-border assets
- Timing advice balancing speed with information accuracy

**Decision Framework:**

```
Event Occurs
    ↓
Is information PRECISE?
├─ No → Monitor situation, reassess when details clarify
└─ Yes → Continue
    ↓
Is information NON-PUBLIC?
├─ No → No disclosure needed (already public)
└─ Yes → Continue
    ↓
Is information PRICE-SENSITIVE?
├─ No → Document decision, no disclosure required
└─ Yes → Continue
    ↓
Relates to wholesale energy products?
├─ No → Not REMIT inside information
└─ Yes → DISCLOSURE REQUIRED
    ↓
Publish immediately on appropriate platform
```

---

### Market Manipulation Risk Assessment

**When to Use**: Reviewing trading strategies, investigating flagged patterns, training traders

**Typical Questions:**
- "Is this trading pattern manipulative?"
- "How do we document legitimate hedging?"
- "What are acceptable order cancellation rates?"
- "Can we trade on public information immediately?"

**Assistant Capabilities:**
- Pattern recognition for common manipulation techniques
- Commercial rationale assessment frameworks
- Risk scoring (Critical/High/Medium/Low)
- Documentation templates for legitimate trading
- Comparison with ACER enforcement precedents

**Common Manipulation Patterns Detected:**

| Pattern | Description | Red Flags |
|---------|-------------|-----------|
| **Layering** | Multiple orders at different prices cancelled before execution | >80% cancellation rate, orders away from market |
| **Spoofing** | Large orders placed to move price, then cancelled | Order size >> typical trade size, immediate cancellation after price movement |
| **Wash Trading** | Trades with no change in beneficial ownership | Same entity on both sides, circular trading patterns |
| **Marking the Close** | Trading near session end to influence settlement | Concentration of volume in final minutes, prices diverge from fundamentals |
| **Pump and Dump** | Spreading false information while trading | Communication patterns + unusual trading timing |

---

### Transaction Reporting Compliance

**When to Use**: Ensuring proper REMIT/EMIR reporting, fixing data quality issues, audit preparation

**Typical Questions:**
- "What fields are required for this transaction type?"
- "How do we report complex structured deals?"
- "We received a data quality report from ACER - now what?"
- "What's the deadline for correcting erroneous reports?"

**Assistant Capabilities:**
- Field-by-field reporting guidance for different transaction types
- Complex transaction structuring advice (physical + financial, cross-border)
- UTI generation and validation
- Data quality error remediation procedures
- Recordkeeping best practices for 5-year retention

**Reportable Transaction Types:**

- Spot and forward physical power contracts
- Spot and forward physical gas contracts
- Financial derivatives (futures, options, swaps) on power/gas
- Transmission rights and capacity products
- Transportation contracts with market impact
- Balancing energy trades
- Storage capacity rights

---

### Information Barriers and Insider Lists

**When to Use**: Setting up compliance infrastructure, managing internal information flows, preparing for audits

**Typical Questions:**
- "Do we need information barriers between our trading desks?"
- "Who should be on our insider lists?"
- "Can our power trader and gas trader share market views?"
- "How do we document legitimate information sharing?"

**Assistant Capabilities:**
- Information barrier design for different organizational structures
- Insider list template generation (REMIT and MAR compliant)
- Legitimate information sharing protocols
- Chinese wall procedures and monitoring
- Breach detection and escalation procedures

**Information Barrier Best Practices:**

**Physical Barriers:**
- Separate trading floors or offices where practical
- Badge access controls to restrict area access
- Separate communication systems (phones, email groups)

**Logical Barriers:**
- IT system access controls and monitoring
- Separate position management systems
- Restricted data sharing between teams
- Communication logging and surveillance

**Procedural Barriers:**
- Clear policies on what information can/cannot be shared
- Mandatory training on information handling
- Pre-clearance for cross-desk communications on material matters
- Compliance sign-off for exceptional information sharing

---

## Advanced Features

### Regulatory Intelligence

The assistant maintains current knowledge of:

- **ACER Guidance Documents**: All published guidance on inside information, transaction reporting, and market manipulation
- **Enforcement Decisions**: Precedents from national regulatory authorities across EU member states
- **Court Rulings**: Interpretations from European and national courts on REMIT provisions
- **Consultation Papers**: Upcoming regulatory changes and industry feedback
- **Cross-regulation Updates**: Changes to MAR, MiFID II, Transparency Regulation affecting REMIT compliance

### Multi-jurisdiction Support

Specific guidance for national implementations:

| Country | NRA | Platform | Key Specifics |
|---------|-----|----------|---------------|
| **Germany** | BNetzA | EEX Transparency | Strict interpretation, high enforcement activity |
| **UK** | Ofgem | REMIT IIP Platform | Post-Brexit parallel regime, closely aligned with EU REMIT |
| **France** | CRE | RTE, GRTgaz platforms | Language requirements, specific asset thresholds |
| **Spain** | CNMC | e-sios | Integration with Iberian market operations |
| **Italy** | ARERA | GME transparency | Detailed asset registration requirements |
| **Netherlands** | ACM | Multiple platforms | Complex storage reporting obligations |
| **Nordics** | Multiple | Nord Pool | Regional coordination, cross-border assets |

### Scenario Analysis

The assistant can model compliance implications for:

- **Pre-transaction Planning**: "If we execute this trading strategy, what are the REMIT implications?"
- **Post-event Review**: "We did X yesterday - should we have disclosed it?"
- **Policy Design**: "What controls should we implement to prevent manipulation risk?"
- **Audit Preparation**: "What documentation will regulators want to see for this event?"

---

## Integration Capabilities

### Data Sources

**Operational Data:**
- Real-time generation and availability data from asset SCADA systems
- Transmission network status and constraint information
- Storage facility levels and injection/withdrawal rates
- LNG terminal send-out capacity

**Trading Data:**
- Order placement and cancellation logs
- Execution timestamps and prices
- Position and P&L reports
- Communication surveillance (voice, email, chat)

**Market Data:**
- Day-ahead and intraday price curves
- Historical price volatility for materiality assessment
- Trading volumes and liquidity metrics
- Published inside information from other market participants

**Regulatory Data:**
- ACER guidance documents and Q&A publications
- National regulatory authority decisions and enforcement actions
- REMIT registered participant database
- Transaction reporting validation rules

### Output Formats

**Disclosure Templates:**
- Inside information publication notices
- Restoration of normal operations notifications
- Urgent market messages (UMM)
- Transparency platform submissions

**Internal Documentation:**
- Compliance decision logs
- Surveillance alert investigation reports
- Insider list registers
- Trading desk interview records
- Policy and procedure documents

**Regulatory Submissions:**
- Suspicious Transaction and Order Reports (STORs)
- Voluntary self-disclosure letters to NRAs
- Data quality remediation plans
- Audit response documentation

---

## Best Practices

### Daily Operations

**Morning Routine:**
1. Review overnight operational events across all assets
2. Check for any unplanned outages or capacity changes
3. Assess whether any events require inside information disclosure
4. Review trading surveillance alerts from previous day
5. Monitor published inside information from market participants

**Real-time Monitoring:**
1. Automatic alerts for operational events exceeding thresholds
2. Continuous trading surveillance for manipulation patterns
3. Market price monitoring for unusual movements requiring investigation
4. Cross-check trader communications with trading activity

**End-of-day Procedures:**
1. Transaction reporting completeness verification
2. Documentation of compliance decisions made during the day
3. Escalation of unresolved compliance questions
4. Update of insider lists if material events occurred

### Monthly Activities

- Review surveillance system effectiveness and false positive rates
- Analyze trading pattern trends across the desk
- Update compliance policies based on regulatory developments
- Conduct trader education sessions on recent enforcement cases
- Test information barrier effectiveness through mock audits

### Quarterly Reviews

- Comprehensive audit of disclosure decisions vs. actual market impact
- Transaction reporting data quality assessment
- Benchmarking against peer firms and industry standards
- Board-level compliance reporting on REMIT program effectiveness
- Regulatory horizon scanning for upcoming changes

### Annual Compliance

- Full review and update of REMIT compliance policies
- Independent audit of surveillance systems and controls
- Comprehensive training for all trading and compliance staff
- Testing of incident response procedures (mock disclosure scenarios)
- Strategic review of compliance technology investments

---

## Common Pitfalls to Avoid

### Inside Information Disclosure

❌ **"Let's wait to see if this becomes material"**
- REMIT requires disclosure "as soon as possible" once information is precise and price-sensitive
- Waiting to see market reaction is too late
- Disclose first, assess impact afterward

✓ **"This meets the test - disclose now, refine details in updates"**

❌ **"This is routine maintenance we planned months ago"**
- Planned events can still be inside information when they begin
- Previous announcement doesn't eliminate disclosure obligation at event start
- Check guidance on "restoration of normal operations"

✓ **"Even planned events may require disclosure at actual start time"**

❌ **"Let's disclose at market close to minimize impact"**
- Timing disclosure to minimize market reaction is manipulation
- Disclosure must be immediate, not strategically timed
- Regulators review disclosure timestamps rigorously

✓ **"Disclose immediately upon verification, regardless of market timing"**

### Market Manipulation

❌ **"It's only manipulation if we made a profit"**
- Attempted manipulation is also prohibited
- Intent matters, not just outcome
- Even unsuccessful manipulation is sanctioned

✓ **"Any intent to create false signals is manipulation, regardless of profit"**

❌ **"This is just aggressive trading"**
- Legitimate aggressive trading has clear commercial rationale
- Document the "why" for every unusual trading pattern
- "Testing the market" is not a legitimate rationale

✓ **"We can document clear commercial hedging or portfolio needs"**

❌ **"Everyone cancels orders - this is normal"**
- Cancellation rate and timing matter significantly
- Orders placed without intent to execute are manipulation
- Normal market making has consistent execution ratios

✓ **"Our cancellation patterns are consistent with genuine order working"**

### Transaction Reporting

❌ **"We'll fix these reporting errors when we have time"**
- Timely correction is required (typically within 1 business day of detection)
- Data quality scores affect regulatory oversight intensity
- Systematic errors indicate control deficiencies

✓ **"Errors are corrected immediately through proper resubmission procedures"**

❌ **"This is just an internal deal, no need to report"**
- Intra-group trades may still be reportable
- "Wholesale energy products" has a broad definition
- Check ACER guidance on reporting scope

✓ **"We verify reportability for all transactions, including internal"**

---

## Escalation Procedures

### When to Escalate Internally

**To Compliance Manager:**
- Any trading pattern flagged as High or Critical risk
- Unclear disclosure decisions where reasonable people might disagree
- Transaction reporting errors affecting >5% of daily submissions
- Information barrier breaches or near-misses

**To Legal Counsel:**
- Potential REMIT violations requiring self-reporting assessment
- Receipt of regulatory inquiry or investigation notice
- Novel compliance questions without clear regulatory guidance
- Cross-border issues with conflicting jurisdiction requirements

**To Executive Management:**
- Confirmed or highly likely REMIT violations
- Decisions to voluntarily self-report to regulators
- Significant compliance program deficiencies
- Regulatory enforcement actions or penalties

### When to Contact Regulators

**Voluntary Self-reporting Scenarios:**
- Discovery of inadvertent inside information disclosure failure
- Confirmed manipulative trading by employee
- Systematic transaction reporting failures
- Material compliance program gaps

**Self-reporting Benefits:**
- Potential penalty reduction (often 30-50% reduction)
- Demonstrates compliance culture and good faith
- Influences regulatory perception of firm
- Can limit scope of investigation

**Self-reporting Process:**
1. Gather all relevant facts and documentation
2. Engage legal counsel for privilege protection
3. Prepare clear, factual summary of issue
4. Identify remediation steps already taken
5. Submit to National Regulatory Authority with legal counsel
6. Cooperate fully with any follow-up investigation

---

## FAQs

**Q: How quickly must inside information be disclosed?**
A: "As soon as possible" typically means within minutes to hours of verification, not days. The exact timing depends on verification needs, but delays beyond 1-2 hours require strong justification.

**Q: Can we delay disclosure if it would harm our commercial interests?**
A: Only in very limited circumstances under Article 4(2) where: (1) delay wouldn't mislead the market, (2) you can ensure confidentiality, and (3) legitimate commercial interests would be prejudiced. This is rarely applicable to operational events.

**Q: What happens if we accidentally trade on inside information before disclosing?**
A: This is a serious REMIT violation (insider trading). Immediate actions: stop trading, disclose the information, document the timeline, engage legal counsel, and assess whether voluntary self-reporting is appropriate.

**Q: Do we need to disclose renewable generation forecast changes?**
A: Generally no - short-term generation forecasts are not inside information unless there's a specific technical issue affecting capacity. Routine wind/solar variability doesn't require disclosure.

**Q: How do we prove our trading wasn't manipulative?**
A: Document commercial rationale contemporaneously: hedging needs, portfolio rebalancing, risk management objectives. Communication records showing genuine trading intent are crucial. After-the-fact justifications are viewed skeptically.

**Q: What if we're unsure whether something is inside information?**
A: When in doubt, err toward disclosure. Over-disclosure is not sanctioned; failure to disclose is. Document your decision-making process regardless of conclusion.

**Q: Do small asset owners have the same obligations as large utilities?**
A: Yes - REMIT applies to all market participants regardless of size. However, materiality assessment may differ based on asset size relative to market. A 10 MW outage is less likely to be material than a 500 MW outage.

**Q: How long do we need to keep REMIT compliance records?**
A: Minimum 5 years for transaction records. Inside information disclosure decisions and market manipulation surveillance should be retained for 7+ years to cover potential investigation timeframes.

**Q: What's the difference between REMIT and MAR for energy markets?**
A: REMIT applies specifically to wholesale energy products. MAR applies to financial instruments including exchange-traded energy derivatives. Some products fall under both regimes - ensure compliance with both.

**Q: Can we use algorithms for trading if they increase cancellation rates?**
A: Yes, but algorithms must have legitimate commercial purpose and reasonable execution ratios. High-frequency manipulation is still manipulation. Document algorithm logic and parameters for regulatory review.

---

## Support and Resources

### Getting Help

**Within the Assistant:**
- Ask specific questions about your situation
- Request disclosure template drafting
- Analyze surveillance alerts
- Review trading strategies for compliance risks

**External Resources:**
- ACER REMIT Portal: https://www.acer-remit.eu
- National Regulatory Authority websites for jurisdiction-specific guidance
- Legal counsel for complex interpretations
- Industry associations (EFET, Europex) for best practice sharing

### Training Materials

The assistant can provide:
- Trader education modules on market manipulation
- Compliance team training on inside information assessment
- Management briefings on REMIT program effectiveness
- Board-level summaries of regulatory developments

### Updates and Maintenance

The assistant knowledge base is regularly updated with:
- New ACER guidance documents and Q&A publications
- National regulatory authority decisions and enforcement actions
- Court rulings interpreting REMIT provisions
- Industry best practices and technology developments

---

## Technical Specifications

### Supported Asset Types
- Thermal generation (coal, gas, nuclear, biomass)
- Renewable generation (wind, solar, hydro)
- Energy storage (pumped hydro, batteries, gas storage)
- Transmission infrastructure (interconnectors, network constraints)
- LNG terminals and regasification facilities
- Production facilities (oil, gas extraction)
- Large consumption facilities (industrial demand response)

### Supported Markets
- All EU power and gas markets (including UK post-Brexit parallel regime)
- Day-ahead, intraday, and balancing markets
- Physical and financial wholesale energy products
- Transmission and transportation rights
- Capacity mechanisms and ancillary services

### Data Requirements
- Asset operational data (capacity, availability, timestamps)
- Trading system data (orders, executions, cancellations)
- Market price and volume data
- Organizational structure (for information barrier design)
- Registration details (ACER codes, NRA references)

### Security and Confidentiality
- All data processed within secure environment
- Licensed market data never exposed externally
- Client-specific compliance matters strictly confidential
- Audit logs maintained for regulatory purposes
- No cross-client information sharing

---

## Conclusion

The REMIT Compliance Monitor provides comprehensive support for navigating one of the energy industry's most complex regulatory frameworks. By combining expert regulatory knowledge, real-time surveillance capabilities, and practical compliance guidance, the assistant helps firms maintain the highest standards of market integrity while managing commercial operations effectively.

**Remember**: REMIT compliance is not just about avoiding penalties - it's about maintaining fair, transparent, and efficient wholesale energy markets that benefit all participants. Use this assistant to build a compliance culture that views regulatory obligations as essential market infrastructure rather than administrative burden.

For specific questions about your compliance situation, engage the assistant with detailed information about your assets, markets, and the specific scenario you're evaluating. The more context you provide, the more tailored and actionable the guidance will be.

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**Regulatory Basis**: REMIT (EU) No 1227/2011 and implementing regulations current as of January 2026
