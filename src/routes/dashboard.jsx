import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Award,
  Bell,
  BookOpen,
  CalendarClock,
  Settings,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader, Section } from "@/components/Section";
import { useAuth } from "@/lib/AuthContext";
import { courses, plans } from "@/data/academy";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { formatPlanPrice, useDetectedCurrency } from "@/lib/utils";
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      {
        title: "Student Dashboard — Crimson Valley Academy",
      },
      {
        name: "description",
        content:
          "Preview of the Crimson Valley Academy student dashboard: plan, enrolled courses, progress and certificates.",
      },
      {
        property: "og:title",
        content: "Student Dashboard — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Your plan, courses, progress and certificates in one place.",
      },
      {
        name: "robots",
        content: "noindex",
      },
    ],
  }),
  component: DashboardPage,
});
const enrolled = [
  {
    title: "Roblox Scripting",
    module: "Module 3 — Client / Server Architecture",
    progress: 62,
  },
  {
    title: "UI/UX Design",
    module: "Module 1 — UX Foundations",
    progress: 18,
  },
];
const certificates = [
  {
    title: "Luau Fundamentals",
    state: "Issued",
  },
  {
    title: "Roblox Studio Essentials",
    state: "Issued",
  },
  {
    title: "Advanced Systems",
    state: "Locked until Module 4",
  },
];
const sessions = [
  {
    title: "Live debugging clinic",
    when: "Saturday · 18:00 IST",
  },
  {
    title: "UI critique workshop",
    when: "Sunday · 17:00 IST",
  },
];
const notifications = [
  "Your currency system submission is queued for mentor review.",
  "New challenge published in the Scripting track.",
  "Workshop schedule for next week is now available.",
];
function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const locale = typeof window !== "undefined" ? window.navigator.language : undefined;
  const currency = useDetectedCurrency(locale);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user || !user.emailVerified) {
      router.navigate({ to: "/login", replace: true });
      return;
    }

    setLoadingProfile(true);
    getDoc(doc(db, "users", user.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data());
        } else {
          setProfile(null);
        }
      })
      .finally(() => setLoadingProfile(false));
  }, [user, loading, router]);

  if (loading || loadingProfile) {
    return null;
  }

  const selectedPlan = plans.find((item) => item.id === profile?.planType);
  const selectedCourse = courses.find((item) => item.slug === profile?.course);

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title={user ? `Welcome back, ${user.email}.` : "Welcome back, Student."}
        description="Your enrolled plan and course information are shown here when you are logged in."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-start">
          <div className="space-y-6">
            <div className="panel flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="text-xs text-muted-foreground">Selected plan</p>
                <p className="mt-1 font-display text-xl font-semibold">
                  {loading
                    ? "Loading..."
                    : selectedPlan
                    ? `${selectedPlan.tier} — ${selectedPlan.name}`
                    : "No plan selected"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {loading
                    ? ""
                    : selectedPlan
                    ? `${formatPlanPrice(selectedPlan.price, locale, currency)} / month · renews monthly`
                    : "Select a plan to begin your academy journey."}
                </p>
              </div>
              <Button asChild variant="glass" size="sm">
                <Link to="/plans">Manage plan</Link>
              </Button>
            </div>
            <div className="panel flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="text-xs text-muted-foreground">Selected course</p>
                <p className="mt-1 font-display text-xl font-semibold">
                  {loading
                    ? "Loading..."
                    : selectedCourse
                    ? selectedCourse.title
                    : "No course selected"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {loading
                    ? ""
                    : selectedCourse
                    ? selectedCourse.description
                    : "Choose a course from the enrollment flow."}
                </p>
              </div>
              <Button asChild variant="glass" size="sm">
                <Link to="/courses">Browse courses</Link>
              </Button>
            </div>

            <div className="panel p-6">
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-primary" />
                <h2 className="text-base font-semibold">Enrolled courses</h2>
              </div>
              <ul className="mt-5 space-y-5">
                {enrolled.map((c) => (
                  <li key={c.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-medium">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.progress}% complete</p>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{c.module}</p>
                    <Progress value={c.progress} className="mt-3 h-1.5" />
                  </li>
                ))}
              </ul>
              <Button asChild variant="glass" size="sm" className="mt-6">
                <Link to="/courses">Browse more courses</Link>
              </Button>
            </div>

          </div>

          <div className="space-y-6">
            <div className="panel p-6">
              <div className="flex items-center gap-2">
                <Award className="size-4 text-primary" />
                <h2 className="text-base font-semibold">Certificates</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {certificates.map((c) => (
                  <li key={c.title} className="flex items-start justify-between gap-3">
                    <span>{c.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{c.state}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-6">
              <div className="flex items-center gap-2">
                <CalendarClock className="size-4 text-primary" />
                <h2 className="text-base font-semibold">Upcoming sessions</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {sessions.map((s) => (
                  <li key={s.title}>
                    <p>{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.when}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-6">
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-primary" />
                <h2 className="text-base font-semibold">Notifications</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {notifications.map((n) => (
                  <li key={n} className="flex gap-2">
                    <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-6">
              <div className="flex items-center gap-2">
                <Settings className="size-4 text-primary" />
                <h2 className="text-base font-semibold">Profile settings</h2>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Update your display name, Roblox and Discord usernames, email and notification
                preferences once accounts are connected.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
