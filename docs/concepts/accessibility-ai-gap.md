# The Accessibility-AI Gap

No tool in the world bridges AI governance and accessibility compliance. This document explains why and what eu-compliance-bridge does about it.

## Two Worlds That Don't Talk to Each Other

The EU has created a comprehensive digital regulatory framework. But the tools implementing it operate in complete isolation:

```
AI GOVERNANCE TOOLS              ACCESSIBILITY TOOLS

VerifyWise                       axe-core
COMPL-AI                         Siteimprove
Credo AI                         Deque DevTools
Holistic AI                      Level Access
Vanta AI module                  QualWeb
OneTrust AI                      Pa11y

Implement:                       Implement:
- Risk classification            - WCAG 2.1 testing
- Conformity assessment          - EN 301 549 compliance
- FRIA generation                - Accessibility statements
- Technical documentation        - Remediation guidance

ZERO accessibility               ZERO AI governance
features                         features
```

## Why the Gap Exists

### 1. Different Communities

AI governance tools are built by compliance and ML engineering teams. Accessibility tools are built by web developers and disability advocates. These communities rarely overlap.

### 2. Different Timelines

Accessibility standards (WCAG) have existed since 1999. The EU AI Act was adopted in 2024. The legal link between them (Article 16(l)) is brand new.

### 3. Different Markets

AI governance targets enterprise compliance officers ($50K-200K/year). Accessibility tools target web developers ($49-500/month). Nobody builds for the intersection.

### 4. Nobody Has Read Article 16(l)

Seriously. Ask any AI governance vendor about Article 16(l) and they won't know what it is. Ask any accessibility vendor about the AI Act and they'll point you somewhere else.

## The Real-World Impact

A public employment agency deploys an AI system to screen job applications. Under the AI Act:

- It's **high-risk** (Annex III, category 4: Employment)
- It must have **human oversight** (Article 14)
- It must provide **transparent explanations** (Article 13)
- It must be **accessible** (Article 16(l))

A blind job applicant should be able to:
1. Understand the AI's decision about their application (accessible explanation)
2. Request human review (accessible override mechanism)
3. File a complaint if the AI discriminated (accessible complaint process)

Without Article 16(l) compliance, none of this works.

## What EU Compliance Bridge Does

We built the first toolkit that operates at this intersection:

1. **AI Act Classifier** — Classifies risk and flags when accessibility is required
2. **Accessibility Bridge** — Maps AI Act articles to specific EN 301 549 clauses
3. **AAIA Generator** — Produces accessibility impact assessments tailored to each AI system
4. **FRIA Generator** — Includes disability impact in fundamental rights assessments

The output is not just compliance documentation — it's evidence that communities and NGOs can use to hold AI deployers accountable.

## The Opportunity

Article 16(l) creates a legal obligation that:
- Affects every high-risk AI system deployed in the EU
- Has no existing tool support
- Must be met by August 2, 2026
- Carries combined penalties from both the AI Act and the EAA

This is not a niche requirement. It's a gap that will become visible the moment enforcement begins.
