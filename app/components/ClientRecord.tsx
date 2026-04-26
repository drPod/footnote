"use client";

import { Section, Subsection } from "./Section";
import { Field } from "./Field";
import { CitationGroup } from "./CitationBadge";
import { formatCurrency, formatDate, formatInteger, formatPercent } from "@/lib/format";
import type { Cited, Citation } from "@/lib/types";
import recordRaw from "@/data/smith-family.json";
import { useApp } from "./AppContext";
import { citationsReady } from "@/lib/citations";
import { AlertTriangle } from "lucide-react";

type AnyCited = Cited<unknown>;

type Member = {
  role: string;
  name: Cited<string>;
  age: Cited<number>;
  employer?: Cited<string>;
  title?: Cited<string>;
  school?: Cited<string>;
};

type Position = {
  ticker: Cited<string>;
  marketValue: Cited<number>;
  shares?: Cited<number>;
  costBasis?: Cited<number>;
  concentrationFlag?: Cited<boolean>;
};

type RecordShape = typeof recordRaw;

const record = recordRaw as unknown as RecordShape & {
  household: {
    members: Member[];
  };
  accounts: {
    brokerage: Array<{
      label: string;
      accountSuffix: Cited<string>;
      balance: Cited<number>;
      asOf: Cited<string>;
      positions: Position[];
    }>;
    retirement: Array<{
      label: string;
      balance: Cited<number>;
      allocation: Cited<string>;
      primaryBeneficiary?: Cited<string>;
      asOf?: Cited<string>;
      contributionRoom2026?: Cited<number>;
    }>;
  };
  insurance: {
    policies: Array<{
      label: string;
      policyNumber?: Cited<string>;
      faceAmount: Cited<number>;
      annualPremium: Cited<number>;
      issueDate?: Cited<string>;
      beneficiary?: Cited<string>;
      cashValue?: Cited<number>;
      illustrationProjected?: Cited<number>;
      tracking?: Cited<string>;
    }>;
    longTermCare: Cited<string>;
  };
  realEstate: Array<{
    label: string;
    address: Cited<string>;
    estimatedValue: Cited<number>;
    mortgagePrincipal: Cited<number>;
    mortgageRate?: Cited<number>;
    helocBalance?: Cited<number>;
    helocRate?: Cited<number>;
    titleHolder?: Cited<string>;
  }>;
  estate: {
    documents: Array<{
      label: string;
      executed: Cited<string>;
      drafter?: Cited<string>;
      lastUpdated?: Cited<string>;
    }>;
    klein: {
      label: string;
      establishedOn: Cited<string>;
      decedent: Cited<string>;
      trustee: Cited<string>;
      incomeBeneficiary: Cited<string>;
      remainderBeneficiaries: Cited<string>;
      estimatedCorpus: Cited<number>;
      projectedAnnualK1: Cited<number>;
    };
  };
  equityComp: {
    rsuGrants: Array<{
      label: string;
      totalSharesGranted: Cited<number>;
      vestSchedule: Cited<string>;
      nextVestDate?: Cited<string>;
      nextVestShares?: Cited<number>;
      nextVestEstimatedValue?: Cited<number>;
    }>;
    espp: {
      discount: Cited<number>;
      lookback: Cited<string>;
      enrolled: Cited<boolean>;
    };
  };
  education: {
    plans529: Array<{
      child: Cited<string>;
      plan: Cited<string>;
      balance: Cited<number>;
    }>;
    emmaCollege: {
      school: Cited<string>;
      matriculation: Cited<string>;
      year1Cost: Cited<number>;
      fourYearProjected: Cited<number>;
    };
  };
  goals: Array<{
    label: string;
    previous?: Cited<string>;
    current: Cited<string>;
    trigger?: Cited<string>;
  }>;
  recentLifeEvents: Array<{
    date: string;
    headline: string;
    detail: Cited<string>;
  }>;
};

function shares(n: number) {
  return new Intl.NumberFormat("en-US").format(n) + " sh";
}

function EventRow({
  date,
  headline,
  detail,
}: {
  date: string;
  headline: string;
  detail: Cited<string>;
}) {
  const { extractedIds } = useApp();
  const ready = citationsReady(detail.citations, extractedIds);
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-medium text-foreground">{headline}</div>
        <div className="font-mono text-[11px] tabular-nums text-muted-foreground">
          {formatDate(date)}
        </div>
      </div>
      <div className="mt-1 text-[13px] text-muted-foreground">
        {ready ? (
          <span className="inline-flex flex-wrap items-baseline gap-1">
            <span>{detail.value}</span>
            <CitationGroup citations={detail.citations as Citation[]} />
          </span>
        ) : (
          <span className="inline-block h-3.5 w-48 max-w-full rounded bg-muted" />
        )}
      </div>
    </div>
  );
}

