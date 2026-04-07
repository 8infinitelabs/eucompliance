# Getting Started with EU Compliance Bridge

Classify your AI system's risk level and get accessibility requirements in under 5 minutes.

## Install

```bash
npm install @eu-compliance-bridge/ai-act-classifier @eu-compliance-bridge/accessibility-bridge
```

## Step 1: Classify Your AI System

```typescript
import { classify } from '@eu-compliance-bridge/ai-act-classifier'

const result = classify({
  name: 'Customer Support Chatbot',
  purpose: 'Automated customer service responding to product inquiries',
  dataTypes: ['personal'],
  affectedPersons: ['customers'],
  decisionMaking: 'advisory',
})

console.log(`Risk level: ${result.riskLevel}`)
console.log(`Accessibility required: ${result.accessibilityRequired}`)
console.log(`Obligations:`)
result.obligations.forEach(o => console.log(`  - ${o}`))
```

## Step 2: Get Accessibility Requirements

If your system is classified as high-risk (or you want to be proactive), generate an AI Accessibility Impact Assessment:

```typescript
import { generateAAIA } from '@eu-compliance-bridge/accessibility-bridge'

const aaia = generateAAIA({
  systemName: 'Customer Support Chatbot',
  classification: result,
  interfaceType: 'conversational',
  hasVisualOutput: false,
  hasAudioOutput: false,
  requiresUserInput: true,
  makesDecisionsAboutPeople: false,
})

console.log(`Total requirements: ${aaia.summary.totalRequirements}`)
console.log(`Critical: ${aaia.summary.critical}`)

aaia.requirements.forEach(req => {
  console.log(`[${req.priority.toUpperCase()}] ${req.clauseTitle}`)
  console.log(`  Rationale: ${req.rationale}`)
  req.guidance.forEach(g => console.log(`  - ${g}`))
})
```

## Step 3: Take Action

Based on the assessment:

1. **Critical requirements** — Must address before deployment
2. **High requirements** — Should address before deployment
3. **Medium/Low** — Address in post-market monitoring

For each requirement, the toolkit provides:
- The specific EN 301 549 clause to comply with
- Why it applies to your AI system specifically
- Practical implementation guidance

## What's Next

- [Understanding AI Act Risk Levels](./ai-act-risk-levels.md)
- [Article 16(l) Explained](./article-16l-explained.md)
- [EN 301 549 for AI Systems](../reference/en-301-549-ai.md)
