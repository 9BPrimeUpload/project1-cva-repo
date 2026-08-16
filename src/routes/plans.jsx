import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, Section, SectionHeading } from "@/components/Section";
import { PlanCards } from "@/components/PlanCards";
import { plans } from "@/data/academy";
import { formatPlanPrice, useDetectedCurrency } from "@/lib/utils";
export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      {
        title: "Plans & Pricing — Crimson Valley Academy",
      },
      {
        name: "description",
        content:
          "Compare Crimson Valley Academy learning plans: Free Explorer, Basic Learner ₹199, Pro Developer ₹399 and Elite Professional ₹799 per month.",
      },
      {
        property: "og:title",
        content: "Plans & Pricing — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Four monthly plans covering free access through 1-on-1 developer mentorship.",
      },
    ],
  }),
  component: PlansPage,
});
const comparison = [
  {
    feature: "Beginner courses",
    values: [true, true, true, true],
  },
  {
    feature: "Intermediate courses",
    values: [false, true, true, true],
  },
  {
    feature: "Advanced courses",
    values: [false, false, true, true],
  },
  {
    feature: "Assignments & progress tracking",
    values: [false, true, true, true],
  },
  {
    feature: "Project reviews",
    values: [false, false, true, true],
  },
  {
    feature: "Certificates",
    values: [false, true, true, true],
  },
  {
    feature: "Developer challenges",
    values: [false, false, true, true],
  },
  {
    feature: "Portfolio guidance",
    values: [false, false, true, true],
  },
  {
    feature: "1-on-1 mentorship",
    values: [false, false, false, true],
  },
  {
    feature: "Personalized roadmap",
    values: [false, false, false, true],
  },
  {
    feature: "Exclusive workshops",
    values: [false, false, false, true],
  },
];
function PlansPage() {
  const locale = typeof window !== "undefined" ? window.navigator.language : undefined;
  const currency = useDetectedCurrency(locale);

  return (
    <>
      <PageHeader
        eyebrow="Plans"
        title="Choose Your Learning Plan"
        description="Monthly plans that scale with how far you want to take your development. Upgrade, downgrade or cancel at any time."
      />

      <Section>
        <div className="mt-4">
          <PlanCards />
        </div>
      </Section>

      <Section id="compare" className="pt-0">
        <SectionHeading eyebrow="Comparison" title="Compare Plans" />
        <div className="panel mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-medium text-muted-foreground">Feature</th>
                {plans.map((p) => (
                  <th key={p.id} className="p-4 text-center font-semibold">
                    {p.name}
                    <span className="block text-xs font-normal text-muted-foreground">
                      {formatPlanPrice(p.price, locale, currency)}/mo
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.feature} className="border-b last:border-0">
                  <td className="p-4 text-muted-foreground">{row.feature}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      {v ? (
                        <Check className="mx-auto size-4 text-primary" />
                      ) : (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/enroll">
              Enroll Now <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link to="/faq">Read the FAQ</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
