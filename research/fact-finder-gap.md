# The Fact-Finder Gap: Is Anyone Actually Automating Paraplanner Data Entry?

*Research date: 2026-04-26*

---

## Executive Summary (brutal honest)

1. **The thesis is mostly wrong as stated.** "NOBODY has fully automated this" was true in 2024. As of Q1/Q2 2026 it is no longer true. **Both the largest planning platforms and the largest AI middleware players have shipped exactly this product in the last ~10 months.** Specifically: RightCapital **SmartImport** (launched March 3, 2026, bundled free in every tier), Zocks **Document Intelligence → eMoney** (launched Dec 2, 2025, building on a June 2025 two-way Facts integration), and Jump AI **→ eMoney Fact-Finder** sync (launched July 2025). FP Alpha, Vanilla, and Wealth.com all do AI document extraction for their respective verticals.

2. **The thesis is right that the underlying pain is real and large.** Paraplanners do spend hours per client on PDF re-typing, and account aggregation (Plaid/Yodlee/ByAllAccounts) does NOT solve it — aggregation gets you balances and holdings on connectable accounts, but it does not extract income/expense data from tax returns, beneficiaries from insurance policies, vesting schedules from RSU statements, cap-table entries from K-1s, or trust terms from estate documents. Those still get re-typed. Aggregation also misses the long tail of held-away assets that don't have working OFX/screen-scraping connections.

3. **The market structure is now "incumbent absorbs the wedge."** Kitces and InvestmentNews both flagged in March/April 2026 that RightCapital bundling SmartImport for free is an existential threat to standalone document-extraction startups (Powder, Flextract are named). The standalone players have ~zero switching cost moat because the data doesn't live in their tool — it gets extracted and pushed elsewhere. **A new hackathon-stage entrant attacking the same wedge in 2026 is competing directly with three well-funded incumbents who shipped in the last 10 months.**

4. **Where the gap is still real:** (a) MoneyGuidePro has not announced an equivalent native AI fact-finder feature — it's the laggard among the big three; (b) Naviplan and Asset-Map similarly have no announced native AI doc-intake (Asset-Map has an integration with Jump but not a native feature); (c) cross-platform / multi-document reasoning (e.g., reconciling a tax return against three brokerage statements against a 401k statement against a will, then producing a normalized household balance sheet that any planning system can consume) is still lightly served; (d) the long tail of weird documents — RSU grant agreements, deferred comp election forms, ESOP statements, K-1s, 529s at credit unions, life insurance illustrations, business valuations — is where current incumbents are weakest because they optimized for the headline doc types (1040, brokerage statement, will).

5. **Honest read for the pitch:** if the pitch is "AI fact-finder for advisors, generic," it is a *me-too* in 2026. To win you need a sharper wedge — either (a) MGP/Naviplan/Asset-Map (the un-served planning platforms), or (b) the messy long-tail document types the incumbents skip, or (c) the cross-platform reconciliation/QA layer that flags discrepancies between docs (which nobody is doing well — Zocks alerts on profile mismatches but does not reconcile across documents).

---

## Players in the adjacent space + what they actually do

### Native planning-software AI (the new incumbents)

| Player | Owner | Product | Launched | What it does | Cost |
|---|---|---|---|---|---|
| **RightCapital SmartImport** | RightCapital (independent) | Native AI doc extraction → fact-finder | Mar 3, 2026 | Reads statements, transcripts, emails; extracts income/expenses/goals/net worth/holdings; advisor reviews then approves into plan. RightCapital claims 70%+ time savings in internal testing. | **Free, bundled in all tiers** |
| **eMoney + Zocks Document Intelligence** | Fidelity (eMoney) + Zocks (independent) | AI doc → eMoney "Facts" fields | Dec 2, 2025 (built on June 2025 Facts sync) | Auto-detects doc type, applies template, returns structured summary in <60s. Handles structured PDF, scans, photos. Pushes to eMoney Facts with profile-mismatch alerts. | Requires Zocks subscription (no public Document Intelligence pricing) |
| **eMoney + Jump** | Fidelity (eMoney) + Jump AI | Meeting-notes → eMoney Fact-Finder | Jul 2025 | Maps meeting transcript content to eMoney Fact-Finder fields, one-click sync. Pre-meeting prep pulls from eMoney back into Jump. | Free for shared subscribers |
| **MoneyGuidePro** | Envestnet | **No announced native AI doc intake** | — | Has APIs (Monte Carlo, accounts), uses Yodlee for aggregation, integrates with PreciseFP for forms — but no native AI document-to-plan feature found in this research. | n/a |
| **Naviplan** | InvestCloud | No announced native AI doc intake found | — | — | n/a |
| **Asset-Map** | Asset-Map | No native AI doc intake; integrates with Jump (Mar 2026 announcement) and is on eMoney's API "coming soon" list | — | — | n/a |

