"use client";

import { motion, AnimatePresence } from "motion/react";
import recordRaw from "@/data/smith-family.json";
import { useApp } from "./AppContext";
import { citationsReady } from "@/lib/citations";
import { CitationGroup } from "./CitationBadge";
import { formatCurrency, formatDate, formatInteger, formatPercent } from "@/lib/format";
import type { Citation, Cited } from "@/lib/types";
import { AlertTriangle, FileEdit } from "lucide-react";
import { RecommendationsPanel } from "./RecommendationsPanel";

type Member = {
  role: string;
  name: Cited<string>;
  age: Cited<number>;
  employer?: Cited<string>;
  title?: Cited<string>;
  school?: Cited<string>;
};

type AnyRecord = typeof recordRaw & {
  household: { members: Member[] };
};
const record = recordRaw as unknown as AnyRecord;

function isCited<T>(x: unknown): x is Cited<T> {
  return (
    !!x &&
    typeof x === "object" &&
    "value" in (x as object) &&
    Array.isArray((x as { citations?: unknown }).citations)
  );
}

function Val({
  cited,
  format,
  emphasis,
  inline = true,
}: {
  cited?: Cited<unknown>;
  format?: (v: unknown) => string;
  emphasis?: boolean;
  inline?: boolean;
}) {
  const { extractedIds } = useApp();
  if (!cited) return <span className="text-zinc-400">—</span>;
  const ready = citationsReady(cited.citations, extractedIds);
  return (
    <AnimatePresence mode="wait" initial={false}>
      {ready ? (
        <motion.span
          key="v"
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className={
            inline
              ? `inline-flex flex-wrap items-baseline gap-x-1 ${
                  emphasis ? "font-medium" : ""
                }`
              : undefined
          }
        >
          <span className="tabular-nums">
            {format
              ? format(cited.value)
              : typeof cited.value === "number"
                ? formatCurrency(cited.value)
                : typeof cited.value === "boolean"
                  ? cited.value
                    ? "Yes"
                    : "No"
                  : (cited.value as string)}
          </span>
          <CitationGroup citations={cited.citations as Citation[]} />
        </motion.span>
      ) : (
        <motion.span
          key="s"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="inline-block h-3 w-24 rounded bg-zinc-200"
        />
      )}
    </AnimatePresence>
  );
}

function Alert({ cited }: { cited?: { alert?: string; citations: Citation[] } }) {
  const { extractedIds } = useApp();
  if (!cited?.alert) return null;
  if (!citationsReady(cited.citations, extractedIds)) return null;
  return (
    <div className="mt-1 flex items-start gap-1.5 rounded-sm bg-amber-50 px-2 py-1.5 text-[11px] text-amber-900 ring-1 ring-amber-200">
      <AlertTriangle size={11} className="mt-0.5 shrink-0" />
      <span>{cited.alert}</span>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <tr className="border-b border-zinc-200 last:border-0 align-top">
      <td className="w-[42%] py-2 pr-4 text-[12px] text-zinc-600">{label}</td>
      <td className="py-2 text-[13px] text-zinc-900">{children}</td>
    </tr>
  );
}

function Heading({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 mb-3 flex items-baseline gap-3 border-b-2 border-zinc-900 pb-1">
      <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-zinc-500">
        {tag}
      </span>
      <h2 className="font-heading text-[15px] font-semibold uppercase tracking-wide text-zinc-900">
        {children}
      </h2>
    </div>
  );
}

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-3 mb-1 text-[12px] font-semibold uppercase tracking-wide text-zinc-700">
      {children}
    </h3>
  );
}

