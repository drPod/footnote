# Footnote — Pitch Deck

> Dense slides. Many data points. When pitching, gloss over details — judges scan the references and trust the homework.
> Each slide has speaker notes (italics) and inline source citations. All numbers traceable to `research/*.md`.

---

## Slide 1 — Title + Thesis

**Footnote**
*Task-aware context assembly for wealth advisors*

> Their AI gets the meeting transcript. Ours gets the meeting transcript plus the four documents that actually matter for what the advisor is trying to write — assembled automatically per task.

— Cache Hackathon 2026 · Software Track · UIUC · April 24-26, 2026

*Speaker note:* "Most existing wealth-AI tools are amnesiac at the moment of action. They have access to the data — they don't put it in the prompt. We do."

---

## Slide 2 — The Market

**$298B/yr in US advisory revenue. ~300k advisors. ~110k paraplanners. $20-40k/yr tech budget per advisor. Nobody owns this layer.**

| Industry total | Number | Source |
|---|---|---|
| US household investable assets | $88.2T | Federal Reserve / Cerulli |
| Advised assets (US) | ~$35T | Cerulli 2025 |
| Total US advisory revenue (~0.85% blended fee) | **$298B/yr** | calc |
| US advisors total | ~300,000 | Cerulli |
| US RIA firms (SEC + state) | ~20,000 | SEC IARD |
| Top 25 RIAs combined AUM | $4.5T | Barron's / InvestmentNews 2026 |
| Advisor tech budget per seat | $20-40k/yr (4-6% of revenue) | Kitces AdvisorTech Study |

**Vertical AI comps already played out:**

| Comp | Vertical | ARR | Valuation |
|---|---|---|---|
| Harvey | Legal | $190M | **$11B** (Mar 2026) |
| Abridge | Healthcare | $117M | $5.3B |
| Gong | Sales | $300M+ | $7.25B peak |

**Wealth-AI category leader projection: $200-400M ARR by 2028-29 → $8-15B valuation.** *(comps pattern, `research/market-size.md`)*

*Speaker note:* "Every other vertical got its AI killer app. Wealth got note-takers. We're going for the production layer."

---

## Slide 3 — The Real Workflow (Paraplanner Time)

**HNW client onboarding = 8-15 paraplanner hours. The bottleneck is data assembly, not analysis.**

| Activity | Hrs/wk per paraplanner | $ saved if AI wins |
|---|---|---|
| Document gathering + data entry | **8-12** | $14-21k/yr |
| Plan analysis + scenario modeling | 8-10 | (kept human) |
| Meeting prep deliverables | 6-8 | $11-14k/yr |
| Post-meeting CRM + follow-up | 5-7 | $9-12k/yr |
| Client servicing (interrupt layer) | 4-6 | $7-11k/yr |
| Compliance / IPS / suitability | 2-4 | $4-7k/yr |

*Source: Kitces "What does a paraplanner do" + Simply Paraplanner + FPA Journal 2021*

**Per paraplanner saveable: $30-60k/yr.** Boutique RIA (20 advisors, 7 paraplanners) → $184k/yr labor saved → **4.4× ROI on $42k SaaS spend**.

**Industry total: $12B/yr theoretical labor savings, $1.8-3.6B/yr capturable.**

**Doc intake reality:**
- 55% of client doc transmission = email PDF
- 25% = client portal upload
- 10% = account aggregation (only covers connectable accounts)
- 7% = physical / in-person
- Only 11% of clients use the full advisor portal (J.D. Power 2023)

*The vault is messy. The schemas are nasty. The bottleneck is structured retrieval, not extraction.*

---

## Slide 4 — Competitive Landscape (April 2026)

**Notetaker layer is saturated and consolidating. Paraplanner layer is structurally underbuilt. Memory layer is the new frontier — and crowded.**

