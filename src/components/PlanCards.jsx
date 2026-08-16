import { Link } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/data/academy";
import { formatPlanPrice, useDetectedCurrency } from "@/lib/utils";

export function PlanCards() {
  const locale = typeof window !== "undefined" ? window.navigator.language : undefined;
  const currency = useDetectedCurrency(locale);

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {plans.map((plan) => (
        <article
          key={plan.id}
          className={`panel panel-hover relative flex flex-col p-6 ${plan.popular ? "border-primary/50 shadow-[var(--shadow-glow)] lg:-mt-4 lg:mb-4" : ""}`}
        >
          {plan.popular && (
            <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground">
              Most Popular
            </span>
          )}

          <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
            {plan.tier}
          </p>
          <h3 className="mt-2 text-xl font-semibold">{plan.name}</h3>
          <p className="mt-4 flex items-baseline gap-1">
            <span className="font-display text-4xl font-semibold">
              {formatPlanPrice(plan.price, locale, currency)}
            </span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>

          <ul className="mt-6 space-y-2.5 text-sm">
            {plan.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
            {plan.excluded?.map((f) => (
              <li key={f} className="flex gap-2.5 opacity-60">
                <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <Button asChild variant={plan.popular ? "hero" : "glass"} size="lg" className="w-full">
              <Link
                to="/enroll"
                search={{
                  plan: plan.id,
                }}
              >
                {plan.cta}
              </Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
