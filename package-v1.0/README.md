# Dental AI Search Visibility Across Four Platforms

Version 1.0 · 2026-10-26 · Rotgar Research

Author: Evgeniy Yudin (https://orcid.org/0009-0007-8400-9561). License: CC BY 4.0.

Landing page: https://rotgar.com/medical/resources/dental-ai-visibility-four-platform-study

This separate US-English dental panel contains 18 exact query cells × 3 same-day waves × 4 platforms = 216 planned core observations. It covers cosmetic dentistry/porcelain veneers, dental implants and urgent care in New York City, Chicago and Dallas. Technical preflight requests are excluded.

## Inspect the evidence

Start with platform-summary.csv and the complete dental-ai-visibility-four-platform-v1.0.json. All 216 planned observations remain in response-metrics.csv. Citations are declared answer references, never unused search results. Pair tables retain both-empty source sets as undefined, one-empty sets as zero and ineligible answer states separately.

The 36 source-review slots use the first selection-wording query, wave 1 and its first declared citation for each city/task/platform. Empty or inaccessible slots are not replaced by a more convenient page.

## Reproduce

Run Node.js 20 or later in the extracted package directory:

```sh
node reproduce.mjs
```

This recomputes the public aggregate counts, every within/cross-platform pair, source categories and fixed source-review selection from the sanitized observation/citation inputs. It does not recollect live AI answers or reconstruct full AI responses.

Verify SHA256SUMS.txt before reuse. The manifest lists every payload and its byte length/hash. CSV blank numeric values mean undefined or not supplied, not zero.

Full AI answers, provider identifiers, credentials and private ClinicTruth project information are excluded. This is not a clinical assessment, representative market-share estimate or causal ranking-factor experiment. No DOI has been assigned at this publication step.