| Player | Stage | What they ship | What they miss |
|---|---|---|---|
| **Jump** | $105M raised, $80M Series B Feb 2026 (Insight) | Meeting notes → CRM, "AI Associate" agent, "Ask Anything" cross-meeting RAG | Documents in vault are NOT in prompt |
| **Zocks** | $59M total, $45M Series B Lightspeed/QED | Notes + Document Intelligence (Dec 2025) → eMoney; **MCP shipped April 2, 2026** | Doc parsing is shallow (~50 fields); MCP requires advisor install |
| **Salesforce Agentforce FS** | Enterprise default | Financial Advisor Agent + Banker Agent + Data 360 | $3-5k/seat, 6-12mo implementation, 95% of RIAs locked out |
| **Savvy Wealth** | $106M, Savvy Intelligence Apr 22, 2026 | Unified investments + tax + plans, AI agents | **Only for Savvy advisors** — won't sell layer to other RIAs |
| **Wealthbox AI Agents** | Early access Mar 2026 | CRM-native agents, Playbooks | Wealthbox-only; no PDF parsing |
| **eMoney CoPlanner** | Shipped 2026 | AI plan-building inside eMoney (48% time reduction) | In-app only; no comms layer |
| **Orion Denali** | Rolling out 2026 | AI across portfolio mgmt | Portfolio scope only |
| **Holistiplan** | 39% tax-planning market share, 9.1/10 satisfaction | Tax return → analysis report in <60s | Tax-only; doesn't push to fact-finder |
| **FP Alpha** | Established | 16 disciplines (estate + tax + insurance + P&C extraction) | Doesn't push to MGP/Naviplan fact-finders |
| **Powder** | YC, $5M seed | Document parser → proposals | $500/seat; sales-pre-close only |
| **Paraplanner.ai** | private | Plan generation in eMoney/MGP/RC | AI + offshore humans hybrid; fragile |
| **Libretto** | Mar 2026 launch | AI client onboarding | Brand new; minimal traction |
| **RightCapital SmartImport** | Free Mar 3, 2026 | Native AI doc → fact-finder for RightCapital users | Only for RightCapital (~25-26% market) |
| **Memv.ai** (sponsor) | Beta | Multimodal memory infra (graph + vector, MCP server) | No advisor schemas, no customers public |

*Source: Kitces AdvisorTech April 2026 + T3/Inside Information 2026 Survey + InvestmentNews + research/competitors.md*

**Funding heat map: Jump $105M, Range $148M, Savvy $106M, Zocks $59M. Notetaker layer = $400M+ in deployed capital.** Paraplanner layer = $5M (Powder) + $3M (Zeplyn) + few small bootstrapped. **Asymmetric.**

---

## Slide 5 — The Real Gap (What Nobody Ships)

**Every well-funded incumbent is racing to be the brain. They all share the same blind spot: *what gets fed to the LLM at task time.***

**When advisor clicks "draft Q2 follow-up email" in Jump, the prompt =**
- Meeting transcript
- CRM contact card
- *(end)*

**Sitting in the vault, NOT in the prompt:**
- 1040 + W-2 + K-1 + Schedule B/D/E
- Schwab brokerage statement (cost basis, holdings)
- Fidelity / Vanguard 401(k) statements (**including beneficiary designations**)
- 529 statements
- Term + whole life policies (cash value tracking vs illustration)
- HSA, mortgage, HELOC statements
- Revocable trust, pour-over wills
- Klein Family Trust (inheritance) certification + estate inventory
- RSU grant agreements (vesting schedule + strike + clawback)
- ESPP enrollment
- College admission letter + cost of attendance
- Last 4 meeting transcripts

