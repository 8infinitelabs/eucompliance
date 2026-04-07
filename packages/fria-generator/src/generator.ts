/**
 * FRIA Generator
 *
 * Generates Fundamental Rights Impact Assessments as required by
 * EU AI Act Article 27. Based on the DIHR/ECNL operational guide
 * (December 2025) 5-phase methodology with integrated disability
 * impact assessment.
 *
 * Phase structure:
 * 1. Preparation — Scope, stakeholders, governance
 * 2. Identification — Identify affected rights and stakeholders
 * 3. Assessment — Evaluate severity and likelihood of impacts
 * 4. Mitigation — Define measures to address impacts
 * 5. Documentation — Generate the FRIA report
 */

import type { ClassificationResult } from '@eu-compliance-bridge/ai-act-classifier'
import { FUNDAMENTAL_RIGHTS, type FundamentalRight } from './rights-catalog.js'

export interface FRIAInput {
  /** AI system name */
  systemName: string
  /** AI system purpose */
  purpose: string
  /** Classification result from ai-act-classifier */
  classification: ClassificationResult
  /** Organization deploying the system */
  deployerOrganization: string
  /** Sector of deployment */
  sector: string
  /** Country of deployment */
  country: string
  /** Description of affected population */
  affectedPopulation: string
  /** Scale of deployment: individuals, local, regional, national, eu-wide */
  scale: 'individuals' | 'local' | 'regional' | 'national' | 'eu-wide'
  /** Whether the system makes or influences decisions */
  makesDecisions: boolean
  /** Whether the deployment is in the public sector */
  publicSector: boolean
}

export interface RightImpact {
  right: FundamentalRight
  /** Relevance to this specific system: high, medium, low, none */
  relevance: 'high' | 'medium' | 'low' | 'none'
  /** Why this right is relevant to this system */
  rationale: string
  /** Specific risks identified */
  risks: string[]
  /** Disability-specific risks */
  disabilityRisks: string[]
  /** Suggested mitigation measures */
  mitigations: string[]
}

export interface FRIAReport {
  // Phase 1: Preparation
  metadata: {
    systemName: string
    purpose: string
    deployerOrganization: string
    sector: string
    country: string
    riskLevel: string
    assessmentDate: string
    article27Applicable: boolean
  }

  // Phase 2: Identification
  affectedPopulation: string
  scale: string
  identifiedRights: RightImpact[]

  // Phase 3: Assessment summary
  summary: {
    totalRightsAssessed: number
    highRelevance: number
    mediumRelevance: number
    lowRelevance: number
    disabilityRisksIdentified: number
  }

  // Phase 4: Mitigation guidance
  mitigationPriorities: string[]

  // Phase 5: Documentation
  generatedReport: string
}

/**
 * Generate a Fundamental Rights Impact Assessment.
 *
 * @example
 * ```ts
 * import { classify } from '@eu-compliance-bridge/ai-act-classifier'
 * import { generateFRIA } from '@eu-compliance-bridge/fria-generator'
 *
 * const classification = classify({
 *   name: 'Benefits Assessor',
 *   purpose: 'Social benefits eligibility assessment',
 *   affectedPersons: ['public'],
 *   decisionMaking: 'semi_automated',
 * })
 *
 * const fria = generateFRIA({
 *   systemName: 'Benefits Assessor',
 *   purpose: 'Automated assessment of welfare benefit eligibility',
 *   classification,
 *   deployerOrganization: 'Municipality of Barcelona',
 *   sector: 'Public administration',
 *   country: 'Spain',
 *   affectedPopulation: 'Citizens applying for social welfare benefits',
 *   scale: 'regional',
 *   makesDecisions: true,
 *   publicSector: true,
 * })
 * ```
 */
