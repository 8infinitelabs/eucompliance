/**
 * Accessibility Statement Generator
 *
 * Generates EN 301 549 / EAA compliant accessibility statements
 * for AI systems. Based on the W3C WAI model and adapted for
 * AI-specific requirements under Article 16(l).
 */

import type { AAIAResult } from '@eucompliance/accessibility-bridge'

export interface AccessibilityStatementInput {
  /** AI system name */
  systemName: string
  /** Organization responsible */
  organization: string
  /** URL of the AI system (if web-based) */
  url?: string
  /** Contact email for accessibility issues */
  contactEmail: string
  /** Conformance level achieved: full, partial, non-conformant */
  conformanceLevel: 'full' | 'partial' | 'non-conformant'
  /** WCAG version: 2.1 or 2.2 */
  wcagVersion?: '2.1' | '2.2'
  /** Known accessibility limitations */
  knownLimitations?: string[]
  /** Accessibility features implemented */
  accessibilityFeatures?: string[]
  /** Assistive technologies tested with */
  testedWith?: string[]
  /** Date of last accessibility evaluation */
  evaluationDate?: string
  /** Evaluation method: automated, manual, both */
  evaluationMethod?: 'automated' | 'manual' | 'both'
  /** AAIA result for AI-specific requirements */
  aaiaResult?: AAIAResult
  /** Enforcement body for complaints */
  enforcementBody?: string
  /** Date */
  date?: string
}

export function generateAccessibilityStatement(input: AccessibilityStatementInput): string {
  const date = input.date ?? new Date().toISOString().split('T')[0]
  const wcag = input.wcagVersion ?? '2.1'

  let statement = `# Accessibility Statement

## ${input.systemName}

**Organization:** ${input.organization}
${input.url ? `**URL:** ${input.url}` : ''}
**Date:** ${date}

---

## Compliance Status

${input.organization} is committed to ensuring digital accessibility for people with disabilities. This statement applies to **${input.systemName}**.

`

  const conformanceText = {
    full: `This AI system **fully conforms** to WCAG ${wcag} Level AA as referenced in EN 301 549.`,
    partial: `This AI system **partially conforms** to WCAG ${wcag} Level AA as referenced in EN 301 549. The non-conformances and exemptions are listed below.`,
    'non-conformant': `This AI system **does not yet conform** to WCAG ${wcag} Level AA as referenced in EN 301 549. The non-conformances are listed below, and we are working to resolve them.`,
  }

  statement += `**Conformance level:** ${conformanceText[input.conformanceLevel]}

`

  // AI-specific section (Article 16(l))
  if (input.aaiaResult) {
    statement += `## AI System Accessibility (Article 16(l) EU AI Act)

This system is classified as **${input.aaiaResult.riskLevel}-risk** under the EU AI Act (Regulation 2024/1689). Under Article 16(l), it must comply with accessibility requirements of the European Accessibility Act (Directive 2019/882).

**AI Accessibility Impact Assessment conducted:** ${input.aaiaResult.assessmentDate}
**Requirements identified:** ${input.aaiaResult.summary.totalRequirements} (${input.aaiaResult.summary.critical} critical, ${input.aaiaResult.summary.high} high)

`
  }

  if (input.accessibilityFeatures && input.accessibilityFeatures.length > 0) {
    statement += `## Accessibility Features

The following accessibility features are implemented:

`
    for (const feature of input.accessibilityFeatures) {
      statement += `- ${feature}\n`
    }
    statement += `\n`
  }

  if (input.knownLimitations && input.knownLimitations.length > 0) {
    statement += `## Known Limitations

The following accessibility limitations are known:

`
    for (const limitation of input.knownLimitations) {
      statement += `- ${limitation}\n`
    }
    statement += `\nWe are working to address these limitations. If you encounter accessibility barriers not listed here, please contact us.\n\n`
  }

  if (input.testedWith && input.testedWith.length > 0) {
    statement += `## Compatibility with Assistive Technologies

This system has been tested with:

`
    for (const tech of input.testedWith) {
      statement += `- ${tech}\n`
    }
    statement += `\n`
  }

  if (input.evaluationDate || input.evaluationMethod) {
    statement += `## Assessment Methods

`
    if (input.evaluationMethod) {
      const methodText = {
        automated: 'Automated testing using axe-core and equivalent tools.',
        manual: 'Manual testing with assistive technologies by accessibility experts.',
        both: 'Combination of automated testing (axe-core) and manual testing with assistive technologies.',
      }
      statement += `**Method:** ${methodText[input.evaluationMethod]}\n`
    }
    if (input.evaluationDate) {
      statement += `**Last evaluation:** ${input.evaluationDate}\n`
    }
    statement += `\n`
  }

  statement += `## Feedback and Contact

We welcome your feedback on the accessibility of ${input.systemName}. If you encounter accessibility barriers, please contact us:

**Email:** [${input.contactEmail}](mailto:${input.contactEmail})

We aim to respond to accessibility feedback within **5 business days** and to resolve accessibility issues within **30 days**.

`

  if (input.enforcementBody) {
    statement += `## Enforcement Procedure

If you are not satisfied with our response, you can file a complaint with:

${input.enforcementBody}

`
  }

  statement += `## Technical Specifications

This system relies on the following technologies for accessibility:

- HTML5
- WAI-ARIA
- CSS
- JavaScript

These technologies are used in compliance with WCAG ${wcag} Level AA.

## Standards Referenced

- **WCAG ${wcag} Level AA** — Web Content Accessibility Guidelines
- **EN 301 549 v3.2.1** — Accessibility requirements for ICT products and services
- **EU AI Act Article 16(l)** — Accessibility obligations for high-risk AI systems
- **European Accessibility Act (Directive 2019/882)**

---

*This statement was last updated on ${date}.*
*Generated by eu-compliance-bridge docs-generator.*
`

  return statement
}
