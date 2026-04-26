# Competitor Research: AI Tools for Financial Advisors / Wealth Management

Last updated: April 2026. Skeptical breakdown of what each tool actually does, what it doesn't, pricing, traction, and the workflow gaps left wide open.

---

## TL;DR Landscape

The market has clearly bifurcated:

1. **Meeting-notes layer is saturated and consolidating.** Jump dominates (~27k advisors, $80M Series B Feb 2026, leading Kitces/T3 satisfaction). Zocks is the strong #2 (no-recording angle, $45M Series B). FinMate, Mili, Zeplyn, Wealthbox AI Notetaker, Nitrogen AI, Fathom, and Zoom AI Companion are all fighting for the rest. Kitces 2025 Research: top two advisor-specific notetakers (Jump + Zocks) = 12.8% combined, Zoom AI alone = 27%. Pricing has compressed from $120 to $50–75/seat/month.
2. **Prospecting / lead-gen is a separate stack.** Catchlight (Fidelity Labs spin-out) and WealthFeed dominate AI-driven prospect enrichment / money-in-motion alerts. Powder addresses prospect proposals. None of these touch the back-office.
3. **The paraplanner layer is barely populated.** Only Paraplanner.ai, Libretto, FP Alpha, Holistiplan, and (partially) Powder operate here. None do all of: PDF intake → fact finder population in eMoney/MGP → draft plan generation → Monte Carlo → estate/tax/insurance review in one loop. This is the real gap.
4. **The "AI-native RIA" is a different beast.** Savvy Wealth and Range are not selling tools to advisors — they ARE the advisor. They compete with the firms buying Jump.

---

## Player-by-Player Breakdown

### Meeting-Notes Layer

