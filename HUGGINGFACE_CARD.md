---
pretty_name: Dental AI Search Visibility Across Four Platforms
license: cc-by-4.0
language:
- en
tags:
- ai-search
- healthcare
- dental
- chatgpt
- gemini
- google-ai-overviews
- google-ai-mode
---

# Dental AI Search Visibility Across Four Platforms

Version 1.0 public research dataset by [Evgeniy Yudin](https://orcid.org/0009-0007-8400-9561), published by Rotgar Research.

- Study: https://rotgar.com/medical/resources/dental-ai-visibility-four-platform-study
- Version DOI: https://doi.org/10.5281/zenodo.23692766
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Frozen package: [`package-v1.0/`](package-v1.0/)

## Dataset summary

This sanitized US-English panel covers 216 planned observations: 18 exact query cells × three same-day waves × four answer surfaces across New York City, Chicago and Dallas. It covers cosmetic dentistry and porcelain veneers, dental implants, and urgent dental care.

The frozen panel preserves 181 AI-answer states, 28 no-answer states and seven unresolved technical states. Those denominators are part of the study and are not replaced. Within-AI-Overview stability is based on five eligible pairs only.

The public files include aggregate tables, sanitized observation and citation inputs, methodology, manifest, checksums and reproduction code. Full AI answers, provider identifiers, credentials, API identifiers, source HTML and private client or project information are excluded.

## Limitations

This is a descriptive source-visibility panel, not a clinical assessment, representative market-share estimate or causal ranking-factor experiment. A visible cited domain does not establish that it caused a provider mention or ranking.

## Reproduction

Run `node reproduce.mjs` from `package-v1.0/`. Expected result: `PASS` with 7,707 checks.

