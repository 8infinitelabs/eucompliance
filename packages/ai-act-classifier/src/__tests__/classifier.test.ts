import { describe, it, expect } from 'vitest'
import { classify } from '../classifier.js'
import { matchAnnexIII } from '../matcher.js'
import { ANNEX_III_CATEGORIES } from '../annex-iii.js'
import { CONFORMITY_STEPS } from '../conformity-steps.js'
import { OVERSIGHT_REQUIREMENTS } from '../oversight-requirements.js'
import { PROHIBITED_PRACTICES } from '../prohibited-practices.js'

describe('classify', () => {
  it('classifies a recruitment AI as high-risk', () => {
    const result = classify({
      name: 'Resume Screener',
      purpose: 'Automated CV screening and candidate ranking for recruitment',
      dataTypes: ['personal'],
      affectedPersons: ['employees'],
      decisionMaking: 'semi_automated',
    })

    expect(result.riskLevel).toBe('high')
    expect(result.accessibilityRequired).toBe(true)
    expect(result.matchedCategoryIds).toContain('employment-workers-management')
    expect(result.obligations).toContainEqual(expect.stringContaining('Article 16(l)'))
  })

  it('classifies a credit scoring system as high-risk', () => {
    const result = classify({
      name: 'Credit Score Engine',
      purpose: 'Credit scoring and lending decision for loan applications',
      dataTypes: ['financial', 'personal'],
      affectedPersons: ['customers'],
    })

    expect(result.riskLevel).toBe('high')
    expect(result.matchedCategoryIds).toContain('essential-services')
  })

  it('classifies a chatbot as limited risk', () => {
    const result = classify({
      name: 'Support Bot',
      purpose: 'Customer service chatbot for answering product questions',
    })

    expect(result.riskLevel).toBe('limited')
    expect(result.accessibilityRequired).toBe(false)
    expect(result.obligations).toContainEqual(expect.stringContaining('Article 50'))
  })

  it('classifies a weather app as minimal risk', () => {
    const result = classify({
      name: 'Weather Forecast',
      purpose: 'Predict weather conditions based on satellite imagery',
    })

    expect(result.riskLevel).toBe('minimal')
    expect(result.accessibilityRequired).toBe(false)
  })

  it('flags social scoring as prohibited', () => {
    const result = classify({
      name: 'Citizen Trust System',
      purpose: 'Social scoring and trustworthiness assessment of citizens based on social behaviour',
      affectedPersons: ['public'],
    })

    expect(result.riskLevel).toBe('prohibited')
    expect(result.matchedProhibitionIds).toContain('social-scoring')
  })

  it('flags predictive policing as prohibited', () => {
    const result = classify({
      name: 'Crime Predictor',
      purpose: 'Predictive policing system for crime prediction and recidivism risk assessment',
      deploymentContext: 'law_enforcement',
    })

    expect(result.riskLevel).toBe('prohibited')
  })

  it('always includes accessibility obligation for high-risk systems', () => {
    const result = classify({
      name: 'Student Admission AI',
      purpose: 'Automated student admission and grading for university education',
      affectedPersons: ['public'],
    })

    expect(result.riskLevel).toBe('high')
    expect(result.accessibilityRequired).toBe(true)
    expect(result.obligations.some(o => o.includes('EN 301 549'))).toBe(true)
  })
})

describe('matchAnnexIII', () => {
  it('returns all matching categories', () => {
    const result = matchAnnexIII({
      purpose: 'AI system for border control passport verification and migration risk assessment',
    })

    expect(result.riskLevel).toBe('high')
    expect(result.matchedCategories.length).toBeGreaterThan(0)
    expect(result.matchedCategories.some(c => c.id === 'migration-asylum-border-control')).toBe(true)
  })

  it('returns minimal for generic AI use cases', () => {
    const result = matchAnnexIII({
      purpose: 'Generate marketing copy for blog posts',
    })

    expect(result.riskLevel).toBe('minimal')
    expect(result.matchedCategories).toHaveLength(0)
  })
})

describe('data integrity', () => {
  it('has 8 Annex III categories', () => {
    expect(ANNEX_III_CATEGORIES).toHaveLength(8)
    ANNEX_III_CATEGORIES.forEach((cat, i) => {
      expect(cat.number).toBe(i + 1)
      expect(cat.keywords.length).toBeGreaterThan(0)
    })
  })

  it('has 9 conformity steps', () => {
    expect(CONFORMITY_STEPS).toHaveLength(9)
    CONFORMITY_STEPS.forEach((step, i) => {
      expect(step.order).toBe(i + 1)
      expect(step.articles.length).toBeGreaterThan(0)
      expect(step.requirements.length).toBeGreaterThan(0)
    })
  })

  it('has 6 oversight requirements', () => {
    expect(OVERSIGHT_REQUIREMENTS).toHaveLength(6)
    OVERSIGHT_REQUIREMENTS.forEach(req => {
      expect(req.article).toMatch(/Article 14\(4\)/)
    })
  })

  it('has 8 prohibited practices', () => {
    expect(PROHIBITED_PRACTICES).toHaveLength(8)
    PROHIBITED_PRACTICES.forEach(p => {
      expect(p.article).toMatch(/Article 5/)
    })
  })
})
