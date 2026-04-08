#!/usr/bin/env node

/**
 * EU Compliance Bridge CLI
 *
 * Usage:
 *   npx eu-compliance-bridge classify "description of AI system"
 *   npx eu-compliance-bridge aaia --name "System" --purpose "What it does" --interface web
 *   npx eu-compliance-bridge fria --name "System" --purpose "What it does" --org "Org" --sector "Sector" --country "Country"
 *   npx eu-compliance-bridge report --name "System" --purpose "What it does" --org "Org"
 */

import { classify } from '@eucompliance/ai-act-classifier'
import { generateAAIA } from '@eucompliance/accessibility-bridge'
import { generateFRIA } from '@eucompliance/fria-generator'
import { generateComplianceReport } from '@eucompliance/docs-generator'

const args = process.argv.slice(2)
const command = args[0]

function getFlag(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`)
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined
}

function printHelp() {
  console.log(`
eu-compliance-bridge — EU AI Act + EAA compliance toolkit

Commands:
  classify <description>     Classify AI system risk level
  aaia                       Generate AI Accessibility Impact Assessment
  fria                       Generate Fundamental Rights Impact Assessment
  report                     Generate combined compliance report

Options (for aaia, fria, report):
  --name <name>              AI system name
  --purpose <purpose>        AI system purpose
  --interface <type>         Interface type: web, mobile, conversational, api
  --org <organization>       Deployer organization (fria, report)
  --sector <sector>          Sector (fria)
  --country <country>        Country (fria)
  --scale <scale>            Scale: local, regional, national, eu-wide (fria)
  --public-sector            Flag as public sector deployment (fria)

Examples:
  npx eu-compliance-bridge classify "CV screening for recruitment"
  npx eu-compliance-bridge aaia --name "Chatbot" --purpose "Customer support" --interface conversational
  npx eu-compliance-bridge report --name "Credit Scorer" --purpose "Loan decisions" --org "Bank EU"
`)
}

function runClassify() {
  const description = args.slice(1).filter((a: string) => !a.startsWith('--')).join(' ')
  if (!description) {
    console.error('Error: provide a description. Example: npx eu-compliance-bridge classify "CV screening for recruitment"')
    process.exit(1)
  }

  const result = classify({ name: 'CLI Assessment', purpose: description })

  console.log(`\n  Risk Level:    ${result.riskLevel.toUpperCase()}`)
  console.log(`  Confidence:    ${Math.round(result.confidence * 100)}%`)
  console.log(`  Accessibility: ${result.accessibilityRequired ? 'REQUIRED (Article 16(l))' : 'Not required'}`)
  console.log(`\n  Reasoning: ${result.reasoning}`)

  if (result.applicableAnnexItems.length > 0) {
    console.log(`\n  Annex III:`)
    result.applicableAnnexItems.forEach(i => console.log(`    - ${i}`))
  }

  console.log(`\n  Obligations:`)
  result.obligations.forEach(o => console.log(`    - ${o}`))
  console.log()
}

function runAAIA() {
  const name = getFlag('name') ?? 'Unnamed System'
  const purpose = getFlag('purpose') ?? ''
  const interfaceType = (getFlag('interface') ?? 'web') as 'web' | 'mobile' | 'conversational' | 'api'

  if (!purpose) {
    console.error('Error: --purpose is required')
    process.exit(1)
  }

  const classification = classify({ name, purpose })
  const aaia = generateAAIA({
    systemName: name,
    classification,
    interfaceType,
    hasVisualOutput: interfaceType !== 'api',
    hasAudioOutput: interfaceType === 'conversational',
    requiresUserInput: true,
    makesDecisionsAboutPeople: true,
  })

  console.log(`\n  AI Accessibility Impact Assessment: ${name}`)
  console.log(`  Risk Level: ${aaia.riskLevel.toUpperCase()}`)
  console.log(`  Compliance Required: ${aaia.complianceRequired}`)
  console.log(`  Requirements: ${aaia.summary.totalRequirements} (${aaia.summary.critical} critical, ${aaia.summary.high} high)\n`)

  for (const req of aaia.requirements) {
    console.log(`  [${req.priority.toUpperCase()}] ${req.clauseTitle} (EN 301 549 ${req.clauseId})`)
    console.log(`    ${req.rationale}`)
    req.guidance.forEach(g => console.log(`    - ${g}`))
    console.log()
  }
}

function runFRIA() {
  const name = getFlag('name') ?? 'Unnamed System'
  const purpose = getFlag('purpose') ?? ''
  const org = getFlag('org') ?? 'Unknown Organization'
  const sector = getFlag('sector') ?? 'Unknown'
  const country = getFlag('country') ?? 'EU'
  const scale = (getFlag('scale') ?? 'national') as 'local' | 'regional' | 'national' | 'eu-wide'
  const publicSector = args.includes('--public-sector')

  if (!purpose) {
    console.error('Error: --purpose is required')
    process.exit(1)
  }

  const classification = classify({ name, purpose })
  const fria = generateFRIA({
    systemName: name,
    purpose,
    classification,
    deployerOrganization: org,
    sector,
    country,
    affectedPopulation: `People affected by ${purpose.toLowerCase()}`,
    scale,
    makesDecisions: true,
    publicSector,
  })

  console.log(fria.generatedReport)
}

function runReport() {
  const name = getFlag('name') ?? 'Unnamed System'
  const purpose = getFlag('purpose') ?? ''
  const org = getFlag('org') ?? 'Unknown Organization'
  const interfaceType = (getFlag('interface') ?? 'web') as 'web' | 'mobile' | 'conversational' | 'api'

  if (!purpose) {
    console.error('Error: --purpose is required')
    process.exit(1)
  }

  const classification = classify({ name, purpose })

  const aaia = generateAAIA({
    systemName: name,
    classification,
    interfaceType,
    hasVisualOutput: true,
    hasAudioOutput: false,
    requiresUserInput: true,
    makesDecisionsAboutPeople: true,
  })

  const fria = generateFRIA({
    systemName: name,
    purpose,
    classification,
    deployerOrganization: org,
    sector: 'Unknown',
    country: 'EU',
    affectedPopulation: `People affected by ${purpose.toLowerCase()}`,
    scale: 'national',
    makesDecisions: true,
    publicSector: false,
  })

  const report = generateComplianceReport({
    systemName: name,
    organization: org,
    classification,
    aaia,
    fria,
  })

  console.log(report)
}

switch (command) {
  case 'classify':
    runClassify()
    break
  case 'aaia':
    runAAIA()
    break
  case 'fria':
    runFRIA()
    break
  case 'report':
    runReport()
    break
  case '--help':
  case '-h':
  case 'help':
  case undefined:
    printHelp()
    break
  default:
    console.error(`Unknown command: ${command}`)
    printHelp()
    process.exit(1)
}
