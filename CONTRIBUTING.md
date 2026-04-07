# Contributing to EU Compliance Bridge

Thank you for your interest in contributing. This toolkit aims to bridge EU AI Act and European Accessibility Act compliance, especially for communities and organizations with limited resources.

## Getting Started

```bash
# Clone the repo
git clone https://github.com/8infinitelabs/eu-compliance-bridge.git
cd eu-compliance-bridge

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Project Structure

```
packages/
  ai-act-classifier/     # Risk classification engine (ready)
  accessibility-bridge/  # AI Act <-> EN 301 549 mapping (in development)
  fria-generator/        # FRIA generator (in development)
  docs-generator/        # Documentation generator (in development)
  cli/                   # Command-line interface (in development)
```

## Priority Areas

1. **Accessibility Bridge** -- Mapping AI Act articles to EN 301 549 clauses. This is the core innovation and needs domain expertise in both AI governance and accessibility standards.

2. **FRIA Generator** -- Implementing the DIHR/ECNL framework as executable code. Requires understanding of fundamental rights impact assessment methodology.

3. **Test Coverage** -- Expanding classifier tests with edge cases and real-world AI system descriptions.

4. **Translations** -- Regulatory data (Annex III categories, conformity steps, etc.) in EU languages.

5. **Documentation** -- Guides for non-technical users (NGOs, community organizations).

## Code Style

- TypeScript strict mode
- ESM modules (no CommonJS)
- Tests with Vitest
- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`

## License

By contributing, you agree that your contributions will be licensed under EUPL-1.2.
