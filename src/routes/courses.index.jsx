import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, Section, SectionHeading } from "@/components/Section";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/academy";
export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      {
        title: "Courses — Crimson Valley Academy",
      },
      {
        name: "description",
        content:
          "Roblox development courses: Luau scripting, building, UI/UX design, game design, animation & VFX and complete game development.",
      },
      {
        property: "og:title",
        content: "Courses — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content:
          "Six structured Roblox development tracks, taught through projects and challenges.",
      },
    ],
  }),
  component: CoursesPage,
});
function CoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Courses"
        title="Explore Our Courses"
        description="Each track combines lessons, challenges and a build project. Start where your skill level is and progress at your own pace."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <div className="panel flex flex-col items-center gap-5 p-10 text-center">
          <SectionHeading
            title="Not sure where to start?"
            description="Most students begin with Roblox Scripting or Roblox Building, then move into design, UI and full production."
          />
          <Button asChild variant="hero" size="lg">
            <Link to="/plans">
              Compare Plans <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