export function generateFRIA(input: FRIAInput): FRIAReport {
  const article27Applicable =
    input.classification.riskLevel === 'high' &&
    (input.publicSector || input.makesDecisions)

  // Phase 2: Identify relevant rights
  const identifiedRights = FUNDAMENTAL_RIGHTS.map(right => assessRight(right, input))

  // Phase 3: Summary
  const summary = {
    totalRightsAssessed: identifiedRights.length,
    highRelevance: identifiedRights.filter(r => r.relevance === 'high').length,
    mediumRelevance: identifiedRights.filter(r => r.relevance === 'medium').length,
    lowRelevance: identifiedRights.filter(r => r.relevance === 'low').length,
    disabilityRisksIdentified: identifiedRights.filter(r => r.disabilityRisks.length > 0).length,
  }

  // Phase 4: Mitigation priorities
  const mitigationPriorities = generateMitigationPriorities(identifiedRights, input)

  // Phase 5: Generate report
  const generatedReport = renderReport(input, identifiedRights, summary, mitigationPriorities, article27Applicable)

  return {
    metadata: {
      systemName: input.systemName,
      purpose: input.purpose,
      deployerOrganization: input.deployerOrganization,
      sector: input.sector,
      country: input.country,
      riskLevel: input.classification.riskLevel,
      assessmentDate: new Date().toISOString().split('T')[0],
      article27Applicable,
    },
    affectedPopulation: input.affectedPopulation,
    scale: input.scale,
    identifiedRights,
    summary,
    mitigationPriorities,
    generatedReport,
  }
}

