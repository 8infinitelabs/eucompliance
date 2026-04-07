/**
 * EN 301 549 v3.2.1 — Accessibility requirements for ICT products and services
 *
 * This is the European harmonised standard referenced by the EAA (Directive 2019/882)
 * and required by EU AI Act Article 16(l) for high-risk AI systems.
 *
 * Structure: Clauses 4-14, with sub-clauses for specific requirements.
 * Clause 9 (Web) incorporates WCAG 2.1 Level AA success criteria.
 */

export interface EN301549Clause {
  id: string
  title: string
  description: string
  /** Parent clause ID, if this is a sub-clause */
  parent?: string
  /** WCAG 2.1 success criterion ID, if applicable (Clause 9) */
  wcag?: string
  /** Whether this clause is particularly relevant for AI systems */
  aiRelevant: boolean
  /** Why this clause matters for AI systems (only when aiRelevant=true) */
  aiRationale?: string
}

export const EN_301_549_CLAUSES: EN301549Clause[] = [
  // === Clause 4: Functional Performance Statements ===
  {
    id: '4',
    title: 'Functional performance statements',
    description: 'High-level statements describing the functional outcomes that ICT must achieve for accessibility.',
    aiRelevant: true,
    aiRationale: 'AI system outputs must be perceivable, operable, and understandable regardless of user abilities.',
  },
  {
    id: '4.2.1',
    title: 'Usage without vision',
    description: 'ICT must provide at least one mode of operation that does not require vision.',
    parent: '4',
    aiRelevant: true,
    aiRationale: 'AI-generated visual outputs (charts, images, UI elements) must have non-visual alternatives.',
  },
  {
    id: '4.2.2',
    title: 'Usage with limited vision',
    description: 'ICT must provide at least one mode of operation that enables users with limited vision to use it.',
    parent: '4',
    aiRelevant: true,
    aiRationale: 'AI dashboards and visualizations must support zoom, contrast, and screen magnification.',
  },
  {
    id: '4.2.3',
    title: 'Usage without perception of colour',
    description: 'ICT must provide at least one mode that does not require colour perception.',
    parent: '4',
    aiRelevant: true,
    aiRationale: 'AI risk level indicators and status displays must not rely solely on colour.',
  },
  {
    id: '4.2.4',
    title: 'Usage without hearing',
    description: 'ICT must provide at least one mode of operation that does not require hearing.',
    parent: '4',
    aiRelevant: true,
    aiRationale: 'AI voice interfaces and audio outputs must provide text/visual alternatives.',
  },
  {
    id: '4.2.5',
    title: 'Usage with limited hearing',
    description: 'ICT must provide features for users with limited hearing.',
    parent: '4',
    aiRelevant: false,
  },
  {
    id: '4.2.6',
    title: 'Usage with no or limited vocal capability',
    description: 'ICT must provide at least one mode that does not require vocal input.',
    parent: '4',
    aiRelevant: true,
    aiRationale: 'Voice-controlled AI systems must provide alternative input methods.',
  },
  {
    id: '4.2.7',
    title: 'Usage with limited manipulation or strength',
    description: 'ICT must provide at least one mode usable with limited fine motor control.',
    parent: '4',
    aiRelevant: true,
    aiRationale: 'AI system controls (start/stop, override buttons per Article 14) must be operable without fine motor control.',
  },
  {
    id: '4.2.8',
    title: 'Usage with limited reach',
    description: 'ICT hardware must be operable by users with limited reach.',
    parent: '4',
    aiRelevant: false,
  },
  {
    id: '4.2.9',
    title: 'Minimize photosensitive seizure triggers',
    description: 'ICT must minimize risk of triggering photosensitive seizures.',
    parent: '4',
    aiRelevant: true,
    aiRationale: 'AI-generated animations and dynamic content must not trigger seizures.',
  },
  {
    id: '4.2.10',
    title: 'Usage with limited cognition, language or learning',
    description: 'ICT must provide features that make it simpler and easier to use.',
    parent: '4',
    aiRelevant: true,
    aiRationale: 'Critical for AI transparency (Article 13): explanations of AI decisions must be understandable by users with cognitive disabilities.',
  },
  {
    id: '4.2.11',
    title: 'Privacy',
    description: 'ICT accessibility features must preserve user privacy.',
    parent: '4',
    aiRelevant: true,
    aiRationale: 'Accessibility accommodations for AI systems must not expose sensitive user data.',
  },

  // === Clause 5: Generic Requirements ===
  {
    id: '5',
    title: 'Generic requirements',
    description: 'Requirements applicable to all ICT regardless of type.',
    aiRelevant: true,
    aiRationale: 'All AI system interfaces must meet these baseline requirements.',
  },
  {
    id: '5.2',
    title: 'Activation of accessibility features',
    description: 'ICT must maintain active accessibility features. Accessibility features must not be removed or made non-functional.',
    parent: '5',
    aiRelevant: true,
    aiRationale: 'AI system updates and retraining must not break existing accessibility features.',
  },
  {
    id: '5.3',
    title: 'Biometrics',
    description: 'Where ICT uses biological characteristics, it must not rely on a single biological characteristic as the only means of identification.',
    parent: '5',
    aiRelevant: true,
    aiRationale: 'Directly relevant to Annex III category 1 (biometric identification). Biometric AI must offer alternative authentication.',
  },
  {
    id: '5.4',
    title: 'Preservation of accessibility information during conversion',
    description: 'When ICT converts information, accessibility information must be preserved.',
    parent: '5',
    aiRelevant: true,
    aiRationale: 'AI content transformation (summarization, translation, format conversion) must preserve accessibility metadata.',
  },
  {
    id: '5.5',
    title: 'Operable parts',
    description: 'Operable parts must be perceivable and operable without requiring tight grasping, pinching, or twisting.',
    parent: '5',
    aiRelevant: true,
    aiRationale: 'Human oversight controls (Article 14 "stop button") must be physically operable by persons with motor disabilities.',
  },
  {
    id: '5.6',
    title: 'Locking or toggle controls',
    description: 'Status of locking or toggle controls must be perceivable visually and through touch or sound.',
    parent: '5',
    aiRelevant: true,
    aiRationale: 'AI system on/off states and mode toggles must be perceivable through multiple modalities.',
  },
  {
    id: '5.7',
    title: 'Key repeat',
    description: 'Where key repeat is supported, the delay before repeat and the repeat rate must be adjustable.',
    parent: '5',
    aiRelevant: false,
  },
  {
    id: '5.8',
    title: 'Double-strike key acceptance',
    description: 'Where ICT has a keyboard, the delay for double-strike key acceptance must be adjustable.',
    parent: '5',
    aiRelevant: false,
  },
  {
    id: '5.9',
    title: 'Simultaneous user actions',
    description: 'ICT must not require simultaneous user actions unless essential.',
    parent: '5',
    aiRelevant: true,
    aiRationale: 'AI system emergency controls must not require simultaneous key presses.',
  },

  // === Clause 9: Web (WCAG 2.1 AA) ===
  {
    id: '9',
    title: 'Web',
    description: 'Web content must conform to WCAG 2.1 Level AA. This clause incorporates all Level A and AA success criteria.',
    aiRelevant: true,
    aiRationale: 'Web-based AI interfaces (dashboards, chatbots, forms) must meet WCAG 2.1 AA.',
  },
  {
    id: '9.1',
    title: 'Perceivable',
    description: 'Information and user interface components must be presentable to users in ways they can perceive.',
    parent: '9',
    aiRelevant: true,
    aiRationale: 'AI outputs (classifications, recommendations, risk scores) must be perceivable through multiple senses.',
  },
  {
    id: '9.1.1',
    title: 'Non-text content',
    description: 'All non-text content has a text alternative (WCAG 1.1.1).',
    parent: '9',
    wcag: '1.1.1',
    aiRelevant: true,
    aiRationale: 'AI-generated images, charts, and visualizations must have text alternatives. AI-generated alt text must itself be accurate.',
  },
  {
    id: '9.1.3',
    title: 'Adaptable',
    description: 'Content can be presented in different ways without losing information or structure (WCAG 1.3.x).',
    parent: '9',
    wcag: '1.3',
    aiRelevant: true,
    aiRationale: 'AI-generated content structure must be programmatically determinable (headings, lists, tables in AI outputs).',
  },
  {
    id: '9.1.4',
    title: 'Distinguishable',
    description: 'Content is easy to see and hear, including separating foreground from background (WCAG 1.4.x).',
    parent: '9',
    wcag: '1.4',
    aiRelevant: true,
    aiRationale: 'AI dashboard visualizations must meet contrast ratios. AI-generated content must not override user color preferences.',
  },
  {
    id: '9.2.1',
    title: 'Keyboard accessible',
    description: 'All functionality available from a keyboard (WCAG 2.1.x).',
    parent: '9',
    wcag: '2.1',
    aiRelevant: true,
    aiRationale: 'AI system controls, including human oversight "stop" button (Article 14), must be keyboard accessible.',
  },
  {
    id: '9.2.4',
    title: 'Navigable',
    description: 'Ways to help users navigate, find content, and determine where they are (WCAG 2.4.x).',
    parent: '9',
    wcag: '2.4',
    aiRelevant: true,
    aiRationale: 'AI system workflows (classification, assessment, documentation) must have clear navigation and focus management.',
  },
  {
    id: '9.3.1',
    title: 'Readable',
    description: 'Text content is readable and understandable (WCAG 3.1.x).',
    parent: '9',
    wcag: '3.1',
    aiRelevant: true,
    aiRationale: 'AI-generated explanations (Article 13 transparency) must be written at an appropriate reading level.',
  },
  {
    id: '9.3.2',
    title: 'Predictable',
    description: 'Web pages appear and operate in predictable ways (WCAG 3.2.x).',
    parent: '9',
    wcag: '3.2',
    aiRelevant: true,
    aiRationale: 'AI system behavior must be predictable. Context changes from AI actions must be communicated.',
  },
  {
    id: '9.3.3',
    title: 'Input assistance',
    description: 'Help users avoid and correct mistakes (WCAG 3.3.x).',
    parent: '9',
    wcag: '3.3',
    aiRelevant: true,
    aiRationale: 'AI system inputs must have error prevention and correction. Critical for Article 14(4)(d) — ability to override AI decisions.',
  },
  {
    id: '9.4.1',
    title: 'Compatible',
    description: 'Content is compatible with assistive technologies (WCAG 4.1.x).',
    parent: '9',
    wcag: '4.1',
    aiRelevant: true,
    aiRationale: 'AI interfaces must work with screen readers, voice control, and other assistive technologies.',
  },

  // === Clause 10: Non-web documents ===
  {
    id: '10',
    title: 'Non-web documents',
    description: 'Requirements for non-web documents such as PDFs, office documents, and reports.',
    aiRelevant: true,
    aiRationale: 'AI-generated compliance documents (Annex IV, FRIA, transparency notices) must be accessible.',
  },

  // === Clause 11: Software ===
  {
    id: '11',
    title: 'Software',
    description: 'Requirements for software applications including platform software and native apps.',
    aiRelevant: true,
    aiRationale: 'AI applications delivered as software (not web) must meet these requirements.',
  },
  {
    id: '11.5',
    title: 'Interoperability with assistive technology',
    description: 'Software must provide sufficient information for assistive technology to present an accessible interface.',
    parent: '11',
    aiRelevant: true,
    aiRationale: 'AI application UIs must expose accessibility information to platform accessibility APIs.',
  },
  {
    id: '11.7',
    title: 'User preferences',
    description: 'Software must respect platform accessibility settings (high contrast, font size, etc.).',
    parent: '11',
    aiRelevant: true,
    aiRationale: 'AI system interfaces must respect user accessibility preferences from the operating system.',
  },

  // === Clause 12: Documentation and support services ===
  {
    id: '12',
    title: 'Documentation and support services',
    description: 'Product documentation and support services must themselves be accessible.',
    aiRelevant: true,
    aiRationale: 'AI Act Article 13 requires providing instructions for use. These instructions must be accessible per this clause.',
  },
  {
    id: '12.1',
    title: 'Product documentation',
    description: 'Documentation must list and explain accessibility features. Must be available in accessible formats.',
    parent: '12',
    aiRelevant: true,
    aiRationale: 'AI technical documentation (Annex IV) and transparency notices (Article 50) must be in accessible formats.',
  },
  {
    id: '12.2',
    title: 'Support services',
    description: 'Support services must provide information on accessibility features and be accessible themselves.',
    parent: '12',
    aiRelevant: true,
    aiRationale: 'Help and support for AI system users must be accessible to users with disabilities.',
  },

  // === Clause 13: ICT providing relay or emergency service access ===
  {
    id: '13',
    title: 'ICT providing relay or emergency service access',
    description: 'Requirements for ICT used to access emergency services or relay services.',
    aiRelevant: true,
    aiRationale: 'Relevant for Annex III category 5 (essential services) — AI in emergency dispatch must ensure accessible communication.',
  },
]
