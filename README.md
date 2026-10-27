# Dental AI Search Visibility Across Four Platforms

[![DOI](https://zenodo.org/badge/DOI/10.5281%2Fzenodo.23692766.svg)](https://doi.org/10.5281/zenodo.23692766)

Version 1.0 public research dataset by [Evgeniy Yudin](https://orcid.org/0009-0007-8400-9561), published by Rotgar Research under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

- Study: https://rotgar.com/medical/resources/dental-ai-visibility-four-platform-study
- Version DOI: https://doi.org/10.5281/zenodo.23692766
- Frozen package: [`package-v1.0/`](package-v1.0/)
- Manifest: [`package-v1.0/manifest.json`](package-v1.0/manifest.json)
- Checksums: [`package-v1.0/SHA256SUMS.txt`](package-v1.0/SHA256SUMS.txt)

## Scope

The dataset covers 216 planned US-English observations: 18 exact query cells × three same-day waves × four answer surfaces across New York City, Chicago and Dallas. The services are cosmetic dentistry and porcelain veneers, dental implants, and urgent dental care.

The frozen panel preserves 181 AI-answer states, 28 no-answer states and seven unresolved technical states. Those denominators are part of the study and are not replaced. Within-AI-Overview stability is based on five eligible pairs only.

The public package includes aggregate tables, sanitized observation and citation inputs, methodology, manifest, checksums and a reproduction script. It excludes full AI answers, provider identifiers, credentials, API identifiers, source HTML and private client or project information.

## Interpretation boundary

This is a descriptive source-visibility panel. It is not a clinical assessment, a representative market-share estimate, or a causal ranking-factor experiment. A visible cited domain does not establish that it caused a provider mention or ranking.

## Reproduction

From `package-v1.0/`:

```bash
node reproduce.mjs
```

Expected result: `PASS` with 7,707 checks.