### Standalone AI document-extraction startups (the squeezed middle)

| Player | What it does | Status |
|---|---|---|
| **Zocks** | Started as AI meeting-notes for advisors; extended into Document Intelligence → CRM/planning sync. Strongest distribution play (eMoney partnership). | Healthy, but increasingly "feature of eMoney" framing |
| **Jump AI** | AI meeting notes → CRM/planning. Native eMoney Fact-Finder push. Asset-Map integration. Document Intelligence shipped. | Healthy, similar trajectory to Zocks |
| **paraplanner.ai** | "Plans in 24 hours" — extracts data from docs, integrates with Wealthbox, Redtail, RightCapital, eMoney | Active |
| **Superplan** | UK-skewed; AI paraplanner for onboarding, doc extraction, report gen, compliance | Active |
| **Powder (YC)** | "Gen-AI sales co-analyst" — parses statements, builds proposals | Named by Kitces/IN as squeezed by RightCapital SmartImport |
| **Flextract** | AI onboarding engine for advisors; integrates with PreciseFP and Wealthbox | Named alongside Powder as squeezed |
| **PreciseFP** | The pre-AI incumbent — digital fact-finder forms with bi-directional one-click sync to eMoney + MGP. Also has a "Financial Fact Finder - Statement Upload" feature. Partnered with FinMate AI for "data-entry-free" onboarding and integrates Flextract. | Established; the closest thing to a "default" in this category for 5+ years |

### Vertical specialists (do one doc type very well)

| Player | Vertical | Pushes to fact-finders? |
|---|---|---|
| **Holistiplan** | Tax returns (1040 OCR → tax analysis report in <60s on 100+ pg returns) | Integrates with eMoney and RightCapital, but its primary output is a tax analysis report/letter — **not a structured push of every line item into the planning fact-finder**. Advisors still re-key tax-return-derived facts (income, AGI, withholding, capital gains) into eMoney/MGP themselves. |
| **FP Alpha** | Tax + estate + insurance + P&C; "16 disciplines"; estate now extracts hundreds of data points (was 30) | $1,995/yr/advisor all-in. AI extraction is real and broad. On eMoney's "API integrations coming soon" list. Does not currently push directly to MGP/Naviplan fact-finders in the way Zocks does to eMoney. |
| **Wealth.com (Ester AI)** | Estate docs (wills, trusts, POA) | Processed 100K+ estate docs in 2025. $65M raise. Extracts roles/entities/elections/provisions for downstream use. Native eMoney API integration. |
| **Vanilla (V/AI)** | Estate docs | AI auto-profile from uploaded estate docs |
| **TrustPal** | Legacy/estate planning | AI paraplanner positioning |
| **Penny (Income Lab)** | Tactical tax/Medicare/estate analysis | Launched April 2026; deterministic engines + AI interface |

### Account aggregation (the "auto-sync" story)

