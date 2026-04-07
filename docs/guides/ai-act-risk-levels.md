# Understanding EU AI Act Risk Levels

The EU AI Act (Regulation 2024/1689) classifies AI systems into four risk levels, each with different obligations.

## The Four Risk Levels

### Prohibited (Article 5)

AI practices that are **banned entirely** in the EU since February 2, 2025:

| Practice | Article | Example |
|----------|---------|---------|
| Subliminal manipulation | 5(1)(a) | Dark patterns that exploit subconscious behavior |
| Exploitation of vulnerabilities | 5(1)(b) | Targeting elderly or children's weaknesses |
| Social scoring | 5(1)(c) | Government trustworthiness scoring of citizens |
| Individual predictive policing | 5(1)(d) | Predicting crime based solely on profiling |
| Untargeted facial recognition scraping | 5(1)(e) | Building face databases from internet/CCTV |
| Emotion inference at work/school | 5(1)(f) | Detecting employee emotions (non-safety) |
| Biometric categorisation by sensitive attributes | 5(1)(g) | Inferring race, religion, sexual orientation |
| Real-time biometric ID in public spaces | 5(1)(h) | Live facial recognition by law enforcement |

**Penalty:** Up to EUR 35 million or 7% of global annual turnover.

### High-Risk (Article 6 + Annex III)

AI systems that significantly impact people's lives. **Full compliance required by August 2, 2026.**

Eight categories (Annex III):

1. **Biometric identification** — Facial recognition, emotion detection
2. **Critical infrastructure** — Traffic management, energy grids, water supply
3. **Education** — Student admissions, exam grading, learning recommendations
4. **Employment** — CV screening, interview analysis, performance monitoring
5. **Essential services** — Credit scoring, insurance pricing, welfare assessment
6. **Law enforcement** — Evidence evaluation, criminal profiling
7. **Migration & asylum** — Border control, visa assessment
8. **Justice & democracy** — Legal research, sentencing, elections

**Obligations include:**
- Risk management system (Article 9)
- Data governance (Article 10)
- Technical documentation per Annex IV (Article 11)
- Automatic event logging (Article 12)
- Transparency to deployers (Article 13)
- Human oversight (Article 14)
- Accuracy, robustness, cybersecurity (Article 15)
- **Accessibility per EAA and EN 301 549 (Article 16(l))**
- EU database registration (Article 49)
- Conformity assessment (Article 43)

**Penalty:** Up to EUR 15 million or 3% of global annual turnover.

### Limited Risk (Article 50)

AI systems with **transparency obligations only**:

- **Chatbots** must disclose they are AI
- **Emotion recognition** systems must inform users
- **Deepfakes/synthetic content** must be labeled
- **AI-generated text** published as factual must be disclosed

**Penalty:** Up to EUR 7.5 million or 1% of global annual turnover.

### Minimal Risk

Everything else. **No mandatory obligations.** Voluntary codes of conduct encouraged (Article 95).

Examples: spam filters, AI in video games, inventory management, weather prediction.

## How to Determine Your Risk Level

```typescript
import { classify } from '@eu-compliance-bridge/ai-act-classifier'

const result = classify({
  name: 'Your AI System',
  purpose: 'What it does and who it affects',
  dataTypes: ['personal', 'biometric', 'health', 'financial'],
  affectedPersons: ['employees', 'customers', 'public', 'minors'],
  decisionMaking: 'fully_automated', // or semi_automated, human_in_loop, advisory
})
```

The classifier uses keyword matching against Annex III categories and Article 5 prohibited practices. For ambiguous cases, use the LLM-powered `classifyFromDescription()` function.

## The Accessibility Link

**Article 16(l)** requires high-risk AI systems to comply with the European Accessibility Act (EAA) and EN 301 549. This means:

- AI interfaces must meet WCAG 2.1 Level AA
- Human oversight controls must be accessible to users with disabilities
- AI-generated documentation must be in accessible formats
- Decision explanations must be understandable by users with cognitive disabilities

This obligation is unique to the EU — no other jurisdiction requires AI systems to be accessible by law.

[Learn more about Article 16(l)](./article-16l-explained.md)
