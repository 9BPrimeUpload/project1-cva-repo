import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, Section, SectionHeading } from "@/components/Section";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About — Crimson Valley Academy",
      },
      {
        name: "description",
        content:
          "Crimson Valley Academy is the educational division of Crimson Valley Studios, focused on practical, project-based Roblox developer education.",
      },
      {
        property: "og:title",
        content: "About — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Our mission, vision, approach and values as a Roblox development academy.",
      },
    ],
  }),
  component: AboutPage,
});
const values = [
  {
    icon: Sparkles,
    title: "Creativity",
    text: "Original ideas are encouraged over copied templates.",
  },
  {
    icon: BookOpen,
    title: "Learning",
    text: "Understanding first, shortcuts second.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Honest feedback and honest claims about outcomes.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    text: "Developers grow faster reviewing each other's work.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "Curriculum evolves with the Roblox platform.",
  },
  {
    icon: Star,
    title: "Excellence",
    text: "Work is reviewed against a real production standard.",
  },
];
const approach = [
  {
    title: "Concept, then application",
    text: "Every lesson introduces an idea and immediately asks you to apply it inside Roblox Studio.",
  },
  {
    title: "Challenges before projects",
    text: "Short challenges isolate one skill so mistakes are cheap and feedback is fast.",
  },
  {
    title: "Projects that resemble real work",
    text: "Each track ends with a build that mirrors what studios actually ship.",
  },
  {
    title: "Review and iteration",
    text: "Submitted work is reviewed with written notes, then improved and resubmitted.",
  },
];
function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Where Creators Become Developers"
        description="Crimson Valley Academy teaches Roblox development the way it is practised: plan, build, test, review and improve."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel p-8">
            <Blocks className="size-6 text-primary" />
            <h2 className="mt-5 text-2xl font-semibold">Our Mission</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              To make high-quality Roblox development education accessible to aspiring creators.
            </p>
          </div>
          <div className="panel p-8">
            <Users className="size-6 text-primary" />
            <h2 className="mt-5 text-2xl font-semibold">Our Vision</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              To build a community where creators can learn, collaborate and create meaningful
              experiences.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          align="left"
          eyebrow="Our approach"
          title="Project-based, practical development education"
          description="Watching a tutorial teaches you what someone else did. Building teaches you how to solve the next problem yourself. Our courses are structured so that most of your time is spent building, debugging and refining."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {approach.map((a) => (
            <div key={a.title} className="panel panel-hover p-6">
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Our values" title="What We Hold To" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="panel panel-hover p-6">
              <v.icon className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