| Player | Coverage strength | Weakness |
|---|---|---|
| **Plaid Investments** | Strong on retail brokerage, IRA, 401k, 403b, 457b, 529, HSA via API | Coverage gaps on smaller recordkeepers; OAuth breakage; not designed to extract from PDF documents at all |
| **Yodlee** | Deep, long-tenured screen-scraping; good on legacy retirement recordkeepers; powers MoneyGuide aggregation | Brittle screen scrape; doesn't handle insurance cash value, real estate, business interests, RSU vesting schedules |
| **ByAllAccounts (Morningstar)** | Strong on retirement plans / legacy recordkeepers | Same fundamental limit — only aggregates connectable accounts |
| **eMoney aggregation** | 90%+ proprietary custodial feeds; supplemented by ByAllAccounts and CashEdge | Same |
| **Pontera** | Held-away 401k/403b *with trading rights* (rebalancing, performance reporting, billing) | Read access for unmanaged held-away accounts is its sister product; under regulatory scrutiny (Fidelity vs Pontera dispute over 401k access) |

---

## Integrations landscape: auto-synced vs manual

### What flows in automatically (in a well-tooled firm)

- Custodied AUM at Schwab/Fidelity/Pershing → planning software via direct custodial feed (real-time-ish, daily)
- Held-away accounts that connect via Plaid/Yodlee/ByAllAccounts → balances + holdings (when the connection works)
- Held-away 401k for rebalancing/reporting → Pontera → Orion / AdvisorEngine

### What is still manual or document-driven (the actual paraplanner workload)

| Category | Why it's manual | Who (if anyone) is automating it |
|---|---|---|
| **Tax return 1040 line items into fact-finder** | Holistiplan analyzes but doesn't deep-push every field; aggregation doesn't see tax docs | RightCapital SmartImport, Zocks → eMoney (claimed) |
| **Brokerage statements** (cost basis, holdings detail beyond aggregator coverage) | Aggregator gaps; non-supported custodians | RightCapital SmartImport, Zocks |
| **401k / 403b / 457 statements where Plaid connection is broken** | Long tail of plan recordkeepers; OAuth churn | Doc upload to Zocks/RightCapital |
| **Insurance policies** (term, whole, universal, variable; cash value, death benefit, riders, beneficiaries) | Carriers don't publish APIs; cash value is on a quarterly statement PDF | FP Alpha (extraction), partial. Not pushed to planning software fact-finders systematically. |
| **Estate documents** (wills, trusts, POA, healthcare directive, beneficiary designations) | PDFs only; no API | Wealth.com (Ester), Vanilla (V/AI), FP Alpha |
| **RSU / stock options / ESPP / deferred comp** | Lives in employer portals (Fidelity SPS, E*TRADE Equity Edge, Shareworks/Morgan Stanley at Work, Carta); vesting schedules embedded in grant agreement PDFs | **Not well served.** Aggregators get a balance snapshot; vesting schedules and grant terms still re-typed |
| **ESOP statements** | Annual PDF from third-party administrator | Not well served |
| **Real estate** (primary, rental, fractional) | No system of record; advisor enters value, mortgage, rental income manually | Not automated |
| **Business interests / K-1s / pass-through entities** | Annual K-1 PDF; cap-table data in Carta or paper | Not well served |
| **529s at random banks/state plans** | Not all aggregated | Spotty |
| **HSA balances + future contribution capacity** | Some aggregator coverage | Spotty |
| **Pension benefits / Social Security PIA** | Statement PDFs | RightCapital can ingest a SSA statement; manual otherwise |
| **Mortgage / loan amortization detail** | Statement PDFs | Manual |
| **Crypto / private investments / collectibles** | Inconsistent | Manual |

**The one-line verdict:** aggregation gets you maybe 40-60% of the household balance sheet for a typical mass-affluent client and far less for HNW/business-owner/exec-comp clients. The rest still rides on documents. AI extraction has now meaningfully attacked the headline doc types (1040, brokerage statement, will) but the long tail (RSU grant agreements, deferred comp elections, ESOP statements, K-1s, life insurance illustrations, business valuations) is largely untouched and hits exactly the segment that pays the highest planning fees.

---

## Why the gap exists (real reasons)

1. **API access is no longer the bottleneck for eMoney.** eMoney launched a developer portal in late 2025 and explicitly lists eight new partner integrations in the past year (Tolerisk, YCharts, Vanilla, Wealth.com, Luminary, Zocks, Jump AI, Black Diamond) with Asset-Map and FP Alpha "coming soon" and more for 2026. **The API moat has fallen at eMoney.** This is what enabled the Zocks/Jump AI products to ship.

