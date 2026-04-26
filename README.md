# Footnote — Task-Aware Context Assembly for Wealth Advisors

Hackathon project (Cache Hackathon, UIUC, April 24-26, 2026). Software track. Demo + VC pitch.

## What this is

An AI tool for wealth-management advisors. Existing tools (Jump, Zocks, Salesforce Agentforce, Savvy) all have access to client meetings, CRM, email, and document vaults — **they don't put the right slices in the prompt at task time.** When an advisor clicks "draft Q2 follow-up email," the LLM sees the meeting transcript + CRM contact card. The 26 documents in the client vault that actually matter for THIS specific email are nowhere in the prompt.

We are the **task-aware context assembly layer.** Same data sources. Different processing layer.

> "Their AI gets the meeting transcript. Ours gets the meeting transcript plus the four documents that actually matter for what the advisor is trying to write — assembled automatically per task."

## Repo map

### Entry points
- [`README.md`](./README.md) — this file
- [`pitch.md`](./pitch.md) — pitch deck skeleton (8 slides) + market numbers + comp valuations
- [`demo-scenarios.md`](./demo-scenarios.md) — Smith Family persona + 5 scenarios × 5 tool outputs each (the proof artifact)

### Build (Next.js 16 App Router)
- `app/` — pages + components
- `components/` — shadcn/ui components
- `lib/` — utilities (citations, formatting, types)
- `data/` — hardcoded JSON for Smith Family extraction
- `public/` — static assets

### Research (5 deep-dives)
- [`research/competitors.md`](./research/competitors.md) — Jump $105M, Zocks $59M, Savvy $106M, Salesforce Agentforce, etc. funding + product depth
- [`research/fact-finder-gap.md`](./research/fact-finder-gap.md) — RightCapital SmartImport, Zocks Document Intelligence, Jump → eMoney sync analysis
- [`research/workflow-deep-dive.md`](./research/workflow-deep-dive.md) — paraplanner workflow by firm size + client segment
- [`research/market-size.md`](./research/market-size.md) — TAM ($935M–$3.6B), labor savings ($1.8B–$3.6B), comps (Harvey $11B, Abridge $5B, Gong $7B)
- [`research/memory-thesis.md`](./research/memory-thesis.md) — why "persistent memory layer" pivot was rejected (red ocean)

### Assets
- `sample-pdfs/` — 51 publicly-available sample HNW client documents (1040, brokerage, 401k, RSU grants, K-1, life policies, will, trust, mortgage, HELOC, 529, LTC, disability, etc.)
- `screenshots/` — UI build progress screenshots
- `docs/Cache-Hackathon.pdf` — original event spec

## Demo philosophy (locked)

1. **Hardcode everything.** Zero LLM calls during demo. Zero failure risk.
2. **Show the prompt being assembled.** Visceral move — for each tool's output, visibly show what context was fed to the LLM. Jump = transcript + CRM. OURS = task-typed retrieval over the full vault.
3. **No chatbot.** Forbidden.
4. **Citations everywhere.** Every fact in OURS output traces back to source PDF + page.
5. **Reactive moment.** Drop new doc mid-demo → retrieval re-runs → outputs rewrite in place.

## Stack

- Next.js 16 App Router
- TypeScript
- shadcn/ui + Tailwind
- Memv.ai for memory storage layer (sponsor)
- Vercel for deploy

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Hackathon constraints

- Submission deadline: Sunday April 26, 9:00 AM
- Judging: Sunday April 26, 9:00–11:00 AM
- Awards: Sunday April 26, 11:00 AM–12:00 PM
- Judged on Tech Execution + Business Viability + Innovation + Product Design/UX + Pitch (5 each, 25 max)
