# Persistent Memory for Advisor AI — Thesis Test

> Research brief, April 2026. Honest read on whether "persistent client memory layer for advisors" is a stronger wedge than "doc intake / fact-finder automation." Short answer: **the thesis is real but the window is closing fast, and the wedge is almost certainly not defensible at the memory-infrastructure layer.**

---

## 1. What is Memv.ai?

Mem[v].ai (https://docs.memv.ai/, https://memv.ai/) is a **multimodal memory-as-a-service platform** for AI agents. Positioning: "context and memory layer for multimodal AI agents" with a foundational bet that "if you solve memory for video, you've solved it for everything else."

**Architecture (per docs.memv.ai/llms.txt):**
- Three-stage pipeline: ingest → knowledge graph build → graph-aware semantic retrieval
- Storage primitives: **Spaces** (tenant-isolated containers), **Memories** (content + metadata + extracted entities), **Knowledge Graphs** (subject-predicate-object triplets)
- Auto-extracts entities (people, orgs, technologies, locations, topics) and relationships (professional / technical / conceptual / temporal)
- Native handling of PDFs, Word, spreadsheets, images, video (MP4/WebM/MOV), audio (MP3/WAV)
- SDKs: Python 3.9+, TS/JS for Node/Deno/Bun/Cloudflare Workers/Vercel Edge
- MCP server: Claude, ChatGPT, Cursor, Copilot can read/write the graph via OAuth
- Connectors listed: Gmail, Google Drive, Notion, OneDrive, Box, S3 — **most marked "Updates coming soon"**

**Maturity:** Beta. Site labels it "Try Beta" (https://memv.ai/), no customer logos, no pricing page, no benchmarks, no SLAs. March 2026 publish date on the marketing site. This is pre-GA infrastructure.

**Key gap vs Mem0/Zep:** Memv leans hard on multimodal (especially video) and presents itself as a graph-first system. Mem0 already has SOC 2 Type II and HIPAA, a managed service, ~21 framework integrations, and an arXiv paper (https://arxiv.org/abs/2504.19413). Zep beats Mem0 on LongMemEval (63.8% vs 49.0% per https://hermesos.cloud/blog/ai-agent-memory-systems). Memv has no published benchmarks.

**Bottom line on Memv:** interesting, but it is not yet a credible production dependency for an advisor product. If the thesis hinges on memory infrastructure, you would build on Mem0 (production) or Zep (highest temporal accuracy) and revisit Memv in 12 months.

---

## 2. The persistent-memory-layer landscape (April 2026)

This is now a **crowded, productized category**, not research:

| Player | Pattern | Status |
|---|---|---|
| **Mem0** | Vector + graph + KV hybrid, three-tier (user/session/agent) scopes, managed cloud | Production, SOC 2, HIPAA, 21+ framework integrations (https://mem0.ai/, https://github.com/mem0ai/mem0) |
| **Zep** | Temporal knowledge graph, tracks how facts change over time | Production; best LongMemEval score (https://hermesos.cloud/blog/ai-agent-memory-systems) |
| **Letta (ex-MemGPT)** | OS-style memory: core (RAM) / archival (vector disk) / recall (chat hist), agent self-curates | Production OSS, Pro tier adds knowledge graph (https://www.letta.com/blog/benchmarking-ai-agent-memory) |
| **Supermemory** | Hybrid memory + RAG, sub-300ms recall, prebuilt connectors, $19/mo Pro | Production (https://supermemory.ai/pricing/) |
| **Cognee / Cipher / LangMem** | OSS-leaning, KG + vector hybrids | Mostly production-ish, smaller adoption |
| **Memv.ai** | Multimodal-first (video), graph-aware retrieval | Beta |
| **OpenAI ChatGPT memory** | Auto-distilled per-user profile | GA, consumer-locked |
| **Anthropic Claude Memory** | Auto-distilled, ~24h synthesis cycle, free tier added March 2026, Memory Import from other LLMs March 3, 2026, 1M context GA on Opus 4.6 / Sonnet 4.6 (https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool, https://www.reworked.co/digital-workplace/claude-ai-gains-persistent-memory-in-latest-anthropic-update/) |
| **Anthropic memory tool primitive** | Just-in-time context retrieval, agent-controlled paging | Available to API customers (https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) |

**Pattern convergence:** the dominant architecture in April 2026 is **vector + knowledge graph hybrid with temporal awareness**. The interesting differentiation is no longer "do you have memory" but (a) temporal/episodic accuracy, (b) self-curating agents, (c) compliance posture, (d) multimodal coverage. Mem0's claim — 90% token reduction, 91% latency reduction vs full-history (https://mem0.ai/blog/state-of-ai-agent-memory-2026) — is now table stakes.

**Implication for our pitch:** memory infrastructure has **commoditized in the 12 months since Mem0's paper.** If we frame ourselves as "the persistent memory layer for advisors," we are one `pip install mem0` away from being trivially copied. The *infrastructure* is not the moat. The *advisor-specific schema, data graph, and integrations* would be the moat.

---

## 3. Do existing advisor AI tools already have persistent client memory?

This is where the thesis takes serious damage. **The "Jump just does notes, no one has memory" framing is already wrong as of Q1 2026.**

### Jump AI — Series B closed Feb 2026, $80M led by Insight Partners
(https://jump.ai/press/series-b-announcement, https://www.insightpartners.com/ideas/jump-raises-80-million-series-b-led-by-insight-partners-to-expand-ai-operating-system-for-financial-advisors/)

- Rebranded from "AI assistant" to **"AI Operating System for Financial Advisors."**
- Shipped **"AI Associate"** — explicitly agentic, "moves from insight to execution across meetings, CRM, email, and planning tools in real time."
- Shipped **"Ask Anything"** (https://jump.ai/operating-system/ask-anything, https://help.jumpapp.com/en/articles/12738978-using-ask-anything-in-jump-meetings):
  - Queries CRM contacts, financial plans, portfolio positions, custody records, meeting transcripts in one conversation
  - Cross-meeting recall: "Ask what a client said about their retirement timeline three meetings ago"
  - Cross-book queries: "which clients over 60 don't have a beneficiary on file," "every client approaching retirement in next 24 months," "households without an estate plan"
  - 30+ integrations
- Whether this is "true persistent memory" or "cleverly orchestrated RAG over connected systems" is mostly a semantic distinction — **the user-facing capability is what we'd want to demo.** From the advisor's perspective, Jump already answers "what did the Smith family say about their kid's college last year."
- Honest read: Jump is **roughly 60-80% of the way to the persistent-memory pitch we'd be making.** They're missing depth on portfolio/RSU/tax modeling but the surface area is ~there.

### Zocks — shipped MCP April 2, 2026
(https://www.zocks.io/press/new-zocks-mcp-connects-client-intelligence-and-context-to-general-purpose-ai-tools-for-financial-advisors)

This is the most aggressive move in the space. Zocks' positioning:
- "Captures client information shared in conversations, meetings, email, and documents and turns it into structured, searchable, connected data."
- "Builds a comprehensive, multi-source client profile over time including how the client's financial goals have evolved, what concerns have surfaced, and where planning signals have emerged."
- Released **Zocks MCP** — exposes the entire client intelligence graph to Claude / ChatGPT / any MCP client. Available now in Claude Connectors Directory.

**Translation:** Zocks is now selling itself *as* the advisor memory layer. The advisor can ask Claude "what should I send the Smith family this quarter" and Claude pulls structured Zocks context via MCP. This is essentially the pitch we were considering, shipped in production three weeks ago.

### Salesforce Agentforce for Financial Services
(https://vantagepoint.io/blog/sf/agentforce-for-financial-services-2026-guide, https://www.salesforce.com/news/stories/agentforce-for-financial-services-announcement/)

- Financial Services Cloud rebranded to **Agentforce Financial Services**, with purpose-built **Financial Advisor Agent** and **Banker Agent**.
- Integrates with **Data 360** (Salesforce Data Cloud, rebranded Oct 2025) — unified real-time client data platform with "AI-ready profiles" natively embedded.
- Capabilities: meeting prep briefs auto-assembled from portfolio + goals + life events, next-best-action surfaced live during meetings, post-meeting drafting/CRM updates.
- This is the enterprise default. If a firm is on Salesforce FSC, they will use Agentforce. The "persistent client memory" pitch is already on Salesforce's product roadmap and partly shipped.

### Savvy Wealth — Savvy Intelligence (launched April 22, 2026)
(https://www.savvywealth.com/savvy-intelligence, https://www.businesswire.com/news/home/20260422491297/en/Savvy-Wealth-Debuts-Savvy-Intelligence-to-Fuel-Evolution-of-AI-Native-Human-Led-Advice)

The most threatening competitor for the "true unified memory" framing:
- "Single, continuously updated view of each client's investments, tax data, and financial plans"
- AI agents act on the complete picture in real time
- ~$6B AUM; built the underlying platform (RIA + investments + tax + planning + CRM + meeting notes) on **unified data** from day one
- First agent: Financial Planning Agent — household-level scenario modeling
- Roadmap: Tax Agent, Relationship Monitor, Investment Management Agent
- **Distribution:** only available to Savvy advisors. Not sold to other RIAs.

This is almost exactly the "advisor knows everything" demo we'd want to build, **except they own the whole stack and won't sell the layer.**

### Range — went the other direction
(https://www.investmentnews.com/ria-news/ria-startup-range-plans-to-eliminate-its-advisor-workforce-as-ai-takes-over/265586)

Range announced plans to **eliminate human advisors** in 1-3 years; AI advisor "Rai" trained on portfolio + investment philosophy. Direct-to-consumer, not advisor tooling.

### Wealthbox AI Agents (March 2026 early access)
(https://www.investmentnews.com/advisor-tech/wealthbox-announces-new-ai-agents/266303, https://www.kitces.com/blog/the-latest-in-financial-advisortech-april-2026-wealthbox-ai-agents-tools-jump-rightcapital-wealthstream/)

- Three new features: Agents (autonomous background processes), Playbooks (multi-step saved workflows), AI Assistant (conversational over CRM + pipeline + draft comms).
- "Built directly into the Wealthbox system of record, every action logged, auditable."
- Wealthbox is the dominant indie-RIA CRM. They are now the memory layer for everyone on Wealthbox.

### eMoney CoPlanner / Orion Denali
(https://www.wealthmanagement.com/artificial-intelligence/wealthstack-roundup-orion-denali-ai-rollout-to-begin-in-2026)

- eMoney shipped CoPlanner — AI-assisted plan building, claims 48% time reduction.
- Orion Denali rolling out broadly in 2026 — AI woven across Orion's full ecosystem.

**Verdict on (3):** The "transactional notes-only" framing in our current pitch is a **2024 framing.** As of April 2026, every major advisor platform — Jump, Zocks, Salesforce, Savvy, Wealthbox, Orion — has either shipped or imminently-shipping persistent client context for AI. Zocks shipping MCP three weeks ago is the loudest signal.

---

## 4. Do advisors actually paste into ChatGPT/Claude today?

Yes, and the data is real:

- **Schwab Jan 2026 study of 533 RIAs**: 63% are using AI in some form. Only ~10% have integrated it strategically; the rest are running individual experiments — notetaking, email drafting, occasional research (https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/, https://wealthtechtoday.com/2026/04/16/ai-financial-advisor-client-workflow/).
- **Betterment 2025 survey**: 65% of advisors are worried about *clients* using GenAI for advice. McKinsey: >1/3 of consumers across age groups consult Claude/ChatGPT before talking to their advisor.
- Specific advisor use cases for ChatGPT/Claude: market commentary emails, quarterly review letters, contract review, estate doc explanation, complex tax strategy explanation, drafting client comms (https://theaicareerlab.com/compare/chatgpt-vs-claude-for-financial-professionals, https://aitoolsforadvisors.com/blog/claude-vs-chatgpt-for-advisors).
- "Every client expects a personalized plan summary, quarterly review letter, meeting follow-up. At 30-60 min/doc, an 80-client book = hundreds of hours/year in documentation."

**The pain is real.** Advisors are pasting client context manually into LLMs constantly. Compliance teams hate it (PII leaving controlled environments). Zocks built MCP specifically to plug this gap.

---

## 5. Pitch test — does the wedge improve?

### Bigger TAM?
**Mixed / probably no.** Doc-intake automation has a clean bottom-up SaaS calculation: paraplanners × seat price = $264M-$800M ceiling per the current pitch. "Persistent client memory" is a *platform* play — bigger ceiling in theory, but it's a layer-cake fight against Salesforce, Jump, Zocks, Wealthbox, Orion who already own the customer relationship and the data. You can't sell a memory layer to advisors who get one bundled with their CRM. **Larger TAM in slideware, smaller capturable share in reality.**

### More defensible?
**No, and this is the killer.** Three failure modes:
1. **The infra commoditizes** — Mem0/Zep/Memv are pip-installable. Whatever memory primitive we build can be rebuilt by anyone in a weekend.
2. **The data is owned by incumbents** — Jump owns meeting transcripts. Salesforce owns CRM. Schwab/Fidelity own custody. Plaid owns aggregation. Our memory layer would be a thin wrapper over data we don't own.
3. **MCP standardizes the interface** — Zocks already shipped MCP. Once the firms with data expose it via MCP, "persistent memory layer" becomes "expose your data via MCP." The middleware disappears.

The fact-finder/doc-intake wedge is **more defensible** because eMoney/MGP have ~400-600 field schemas that take real domain work to map correctly, and the regulatory liability for getting numbers wrong scares competitors away.

### More demoable in 3hr hackathon?
**Significantly harder.** Memory demos require population. You'd need 6-12 months of synthetic Smith-family meetings, emails, statements, life events, and a believable retrieval moment. Doc-intake demos work cold: drop PDF → see fields populate. The current pitch's "8 hours → 8 minutes" lands in 90 seconds. The memory pitch needs a story arc.

### Already being attacked?
**Yes — heavily, by well-funded incumbents:**
- Jump $80M Feb 2026
- Zocks shipped MCP April 2, 2026
- Salesforce Agentforce FS shipping
- Savvy Intelligence shipped April 22, 2026
- Wealthbox Agents in early access
- Orion Denali rolling out
- eMoney CoPlanner shipped

This is a **red ocean** as of three weeks ago. The pivot would land us in the most contested wedge in advisor-tech right now, with the worst defensibility.

---

## Recommendation

**Don't pivot to "persistent client memory layer."** The thesis is directionally correct — yes, advisors need persistent client context, yes, transactional notes are insufficient, yes, advisors are pasting into ChatGPT today. But:

1. Zocks, Jump, Salesforce, Savvy, Wealthbox have all shipped material persistent-memory features in Feb-April 2026. The window to claim this wedge **closed in Q1**.
2. The underlying memory infra has commoditized to Mem0 / Zep / Memv. We have no infrastructure moat.
3. We'd be entering a fight against $80M-funded Jump and the entire Salesforce stack with a hackathon prototype.

**The interesting move:** keep the doc-intake wedge as the *concrete entry point*, and frame the longer-term company narrative as "we are the structured-data layer that *feeds* the memory systems." Every memory layer (Jump, Zocks, Savvy, Salesforce) has the same upstream gap: **clean structured data extraction from PDFs and forms.** They all have meeting transcripts and CRM notes; none of them have the tax-return / brokerage-statement / insurance-policy structured extraction that fills eMoney/MGP's 400-600 fields. We can be the **picks-and-shovels supplier to the memory layer war**, and that's a more defensible position than fighting the war itself.

If anything, the right inline mention in the pitch is: "Jump and Zocks built the memory layer over what advisors *say*. We build the structured data layer over what advisors *receive*. Both layers are needed; only one is contested." That sharpens the existing thesis instead of replacing it.

---

## Sources

- https://docs.memv.ai/
- https://memv.ai/
- https://mem0.ai/
- https://mem0.ai/blog/state-of-ai-agent-memory-2026
- https://github.com/mem0ai/mem0
- https://arxiv.org/abs/2504.19413
- https://hermesos.cloud/blog/ai-agent-memory-systems
- https://www.letta.com/blog/benchmarking-ai-agent-memory
- https://supermemory.ai/pricing/
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://www.reworked.co/digital-workplace/claude-ai-gains-persistent-memory-in-latest-anthropic-update/
- https://jump.ai/operating-system/ask-anything
- https://help.jumpapp.com/en/articles/12738978-using-ask-anything-in-jump-meetings
- https://jump.ai/press/series-b-announcement
- https://www.insightpartners.com/ideas/jump-raises-80-million-series-b-led-by-insight-partners-to-expand-ai-operating-system-for-financial-advisors/
- https://www.zocks.io/press/new-zocks-mcp-connects-client-intelligence-and-context-to-general-purpose-ai-tools-for-financial-advisors
- https://www.businesswire.com/news/home/20260402798295/en/New-Zocks-MCP-Connects-Client-Intelligence-and-Context-to-General-Purpose-AI-Tools-for-Financial-Advisors
- https://www.savvywealth.com/savvy-intelligence
- https://www.businesswire.com/news/home/20260422491297/en/Savvy-Wealth-Debuts-Savvy-Intelligence-to-Fuel-Evolution-of-AI-Native-Human-Led-Advice
- https://vantagepoint.io/blog/sf/agentforce-for-financial-services-2026-guide
- https://www.salesforce.com/news/stories/agentforce-for-financial-services-announcement/
- https://www.investmentnews.com/advisor-tech/wealthbox-announces-new-ai-agents/266303
- https://www.kitces.com/blog/the-latest-in-financial-advisortech-april-2026-wealthbox-ai-agents-tools-jump-rightcapital-wealthstream/
- https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/
- https://wealthtechtoday.com/2026/04/16/ai-financial-advisor-client-workflow/
- https://www.investmentnews.com/ria-news/ria-startup-range-plans-to-eliminate-its-advisor-workforce-as-ai-takes-over/265586
- https://www.wealthmanagement.com/artificial-intelligence/wealthstack-roundup-orion-denali-ai-rollout-to-begin-in-2026
- https://theaicareerlab.com/compare/chatgpt-vs-claude-for-financial-professionals
