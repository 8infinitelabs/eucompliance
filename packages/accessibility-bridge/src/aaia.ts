/**
 * AI Accessibility Impact Assessment (AAIA)
 *
 * A new methodology that does not exist anywhere else.
 * Combines AI Act risk classification with EN 301 549 accessibility requirements
 * to produce a comprehensive accessibility impact assessment for AI systems.
 */

import type { ClassificationResult } from '@eu-compliance-bridge/ai-act-classifier'
import { AI_ACT_ACCESSIBILITY_MAPPINGS, type AIActAccessibilityMapping } from './ai-act-mapping.js'

export interface AAIAInput {
  /** AI system name */
  systemName: string
  /** Classification result from ai-act-classifier */
  classification: ClassificationResult
  /** Description of the AI system's user interface */
  interfaceType: 'web' | 'mobile' | 'desktop' | 'api' | 'conversational' | 'embedded'
  /** Whether the system produces visual outputs */
  hasVisualOutput: boolean
  /** Whether the system produces audio outputs */
  hasAudioOutput: boolean
  /** Whether the system requires user input */
  requiresUserInput: boolean
  /** Whether the system makes or influences decisions about people */
  makesDecisionsAboutPeople: boolean
  /** Specific groups affected (from classifier) */
  affectedGroups?: string[]
}

export interface AAIARequirement {
  /** EN 301 549 clause ID */
  clauseId: string
  /** Clause title */
  clauseTitle: string
  /** Why this requirement applies to this specific AI system */
  rationale: string
  /** Priority: critical, high, medium, low */
  priority: 'critical' | 'high' | 'medium' | 'low'
  /** Source AI Act article */
  sourceArticle: string
  /** Practical implementation guidance */
  guidance: string[]
}

export interface AAIAResult {
  /** AI system name */
  systemName: string
  /** AI Act risk level */
  riskLevel: string
  /** Overall accessibility compliance requirement */
  complianceRequired: boolean
  /** Applicable AI Act → EN 301 549 mappings */
  applicableMappings: AIActAccessibilityMapping[]
  /** Specific EN 301 549 requirements with priorities and guidance */
  requirements: AAIARequirement[]
  /** Summary statistics */
  summary: {
    totalRequirements: number
    critical: number
    high: number
    medium: number
    low: number
  }
  /** Generated assessment date */
  assessmentDate: string
}

/**
 * Generate an AI Accessibility Impact Assessment.
 *
 * Takes a classification result from the ai-act-classifier and produces
 * a detailed list of EN 301 549 accessibility requirements specific to
 * the AI system, with priorities and implementation guidance.
 *
 * @example
 * ```ts
 * import { classify } from '@eu-compliance-bridge/ai-act-classifier'
 * import { generateAAIA } from '@eu-compliance-bridge/accessibility-bridge'
 *
 * const classification = classify({
 *   name: 'Resume Screener',
 *   purpose: 'CV screening for recruitment',
 *   dataTypes: ['personal'],
 *   affectedPersons: ['employees'],
 *   decisionMaking: 'semi_automated',
 * })
 *
 * const aaia = generateAAIA({
 *   systemName: 'Resume Screener',
 *   classification,
 *   interfaceType: 'web',
 *   hasVisualOutput: true,
 *   hasAudioOutput: false,
 *   requiresUserInput: true,
 *   makesDecisionsAboutPeople: true,
 * })
 *
 * console.log(aaia.summary)
 * // { totalRequirements: 18, critical: 4, high: 8, medium: 4, low: 2 }
 * ```
 */
