/**
 * Annex IV Technical Documentation Generator
 *
 * EU AI Act Article 11 requires high-risk AI systems to have technical
 * documentation drawn up before being placed on the market.
 * Annex IV defines the required structure.
 */

import type { ClassificationResult } from '@eucompliance/ai-act-classifier'
import { CONFORMITY_STEPS } from '@eucompliance/ai-act-classifier'

export interface AnnexIVInput {
  systemName: string
  provider: string
  version: string
  classification: ClassificationResult
  /** General description of the AI system */
  description: string
  /** Intended purpose */
  intendedPurpose: string
  /** Data types processed */
  dataTypes: string[]
  /** Hardware/software the system is intended to run on */
  infrastructure: string
  /** Development methodology */
  developmentProcess?: string
  /** Training data description */
  trainingData?: string
  /** Validation and testing approach */
  testingApproach?: string
  /** Performance metrics and results */
  performanceMetrics?: string
  /** Risk management measures */
  riskMeasures?: string
  /** Human oversight design */
  oversightDesign?: string
  /** Cybersecurity measures */
  cybersecurity?: string
  /** Accessibility measures (Article 16(l)) */
  accessibilityMeasures?: string
  /** Post-market monitoring plan */
  monitoringPlan?: string
  /** Date of documentation */
  date?: string
}

export function generateAnnexIV(input: AnnexIVInput): string {
  const date = input.date ?? new Date().toISOString().split('T')[0]

  let doc = `# Technical Documentation — Annex IV
## EU AI Act (Regulation 2024/1689)

| Field | Value |
|-------|-------|
| AI System | ${input.systemName} |
| Provider | ${input.provider} |
| Version | ${input.version} |
| Risk Level | ${input.classification.riskLevel.toUpperCase()} |
| Date | ${date} |

---

## 1. General Description of the AI System

**System name:** ${input.systemName}

**Intended purpose:** ${input.intendedPurpose}

**Description:**

${input.description}

**Data types processed:** ${input.dataTypes.join(', ')}

**Infrastructure requirements:** ${input.infrastructure}

`

  if (input.classification.applicableAnnexItems.length > 0) {
    doc += `**Applicable Annex III categories:**\n`
    for (const item of input.classification.applicableAnnexItems) {
      doc += `- ${item}\n`
    }
    doc += `\n`
  }

  doc += `## 2. Development Process

${input.developmentProcess ?? '_To be completed: Describe the design specifications, development methodology, techniques and tools used, and validation procedures applied during development._'}

`

  if (input.trainingData) {
    doc += `### 2.1 Training Data

${input.trainingData}

`
  } else {
    doc += `### 2.1 Training Data

_To be completed: Describe datasets used for training, validation, and testing. Include information about data collection, preparation, labelling, and any bias examination performed._

`
  }

  doc += `## 3. Monitoring, Functioning and Control

${input.testingApproach ?? '_To be completed: Describe testing and validation procedures, metrics used, and results achieved._'}

`

  if (input.performanceMetrics) {
    doc += `### 3.1 Performance Metrics

${input.performanceMetrics}

`
  }

  doc += `## 4. Risk Management System (Article 9)

${input.riskMeasures ?? '_To be completed: Describe the risk management system, identified risks, and adopted risk management measures._'}

**Conformity assessment requirements:**

`

  for (const step of CONFORMITY_STEPS) {
    doc += `### ${step.order}. ${step.title} (${step.articles.join(', ')})

${step.description}

**Requirements:**
`
    for (const req of step.requirements) {
      doc += `- [ ] ${req}\n`
    }
    doc += `\n`
  }

  doc += `## 5. Human Oversight (Article 14)

${input.oversightDesign ?? '_To be completed: Describe human oversight measures, including the human-machine interface tools provided._'}

`

  doc += `## 6. Accuracy, Robustness and Cybersecurity (Article 15)

${input.cybersecurity ?? '_To be completed: Describe accuracy levels, robustness measures, and cybersecurity protections._'}

`

  doc += `## 7. Accessibility Compliance (Article 16(l))

`

  if (input.classification.accessibilityRequired) {
    doc += `**Status:** REQUIRED — This system is classified as high-risk and must comply with the European Accessibility Act (Directive 2019/882) and EN 301 549.

${input.accessibilityMeasures ?? '_To be completed: Describe how the system meets EN 301 549 requirements. Include WCAG 2.1 AA compliance for web interfaces, keyboard accessibility, screen reader compatibility, and accessible documentation._'}

**Recommended:** Generate an AI Accessibility Impact Assessment (AAIA) using \`@eucompliance/accessibility-bridge\` for detailed requirements.
`
  } else {
    doc += `**Status:** Not mandatory for ${input.classification.riskLevel}-risk systems, but recommended as best practice.

${input.accessibilityMeasures ?? '_No mandatory accessibility requirements for this risk level under the AI Act. Consider voluntary compliance with WCAG 2.1 AA._'}
`
  }

  doc += `
## 8. Post-Market Monitoring (Article 72)

${input.monitoringPlan ?? '_To be completed: Describe the post-market monitoring system, including data collection mechanisms, incident reporting procedures, and update processes._'}

`

  doc += `## 9. Obligations

Based on the risk classification, the following obligations apply:

`
  for (const obligation of input.classification.obligations) {
    doc += `- ${obligation}\n`
  }

  doc += `
---

*Generated by eu-compliance-bridge docs-generator*
*EU AI Act Regulation (EU) 2024/1689, Annex IV*
*Date: ${date}*
`

  return doc
}
