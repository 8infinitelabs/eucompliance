import { describe, it, expect } from 'vitest'
import { classify } from '@eucompliance/ai-act-classifier'
import { generateFRIA } from '../generator.js'
import { FUNDAMENTAL_RIGHTS } from '../rights-catalog.js'

describe('generateFRIA', () => {
  it('generates complete FRIA for public sector benefits system', () => {
    const classification = classify({
      name: 'Benefits Assessor',
      purpose: 'Social benefits eligibility assessment and scoring for welfare applications',
      affectedPersons: ['public'],
      decisionMaking: 'semi_automated',
    })

    const fria = generateFRIA({
      systemName: 'Benefits Assessor',
      purpose: 'Automated assessment of welfare benefit eligibility',
      classification,
      deployerOrganization: 'Municipality of Barcelona',
      sector: 'Public administration',
      country: 'Spain',
      affectedPopulation: 'Citizens applying for social welfare benefits',
      scale: 'regional',
      makesDecisions: true,
      publicSector: true,
    })

    expect(fria.metadata.riskLevel).toBe('high')
    expect(fria.metadata.article27Applicable).toBe(true)
    expect(fria.summary.highRelevance).toBeGreaterThanOrEqual(3)
    expect(fria.summary.disabilityRisksIdentified).toBeGreaterThan(0)

    // Social security right should be high relevance
    const socialSecurity = fria.identifiedRights.find(r => r.right.id === 'social-security')
    expect(socialSecurity?.relevance).toBe('high')

    // Disability integration should be high relevance
    const disability = fria.identifiedRights.find(r => r.right.id === 'disability-integration')
    expect(disability?.relevance).toBe('high')

    // Non-discrimination always high
    const nonDiscrimination = fria.identifiedRights.find(r => r.right.id === 'non-discrimination')
    expect(nonDiscrimination?.relevance).toBe('high')

    // Report should be generated
    expect(fria.generatedReport).toContain('# Fundamental Rights Impact Assessment')
    expect(fria.generatedReport).toContain('Benefits Assessor')
    expect(fria.generatedReport).toContain('Disability Impact Assessment')
  })

  it('generates FRIA for recruitment AI', () => {
    const classification = classify({
      name: 'Resume Screener',
      purpose: 'Automated CV screening and candidate ranking for recruitment hiring',
      dataTypes: ['personal'],
      affectedPersons: ['employees'],
      decisionMaking: 'semi_automated',
    })

    const fria = generateFRIA({
      systemName: 'Resume Screener',
      purpose: 'CV screening for recruitment',
      classification,
      deployerOrganization: 'TechCorp GmbH',
      sector: 'Technology',
      country: 'Germany',
      affectedPopulation: 'Job applicants in the EU',
      scale: 'national',
      makesDecisions: true,
      publicSector: false,
    })

    // Employment right should be high
    const employment = fria.identifiedRights.find(r => r.right.id === 'right-work')
    expect(employment?.relevance).toBe('high')
    expect(employment?.risks.length).toBeGreaterThan(0)
    expect(employment?.mitigations.length).toBeGreaterThan(0)

    // Effective remedy should be relevant (makes decisions)
    const remedy = fria.identifiedRights.find(r => r.right.id === 'effective-remedy')
    expect(remedy?.relevance).toBe('high')
  })

  it('includes mitigation priorities', () => {
    const classification = classify({
      name: 'Credit Scorer',
      purpose: 'Credit scoring and lending decision for loan applications',
      dataTypes: ['financial', 'personal'],
      affectedPersons: ['customers'],
    })

    const fria = generateFRIA({
      systemName: 'Credit Scorer',
      purpose: 'Automated credit scoring',
      classification,
      deployerOrganization: 'Bank of Spain',
      sector: 'Banking',
      country: 'Spain',
      affectedPopulation: 'Loan applicants',
      scale: 'national',
      makesDecisions: true,
      publicSector: false,
    })

    expect(fria.mitigationPriorities.length).toBeGreaterThan(0)
    expect(fria.mitigationPriorities.some(p => p.includes('AAIA'))).toBe(true)
    expect(fria.mitigationPriorities.some(p => p.includes('human oversight'))).toBe(true)
  })

  it('marks Article 27 as not applicable for private non-decision systems', () => {
    const classification = classify({
      name: 'Chatbot',
      purpose: 'Customer service chatbot for product inquiries',
    })

    const fria = generateFRIA({
      systemName: 'Chatbot',
      purpose: 'Customer support chatbot',
      classification,
      deployerOrganization: 'Shop EU',
      sector: 'Retail',
      country: 'France',
      affectedPopulation: 'Online shoppers',
      scale: 'eu-wide',
      makesDecisions: false,
      publicSector: false,
    })

    expect(fria.metadata.article27Applicable).toBe(false)
  })

  it('generates readable Markdown report', () => {
    const classification = classify({
      name: 'Student Grader',
      purpose: 'AI-based exam scoring and grading for university education',
      affectedPersons: ['public'],
    })

    const fria = generateFRIA({
      systemName: 'Student Grader',
      purpose: 'Automated exam scoring',
      classification,
      deployerOrganization: 'University of Amsterdam',
      sector: 'Education',
      country: 'Netherlands',
      affectedPopulation: 'University students',
      scale: 'local',
      makesDecisions: true,
      publicSector: true,
    })

    expect(fria.generatedReport).toContain('## High-Relevance Rights')
    expect(fria.generatedReport).toContain('## Mitigation Priorities')
    expect(fria.generatedReport).toContain('## Next Steps')
    expect(fria.generatedReport).toContain('national supervisory authority')
  })
})

describe('rights catalog', () => {
  it('has at least 10 fundamental rights', () => {
    expect(FUNDAMENTAL_RIGHTS.length).toBeGreaterThanOrEqual(10)
  })

  it('all rights have assessment questions', () => {
    FUNDAMENTAL_RIGHTS.forEach(right => {
      expect(right.assessmentQuestions.length).toBeGreaterThan(0)
    })
  })

  it('disability-relevant rights have disability considerations', () => {
    const disabilityRelevant = FUNDAMENTAL_RIGHTS.filter(r => r.disabilityRelevant)
    expect(disabilityRelevant.length).toBeGreaterThanOrEqual(8)
    disabilityRelevant.forEach(right => {
      expect(right.disabilityConsiderations).toBeDefined()
      expect(right.disabilityConsiderations!.length).toBeGreaterThan(0)
    })
  })

  it('includes Article 26 — Integration of persons with disabilities', () => {
    const article26 = FUNDAMENTAL_RIGHTS.find(r => r.charterArticle === 'Article 26')
    expect(article26).toBeDefined()
    expect(article26!.id).toBe('disability-integration')
  })
})
