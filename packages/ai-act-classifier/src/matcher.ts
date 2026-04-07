/**
 * Rule-based AI system risk matcher
 *
 * Provides deterministic classification without requiring an LLM.
 * Uses keyword matching against Annex III categories and Article 5 prohibited practices.
 */

import { ANNEX_III_CATEGORIES, type AnnexIIICategory } from './annex-iii.js'
import { PROHIBITED_PRACTICES, type ProhibitedPractice } from './prohibited-practices.js'

export interface MatchResult {
  riskLevel: 'prohibited' | 'high' | 'limited' | 'minimal'
  confidence: number
  matchedCategories: AnnexIIICategory[]
  matchedProhibitions: ProhibitedPractice[]
  reasoning: string
  obligations: string[]
}

interface MatchInput {
  purpose: string
  description?: string
  dataTypes?: string[]
  affectedPersons?: string[]
  decisionMaking?: string
  deploymentContext?: string
}

const LIMITED_RISK_KEYWORDS = [
  'chatbot', 'conversational', 'deepfake', 'synthetic media',
  'generated content', 'ai-generated', 'emotion recognition',
  'virtual assistant', 'customer service bot',
]

function normalizeText(...texts: (string | string[] | undefined)[]): string {
  return texts
    .flat()
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function countKeywordMatches(text: string, keywords: string[]): number {
  return keywords.filter(kw => text.includes(kw.toLowerCase())).length
}

export function matchAnnexIII(input: MatchInput): MatchResult {
  const combined = normalizeText(
    input.purpose,
    input.description,
    input.dataTypes,
    input.affectedPersons,
    input.decisionMaking,
    input.deploymentContext,
  )

  // Check prohibited practices first (Article 5)
  const matchedProhibitions = PROHIBITED_PRACTICES.filter(
    p => countKeywordMatches(combined, p.keywords) >= 2
  )

  if (matchedProhibitions.length > 0) {
    return {
      riskLevel: 'prohibited',
      confidence: Math.min(0.6 + matchedProhibitions.length * 0.1, 0.9),
      matchedCategories: [],
      matchedProhibitions,
      reasoning: `System matches ${matchedProhibitions.length} prohibited practice(s) under Article 5: ${matchedProhibitions.map(p => p.title).join(', ')}. These AI practices are banned in the EU since February 2025.`,
      obligations: [
        'This AI system may not be placed on the market, put into service, or used in the EU',
        'Existing deployments must be discontinued immediately',
      ],
    }
  }

  // Check high-risk categories (Annex III)
  const matchedCategories = ANNEX_III_CATEGORIES.filter(
    cat => countKeywordMatches(combined, cat.keywords) >= 2
  )

  if (matchedCategories.length > 0) {
    return {
      riskLevel: 'high',
      confidence: Math.min(0.5 + matchedCategories.length * 0.15, 0.9),
      matchedCategories,
      matchedProhibitions: [],
      reasoning: `System matches ${matchedCategories.length} high-risk category(ies) under Annex III: ${matchedCategories.map(c => `${c.number}. ${c.title}`).join('; ')}.`,
      obligations: [
        'Implement risk management system (Article 9)',
        'Establish data governance practices (Article 10)',
        'Prepare technical documentation per Annex IV (Article 11)',
        'Enable automatic event logging (Article 12)',
        'Ensure transparency and provide information to deployers (Article 13)',
        'Implement human oversight measures (Article 14)',
        'Achieve appropriate accuracy, robustness, and cybersecurity (Article 15)',
        'Ensure accessibility per EAA and EN 301 549 (Article 16(l))',
        'Register in EU database before placing on market (Article 49)',
        'Conduct conformity assessment (Article 43)',
      ],
    }
  }

  // Check limited risk (Article 50 — transparency obligations)
  const limitedMatches = countKeywordMatches(combined, LIMITED_RISK_KEYWORDS)
  if (limitedMatches >= 1) {
    return {
      riskLevel: 'limited',
      confidence: 0.6,
      matchedCategories: [],
      matchedProhibitions: [],
      reasoning: 'System appears to fall under limited risk (Article 50 transparency obligations). Users must be informed they are interacting with an AI system.',
      obligations: [
        'Inform users they are interacting with an AI system (Article 50(1))',
        'Mark AI-generated content as artificially generated or manipulated (Article 50(2))',
        'Disclose emotion recognition or biometric categorisation to affected persons (Article 50(3))',
      ],
    }
  }

  // Default: minimal risk
  return {
    riskLevel: 'minimal',
    confidence: 0.5,
    matchedCategories: [],
    matchedProhibitions: [],
    reasoning: 'System does not match any high-risk category under Annex III or prohibited practice under Article 5. Classified as minimal risk with no mandatory obligations under the AI Act.',
    obligations: [
      'No mandatory obligations under the AI Act',
      'Voluntary codes of conduct encouraged (Article 95)',
      'General-purpose AI transparency obligations may still apply if using GPAI models',
    ],
  }
}
