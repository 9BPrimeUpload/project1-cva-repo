import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader, Section } from "@/components/Section";
import { faqs } from "@/data/academy";
export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      {
        title: "FAQ — Crimson Valley Academy",
      },
      {
        name: "description",
        content:
          "Answers about Crimson Valley Academy courses, plans, certificates, mentorship, cancellations and enrollment.",
      },
      {
        property: "og:title",
        content: "FAQ — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Common questions about learning Roblox development with the academy.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});
function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything students usually ask before enrolling — courses, plans, certificates and mentorship."
      />
      <Section>
        <div className="panel mx-auto max-w-3xl p-6 sm:p-10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/enroll">Enroll Now</Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/contact">Still have a question?</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
