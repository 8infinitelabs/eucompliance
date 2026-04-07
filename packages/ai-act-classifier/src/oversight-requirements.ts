/**
 * EU AI Act — Human oversight requirements for high-risk AI systems
 *
 * Reference: Regulation (EU) 2024/1689, Article 14(4)
 */

export interface OversightRequirement {
  key: string
  title: string
  description: string
  article: string
}

export const OVERSIGHT_REQUIREMENTS: OversightRequirement[] = [
  {
    key: 'understand-capabilities',
    title: 'Understanding system capabilities and limitations',
    description:
      'The AI system must be designed so that natural persons assigned to ensure human oversight are able to properly understand the relevant capacities and limitations of the system, and are able to duly monitor its operation.',
    article: 'Article 14(4)(a)',
  },
  {
    key: 'automation-bias-awareness',
    title: 'Awareness of automation bias',
    description:
      'The persons overseeing the system must remain aware of the possible tendency of automatically relying or over-relying on the output produced by the AI system (automation bias).',
    article: 'Article 14(4)(b)',
  },
  {
    key: 'interpret-output',
    title: 'Ability to correctly interpret the system output',
    description:
      'The human overseers must be able to correctly interpret the AI system output, taking into account the characteristics of the system and the interpretation tools and methods available.',
    article: 'Article 14(4)(c)',
  },
  {
    key: 'decide-not-use',
    title: 'Ability to decide not to use, override, or reverse',
    description:
      'The human overseers must be able to decide, in any particular situation, not to use the AI system, or to override or reverse the output of the system.',
    article: 'Article 14(4)(d)',
  },
  {
    key: 'intervene-stop',
    title: 'Ability to intervene or stop the system',
    description:
      'The human overseers must be able to intervene in the operation of the AI system or interrupt the system through a "stop" button or similar procedure.',
    article: 'Article 14(4)(e)',
  },
  {
    key: 'monitor-anomalies',
    title: 'Monitoring for anomalies and unexpected performance',
    description:
      'The human overseers must be able to monitor the operation of the AI system and identify anomalies, dysfunctions, and unexpected performance.',
    article: 'Article 14(4)(f)',
  },
]