function assessRight(right: FundamentalRight, input: FRIAInput): RightImpact {
  const purpose = input.purpose.toLowerCase()
  const sector = input.sector.toLowerCase()

  let relevance: 'high' | 'medium' | 'low' | 'none' = 'none'
  let rationale = ''
  const risks: string[] = []
  const disabilityRisks: string[] = []
  const mitigations: string[] = []

  // Non-discrimination is always relevant for AI
  if (right.id === 'non-discrimination') {
    relevance = 'high'
    rationale = 'All AI systems carry inherent risk of discrimination through biased data or algorithmic design.'
    risks.push('Training data may contain historical biases')
    risks.push('System outcomes may disproportionately affect protected groups')
    mitigations.push('Conduct bias testing across protected characteristics before deployment')
    mitigations.push('Implement ongoing monitoring for disparate impact')
    mitigations.push('Establish accessible complaint mechanism for affected individuals')
  }

  // Disability integration is always relevant for high-risk
  if (right.id === 'disability-integration' && input.classification.riskLevel === 'high') {
    relevance = 'high'
    rationale = 'Article 16(l) and Article 9(9) require consideration of impact on persons with disabilities.'
    risks.push('System interface may not be accessible to persons with disabilities')
    risks.push('Decision-making may not account for disability-related circumstances')
    mitigations.push('Conduct AI Accessibility Impact Assessment (AAIA)')
    mitigations.push('Ensure EN 301 549 compliance for all interfaces')
    mitigations.push('Consult disability organizations during design and testing')
  }

  // Human dignity for decision-making systems
  if (right.id === 'human-dignity' && input.makesDecisions) {
    relevance = input.classification.riskLevel === 'high' ? 'high' : 'medium'
    rationale = 'System makes decisions about people, which directly impacts their dignity and autonomy.'
    risks.push('Individuals may be reduced to data points without understanding of context')
    mitigations.push('Provide meaningful human oversight per Article 14')
    mitigations.push('Ensure transparent explanations of AI decisions')
  }

  // Personal data for all AI processing personal data
  if (right.id === 'personal-data' && input.classification.matchedCategoryIds.length > 0) {
    relevance = 'high'
    rationale = 'High-risk AI system processes data about natural persons.'
    risks.push('Excessive data collection beyond what is necessary')
    risks.push('Inferred personal data from behavioral patterns')
    mitigations.push('Apply data minimization principles')
    mitigations.push('Conduct DPIA under GDPR alongside this FRIA')
  }

  // Employment rights
  if (right.id === 'right-work' &&
    (purpose.includes('recruit') || purpose.includes('hiring') || purpose.includes('employment') ||
     purpose.includes('cv') || purpose.includes('performance') || purpose.includes('worker'))) {
    relevance = 'high'
    rationale = 'System directly affects access to employment or working conditions.'
    risks.push('Qualified candidates may be wrongly filtered out')
    risks.push('Performance evaluation may not account for individual circumstances')
    mitigations.push('Ensure human review of all AI-influenced employment decisions')
    mitigations.push('Test for bias in hiring outcomes across protected characteristics')
  }

  // Social security rights
  if (right.id === 'social-security' &&
    (purpose.includes('benefit') || purpose.includes('welfare') || purpose.includes('social') ||
     purpose.includes('eligibility') || purpose.includes('assistance'))) {
    relevance = 'high'
    rationale = 'System determines access to social benefits, directly affecting the right to social security.'
    risks.push('Eligible individuals may be wrongly denied benefits')
    risks.push('Automated fraud detection may create false positives among vulnerable populations')
    mitigations.push('Implement accessible appeals process')
    mitigations.push('Ensure human review of all benefit denials')
  }

  // Healthcare rights
  if (right.id === 'healthcare' &&
    (purpose.includes('health') || purpose.includes('medical') || purpose.includes('clinical') ||
     purpose.includes('diagnosis') || purpose.includes('triage') || purpose.includes('patient'))) {
    relevance = 'high'
    rationale = 'System influences healthcare decisions, directly affecting the right to health.'
    risks.push('Diagnostic accuracy may vary across demographic groups')
    risks.push('Treatment recommendations may not account for individual patient factors')
    mitigations.push('Validate system across diverse patient populations')
    mitigations.push('Ensure clinical oversight of AI recommendations')
  }

  // Effective remedy for all decision-making systems
  if (right.id === 'effective-remedy' && input.makesDecisions) {
    relevance = input.classification.riskLevel === 'high' ? 'high' : 'medium'
    rationale = 'Individuals must be able to challenge AI-influenced decisions.'
    risks.push('Opaque AI decisions may be difficult to meaningfully challenge')
    mitigations.push('Provide clear explanation of AI decision basis')
    mitigations.push('Establish accessible complaint and remedy process')
  }

  // Freedom of expression for content systems
  if (right.id === 'freedom-expression' &&
    (purpose.includes('content') || purpose.includes('moderation') || purpose.includes('recommendation') ||
     purpose.includes('filter') || purpose.includes('ranking'))) {
    relevance = 'medium'
    rationale = 'System filters, ranks, or moderates content, potentially affecting freedom of expression.'
    risks.push('Legitimate expression may be suppressed')
    mitigations.push('Implement transparent content policy with appeals process')
  }

  // Equality for all high-risk
  if (right.id === 'equality' && input.classification.riskLevel === 'high') {
    if (relevance === 'none') {
      relevance = 'medium'
      rationale = 'High-risk AI system must ensure equal treatment under the law.'
      mitigations.push('Monitor for unequal treatment patterns')
    }
  }

  // Add disability risks for all relevant rights
  if (right.disabilityRelevant && right.disabilityConsiderations && relevance !== 'none') {
    disabilityRisks.push(...right.disabilityConsiderations)
  }

  // Default low relevance for remaining rights for high-risk systems
  if (relevance === 'none' && input.classification.riskLevel === 'high') {
    relevance = 'low'
    rationale = 'Assessed as low relevance for this specific AI system, but should be reconsidered if deployment context changes.'
  }

  return { right, relevance, rationale, risks, disabilityRisks, mitigations }
}

function generateMitigationPriorities(rights: RightImpact[], input: FRIAInput): string[] {
  const priorities: string[] = []

  const highRights = rights.filter(r => r.relevance === 'high')

  if (highRights.length > 0) {
    priorities.push('Address all high-relevance rights impacts before deployment')
  }

  if (rights.some(r => r.disabilityRisks.length > 0)) {
    priorities.push('Conduct AI Accessibility Impact Assessment (AAIA) per Article 16(l)')
    priorities.push('Consult disability organizations as stakeholders in the assessment process')
  }

  if (input.makesDecisions) {
    priorities.push('Implement human oversight mechanism accessible to all users (Article 14)')
    priorities.push('Establish transparent, accessible complaint and remedy process')
  }

  if (input.publicSector) {
    priorities.push('Publish FRIA results as required by Article 27(5)')
    priorities.push('Notify national supervisory authority of FRIA results')
  }

  priorities.push('Schedule periodic reassessment (recommended: every 12 months or after significant changes)')

  return priorities
}

