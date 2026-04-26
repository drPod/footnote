// Hardcoded comparison scenarios. Source of truth: ../../demo-scenarios.md
// Each scenario has 5 tool outputs (Jump, Zocks, Salesforce, Manual+ChatGPT, OURS)
// with context cards (what was fed to the LLM) + the actual generated output.

export type ContextCard = {
  source: string;
  detail?: string;
  notInContext?: boolean; // grey out — present in vault, not pulled
};

export type ToolOutput = {
  contextCards: ContextCard[];
  output: string; // the generated artifact (email body, memo, alert)
  outputFormat: "email" | "memo" | "alert" | "task" | "silent";
  citations?: { id: number; source: string; page: string }[];
  stats: { words: number; citations: number };
};

export type Tool = "jump" | "zocks" | "salesforce" | "manual" | "ours";

export const TOOLS: { id: Tool; label: string; tagline: string }[] = [
  { id: "jump", label: "Jump", tagline: "AI Operating System for Advisors · $105M raised" },
  { id: "zocks", label: "Zocks", tagline: "Client Intelligence Layer · $59M raised" },
  { id: "salesforce", label: "Agentforce FS", tagline: "Salesforce Financial Services Cloud" },
  { id: "manual", label: "Manual + ChatGPT", tagline: "Advisor pastes context manually" },
  { id: "ours", label: "Footnote", tagline: "Task-aware context assembly" },
];

export type Scenario = {
  id: string;
  title: string;
  context: string;
  trigger: string;
  outputs: Record<Tool, ToolOutput>;
};

