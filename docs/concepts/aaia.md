# AI Accessibility Impact Assessment (AAIA)

The AAIA is a new methodology created by eu-compliance-bridge. It does not exist in any paper, standard, or tool. It combines AI Act risk classification with EN 301 549 accessibility requirements to produce actionable, system-specific accessibility guidance.

## Why AAIA Exists

The EU AI Act (Article 16(l)) requires high-risk AI systems to comply with the European Accessibility Act. But no methodology exists to:

1. Determine **which** EN 301 549 clauses apply to a specific AI system
2. **Prioritize** requirements based on the system's interface and impact
3. Provide **practical guidance** for implementation
4. Include the **disability perspective** in AI risk management

The AAIA fills this gap.

## How It Works

### Input

The AAIA takes two inputs:

1. **Classification result** from the AI Act classifier (risk level, matched categories)
2. **System context** (interface type, output modalities, whether it makes decisions about people)

### Processing

The generator:

1. Identifies which AI Act articles apply based on risk level
2. Maps each article to specific EN 301 549 clauses
3. Adds context-specific requirements (e.g., conversational AI needs voice alternatives)
4. Assigns priorities (critical, high, medium, low) based on impact
5. Generates practical implementation guidance for each requirement
6. Deduplicates, keeping the highest priority for each clause

### Output

A structured assessment containing:

- **Compliance status** — Whether Article 16(l) applies
- **Applicable mappings** — Which AI Act articles trigger which EN 301 549 clauses
- **Prioritized requirements** — Specific clauses with rationale and guidance
- **Summary statistics** — Count of critical/high/medium/low requirements

## Priority Levels

| Priority | Meaning | Action |
|----------|---------|--------|
| **Critical** | Legal obligation, must comply before deployment | Implement immediately |
| **High** | Strong regulatory expectation, risk of non-compliance | Implement before deployment |
| **Medium** | Best practice, recommended for full compliance | Implement within 6 months |
| **Low** | Nice to have, exceeds minimum requirements | Include in roadmap |

## What Makes AAIA Different

### vs. WCAG Audits

WCAG audits test web pages. AAIA assesses AI systems holistically — including decision transparency, human oversight controls, and generated content accessibility.

### vs. AI Act Conformity Assessments

Standard conformity assessments check AI Act compliance but skip accessibility. AAIA specifically addresses the Article 16(l) gap.

### vs. Accessibility Statements

Accessibility statements declare current compliance status. AAIA is a forward-looking assessment that identifies what needs to be done.

## Example Output

For a high-risk CV screening system with a web interface:

```
AI Accessibility Impact Assessment
System: Resume Screener
Risk Level: high
Compliance Required: Yes (Article 16(l))

CRITICAL (4 requirements):
- EN 301 549 Clause 9: Web interfaces must meet WCAG 2.1 AA
- EN 301 549 Clause 5.5: Override controls must be operable without fine motor skills
- EN 301 549 Clause 4.2.10: Decision explanations must be understandable
- EN 301 549 Clause 12.1: Documentation must be in accessible formats

HIGH (5 requirements):
- EN 301 549 Clause 9.1.1: Visual outputs need text alternatives
- EN 301 549 Clause 4.2.3: Risk indicators must not rely on colour alone
- EN 301 549 Clause 9.2.1: All controls must be keyboard accessible
- EN 301 549 Clause 9.3.3: Input errors must be identified and correctable
- EN 301 549 Clause 9.1.3: AI disclosure must be programmatically determinable
```

## Using AAIA

```typescript
import { classify } from '@eu-compliance-bridge/ai-act-classifier'
import { generateAAIA } from '@eu-compliance-bridge/accessibility-bridge'

const classification = classify({ /* ... */ })
const aaia = generateAAIA({
  systemName: 'My AI System',
  classification,
  interfaceType: 'web',
  hasVisualOutput: true,
  hasAudioOutput: false,
  requiresUserInput: true,
  makesDecisionsAboutPeople: true,
})
```

See [Getting Started](../guides/getting-started.md) for a complete walkthrough.
