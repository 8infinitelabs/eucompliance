/**
 * EU AI Act — Conformity assessment steps for high-risk AI systems
 *
 * Reference: Regulation (EU) 2024/1689, Articles 9-17, 72
 * These steps define what providers of high-risk AI systems must implement
 * to demonstrate compliance.
 */

export interface ConformityStep {
  id: string
  order: number
  title: string
  description: string
  articles: string[]
  requirements: string[]
}

export const CONFORMITY_STEPS: ConformityStep[] = [
  {
    id: 'risk-management',
    order: 1,
    title: 'Risk management system',
    description:
      'Establish and maintain a risk management system consisting of a continuous iterative process planned and run throughout the entire lifecycle of the high-risk AI system.',
    articles: ['Article 9'],
    requirements: [
      'Identify and analyse known and reasonably foreseeable risks',
      'Estimate and evaluate risks from intended use and foreseeable misuse',
      'Adopt appropriate risk management measures',
      'Test to identify the most appropriate risk management measures',
      'Consider effects on persons under 18 and other vulnerable groups',
    ],
  },
  {
    id: 'data-governance',
    order: 2,
    title: 'Data governance',
    description:
      'Training, validation and testing datasets shall be subject to appropriate data governance and management practices.',
    articles: ['Article 10'],
    requirements: [
      'Define design choices and data collection processes',
      'Ensure data relevance, representativeness, accuracy, and completeness',
      'Examine for possible biases in datasets',
      'Identify data gaps and address them',
      'Apply appropriate data governance measures for personal data',
    ],
  },
  {
    id: 'technical-documentation',
    order: 3,
    title: 'Technical documentation',
    description:
      'Draw up technical documentation before the AI system is placed on the market or put into service, demonstrating compliance with AI Act requirements.',
    articles: ['Article 11', 'Annex IV'],
    requirements: [
      'General description of the AI system',
      'Detailed description of system elements and development process',
      'Information about monitoring, functioning, and control',
      'Description of appropriateness of performance metrics',
      'Detailed description of risk management system',
      'Description of changes made during system lifecycle',
    ],
  },
  {
    id: 'record-keeping',
    order: 4,
    title: 'Record-keeping',
    description:
      'High-risk AI systems shall technically allow for the automatic recording of events (logs) over the lifetime of the system.',
    articles: ['Article 12'],
    requirements: [
      'Enable automatic logging of events relevant to identifying risks',
      'Log events related to system operation periods',
      'Record reference database updates and data used for retraining',
      'Log system usage by each individual user',
      'Ensure logging capacities conform to recognised standards',
    ],
  },
  {
    id: 'transparency-information',
    order: 5,
    title: 'Transparency and provision of information',
    description:
      'High-risk AI systems shall be designed and developed to ensure their operation is sufficiently transparent to enable deployers to interpret and use the system output appropriately.',
    articles: ['Article 13'],
    requirements: [
      'Provide instructions for use in appropriate digital format',
      'Include identity and contact details of the provider',
      'Describe characteristics, capabilities, and limitations of performance',
      'Specify intended purpose and foreseeable misuse scenarios',
      'Document the level of accuracy, robustness, and cybersecurity',
      'Include information about expected lifetime and maintenance measures',
    ],
  },
  {
    id: 'human-oversight',
    order: 6,
    title: 'Human oversight measures',
    description:
      'High-risk AI systems shall be designed so that they can be effectively overseen by natural persons during the period of use.',
    articles: ['Article 14'],
    requirements: [
      'Enable human understanding of system capabilities and limitations',
      'Ensure awareness of possible automation bias',
      'Allow correct interpretation of system output',
      'Enable decision not to use, override, or reverse system output',
      'Provide ability to intervene or interrupt the system',
      'Implement anomaly and dysfunction monitoring capabilities',
    ],
  },
  {
    id: 'accuracy-robustness-cybersecurity',
    order: 7,
    title: 'Accuracy, robustness and cybersecurity',
    description:
      'High-risk AI systems shall be designed to achieve an appropriate level of accuracy, robustness, and cybersecurity.',
    articles: ['Article 15'],
    requirements: [
      'Declare and document accuracy levels and metrics',
      'Implement technical redundancy and fail-safe mechanisms',
      'Ensure resilience against errors, faults, and inconsistencies',
      'Ensure resilience against adversarial attacks and data poisoning',
      'Implement appropriate cybersecurity measures',
      'Address vulnerabilities specific to training and inference pipelines',
    ],
  },
  {
    id: 'quality-management',
    order: 8,
    title: 'Quality management system',
    description:
      'Providers of high-risk AI systems shall put a quality management system in place that ensures compliance in a systematic and orderly manner.',
    articles: ['Article 17'],
    requirements: [
      'Establish strategy for regulatory compliance',
      'Define techniques, procedures, and systematic actions for design and development',
      'Implement examination, test, and validation procedures',
      'Define technical specifications and standards applied',
      'Implement systems for data management including collection and analysis',
      'Establish risk management procedures per Article 9',
      'Set up post-market monitoring system per Article 72',
      'Establish incident reporting procedures per Article 73',
      'Manage communication with competent authorities',
    ],
  },
  {
    id: 'post-market-monitoring',
    order: 9,
    title: 'Post-market monitoring',
    description:
      'Providers shall establish a post-market monitoring system proportionate to the nature and risks of the AI system.',
    articles: ['Article 72'],
    requirements: [
      'Collect and analyse data provided by deployers through feedback mechanisms',
      'Document and report serious incidents and malfunctions',
      'Monitor system performance and compliance continuously',
      'Update risk assessments based on post-market data',
      'Implement corrective actions when necessary',
      'Maintain records of post-market monitoring activities',
    ],
  },
]