export const SCENARIOS: Scenario[] = [
  {
    id: "q2-followup",
    title: "Q2 Follow-Up Email",
    context: "April 23, 2026 · day after Q1 review meeting",
    trigger: "Sarah Chen needs to send a follow-up email between client meetings.",
    outputs: {
      jump: {
        contextCards: [
          { source: "meeting_transcript_2026-04-22.txt", detail: "full 58-min transcript" },
          { source: "CRM contact card", detail: "5 recent notes" },
          { source: "vanguard_401k_mary_2026q1.pdf", detail: "in vault, NOT in prompt", notInContext: true },
          { source: "klein_family_trust_certification_2026.pdf", detail: "in vault, NOT in prompt", notInContext: true },
          { source: "mgcp_rsu_grant_agreement_2025_04.pdf", detail: "in vault, NOT in prompt", notInContext: true },
        ],
        output: `Hi Robert and Mary,

Great catching up yesterday. A few quick recap items from our call:

— You mentioned wanting to retire at 60 instead of 62. We'll model the difference and bring it to Q2.
— Mary, you raised the question on Liam's gap-year 529 use. I'll get back to you on that.
— Talk soon.

Best,
Sarah`,
        outputFormat: "email",
        stats: { words: 64, citations: 0 },
      },
      zocks: {
        contextCards: [
          { source: "meeting_transcript_2026-04-22.txt", detail: "full transcript" },
          { source: "Zocks intake form", detail: "15 typed fields" },
          { source: "Q1 2026 structured note", detail: "previous review" },
          { source: "All client documents in vault", detail: "NOT pulled into prompt", notInContext: true },
        ],
        output: `Hi Robert and Mary,

Thanks for yesterday's review. Per our notes:

ACTION ITEMS (Sarah):
1. Run retire-at-60 vs 62 stress test
2. Confirm 529 gap-year qualified-expense rules with Sarah
3. Check Klein Trust admin status (next call)

ACTION ITEMS (Robert/Mary):
1. Send updated Charles Smith situation if anything changes
2. Confirm Emma's CMU enrollment deposit deadline

Best,
Sarah`,
        outputFormat: "email",
        stats: { words: 70, citations: 0 },
      },
      salesforce: {
        contextCards: [
          { source: "Household record HH-44219", detail: "35 typed fields" },
          { source: "Last 3 transcripts via Agentforce Voice" },
          { source: "Reg BI compliance template" },
          { source: "Periodic review rule (24-mo)" },
          { source: "All docs (PDF blobs in record)", detail: "NOT parsed into prompt", notInContext: true },
        ],
        output: `Dear Mr. and Mrs. Smith,

This message follows our review of April 22, 2026. Per Reg BI, we are documenting the discussion summary and recommended next steps.

Discussion summary: retirement timeline (target age update under review), education funding inquiry (529 use cases), family circumstances update.

Recommended next steps: schedule Q2 review for June; advisor to provide written follow-up on retirement target stress test.

Case ID: BWP-Q2-44219-2026-04-23

Sincerely,
Sarah Chen, CFP
Beechwood Wealth Partners`,
        outputFormat: "email",
        stats: { words: 91, citations: 0 },
      },
      manual: {
        contextCards: [
          { source: "Sarah's manual notes", detail: "what she remembered" },
          { source: "1-paragraph CRM note (pasted)" },
          { source: "Beneficiary issue", detail: "[Sarah forgot to include]", notInContext: true },
          { source: "RSU vest tax detail", detail: "[Sarah forgot to include]", notInContext: true },
          { source: "Klein Trust K-1 timing", detail: "[Sarah forgot to include]", notInContext: true },
        ],
        output: `Hi Robert and Mary,

Thank you both for taking the time yesterday. As discussed, here are the key items we'll be addressing:

The retirement-age conversation is something we want to model carefully. I'll take a fresh look at the projection with the age-60 target and share what falls out before our June meeting. On Liam's gap year question, IRS Pub 970 generally requires the program to be at an eligible institution for the distribution to be qualified — so we'll confirm Outward Bound's status before moving any money.

I appreciate you sharing what's going on with your dad, Robert. Let me know if I can be helpful in any way.

Talk soon,
Sarah`,
        outputFormat: "email",
        stats: { words: 130, citations: 0 },
      },
      ours: {
        contextCards: [
          { source: "meeting_transcript_2026-04-22.txt", detail: "full transcript" },
          { source: "mgcp_rsu_grant_agreement_2025_04.pdf", detail: "p.2-3 vest schedule, May 15" },
          { source: "klein_family_trust_certification_2026.pdf", detail: "p.1 Mary status" },
          { source: "klein_estate_inventory_2026_03.pdf", detail: "p.1-2 inheritance assets" },
          { source: "nysaves_emma_529_2026q1.pdf", detail: "p.1 balance + projection" },
          { source: "cmu_cost_of_attendance_2026_27.pdf", detail: "p.1 $87.2k" },
          { source: "fidelity_401k_robert_2026q1.pdf", detail: "p.1 balance for retire-60 model" },
          { source: "vanguard_401k_mary_2026q1.pdf", detail: "p.1 — flagged for next call" },
          { source: "massmutual_whole_life_robert_anniversary_2025.pdf", detail: "cash value vs illustration" },
          { source: "Open action items (CRM)", detail: "5 items" },
          { source: "Recent doc-event log", detail: "Apr 18 upload" },
        ],
        output: `Hi Robert and Mary,

Thank you both for yesterday's call. Three things I want to put in writing while they're fresh, and one thing I want to flag for our next meeting.

**Retire-at-60 stress test.** I re-ran your retirement projection with the age-60 target, including the May 15 RSU vest [1] (~$187,500 at Friday's MGCP close) and the Klein Trust income stream we now have visibility on (~$42k/yr ongoing per the trust certification [2]). The projection holds — but it depends on holding charitable giving roughly flat through retirement and continuing to max your HSA [3]. I'll bring the full output to our June 18 review.

**529 / gap-year question.** Liam's planned Outward Bound semester is *not* a qualified higher-education expense under IRC §529(e)(3) [4]; the engineering-school year that follows is [5]. We can use 529 funds for Liam's eventual enrollment without penalty, but not for the gap year itself. Emma's CMU enrollment is fully covered by her current NY 529 balance [6] given her four-year cost of attendance [7].

**On your father, Robert.** I want to be respectful of the timing — but the Parkinson's diagnosis [8] has implications I'd like to talk through whenever you're ready: long-term-care insurance for you (your age + the family history is the optimal window), confirming whether your dad has updated estate documents and a current POA, and whether the retire-at-60 plan needs to absorb any caregiving expense. Not urgent — just on the agenda for June.

**For our next call:** I noticed something in Mary's Q1 Vanguard statement [9] that we should knock out together — quick housekeeping, three minutes. I'll bring it up first thing.

Talk soon,
Sarah`,
        outputFormat: "email",
        citations: [
          { id: 1, source: "mgcp_rsu_grant_agreement_2025_04.pdf", page: "p.2-3" },
          { id: 2, source: "klein_family_trust_certification_2026.pdf", page: "p.1" },
          { id: 3, source: "fidelity_hsa_robert_2026q1.pdf", page: "p.1" },
          { id: 4, source: "IRC §529(e)(3)", page: "—" },
          { id: 5, source: "cmu_admission_letter_emma_2026_03.pdf", page: "p.1" },
          { id: 6, source: "nysaves_emma_529_2026q1.pdf", page: "p.1" },
          { id: 7, source: "cmu_cost_of_attendance_2026_27.pdf", page: "p.1" },
          { id: 8, source: "meeting_transcript_2026-04-22.txt", page: "47:18" },
          { id: 9, source: "vanguard_401k_mary_2026q1.pdf", page: "p.1" },
        ],
        stats: { words: 380, citations: 9 },
      },
    },
  },

  {
    id: "beneficiary-alert",
    title: "Vanguard Beneficiary Mismatch Alert",
    context: "April 19, 2026 · 6:00 AM · triggered by Q1 statement upload at 7:42 PM April 18",
    trigger: "Document arrives. No human triggered this. The pipeline runs automatically.",
    outputs: {
      jump: {
        contextCards: [
          { source: "Trigger surface: meeting transcripts + CRM only" },
          { source: "vanguard_401k_mary_2026q1.pdf", detail: "in vault, NEVER in prompt", notInContext: true },
          { source: "Klein death certification", detail: "in vault, NEVER in prompt", notInContext: true },
          { source: "(no transcript moment mentions beneficiary)" },
        ],
        output: "(no output — Jump has no surface that fires on document upload)",
        outputFormat: "silent",
        stats: { words: 0, citations: 0 },
      },
      zocks: {
        contextCards: [
          { source: "Zocks intake form fields", detail: "beneficiary slot is BLANK — nobody typed it" },
          { source: "vanguard_401k_mary_2026q1.pdf", detail: "in vault, NOT pulled to prompt", notInContext: true },
        ],
        output: "(no output — Zocks's beneficiary field is populated only from typed entry)",
        outputFormat: "silent",
        stats: { words: 0, citations: 0 },
      },
      salesforce: {
        contextCards: [
          { source: "CRM rule: Periodic Beneficiary Review (24-mo cadence)" },
          { source: "Last review timestamp: 2024-07-12" },
          { source: "(no document parsing)" },
          { source: "vanguard_401k_mary_2026q1.pdf", detail: "PDF blob attached, not parsed", notInContext: true },
        ],
        output: `TASK CREATED — HH-44219
Type: Periodic Beneficiary Review
Trigger: 24 months since last review (rule)
Assignee: Sarah Chen
Due: 2026-07-15
Description: Confirm beneficiary designations on all qualified accounts.`,
        outputFormat: "task",
        stats: { words: 30, citations: 0 },
      },
      manual: {
        contextCards: [
          { source: "(no workflow — Sarah does not re-read uploads)" },
          { source: "vanguard_401k_mary_2026q1.pdf", detail: "uploaded, never opened", notInContext: true },
        ],
        output: "(no output — error remains undiscovered until something forces a manual re-read)",
        outputFormat: "silent",
        stats: { words: 0, citations: 0 },
      },
      ours: {
        contextCards: [
          { source: "Trigger event", detail: "doc upload @ 7:42 PM Apr 18" },
          { source: "vanguard_401k_mary_2026q1.pdf", detail: "p.1 Beneficiary Information section" },
          { source: "klein_family_trust_certification_2026.pdf", detail: "p.1 decedent identity + DOD" },
          { source: "klein_estate_inventory_2026_03.pdf", detail: "p.1 cross-ref death" },
          { source: "smith_revocable_living_trust_2018.pdf", detail: "§3, §7 alternate routing option" },
          { source: "Vanguard Beneficiary Form 06-K template" },
          { source: "Plan document default inheritance rules" },
        ],
        output: `⚠ URGENT — Beneficiary mismatch detected: Mary Smith Vanguard 401(k)
Generated: 2026-04-19 06:00 ET (next-business-morning)
Trigger: Document upload — vanguard_401k_mary_2026q1.pdf

Sarah —

WHAT THE STATEMENT SAYS [1]
  Primary beneficiary:    Edward Klein (Mary's father)
                          DOB 1948-03-12 · Allocation 100%
  Contingent:             [BLANK]
  Last update:            2017-08-22
  Account balance:        $748,200 as of 2026-03-31

WHAT WE KNOW FROM OTHER FILES
  Edward Klein died 2026-02-14 [2]. Klein Family Trust certification
  confirms decedent identity and date of death.

CONSEQUENCE IF NOT CORRECTED
  If Mary predeceases, the $748k passes to estate (probate, lost
  stretch options, removed from creditor protection).

WE PREPARED
  1. Pre-filled Vanguard Form 06-K (Robert primary, Emma + Liam 50/50
     contingent in UTMA) — Mary signs only
  2. Draft email to Mary (attached for your review)
  3. Calendar reminder set: re-verify 2026-05-09`,
        outputFormat: "alert",
        citations: [
          { id: 1, source: "vanguard_401k_mary_2026q1.pdf", page: "p.1" },
          { id: 2, source: "klein_family_trust_certification_2026.pdf", page: "p.1" },
        ],
        stats: { words: 165, citations: 2 },
      },
    },
  },

  {
    id: "tax-memo",
    title: "Mid-Year Tax Planning Memo",
    context: "June 15, 2026 · 3 days before Q2 review",
    trigger: "Sarah preparing actionable tax planning items for the Smith household.",
    outputs: {
      jump: {
        contextCards: [
          { source: "meeting_transcript_2026-04-22.txt", detail: "no tax discussion in transcript" },
          { source: "CRM tax-tag = empty" },
          { source: "1040 / RSU / K-1 / cost basis", detail: "in vault, NOT in prompt", notInContext: true },
        ],
        output: `TAX PLANNING NOTE — Smith Household
- Consider partial Roth conversion for 2026
- Confirm AGI projection with CPA before any conversion
- Charitable bunching via DAF if itemizing this year
- Tax-loss harvesting in the Schwab brokerage may be available — refer to CPA`,
        outputFormat: "memo",
        stats: { words: 45, citations: 0 },
      },
      zocks: {
        contextCards: [
          { source: "transcript + CRM", detail: "no specific tax fields typed" },
          { source: "All tax + RSU + K-1 docs", detail: "NOT in prompt", notInContext: true },
        ],
        output: `Tax planning items, mid-year:
- Roth conversion consideration
- Tax-loss harvesting candidates in Schwab account
- Charitable strategy review
- Confirm AGI projection`,
        outputFormat: "memo",
        stats: { words: 28, citations: 0 },
      },
      salesforce: {
        contextCards: [
          { source: "Household record (typed AGI)" },
          { source: "Compliance tax template" },
          { source: "Tax docs as PDF blobs", detail: "not parsed", notInContext: true },
        ],
        output: `TAX PLANNING TEMPLATE — HH-44219
Standard areas to review per Reg BI:
1. Roth conversion analysis
2. Tax-loss harvesting
3. Charitable giving strategy
4. Estimated tax payment confirmation
Assignee: Sarah Chen
Due: 2026-06-18`,
        outputFormat: "task",
        stats: { words: 38, citations: 0 },
      },
      manual: {
        contextCards: [
          { source: "Sarah's notes from 1040 (manually opened)" },
          { source: "ChatGPT prompt with pasted AGI line" },
          { source: "RSU vest schedule", detail: "[forgot to look up]", notInContext: true },
          { source: "K-1 timing", detail: "[forgot]", notInContext: true },
          { source: "Specific cost basis lots", detail: "[forgot]", notInContext: true },
        ],
        output: `Tax planning thoughts for our Q2 conversation:

Given the income trajectory I want to focus on three things — Roth conversion timing, charitable bunching, and harvesting in the brokerage. We should also look at whether deferring the bonus changes the picture. I'll bring numbers to the meeting.`,
        outputFormat: "memo",
        stats: { words: 50, citations: 0 },
      },
      ours: {
        contextCards: [
          { source: "tax_return_form_1040_2024.pdf", detail: "AGI baseline + carryforwards" },
          { source: "tax_return_form_1040_2023.pdf", detail: "multi-year trend" },
          { source: "w2_robert_megacorp_2024.pdf", detail: "wage detail" },
          { source: "k1_mary_hartwell_klein_2024.pdf", detail: "Box 14 SE earnings" },
          { source: "mgcp_rsu_grant_agreement_2025_04.pdf", detail: "p.2-3 May 15 vest = $187,500" },
          { source: "schwab_brokerage_statement_2026q1.pdf", detail: "p.4 cost basis lots — 220 sh MGCP at -$32" },
          { source: "klein_family_trust_certification_2026.pdf", detail: "K-1 timing tax-year 2026" },
          { source: "fidelity_hsa_robert_2026q1.pdf", detail: "contribution headroom" },
          { source: "MegaCorp deferred-comp election form (vault)" },
          { source: "Mary's Roth phase-out calc", detail: "MAGI threshold 2026" },
        ],
        output: `TAX PLANNING MEMO — Smith Household — 2026-06-15

PROJECTED 2026 AGI: ~$680,000 (35% bracket)
  - Robert W-2 base + bonus: ~$500k
  - May 15 RSU vest: $187,500 [1]
  - Mary K-1 from Hartwell & Klein: ~$540k
  - Klein Trust K-1 (partial year 2026): ~$28k [2]

RECOMMENDED ACTIONS — quantified savings: ~$64,300

1. DEFER Robert's 2026 bonus to Jan 2027 (employer permits) — bracket
   smoothing → ~$18k savings [3]
2. BUNCH 2026 charitable gifts via Donor-Advised Fund: $50k contribution,
   itemize this year, standard deduction next two — ~$14k savings
3. SKIP Roth conversion this year (inverted given 35% bracket vs projected
   24% retirement bracket) — saves $0 today, avoids ~$22k unnecessary tax
4. HARVEST $18k carryforward in Schwab brokerage. Specific lots: 220 sh
   MGCP at -$32 cost basis (current $150) [4] — ~$8k savings + future use
5. MAX Mary's Backdoor Roth before MAGI phase-out (currently $234k single,
   she's under) — long-term ~$25k+ tax-free compounding

CRITICAL: Klein Trust K-1 timing — first distribution Q3 2026 [2] means
2026 K-1 will arrive late Feb 2027. File extension on personal 1040.`,
        outputFormat: "memo",
        citations: [
          { id: 1, source: "mgcp_rsu_grant_agreement_2025_04.pdf", page: "p.2-3" },
          { id: 2, source: "klein_family_trust_certification_2026.pdf", page: "p.1" },
          { id: 3, source: "MegaCorp deferred-comp election form", page: "—" },
          { id: 4, source: "schwab_brokerage_statement_2026q1.pdf", page: "p.4" },
        ],
        stats: { words: 245, citations: 4 },
      },
    },
  },

  {
    id: "parkinsons-memo",
    title: "Parkinson's Diagnosis Multi-Vector Memo",
    context: "April 23, 2026 · Robert mentioned dad's diagnosis at minute 47:18 of yesterday's call",
    trigger: "Robert dropped a one-sentence reference to Charles's Parkinson's diagnosis. Most tools bury it.",
    outputs: {
      jump: {
        contextCards: [
          { source: "meeting_transcript_2026-04-22.txt", detail: "full transcript" },
        ],
        output: `Action items from yesterday's meeting:
- Run retire-at-60 stress test
- Confirm 529 gap year rules
- Note: Robert mentioned father health concern (Parkinson's) — flag for follow-up`,
        outputFormat: "memo",
        stats: { words: 30, citations: 0 },
      },
      zocks: {
        contextCards: [
          { source: "transcript + Zocks structured note" },
        ],
        output: `Smith household — meeting recap fields:

LIFE EVENTS (mentioned): Father (Charles) Parkinson's diagnosis — informational, no action item assigned.

ACTION ITEMS: retirement modeling, 529 gap year qualified expense check.`,
        outputFormat: "memo",
        stats: { words: 32, citations: 0 },
      },
      salesforce: {
        contextCards: [
          { source: "Household record" },
          { source: "Compliance template" },
          { source: "(no rule fires on transcript mentions)" },
        ],
        output: "(no output — no rule fires on a passing transcript mention; Salesforce will not surface this as a planning trigger)",
        outputFormat: "silent",
        stats: { words: 0, citations: 0 },
      },
      manual: {
        contextCards: [
          { source: "Sarah's recall of the comment" },
          { source: "Other planning context", detail: "[would need manual paste]", notInContext: true },
        ],
        output: `Note for file: Robert mentioned dad has Parkinson's. Sad. Send a card. Maybe revisit LTC.`,
        outputFormat: "memo",
        stats: { words: 20, citations: 0 },
      },
      ours: {
        contextCards: [
          { source: "meeting_transcript_2026-04-22.txt", detail: "47:18 trigger moment" },
          { source: "Robert's age + insurance docs", detail: "LTC pricing window" },
          { source: "massmutual_whole_life_robert_anniversary_2025.pdf", detail: "death benefit adequacy" },
          { source: "Charles's docs", detail: "(none on file — gap flagged)" },
          { source: "Robert retire-at-60 model", detail: "needs caretaker scenario" },
          { source: "Mary's recent stressors timeline", detail: "Klein Trust admin overlap" },
          { source: "Phoenix elder-care provider directory" },
        ],
        output: `MULTI-VECTOR MEMO — Charles Smith Parkinson's diagnosis (Apr 8, 2026)
Triggered by transcript moment 2026-04-22 47:18 [1]

This single client comment has six planning implications. Treating each as a
dated task:

1. Robert's LTC insurance — Parkinson's has familial component (not
   deterministic). Robert is 54: optimal LTC pricing window. ACTION: pull
   3 quotes this week. Owner: Sarah.

2. Charles Smith estate documents — no docs on file with us. Robert is
   only child + sole heir [2]. POA + healthcare directive critical.
   ACTION: ask Robert for current attorney info; offer Cohen Stein referral.

3. Charles's care logistics — Phoenix, widowed, alone. Robert may be
   pulled into caregiving. Affects earning capacity yrs 5-10.
   ACTION: pre-plan caretaker financial impact in retire-at-60 model.

4. Robert's retire-at-60 plan — re-stress test with reduced income years
   + elder-care expense scenario. ACTION: re-run + bring to Q2.

5. Mary's bandwidth — second parent loss/illness in 2 months. Soft
   check-in warranted. ACTION: 30-min Mary-only call this week.

6. Robert's whole life policy — review death benefit adequacy given
   heightened LTC awareness + family situation [3].`,
        outputFormat: "memo",
        citations: [
          { id: 1, source: "meeting_transcript_2026-04-22.txt", page: "47:18" },
          { id: 2, source: "smith_revocable_living_trust_2018.pdf", page: "§4" },
          { id: 3, source: "massmutual_whole_life_robert_anniversary_2025.pdf", page: "p.1" },
        ],
        stats: { words: 230, citations: 3 },
      },
    },
  },

  {
    id: "qbr-prep",
    title: "Q2 Review Prep Brief",
    context: "June 11, 2026 · 7 days before June 18 quarterly review",
    trigger: "Paraplanner preparing Sarah's prep brief for next week's Smith household review.",
    outputs: {
      jump: {
        contextCards: [
          { source: "transcripts (Q1 + ad-hoc)" },
          { source: "CRM action items" },
          { source: "All financial documents", detail: "in vault, NOT in prompt", notInContext: true },
        ],
        output: `Q2 Prep — Smith Household
Topics from Q1: retirement-at-60, 529 gap year, dad's diagnosis.
Open action items: 3.
Suggest agenda: revisit retirement model, 529 question, dad update.`,
        outputFormat: "memo",
        stats: { words: 30, citations: 0 },
      },
      zocks: {
        contextCards: [
          { source: "structured Q1 note" },
          { source: "open action items" },
        ],
        output: `Q2 Prep Notes:
Carry-over topics: retirement timeline, 529 gap year, Charles Smith diagnosis.
Open: retirement stress test, 529 IRS confirmation, LTC discussion (suggested).`,
        outputFormat: "memo",
        stats: { words: 28, citations: 0 },
      },
      salesforce: {
        contextCards: [
          { source: "Household record" },
          { source: "Periodic review template" },
        ],
        output: `Q2 REVIEW BRIEF (template) — HH-44219
Standard sections: Performance, Allocation, Plan Update, Action Items.
Performance attribution + allocation drift to be auto-pulled at meeting.`,
        outputFormat: "memo",
        stats: { words: 25, citations: 0 },
      },
      manual: {
        contextCards: [
          { source: "Sarah's notes folder" },
          { source: "What she remembers" },
        ],
        output: `Q2 Prep — Smith
Need to review: retirement, 529, Klein, Charles. Probably need to update plan with inheritance numbers. Run Monte Carlo. Check insurance.`,
        outputFormat: "memo",
        stats: { words: 28, citations: 0 },
      },
      ours: {
        contextCards: [
          { source: "All 26 client documents", detail: "scoped slices" },
          { source: "Q1 transcript + ad-hoc transcripts" },
          { source: "Open action items + status" },
          { source: "Market deltas since Q1 review" },
          { source: "Beneficiary alert (Apr 19)", detail: "carry into agenda" },
          { source: "Whole life cash-value tracking" },
        ],
        output: `Q2 PREP BRIEF — Smith Household — for June 18 review

POSITION: Spend the first 20 minutes on the Vanguard beneficiary fix
(Mary's primary still listed as Edward Klein, deceased Feb 14 [1]). It
takes 3 minutes if Mary signs the prefilled form.

PRIORITIZED AGENDA:

1. ★ Beneficiary fix — Vanguard 401(k) [1]. 3-minute item, $748k risk.
2. Retire-at-60 update: re-ran with Klein Trust income (~$42k/yr [2])
   and May 15 RSU vest [3]. Probability of success: 78% (was 71%).
3. Whole life check-in: MassMutual cash value $138k vs 1998 illustration
   $156k — tracking 11.9% under [4]. Recommend in-force ledger pull.
4. Klein Trust admin: David's status, 2026 K-1 expected late Feb 2027 [2].
5. Charles Smith situation: LTC for Robert + estate doc status. Soft.
6. CMU September: 529 distribution mechanics + cash flow [5][6].

OPEN FROM Q1: 3 items, all rolled into above.`,
        outputFormat: "memo",
        citations: [
          { id: 1, source: "vanguard_401k_mary_2026q1.pdf", page: "p.1" },
          { id: 2, source: "klein_family_trust_certification_2026.pdf", page: "p.1" },
          { id: 3, source: "mgcp_rsu_grant_agreement_2025_04.pdf", page: "p.2-3" },
          { id: 4, source: "massmutual_whole_life_robert_anniversary_2025.pdf", page: "p.1" },
          { id: 5, source: "nysaves_emma_529_2026q1.pdf", page: "p.1" },
          { id: 6, source: "cmu_cost_of_attendance_2026_27.pdf", page: "p.1" },
        ],
        stats: { words: 195, citations: 6 },
      },
    },
  },
];
