import { describe, it, expect } from 'vitest'
import { classify } from '@eucompliance/ai-act-classifier'
import { generateAAIA } from '../aaia.js'
import { AI_ACT_ACCESSIBILITY_MAPPINGS } from '../ai-act-mapping.js'
import { EN_301_549_CLAUSES } from '../en-301-549.js'

describe('generateAAIA', () => {
  it('generates critical requirements for high-risk AI with web interface', () => {
    const classification = classify({
      name: 'Resume Screener',
      purpose: 'Automated CV screening and candidate ranking for recruitment',
      dataTypes: ['personal'],
      affectedPersons: ['employees'],
      decisionMaking: 'semi_automated',
    })

    const aaia = generateAAIA({
      systemName: 'Resume Screener',
      classification,
      interfaceType: 'web',
      hasVisualOutput: true,
      hasAudioOutput: false,
      requiresUserInput: true,
      makesDecisionsAboutPeople: true,
    })

    expect(aaia.riskLevel).toBe('high')
    expect(aaia.complianceRequired).toBe(true)
    expect(aaia.summary.critical).toBeGreaterThanOrEqual(4)
    expect(aaia.summary.totalRequirements).toBeGreaterThanOrEqual(8)

    // Must include WCAG 2.1 AA requirement
    expect(aaia.requirements.some(r => r.clauseId === '9')).toBe(true)

    // Must include human oversight accessibility
    expect(aaia.requirements.some(r => r.clauseId === '5.5')).toBe(true)

    // Must include cognitive accessibility for decision explanations
    expect(aaia.requirements.some(r => r.clauseId === '4.2.10')).toBe(true)

    // Must include documentation accessibility
    expect(aaia.requirements.some(r => r.clauseId === '12.1')).toBe(true)
  })

  it('generates fewer requirements for limited-risk chatbot', () => {
    const classification = classify({
      name: 'Support Bot',
      purpose: 'Customer service chatbot for answering product questions',
    })

    const aaia = generateAAIA({
      systemName: 'Support Bot',
      classification,
      interfaceType: 'conversational',
      hasVisualOutput: false,
      hasAudioOutput: false,
      requiresUserInput: true,
      makesDecisionsAboutPeople: false,
    })

    expect(aaia.riskLevel).toBe('limited')
    expect(aaia.complianceRequired).toBe(false)
    expect(aaia.summary.critical).toBe(0)
    expect(aaia.summary.totalRequirements).toBeGreaterThan(0)

    // Should still have transparency requirements
    expect(aaia.requirements.some(r => r.sourceArticle.includes('Article 50'))).toBe(true)
  })

  it('generates minimal requirements for minimal-risk AI', () => {
    const classification = classify({
      name: 'Weather Forecast',
      purpose: 'Predict weather conditions based on satellite imagery',
    })

    const aaia = generateAAIA({
      systemName: 'Weather Forecast',
      classification,
      interfaceType: 'web',
      hasVisualOutput: true,
      hasAudioOutput: false,
      requiresUserInput: false,
      makesDecisionsAboutPeople: false,
    })

    expect(aaia.riskLevel).toBe('minimal')
    expect(aaia.complianceRequired).toBe(false)
    expect(aaia.summary.critical).toBe(0)
  })

  it('includes audio requirements when system has audio output', () => {
    const classification = classify({
      name: 'Voice Assistant',
      purpose: 'AI voice assistant for customer service in insurance call center',
      dataTypes: ['personal'],
      affectedPersons: ['customers'],
    })

    const aaia = generateAAIA({
      systemName: 'Voice Assistant',
      classification,
      interfaceType: 'conversational',
      hasVisualOutput: false,
      hasAudioOutput: true,
      requiresUserInput: true,
      makesDecisionsAboutPeople: false,
    })

    expect(aaia.requirements.some(r => r.clauseId === '4.2.4')).toBe(true)
    expect(aaia.requirements.some(r => r.clauseId === '4.2.6')).toBe(true)
  })

  it('includes decision transparency for systems that decide about people', () => {
    const classification = classify({
      name: 'Benefits Assessor',
      purpose: 'Social benefits eligibility assessment and scoring for welfare applications',
      affectedPersons: ['public'],
      decisionMaking: 'semi_automated',
    })

    const aaia = generateAAIA({
      systemName: 'Benefits Assessor',
      classification,
      interfaceType: 'web',
      hasVisualOutput: true,
      hasAudioOutput: false,
      requiresUserInput: true,
      makesDecisionsAboutPeople: true,
    })

    expect(aaia.riskLevel).toBe('high')

    // Must have critical requirement for cognitive accessibility of decisions
    const cogReq = aaia.requirements.find(r =>
      r.clauseId === '4.2.10' && r.priority === 'critical'
    )
    expect(cogReq).toBeDefined()
    expect(cogReq?.guidance.some(g => g.includes('plain language'))).toBe(true)
  })

  it('deduplicates requirements keeping highest priority', () => {
    const classification = classify({
      name: 'HR System',
      purpose: 'Employee performance monitoring and recruitment CV screening',
      dataTypes: ['personal'],
      affectedPersons: ['employees'],
      decisionMaking: 'fully_automated',
    })

    const aaia = generateAAIA({
      systemName: 'HR System',
      classification,
      interfaceType: 'web',
      hasVisualOutput: true,
      hasAudioOutput: true,
      requiresUserInput: true,
      makesDecisionsAboutPeople: true,
    })

    // Check no duplicate clause IDs
    const clauseIds = aaia.requirements.map(r => r.clauseId)
    const uniqueIds = new Set(clauseIds)
    expect(clauseIds.length).toBe(uniqueIds.size)
  })
})

describe('data integrity', () => {
  it('has AI Act accessibility mappings', () => {
    expect(AI_ACT_ACCESSIBILITY_MAPPINGS.length).toBeGreaterThanOrEqual(7)
    AI_ACT_ACCESSIBILITY_MAPPINGS.forEach(m => {
      expect(m.aiActArticle).toBeTruthy()
      expect(m.en301549Clauses.length).toBeGreaterThan(0)
      expect(m.guidance.length).toBeGreaterThan(0)
    })
  })

  it('has EN 301 549 clauses with AI relevance annotations', () => {
    expect(EN_301_549_CLAUSES.length).toBeGreaterThanOrEqual(25)
    const aiRelevant = EN_301_549_CLAUSES.filter(c => c.aiRelevant)
    expect(aiRelevant.length).toBeGreaterThanOrEqual(20)
    aiRelevant.forEach(c => {
      expect(c.aiRationale).toBeTruthy()
    })
  })

  it('Article 16(l) mapping covers all top-level EN 301 549 clause groups', () => {
    const article16l = AI_ACT_ACCESSIBILITY_MAPPINGS.find(m => m.aiActArticle === 'Article 16(l)')
    expect(article16l).toBeDefined()
    expect(article16l!.en301549Clauses).toContain('4')
    expect(article16l!.en301549Clauses).toContain('5')
    expect(article16l!.en301549Clauses).toContain('9')
    expect(article16l!.en301549Clauses).toContain('10')
    expect(article16l!.en301549Clauses).toContain('11')
    expect(article16l!.en301549Clauses).toContain('12')
  })
})
