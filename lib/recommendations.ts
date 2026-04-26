import type { Citation } from "./types";

export type RecSeverity = "urgent" | "important" | "informational";
export type RecCategory =
  | "Estate"
  | "Insurance"
  | "Tax"
  | "Investment"
  | "Retirement"
  | "Education"
  | "Risk";

export type Recommendation = {
  id: string;
  severity: RecSeverity;
  category: RecCategory;
  title: string;
  why: string;
  action: string;
  /**
   * Citations are what triggered this rule. Each rec is gated on its
   * citing docs being extracted, so recs appear progressively as ingest
   * completes.
   */
  citations: Citation[];
};

export const recommendations: Recommendation[] = [
  {
    id: "rec_vanguard_beneficiary",
    severity: "urgent",
    category: "Estate",
    title: "Update Vanguard 401(k) primary beneficiary",
    why: "Vanguard 401(k) statement (Mary, $748,200) lists Edward Klein — Mary's father — as 100% primary beneficiary, contingent blank. Klein Family Trust certification confirms Edward Klein died 02/14/2026. With no living primary or contingent on file, the account passes through Mary's probate estate at her death — slow, taxable, and exposed to creditor claims.",
    action: "Have Mary submit a Vanguard beneficiary-change form before next quarter close. Suggested designation: Robert primary 100%; Emma & Liam contingent at 50% / 50%. Confirm Klein-Trust remainder language doesn't conflict.",
    citations: [
      { documentId: "doc07_vanguard_401k_mary", page: 1, excerpt: "Primary beneficiary: Edward J. Klein, relation: Father, share: 100%" },
      { documentId: "doc18_klein_trust_cert", page: 1, excerpt: "Edward Klein, date of death: February 14, 2026" },
    ],
  },
  {
    id: "rec_estate_plan_stale",
    severity: "urgent",
    category: "Estate",
    title: "Refresh 2018 estate plan — three material changes since execution",
    why: "Smith Family Revocable Living Trust executed 06/12/2018. Material life events since: (1) Mary inherited ≈$850k via Klein Family Trust 02/14/2026; (2) Charles Smith diagnosed Parkinson's 04/08/2026 with no POA on file; (3) Emma reached age of majority — current beneficiary structure was drafted around minor children. Pour-over wills similarly outdated.",
    action: "Schedule estate-planning review with Cohen, Stein & Park (original drafter). Update RLT funding (Klein Trust assets coordination), refresh contingent beneficiaries, add HCPOA + advance directive for Charles support, evaluate trust-protector role given Mary's brother David (CPA) trusteeship of Klein Trust.",
    citations: [
      { documentId: "doc16_rlt_2018", page: 1, excerpt: "Trust executed June 12, 2018" },
      { documentId: "doc18_klein_trust_cert", page: 1, excerpt: "Klein Family Trust effective 02/14/2026" },
      { documentId: "doc25_meeting_2026_04_22", page: 1, excerpt: "Charles Parkinson's diagnosis disclosed [47:18]" },
      { documentId: "doc23_cmu_admission", page: 1, excerpt: "Emma Smith, age 18, fall 2026 enrollment" },
    ],
  },
  {
    id: "rec_rsu_withholding",
    severity: "urgent",
    category: "Tax",
    title: "May 15 RSU vest — supplemental withholding likely insufficient",
    why: "1,250 MGCP shares vest 05/15/2026 at ≈$150 reference price = ≈$187,500 ordinary W-2 income. MegaCorp default supplemental federal withholding 22% = $41,250. Combined with Robert's $385k base + $115.5k bonus + Mary's $540k K-1, household projects into 35% federal marginal bracket. Plus NY state ~6.85% supplemental + Medicare 0.9% surcharge. Estimated true tax on the vest ≈$83k vs $41k withheld → $42k under-withholding for Q2 alone.",
    action: "Two options: (1) Direct MegaCorp HR to apply 'flat 37%' supplemental rate via Form W-4 supplemental election before 05/15. (2) Sell additional shares at vest beyond default sell-to-cover and remit to IRS as Q2 estimated payment by 06/15. Option 1 is cleaner.",
    citations: [
      { documentId: "doc20_rsu_2025", page: 2, excerpt: "Tranche 2 — May 15, 2026, 1,250 shares" },
      { documentId: "doc05_schwab_2026q1", page: 4, excerpt: "MGCP closing reference $150.00" },
      { documentId: "doc03_w2_robert_2024", page: 1 },
      { documentId: "doc04_k1_mary_2024", page: 2 },
    ],
  },
  {
    id: "rec_whole_life_review",
    severity: "important",
    category: "Insurance",
    title: "MassMutual whole life — request in-force illustration",
    why: "Policy ML-19980412 cash value $138,200 vs 1998 illustration projection of $156,800 at year 27 — $18,600 (11.9%) shortfall. Likely cause: dividend scale reductions over the 28-year window (industry-wide trend; 1998 dividend assumptions ran 8.5%+, current scale ~5.5%). Policy was last reviewed never per the file.",
    action: "Request current in-force illustration showing dividend scale, projected cash value through age 95, and MEC status. Decision tree: (a) if surrender value attractive and life-insurance need now covered by term, evaluate 1035 exchange to MEC-friendly product; (b) if dividend scale stable, retain as fixed-income proxy.",
    citations: [
      { documentId: "doc13_massmutual_whole_robert", page: 3, excerpt: "Net cash value 12/31/2025: $138,200" },
      { documentId: "doc13_massmutual_whole_robert", page: 11, excerpt: "1998 illustration year-27 projection: $156,800" },
    ],
  },
  {
    id: "rec_charles_poa",
    severity: "important",
    category: "Estate",
    title: "Set up POA + healthcare directives for Charles Smith",
    why: "Charles (78, widowed, Phoenix AZ, sole surviving parent) diagnosed Parkinson's 04/08/2026 by Banner Neurology. Only estate document on file is a 2009 will drafted by a now-retired AZ attorney. No durable power of attorney, no healthcare proxy, no successor trustee. Robert is only child. Disease progression timeline favors acting in next 12 months while Charles retains capacity.",
    action: "Refer to AZ elder-law attorney via Banner's social-work team. Execute durable financial POA (Robert as agent), healthcare proxy, advance directive, and HIPAA release. Update will or convert to revocable trust to avoid AZ probate. Coordinate with Beechwood — Sarah to attend signing if helpful for continuity.",
    citations: [
      { documentId: "doc25_meeting_2026_04_22", page: 1, excerpt: "Robert [47:18]: Parkinson's diagnosis at Banner Neurology, dad lives alone" },
    ],
  },
  {
    id: "rec_concentration",
    severity: "important",
    category: "Investment",
    title: "MGCP concentration 25.9% of joint brokerage — diversification plan",
    why: "MGCP common $480k of $1,852k joint Schwab brokerage = 25.9%. Future RSU vests (1,250 shares May 15, more in Oct + 2027+) will compound exposure if held. Robert's compensation is already MGCP-correlated (base + bonus + ESPP + RSU). Single-name concentration risk on a public mid-cap with cyclical-tech beta is the dominant unforced error in this household.",
    action: "Establish a sell-to-cover-plus rule going forward: at each vest, sell 100% of vested shares (not just tax-cover), redeploy to VTI / VXUS / muni ladder. Existing $480k position: liquidate over 4 quarters using §10b5-1 plan to avoid blackout-window issues; harvest gains against any 2026 muni-portfolio losses.",
    citations: [
      { documentId: "doc05_schwab_2026q1", page: 4, excerpt: "MegaCorp common, 3,200 sh @ $150.00 = $480,000" },
      { documentId: "doc05_schwab_2026q1", page: 1, excerpt: "Total account value $1,852,000" },
      { documentId: "doc20_rsu_2025", page: 2 },
    ],
  },
  {
    id: "rec_529_gap",
    severity: "informational",
    category: "Education",
    title: "Emma 529 funding gap — $189,600 over 4 years",
    why: "NY 529 (NYSAVES) balance $180,400. CMU 4-year nominal cost $370,000 assuming 5% COA inflation. Gap $189,600. Mary's K-1 income from Klein Trust (≈$42k/yr ongoing) is municipal-bond + TIPS — already tax-efficient and could fund tuition directly via the qualified-educational-expense gift-tax exemption.",
    action: "Two-track: (1) Front-load remaining 2026 NY 529 contributions to capture state-tax deduction (NY caps at $10k/yr joint, but couple is over phase-out for federal — verify current NY treatment); (2) Direct Klein Trust K-1 distributions as direct CMU payments under §2503(e) educational exemption, bypassing annual gift cap. Liam plan unchanged given gap-year buffer.",
    citations: [
      { documentId: "doc08_nysaves_emma", page: 1, excerpt: "Account value 03/31/2026: $180,400" },
      { documentId: "doc24_cmu_cost", page: 3, excerpt: "4-year projection at 5% inflation: $370,000" },
      { documentId: "doc19_klein_inventory", page: 5, excerpt: "Munis + TIPS yield blend ~4.9%" },
    ],
  },
  {
    id: "rec_ltc",
    severity: "informational",
    category: "Risk",
    title: "Long-term care coverage — quote hybrid policy",
    why: "Robert 54, Mary 51, no LTC policy on file. Net worth ≈$4.5M places household in self-insure-or-hedge zone. Charles's Parkinson's diagnosis introduces a hereditary-risk lens for Robert. Traditional LTC has rate-instability history; hybrid life-with-LTC-rider products are now competitive at this age band and avoid 'use-it-or-lose-it' trade-off.",
    action: "Quote three carriers (Lincoln MoneyGuard, Nationwide CareMatters, Securian SecureCare) on hybrid 10-pay structure for Robert. Smaller policy on Mary. Use proceeds from Klein inheritance liquidity event for 10-pay funding. Discuss family history disclosure expectations on underwriting.",
    citations: [
      { documentId: "doc25_meeting_2026_04_22", page: 1, excerpt: "Charles Parkinson's diagnosis disclosed" },
      { documentId: "doc05_schwab_2026q1", page: 1 },
      { documentId: "doc18_klein_trust_cert", page: 1 },
    ],
  },
];

export function applicableRecommendations(
  extractedIds: ReadonlySet<string>
): Recommendation[] {
  return recommendations.filter((r) =>
    r.citations.every((c) => extractedIds.has(c.documentId))
  );
}

export function severityRank(s: RecSeverity): number {
  return s === "urgent" ? 0 : s === "important" ? 1 : 2;
}
