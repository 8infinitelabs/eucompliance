/**
 * AI Act Risk Classifier
 *
 * Two modes:
 * 1. `classify()` — Rule-based, deterministic, no external dependencies (uses keyword matching)
 * 2. `classifyFromDescription()` — LLM-powered for nuanced classification (bring your own model)
 *
 * The rule-based classifier is suitable for initial screening and automated pipelines.
 * For complex or ambiguous systems, use the LLM-powered classifier with human review.
 */

import { matchAnnexIII, type MatchResult } from './matcher.js'

export interface ClassificationInput {
  /** Name of the AI system */
  name: string
  /** Primary purpose and use case */
  purpose: string
  /** Optional detailed description */
  description?: string
  /** Types of data processed: personal, biometric, health, financial, behavioral, location */
  dataTypes?: string[]
  /** Who is affected: employees, customers, public, minors, vulnerable_groups */
  affectedPersons?: string[]
  /** Decision-making type: fully_automated, semi_automated, human_in_loop, advisory */
  decisionMaking?: string
  /** Deployment context: public_sector, private_sector, law_enforcement, healthcare, education */
  deploymentContext?: string
}

export interface ClassificationResult {
  riskLevel: 'prohibited' | 'high' | 'limited' | 'minimal'
  confidence: number
  reasoning: string
  applicableAnnexItems: string[]
  obligations: string[]
  /** Matched Annex III category IDs (for high-risk) */
  matchedCategoryIds: string[]
  /** Matched Article 5 prohibition IDs (for prohibited) */
  matchedProhibitionIds: string[]
  /** Whether Article 16(l) accessibility obligations apply */
  accessibilityRequired: boolean
}

/**
 * Rule-based risk classification.
 * No external dependencies — works offline, deterministic, fast.
 *
 * @example
 * ```ts
 * import { classify } from '@eucompliance/ai-act-classifier'
 *
 * const result = classify({
 *   name: 'Resume Screener',
 *   purpose: 'Automated CV screening and candidate ranking for recruitment',
 *   dataTypes: ['personal'],
 *   affectedPersons: ['employees'],
 *   decisionMaking: 'semi_automated',
 * })
 *
 * console.log(result.riskLevel) // 'high'
 * console.log(result.accessibilityRequired) // true
 * ```
 */
export function classify(input: ClassificationInput): ClassificationResult {
  const match: MatchResult = matchAnnexIII({
    purpose: input.purpose,
    description: input.description,
    dataTypes: input.dataTypes,
    affectedPersons: input.affectedPersons,
    decisionMaking: input.decisionMaking,
    deploymentContext: input.deploymentContext,
  })

  const accessibilityRequired = match.riskLevel === 'high'

  if (accessibilityRequired && !match.obligations.some(o => o.includes('16(l)'))) {
    match.obligations.push('Ensure accessibility per EAA and EN 301 549 (Article 16(l))')
  }

  return {
    riskLevel: match.riskLevel,
    confidence: match.confidence,
    reasoning: match.reasoning,
    applicableAnnexItems: match.matchedCategories.map(c => `Annex III, point ${c.number}: ${c.title}`),
    obligations: match.obligations,
    matchedCategoryIds: match.matchedCategories.map(c => c.id),
    matchedProhibitionIds: match.matchedProhibitions.map(p => p.id),
    accessibilityRequired,
  }
}

/**
 * LLM-powered classification for nuanced analysis.
 * Requires a `generateText` function compatible with the Vercel AI SDK signature.
 *
 * @example
 * ```ts
 * import { classifyFromDescription } from '@eucompliance/ai-act-classifier'
 * import { generateText } from 'ai'
 * import { google } from '@ai-sdk/google'
 *
 * const result = await classifyFromDescription(
 *   'An AI system that automatically scores job applicants based on video interviews, analyzing facial expressions, tone of voice, and word choice to rank candidates.',
 *   async (prompt) => {
 *     const { text } = await generateText({ model: google('gemini-2.0-flash'), prompt })
 *     return text
 *   }
 * )
 * ```
 */
export async function classifyFromDescription(
  description: string,
  generateText: (prompt: string) => Promise<string>,
): Promise<ClassificationResult> {
  const prompt = `You are an EU AI Act (Regulation (EU) 2024/1689) expert. Classify this AI system's risk level.

System description: ${description}

Classification criteria:
- PROHIBITED (Article 5): Social scoring, real-time biometric ID in public spaces, subliminal manipulation, exploitation of vulnerabilities, emotion inference in workplace/education, biometric categorisation by sensitive attributes, untargeted facial recognition scraping, individual predictive policing
- HIGH-RISK (Article 6 + Annex III): Biometric identification, critical infrastructure, education, employment, essential services, law enforcement, migration, justice
- LIMITED RISK (Article 50): Chatbots, emotion recognition (non-workplace), deepfakes/synthetic media — transparency obligations only
- MINIMAL RISK: All other AI systems — no mandatory obligations, voluntary codes of conduct

IMPORTANT: If classified as high-risk, Article 16(l) REQUIRES the system to comply with accessibility requirements under the European Accessibility Act (EAA) and EN 301 549.

Return ONLY valid JSON:
{
  "riskLevel": "prohibited" | "high" | "limited" | "minimal",
  "confidence": 0.0 to 1.0,
  "reasoning": "explanation referencing specific AI Act articles",
  "applicableAnnexItems": ["Annex III, point X: description"],
  "obligations": ["list of specific obligations"]
}`

  const text = await generateText(prompt)

  try {
    const raw = JSON.parse(text.replace(/```json?\n?/g, '').replace(/```/g, '').trim())
    const isHighRisk = raw.riskLevel === 'high'

    return {
      riskLevel: raw.riskLevel ?? 'minimal',
      confidence: raw.confidence ?? 0.5,
      reasoning: raw.reasoning ?? text,
      applicableAnnexItems: raw.applicableAnnexItems ?? [],
      obligations: raw.obligations ?? [],
      matchedCategoryIds: [],
      matchedProhibitionIds: [],
      accessibilityRequired: isHighRisk,
    }
  } catch {
    // Fallback: run rule-based on the description
    const fallback = classify({
      name: 'Unknown',
      purpose: description,
    })
    fallback.reasoning = `LLM parsing failed. Rule-based fallback: ${fallback.reasoning}`
    return fallback
  }
}
