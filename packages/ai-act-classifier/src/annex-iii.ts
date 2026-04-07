/**
 * EU AI Act Annex III — High-risk AI system categories
 *
 * Reference: Regulation (EU) 2024/1689, Annex III
 * These categories define which AI systems are classified as high-risk
 * under Article 6(2) of the AI Act.
 */

export interface AnnexIIICategory {
  id: string
  number: number
  title: string
  description: string
  examples: string[]
  /** Keywords for automated matching */
  keywords: string[]
}

export const ANNEX_III_CATEGORIES: AnnexIIICategory[] = [
  {
    id: 'biometric-identification',
    number: 1,
    title: 'Biometric identification and categorisation of natural persons',
    description:
      'AI systems intended to be used for real-time and post remote biometric identification of natural persons, or for biometric categorisation based on sensitive or protected attributes.',
    examples: [
      'Facial recognition systems in public spaces',
      'Biometric verification for access control',
      'Emotion recognition systems in workplaces',
      'Biometric categorisation by ethnicity, gender, or political orientation',
    ],
    keywords: ['biometric', 'facial recognition', 'face detection', 'emotion recognition', 'fingerprint', 'iris', 'voice identification', 'gait analysis'],
  },
  {
    id: 'critical-infrastructure',
    number: 2,
    title: 'Management and operation of critical infrastructure',
    description:
      'AI systems intended to be used as safety components in the management and operation of critical digital infrastructure, road traffic, or supply of water, gas, heating and electricity.',
    examples: [
      'AI controlling traffic management systems',
      'Smart grid energy distribution systems',
      'Water treatment and supply automation',
      'Digital infrastructure monitoring and control',
    ],
    keywords: ['infrastructure', 'traffic', 'energy', 'grid', 'water', 'gas', 'electricity', 'power plant', 'transport', 'railway', 'aviation'],
  },
  {
    id: 'education-vocational-training',
    number: 3,
    title: 'Education and vocational training',
    description:
      'AI systems intended to be used for determining access to or assigning persons to educational and vocational training institutions, evaluating learning outcomes, or determining the level of education appropriate for an individual.',
    examples: [
      'Automated student admission and selection',
      'AI-based exam scoring and grading',
      'Learning path recommendation engines',
      'Plagiarism detection with consequences on student assessment',
    ],
    keywords: ['education', 'student', 'admission', 'grading', 'exam', 'learning', 'school', 'university', 'training', 'assessment', 'plagiarism'],
  },
  {
    id: 'employment-workers-management',
    number: 4,
    title: 'Employment, workers management and access to self-employment',
    description:
      'AI systems intended to be used for recruitment, selection, making decisions on promotion or termination, task allocation, monitoring, or evaluating performance and behaviour of persons in work-related relationships.',
    examples: [
      'CV screening and candidate ranking systems',
      'Automated interview analysis and scoring',
      'Employee performance monitoring tools',
      'AI-driven task allocation and workforce planning',
    ],
    keywords: ['recruitment', 'hiring', 'cv', 'resume', 'employee', 'worker', 'performance', 'termination', 'promotion', 'hr', 'workforce', 'interview'],
  },
  {
    id: 'essential-services',
    number: 5,
    title: 'Access to and enjoyment of essential private services and public services and benefits',
    description:
      'AI systems intended to be used for evaluating eligibility for public assistance benefits and services, creditworthiness assessment, risk assessment and pricing in life and health insurance, or emergency services dispatching.',
    examples: [
      'Credit scoring and lending decision systems',
      'Insurance risk profiling and pricing',
      'Social benefits eligibility assessment',
      'Emergency services priority and dispatching',
    ],
    keywords: ['credit', 'loan', 'insurance', 'benefits', 'social', 'welfare', 'emergency', 'dispatch', 'eligibility', 'scoring', 'lending', 'mortgage'],
  },
  {
    id: 'law-enforcement',
    number: 6,
    title: 'Law enforcement',
    description:
      'AI systems intended to be used by law enforcement authorities for individual risk assessments, polygraphs, evaluation of evidence, prediction of criminal offences, profiling during criminal investigations, or crime analytics.',
    examples: [
      'Predictive policing systems',
      'AI-based evidence evaluation tools',
      'Criminal profiling and risk assessment',
      'Polygraph and deception detection systems',
    ],
    keywords: ['police', 'law enforcement', 'crime', 'criminal', 'evidence', 'profiling', 'policing', 'surveillance', 'forensic', 'investigation'],
  },
  {
    id: 'migration-asylum-border-control',
    number: 7,
    title: 'Migration, asylum and border control management',
    description:
      'AI systems intended to be used by competent public authorities for polygraphs, risk assessments regarding irregular migration, examining applications for asylum, visa, and residence permits, or automated identification of individuals.',
    examples: [
      'Automated border control and document verification',
      'Asylum application assessment tools',
      'Visa risk scoring systems',
      'Migration pattern analysis and prediction',
    ],
    keywords: ['migration', 'asylum', 'border', 'visa', 'refugee', 'immigration', 'passport', 'travel document', 'residence permit'],
  },
  {
    id: 'administration-of-justice',
    number: 8,
    title: 'Administration of justice and democratic processes',
    description:
      'AI systems intended to be used by judicial authorities for researching and interpreting facts and the law, and for applying the law to a concrete set of facts, or systems used to influence the outcome of elections.',
    examples: [
      'AI-assisted legal research and case analysis',
      'Sentencing recommendation systems',
      'Dispute resolution and mediation AI',
      'Electoral process monitoring and influence detection',
    ],
    keywords: ['justice', 'judicial', 'court', 'sentencing', 'legal', 'election', 'voting', 'democratic', 'arbitration', 'mediation'],
  },
]
