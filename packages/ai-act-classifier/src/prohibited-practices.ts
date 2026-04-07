/**
 * EU AI Act — Prohibited AI practices
 *
 * Reference: Regulation (EU) 2024/1689, Article 5
 * In effect since February 2, 2025.
 */

export interface ProhibitedPractice {
  id: string
  title: string
  description: string
  article: string
  keywords: string[]
}

export const PROHIBITED_PRACTICES: ProhibitedPractice[] = [
  {
    id: 'subliminal-manipulation',
    title: 'Subliminal manipulation',
    description:
      'AI systems that deploy subliminal techniques beyond a person\'s consciousness or purposefully manipulative or deceptive techniques, with the objective or effect of materially distorting the behaviour of a person or group.',
    article: 'Article 5(1)(a)',
    keywords: ['subliminal', 'manipulation', 'deceptive', 'dark pattern', 'nudge'],
  },
  {
    id: 'vulnerability-exploitation',
    title: 'Exploitation of vulnerabilities',
    description:
      'AI systems that exploit vulnerabilities of a person or group due to their age, disability, or social or economic situation, with the objective or effect of materially distorting their behaviour.',
    article: 'Article 5(1)(b)',
    keywords: ['vulnerability', 'exploit', 'elderly', 'children', 'disability', 'disadvantaged'],
  },
  {
    id: 'social-scoring',
    title: 'Social scoring by public authorities',
    description:
      'AI systems for evaluation or classification of natural persons or groups based on their social behaviour or personal characteristics, leading to detrimental or unfavourable treatment unrelated to the contexts in which the data was generated.',
    article: 'Article 5(1)(c)',
    keywords: ['social scoring', 'social credit', 'citizen score', 'behaviour score', 'trustworthiness'],
  },
  {
    id: 'predictive-policing-individual',
    title: 'Individual predictive policing',
    description:
      'AI systems for making risk assessments of natural persons to predict the risk of committing a criminal offence, based solely on profiling or personality traits.',
    article: 'Article 5(1)(d)',
    keywords: ['predictive policing', 'crime prediction', 'recidivism', 'pre-crime'],
  },
  {
    id: 'facial-recognition-scraping',
    title: 'Untargeted scraping for facial recognition',
    description:
      'AI systems that create or expand facial recognition databases through untargeted scraping of facial images from the internet or CCTV footage.',
    article: 'Article 5(1)(e)',
    keywords: ['facial scraping', 'face database', 'clearview', 'mass surveillance'],
  },
  {
    id: 'emotion-inference',
    title: 'Emotion inference in workplace and education',
    description:
      'AI systems that infer emotions of a natural person in the areas of workplace and education institutions, except where the use is for medical or safety reasons.',
    article: 'Article 5(1)(f)',
    keywords: ['emotion detection', 'sentiment analysis', 'mood detection', 'affective computing', 'workplace emotion'],
  },
  {
    id: 'biometric-categorisation',
    title: 'Biometric categorisation by sensitive attributes',
    description:
      'AI systems that categorise natural persons individually based on their biometric data to deduce or infer their race, political opinions, trade union membership, religious beliefs, sex life, or sexual orientation.',
    article: 'Article 5(1)(g)',
    keywords: ['biometric categorisation', 'race detection', 'religion detection', 'sexual orientation'],
  },
  {
    id: 'real-time-biometric-public',
    title: 'Real-time remote biometric identification in public spaces',
    description:
      'Use of real-time remote biometric identification systems in publicly accessible spaces for law enforcement purposes, except in strictly limited situations (missing children, imminent threats, serious crimes).',
    article: 'Article 5(1)(h)',
    keywords: ['real-time biometric', 'live facial recognition', 'public space surveillance', 'mass biometric'],
  },
]
