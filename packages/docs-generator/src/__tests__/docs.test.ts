import { describe, it, expect } from 'vitest'
import { classify } from '@eu-compliance-bridge/ai-act-classifier'
import { generateAAIA } from '@eu-compliance-bridge/accessibility-bridge'
import { generateFRIA } from '@eu-compliance-bridge/fria-generator'
import { generateAnnexIV } from '../annex-iv.js'
import { generateAccessibilityStatement } from '../accessibility-statement.js'
import { generateComplianceReport } from '../compliance-report.js'

const classification = classify({
  name: 'Resume Screener',
  purpose: 'Automated CV screening and candidate ranking for recruitment',
  dataTypes: ['personal'],
  affectedPersons: ['employees'],
  decisionMaking: 'semi_automated',
})

describe('generateAnnexIV', () => {
  it('generates Annex IV technical documentation', () => {
    const doc = generateAnnexIV({
      systemName: 'Resume Screener',
      provider: 'TechCorp GmbH',
      version: '1.0.0',
      classification,
      description: 'An AI system that screens CVs and ranks candidates.',
      intendedPurpose: 'Automated first-stage screening of job applications.',
      dataTypes: ['personal', 'professional'],
      infrastructure: 'Cloud-based SaaS (AWS EU-West-1)',
    })

    expect(doc).toContain('# Technical Documentation')
    expect(doc).toContain('Resume Screener')
    expect(doc).toContain('HIGH')
    expect(doc).toContain('Article 16(l)')
    expect(doc).toContain('REQUIRED')
    // Contains all 9 conformity steps as checkboxes
    expect(doc).toContain('Risk management system')
    expect(doc).toContain('Post-market monitoring')
    expect(doc).toContain('- [ ]')
  })

  it('marks accessibility as not required for minimal risk', () => {
    const minimalClassification = classify({
      name: 'Weather App',
      purpose: 'Weather prediction from satellite data',
    })

    const doc = generateAnnexIV({
      systemName: 'Weather App',
      provider: 'WeatherCo',
      version: '2.0',
      classification: minimalClassification,
      description: 'Predicts weather.',
      intendedPurpose: 'Weather forecasting.',
      dataTypes: ['environmental'],
      infrastructure: 'On-premise servers',
    })

    expect(doc).toContain('Not mandatory')
  })
})

describe('generateAccessibilityStatement', () => {
  it('generates a complete accessibility statement', () => {
    const statement = generateAccessibilityStatement({
      systemName: 'Resume Screener',
      organization: 'TechCorp GmbH',
      url: 'https://screener.techcorp.eu',
      contactEmail: 'a11y@techcorp.eu',
      conformanceLevel: 'partial',
      accessibilityFeatures: [
        'Keyboard navigation for all interactive elements',
        'Screen reader compatible interface',
        'High contrast mode support',
      ],
      knownLimitations: [
        'AI-generated candidate rankings lack detailed text alternatives',
        'PDF export is not fully tagged for accessibility',
      ],
      testedWith: ['NVDA 2024.4', 'VoiceOver (macOS)', 'JAWS 2025'],
      evaluationMethod: 'both',
      evaluationDate: '2026-03-15',
    })

    expect(statement).toContain('# Accessibility Statement')
    expect(statement).toContain('partially conforms')
    expect(statement).toContain('NVDA')
    expect(statement).toContain('a11y@techcorp.eu')
    expect(statement).toContain('EN 301 549')
    expect(statement).toContain('Known Limitations')
  })

  it('includes AAIA results when provided', () => {
    const aaia = generateAAIA({
      systemName: 'Resume Screener',
      classification,
      interfaceType: 'web',
      hasVisualOutput: true,
      hasAudioOutput: false,
      requiresUserInput: true,
      makesDecisionsAboutPeople: true,
    })

    const statement = generateAccessibilityStatement({
      systemName: 'Resume Screener',
      organization: 'TechCorp GmbH',
      contactEmail: 'a11y@techcorp.eu',
      conformanceLevel: 'partial',
      aaiaResult: aaia,
    })

    expect(statement).toContain('Article 16(l)')
    expect(statement).toContain('high-risk')
    expect(statement).toContain('critical')
  })
})

describe('generateComplianceReport', () => {
  it('generates a combined compliance report', () => {
    const aaia = generateAAIA({
      systemName: 'Resume Screener',
      classification,
      interfaceType: 'web',
      hasVisualOutput: true,
      hasAudioOutput: false,
      requiresUserInput: true,
      makesDecisionsAboutPeople: true,
    })

    const fria = generateFRIA({
      systemName: 'Resume Screener',
      purpose: 'CV screening for recruitment',
      classification,
      deployerOrganization: 'TechCorp GmbH',
      sector: 'Technology',
      country: 'Germany',
      affectedPopulation: 'Job applicants',
      scale: 'national',
      makesDecisions: true,
      publicSector: false,
    })

    const report = generateComplianceReport({
      systemName: 'Resume Screener',
      organization: 'TechCorp GmbH',
      classification,
      aaia,
      fria,
    })

    expect(report).toContain('# EU AI Act Compliance Report')
    expect(report).toContain('HIGH')
    expect(report).toContain('## 2. AI Accessibility Impact Assessment')
    expect(report).toContain('## 3. Fundamental Rights Impact Assessment')
    expect(report).toContain('Article 14')
    expect(report).toContain('Article 43')
  })

  it('shows STOP for prohibited systems', () => {
    const prohibitedClassification = classify({
      name: 'Social Score',
      purpose: 'Social scoring and trustworthiness assessment of citizens for social credit',
      affectedPersons: ['public'],
    })

    const report = generateComplianceReport({
      systemName: 'Social Score',
      organization: 'GovCo',
      classification: prohibitedClassification,
    })

    expect(report).toContain('PROHIBITED')
    expect(report).toContain('STOP')
  })
})