2. **MGP API access is still partner-gated.** Envestnet exposes some MoneyGuide APIs (Monte Carlo, account data) but the developer portal is gated behind partnership outreach. This is plausibly why MGP has no comparable native AI doc-intake yet — and possibly why the next obvious wedge for a new entrant is *MGP-first*.

3. **Schema complexity is real but not the binding constraint.** eMoney's Fact Finder has hundreds of fields; mapping is custom-ish per firm. PreciseFP solved this years ago with hand-curated templates, and Zocks/Jump are now doing the LLM version. So the schema-mapping problem is tractable — the integrations partnership is what gates entry.

4. **Liability / accuracy is the real friction with advisors, not the technology.** Every product that has shipped (Zocks, RightCapital SmartImport, FP Alpha) explicitly emphasizes **advisor review-and-approve before push**. Nobody is selling a "fully automated, no human in the loop" product because:
   - An AI extraction error on cost basis or beneficiary designation creates a compliance-reportable incident.
   - Advisors and paraplanners are not willing to sign off on plans built from un-reviewed AI extraction.
   - This caps how much labor is actually saved — the workflow is "AI extracts → paraplanner reviews → advisor approves" not "AI extracts → done." The 70% time savings RightCapital cites assumes reviewer correction, not zero touch.

5. **The standalone-startup squeeze is structural.** Document extraction has no data gravity — the data lands in eMoney/MGP/RightCapital, not in the extraction tool. So the first incumbent to ship a passable native version (RightCapital did it first, March 2026, free) wins by default for that platform's users. This is the Powder/Flextract problem.

6. **Fidelity ownership of eMoney is no longer the blocker** it would have been pre-2024 — eMoney's API push appears genuine and Zocks is a Fidelity-blessed AI partner. Envestnet/MGP is the more closed of the two large incumbents.

---

## Sample workflow showing where the data-entry burden lives

**Scenario:** new HNW client, dual-income exec couple, two kids, $4M net worth, complex compensation.

**Documents the paraplanner receives:**
1. Joint 1040 (3 yrs) + state returns + W-2s + K-1 from spouse's consulting LLC
2. Joint Schwab brokerage statement
3. His Fidelity 401(k) statement
4. Her Vanguard 401(k) statement
5. His Morgan Stanley at Work RSU + ESPP statement + grant agreements
6. Her deferred comp election forms + non-qualified deferred comp statement
7. Two term life policies (his + hers) + one whole life policy with cash value
8. Umbrella + auto + home P&C policies
9. Two 529 plans (one in-state, one Utah)
10. HSA statement
11. Mortgage statement
12. Will + revocable trust + financial POA + healthcare directive
13. Recent home appraisal
14. Father-in-law's irrevocable trust naming her as beneficiary

**Where each piece of data goes today (using eMoney as planning system):**

| Doc | Data the fact-finder needs | How it gets in today (2026) |
|---|---|---|
| Schwab statement | Holdings, cost basis, account titling | Custodial feed → automatic |
| Fidelity 401(k) | Balance, contributions, employer match | Plaid or Yodlee aggregation if connection works; else PDF re-typed |
| Vanguard 401(k) | Same | Same |
| Morgan Stanley RSU/ESPP | Balance auto-syncs; **vesting schedule, grant date, strike, sale-restriction periods → all manual** | Manual re-key from grant agreement PDF |
| Deferred comp | Balance + payout election + crediting rate | Manual |
| Whole life | Cash value, death benefit, premium, surrender charge schedule, loan balance | Manual (FP Alpha can extract; not auto-pushed to eMoney) |
| Term life | Death benefit, premium, term remaining, beneficiaries | Manual (Zocks Doc Intelligence claims to extract beneficiaries) |
| 1040 | AGI, taxable income, capital gains, withholding, Schedule B/D/E detail, AMT | Holistiplan analyzes → advisor reads → advisor manually transcribes the relevant fields into eMoney; OR Zocks/RightCapital SmartImport extracts → advisor reviews → pushes |
| K-1 | Pass-through income, basis, distributions | Manual |
| 529s | Balance, beneficiary, contribution history | Aggregator if covered; else manual |
| Will + trust | Executor, trustee, beneficiaries, distribution provisions, marital trust funding formula, GST exemption use | Wealth.com / Vanilla / FP Alpha extracts → estate diagram. Push of structured fields into eMoney is partial. |
| Mortgage | Balance, rate, term remaining, P&I, escrow | Aggregator sometimes; usually manual |
| Home appraisal | Value as of date | Manual |
| FIL trust | Beneficiary interest, estimated future inheritance, conditions | Pure manual; this kind of soft data lives in advisor's notes, not a structured field |

