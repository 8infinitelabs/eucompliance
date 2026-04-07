/**
 * AI Act → EN 301 549 Mapping
 *
 * This is the core innovation of eu-compliance-bridge.
 * No other tool implements this mapping.
 *
 * For each AI Act article relevant to accessibility,
 * this module maps the specific EN 301 549 clauses that must be met.
 */

export interface AIActAccessibilityMapping {
  /** AI Act article reference */
  aiActArticle: string
  /** AI Act article title */
  title: string
  /** What the article requires regarding accessibility */
  accessibilityRequirement: string
  /** EN 301 549 clauses that operationalize this requirement */
  en301549Clauses: string[]
  /** Practical guidance for implementation */
  guidance: string[]
  /** Who must comply: 'provider' | 'deployer' | 'both' */
  obligatedRole: 'provider' | 'deployer' | 'both'
  /** Risk level this applies to */
  appliesTo: ('high' | 'limited' | 'all')[]
}

export const AI_ACT_ACCESSIBILITY_MAPPINGS: AIActAccessibilityMapping[] = [
  {
    aiActArticle: 'Article 16(l)',
    title: 'Obligations of providers — Accessibility',
    accessibilityRequirement:
      'Providers of high-risk AI systems shall ensure that the AI system is in compliance with accessibility requirements in accordance with Directives (EU) 2016/2102 and (EU) 2019/882 [EAA].',
    en301549Clauses: ['4', '5', '9', '10', '11', '12'],
    guidance: [
      'All user-facing interfaces of the AI system must meet WCAG 2.1 Level AA (EN 301 549 Clause 9)',
      'Non-web software interfaces must meet EN 301 549 Clause 11 requirements',
      'All generated documentation must be in accessible formats (Clause 10)',
      'Product documentation and support must be accessible (Clause 12)',
      'System must be operable without vision, hearing, or fine motor control (Clause 4)',
      'Biometric-based AI must provide alternative authentication methods (Clause 5.3)',
    ],
    obligatedRole: 'provider',
    appliesTo: ['high'],
  },
  {
    aiActArticle: 'Article 9(9)',
    title: 'Risk management — Vulnerable groups',
    accessibilityRequirement:
      'The risk management system shall take into account the impact on persons with disabilities, considering their specific needs and the potential for disproportionate impact.',
    en301549Clauses: ['4.2.1', '4.2.2', '4.2.4', '4.2.6', '4.2.7', '4.2.10'],
    guidance: [
      'Risk assessment must explicitly evaluate impact on users who are blind or have low vision (4.2.1, 4.2.2)',
      'Risk assessment must evaluate impact on Deaf and hard of hearing users (4.2.4)',
      'Risk assessment must evaluate impact on users with motor disabilities (4.2.7)',
      'Risk assessment must evaluate impact on users with cognitive disabilities (4.2.10)',
      'Foreseeable misuse scenarios must include usage by persons with disabilities',
      'Testing must include participants with disabilities or use validated simulation methods',
    ],
    obligatedRole: 'provider',
    appliesTo: ['high'],
  },
  {
    aiActArticle: 'Article 13',
    title: 'Transparency and provision of information to deployers',
    accessibilityRequirement:
      'Instructions for use must be provided in an appropriate digital format or otherwise, and shall include concise, complete, correct and clear information that is relevant, accessible and comprehensible to deployers.',
    en301549Clauses: ['9.3.1', '10', '12.1', '4.2.10'],
    guidance: [
      'Instructions must be written at a reading level appropriate for the intended audience (9.3.1)',
      'Instructions in PDF or document form must be accessible (Clause 10)',
      'Product documentation must list accessibility features and be in accessible formats (12.1)',
      'Information about system limitations must be understandable by users with cognitive disabilities (4.2.10)',
      'Use plain language, avoid jargon, provide examples',
    ],
    obligatedRole: 'provider',
    appliesTo: ['high'],
  },
  {
    aiActArticle: 'Article 14',
    title: 'Human oversight',
    accessibilityRequirement:
      'Human-machine interface tools for oversight must be accessible. The ability to intervene, override, or stop the AI system must be available to all users regardless of disability.',
    en301549Clauses: ['5.5', '5.9', '9.2.1', '4.2.7', '4.2.6'],
    guidance: [
      'The "stop button" or intervention mechanism must be keyboard accessible (9.2.1)',
      'Override controls must not require fine motor skills or tight grasping (5.5)',
      'Emergency stop must not require simultaneous user actions (5.9)',
      'Oversight dashboards must be usable without vision (screen reader compatible)',
      'Alert notifications must be perceivable through multiple channels (visual + audio + haptic)',
      'Users with disabilities must be able to exercise all oversight functions',
    ],
    obligatedRole: 'both',
    appliesTo: ['high'],
  },
  {
    aiActArticle: 'Article 50',
    title: 'Transparency obligations for certain AI systems',
    accessibilityRequirement:
      'Disclosure that a person is interacting with an AI system must be provided in an accessible manner. AI-generated content markings must be perceivable by all users.',
    en301549Clauses: ['9.1.1', '9.1.3', '9.3.1', '4.2.1', '4.2.4'],
    guidance: [
      'AI system disclosure notices must have text alternatives if presented visually (9.1.1)',
      'Disclosure information must be programmatically determinable (9.1.3)',
      'Disclosure text must be written in plain language (9.3.1)',
      'Disclosure must be perceivable without vision (4.2.1) and without hearing (4.2.4)',
      'AI-generated content watermarks/labels must be accessible to assistive technologies',
    ],
    obligatedRole: 'both',
    appliesTo: ['limited', 'all'],
  },
  {
    aiActArticle: 'Article 27',
    title: 'Fundamental rights impact assessment',
    accessibilityRequirement:
      'FRIAs must assess impact on persons with disabilities. The assessment process itself must be accessible to stakeholders with disabilities.',
    en301549Clauses: ['4.2.10', '10', '12.1'],
    guidance: [
      'FRIA must include specific section on disability impact',
      'Consultation with disability organizations should be documented',
      'FRIA output documents must be in accessible formats (Clause 10)',
      'Assessment methodology must be usable by non-technical stakeholders including persons with disabilities',
    ],
    obligatedRole: 'deployer',
    appliesTo: ['high'],
  },
  {
    aiActArticle: 'Article 11 + Annex IV',
    title: 'Technical documentation',
    accessibilityRequirement:
      'Technical documentation must be accessible. Accessibility features and limitations must be documented as part of the system description.',
    en301549Clauses: ['10', '12.1'],
    guidance: [
      'Technical documentation PDFs must be tagged and accessible (Clause 10)',
      'Documentation must explicitly describe accessibility features of the AI system (12.1)',
      'Known accessibility limitations must be listed in the system description',
      'Testing results must include accessibility testing methodology and outcomes',
    ],
    obligatedRole: 'provider',
    appliesTo: ['high'],
  },
]
