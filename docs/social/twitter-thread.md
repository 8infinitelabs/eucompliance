# Twitter/X Thread — Launch

## Tweet 1 (Hook)

I just open-sourced the first toolkit that bridges EU AI Act and accessibility compliance.

Article 16(l) requires it. Zero tools implement it. Until now.

github.com/8infinitelabs/eu-compliance-bridge

Thread on why this matters:

## Tweet 2 (The Problem)

The EU has 3 major digital regulations:

- EAA (accessibility) — enforced since June 2025
- AI Act (high-risk) — August 2026
- NIS2 (cyber) — rolling out

Article 16(l) of the AI Act says: high-risk AI MUST be accessible.

But AI governance tools have ZERO accessibility features.
And accessibility tools have ZERO AI governance features.

## Tweet 3 (Real Impact)

Imagine: a blind person's welfare benefits are assessed by an AI system.

Under the law, they should be able to:
- Understand the decision
- Override it
- Appeal it

If the interface isn't accessible, they can't exercise ANY of these rights.

## Tweet 4 (What We Built)

eu-compliance-bridge solves this:

- AI risk classifier (Article 5 + Annex III)
- Maps AI Act → EN 301 549 requirements
- AI Accessibility Impact Assessment (new methodology)
- FRIA with disability impact
- Annex IV docs + accessibility statements
- CLI: npx eu-compliance-bridge classify "..."

## Tweet 5 (Numbers)

Some context:

- Enterprise AI governance tools: $15K-80K/year
- This toolkit: free, EUPL-1.2
- 37 tests, 5 packages, TypeScript
- No existing tool (OSS or commercial) does this
- EAA fines: up to EUR 300K
- AI Act fines: up to EUR 15M or 3% revenue

## Tweet 6 (CTA)

If you build AI in the EU:
Star the repo.

If you work in disability rights:
Open an issue — we need your input on the mappings.

If you know someone affected:
Share this thread.

github.com/8infinitelabs/eu-compliance-bridge

## Tweet 7 (SaaS plug)

Want this as a dashboard instead of a CLI?

regulia.app — the hosted platform built on eu-compliance-bridge.

Visual compliance dashboard, automated scanning, PDF reports.

Free accessibility scan: regulia.app/scan
