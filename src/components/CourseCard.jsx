import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export function CourseCard({ course }) {
  return (
    <article className="panel panel-hover flex flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border px-2.5 py-1 text-[11px] tracking-wide text-primary">
          {course.level}
        </span>
        <span className="text-xs text-muted-foreground">{course.duration.split(" (")[0]}</span>
      </div>

      <h3 className="mt-5 text-xl font-semibold">{course.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {course.topics.slice(0, 6).map((t) => (
          <li
            key={t}
            className="rounded-md bg-secondary px-2 py-1 text-[11px] text-secondary-foreground"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex gap-2 pt-7">
        <Button asChild variant="glass" size="sm" className="flex-1">
          <Link
            to="/courses/$slug"
            params={{
              slug: course.slug,
            }}
          >
            View Course <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="hero" size="sm" className="flex-1">
          <Link
            to="/enroll"
            search={{
              course: course.slug,
            }}
          >
            Enroll
          </Link>
        </Button>
      </div>
    </article>
  );
}