export function FactFinder() {
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="mx-auto w-full max-w-[820px] overflow-hidden rounded-md bg-white text-zinc-900 ring-1 ring-zinc-200 shadow-[0_2px_24px_rgba(15,23,42,0.06)]">
      {/* Watermark / banner */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-200 bg-amber-50 px-8 py-2 text-[11px] text-amber-900">
        <div className="flex items-center gap-1.5">
          <AlertTriangle size={11} />
          <span>
            <strong>Draft</strong> — populated by AI from client document vault.
            Advisor must review every value before sharing with client.
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider">
          v0.1 · auto
        </span>
      </div>

      <div className="px-12 py-10">
        {/* Cover */}
        <div className="mb-10 border-b border-zinc-200 pb-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Beechwood Wealth Partners
          </div>
          <h1 className="font-heading mt-3 text-[28px] leading-tight font-semibold tracking-tight text-zinc-900">
            Personal Financial Fact Finder
          </h1>
          <div className="mt-1 text-[13px] text-zinc-600">
            Married-couple intake & planning summary
          </div>

          <table className="mt-6 w-full text-[13px]">
            <tbody>
              <Row label="Client household">
                <span className="font-medium">Robert &amp; Mary Smith</span>
              </Row>
              <Row label="Prepared for">
                <Val cited={record.household.primaryAddress} />
              </Row>
              <Row label="Prepared by">Sarah Chen, CFP — Beechwood Wealth Partners</Row>
              <Row label="Date prepared">{date}</Row>
              <Row label="Source documents">
                <span className="tabular-nums">26 documents from Egnyte vault</span>
              </Row>
            </tbody>
          </table>
        </div>

        {/* A — Personal */}
        <Heading tag="A">Personal Information</Heading>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {record.household.members.map((m, i) => (
            <div key={i}>
              <Subhead>{m.role}</Subhead>
              <table className="w-full">
                <tbody>
                  <Row label="Full name">
                    <Val cited={m.name} emphasis />
                  </Row>
                  <Row label="Age">
                    <Val cited={m.age} format={(v) => formatInteger(v as number)} />
                  </Row>
                  {m.employer && (
                    <Row label="Employer">
                      <Val cited={m.employer} />
                    </Row>
                  )}
                  {m.title && (
                    <Row label="Title">
                      <Val cited={m.title} />
                    </Row>
                  )}
                  {m.school && (
                    <Row label="Status">
                      <Val cited={m.school} />
                    </Row>
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <table className="mt-4 w-full">
          <tbody>
            <Row label="Filing status">
              <Val cited={record.household.filingStatus} />
            </Row>
            <Row label="Marriage date">
              <Val
                cited={record.household.marriageDate}
                format={(v) => formatDate(v as string)}
              />
            </Row>
            <Row label="Primary address">
              <Val cited={record.household.primaryAddress} />
            </Row>
          </tbody>
        </table>

        {/* B — Income */}
        <Heading tag="B">Employment &amp; Income</Heading>
        <table className="w-full">
          <tbody>
            <Row label="Robert — base salary">
              <Val cited={record.income.robertBaseSalary} emphasis />
            </Row>
            <Row label="Robert — target bonus">
              <Val cited={record.income.robertTargetBonus} />
            </Row>
            <Row label="Mary — partnership K-1 (2025)">
              <Val cited={record.income.maryK1Income2025} emphasis />
            </Row>
            <Row label="Adjusted gross income (2024)">
              <Val cited={record.income.agi2024} emphasis />
            </Row>
          </tbody>
        </table>

        {/* C — Investment Accounts */}
        <Heading tag="C">Investment Accounts</Heading>
        {record.accounts.brokerage.map((b, i) => (
          <div key={i} className="mb-2">
            <Subhead>{b.label}</Subhead>
            <table className="w-full">
              <tbody>
                <Row label="Account number">
                  <Val cited={b.accountSuffix} />
                </Row>
                <Row label="Total balance">
                  <Val cited={b.balance} emphasis />
                </Row>
                <Row label="As of">
                  <Val cited={b.asOf} format={(v) => formatDate(v as string)} />
                </Row>
              </tbody>
            </table>
            <table className="mt-2 w-full text-[12px]">
              <thead>
                <tr className="border-b border-zinc-300 text-left text-[10px] uppercase tracking-wider text-zinc-500">
                  <th className="py-1.5 font-semibold">Holding</th>
                  <th className="py-1.5 font-semibold">Detail</th>
                  <th className="py-1.5 text-right font-semibold">Market value</th>
                </tr>
              </thead>
              <tbody>
                {b.positions.map((p, j) => (
                  <tr key={j} className="border-b border-zinc-100 last:border-0">
                    <td className="py-1.5">
                      <Val cited={p.ticker} />
                      {isCited<boolean>(p.concentrationFlag) &&
                        p.concentrationFlag.value === true && (
                          <span
                            title="Concentrated position"
                            className="ml-1.5 inline-flex items-center align-middle text-amber-700"
                          >
                            <AlertTriangle size={11} />
                          </span>
                        )}
                    </td>
                    <td className="py-1.5 text-zinc-600">
                      {isCited<number>(p.shares) && isCited<number>(p.costBasis) ? (
                        <span className="tabular-nums">
                          {formatInteger(p.shares.value)} sh · cost{" "}
                          {formatCurrency(p.costBasis.value)}
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="py-1.5 text-right">
                      <Val cited={p.marketValue} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* D — Retirement (incl beneficiary table) */}
        <Heading tag="D">Retirement Accounts</Heading>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-zinc-300 text-left text-[10px] uppercase tracking-wider text-zinc-500">
              <th className="py-1.5 font-semibold">Account</th>
              <th className="py-1.5 text-right font-semibold">Balance</th>
              <th className="py-1.5 font-semibold">Allocation</th>
              <th className="py-1.5 font-semibold">Primary beneficiary</th>
            </tr>
          </thead>
          <tbody>
            {record.accounts.retirement.map((r, i) => (
              <tr key={i} className="border-b border-zinc-100 align-top last:border-0">
                <td className="py-2 font-medium">{r.label}</td>
                <td className="py-2 text-right">
                  <Val cited={r.balance} emphasis />
                </td>
                <td className="py-2 text-zinc-700">
                  {r.allocation ? <Val cited={r.allocation} /> : <span className="text-zinc-400">—</span>}
                </td>
                <td className="py-2 text-zinc-700">
                  {r.primaryBeneficiary ? (
                    <>
                      <Val cited={r.primaryBeneficiary} />
                      <Alert cited={r.primaryBeneficiary} />
                    </>
                  ) : (
                    <span className="text-zinc-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* E — Real Estate & Liabilities */}
        <Heading tag="E">Real Estate &amp; Liabilities</Heading>
        {record.realEstate.map((r, i) => (
          <div key={i} className="mb-3">
            <Subhead>{r.label}</Subhead>
            <table className="w-full">
              <tbody>
                <Row label="Address">
                  <Val cited={r.address} />
                </Row>
                <Row label="Estimated value">
                  <Val cited={r.estimatedValue} emphasis />
                </Row>
                <Row label="Mortgage principal">
                  <Val cited={r.mortgagePrincipal} />
                </Row>
                {r.mortgageRate && (
                  <Row label="Mortgage rate">
                    <Val
                      cited={r.mortgageRate}
                      format={(v) => formatPercent(v as number)}
                    />
                  </Row>
                )}
                {r.helocBalance !== undefined && (
                  <Row label="HELOC balance">
                    <Val cited={r.helocBalance} />
                  </Row>
                )}
                {r.helocRate && (
                  <Row label="HELOC rate">
                    <Val
                      cited={r.helocRate}
                      format={(v) => formatPercent(v as number)}
                    />
                  </Row>
                )}
                {r.titleHolder && (
                  <Row label="Title holder">
                    <Val cited={r.titleHolder} />
                  </Row>
                )}
              </tbody>
            </table>
          </div>
        ))}

        {/* F — Insurance */}
        <Heading tag="F">Insurance Coverage</Heading>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-zinc-300 text-left text-[10px] uppercase tracking-wider text-zinc-500">
              <th className="py-1.5 font-semibold">Policy</th>
              <th className="py-1.5 text-right font-semibold">Face</th>
              <th className="py-1.5 text-right font-semibold">Premium</th>
              <th className="py-1.5 font-semibold">Beneficiary / status</th>
            </tr>
          </thead>
          <tbody>
            {record.insurance.policies.map((p, i) => (
              <tr key={i} className="border-b border-zinc-100 align-top last:border-0">
                <td className="py-2 font-medium">{p.label}</td>
                <td className="py-2 text-right">
                  <Val cited={p.faceAmount} />
                </td>
                <td className="py-2 text-right">
                  <Val cited={p.annualPremium} />
                </td>
                <td className="py-2 text-zinc-700">
                  {p.beneficiary ? <Val cited={p.beneficiary} /> : null}
                  {p.tracking && (
                    <>
                      <div className="mt-1">
                        <Val cited={p.tracking} />
                      </div>
                      <Alert cited={p.tracking} />
                    </>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td className="py-2 text-zinc-600">Long-term care</td>
              <td colSpan={3} className="py-2">
                <Val cited={record.insurance.longTermCare} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* G — Estate */}
        <Heading tag="G">Estate Planning Documents</Heading>
        <table className="w-full">
          <tbody>
            {record.estate.documents.map((d, i) => (
              <Row key={i} label={d.label}>
                <span className="inline-flex flex-wrap items-baseline gap-2">
                  <span>
                    Executed{" "}
                    <Val cited={d.executed} format={(v) => formatDate(v as string)} />
                  </span>
                  {d.drafter && (
                    <>
                      <span className="text-zinc-400">·</span>
                      <span>
                        <Val cited={d.drafter} />
                      </span>
                    </>
                  )}
                  {d.lastUpdated && (
                    <>
                      <span className="text-zinc-400">·</span>
                      <span>
                        <Val cited={d.lastUpdated} />
                      </span>
                    </>
                  )}
                </span>
                {d.lastUpdated && <Alert cited={d.lastUpdated} />}
              </Row>
            ))}
          </tbody>
        </table>
        <Subhead>{record.estate.klein.label}</Subhead>
        <table className="w-full">
          <tbody>
            <Row label="Established on">
              <Val
                cited={record.estate.klein.establishedOn}
                format={(v) => formatDate(v as string)}
              />
            </Row>
            <Row label="Decedent">
              <Val cited={record.estate.klein.decedent} />
            </Row>
            <Row label="Trustee">
              <Val cited={record.estate.klein.trustee} />
            </Row>
            <Row label="Income beneficiary">
              <Val cited={record.estate.klein.incomeBeneficiary} />
            </Row>
            <Row label="Remainder beneficiaries">
              <Val cited={record.estate.klein.remainderBeneficiaries} />
            </Row>
            <Row label="Estimated corpus">
              <Val cited={record.estate.klein.estimatedCorpus} emphasis />
            </Row>
            <Row label="Projected annual K-1">
              <Val cited={record.estate.klein.projectedAnnualK1} />
            </Row>
          </tbody>
        </table>

        {/* H — Equity comp */}
        <Heading tag="H">Equity Compensation</Heading>
        {record.equityComp.rsuGrants.map((g, i) => (
          <div key={i} className="mb-2">
            <Subhead>{g.label}</Subhead>
            <table className="w-full">
              <tbody>
                <Row label="Total shares granted">
                  <Val
                    cited={g.totalSharesGranted}
                    format={(v) => `${formatInteger(v as number)} sh`}
                  />
                </Row>
                <Row label="Vest schedule">
                  <Val cited={g.vestSchedule} />
                </Row>
                {g.nextVestDate && (
                  <Row label="Next vest date">
                    <Val
                      cited={g.nextVestDate}
                      format={(v) => formatDate(v as string)}
                    />
                  </Row>
                )}
                {g.nextVestShares && (
                  <Row label="Next vest — shares">
                    <Val
                      cited={g.nextVestShares}
                      format={(v) => `${formatInteger(v as number)} sh`}
                    />
                  </Row>
                )}
                {g.nextVestEstimatedValue && (
                  <Row label="Next vest — estimated value">
                    <Val cited={g.nextVestEstimatedValue} emphasis />
                    <Alert cited={g.nextVestEstimatedValue} />
                  </Row>
                )}
              </tbody>
            </table>
          </div>
        ))}
        <Subhead>MegaCorp ESPP</Subhead>
        <table className="w-full">
          <tbody>
            <Row label="Discount">
              <Val
                cited={record.equityComp.espp.discount}
                format={(v) => formatPercent(v as number)}
              />
            </Row>
            <Row label="Lookback">
              <Val cited={record.equityComp.espp.lookback} />
            </Row>
            <Row label="Enrolled">
              <Val
                cited={record.equityComp.espp.enrolled}
                format={(v) => ((v as boolean) ? "Yes" : "No")}
              />
            </Row>
          </tbody>
        </table>

        {/* I — Education */}
        <Heading tag="I">Education Funding</Heading>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-zinc-300 text-left text-[10px] uppercase tracking-wider text-zinc-500">
              <th className="py-1.5 font-semibold">Beneficiary</th>
              <th className="py-1.5 font-semibold">Plan</th>
              <th className="py-1.5 text-right font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {record.education.plans529.map((p, i) => (
              <tr key={i} className="border-b border-zinc-100 last:border-0">
                <td className="py-2">
                  <Val cited={p.child} />
                </td>
                <td className="py-2 text-zinc-700">
                  <Val cited={p.plan} />
                </td>
                <td className="py-2 text-right">
                  <Val cited={p.balance} emphasis />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Subhead>Emma — Carnegie Mellon</Subhead>
        <table className="w-full">
          <tbody>
            <Row label="School">
              <Val cited={record.education.emmaCollege.school} />
            </Row>
            <Row label="Matriculation">
              <Val
                cited={record.education.emmaCollege.matriculation}
                format={(v) => formatDate(v as string)}
              />
            </Row>
            <Row label="Year-1 cost of attendance">
              <Val cited={record.education.emmaCollege.year1Cost} />
            </Row>
            <Row label="4-year projected (5% inflation)">
              <Val cited={record.education.emmaCollege.fourYearProjected} emphasis />
            </Row>
          </tbody>
        </table>

        {/* J — Goals */}
        <Heading tag="J">Goals &amp; Stated Intent</Heading>
        <ol className="space-y-3">
          {record.goals.map((g, i) => (
            <li key={i}>
              <div className="text-[13px] font-semibold text-zinc-900">{g.label}</div>
              <table className="mt-1 w-full">
                <tbody>
                  {g.previous && (
                    <Row label="Previously">
                      <Val cited={g.previous} />
                    </Row>
                  )}
                  <Row label="Current">
                    <Val cited={g.current} emphasis />
                  </Row>
                  {g.trigger && (
                    <Row label="Trigger / context">
                      <Val cited={g.trigger} />
                    </Row>
                  )}
                </tbody>
              </table>
            </li>
          ))}
        </ol>

        {/* K — Material changes */}
        <Heading tag="K">Recent Material Changes</Heading>
        <ul className="space-y-2">
          {record.recentLifeEvents.map((e, i) => (
            <li
              key={i}
              className="rounded-sm border-l-2 border-zinc-900 bg-zinc-50/60 px-3 py-2"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-[13px] font-semibold text-zinc-900">
                  {e.headline}
                </div>
                <div className="font-mono text-[11px] tabular-nums text-zinc-500">
                  {formatDate(e.date)}
                </div>
              </div>
              <div className="mt-1 text-[12px] text-zinc-700">
                <Val cited={e.detail} />
              </div>
            </li>
          ))}
        </ul>

        {/* L — Recommended Actions (rule-engine output) */}
        <Heading tag="L">Recommended Actions</Heading>
        <p className="-mt-1 mb-3 text-[12px] text-zinc-600">
          Generated by cross-document rule engine over the 26-document vault. Each
          item links back to the source documents that triggered it. Advisor must
          review before sharing with client.
        </p>
        <RecommendationsPanel />

        {/* M — Investment Recommendations (advisor-completed) */}
        <Heading tag="M">Investment Recommendations</Heading>
        <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50/60 px-5 py-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            <FileEdit size={12} />
            <span>To be completed by advisor</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-700">
            This section is reserved for the advisor&apos;s investment recommendations
            (target allocation, manager selection, rebalancing plan, tax-loss harvesting
            schedule, fixed-income ladder, alternative-investment exposure).
            Investment-advice content is a regulated activity and is not auto-generated
            by Footnote — Section L surfaces the document-derived facts and gaps;
            the investment recommendation is the human advisor&apos;s call.
          </p>
          <div className="mt-4 space-y-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-px w-full bg-zinc-300/70" />
            ))}
          </div>
        </div>

        {/* Signatures */}
        <div className="mt-12 grid grid-cols-2 gap-10 border-t border-zinc-300 pt-8">
          <SignatureLine label="Robert Smith" />
          <SignatureLine label="Mary Smith" />
          <SignatureLine label="Sarah Chen, CFP — advisor" />
          <SignatureLine label="Date" />
        </div>

        <div className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
          Beechwood Wealth Partners · Personal Financial Fact Finder · Page 1 of 1
        </div>
      </div>
    </article>
  );
}

function SignatureLine({ label }: { label: string }) {
  return (
    <div>
      <div className="h-7 border-b border-zinc-400" />
      <div className="mt-1 text-[11px] text-zinc-600">{label}</div>
    </div>
  );
}
