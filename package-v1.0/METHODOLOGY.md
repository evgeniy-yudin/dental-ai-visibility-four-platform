# Methodology

## Fixed design

The protocol was fixed before paid collection. Three convenience-selected US cities × three dental tasks × two wording variants produced 18 exact query cells. Three sequential same-day waves across ChatGPT, Gemini, Google AI Overviews and Google AI Mode produced 216 planned core requests. No dental-practice brand was seeded in the prompts.

Fieldwork: 2026-10-26T15:29:36.159Z–2026-10-26T15:48:50.578Z. 5 technical preflight requests are excluded.

- ChatGPT: 54 answer-bearing, 0 no-answer, 0 collection-error captures out of 54 planned checks.
- Gemini: 54 answer-bearing, 0 no-answer, 0 collection-error captures out of 54 planned checks.
- Google AI Overviews: 20 answer-bearing, 27 no-answer, 7 collection-error captures out of 54 planned checks.
- Google AI Mode: 53 answer-bearing, 1 no-answer, 0 collection-error captures out of 54 planned checks.

## Collection surfaces

DataForSEO ChatGPT and Gemini LLM Scraper live/advanced endpoints were used, not direct model APIs. ChatGPT force_web_search=true. Google AI Overviews used Google organic live/advanced, depth10 and load_async_ai_overview=true; AI Mode used its distinct Google live/advanced endpoint. All used en, US country-level location2840, desktop/Windows. Cities were named in the prompts; physical city IP and signed-in personalization were not controlled. Model labels are retained where supplied. Provider-side caching was not controllable.

No automatic paid retry or outcome-based query substitution was used. A recorded technical collection error is not a no-answer state, and a no-answer state is not zero dental-brand visibility.

## Citation extraction

ChatGPT/Gemini use the provider-declared answer sources, excluding unused search_results and image/ad/local-card/navigation URLs. Google uses reference arrays inside top-level AI answer items, excluding ordinary organic results, local packs and People Also Ask. Eligible HTTP(S) URLs are deduplicated per answer. Normalization lowercases the host, strips leadingwww, fragments, trailing slashes and known tracking parameters (utm_*,gclid,fbclid,msclkid,_ga,_gl); substantive query parameters and HTTP/HTTPS remain distinct. Hostnames are not corporate ownership groups.

## Similarity

Jaccard=intersection/union. An empty/empty source pair is undefined, not100%. One-empty source pairs count0. Both answers must exist for a source-set comparison. Every eligible pair is equally weighted; the means are not pooled URL-intersection ratios. A separate both-nonempty view is reported. Within-query comparisons match exact prompt and platform, yielding216planned pairs; cross-platform pairs match exact query and scheduled repeat label, yielding324planned pairs.

## Conservative URL-type codebook

Known directory/social hosts are coded first; homepage means root path. Editorial paths include blog/articles/news/resources. Dentist/team paths include meet-doctor/dentist/team/provider routes. Location/contact paths are explicit location/office/contact routes. Treatment paths include veneers/implants/cosmetic/emergency/services/treatments. Everything else remains unclassified. These labels describe URL navigation, not content quality or ranking factors.

## Source-page follow-up

Exactly36slots were fixed: city×task×platform, first plan-ordered selection wording, wave1, first declared normalized citation. No-answer/no-source/error slots remain empty; an inaccessible page is not replaced. The reviewer records dated treatment/dentist/location/contact evidence and a source-page hash where available. One page cannot establish what a whole site lacks, or whether a recommendation is clinically suitable.

## Interpretation

This exploratory same-day panel is not a probability sample of US patients, dental practices or query traffic. The two wordings request different information and are not an isolated causal wording experiment. Citation similarity is not answer correctness or recommendation quality. No website intervention was applied, so practical recommendations are Rotgar interpretations and testable improvement hypotheses, not measured causal ranking effects. Earlier studies retain their own populations and surfaces; the caveat companion reuses the earlier450-answer corpus rather than adding an independent replication.

Protocol SHA-256: 4899c454c738b61fe735b0499e0c46606ce19822b47f1fa1ed8988ac95369a4d
Public analytical JSON SHA-256: 0d037ad11faf971874218c84ecb23a7d6a6c14953e1cc5f455a3d2616d6c7f8c


## Recorded missing-only collection recovery

The 216 planned slots are observations, not the total number of requests. The first pass made 216 requests and had 18 technical failures. After all three first-pass waves, 18 explicitly diagnosed temporary failures received at most one recovery with identical query, surface and request settings; 11 resulted in a successfully captured answer-or-no-answer outcome. There were 234 core requests in total. No-answer or no-source observations were not eligible for recovery. Original states and both timestamps are retained. The original wave labels are scheduled-repeat labels; delayed recoveries widen their observation window. Four planned preflight cells plus one technical preflight recovery are excluded.

## Pre-publication URL-codebook correction

Independent QA found and corrected a dentist-prefix collision with the word dentistry and generic-prefix precedence over deeper treatment paths. Final hierarchy: known directory/social host → homepage → editorial → specific treatment/services path → location/contact → explicit dentist/team/biography → unclassified. Nested implant/veneer/emergency paths are not coded as profiles merely because an earlier segment says dentist. Tebra, NavMDs and BestInHood were added to the finite known-directory list after inspecting the observed source inventory. This is a documented operational coding correction before publication, not a causal factor discovery. All counts were recalculated from the same saved citations.
