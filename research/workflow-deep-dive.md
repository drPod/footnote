# Wealth Management Workflow Deep Dive: How It Actually Works

Research synthesis on real-world financial advisor / paraplanner / wealth management workflows. Pulls from Kitces.com (deepest source on advisor productivity research), the 2025 Kitces AdvisorTech Study, the 2025/2026 T3/Inside Information Software Survey, Glassdoor data, and industry trade publications. Where the generic walkthrough was wrong, it is called out explicitly.

---

## TL;DR — Things the generic walkthrough probably got wrong

1. **Plan delivery is not 30+ hours of paraplanner work.** The Kitces benchmark for "first year of engagement, all team members combined" is **~35 hours**, of which **~15 hours** is the initial plan creation/delivery itself, and only a fraction of that is paraplanner time. A CFP-led firm averages **32 hours**; a non-CFP firm averages **41 hours** ([Kitces, "Real Financial Planning Process"](https://www.kitces.com/blog/second-kitces-research-study-real-financial-planning-process-2020/)). If your pitch implies "10+ hour paraplanner doc-intake job per client," that's high.
2. **"Big Three" planning software market share has shifted.** As of the 2025 Kitces AdvisorTech Study and 2026 T3 Survey, **RightCapital is now #2 (~25–26%)** and **MoneyGuide has fallen to ~18.6%**, with eMoney still leading at ~28% ([Kitces, AdvisorTech Highlights](https://www.rightcapital.com/blog/kitces-report-technology/); [T3 2026](https://t3technologyhub.com/live-from-t3-key-wealthtech-and-ai-findings-from-the-2026-t3-inside-information-software-survey/)). MoneyGuide is no longer "the boutique standard."
3. **Most documents don't come through a client portal.** Client portal *advisor-side* adoption is ~76%, but only ~11% of clients actually use the full digital toolset their advisor offers, and only ~half of portal-enrolled investors are frequent users ([J.D. Power 2023, via SuiteFiles](https://www.suitefiles.com/financial-advisor-client-portal-guide/)). Email PDFs and "bring the box of statements to the meeting" remain dominant for actual document intake.
4. **Mass affluent clients almost never get a "full plan."** Below ~$1M, most firms run a goal-based, software-templated plan, not a full data-gathering exercise. Paraplanner work is largely RightCapital/MoneyGuide goal-entry, not document parsing.
5. **AI notetakers are eating the easy paraplanner wedge first.** Jump, Zocks, and FinMate AI already saved ~10 hrs/wk for early adopters and have 15–23% adoption depending on firm size ([Kitces, AI Notetakers](https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/)). Doc-intake is the next wedge but is more contested.

---

## 1. Workflow Variation by Firm Size + Client Segment

Wealth management is not monolithic. The same workflow words ("intake," "plan," "review") refer to dramatically different processes at a $300M boutique vs Creative Planning ($350B+). The matrix below crosses the two dimensions that actually matter.

### Firm Size × Tech Stack Matrix

| Firm size | AUM range | CRM | Planning | Portfolio mgmt | Paraplanner role | Doc intake reality |
|---|---|---|---|---|---|---|
| **Solo (1–3)** | <$200M | Wealthbox | RightCapital | Schwab / Altruist / Orion-lite | No paraplanner; advisor self-serves or outsources to virtual paraplanner ($60–$100/hr or ~$1,000/plan flat) | Email + "send me the PDFs" + login-to-account approach |
| **Boutique RIA (5–50)** | $200M–$3B | Redtail (43% RIA share) or Wealthbox (#2, fastest growing) | eMoney or RightCapital | Orion (most common) or Black Diamond | 1–3 paraplanners; each supports 2–3 lead advisors. Spends ~50% of week on plan analysis + meeting prep | Mix: client portal (eMoney/Redtail), email PDF, in-person doc drop |
| **Mid-market RIA (50–500)** | $3B–$25B | Salesforce FSC + overlay (Practifi, XLR8, Salentica) or large Wealthbox / Redtail deployment | eMoney dominant, Orion Planning growing | Orion or Tamarac (~18% market share, mid-market leader) | Specialized: planning analyst, investment ops, client service associate roles separated | Dedicated client services team handles intake; portal usage higher (~50%) |
| **Mega RIA / wirehouse (500+)** | $25B+ (Creative Planning $350B+, Mariner $470B+, Edelman $290B+) | Salesforce FSC heavily customized + internal tooling | eMoney enterprise + custom planning workflows | Addepar (HNW/UHNW), Tamarac, or proprietary | Functions completely siloed: doc intake team, planning analyst pool, IPS team, compliance reviewer, client onboarding ops | Proprietary client portal + scanned-mail center + onsite scanning at branch |

Sources: [T3 2025/2026 Survey](https://t3technologyhub.com/joel-bruckenstein-and-bob-veres-present-key-findings-from-2025-t3-inside-information-software-survey-at-2025-t3-conference/), [Revisor Group CRM Showdown](https://revisorgroup.com/redtail-vs-wealthbox-vs-salesforce-which-crm-is-best-for-financial-advisors/), [VantagePoint Salesforce FSC Guide](https://vantagepoint.io/blog/sf/the-complete-crm-showdown-salesforce-fsc-vs.-wealthbox-vs.-redtail-vs.-orion-vs.-practifi).

### Client Segment × Workflow Matrix

| Segment | Assets | Plan style | Doc burden | Paraplanner hours per new client | Where paraplanner spends time |
|---|---|---|---|---|---|
| **Mass affluent** | $100k–$1M | Goal-based, software-templated (MGP / RightCapital wizards) | Light: 1–2 statements, W-2, maybe tax return | 2–4 hrs | Goal entry, risk questionnaire, IPS template |
| **HNW** | $1M–$10M | Comprehensive: retirement, tax, insurance, estate | Heavy: tax returns, brokerage statements, 401(k), mortgage, insurance policies, trust docs, estate docs | 8–15 hrs (this is the meat of the paraplanner job) | Document gathering, eMoney data entry, scenario modeling, IPS, estate review |
| **Ultra HNW** | $10M–$30M | Multi-entity, multi-generational, includes business succession, alternatives, complex trusts | Very heavy: K-1s, partnership docs, LLC filings, trust deeds, side letters, capital call notices, multiple custodians | 20–40+ hrs across multiple specialists | Entity mapping, trust accounting handoff, alternative investment document parsing, tax overlay |
| **Family office** | $30M+ (often $100M+) | Continuous bespoke; CIO-level investment policy; back-office functions internalized | Thousands of docs: LPAs, side letters, capital calls, K-1s, trust docs, insurance, real estate, art, aircraft | Not "per client" — full-time team | Multi-system data ingestion (Addepar, Canoe, Asora, Masttro), reconciliation, custom reporting |

Sources: [Kitces, eMoney vs RightCapital](https://www.kubera.com/blog/emoney-vs-rightcapital), [Asora Family Office Tech Stack](https://asora.com/blog/ultra-high-net-worth-family-office), [Crain Currency Family Office Tech](https://www.craincurrency.com/technology/tech-platforms-streamline-family-office-operations).

**Key insight:** the 8–15 hour HNW segment is where the paraplanner doc-intake AI wedge is most defensible. Mass affluent is too cheap to bother automating; UHNW/family office requires custom domain depth (K-1 parsing, capital call automation already owned by Canoe Intelligence).

---

## 2. Day in the Life of a Paraplanner (Real, Not Generic)

### The Kitces benchmark numbers

Per [Kitces' paraplanner research](https://www.kitces.com/blog/what-does-a-paraplanner-do-to-support-a-financial-advisor/):

- A senior advisor with a paraplanner serves **120 clients @ $279k revenue**, vs 73 clients @ $155k for solo — paraplanner support nearly doubles capacity.
- Paraplanners spend **~6 hrs/wk in client meetings** with the lead advisor.
- ~50% of the rest of their week is **plan analysis + meeting prep**.
- Salary: **$52k–$70k**, with $60–$70k+ in HCOL coastal markets. Senior paraplanners cresting $80k+.

### How the week actually breaks down (composite from Kitces, Simply Paraplanner, and FPA sources)

| Activity | Hours/week (typical 40–45 hr week) | Notes |
|---|---|---|
| **Document gathering & data entry** (emailing clients for tax returns, parsing PDFs into eMoney/RC) | 8–12 | The single biggest gripe. Often 2–4 weeks of back-and-forth per HNW client |
| **Plan analysis & scenario modeling** in eMoney/MGP/RC | 8–10 | The "real" paraplanner work — Roth conversions, tax projections, Monte Carlo |
| **Meeting prep deliverables** (one-page summaries, agendas, in-force ledgers) | 6–8 | Per Kitces, prep starts Mon, finishes Friday for next-week meetings |
| **Client meetings + post-meeting CRM notes** | 5–7 | Increasing as AI notetakers eliminate the note-cleanup tail |
| **Client servicing** (calls, emails, trade requests, beneficiary updates) | 4–6 | Often the "interrupt" layer — kills focus time |
| **Compliance / IPS / suitability docs** | 2–4 | More at SEC-registered firms; less at state-only |
| **CE, training, internal meetings** | 2–3 | |

Sources: [Kitces paraplanner role analysis](https://www.kitces.com/blog/what-does-a-paraplanner-do-to-support-a-financial-advisor/), [FPA Journal "Hire a Paraplanner"](https://www.financialplanningassociation.org/article/journal/AUG21-take-your-practice-next-level-hire-paraplanner), [Simply Paraplanner](https://simplyparaplanner.com/6-ways-paraplanners-can-help-financial-advisors-manage-their-time/).

### What paraplanners hate (qualitative, from Kitces, Professional Paraplanner UK survey, MoneySavingExpert forum)

- **Being treated as "glorified administrators"** — 37% of paraplanners cite lack of internal respect as a top challenge ([Professional Paraplanner](https://professionalparaplanner.co.uk/what-are-the-challenges-and-misconceptions-around-paraplanning/)).
- **Document chase loops** — the "client said they'd send the tax return last Tuesday" cycle.
- **Manual re-keying across systems** — same data going into CRM (Redtail) + planning software (eMoney) + portfolio management (Orion) + compliance (IPS template). Integrations exist but are leaky.
- **Last-minute meeting prep changes** — advisor adds an agenda item Thursday for Friday's meeting.
- **Compliance friction** — disclosure paperwork, IPS updates, suitability review on every recommendation change.

### Real-firm color (Glassdoor)

- **Creative Planning**: 4.5/5 overall, but reviews flag "fast-paced workflow" and high client load per associate; well-defined ladder from associate → wealth manager. Paraplanners (titled "Financial Planning Associates") report heavy plan-prep volume.
- **Mariner Wealth Advisors**: 55% would recommend; uses Addepar, Tableau, Salesforce; bigger compliance overhead than boutiques.
- **Edelman Financial Engines**: more centralized planning factory; paraplanners function more as analysts producing standardized deliverables than HNW-style customizers.

Sources: [Glassdoor Creative Planning](https://www.glassdoor.com/Reviews/Creative-Planning-Reviews-E1084534.htm), [Mariner vs Creative Planning](https://www.glassdoor.com/Compare/Mariner-Wealth-Advisors-vs-Creative-Planning-EI_IE1072575-E1084534.htm).

---

## 3. New Client Onboarding: Actual Time Breakdown

### The Kitces benchmark

[Kitces' Real Financial Planning Process Study](https://www.kitces.com/blog/second-kitces-research-study-real-financial-planning-process-2020/) — the canonical data source:

- **Total first-year engagement, all team members combined: ~35 hours.**
- **Initial plan creation/delivery alone: median 10 hrs, mean 15 hrs.**
- CFP-led firm: 32 hrs total; non-CFP: 41 hrs total. Experienced CFP: 29 hrs; experienced non-CFP: 52 hrs.
- 26% of an advisor's overall time is spent on plan creation + meeting prep ([Kitces time-allocation study](https://www.kitces.com/blog/how-do-financial-advisors-spend-time-research-study-productivity-capacity-efficiency/)).
- Most advisors (37%) use a **3-meeting onboarding** structure: data gathering → plan delivery → implementation.

### Calendar timeline (from "signed engagement letter" to "plan delivered")

| Stage | Calendar duration | Active labor hours (paraplanner) | Active labor hours (advisor) |
|---|---|---|---|
| Engagement signed → discovery meeting | 1–2 weeks | ~1 hr (CRM setup, intake form prep) | 1 hr (review prospect file) |
| Discovery meeting | Day 0 | 1 hr (attend, take notes) | 1.5 hrs (lead) |
| Document gathering chase | 2–4 weeks (this is the bottleneck) | 3–6 hrs (emails, reminders, parsing what comes in, account aggregation setup) | <1 hr |
| Plan construction in eMoney/RC | 1–2 weeks | 6–10 hrs (HNW); 2–4 hrs (mass affluent) | 2–3 hrs (review + customize) |
| Plan delivery meeting | Day 35–60 | 1–2 hrs (deck + handouts) | 1.5–2 hrs |
| Implementation (account opening, ACATs, beneficiary forms) | 3–6 weeks | 4–8 hrs | 1–2 hrs |
| **Total: signed letter → plan delivered** | **~4–8 weeks (HNW: 6–12 weeks)** | **~12–20 hrs** | **~5–8 hrs** |

Sources: [X1 Wealth onboarding checklist](https://x1wealth.com/resources/advisor-client-onboarding-checklist) — confirms 4–12 wk range; [OnboardMap](https://onboardmap.com/insights/case-studies/client-onboarding-for-financial-advisors/) — 30-day standard target.

### The biggest paraplanner time sinks

1. **Document chase (3–6 hrs per HNW client, often spread over 3 weeks).** The follow-up loop is brutal: client uploads one PDF, missing the K-1, paraplanner emails again, client responds with the wrong year's tax return. This is **the AI wedge** for doc-intake products.
2. **Manual re-keying from PDF → eMoney/RC.** ~2–4 hrs per HNW client just typing balances, cost basis, and account types from scanned statements. eMoney has account aggregation (Yodlee/MX) but it covers ~70% of accounts and breaks frequently.
3. **Reconciling discrepancies** between what client said and what statements show (different account balances, missed accounts).

### How docs are actually gathered (% of usage, composite from advisor surveys)

| Method | % of intake |
|---|---|
| Email PDF attachments | ~55% |
| Client portal upload (eMoney Vault, Wealthbox, Redtail Imaging) | ~25% |
| Account aggregation (Yodlee, MX, Plaid) | ~10% (read-only data; doesn't replace tax returns / estate docs) |
| Physical / in-person drop-off | ~7% |
| Secure messaging app (Citrix ShareFile, etc.) | ~3% |

Adoption note: ~76% of advisors have a client portal but only ~11% of *clients* use the full toolset ([SuiteFiles / J.D. Power](https://www.suitefiles.com/financial-advisor-client-portal-guide/)). Email is still king for actual transmission.

---

## 4. Quarterly Meeting Cycle: Actual Time Breakdown

### What "meeting prep" actually produces

From [Kitces Client Meeting Prep Checklist](https://www.kitces.com/blog/client-meeting-prep-checklist-for-financial-advisors/):

- **Standard week-long prep cadence**: Mon → Tue (Level 1, CSA: account verification, contact info, custodian downloads), Tue → Wed (Level 2, paraplanner: in-force insurance ledgers, planning software refresh, scenario reruns), Thu (advisor reviews, requests additions), Fri (final prep).
- Typical deliverables: **one-page client summary** (performance, allocation drift, life updates, action items), **internal advisor workbook** (compliance notes, IPS reaffirmation), **agenda**.

### Time per quarterly review (boutique RIA, HNW client)

| Role | Time per QBR |
|---|---|
| CSA / admin (Level 1 prep) | 30–60 min |
| Paraplanner (Level 2 prep) | 1.5–3 hrs |
| Lead advisor (review + meeting + follow-up) | 1.5–2.5 hrs |
| **Total team time per client per quarter** | **~3.5–6 hrs** |

For a paraplanner supporting 2 advisors with ~80 HNW clients each → roughly **40 hrs/quarter just on QBR prep** (~10 hrs/wk during prep weeks). Most firms run quarterly reviews on a rolling basis to smooth load.

### Standard prep checklist (what shows up in the Kitces template + Russell Investments + Asset-Map versions)

1. Pull most-recent custodian statements + reconcile to performance system.
2. Refresh financial plan in eMoney/RC with new balances; rerun Monte Carlo and tax projection.
3. Check life events (CRM notes from last meeting; portal messages).
4. Performance attribution + benchmark comparison.
5. Allocation drift / rebalance opportunities.
6. Tax-loss harvesting candidates (year-end heavy).
7. Beneficiary / estate doc currency check (annual cadence).
8. IPS reaffirmation + suitability check.
9. Action items from prior meeting — status?
10. Agenda + one-pager produced.

Sources: [Kitces meeting prep checklist](https://www.kitces.com/blog/client-meeting-prep-checklist-for-financial-advisors/), [Asset-Map meeting checklist](https://www.asset-map.com/blog/financial-advisor-meeting-checklist), [Russell Investments client review framework](https://russellinvestments.com/us/resources/financial-professionals/effective-client-reviews).

---

## 5. eMoney vs MoneyGuidePro vs RightCapital — Workflow Reality

### Market share (2025/2026)

| Software | Kitces 2025 share | T3 2026 share | Satisfaction (Kitces) |
|---|---|---|---|
| eMoney | ~28% | ~29% | 8.5/10 |
| RightCapital | ~25–26% | ~21% | **8.7/10 (highest)** |
| MoneyGuide / MGP Elite | ~18.6% (down from 30.3% in 2021) | ~22% | 7.9/10 |

Sources: [Kitces 2025 AdvisorTech Report Highlights](https://www.rightcapital.com/blog/kitces-report-technology/), [T3 2026 Survey](https://t3technologyhub.com/live-from-t3-key-wealthtech-and-ai-findings-from-the-2026-t3-inside-information-software-survey/), [RIABiz on RightCapital growth](https://riabiz.com/a/2025/10/15/rightcapital-makes-a-run-at-emoney-and-moneyguidepro-with-a-new-tool-to-bypass-the-pain-of-back-office-data-entry-but-one-rival-says-been-there-done-that-so-bring-it-on).

### Workflow differences

| | eMoney | MoneyGuidePro | RightCapital |
|---|---|---|---|
| Planning approach | Cash-flow heavy; line-item modeling | Goal-based wizard | Hybrid: toggle goal & cash-flow views |
| Best fit | HNW / UHNW with complex cashflows, estate | Mass affluent, broker-dealer rep channel, enterprise standardization | Independent RIAs, newer / millennial advisors |
| Data entry burden | **Heaviest** (Advanced Planning section is daunting; full balance sheet) | Lightest (guided interview, ~1 hr to first plan) | Moderate; ~4 hrs to proficiency |
| Account aggregation | Yodlee built-in (eMoney is the aggregation OG) | Limited | Plaid + others |
| Paraplanner workflow impact | 60–80% of paraplanner planning hours go here at HNW firms | "Junior team members can learn it in one session" — minimal paraplanner depth needed | Modern UI cuts data-entry friction; growing share among new firms |
| Annual cost (est.) | $3,500–$5,000/seat enterprise, ~$2,000 indie | $1,500/seat | $1,000–$1,500/seat |

Sources: [RightCapital vs eMoney comparison](https://www.rightcapital.com/blog/rightcapital-vs-emoney-differences/), [Kubera analysis](https://www.kubera.com/blog/emoney-vs-rightcapital), [Kitces best planning software guide](https://www.kitces.com/blog/best-financial-planning-software-reviews-financial-advisors-guide-on-how-to-choose/).

### Why this matters for the AI wedge

- **An AI doc-intake product targeting eMoney users** addresses the worst data-entry pain (eMoney users spend the most paraplanner hours on data entry).
- **MoneyGuidePro users barely have a doc-intake problem** because the tool intentionally uses ranges/estimates, not line items.
- **RightCapital is already shipping back-office data-entry automation** as of October 2025 ([RIABiz](https://riabiz.com/a/2025/10/15/rightcapital-makes-a-run-at-emoney-and-moneyguidepro-with-a-new-tool-to-bypass-the-pain-of-back-office-data-entry-but-one-rival-says-been-there-done-that-so-bring-it-on)) — incumbents are aware of the wedge.

---

## 6. Compliance Overhead

- IPS preparation from scratch: **~155 minutes per client** ([InvestmentNews on IPS AdvisorPro](https://www.investmentnews.com/fintech/ips-advisorpro-go-online-and-save-time-on-investment-policy-statements/23051)) — broken down as 15 min questionnaire/data, 15 min asset allocation models, 15 min benchmarks, 30 min customization, 60 min recommendations + proofreading, 20 min compliance review.
- Form ADV: SEC requires update within 90 days of fiscal year-end; full review of all items in Parts 1 & 2A annually.
- Suitability review: **annual minimum**, full re-papering every 2–3 years; required after material life events.
- Compliance is a meaningful but not dominant slice of paraplanner time: **~5–10% (2–4 hrs/wk)** at boutique RIAs; higher (~15%+) at SEC-registered mid/large firms with formal CCO functions.
- 37% of advisors admit they struggle to find time for the annual compliance review ([Comply](https://mco.mycomplianceoffice.com/blog/registered-investment-adviser-compliance)).

Sources: [Kitces recordkeeping checklist](https://www.kitces.com/blog/recordkeeping-financial-planning-service-delivery-checlist-documentation-regulators-examination-books-records-requirements-ria/), [Shartsis Friese ADV compliance](https://www.sflaw.com/2026/01/22/form-adv-compliance-for-investment-advisers/).

---

## 7. What Advisors Pay For (Tech Budget)

### Headline benchmarks

- **Mature firm tech spend: 4–6% of revenue** (2023 Kitces AdvisorTech Study); **~3.8% of revenue** per 2024 InvestmentNews Benchmark Study.
- At $500–700k revenue per advisor, that's **$20–40k/yr of total tech spend per advisor** ([Kitces](https://www.kitces.com/blog/the-latest-in-financial-advisortech-september-2024/)).
- Solo RIA: $650–1,000/month total tech ($8–12k/yr).
- Each additional staff member: $300–800/mo additional tech.
- Firms <$250M AUM are **1.8× less likely** to adopt tech best practices vs $1B+ firms.

### Per-seat costs of representative tools (2026)

| Tool | Cost/seat/yr | Buyer |
|---|---|---|
| Wealthbox CRM | ~$420–$540 | Firm IT or advisor |
| Redtail CRM | ~$1,200–$1,500 | Firm IT |
| Salesforce FSC | $3,000–$5,000+ (with overlay) | Firm IT (mid+) |
| RightCapital | $1,000–$1,500 | Advisor or firm |
| MoneyGuidePro | ~$1,500 | Advisor or BD |
| eMoney Pro | ~$3,500–$5,000 enterprise | Firm |
| Orion (portfolio + reporting) | bps-based; ~1–2 bps of AUM | Firm |
| Addepar | $25k–$100k+/yr (HNW/family office) | Firm |
| Jump / Zocks / FinMate (AI notetaker) | $1,200–$2,400 | Firm or advisor |

Sources: [Advisor Perspectives, Cost of Technology](https://www.advisorperspectives.com/articles/2022/07/19/the-cost-of-technology-for-financial-planners), [Kitces Best Financial Planning Software](https://www.kitces.com/blog/best-financial-planning-software-reviews-financial-advisors-guide-on-how-to-choose/), [COMPLY RIA tech selection](https://www.comply.com/resource/how-to-select-technology-for-a-new-ria-firm-step-2-setting-a-budget/).

### Who buys

- **Solo / small boutique:** advisor buys their own stack — short cycle, credit card, single-decision-maker. Easy GTM.
- **Mid-market RIA:** firm IT/COO is decision-maker; multi-month sales cycle; integrations with existing CRM/PMS are non-negotiable.
- **Mega RIA:** central tech committee + InfoSec review; 6–12 month sales cycles; need SOC 2 Type II, custom contracts, often pilot programs in one division first.

---

## 8. Where the AI Wedge Is Biggest at Each Firm Size

Mapping the doc-intake / paraplanner-AI thesis against firm size:

| Firm size | AI wedge size | Why | GTM motion |
|---|---|---|---|
| **Solo (1–3)** | Medium-Large | No paraplanner = advisor IS the paraplanner; doc-intake friction directly costs billable hours. But TAM per firm is small ($1–2k/yr willingness to pay). | Self-serve / freemium; PLG; integrate w/ Wealthbox + RightCapital |
| **Boutique RIA (5–50)** | **LARGEST** | Paraplanners exist + are bottlenecked + firm controls budget + tech stack is standardized. eMoney + Redtail/Wealthbox = clear integration targets. | Inside sales; partner with custodians (Schwab, Altruist) and aggregators (XYPN); $5–15k ACV |
| **Mid-market RIA (50–500)** | Large | Highest absolute revenue per deal but slower sales; entrenched workflows; some have built internal tools. Compliance review demanding. | Outbound enterprise sales; SOC 2 mandatory; integration with Salesforce FSC, Orion, Addepar; $50k+ ACV |
| **Mega RIA / wirehouse** | Smallest practical wedge | Internal IT often builds; procurement is slow; compliance is centralized; doc workflows are partially automated already. | Strategic partnership / OEM with the platform vendor (eMoney, Salesforce, Orion); long cycle |
| **Family office** | Niche but high-value | Doc problem is severe (K-1s, capital calls, side letters), but Canoe Intelligence, Asora, Masttro already own this | Probably wrong target unless willing to specialize in alternative-asset doc parsing |

### Specific time-savings narratives that resonate

- **Boutique RIA pitch:** "Your paraplanner spends 8–12 hrs/wk on doc gathering and re-keying for every HNW onboarding. Cut that to 2 hrs. At $60k loaded paraplanner cost, that's ~$15k of capacity per paraplanner per year, or 2–3 additional client onboardings per quarter."
- **Solo pitch:** "Stop spending Saturday morning typing 1099s into RightCapital."
- **Mid-market pitch:** "Standardize a 30-day onboarding SLA across 80 advisors with auto-extracted source-of-truth data into eMoney."

### What the competitive landscape already does

- **AI notetakers** (Jump, Zocks, FinMate, Pulse360): meeting capture → CRM, draft client recap, draft compliance note. Already saving "10+ hrs/wk per advisor" per Zocks ([Zocks blog](https://www.zocks.io/blog/how-ai-saves-financial-advisors-10-hours-per-week)). Adoption: ~15–23% by firm structure ([Kitces](https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/)).
- **Estate document parsing**: EncorEstate Plans is the named leader in 2025 Kitces AdvisorTech Study.
- **Alternative investment doc parsing**: Canoe Intelligence (125 family offices), Arch.
- **Back-office data entry into planning software**: RightCapital launched its own (Oct 2025); eMoney has long had aggregation; nobody has nailed "client uploads any PDF → fully populated plan in eMoney."

**The defensible wedge for an AI doc-intake product is: the boutique-to-mid-market RIA serving HNW clients on eMoney + Redtail/Wealthbox.** That's where:
1. The pain is real (8–15 hrs of paraplanner time per onboarding).
2. Budgets exist ($20–40k/advisor/yr tech spend, room for $5–15k ACV).
3. Tech stack is standardized enough to integrate.
4. No incumbent has fully solved it (RightCapital's solution doesn't help eMoney shops; Canoe is alternatives-only; AI notetakers don't do doc intake).
5. CFP/paraplanner labor is expensive enough to justify automation but not so abundant that firms internally build.

---

## Sources (consolidated)

**Kitces.com (primary source)**
- [What Does A Paraplanner Do](https://www.kitces.com/blog/what-does-a-paraplanner-do-to-support-a-financial-advisor/)
- [Real Financial Planning Process Study (2020)](https://www.kitces.com/blog/second-kitces-research-study-real-financial-planning-process-2020/)
- [How Do Financial Advisors Spend Their Time](https://www.kitces.com/blog/how-do-financial-advisors-spend-time-research-study-productivity-capacity-efficiency/)
- [Best AI Notetakers For Advisors](https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/)
- [Client Meeting Prep Checklist](https://www.kitces.com/blog/client-meeting-prep-checklist-for-financial-advisors/)
- [Outsourcing Financial Plan Preparation](https://www.kitces.com/blog/outsourcing-financial-plan-preparation-solo-financial-advisor-time-wellbeing-capacity-wall/)
- [Best Financial Planning Software Guide](https://www.kitces.com/blog/best-financial-planning-software-reviews-financial-advisors-guide-on-how-to-choose/)
- [Recordkeeping Compliance Checklist](https://www.kitces.com/blog/recordkeeping-financial-planning-service-delivery-checlist-documentation-regulators-examination-books-records-requirements-ria/)

**Tech surveys**
- [T3/Inside Information 2025 Software Survey](https://t3technologyhub.com/joel-bruckenstein-and-bob-veres-present-key-findings-from-2025-t3-inside-information-software-survey-at-2025-t3-conference/)
- [T3 2026 Survey Highlights](https://t3technologyhub.com/live-from-t3-key-wealthtech-and-ai-findings-from-the-2026-t3-inside-information-software-survey/)
- [Kitces 2025 AdvisorTech Highlights](https://www.rightcapital.com/blog/kitces-report-technology/)

**Comparisons & adoption**
- [Revisor Group: Redtail vs Wealthbox vs Salesforce](https://revisorgroup.com/redtail-vs-wealthbox-vs-salesforce-which-crm-is-best-for-financial-advisors/)
- [VantagePoint CRM Showdown](https://vantagepoint.io/blog/sf/the-complete-crm-showdown-salesforce-fsc-vs.-wealthbox-vs.-redtail-vs.-orion-vs.-practifi)
- [RightCapital vs eMoney](https://www.rightcapital.com/blog/rightcapital-vs-emoney-differences/)
- [Kubera: eMoney vs RightCapital](https://www.kubera.com/blog/emoney-vs-rightcapital)
- [RIABiz on RightCapital data-entry automation (2025)](https://riabiz.com/a/2025/10/15/rightcapital-makes-a-run-at-emoney-and-moneyguidepro-with-a-new-tool-to-bypass-the-pain-of-back-office-data-entry-but-one-rival-says-been-there-done-that-so-bring-it-on)

**Onboarding & client portals**
- [X1 Wealth onboarding checklist](https://x1wealth.com/resources/advisor-client-onboarding-checklist)
- [OnboardMap case studies](https://onboardmap.com/insights/case-studies/client-onboarding-for-financial-advisors/)
- [SuiteFiles client portal guide](https://www.suitefiles.com/financial-advisor-client-portal-guide/)

**Family office**
- [Asora UHNW family office guide](https://asora.com/blog/ultra-high-net-worth-family-office)
- [Crain Currency family office tech](https://www.craincurrency.com/technology/tech-platforms-streamline-family-office-operations)

**Compliance**
- [InvestmentNews on IPS time](https://www.investmentnews.com/fintech/ips-advisorpro-go-online-and-save-time-on-investment-policy-statements/23051)
- [Shartsis Friese Form ADV compliance](https://www.sflaw.com/2026/01/22/form-adv-compliance-for-investment-advisers/)

**Practice profile**
- [Glassdoor Creative Planning](https://www.glassdoor.com/Reviews/Creative-Planning-Reviews-E1084534.htm)
- [FPA Journal: Hire a Paraplanner](https://www.financialplanningassociation.org/article/journal/AUG21-take-your-practice-next-level-hire-paraplanner)
- [Professional Paraplanner UK survey](https://professionalparaplanner.co.uk/what-are-the-challenges-and-misconceptions-around-paraplanning/)
