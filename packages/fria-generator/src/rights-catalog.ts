/**
 * EU Charter of Fundamental Rights — Rights catalog for FRIA
 *
 * Article 27 of the EU AI Act requires deployers of high-risk AI systems
 * to assess the impact on fundamental rights. This catalog maps the
 * Charter rights most affected by AI systems.
 *
 * Based on: DIHR/ECNL Operational Guide (December 2025) and
 * EU Charter of Fundamental Rights (2012/C 326/02)
 */

export interface FundamentalRight {
  id: string
  /** Charter article number */
  charterArticle: string
  title: string
  description: string
  /** How AI systems typically impact this right */
  aiImpactExamples: string[]
  /** Questions to assess impact on this right */
  assessmentQuestions: string[]
  /** Whether this right has a disability-specific dimension */
  disabilityRelevant: boolean
  /** Disability-specific considerations */
  disabilityConsiderations?: string[]
}

export const FUNDAMENTAL_RIGHTS: FundamentalRight[] = [
  {
    id: 'human-dignity',
    charterArticle: 'Article 1',
    title: 'Human dignity',
    description: 'Human dignity is inviolable. It must be respected and protected.',
    aiImpactExamples: [
      'AI systems that reduce people to data points or scores',
      'Automated decisions that strip individual agency',
      'AI-generated content that demeans or objectifies individuals',
    ],
    assessmentQuestions: [
      'Does the AI system treat individuals as means rather than ends?',
      'Could the system reduce a person\'s sense of autonomy or self-worth?',
      'Does the system allow individuals to understand and challenge decisions about them?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'Does the AI system perpetuate ableist assumptions about capability or productivity?',
      'Are persons with disabilities assessed by the same criteria as non-disabled persons without accommodation?',
    ],
  },
  {
    id: 'non-discrimination',
    charterArticle: 'Article 21',
    title: 'Non-discrimination',
    description: 'Any discrimination based on any ground such as sex, race, colour, ethnic or social origin, genetic features, language, religion or belief, political or any other opinion, membership of a national minority, property, birth, disability, age or sexual orientation shall be prohibited.',
    aiImpactExamples: [
      'Biased training data leading to discriminatory outcomes',
      'Proxy discrimination through correlated features',
      'Disparate impact on protected groups',
    ],
    assessmentQuestions: [
      'Has the system been tested for bias across protected characteristics?',
      'Are outcomes equitable across different demographic groups?',
      'Could seemingly neutral criteria produce discriminatory effects?',
      'Is there a process for identifying and correcting discriminatory patterns?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'Does the AI system discriminate against persons with disabilities directly or indirectly?',
      'Are reasonable accommodations considered in the system\'s decision-making?',
      'Does the system use health data or disability status as a factor, explicitly or through proxies?',
      'Has the system been tested with users with different types of disabilities?',
    ],
  },
  {
    id: 'equality',
    charterArticle: 'Article 20',
    title: 'Equality before the law',
    description: 'Everyone is equal before the law.',
    aiImpactExamples: [
      'Different AI treatment based on postcode, language, or device type',
      'Algorithmic sorting that creates unequal access to opportunities',
    ],
    assessmentQuestions: [
      'Does the system apply the same criteria to all individuals in comparable situations?',
      'Are there mechanisms to detect unequal treatment?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'Does the system ensure equal access and equal outcomes for persons with disabilities?',
      'Are accessibility accommodations available without creating separate/inferior pathways?',
    ],
  },
  {
    id: 'disability-integration',
    charterArticle: 'Article 26',
    title: 'Integration of persons with disabilities',
    description: 'The Union recognises and respects the right of persons with disabilities to benefit from measures designed to ensure their independence, social and occupational integration and participation in the life of the community.',
    aiImpactExamples: [
      'AI gatekeeping systems that exclude persons with disabilities from services',
      'Employment AI that screens out candidates with disability-related gaps',
      'Benefits assessment AI that underestimates needs of persons with disabilities',
    ],
    assessmentQuestions: [
      'Does the AI system support or hinder the independence of persons with disabilities?',
      'Could the system create barriers to social or occupational integration?',
      'Has the system been designed with input from disability organizations?',
      'Does the system support reasonable accommodations?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'This right is entirely disability-specific — it must be assessed for every high-risk AI system',
      'Consider physical, sensory, cognitive, psychosocial, and invisible disabilities',
      'Consider intersectionality (disability + age, gender, ethnicity, etc.)',
    ],
  },
  {
    id: 'personal-data',
    charterArticle: 'Article 8',
    title: 'Protection of personal data',
    description: 'Everyone has the right to the protection of personal data concerning him or her. Such data must be processed fairly for specified purposes and on the basis of the consent of the person concerned or some other legitimate basis laid down by law.',
    aiImpactExamples: [
      'Excessive data collection for AI training',
      'Inferred personal data from behavioral patterns',
      'Lack of transparency about what data AI processes',
    ],
    assessmentQuestions: [
      'What personal data does the AI system process?',
      'Is data collection limited to what is necessary?',
      'Can individuals access, correct, and delete their data?',
      'Are data subjects informed about AI processing of their data?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'Is disability-related data (health records, accommodation requests) processed by the system?',
      'Are data access and correction mechanisms accessible to persons with disabilities?',
      'Could the system infer disability status from behavioral or usage patterns?',
    ],
  },
  {
    id: 'freedom-expression',
    charterArticle: 'Article 11',
    title: 'Freedom of expression and information',
    description: 'Everyone has the right to freedom of expression, including freedom to hold opinions and to receive and impart information and ideas without interference.',
    aiImpactExamples: [
      'Content moderation AI that suppresses legitimate speech',
      'Recommendation algorithms that create filter bubbles',
      'AI-generated disinformation',
    ],
    assessmentQuestions: [
      'Does the AI system filter, rank, or moderate content?',
      'Could the system suppress legitimate expression?',
      'Are content moderation decisions explainable and appealable?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'Does the system correctly handle augmentative and alternative communication (AAC)?',
      'Could content moderation flag disability-related language as inappropriate?',
    ],
  },
  {
    id: 'right-work',
    charterArticle: 'Article 15',
    title: 'Freedom to choose an occupation and right to engage in work',
    description: 'Everyone has the right to engage in work and to pursue a freely chosen or accepted occupation.',
    aiImpactExamples: [
      'AI-based recruitment filtering out candidates',
      'Performance monitoring AI affecting job security',
      'Task allocation algorithms creating unfair distributions',
    ],
    assessmentQuestions: [
      'Does the AI system affect access to employment opportunities?',
      'Are hiring/firing decisions influenced by the AI system?',
      'Is there human review of AI-influenced employment decisions?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'Does the recruitment AI account for disability-related CV gaps?',
      'Does performance monitoring account for reasonable accommodations?',
      'Could the system screen out candidates who use assistive technology?',
    ],
  },
  {
    id: 'social-security',
    charterArticle: 'Article 34',
    title: 'Social security and social assistance',
    description: 'Everyone residing and moving legally within the European Union is entitled to social security benefits and social advantages.',
    aiImpactExamples: [
      'AI systems determining benefit eligibility',
      'Automated fraud detection in social security',
      'Risk scoring for social assistance allocation',
    ],
    assessmentQuestions: [
      'Does the AI system determine eligibility for social benefits?',
      'Could the system wrongly deny benefits to eligible individuals?',
      'Is there an accessible appeals process for AI decisions?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'Does the system adequately assess disability-related needs?',
      'Could the system underestimate support needs of persons with invisible disabilities?',
      'Is the appeals/challenge process accessible to persons with disabilities?',
    ],
  },
  {
    id: 'healthcare',
    charterArticle: 'Article 35',
    title: 'Health care',
    description: 'Everyone has the right of access to preventive health care and the right to benefit from medical treatment.',
    aiImpactExamples: [
      'AI triage systems prioritizing patients',
      'Diagnostic AI with differential accuracy across populations',
      'AI-driven treatment recommendations',
    ],
    assessmentQuestions: [
      'Does the AI system influence healthcare decisions?',
      'Has the system been validated across diverse patient populations?',
      'Could the system create or exacerbate health disparities?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'Does the AI system perform differently for patients with disabilities?',
      'Are healthcare AI interfaces accessible (e.g., patient portals, appointment systems)?',
      'Could the system recommend treatments without considering disability-related factors?',
    ],
  },
  {
    id: 'effective-remedy',
    charterArticle: 'Article 47',
    title: 'Right to an effective remedy and to a fair trial',
    description: 'Everyone whose rights and freedoms guaranteed by the law of the Union are violated has the right to an effective remedy before a tribunal.',
    aiImpactExamples: [
      'Opaque AI decisions that cannot be meaningfully challenged',
      'AI in justice systems affecting legal outcomes',
      'Automated evidence assessment',
    ],
    assessmentQuestions: [
      'Can individuals effectively challenge AI-influenced decisions?',
      'Is the basis for AI decisions sufficiently transparent for legal review?',
      'Are remedy mechanisms accessible and timely?',
    ],
    disabilityRelevant: true,
    disabilityConsiderations: [
      'Are complaint and appeal mechanisms accessible to persons with disabilities?',
      'Can persons with disabilities obtain AI decisions in accessible formats?',
      'Is legal aid available for challenging AI decisions that affect disability rights?',
    ],
  },
]