**Net:** even with a fully tooled-up 2026 firm running eMoney + Zocks + Holistiplan + Wealth.com + Pontera, this client still requires meaningful paraplanner manual entry on ~half the documents. The thesis that "nobody automates this" is wrong, but the thesis that "there is still hours of manual work per HNW client" is correct.

---

## Strategic implications for the pitch

Three honest framings, ranked by defensibility against the 2026 competitive set:

1. **Strongest:** "Fact-finder automation **for MoneyGuidePro / Naviplan / Asset-Map**" — i.e., the planning systems where the incumbents have NOT shipped a native AI ingestion feature. The catch: API access is harder to get from Envestnet than from eMoney, which is why this gap exists.

2. **Strong:** "The long-tail document specialist" — RSU grant agreements, deferred comp election forms, ESOP statements, K-1s, life insurance illustrations, business valuations, captive insurance docs. These are the docs the incumbents under-serve because they're low-volume per firm but high-fee-per-client. Sell into RIA firms with HNW/exec-comp/business-owner books.

3. **Risky in 2026:** "Generic AI doc extraction → planning fact-finder, eMoney/RightCapital first." This is now table-stakes feature competition against three well-funded incumbents (RightCapital, Zocks, Jump) and at least four startups (Powder, Flextract, paraplanner.ai, Superplan), with a structural disadvantage on distribution.

A fourth option is **cross-document reconciliation/QA** — taking the same client's tax return, three brokerage statements, will, and 401k statements and producing a normalized household balance sheet plus a list of discrepancies (e.g., "Schedule B shows interest from an account that isn't in the brokerage statement set; possible missing account"). Zocks does profile-mismatch alerts; nobody does true cross-document reconciliation as the primary product.

---

## Sources