function renderReport(
  input: FRIAInput,
  rights: RightImpact[],
  summary: FRIAReport['summary'],
  mitigationPriorities: string[],
  article27Applicable: boolean,
): string {
  const highRights = rights.filter(r => r.relevance === 'high')
  const mediumRights = rights.filter(r => r.relevance === 'medium')

  let report = `# Fundamental Rights Impact Assessment (FRIA)

## AI System: ${input.systemName}

| Field | Value |
|-------|-------|
| Purpose | ${input.purpose} |
| Deployer | ${input.deployerOrganization} |
| Sector | ${input.sector} |
| Country | ${input.country} |
| Risk Level | ${input.classification.riskLevel.toUpperCase()} |
| Scale | ${input.scale} |
| Article 27 Applicable | ${article27Applicable ? 'Yes' : 'No'} |
| Assessment Date | ${new Date().toISOString().split('T')[0]} |

## Affected Population

${input.affectedPopulation}

## Summary

- **Rights assessed:** ${summary.totalRightsAssessed}
- **High relevance:** ${summary.highRelevance}
- **Medium relevance:** ${summary.mediumRelevance}
- **Low relevance:** ${summary.lowRelevance}
- **Disability-specific risks identified:** ${summary.disabilityRisksIdentified}

`

  if (highRights.length > 0) {
    report += `## High-Relevance Rights\n\n`
    for (const impact of highRights) {
      report += renderRightSection(impact)
    }
  }

  if (mediumRights.length > 0) {
    report += `## Medium-Relevance Rights\n\n`
    for (const impact of mediumRights) {
      report += renderRightSection(impact)
    }
  }

  report += `## Disability Impact Assessment

This section addresses the requirements of EU AI Act Article 9(9) (impact on vulnerable groups) and Article 16(l) (accessibility compliance).

`

  const disabilityImpacts = rights.filter(r => r.disabilityRisks.length > 0 && r.relevance !== 'none')
  if (disabilityImpacts.length > 0) {
    for (const impact of disabilityImpacts) {
      report += `### ${impact.right.title} (${impact.right.charterArticle})\n\n`
      for (const risk of impact.disabilityRisks) {
        report += `- ${risk}\n`
      }
      report += `\n`
    }
  }

  report += `## Mitigation Priorities\n\n`
  for (const priority of mitigationPriorities) {
    report += `1. ${priority}\n`
  }

  report += `\n## Next Steps\n\n`
  report += `1. Address all high-relevance impacts with concrete mitigation measures\n`
  report += `2. Document mitigation measures and their effectiveness\n`
  report += `3. Establish monitoring mechanisms for identified risks\n`
  if (article27Applicable) {
    report += `4. Submit FRIA to national supervisory authority as required by Article 27\n`
  }
  report += `\n---\n\n`
  report += `*Generated by eu-compliance-bridge FRIA Generator*\n`
  report += `*Based on DIHR/ECNL Operational Guide methodology*\n`
  report += `*EU AI Act Article 27 | EU Charter of Fundamental Rights*\n`

  return report
}

function renderRightSection(impact: RightImpact): string {
  let section = `### ${impact.right.title} (${impact.right.charterArticle})\n\n`
  section += `**Relevance:** ${impact.relevance.toUpperCase()}\n\n`
  section += `**Rationale:** ${impact.rationale}\n\n`

  if (impact.risks.length > 0) {
    section += `**Identified risks:**\n`
    for (const risk of impact.risks) {
      section += `- ${risk}\n`
    }
    section += `\n`
  }

  if (impact.mitigations.length > 0) {
    section += `**Mitigation measures:**\n`
    for (const m of impact.mitigations) {
      section += `- ${m}\n`
    }
    section += `\n`
  }

  return section
}
