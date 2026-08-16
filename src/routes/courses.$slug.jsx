import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Award, Check, Clock, Signal, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { courses } from "@/data/academy";
export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return {
      course,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          {
            title: "Course not found — Crimson Valley Academy",
          },
          {
            name: "robots",
            content: "noindex",
          },
        ],
      };
    }
    const { course } = loaderData;
    return {
      meta: [
        {
          title: `${course.title} — Crimson Valley Academy`,
        },
        {
          name: "description",
          content: course.description,
        },
        {
          property: "og:title",
          content: `${course.title} — Crimson Valley Academy`,
        },
        {
          property: "og:description",
          content: course.description,
        },
      ],
    };
  },
  component: CourseDetail,
});
function CourseDetail() {
  const { course } = Route.useLoaderData();
  return (
    <>
      <div className="hero-surface relative border-b">
        <div className="grid-backdrop absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> All courses
          </Link>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold text-balance sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {course.description}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <div className="flex items-center gap-2">
              <Signal className="size-4 text-primary" />
              <dt className="text-muted-foreground">Level:</dt>
              <dd>{course.level}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <dt className="text-muted-foreground">Duration:</dt>
              <dd>{course.duration}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Award className="size-4 text-primary" />
              <dt className="text-muted-foreground">Included in:</dt>
              <dd>{course.plan}</dd>
            </div>
          </dl>
        </div>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <div className="space-y-10">
            <div className="panel p-7">
              <h2 className="text-xl font-semibold">What you'll learn</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-7">
              <h2 className="text-xl font-semibold">Curriculum</h2>
              <ol className="mt-6 space-y-6">
                {course.curriculum.map((m, i) => (
                  <li key={m.module}>
                    <p className="text-sm font-semibold">
                      <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>{" "}
                      {m.module}
                    </p>
                    <ul className="mt-2.5 space-y-1.5 border-l pl-4">
                      {m.lessons.map((l) => (
                        <li key={l} className="text-sm text-muted-foreground">
                          {l}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="panel p-7">
                <h2 className="text-lg font-semibold">Projects</h2>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {course.projects.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel p-7">
                <h2 className="text-lg font-semibold">Requirements</h2>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {course.requirements.map((r) => (
                    <li key={r} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="panel p-7">
              <h2 className="text-lg font-semibold">Topics covered</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {course.topics.map((t) => (
                  <li key={t} className="rounded-md bg-secondary px-2.5 py-1 text-xs">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="panel p-7">
              <p className="text-sm text-muted-foreground">Included from</p>
              <p className="mt-1 font-display text-3xl font-semibold">{course.plan}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Access to this course is unlocked by your subscription plan. Billing is monthly and
                can be cancelled at any time.
              </p>
              <Button asChild variant="hero" size="lg" className="mt-6 w-full">
                <Link
                  to="/enroll"
                  search={{
                    course: course.slug,
                  }}
                >
                  Enroll in this course
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="mt-3 w-full">
                <Link to="/plans">Compare plans</Link>
              </Button>
            </div>

            <div className="panel p-7">
              <h2 className="text-base font-semibold">Certificate</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Complete all modules and submit the course project for review to receive a course
                certificate. Advanced certificates are issued on Pro and above; Elite certificates
                require a reviewed capstone.
              </p>
            </div>

            <div className="panel p-7">
              <h2 className="text-base font-semibold">Mentor</h2>
              <div className="mt-4 flex gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary">
                  <UserRound className="size-5 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{course.mentor.name}</p>
                  <p className="text-xs text-primary">{course.mentor.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {course.mentor.bio}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
