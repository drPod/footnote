# Pitch Skeleton — Task-Aware Context Assembly for Advisors

> Working draft. Reframed 2026-04-26 ~05:30 to context-engineering thesis.

## One-line tagline

**Their AI gets the meeting transcript. Ours gets the meeting transcript plus the four documents that actually matter for what the advisor is trying to write — assembled automatically per task.**

## The actual problem

Existing AI tools for advisors (Jump, Zocks, Salesforce Agentforce, Savvy, Wealthbox) all have access to client meetings, CRM, email, and the document vault. **They don't put the right slices in the prompt at task time.** When the advisor clicks "draft Q2 follow-up email" in Jump, what gets fed to the LLM = meeting transcript + CRM contact card. The Vanguard statement Mary uploaded last week, the Klein Trust death cert, Robert's RSU grant agreement, the MassMutual whole life illustration — all sitting in the vault, none in the prompt.

Advisors compensate by manually pasting into ChatGPT — doesn't scale, leaks PII, nobody does it for routine tasks.

## What we are

**Task-aware context assembly.** When the advisor triggers any task, our system retrieves the right slices of client memory for that specific task type, assembles them into the prompt, and generates grounded output with citations.

Same data sources as competitors. Different processing layer.

## Hook (15 sec)

Every Fortune 500 industry got its AI killer app in 2023-2025.
- Lawyers → Harvey, $3B
- Doctors → Abridge, $3B
- Sales → Gong, $7B
- Wealth management — $128 trillion global asset base, $300B annual fees, 330,000 US advisors — got... AI meeting note takers.

We're building the actual production layer.

## Problem (specific, not generic)

Behind every advisor sits a paraplanner. They spend **15-20 hours per week typing numbers from PDFs** — tax returns, brokerage statements, insurance policies — into financial planning software (eMoney / MoneyGuidePro).

For each new client: **8 hours of manual data entry before any actual planning begins.**

At Creative Planning ($700B AUM, ~3,000 advisors), this burns ~60,000 paraplanner hours per week on data entry alone.

## Why Now

Multimodal LLMs (Claude, GPT-5) finally read financial PDFs accurately. Two years ago this didn't work — hallucinated numbers, missed line items. Now it works.

## Why Not Done Yet

1. **SEC/FINRA liability** scares founders away from money-touching workflows
2. **Domain-specific schemas** — eMoney has ~400 fields, MoneyGuidePro has ~600. Generic doc AI doesn't know which number goes where
3. **Buyer fragmentation** — 17,000 RIAs in US. Hard to distribute
4. **Sticky incumbents** — eMoney/Orion/Salesforce FSC = 6-month migration. Customers don't rip-and-replace
5. **Closed data** — assets sit at Schwab/Fidelity, APIs gated to broker-dealers

Existing AI players (Jump $24.6M, Zocks $13.8M Series A) attack the easy edge: meeting transcription. They save advisor 5-10hr/wk on notes. **They don't touch the actual production work.**

## Our Wedge

Drop a tax return + brokerage statement + insurance policy → 90 seconds later, fact-finder form is filled, gaps are flagged, draft plan is generated.

What used to take 8 hours takes 8 minutes.

## [LIVE DEMO — this is what wins]

## Market

- $300B annual fee pool (US)
- 330k advisors
- ~110k paraplanners (1 per 3 advisors)
- Bottom-up SaaS at $200/seat/mo on paraplanners = **$264M ARR ceiling**
- Expand to advisor seat + enterprise pricing = **$800M+ ARR ceiling**
- Beachhead = mid-market RIAs (50-500 advisors). Easier sale than mega-firms (Creative Planning) or solo shops

## Why Us

[Team edge — fill in: technical chops, domain access via Darsh's mom at Creative Planning, design quality, etc.]

## Competitive Map

| Player | Attacks | We're different because |
|--------|---------|------------------------|
| Jump ($105M raised, "AI OS for Advisors") | Meeting notes + cross-system Ask Anything | They have the brain, no eyes — we extract clean structured data from PDFs they can't parse |
| Zocks ($59M, MCP shipped Apr 2026) | Meeting notes + client intelligence layer (MCP) | Same — memory layer needs structured input we provide |
| Savvy Wealth ($106M, Savvy Intelligence Apr 2026) | AI-native RIA + unified memory | Only for advisors who join Savvy — every other RIA needs our layer |
| Salesforce FSC + Agentforce + Data 360 | Enterprise CRM + AI agents + unified data | Enterprise-only, doesn't solve PDF intake — depends on us upstream |
| RightCapital SmartImport (free, Mar 2026) | Native AI doc → fact-finder for RightCapital users | Only for RightCapital. eMoney shops (~28% market) still in pain |
| eMoney / MoneyGuidePro | Planning software (incumbent) | We feed them. Partnership, not replacement |

## Ask / Roadmap

[for VC pitch: $X seed for Y months runway, hire Z]
[for hackathon: what we'd build week 2, week 4, month 3]

## Risks + Honest Answers

- **Hallucinated numbers** → human-in-loop review before plan finalized; confidence scoring per field
- **eMoney won't integrate** → we use Plaid + browser automation as fallback; eMoney has API for partners
- **Compliance** → we don't make recommendations, we extract data. SEC liability stays with advisor

## TODO before pitching

- [ ] Working demo with real PDFs
- [ ] Memorize first 30 seconds cold
- [ ] Find one number that punches: "8 hours → 8 minutes" or similar
- [ ] Practice 3x out loud