**8 verified gaps with NO meaningful AI player attacking today** *(per `research/competitors.md`)*:
1. End-to-end pipeline (PDFs → fact-finder → plan + commentary)
2. In-force insurance policy review (cash-value tracking, illustration drift)
3. AI translates Monte Carlo → client-facing language
4. Cross-tool reconciliation (Holistiplan vs MGP vs eMoney)
5. US suitability report automation (UK has AdvisoryAI; US gap)
6. Estate doc → recommendation → attorney handoff
7. Continuous plan monitoring (beneficiary conflicts, RSU vest tax shifts)
8. **Pre-meeting briefing fusing PDFs + custodial + plan + tax + last 3 meetings**

**Scenario 3 (the killer):** Mary's Vanguard 401(k) primary beneficiary = Edward Klein, deceased Feb 14, 2026. **Visible only on page 1 of the Q1 statement uploaded April 18.** Jump output = silent. Zocks output = silent. Salesforce = generic 24-month review task. ChatGPT = silent. **Footnote: alert email at 6:00 AM next morning, prefilled Form 06-K attached, draft client email ready.**

*Source: `demo-scenarios.md` Scenario 3*

---

## Slide 6 — How We Win (The Actual Product)

**Footnote = task-aware context assembly layer. Same data sources as competitors. Different processing.**

**Three components, in order:**

1. **Document extraction → structured wealth-mgmt schemas.** eMoney has ~400 fact-finder fields. RSU grant agreements have vest schedule + strike + clawback. K-1s have partner allocation tables. Trust deeds have GST exemption + crummey provisions. Generic doc AI doesn't know these schemas. We do.

2. **Task-typed retrieval.** When advisor triggers a task — `email`, `memo`, `brief`, `alert` — the retrieval logic pulls the right slices for that specific task type. Tax memo retrieves different docs than email retrieves than beneficiary alert retrieves. **The retrieval policy is the moat.**

3. **Document-event triggers.** New upload arrives at 7:42 PM → review pipeline runs overnight → alert in advisor's inbox at 6:00 AM. *Not* a periodic CRM rule. *Not* waiting for the advisor to remember to look.

**Citations everywhere.** Every fact in our output traces back to source PDF + page. Hover the badge → see the snippet.

**Defensibility:**
- 400+ field eMoney schema + 600+ field MGP schema + RSU/K-1/trust schemas = real domain work
- Cross-document reconciliation logic = real domain work
- SEC/FINRA liability scares generic doc-AI startups away from money-touching work
- API access tier (eMoney opened late 2025; MGP still partner-gated; RightCapital only for RightCapital users)

**Distribution:** boutique RIAs (5-50 advisors) on eMoney + Redtail/Wealthbox stacks. **The segment too small for Salesforce Agentforce, too independent for Savvy, not on Wealthbox.** ~$5-15k ACV. 17,000 firms.

---

## Slide 7 — Demo

**Live demo at `[your-url]/compare`**

Five tools. One client. Same task. Watch the prompts get assembled.

**Smith Family** — Robert (54, VP Eng MegaCorp, RSU vest May 15 = $187k), Mary (51, partner law firm, inherited $850k Klein Trust Feb 14, Vanguard 401k beneficiary STILL = deceased father), Emma (18 → Carnegie Mellon Sept), Liam (16, gap year), $4.5M NW, 26 docs in vault, April 22 meeting transcript.

**Five scenarios in the dropdown:**
1. Q2 Follow-Up Email
2. Vanguard Beneficiary Mismatch Alert *(the killer — competitors silent)*
3. Mid-Year Tax Memo *(quantified $64,300 savings)*
4. Parkinson's Diagnosis Multi-Vector Memo *(6 dimensions from a passing transcript mention)*
5. Q2 Review Prep Brief

**The reactive moment:** drop a new RSU grant amendment into the vault → OURS column re-runs retrieval → output rewrites in place with new AMT exposure number. Other 4 columns: context unchanged, output unchanged. **Same data arrived for all 5. Only one product reacted.**

*Speaker note: walk through Scenario 3 first if pressed for time. The silence from Jump/Zocks columns is the demo's emotional peak.*

---

