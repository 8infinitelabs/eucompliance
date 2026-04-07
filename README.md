# EU Compliance Bridge

**Open source toolkit bridging EU AI Act and European Accessibility Act compliance.**

> The EU AI Act (Article 16(l)) requires high-risk AI systems to comply with the European Accessibility Act. No tool operationalizes this link. Until now.

[![License: EUPL-1.2](https://img.shields.io/badge/License-EUPL--1.2-blue.svg)](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)

---

## The Problem

The EU has three major digital regulations hitting SMEs simultaneously:

| Regulation | Status | Deadline |
|-----------|--------|----------|
| **European Accessibility Act (EAA)** | Enforced | June 2025 (in effect) |
| **EU AI Act** (high-risk systems) | Approaching | August 2026 |
| **NIS2 Directive** | Transposing | Varies by country |

**Article 16(l) of the AI Act explicitly requires** high-risk AI systems to comply with accessibility requirements under the EAA (Directive 2019/882) and EN 301 549.

Yet no tool -- open source or commercial -- connects these two worlds:

```
AI GOVERNANCE TOOLS              ACCESSIBILITY TOOLS
(Credo AI, Holistic AI,          (axe-core, Siteimprove,
 VerifyWise, COMPL-AI...)         Deque, Level Access...)

     Article 16(l)                EN 301 549 / WCAG
     Article 9(9)                 EAA Directive
     FRIA disability impact       AI-generated content a11y

         ZERO                          ZERO
    accessibility                  AI governance
      features                      features

                    THE GAP
              No tool exists here
```

Communities most affected by AI systems -- people with disabilities evaluated by algorithms, users of public digital services -- have zero tools to verify their rights are being respected.

## The Solution

`eu-compliance-bridge` is an open source toolkit that operates at the intersection of the EU AI Act and the European Accessibility Act. It enables any organization -- without deep technical expertise -- to:

1. **Classify** AI systems by risk level under the AI Act
2. **Map** AI Act obligations to EN 301 549 accessibility requirements
3. **Generate** Fundamental Rights Impact Assessments (FRIAs)
4. **Produce** compliance documentation for both regulations
5. **Create** evidence usable for advocacy, not just internal compliance

## Packages

| Package | Status | Description |
|---------|--------|-------------|
| [`@eu-compliance-bridge/ai-act-classifier`](./packages/ai-act-classifier) | **Ready** | Risk classification engine with Annex III matching, Article 5 prohibited practices, conformity steps, and oversight requirements |
| [`@eu-compliance-bridge/accessibility-bridge`](./packages/accessibility-bridge) | Planned | Maps AI Act obligations to EN 301 549 requirements. The core innovation. |
| [`@eu-compliance-bridge/fria-generator`](./packages/fria-generator) | Planned | Fundamental Rights Impact Assessment generator based on DIHR/ECNL framework |
| [`@eu-compliance-bridge/docs-generator`](./packages/docs-generator) | Planned | Generates Annex IV technical documentation and accessibility statements |
| [`@eu-compliance-bridge/cli`](./packages/cli) | Planned | CLI tool: `npx eu-compliance-bridge assess [url-or-description]` |

## Quick Start

### Install

```bash
npm install @eu-compliance-bridge/ai-act-classifier
```

### Classify an AI System (Rule-based, No Dependencies)

```typescript
import { classify } from '@eu-compliance-bridge/ai-act-classifier'

const result = classify({
  name: 'Resume Screener',
  purpose: 'Automated CV screening and candidate ranking for recruitment',
  dataTypes: ['personal'],
  affectedPersons: ['employees'],
  decisionMaking: 'semi_automated',
})

console.log(result.riskLevel)             // 'high'
console.log(result.accessibilityRequired) // true
console.log(result.obligations)
// [
//   'Implement risk management system (Article 9)',
//   'Establish data governance practices (Article 10)',
//   ...
//   'Ensure accessibility per EAA and EN 301 549 (Article 16(l))',
// ]
```

### Classify Using an LLM (for Nuanced Analysis)

```typescript
import { classifyFromDescription } from '@eu-compliance-bridge/ai-act-classifier'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

const result = await classifyFromDescription(
  'An AI system that automatically scores job applicants based on video interviews, analyzing facial expressions, tone of voice, and word choice.',
  async (prompt) => {
    const { text } = await generateText({
      model: google('gemini-2.0-flash'),
      prompt,
    })
    return text
  },
)
```

### Access Regulatory Data Directly

```typescript
import {
  ANNEX_III_CATEGORIES,     // 8 high-risk categories
  CONFORMITY_STEPS,         // 9 conformity assessment steps (Articles 9-72)
  OVERSIGHT_REQUIREMENTS,   // 6 human oversight requirements (Article 14)
  PROHIBITED_PRACTICES,     // 8 prohibited AI practices (Article 5)
} from '@eu-compliance-bridge/ai-act-classifier'

// Use the data in your own tools, dashboards, or compliance workflows
```

## Why This Matters

### For Communities and NGOs

People with disabilities are disproportionately affected by AI systems -- from welfare eligibility algorithms to employment screening. This toolkit gives advocacy organizations the tools to hold AI deployers accountable under both the AI Act and the EAA.

### For SMEs

Enterprise compliance tools cost $15,000-$80,000/year. EU SMEs need affordable, actionable tools. This toolkit is free, open source, and designed for organizations without compliance departments.

### For the Open Source Ecosystem

The EU AI Act includes [specific provisions for open source](https://github.com/huggingface/blog/blob/main/eu-ai-act-for-oss-developers.md). This toolkit helps OSS developers understand their obligations and provides the infrastructure for community-driven compliance.

## How It's Different

| | Existing Tools | eu-compliance-bridge |
|---|---|---|
| **Regulations** | AI Act alone, or EAA alone | AI Act + EAA integrated |
| **Article 16(l)** | Completely ignored | Core feature |
| **Target user** | Corporate compliance officers | NGOs, communities, SMEs, public sector |
| **Barrier to entry** | High (technical expertise required) | Low (designed for non-technical users) |
| **Price** | $0 (basic) or $15K+/year (complete) | Free and open source |
| **Output** | Internal documentation | Documentation + advocacy evidence |
| **Perspective** | Provider compliance | Accountability from affected communities |
| **License** | BSL 1.1 or proprietary | EUPL-1.2 (European open source) |

## Regulatory References

- **AI Act**: [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) -- [Navigable version](https://artificialintelligenceact.eu)
- **EAA**: [Directive (EU) 2019/882](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0882)
- **EN 301 549**: [ETSI EN 301 549 v3.2.1](https://www.etsi.org/deliver/etsi_en/301500_302000/301549/03.02.01_60/en_301549v030201p.pdf)
- **FRIA Guide**: [DIHR/ECNL Operational Guide (Dec 2025)](https://ecnl.org/publications/guide-fundamental-rights-impact-assessments-fria)
- **EDF AI Act Toolkit**: [European Disability Forum (Oct 2024)](https://edf-feph.org/content/uploads/2024/10/AI-Act-implementation-toolkit-Final.pdf)

## Built On

- [axe-core](https://github.com/dequelabs/axe-core) -- The industry standard for accessibility testing (MPL-2.0)
- [ACT Rules](https://act-rules.github.io/rules/) -- W3C standard for automated accessibility testing
- [COMPL-AI](https://github.com/compl-ai/compl-ai) -- AI Act evaluation framework (Apache 2.0)
- [EuConform](https://github.com/Hiepler/EuConform) -- EU AI Act compliance tool with WCAG 2.2 AA (MIT/EUPL-1.2)

## Contributing

Contributions welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

Priority areas:
- **Accessibility Bridge**: Mapping AI Act articles to EN 301 549 clauses
- **FRIA Generator**: Implementing the DIHR/ECNL framework as executable code
- **Testing**: Expanding classifier test coverage
- **Translations**: Regulatory data in EU languages
- **Documentation**: Guides for non-technical users

## Funding

This project is applying to the [NLnet NGI Zero Commons Fund](https://nlnet.nl/commonsfund/) (funded by the European Commission via Horizon Europe).

```json
{
  "funding": "NLnet NGI Zero Commons Fund",
  "amount": "EUR 5,000 - 50,000",
  "deadline": "June 1, 2026",
  "status": "Applying"
}
```

## License

[EUPL-1.2](./LICENSE) -- European Union Public Licence. Compatible with GPL, LGPL, AGPL, MPL, and other major open source licenses.

---

Built by [Infinite Labs OÜ](https://regulia.app) -- Barcelona / Estonia
