# Why Accessibility Overlays Don't Work

Accessibility overlay widgets (accessiBe, UserWay, AudioEye) promise one-line compliance. The evidence shows they make things worse.

## What Are Overlays?

A JavaScript widget you add to your website that claims to automatically fix accessibility issues. Typically adds a floating toolbar with options like "high contrast", "large text", or "screen reader mode".

## Why They Fail

### 1. They Don't Fix the Code

Overlays add a layer on top of broken HTML. The underlying accessibility issues remain. Screen readers still encounter the broken code underneath.

- Automated tools detect only **30-57% of WCAG issues** (WebAIM, 2024)
- Overlays can only attempt to fix what automated tools detect
- The remaining 43-70% of issues are untouched

### 2. They Create New Problems

The ACM (Association for Computing Machinery) published a study where **blind users said overlays made problems worse**:

- Overlay widgets interfere with screen reader navigation
- "Screen reader mode" conflicts with actual screen readers
- Added keyboard shortcuts override users' existing shortcuts

### 3. They Increase Legal Risk

In the US in 2024:
- **456 lawsuits** filed against websites using overlay tools (H1 2025)
- **25% of all accessibility lawsuits** in 2024 cited overlays as the problem
- **1,023 companies** using widgets received lawsuits

Installing an overlay signals you know about accessibility issues — which increases liability.

### 4. They've Been Fined

- **accessiBe** — FTC fined **$1 million** (January 2025) for misrepresenting AI capabilities and using fake reviews
- **accessiBe** — Class action lawsuit (June 2024) for false ADA compliance claims
- **UserWay** — Class action lawsuit filed (February 2025)

### 5. The EU Says They Don't Count

The European Commission has stated that overlay widgets **do not constitute compliance with the EAA**. The EAA requires remediation of the actual product, not a cosmetic layer on top.

## What Works Instead

### Real Accessibility Testing

Use standards-based testing tools:

- **axe-core** (open source, Deque) — The industry standard engine. Zero false positives. Used by Google Lighthouse, Microsoft, and GitHub.
- **QualWeb** — EU-origin engine used by the Portuguese government's accessibility observatory
- **IBM Equal Access** — Complementary ruleset with cognitive accessibility focus

### Code-Level Remediation

Fix the actual HTML, CSS, and JavaScript:

1. Run automated scan to find 57% of issues
2. Fix those issues in the source code
3. Conduct manual testing for the remaining 43%
4. Test with real assistive technology (screen readers, switch access)
5. Include people with disabilities in user testing

### Continuous Monitoring

Accessibility is not a one-time fix:

- Integrate testing into CI/CD pipeline
- Schedule regular automated scans
- Monitor for regressions after deployments

### For AI Systems Specifically

AI systems under the EU AI Act Article 16(l) must go beyond WCAG web compliance:

- Human oversight controls must be accessible
- AI decision explanations must be understandable by people with cognitive disabilities
- Generated content must preserve accessibility metadata
- Documentation must be in accessible formats

`eu-compliance-bridge` provides an [AI Accessibility Impact Assessment](./aaia.md) that identifies these requirements.

## The Bottom Line

| Approach | Cost | WCAG Coverage | EAA Compliant | Legal Risk |
|----------|------|---------------|---------------|------------|
| Overlay widget | $40-300/mo | ~30% automated only | No | High (increases liability) |
| axe-core + remediation | Free (OSS) + dev time | ~57% automated + manual | Yes | Low |
| eu-compliance-bridge | Free (OSS) | AI-specific + WCAG | Yes | Low |
| Full audit + consulting | $5K-50K | ~95%+ | Yes | Lowest |