## Slide 8 — Roadmap, GTM, Ask

**12-month roadmap:**
- **Q3 2026:** Deepen 4 schemas (eMoney 400 fields, RSU grant, K-1, trust deed). Pilot with 3 boutique RIAs on eMoney.
- **Q4 2026:** Ship the 5 task types in production (email, memo, brief, alert, monitoring). SOC 2 Type II.
- **Q1 2027:** API tier — sell as the data ingestion layer to Jump / Zocks / Wealthbox. Picks-and-shovels tier.
- **Q2 2027:** Expand to Redtail/Wealthbox-native + Salesforce FSC-overlay variants.
- **Year 2:** Adjacent verticals — insurance brokerage (430k US agents, same pattern), CRE brokerage (130k), mortgage origination (170k).

**Why us:**
- Domain insider — Darsh's mom is a wealth manager at Creative Planning ($700B AUM) — direct user access for product feedback the moment we ship.
- Hackathon proof: 26-document fictional Smith Family with 5 task types working in <5 hours.
- Built on Memv multimodal memory (sponsor); graph-aware retrieval primitive.

**The ask (for VCs):** $2.5M seed → 18-mo runway → 2 founding eng + 1 design + 1 BizDev + ramp 3-RIA pilot to 25 paying RIAs ($5-15k ACV). Path to $1M ARR end of 2027.

**The ask (for hackathon judges):** the prize for making judges see — for the first time — what an AI system that *doesn't forget the documents* feels like.

---

## Appendix — The 8 Sample Outputs (For Q&A)

If a judge asks "show me what 'task-aware retrieval' actually outputs" without launching the demo, here are the comparison highlights from each scenario. *(Full versions in `demo-scenarios.md`.)*

### Scenario 3 highlight — Vanguard Beneficiary Alert

**Jump:** *(no output — Jump has no surface that fires on document upload)*

**Footnote (us), generated 06:00 AM April 19, the morning after the Q1 statement uploaded at 7:42 PM April 18:**
> ⚠ URGENT — Beneficiary mismatch. Mary's Vanguard 401(k) primary = Edward Klein (deceased 2026-02-14, confirmed via Klein Family Trust certification). Account balance $748,200. Contingent: blank. **WE PREPARED:** prefilled Vanguard Form 06-K, draft email to Mary, calendar reminder.

### Scenario 4 highlight — Mid-Year Tax Memo

**Jump:** "Consider a partial Roth conversion. Confirm AGI with CPA. Charitable bunching via DAF. Tax-loss harvesting may exist — refer to CPA."

**Footnote:**
> Projected 2026 AGI $680k (35% bracket). RECOMMENDED: defer Robert's bonus to Jan 2027 (~$18k savings), bunch DAF $50k (~$14k), **skip Roth** (inverted given bracket), harvest 220 sh MGCP at -$32 cost basis (~$8k savings + carryforward), max Mary's Backdoor Roth before MAGI phase-out. **Total quantified: $64,300.**

---

## Sources (full reference list available on request)

- `research/competitors.md` — full competitive deep-dive, 14 players
- `research/fact-finder-gap.md` — what RightCapital/Zocks/Jump actually shipped vs missed
- `research/workflow-deep-dive.md` — Kitces, T3, Glassdoor advisor data
- `research/market-size.md` — TAM derivation + comp valuations
- `research/memory-thesis.md` — why "persistent memory layer" pivot was rejected as a pitch (red ocean)
- `demo-scenarios.md` — Smith Family persona + 5 scenarios × 5 tool outputs (the proof artifact)
- Kitces AdvisorTech April 2026 monthly review
- T3 / Inside Information 2026 Software Survey
- InvestmentNews on RightCapital SmartImport (Mar 3, 2026)
- Zocks MCP press release (April 2, 2026)
- Savvy Intelligence launch (April 22, 2026)
- Jump $80M Series B (Insight Partners, Feb 2026)