- [Zocks and eMoney Announce Enhanced Integration Featuring AI-Powered Document Intelligence (Dec 2, 2025)](https://www.zocks.io/press/zocks-and-emoney-announce-enhanced-integration-featuring-ai-powered-document-intelligence)
- [Zocks and eMoney Launch AI-Powered Integration to Eliminate Manual Data Entry (Jun 11, 2025)](https://www.zocks.io/press/zocks-and-emoney-launch-ai-powered-integration-to-eliminate-manual-data-entry-and-maintenance-in-financial-planning)
- [Zocks Document Intelligence product page](https://www.zocks.io/features/document-intelligence)
- [RightCapital Smart Import press release (Mar 3, 2026)](https://www.accessnewswire.com/newsroom/en/business-and-professional-services/introducing-smart-importtm-rightcapitals-revolutionary-ai-powere-1142704)
- [RightCapital Q1 2026 Updates](https://www.rightcapital.com/blog/q1-2026-updates/)
- [InvestmentNews: RightCapital's AI document extraction is the latest 'incumbent' AI tool threatening standalone providers](https://www.investmentnews.com/advisor-tech/rightcapitals-ai-document-extraction-is-the-latest-incumbent-ai-tool-threatening-standalone-providers/266301)
- [Kitces: The Latest in Financial AdvisorTech (April 2026)](https://www.kitces.com/blog/the-latest-in-financial-advisortech-april-2026-wealthbox-ai-agents-tools-jump-rightcapital-wealthstream/)
- [Kitces: The Latest in Financial AdvisorTech (March 2026)](https://www.kitces.com/blog/the-latest-in-financial-advisortech-march-2026-altruist-jump-zocks-ria-custodian/)
- [Kitces: The Latest in Financial AdvisorTech (November 2025)](https://www.kitces.com/blog/the-latest-in-financial-advisortech-november-2025-right-capital-data-migration-advyzon-elements-emoney/)
- [Jump and eMoney Streamline Advisor Workflows (Jul 2025)](https://finance.yahoo.com/news/jump-emoney-streamline-advisor-workflows-130800976.html)
- [Jump eMoney Integration help docs](https://help.jumpapp.com/en/articles/11604737-emoney-integration)
- [Jump + Asset-Map Integration](https://jump.ai/press/asset-map-jump-integration)
- [eMoney Developer Portal](https://developer.emoneyadvisor.com/)
- [eMoney Invests in APIs with New Developer Site](https://emoneyadvisor.com/resources/news/emoney-advisor-invests-in-apis-with-new-developer-site/)
- [eMoney Aggregation overview](https://emoneyadvisor.com/why-emoney/aggregation/)
- [Envestnet MoneyGuide Developer Portal](https://developer.envestnet.com/use-cases/moneyguide/know-where-they-stand)
- [MoneyGuidePro Integration Partners](https://www.moneyguidepro.com/ifa/home/integrationpartners)
- [Holistiplan Integrations](https://www.holistiplan.com/platform/integrations/)
- [FP Alpha Estate Insights 2.0 (Jun 2025)](https://www.prnewswire.com/news-releases/fp-alpha-unveils-estate-insights-2-0-helping-financial-advisors-deliver-deeper-more-actionable-planning-302471093.html)
- [FP Alpha homepage](https://fpalpha.com/)
- [Wealth.com Ester AI](https://www.wealth.com/ester/)
- [Wealth.com Secures $65M to Expand AI Estate Platform](https://www.wealthmanagement.com/artificial-intelligence/wealth.com-secures-65m-to-expand-ai-estate-platform)
- [Vanilla V/AI Automatic Profiles](https://www.justvanilla.com/blog/vai-automatic-profiles)
- [PreciseFP eMoney integration](https://precisefp.com/partners/emoney/)
- [PreciseFP MoneyGuide integration](https://precisefp.com/partners/moneyguide/)
- [PreciseFP Financial Fact Finder Statement Upload](https://help.precisefp.com/en/articles/9179725-financial-fact-finder-statement-upload)
- [PreciseFP + FinMate AI: Data-Entry-Free Financial Planning](https://precisefp.com/news-events/precisefp-and-finmate-ai-launch-new-integration/)
- [Flextract on Costanoa Ventures](https://www.costanoa.vc/portfolio/flextract)
- [Powder on Y Combinator](https://www.ycombinator.com/companies/powder)
- [paraplanner.ai](https://paraplanner.ai/)
- [Superplan AI Paraplanner](https://www.superplan.ai/)
- [Pontera platform](https://pontera.com/platform)
- [Pontera + Orion Eclipse integration (Apr 2026)](https://www.businesswire.com/news/home/20260407141838/en/Orion-and-Pontera-Expand-Collaboration-with-Integration-that-Pulls-Retirement-Accounts-Directly-into-Orion-Eclipse-Workflows)
- [Pontera + AdvisorEngine integration](https://www.advisorengine.com/newsroom/pontera-and-advisorengine-integration-to-streamline-holistic-401k-management-capabilities)
- [Kitces: Why Held-Away Asset Management Tech Is Being Scrutinized](https://www.kitces.com/blog/401k-held-away-asset-management-data-aggregation-pontera/)
- [Plaid Investments product page](https://plaid.com/products/investments/)
- [Income Lab launches Penny AI Paraplanner (Apr 2026)](https://incomelaboratory.com/penny-ai-paraplanner-launch/)
- [Libretto AI-Automated Client Onboarding (Mar 2026)](https://www.businesswire.com/news/home/20260303597935/en/Libretto-Launches-AI-Automated-Client-Onboarding-and-AI-Assistant-to-Streamline-Financial-Planning-and-Asset-Allocation)
