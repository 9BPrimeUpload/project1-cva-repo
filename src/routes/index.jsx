import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Boxes,
  Compass,
  GitBranch,
  GraduationCap,
  Layers,
  MessagesSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { CourseCard } from "@/components/CourseCard";
import { PlanCards } from "@/components/PlanCards";
import { courses } from "@/data/academy";
import heroScene from "@/assets/image.png";
import projObby from "@/assets/project-obby.jpg";
import projTycoon from "@/assets/project-tycoon.jpg";
import projRpg from "@/assets/project-rpg.jpg";
import projUi from "@/assets/project-ui.jpg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Crimson Valley Academy — Learn Roblox Development",
      },
      {
        name: "description",
        content:
          "Master Roblox development with practical, project-based education in Luau scripting, building, UI/UX, game design, animation and full production.",
      },
      {
        property: "og:title",
        content: "Crimson Valley Academy — Learn Roblox Development",
      },
      {
        property: "og:description",
        content:
          "Build. Learn. Create. Practical Roblox development education from Crimson Valley Studios.",
      },
    ],
  }),
  component: Home,
});
const stats = [
  {
    icon: GraduationCap,
    label: "Expert-Led Learning",
    text: "Lessons built by working Roblox developers.",
  },
  {
    icon: Wrench,
    label: "Practical Projects",
    text: "Every module ends in something you build.",
  },
  {
    icon: Users,
    label: "Developer Community",
    text: "Learn alongside other creators, not alone.",
  },
  {
    icon: Award,
    label: "Certificates",
    text: "Recognition for completed, reviewed work.",
  },
];
const aboutPoints = [
  {
    icon: Wrench,
    title: "Practical learning",
    text: "Concepts are taught, then immediately applied in Studio.",
  },
  {
    icon: Layers,
    title: "Project-based education",
    text: "You finish each track with work you can show.",
  },
  {
    icon: MessagesSquare,
    title: "Developer mentorship",
    text: "Written feedback on the work you submit.",
  },
  {
    icon: Users,
    title: "Community learning",
    text: "Shared challenges, critique and collaboration.",
  },
  {
    icon: GitBranch,
    title: "Skill progression",
    text: "A clear path from first script to full production.",
  },
];
const steps = [
  {
    n: "01",
    title: "Choose Your Course",
    text: "Find the development path that matches your goals.",
  },
  {
    n: "02",
    title: "Enroll",
    text: "Choose a plan and enroll in your selected course.",
  },
  {
    n: "03",
    title: "Learn & Build",
    text: "Complete lessons, challenges and practical projects.",
  },
  {
    n: "04",
    title: "Become a Developer",
    text: "Build your portfolio, earn certificates and continue developing.",
  },
];
const whyItems = [
  {
    icon: Wrench,
    title: "Practical Projects",
    text: "Learning is measured by what you can build.",
  },
  {
    icon: Layers,
    title: "Structured Learning",
    text: "Ordered modules instead of scattered tutorials.",
  },
  {
    icon: MessagesSquare,
    title: "Developer Mentorship",
    text: "Reviews and guidance from experienced developers.",
  },
  {
    icon: Boxes,
    title: "Real Roblox Development",
    text: "Taught entirely inside Roblox Studio and Luau.",
  },
  {
    icon: Users,
    title: "Community Support",
    text: "Student channels for questions and critique.",
  },
  {
    icon: Award,
    title: "Certificates",
    text: "Issued for completed and reviewed coursework.",
  },
  {
    icon: Target,
    title: "Skill-Based Progression",
    text: "Advance when you can demonstrate the skill.",
  },
  {
    icon: ShieldCheck,
    title: "Industry-Inspired Workflows",
    text: "Planning, review and release habits that scale.",
  },
];
const showcase = [
  {
    img: projObby,
    name: "Neon Ascent",
    dev: "Student Developer",
    category: "Scripting · Building",
    text: "A checkpoint-based obstacle course with server-validated progress saving.",
  },
  {
    img: projTycoon,
    name: "Foundry Tycoon",
    dev: "Student Developer",
    category: "Game Design · Scripting",
    text: "A tycoon loop with a balanced economy, upgrades and persistent data.",
  },
  {
    img: projRpg,
    name: "Ashvale",
    dev: "Student Developer",
    category: "Building · VFX",
    text: "An atmospheric RPG hub built around lighting, mood and optimisation.",
  },
  {
    img: projUi,
    name: "Interface Kit",
    dev: "Student Developer",
    category: "UI/UX",
    text: "A responsive inventory, shop and settings system built in Roblox GUI.",
  },
];
const testimonials = [
  {
    quote: "CVA helped me understand Roblox scripting instead of just copying scripts.",
    author: "Student Developer",
    role: "Scripting track",
  },
  {
    quote: "Projects made learning Roblox Studio much easier.",
    author: "Academy Student",
    role: "Building track",
  },
  {
    quote: "Having my work reviewed showed me exactly what to improve next.",
    author: "Academy Student",
    role: "Game design track",
  },
];
function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-surface relative overflow-hidden border-b bg-[radial-gradient(circle_at_top_left,_rgba(14,78,213,0.14),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(221,14,66,0.12),_transparent_30%),var(--background)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(14,78,213,0.12),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(221,14,66,0.16),_transparent_30%),var(--background)]">
        <div className="grid-backdrop absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
          <div className="fade-up">
            <h1 className="mt-6 text-5xl font-semibold text-balance sm:text-6xl lg:text-7xl">
              Build. <span className="text-gradient">Learn.</span> Create.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Master Roblox development with practical education designed to turn aspiring creators
              into confident developers.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/courses">
                  Explore Courses <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/enroll">Enroll Now</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="panel overflow-hidden p-2">
              <img
                src={heroScene}
                alt="Abstract 3D scene showing Roblox development tools, code panels and a wireframe game world"
                width={1280}
                height={960}
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="relative border-t">
          <div className="mx-auto grid max-w-7xl gap-px px-4 sm:px-6 lg:px-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-start gap-3 py-6 md:px-4">
                <s.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About the academy"
              title="Where Creators Become Developers"
              description="Crimson Valley Academy is focused on practical Roblox development education. Students don't simply watch tutorials — they learn concepts, complete challenges, build projects, solve real problems and develop skills they can prove."
            />
            <Button asChild variant="glass" size="lg" className="mt-8">
              <Link to="/about">
                Learn More About Us <ArrowRight />
              </Link>
            </Button>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {aboutPoints.map((p) => (
              <li key={p.title} className="panel panel-hover p-5">
                <p.icon className="size-5 text-primary" />
                <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Founder */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="panel overflow-hidden p-6 text-center">
              <div className="text-5xl font-bold text-primary mb-4">Fumiko</div>
              <p className="text-sm font-semibold text-muted-foreground">Founder & Creator</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Our Founder"
              title="Why Fumiko Started Crimson Valley Academy"
              description=""
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Fumiko founded Crimson Valley Academy with a singular mission: to transform the way developers learn Roblox. 
              Frustrated by the scattered tutorials, outdated resources, and lack of structured mentorship in the community, 
              Fumiko envisioned an academy that combines practical project-based learning with real developer guidance.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every course is designed around real-world development workflows, built by someone who understands the challenges 
              you'll face as a Roblox developer. The goal isn't just to teach code—it's to build a community of confident, 
              capable developers who can create and ship their own Roblox experiences.
            </p>
          </div>
        </div>
      </Section>

      {/* Courses */}
      <Section id="courses">
        <SectionHeading
          eyebrow="Courses"
          title="Explore Our Courses"
          description="Six focused tracks covering the full Roblox development pipeline, from your first line of Luau to a complete published experience."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </Section>

      {/* Plans */}
      <Section id="plans">
        <SectionHeading
          eyebrow="Plans"
          title="Choose Your Learning Plan"
          description="Start free and upgrade when you want assignments, reviews, certificates and mentorship."
        />
        <div className="mt-16">
          <PlanCards />
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="glass" size="lg">
            <Link to="/plans">Compare Plans</Link>
          </Button>
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeading eyebrow="How it works" title="From First Lesson to First Release" />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="panel panel-hover p-6">
              <span className="font-display text-3xl font-semibold text-primary/70">{s.n}</span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Why */}
      <Section>
        <SectionHeading
          eyebrow="Why Crimson Valley Academy"
          title="Education Built Around Real Development"
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((w) => (
            <div key={w.title} className="panel panel-hover p-5">
              <w.icon className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{w.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>


      {/* Testimonials */}
      <Section>
        <SectionHeading
          eyebrow="Student voices"
          title="What Students Say"
          description="Placeholder quotes shown as examples of the feedback format. These are not real student testimonials and will be replaced once verified reviews are collected."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.quote} className="panel p-6">
              <span className="rounded-md border px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground uppercase">
                Placeholder
              </span>
              <blockquote className="mt-4 text-sm leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-xs text-muted-foreground">
                — {t.author} · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="panel relative overflow-hidden p-10 text-center sm:p-16">
          <div className="grid-backdrop absolute inset-0" aria-hidden />
          <div className="relative">
            <Compass className="mx-auto size-7 text-primary" />
            <h2 className="mt-5 text-3xl font-semibold text-balance sm:text-4xl">
              Start building your Roblox development career
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Choose a plan, pick a course and begin with the fundamentals. You can start free.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/enroll">
                  Enroll Now <Rocket />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/plans">See Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