#### Jump (jumpapp.com / jump.ai)
- **Tasks automated:** Meeting transcription/summarization → CRM auto-fill (Wealthbox, Redtail, Salesforce, AdvisorEngine), action item extraction → tasks, follow-up email drafts, compliance log generation, "Ask Anything" cross-meeting query, March 2026 release added an "AI Associate" that drafts emails, schedules follow-ups, and creates contacts (with approval gating). [Product](https://jumpapp.com/product) · [March 2026 update](https://jump.ai/blog/march-2026-product-update)
- **Workflow position:** Pre-meeting (agenda prep) → during (notes) → post (CRM, follow-up emails, compliance). Now creeping into general workflow execution.
- **Praised:** #1 in 2025 T3/Inside Information and Kitces satisfaction surveys. Deep CRM integrations. ~1 hour/day saved per advisor in user surveys. [Crunchbase](https://www.crunchbase.com/organization/jump-be8c)
- **Complaints:** App Store reviews report meeting recordings disappearing repeatedly ("absolutely a disaster of a product"). Clunky UI. Slow data loading. Steep cost relative to allowed meetings. Multi-party meetings (>2 attendees) are weak per Zocks comparison page. [Jump AI App Store](https://apps.apple.com/us/app/jump-ai/id6475781425)
- **Pricing:** Tiered $75 / $120+/seat/month. $120 plan adds meeting "scorecards." [InvestmentNews price compression article](https://www.investmentnews.com/advisor-tech/is-50-the-new-120-price-compression-comes-to-ai-notetakers/264773)
- **Funding/traction:** $105M total. Series A $20M Feb 2025 (Battery), Series B $80M Feb 2026 (Insight Partners + F-Prime + Allianz Life Ventures + TIAA Ventures). 27,000+ advisors. Partnerships: LPL, Sanctuary, Integrated Partners, Mission Wealth. [Series B announcement](https://jump.ai/press/series-b-announcement)
- **Unmet need:** Plan generation. PDF data extraction beyond meetings. Tax/estate document analysis. Doesn't write actual financial plans. Doesn't pull from custodial statements.

#### Zocks (zocks.io)
- **Tasks automated:** No-recording meeting capture (audio processed live, never stored), structured note generation, action item extraction, **fact-finder/intake form auto-fill**, CRM sync (Wealthbox + others), client profile aggregation across meetings, automated email replies (top tier), task delegation. [Features](https://www.zocks.io/features) · [Wealthbox integration](https://www.zocks.io/crms/wealthbox)
- **Workflow position:** During-meeting + post-meeting + early-stage form intake. Form-fill capability puts them slightly closer to paraplanner work than Jump.
- **Praised:** No-recording compliance angle resonates with broker-dealers. Better speaker attribution than Jump. Handles multi-party meetings better than Jump. SOC 2 Type II. [Why no-recording](https://www.zocks.io/blog/why-financial-advisors-choose-ai-tools-that-dont-record)
- **Complaints:** Less coverage than Jump. Smaller integration ecosystem. Like all notetakers, struggles with "soft" items (e.g., missed action item when client mentions wife is pregnant) per Oasis Group benchmark.
- **Pricing:** Tiered $67 / $184/seat/month. Top tier adds automated client email replies. [Pricing comparison](https://www.investmentnews.com/advisor-tech/is-50-the-new-120-price-compression-comes-to-ai-notetakers/264773)
- **Funding/traction:** $13.8M Series A March 2025 (Motive Ventures + Lightspeed); **$45M Series B late 2025/early 2026 (Lightspeed + QED)**. Claims 5,000+ firms, 8x YoY revenue. Customers include Ameritas, Carson Group, Kestra, Osaic. [Series B Crunchbase News](https://news.crunchbase.com/fintech/zocks-raises-seriesb-ai-assistant-financial-advisers/)
- **Unmet need:** No plan-drafting. No tax/estate document parsing. No portfolio analysis. Form-fill is fact-finder only, not Plan generation in eMoney/MGP.

#### FinMate AI (finmate.ai)
- **Tasks automated:** Meeting transcription/summary, structured categorization, task extraction, file upload for in-person recordings, CRM push to Redtail/Wealthbox/Salesforce/Webex. New "agentic" capability per their site. [Site](https://finmate.ai/)
- **Workflow position:** During / post-meeting only. Pure notetaker.
- **Praised:** Built by advisors for advisors. ~100% transcription accuracy in Oasis Group test. Affordable for solo/small RIAs. Clean handoffs.
- **Complaints:** Lacks workflow automation depth of Jump/Zocks. ~4% market share. Solid-but-not-leading on CRM integration depth per WealthTechToday review. [WealthTechToday review](https://wealthtechtoday.com/2025/04/29/best-ai-notetakers-for-financial-advisors-2025-a-strategic-buyers-guide/)
- **Pricing:** ~$76/month base; tiered up to enterprise.
- **Funding:** Not publicly disclosed any large round; small/bootstrapped per Crunchbase. [Crunchbase](https://www.crunchbase.com/organization/finmate-ai)
- **Unmet need:** Everything outside the meeting room.

#### Mili (getmili.ai)
- **Tasks automated:** Recording-free meeting documentation across Zoom/Meet/Teams + phone + in-person, customizable templates per firm, structured task creation, CRM push to Wealthbox/Salesforce/Practifi/Salentica. [Site](https://getmili.ai/) · [Wealthbox integration](https://www.wealthbox.com/integrations/mili/)
- **Workflow position:** During / post-meeting.
- **Praised:** Firm-specific rubrics and customizable templates — strongest customization story among notetakers. Practifi/Salentica integration matters for enterprise RIAs.
- **Complaints:** New entrant, limited adoption data, no public satisfaction benchmarks yet.
- **Pricing:** Not public.
- **Funding/traction:** $2M seed Jan 2025 (Chiratae, BoldCap, SFMG Wealth Advisors, Quent Capital, Better Capital). Founded 2024 in Plano TX. [Funding announcement](https://www.prnewswire.com/news-releases/mili-emerges-from-stealth-with-its-enterprise-ai-platform-for-wealth-management-firms-and-2-million-in-seed-funding-302344221.html)
- **Unmet need:** Same as FinMate — outside-meeting workflows untouched.

#### Zeplyn (zeplyn.ai)
- **Tasks automated:** Meeting prep (auto-generated agendas), notes, **compliance checklists tracked during reviews**, automatic life-event detection (house, baby), task management, follow-ups. Recently launched "Agent Nexus" (agentic AI) and "Ask Zeplyn." [Why Zeplyn](https://www.zeplyn.ai/why-zeplyn)
- **Workflow position:** Pre / during / post-meeting. Compliance checklist tracking is differentiated.
- **Praised:** 95%+ post-meeting summary accuracy claim. Compliance-checklist-during-meeting is unique. Used by Financial Reserve.
- **Complaints:** Limited public complaint data. Smaller scale than Jump/Zocks.
- **Pricing:** Not detailed publicly. Agent Nexus / Ask Zeplyn rolling out free, will become add-on.
- **Funding:** $3M seed (per Financial Planning). [Financial Planning](https://www.financial-planning.com/news/zeplyn-raises-3m-for-its-ai-assistant-for-financial-advisors)
- **Unmet need:** No plan generation, no document parsing.

#### Wealthbox AI Notetaker (wealthbox.com)
- **Tasks automated:** Native CRM-embedded notetaker — transcripts, summaries, follow-up emails, AI-generated "Ideas" (potential next steps), task conversion. Audio recording uploads supported. [Wealthbox notetaker launch](https://www.wealthbox.com/wealthbox-announces-launch-ai-notetaker/)
- **Workflow position:** During / post-meeting, but tightly bound to Wealthbox's "Meetings" object (a new free CRM component).
- **Praised:** First advisor-CRM-native notetaker. No separate login. 14-day free trial. Tight integration with task system.
- **Complaints:** Only useful if Wealthbox is your CRM. Less mature than Jump/Zocks. Lock-in risk.
- **Pricing:** $49/seat/month add-on.
- **Funding:** Wealthbox is private, owned by Starburst Labs. Not separately funded for AI feature.
- **Unmet need:** Only meeting layer. Lock-in to single CRM.

#### Nitrogen AI Meeting Center (nitrogenwealth.com)
- **Tasks automated:** Native notetaker (transcripts, real-time summaries, CRM-ready notes) inside Nitrogen (formerly Riskalyze). Integrates with Salesforce, Redtail, Wealthbox-coming-soon. [Launch](https://www.businesswire.com/news/home/20250715288916/en/Nitrogen-Launches-AI-Meeting-Center-to-Revolutionize-Advisor-Productivity)
- **Workflow position:** Adjunct to Nitrogen's risk/proposal stack — most useful when meetings are risk/proposal-driven.
- **Pricing:** Free for Nitrogen Complete users; add-on otherwise.
- **Unmet need:** Only valuable if you already use Nitrogen.

#### AdvisoryAI (advisoryai.com) — UK
- **Tasks automated:** Meeting notes, **suitability reports** (UK-specific), compliance, client management. AI-generated suitability reports in ~5 minutes. [Site](https://advisoryai.com/)
- **Workflow position:** Post-meeting + report generation. Suitability reports are the differentiated piece — analogous to US "investment policy statement" + plan summary.
- **Praised:** 2,000+ advisers across 300–400 UK firms; FT Adviser ranked #1 most-used UK AI platform 2025. 80% admin time savings claim.
- **Complaints:** UK-only product. Limited US relevance.
- **Pricing:** Not public.
- **Funding:** ~$586K (SFC Capital). Capital-efficient. [PitchBook](https://pitchbook.com/profiles/company/607817-71)
- **Unmet need:** US-style plan generation in eMoney/MGP. Tax/estate doc parsing.

---

### Prospecting / Top-of-Funnel

#### Catchlight (catchlight.ai)
- **Tasks automated:** Prospect enrichment (~2,000 data points/lead), conversion likelihood prediction, estimated investable assets/income/age, life events, prospect prioritization queue. [Product](https://catchlight.ai/product)
- **Workflow position:** Top-of-funnel only. Pre-prospect-call.
- **Praised:** 2x WealthManagement.com Industry Award winner (2023, 2024). Deep Fidelity Labs incubation gives data quality.
- **Complaints:** Quote-based pricing makes evaluation hard. Doesn't help once prospect becomes client.
- **Pricing:** From $1,999/year; ~$150/month per seat with annual discount.
- **Funding:** Wholly-owned subsidiary of FMR (Fidelity). 30 employees, Boston.
- **Unmet need:** Anything past first call.

#### WealthFeed (wealthfeed.com)
- **Tasks automated:** Prospect Discovery (filter physicians/business owners/execs by money-in-motion), Person Enrich (net worth + family + verified contact + socials), Monitor (real-time client money-in-motion alerts: business sales, job changes, inheritances), and **Warm Introduction** (find prospects in advisor's existing network — March 2026 launch). [Discover](https://www.wealthfeed.com/features/discover/)
- **Workflow position:** Top-of-funnel + ongoing client monitoring.
- **Praised:** Money-in-motion alerts on existing book is differentiated. Pay-as-you-go model.
- **Complaints:** Limited G2 reviews; data freshness debates in Reddit/advisor forums.
- **Pricing:** From $1,399/year (700 credits + database access).
- **Funding:** Not disclosed publicly.
- **Unmet need:** Doesn't write outreach, doesn't do meetings, doesn't do plans.

#### 11x (11x.ai)
- **Tasks automated:** Generic AI SDRs (Alice for outbound LinkedIn/email; Jordan for multilingual phone). Not wealth-specific.
- **Wealth relevance:** Low. Some advisors use Alice for outbound, but no industry-specific data, no compliance posture for advisor outreach. $50M Series B from a16z; ~$10M ARR.
- **Unmet need:** Everything wealth-specific.

---

### Document / Plan / Paraplanner Layer (the gap zone)

#### Powder (powderfi.com)
- **Tasks automated:** **Brokerage / 401k / IRA / private asset / balance sheet / vesting / estate / will / tax / insurance document parser.** Builds portfolio analysis (returns, risk, fees), generates tax/estate models, builds client proposals. Has a notetaker but it's not the focus. [YC profile](https://www.ycombinator.com/companies/powder) · [Site](https://www.powderfi.com/)
- **Workflow position:** Prospecting → onboarding (proposal generation). Sits between Catchlight/WealthFeed (prospect discovery) and Paraplanner.ai (plan generation). The "win-the-client" zone.
- **Praised:** 95% reduction in data extraction/entry time. Replaces 30min–3hr per statement. YC + 40 SV investors back it.
- **Complaints:** Steep $500/seat/month. Aimed at sales pre-close, less so at ongoing planning.
- **Pricing:** From $500/seat/month.
- **Funding:** $5M seed July 2024 (YC, General Catalyst, FundersClub, Elefund, Litquidity, Script Capital). [Wealthmanagement.com](https://www.wealthmanagement.com/financial-technology/wealthtech-startup-powder-raises-5m-in-seed-funding)
- **Unmet need:** Doesn't push into eMoney/MGP. Not a continuous paraplanner — point-in-time proposal tool.

#### Paraplanner.ai
- **Tasks automated:** Creates and updates financial plans **directly inside RightCapital, eMoney, MoneyGuidePro**. Document data extraction. Onboarding assistant. Pushes data into Wealthbox, Redtail, RightCapital, eMoney. Currently pursuing SOC 2. [Site](https://paraplanner.ai/)
- **Workflow position:** Paraplanner replacement. Plan drafting + onboarding.
- **Praised:** 24-hour turnaround. Direct integration with the three main planning tools is genuinely rare.
- **Complaints:** Quasi-AI, quasi-human service model — not pure SaaS. Limited transparency on what's AI vs. human paraplanner.
- **Pricing:** Not publicly listed.
- **Funding:** Small / not publicly disclosed.
- **Unmet need:** Compliance, tax doc parsing depth, monitoring. The model itself ("AI + offshore paraplanners") is fragile.

#### Libretto (libretto.io)
- **Tasks automated:** AI-automated client onboarding — uploads client files (eMoney/MGP/RightCapital reports, custom surveys) → extracts family details, goals, income, account balances → populates new client strategy with best-practice modeling pre-applied. [March 2026 launch](https://www.businesswire.com/news/home/20260303597935/en/Libretto-Launches-AI-Automated-Client-Onboarding-and-AI-Assistant-to-Streamline-Financial-Planning-and-Asset-Allocation)
- **Workflow position:** Onboarding + intake. Migration from existing planning tools.
- **Praised:** Genuinely fills the eMoney/MGP/RightCapital migration gap. Asset-allocation focus.
- **Complaints:** Very new (launched March 2026). Limited reviews.
- **Pricing:** Not public.
- **Funding:** Not publicly disclosed.
- **Unmet need:** Same gap as Paraplanner.ai but newer.

#### FP Alpha (fpalpha.com)
- **Tasks automated:** AI reads client tax returns, wills, trusts, POAs, healthcare directives, insurance policies → extracts key data → generates "Estate Snapshot" flow chart, NextGen Tax Insights, insurance gap analysis across **16 planning disciplines**. [Solutions](https://fpalpha.com/solutions/)
- **Workflow position:** Tax + estate + insurance review. Bolt-on after intake.
- **Praised:** Broadest planning-discipline coverage on the market. Founded by an actual practicing CFP (Andrew Altfest).
- **Complaints:** Heavy product, slow learning curve. Reviews note significant manual setup. Doesn't auto-push to MGP/eMoney.
- **Pricing:** Not publicly listed (typically $1k–3k+/year/advisor estimated).
- **Unmet need:** Doesn't draft plans. Doesn't do meetings. Doesn't connect to plan-drafting tools.

#### Holistiplan (holistiplan.com)
- **Tasks automated:** OCR + AI tax return analysis (100+ page return → structured analysis in <60s), state tax projection, multi-year Roth conversion, tax prep letters, cash-flow visualization. Insurance module included at higher tiers. [Pricing](https://www.holistiplan.com/pricing/)
- **Workflow position:** Tax planning only. Best-in-class for that one slice.
- **Praised:** **38.92% market share, 9.1/10 satisfaction in 2026 T3/Inside Information** — the dominant tax-planning tool.
- **Complaints:** Tax-only. No meetings, no plans, no estate beyond limited insurance.
- **Pricing:** $1,499/yr (30 households) → $10,499/yr (500 households).
- **Unmet need:** Everything outside tax. No plan generation.

#### Income Lab "Penny" (incomelaboratory.com)
- **Tasks automated:** AI paraplanner inside Income Lab — tax analysis, practice intelligence, meeting prep. Math is kept in deterministic engines (the marketing point: "math out of AI's hands").
- **Workflow position:** Inside Income Lab's retirement income planning tool only.
- **Unmet need:** Only useful for Income Lab customers; Income Lab doesn't do insurance gap analysis.

---

### CRM / Platform Layer

#### Salesforce Financial Services Cloud + Agentforce
- **Tasks automated:** Pre-built agent templates (200+) for wealth/banking/insurance/lending. Auto-meeting brief generation, account summary, financial plan analysis, manual research, "complete tasks like replacing a stolen credit card." Unified household data view. [Agentforce for FS](https://www.salesforce.com/financial-services/artificial-intelligence/)
- **Workflow position:** Enterprise CRM-anchored — wraps the entire client lifecycle when Salesforce is the system of record.
- **Praised:** Only credible enterprise option for large banks/wirehouses. 360-degree household view.
- **Complaints:** Implementation nightmare typical of Salesforce. Agentforce per-conversation pricing controversial. Not for sub-enterprise RIAs.
- **Pricing:** Enterprise quote-based. Agentforce typically $2/conversation.
- **Unmet need:** Independent RIAs can't afford or implement.

#### Redtail / Orion (orion.com)
- **Tasks automated:** ChatGPT integration for autocomplete in messages. **AI-powered meeting agendas** generated from CRM notes + portfolio analytics + planning data. Redtail Speak (text). "Denali AI" enterprise positioning. [Orion + Redtail AI](https://www.businesswire.com/news/home/20240123152275/en/Orion-and-Redtail-Boost-Advisor-Efficiency-with-Premier-EmailCalendar-Integration-and-AI-Enhancements)
- **Workflow position:** CRM-bolted utilities. Not a coherent agentic product.
- **Complaints:** Disjointed AI strategy — bolted-on ChatGPT rather than purpose-built.
- **Unmet need:** Real agentic workflow execution. Most Redtail customers use Jump/Zocks anyway.

---

### AI-Native RIAs (compete with the firms BUYING the tools above)

#### Savvy Wealth (savvywealth.com)
- **Not a tool** — it's an AI-native RIA. Recruits independent advisors onto its vertically-integrated platform. April 2026 launched **Savvy Intelligence**: agentic AI unifying investments, tax, planning. ~$6B AUM (5x YoY). [Launch](https://www.businesswire.com/news/home/20260422491297/en/)
- **Funding:** $106M total equity. $26.5M Series A, $72M Series B (July 2025).
- **Threat model:** Advisors who join Savvy don't buy Jump or Zocks — Savvy provides those workflows natively.

#### Range (range.com)
- **Not a B2B tool** — it's a direct-to-consumer flat-fee RIA for HNW ($300k+ income, $1M+ NW). Real CFPs + AI augmentation. [Site](https://www.range.com)
- **Traction:** $400M AUM, $9.5B AUA, 5,000+ HNW clients, 300% YoY revenue.
- **Funding:** $60M Series C (Scale Venture Partners + Gradient Ventures + Cathay Innovation). [Series C](https://www.cathaycapital.com/range-raises-60m-series-c-to-accelerate-ai-driven-wealth-management/)
- **Threat model:** Direct competitor to advisors, not a tool.

---

## Paraplanner Workflow Coverage Map

This is the meat of the gap analysis. Each row is a paraplanner task; each column tracks which AI players have meaningful product (not just marketing).

| Paraplanner task | Who plays here | Coverage quality | Gap |
|---|---|---|---|
| **PDF intake from custodial statements** (Schwab, Fidelity, Pershing) | Powder ($500/seat), Libretto, Paraplanner.ai | Powder has best parsing; Libretto strong on planning-tool reports | None do all custodian formats with high reliability + push to MGP/eMoney |
| **Fact-finder population in eMoney** | Paraplanner.ai, Libretto, Zocks (intake forms only) | Paraplanner.ai = service+software hybrid, Libretto = pure SaaS | True self-serve, no-touch population is rare |
| **Fact-finder population in MoneyGuidePro** | Paraplanner.ai, Libretto | Same | Same |
| **Fact-finder population in RightCapital** | Paraplanner.ai, Libretto | Same | Same |
| **Draft plan generation** (full plan output) | Paraplanner.ai (24h turn), Libretto (best-practices auto-applied) | Both nascent. Paraplanner.ai is partly humans. | **No tool generates a full pre-baked plan in eMoney/MGP from raw docs end-to-end** |
| **Monte Carlo / scenario modeling** | None as standalone AI — Income Lab Penny touches retirement only | Calculations stay in deterministic engines (correctly) | **No AI layer that interprets MC results in plain-English for advisor or client** |
| **Estate analysis** (will/trust/POA review) | FP Alpha (best-in-class), Powder (parses docs) | FP Alpha is the only deep player | No competitor pushes estate findings into eMoney plan or generates estate plan recommendations with attorney handoff |
| **Tax projection** | Holistiplan (39% market share), FP Alpha | Strong dedicated tools | Tax tools don't talk to plan tools — advisor manually reconciles |
| **Insurance gap analysis** | FP Alpha (one of 16 disciplines), Holistiplan (insurance module at higher tier) | FP Alpha is the dedicated player | No carrier-quoting, no live-policy-monitoring, no AI that reads in-force illustrations and surfaces underperformance |
| **Compliance / suitability documentation** | Jump (logs), Zeplyn (checklists in-meeting), AdvisoryAI (UK suitability reports) | Surface-level compliance only | **No US equivalent of AdvisoryAI's full suitability report generation**. No automated Reg BI / ADV exception detection from meeting transcripts. |

### What has NO meaningful AI player attacking it today
1. **End-to-end paraplanner pipeline.** No tool ingests a stack of PDFs (statements + tax returns + estate docs + insurance illustrations), populates eMoney/MGP, runs Monte Carlo, and outputs a draft plan with tax/estate/insurance commentary in one workflow. Each piece exists; nobody integrated them.
2. **In-force insurance policy review.** FP Alpha extracts data; nobody quotes alternatives, monitors carrier downgrades, or flags when a VUL is underperforming illustration assumptions.
3. **AI that interprets Monte Carlo output for client-facing language.** Income Lab gestures at this with guardrails; nobody else explains "73% probability" in client-meeting English from any planning tool.
4. **Cross-tool reconciliation.** Holistiplan says one thing about Roth conversions, MGP says another, advisor manually reconciles. No AI layer over the planning stack.
5. **US suitability report automation.** AdvisoryAI does this for UK; nobody does it natively for US Reg BI / 3-page CRS exception logic.
6. **Estate document → estate plan recommendation → attorney handoff** as one flow.
7. **Continuous plan monitoring.** Plans are drafted once, updated annually. Nobody runs an AI agent that flags "client's beneficiary designation conflicts with new will" or "tax projection now off by $40k due to RSU vest."
8. **Pre-meeting briefing that pulls from PDFs + custodial data + plan + tax return + last 3 meetings simultaneously.** Jump does meeting + CRM. Powder does docs. Nobody fuses both.

---

## Funding Heat Map (April 2026)

| Player | Total Raised | Last Round | Lead Investor | Notable |
|---|---|---|---|---|
| Jump | $105M | $80M Series B Feb 2026 | Insight Partners | 27k advisors, category leader |
| Range | $148M+ | $60M Series C 2025 | Scale Venture Partners | Direct-to-consumer RIA |
| Savvy Wealth | $106M | $72M Series B Jul 2025 | undisclosed | $6B AUM, AI-native RIA |
| Zocks | ~$59M | $45M Series B late 2025 | Lightspeed + QED | 5k firms, 8x YoY revenue |
| 11x | $74M+ | $50M Series B | a16z | $10M ARR, generic SDR |
| Powder | $5M | Seed Jul 2024 | YC + General Catalyst | Document-parser focus |
| Zeplyn | $3M | Seed | undisclosed | Compliance-checklist niche |
| Mili | $2M | Seed Jan 2025 | Chiratae + BoldCap | Customizable templates |
| AdvisoryAI | ~$586K | Seed | SFC Capital | UK-dominant, capital-efficient |
| Catchlight | n/a | Fidelity Labs subsidiary | FMR (parent) | 2x Wealthie award winner |
| WealthFeed | n/a | undisclosed | n/a | Pay-as-you-go model |
| FinMate | n/a | bootstrap-ish | n/a | Solo-RIA niche |
| Holistiplan | n/a | private | n/a | 39% tax market share |
| FP Alpha | n/a | private | n/a | Broadest discipline coverage |

---

## Strategic Takeaways

1. **The notetaker layer is over-funded and consolidating.** Jump's $80M Series B at 27k advisors and Zocks' $45M Series B mean they will buy or kill the smaller players. Building another notetaker is a bad bet.
2. **Paraplanner workflow is structurally underbuilt.** Paraplanner.ai is a service, Libretto is brand-new, FP Alpha is a single-discipline tool, Powder is sales-pre-close. **Nobody has a coherent end-to-end paraplanner.** This is the wedge.
3. **CRM-native AI (Wealthbox, Redtail/Orion, Salesforce) is fragmented and weak** — leaves room for cross-CRM agentic workflow tools.
4. **The real moat isn't AI, it's planning-tool integrations.** Whoever can write reliably to eMoney + MGP + RightCapital wins the paraplanner layer. Both Paraplanner.ai and Libretto are pursuing this; neither is dominant.
5. **The Savvy Wealth / Range model is the existential threat** to all the tool vendors above — if AI-native RIAs win recruiting, the tools have no buyer.

---

## Source URLs (canonical)

- Jump: [jump.ai](https://jump.ai/) · [Series B](https://jump.ai/press/series-b-announcement) · [Crunchbase](https://www.crunchbase.com/organization/jump-be8c)
- Zocks: [zocks.io](https://www.zocks.io/) · [Series B Crunchbase News](https://news.crunchbase.com/fintech/zocks-raises-seriesb-ai-assistant-financial-advisers/)
- FinMate: [finmate.ai](https://finmate.ai/) · [Crunchbase](https://www.crunchbase.com/organization/finmate-ai)
- Mili: [getmili.ai](https://getmili.ai/) · [Seed announcement](https://www.prnewswire.com/news-releases/mili-emerges-from-stealth-with-its-enterprise-ai-platform-for-wealth-management-firms-and-2-million-in-seed-funding-302344221.html)
- Zeplyn: [zeplyn.ai](https://www.zeplyn.ai/) · [$3M seed](https://www.financial-planning.com/news/zeplyn-raises-3m-for-its-ai-assistant-for-financial-advisors)
- Powder: [powderfi.com](https://www.powderfi.com/) · [$5M seed](https://www.wealthmanagement.com/financial-technology/wealthtech-startup-powder-raises-5m-in-seed-funding) · [YC](https://www.ycombinator.com/companies/powder)
- Savvy Wealth: [savvywealth.com](https://www.savvywealth.com/) · [Savvy Intelligence launch](https://www.businesswire.com/news/home/20260422491297/en/)
- Catchlight: [catchlight.ai](https://catchlight.ai/) · [Pricing](https://catchlight.ai/pricing)
- WealthFeed: [wealthfeed.com](https://www.wealthfeed.com/) · [Warm Introduction launch](https://www.businesswire.com/news/home/20260317971125/en/)
- Salesforce Agentforce FS: [salesforce.com](https://www.salesforce.com/financial-services/artificial-intelligence/)
- Wealthbox AI: [Notetaker launch](https://www.wealthbox.com/wealthbox-announces-launch-ai-notetaker/)
- Redtail/Orion: [orion.com](https://orion.com/) · [Orion + Redtail AI](https://www.businesswire.com/news/home/20240123152275/en/Orion-and-Redtail-Boost-Advisor-Efficiency-with-Premier-EmailCalendar-Integration-and-AI-Enhancements)
- AdvisoryAI: [advisoryai.com](https://advisoryai.com/) · [PitchBook](https://pitchbook.com/profiles/company/607817-71)
- Range: [range.com](https://www.range.com) · [$60M Series C](https://www.cathaycapital.com/range-raises-60m-series-c-to-accelerate-ai-driven-wealth-management/)
- 11x: [11x.ai](https://www.11x.ai/)
- Paraplanner.ai: [paraplanner.ai](https://paraplanner.ai/)
- Libretto: [libretto.io](https://www.libretto.io/) · [March 2026 launch](https://www.businesswire.com/news/home/20260303597935/en/)
- FP Alpha: [fpalpha.com](https://fpalpha.com/)
- Holistiplan: [holistiplan.com](https://www.holistiplan.com/) · [Pricing](https://www.holistiplan.com/pricing/)
- Income Lab Penny: [Launch](https://incomelaboratory.com/penny-ai-paraplanner-launch/)
- Nitrogen AI: [Launch](https://www.businesswire.com/news/home/20250715288916/en/)
- Kitces market research: [AI notetaker survey](https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/) · [Pricing compression](https://www.investmentnews.com/advisor-tech/is-50-the-new-120-price-compression-comes-to-ai-notetakers/264773)
- WealthTechToday buyer's guide: [Best AI Notetakers 2025](https://wealthtechtoday.com/2025/04/29/best-ai-notetakers-for-financial-advisors-2025-a-strategic-buyers-guide/)