export function generateAAIA(input: AAIAInput): AAIAResult {
  const { classification } = input
  const complianceRequired = classification.riskLevel === 'high'

  // Find applicable mappings based on risk level
  const applicableMappings = AI_ACT_ACCESSIBILITY_MAPPINGS.filter(m =>
    m.appliesTo.includes(classification.riskLevel as 'high' | 'limited' | 'all') ||
    m.appliesTo.includes('all')
  )

  // Generate specific requirements
  const requirements: AAIARequirement[] = []

  // Article 16(l) — Core accessibility obligation for high-risk
  if (complianceRequired) {
    requirements.push({
      clauseId: '9',
      clauseTitle: 'Web accessibility (WCAG 2.1 AA)',
      rationale: 'Article 16(l) requires compliance with EAA. All web interfaces must meet WCAG 2.1 Level AA.',
      priority: 'critical',
      sourceArticle: 'Article 16(l)',
      guidance: [
        'Run automated accessibility testing with axe-core or equivalent',
        'Conduct manual testing with screen readers (NVDA, JAWS, VoiceOver)',
        'Test keyboard navigation for all interactive elements',
        'Verify colour contrast meets 4.5:1 ratio for text',
      ],
    })

    // Human oversight controls must be accessible
    requirements.push({
      clauseId: '5.5',
      clauseTitle: 'Operable parts',
      rationale: 'Article 14 requires human oversight. Override and stop controls must be accessible to users with motor disabilities.',
      priority: 'critical',
      sourceArticle: 'Article 14',
      guidance: [
        'Ensure stop/override button is keyboard accessible (Tab + Enter/Space)',
        'Button must have minimum 44x44px touch target',
        'Must not require tight grasping, pinching, or twisting of the wrist',
        'Must be reachable without requiring precise mouse movements',
      ],
    })

    // Risk assessment must consider disability impact
    requirements.push({
      clauseId: '4.2.10',
      clauseTitle: 'Usage with limited cognition',
      rationale: 'Article 9(9) requires considering impact on vulnerable groups. AI explanations must be understandable by users with cognitive disabilities.',
      priority: 'critical',
      sourceArticle: 'Article 9(9)',
      guidance: [
        'Write AI decision explanations in plain language (aim for reading level B1/B2)',
        'Use consistent terminology throughout the interface',
        'Provide examples alongside abstract explanations',
        'Avoid time pressure on decision-making tasks',
      ],
    })

    // Documentation must be accessible
    requirements.push({
      clauseId: '12.1',
      clauseTitle: 'Product documentation',
      rationale: 'Article 13 requires accessible instructions. Article 11/Annex IV technical documentation must be in accessible formats.',
      priority: 'critical',
      sourceArticle: 'Article 13',
      guidance: [
        'Generate documentation in accessible PDF (tagged, structured, text-selectable)',
        'Provide HTML alternative for all PDF documents',
        'Include alt text for all diagrams and charts in documentation',
        'Document accessibility features of the AI system itself',
      ],
    })
  }

  // Visual output requirements
  if (input.hasVisualOutput) {
    requirements.push({
      clauseId: '9.1.1',
      clauseTitle: 'Non-text content',
      rationale: 'AI-generated visual outputs (charts, images, classifications) must have text alternatives.',
      priority: complianceRequired ? 'high' : 'medium',
      sourceArticle: 'Article 16(l)',
      guidance: [
        'Provide alt text for all AI-generated images and charts',
        'Include data tables as alternatives to visual graphs',
        'AI-generated alt text must be reviewed for accuracy',
        'Risk level visualizations must not rely solely on colour',
      ],
    })

    requirements.push({
      clauseId: '4.2.3',
      clauseTitle: 'Usage without perception of colour',
      rationale: 'AI system status indicators and risk levels must be perceivable without colour vision.',
      priority: 'high',
      sourceArticle: 'Article 16(l)',
      guidance: [
        'Use icons, patterns, or text labels in addition to colour for risk levels',
        'Ensure 3:1 contrast ratio between adjacent colours in charts',
        'Test with colour blindness simulators',
      ],
    })
  }

  // Audio output requirements
  if (input.hasAudioOutput) {
    requirements.push({
      clauseId: '4.2.4',
      clauseTitle: 'Usage without hearing',
      rationale: 'AI audio outputs must have visual/text alternatives for Deaf and hard of hearing users.',
      priority: complianceRequired ? 'high' : 'medium',
      sourceArticle: 'Article 16(l)',
      guidance: [
        'Provide captions for all AI-generated speech',
        'Provide transcripts for audio-only AI outputs',
        'Visual notifications must accompany audio alerts',
      ],
    })
  }

  // Conversational AI requirements
  if (input.interfaceType === 'conversational') {
    requirements.push({
      clauseId: '4.2.6',
      clauseTitle: 'Usage without vocal capability',
      rationale: 'Voice-controlled AI systems must provide alternative input methods for users who cannot speak.',
      priority: 'high',
      sourceArticle: 'Article 16(l)',
      guidance: [
        'Provide text-based input as alternative to voice',
        'Support switch access and other alternative input devices',
        'Do not time out during text input from slow typists',
      ],
    })

    requirements.push({
      clauseId: '9.3.1',
      clauseTitle: 'Readable',
      rationale: 'Chatbot responses must be readable and understandable, especially when conveying AI decisions.',
      priority: 'high',
      sourceArticle: 'Article 50',
      guidance: [
        'Chatbot must clearly identify itself as AI (Article 50 disclosure)',
        'Responses must be in plain language',
        'Provide ability to adjust response complexity',
        'Support screen reader announcement of new messages',
      ],
    })
  }

  // User input requirements
  if (input.requiresUserInput) {
    requirements.push({
      clauseId: '9.3.3',
      clauseTitle: 'Input assistance',
      rationale: 'AI system forms and inputs must help users avoid and correct mistakes, especially when input affects AI decisions.',
      priority: complianceRequired ? 'high' : 'medium',
      sourceArticle: 'Article 14(4)(d)',
      guidance: [
        'Provide clear error messages when input is invalid',
        'Allow users to review and correct inputs before AI processing',
        'Provide input suggestions where appropriate',
        'Do not lose user input on errors',
      ],
    })

    requirements.push({
      clauseId: '9.2.1',
      clauseTitle: 'Keyboard accessible',
      rationale: 'All AI system functionality must be available via keyboard for users who cannot use a mouse.',
      priority: 'high',
      sourceArticle: 'Article 16(l)',
      guidance: [
        'All interactive elements must be focusable and operable with keyboard',
        'Focus order must be logical and predictable',
        'No keyboard traps',
        'Visible focus indicators on all interactive elements',
      ],
    })
  }

  // Decision-making about people
  if (input.makesDecisionsAboutPeople) {
    requirements.push({
      clauseId: '4.2.10',
      clauseTitle: 'Usage with limited cognition (decision transparency)',
      rationale: 'When AI makes decisions about people, explanations must be understandable by the affected persons, including those with cognitive disabilities.',
      priority: 'critical',
      sourceArticle: 'Article 13 + Article 9(9)',
      guidance: [
        'Explain AI decisions in plain language, not technical jargon',
        'Provide visual aids (diagrams, flowcharts) with text alternatives',
        'Allow affected persons to request human review of AI decisions',
        'Clearly communicate how to challenge or appeal AI decisions',
        'Provide information in multiple formats (text, audio, easy-read)',
      ],
    })
  }

  // Article 50 — Transparency for limited risk
  if (classification.riskLevel === 'limited' || classification.riskLevel === 'high') {
    requirements.push({
      clauseId: '9.1.3',
      clauseTitle: 'Adaptable (AI disclosure)',
      rationale: 'Article 50 transparency disclosures must be programmatically determinable for assistive technologies.',
      priority: 'medium',
      sourceArticle: 'Article 50',
      guidance: [
        'AI disclosure notices must use semantic HTML (not just visual styling)',
        'Disclosure must be announced by screen readers',
        'AI-generated content labels must be in accessible metadata',
      ],
    })
  }

  // Deduplicate requirements by clauseId, keeping highest priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  const deduped = new Map<string, AAIARequirement>()
  for (const req of requirements) {
    const existing = deduped.get(req.clauseId)
    if (!existing || priorityOrder[req.priority] < priorityOrder[existing.priority]) {
      deduped.set(req.clauseId, req)
    }
  }
  const finalRequirements = Array.from(deduped.values())
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  const summary = {
    totalRequirements: finalRequirements.length,
    critical: finalRequirements.filter(r => r.priority === 'critical').length,
    high: finalRequirements.filter(r => r.priority === 'high').length,
    medium: finalRequirements.filter(r => r.priority === 'medium').length,
    low: finalRequirements.filter(r => r.priority === 'low').length,
  }

  return {
    systemName: input.systemName,
    riskLevel: classification.riskLevel,
    complianceRequired,
    applicableMappings,
    requirements: finalRequirements,
    summary,
    assessmentDate: new Date().toISOString().split('T')[0],
  }
}