export function ClientRecord() {
  return (
    <div className="space-y-10">
      {/* Household */}
      <Section title="Household" caption="2 adults · 2 dependents">
        <Field label="Filing status" cited={record.household.filingStatus} />
        <Field
          label="Marriage date"
          cited={record.household.marriageDate}
          format={(v) => formatDate(v as string)}
        />
        <Field label="Primary address" cited={record.household.primaryAddress} />
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
          {record.household.members.map((m, i) => (
            <Subsection key={i} title={m.role}>
              <Field label="Name" cited={m.name} />
              <Field label="Age" cited={m.age} format={(v) => formatInteger(v as number)} />
              {m.employer && <Field label="Employer" cited={m.employer} />}
              {m.title && <Field label="Role" cited={m.title} />}
              {m.school && <Field label="School / status" cited={m.school} />}
            </Subsection>
          ))}
        </div>
      </Section>

      {/* Income */}
      <Section title="Income">
        <Field label="Robert — base salary" cited={record.income.robertBaseSalary} />
        <Field label="Robert — target bonus" cited={record.income.robertTargetBonus} />
        <Field label="Mary — K-1 income (2025)" cited={record.income.maryK1Income2025} />
        <Field
          label="AGI (2024)"
          cited={record.income.agi2024}
          emphasis
        />
      </Section>

      {/* Brokerage */}
      <Section title="Investment Accounts">
        {record.accounts.brokerage.map((b, i) => (
          <Subsection
            key={i}
            title={b.label}
            trailing={
              <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                as of {formatDate(b.asOf.value)}
              </span>
            }
          >
            <Field label="Account #" cited={b.accountSuffix} />
            <Field label="Total balance" cited={b.balance} emphasis />
            <div className="mt-3 border-t border-border pt-2">
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Holdings
              </div>
              {b.positions.map((p, j) => (
                <PositionRow key={j} position={p} />
              ))}
            </div>
          </Subsection>
        ))}
      </Section>

      {/* Retirement */}
      <Section title="Retirement Accounts">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {record.accounts.retirement.map((r, i) => (
            <Subsection key={i} title={r.label}>
              <Field label="Balance" cited={r.balance} emphasis />
              {r.allocation && <Field label="Allocation" cited={r.allocation} />}
              {r.primaryBeneficiary && (
                <Field label="Primary beneficiary" cited={r.primaryBeneficiary} />
              )}
              {r.contributionRoom2026 && (
                <Field label="2026 contrib room" cited={r.contributionRoom2026} />
              )}
            </Subsection>
          ))}
        </div>
      </Section>

      {/* Insurance */}
      <Section title="Insurance">
        <div className="space-y-3">
          {record.insurance.policies.map((p, i) => (
            <Subsection key={i} title={p.label}>
              {p.policyNumber && <Field label="Policy #" cited={p.policyNumber} />}
              <Field label="Face amount" cited={p.faceAmount} emphasis />
              <Field label="Annual premium" cited={p.annualPremium} />
              {p.issueDate && (
                <Field
                  label="Issued"
                  cited={p.issueDate}
                  format={(v) => formatDate(v as string)}
                />
              )}
              {p.beneficiary && <Field label="Beneficiary" cited={p.beneficiary} />}
              {p.cashValue && <Field label="Cash value" cited={p.cashValue} />}
              {p.illustrationProjected && (
                <Field label="Illustration (year 27)" cited={p.illustrationProjected} />
              )}
              {p.tracking && <Field label="Tracking" cited={p.tracking} />}
            </Subsection>
          ))}
          <Field label="Long-term care" cited={record.insurance.longTermCare} />
        </div>
      </Section>

      {/* Real Estate */}
      <Section title="Real Estate">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {record.realEstate.map((r, i) => (
            <Subsection key={i} title={r.label}>
              <Field label="Address" cited={r.address} />
              <Field label="Estimated value" cited={r.estimatedValue} emphasis />
              <Field label="Mortgage principal" cited={r.mortgagePrincipal} />
              {r.mortgageRate && (
                <Field
                  label="Mortgage rate"
                  cited={r.mortgageRate}
                  format={(v) => formatPercent(v as number)}
                />
              )}
              {r.helocBalance !== undefined && (
                <Field label="HELOC balance" cited={r.helocBalance} />
              )}
              {r.helocRate && (
                <Field
                  label="HELOC rate"
                  cited={r.helocRate}
                  format={(v) => formatPercent(v as number)}
                />
              )}
              {r.titleHolder && <Field label="Title holder" cited={r.titleHolder} />}
            </Subsection>
          ))}
        </div>
      </Section>

      {/* Estate */}
      <Section title="Estate Planning">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {record.estate.documents.map((d, i) => (
            <Subsection key={i} title={d.label}>
              <Field
                label="Executed"
                cited={d.executed}
                format={(v) => formatDate(v as string)}
              />
              {d.drafter && <Field label="Drafter" cited={d.drafter} />}
              {d.lastUpdated && <Field label="Last updated" cited={d.lastUpdated} />}
            </Subsection>
          ))}
          <Subsection title={record.estate.klein.label}>
            <Field
              label="Established on"
              cited={record.estate.klein.establishedOn}
              format={(v) => formatDate(v as string)}
            />
            <Field label="Decedent" cited={record.estate.klein.decedent} />
            <Field label="Trustee" cited={record.estate.klein.trustee} />
            <Field
              label="Income beneficiary"
              cited={record.estate.klein.incomeBeneficiary}
            />
            <Field
              label="Remainder beneficiaries"
              cited={record.estate.klein.remainderBeneficiaries}
            />
            <Field
              label="Est. corpus"
              cited={record.estate.klein.estimatedCorpus}
              emphasis
            />
            <Field
              label="Projected annual K-1"
              cited={record.estate.klein.projectedAnnualK1}
            />
          </Subsection>
        </div>
      </Section>

      {/* Equity Comp */}
      <Section title="Equity Compensation">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {record.equityComp.rsuGrants.map((g, i) => (
            <Subsection key={i} title={g.label}>
              <Field
                label="Total shares granted"
                cited={g.totalSharesGranted}
                format={(v) => shares(v as number)}
              />
              <Field label="Vest schedule" cited={g.vestSchedule} />
              {g.nextVestDate && (
                <Field
                  label="Next vest date"
                  cited={g.nextVestDate}
                  format={(v) => formatDate(v as string)}
                />
              )}
              {g.nextVestShares && (
                <Field
                  label="Next vest — shares"
                  cited={g.nextVestShares}
                  format={(v) => shares(v as number)}
                />
              )}
              {g.nextVestEstimatedValue && (
                <Field
                  label="Next vest — est. value"
                  cited={g.nextVestEstimatedValue}
                  emphasis
                />
              )}
            </Subsection>
          ))}
          <Subsection title="MegaCorp ESPP">
            <Field
              label="Discount"
              cited={record.equityComp.espp.discount}
              format={(v) => formatPercent(v as number)}
            />
            <Field label="Lookback" cited={record.equityComp.espp.lookback} />
            <Field
              label="Enrolled"
              cited={record.equityComp.espp.enrolled}
              format={(v) => ((v as boolean) ? "Yes" : "No")}
            />
          </Subsection>
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {record.education.plans529.map((p, i) => (
            <Subsection key={i} title={`529 — ${p.child.value}`}>
              <Field label="Beneficiary" cited={p.child} />
              <Field label="Plan" cited={p.plan} />
              <Field label="Balance" cited={p.balance} emphasis />
            </Subsection>
          ))}
          <Subsection title="Emma — Carnegie Mellon">
            <Field label="School" cited={record.education.emmaCollege.school} />
            <Field
              label="Matriculation"
              cited={record.education.emmaCollege.matriculation}
              format={(v) => formatDate(v as string)}
            />
            <Field
              label="Year-1 cost"
              cited={record.education.emmaCollege.year1Cost}
            />
            <Field
              label="4-yr projected"
              cited={record.education.emmaCollege.fourYearProjected}
              emphasis
            />
          </Subsection>
        </div>
      </Section>

      {/* Goals */}
      <Section title="Goals & Stated Intent">
        <div className="space-y-2">
          {record.goals.map((g, i) => (
            <Subsection key={i} title={g.label}>
              {g.previous && <Field label="Previously" cited={g.previous} />}
              <Field label="Current" cited={g.current} emphasis />
              {g.trigger && <Field label="Trigger" cited={g.trigger} />}
            </Subsection>
          ))}
        </div>
      </Section>

      {/* Life Events */}
      <Section title="Recent Life Events">
        <div className="space-y-2">
          {record.recentLifeEvents.map((e, i) => (
            <EventRow key={i} date={e.date} headline={e.headline} detail={e.detail} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function PositionRow({ position }: { position: Position }) {
  const { extractedIds } = useApp();
  const ready =
    citationsReady(position.ticker.citations, extractedIds) &&
    citationsReady(position.marketValue.citations, extractedIds);
  const isConcentrated =
    position.concentrationFlag && position.concentrationFlag.value === true;

  return (
    <div className="grid grid-cols-[120px_1fr_auto] items-baseline gap-3 py-1">
      <div className="text-[12px] font-medium text-foreground">
        {ready ? (
          <span className="inline-flex items-center gap-1">
            {position.ticker.value}
            {isConcentrated && (
              <span title="Concentrated position" className="text-amber-600 dark:text-amber-400">
                <AlertTriangle size={11} />
              </span>
            )}
          </span>
        ) : (
          <span className="inline-block h-3 w-12 rounded bg-muted" />
        )}
      </div>
      <div className="text-[11px] text-muted-foreground">
        {ready && position.shares && position.costBasis ? (
          <span className="tabular-nums">
            {shares(position.shares.value)} · cost {formatCurrency(position.costBasis.value)}
          </span>
        ) : null}
      </div>
      <div className="text-[12px] tabular-nums text-foreground">
        {ready ? (
          <span className="inline-flex items-baseline gap-1">
            {formatCurrency(position.marketValue.value)}
            <CitationGroup
              citations={position.marketValue.citations as Citation[]}
            />
          </span>
        ) : (
          <span className="inline-block h-3 w-16 rounded bg-muted" />
        )}
      </div>
    </div>
  );
}
