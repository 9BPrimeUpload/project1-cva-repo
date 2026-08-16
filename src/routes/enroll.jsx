import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Check, ShieldCheck, ExternalLink, X } from "lucide-react";
import { signup, sendEnrollmentEmbed, resendVerification } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, Section } from "@/components/Section";
import { courses, plans } from "@/data/academy";
import { formatPlanPrice, useDetectedCurrency } from "@/lib/utils";
export const Route = createFileRoute("/enroll")({
  validateSearch: (search) => ({
    plan: typeof search["plan"] === "string" ? search["plan"] : undefined,
    course: typeof search["course"] === "string" ? search["course"] : undefined,
  }),
  head: () => ({
    meta: [
      {
        title: "Enroll — Crimson Valley Academy",
      },
      {
        name: "description",
        content:
          "Enroll at Crimson Valley Academy: choose a plan, create your student account, select a course and complete checkout.",
      },
      {
        property: "og:title",
        content: "Enroll — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Six steps from choosing a plan to starting your first lesson.",
      },
    ],
  }),
  component: EnrollPage,
});
const stepLabels = [
  "Select Plan",
  "Account",
  "Select Course",
  "Student Information",
  "Confirmation",
];

// TODO: Payment/checkout UI removed for now. Restore payment integration later.
const accountSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[0-9]/, "Password must include a number"),
});

const studentSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  age: z
    .string()
    .trim()
    .min(1, "Please enter your age")
    .regex(/^\d+$/, "Age must be a valid number")
    .refine((value) => Number(value) >= 13, {
      message: "Minimum age requirement is 13.",
    }),
  roblox: z.string().trim().min(3, "Please enter your Roblox username").max(50),
  previousRobloxExperience: z
    .string()
    .trim()
    .min(10, "Tell us about your previous Roblox development experience")
    .max(1000),
  discord: z.string().trim().max(50).optional().or(z.literal("")),
});
function EnrollPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState(search.plan || search.course ? 1 : 0);
  const [planId, setPlanId] = useState(search.plan ?? "");
  const [courseSlug, setCourseSlug] = useState(search.course ?? "");
  const locale = typeof window !== "undefined" ? window.navigator.language : undefined;
  const currency = useDetectedCurrency(locale);
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [accountErrors, setAccountErrors] = useState({});
  const [student, setStudent] = useState({
    email: "",
    age: "",
    roblox: "",
    previousRobloxExperience: "",
    discord: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [signedUpEmail, setSignedUpEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [discordJoined, setDiscordJoined] = useState(false);
  const plan = plans.find((p) => p.id === planId);
  const course = courses.find((c) => c.slug === courseSlug);
  // Max step index is now 4 (0..4) after removing the payment step
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => {
    // If on confirmation page (step 4), navigate to login instead of going back
    if (step === 4) {
      navigate({ to: "/login" });
    } else {
      setStep((s) => Math.max(s - 1, 0));
    }
  };

  async function handleSignup() {
    const accountResult = accountSchema.safeParse(account);
    const studentResult = studentSchema.safeParse(student);

    if (!accountResult.success || !studentResult.success) {
      const nextAccountErrors = {};
      const nextStudentErrors = {};

      if (!accountResult.success) {
        for (const issue of accountResult.error.issues) {
          nextAccountErrors[String(issue.path[0])] = issue.message;
        }
      }

      if (!studentResult.success) {
        for (const issue of studentResult.error.issues) {
          nextStudentErrors[String(issue.path[0])] = issue.message;
        }
      }

      setAccountErrors(nextAccountErrors);
      setErrors(nextStudentErrors);
      toast.error("Please complete all required fields before confirming enrollment.");
      return;
    }

    if (!planId || !courseSlug) {
      toast.error("Please select a plan and course before confirming enrollment.");
      return;
    }

    try {
      setIsSubmitting(true);
      setVerificationSent(false);

      await signup({
        email: account.email,
        password: account.password,
        planType: planId,
        course: courseSlug,
        age: student.age,
        previousRobloxExperience: student.previousRobloxExperience,
        robloxUsername: student.roblox,
        discordUsername: student.discord,
      });

      setSignedUpEmail(account.email);
      
      // Call backend to send Discord embed notification
      try {
        const enrollmentData = {
          email: account.email,
          planType: plan?.name || planId,
          course: course?.title || courseSlug,
          robloxUsername: student.roblox,
          discordUsername: student.discord || '',
        };
        await sendEnrollmentEmbed(enrollmentData);
      } catch (discordError) {
        console.error('Failed to send Discord embed:', discordError);
        // Don't block enrollment if Discord notification fails
        toast.warning("Account created but Discord notification failed. You can still proceed.");
      }
      
      setShowVerify(true);
      toast.success("Account created. Check your email to verify your account.");
    } catch (error) {
      toast.error(mapAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function mapAuthError(error) {
    const code = error?.code || "";
    if (code.includes("email-already-in-use")) return "This email is already registered.";
    if (code.includes("invalid-email")) return "Please enter a valid email address.";
    if (code.includes("weak-password")) return "Password should be at least 6 characters.";
    if (code.includes("network-request-failed")) return "Network error. Please try again.";
    return "Unable to create account. Please try again.";
  }

  async function handleResendVerification() {
    setVerificationLoading(true);
    try {
      await resendVerification();
      setVerificationSent(true);
      toast.success("Verification email resent.");
    } catch (error) {
      toast.error("Unable to resend verification email. Please try again.");
    } finally {
      setVerificationLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Enrollment"
        title="Enroll at Crimson Valley Academy"
        description="Pick a plan, set up your student account and choose the course you want to start with. Minimum age requirement: 13+."
      />

      <Section>
        <ol className="mb-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stepLabels.map((label, i) => (
            <li
              key={label}
              className={`rounded-xl border px-4 py-3 text-xs transition-colors ${i === step ? "border-primary/60 text-primary" : i < step ? "text-muted-foreground" : "text-muted-foreground/60"}`}
            >
              <span className="block font-display text-sm">
                {i < step ? <Check className="inline size-4" /> : String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 block">{label}</span>
            </li>
          ))}
        </ol>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="panel p-7 sm:p-9">
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-semibold">Select your plan</h2>
                <div className="mt-6 grid gap-3">
                  {plans.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlanId(p.id)}
                      className={`flex items-center justify-between gap-4 rounded-xl border p-4 text-left transition-colors ${planId === p.id ? "border-primary/70 bg-secondary" : "hover:border-primary/40"}`}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {p.tier} — {p.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {p.tagline}
                        </span>
                      </span>
                      <span className="shrink-0 font-display text-lg">
                        {formatPlanPrice(p.price, locale, currency)}
                      </span>
                    </button>
                  ))}
                </div>
                <Button variant="hero" size="lg" className="mt-8" disabled={!planId} onClick={next}>
                  Continue
                </Button>
              </div>
            )}

            {step === 1 && (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  const parsed = accountSchema.safeParse(account);
                  if (!parsed.success) {
                    const nextErrors = {};
                    for (const issue of parsed.error.issues)
                      nextErrors[String(issue.path[0])] = issue.message;
                    setAccountErrors(nextErrors);
                    return;
                  }
                  setAccountErrors({});
                  next();
                }}
              >
                <h2 className="text-2xl font-semibold">Create or log in to your account</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Student accounts are not connected to a backend yet. Enable authentication to make
                  this step live — the flow below is ready for it.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="acc-email">Email</Label>
                    <Input
                      id="acc-email"
                      type="email"
                      className="mt-2"
                      value={account.email}
                      onChange={(e) =>
                        setAccount((current) => ({
                          ...current,
                          email: e.target.value,
                        }))
                      }
                    />
                    {accountErrors.email && (
                      <p className="mt-1.5 text-xs text-destructive">{accountErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="acc-pass">Password</Label>
                    <Input
                      id="acc-pass"
                      type="password"
                      className="mt-2"
                      value={account.password}
                      onChange={(e) =>
                        setAccount((current) => ({
                          ...current,
                          password: e.target.value,
                        }))
                      }
                    />
                    {accountErrors.password && (
                      <p className="mt-1.5 text-xs text-destructive">{accountErrors.password}</p>
                    )}
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button type="button" variant="glass" size="lg" onClick={back}>
                    Back
                  </Button>
                  <Button type="submit" variant="hero" size="lg">
                    Continue
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold">Select your course</h2>
                <div className="mt-6 grid gap-3">
                  {courses.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setCourseSlug(c.slug)}
                      className={`rounded-xl border p-4 text-left transition-colors ${courseSlug === c.slug ? "border-primary/70 bg-secondary" : "hover:border-primary/40"}`}
                    >
                      <span className="block text-sm font-semibold">{c.title}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {c.description}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="glass" size="lg" onClick={back}>
                    Back
                  </Button>
                  <Button variant="hero" size="lg" disabled={!courseSlug} onClick={next}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  const parsed = studentSchema.safeParse(student);
                  if (!parsed.success) {
                    const nextErrors = {};
                    for (const issue of parsed.error.issues)
                      nextErrors[String(issue.path[0])] = issue.message;
                    setErrors(nextErrors);
                    return;
                  }
                  setErrors({});
                  // Show Discord modal before proceeding
                  setShowDiscordModal(true);
                  setDiscordJoined(false);
                }}
              >
                <h2 className="text-2xl font-semibold">Student information</h2>
                <p className="mt-2 text-sm font-semibold text-primary">Minimum age requirement: 13+</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["email", "Email", "email"],
                    ["age", "Age", "number"],
                    ["roblox", "Roblox username", "text"],
                    [
                      "previousRobloxExperience",
                      "Previous Roblox development experience",
                      "textarea",
                    ],
                    ["discord", "Discord username (optional)", "text"],
                  ].map(([key, label, type]) => (
                    <div key={key}>
                      <Label htmlFor={key}>{label}</Label>
                      {type === "textarea" ? (
                        <Textarea
                          id={key}
                          maxLength={1000}
                          rows={4}
                          className="mt-2"
                          value={student[key]}
                          onChange={(e) =>
                            setStudent((s) => ({
                              ...s,
                              [key]: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <Input
                          id={key}
                          type={type}
                          maxLength={255}
                          className="mt-2"
                          value={student[key]}
                          onChange={(e) =>
                            setStudent((s) => ({
                              ...s,
                              [key]: e.target.value,
                            }))
                          }
                        />
                      )}
                      {errors[key] && (
                        <p className="mt-1.5 text-xs text-destructive">{errors[key]}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button type="button" variant="glass" size="lg" onClick={back}>
                    Back
                  </Button>
                  <Button type="submit" variant="hero" size="lg">
                    Continue
                  </Button>
                </div>
              </form>
            )}
            {step === 4 && (
              <div>
                <span className="rounded-md border px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground uppercase">
                  Preview
                </span>
                <h2 className="mt-4 text-2xl font-semibold">Welcome to Crimson Valley Academy.</h2>
                <p className="mt-2 text-sm text-muted-foreground">This is how your enrollment confirmation will appear.</p>
                <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border p-4">
                    <dt className="text-xs text-muted-foreground">Selected plan</dt>
                    <dd className="mt-1 text-sm font-semibold">
                      {plan ? `${plan.tier} — ${plan.name}` : "—"}
                    </dd>
                  </div>
                  <div className="rounded-xl border p-4">
                    <dt className="text-xs text-muted-foreground">Selected course</dt>
                    <dd className="mt-1 text-sm font-semibold">{course?.title ?? "—"}</dd>
                  </div>
                  <div className="rounded-xl border p-4 sm:col-span-2">
                    <dt className="text-xs text-muted-foreground">Enrollment status</dt>
                    <dd className="mt-1 text-sm font-semibold text-primary">Enrolled</dd>
                  </div>
                </dl>
                <div className="mt-8">
                  {showVerify ? (
                    <div className="space-y-4 rounded-2xl border border-border bg-surface p-6 text-sm text-foreground">
                      <p>
                        We sent a verification link to <strong>{signedUpEmail}</strong>.
                      </p>
                      <p>If you already verified, refresh the page or sign in again.</p>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                          type="button"
                          variant="hero"
                          size="lg"
                          className="w-full"
                          onClick={handleResendVerification}
                          disabled={verificationLoading}
                        >
                          {verificationLoading ? "Resending..." : "Resend verification email"}
                        </Button>
                        <Button
                          type="button"
                          variant="glass"
                          size="lg"
                          className="w-full"
                          onClick={() => navigate({ to: "/login" })}
                        >
                          Back to review
                        </Button>
                      </div>
                      {verificationSent && (
                        <p className="text-sm text-primary">Verification email resent. Check your inbox.</p>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={handleSignup}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating account..." : "Confirm enrollment"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Discord Join Modal */}
          {showDiscordModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="panel max-w-md w-full p-8 rounded-2xl">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold">Join Our Discord</h3>
                  <button
                    onClick={() => setShowDiscordModal(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Welcome to Crimson Valley Academy! Our Discord server is where all students connect, ask questions, share projects, and stay updated on classes and announcements.
                </p>

                <p className="mb-4 text-sm font-extrabold text-primary">
                  <strong>It IS MANDATORY</strong> for <strong>ALL STUDENTS and STAFF</strong> who enroll through the website to join the Discord server and open a ticket regarding their role.
                </p>

                <div className="space-y-3">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      window.open("https://discord.gg/BuTTgwnv8j", "_blank");
                    }}
                  >
                    <ExternalLink className="size-4 mr-2" />
                    Join Discord Server
                  </Button>

                  <Button
                    variant="glass"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      setDiscordJoined(true);
                      setShowDiscordModal(false);
                      next();
                    }}
                  >
                    {discordJoined ? "✓ I've Joined" : "I've Already Joined"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    After clicking "Join Discord Server", verify your membership in the server, then click "I've Joined" to continue with enrollment.
                  </p>
                </div>
              </div>
            </div>
          )}

          <aside className="panel p-7 lg:sticky lg:top-24">
            <h2 className="text-base font-semibold">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Plan</dt>
                <dd className="text-right">
                  {plan ? `${plan.tier} — ${plan.name}` : "Not selected"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Course</dt>
                <dd className="text-right">{course?.title ?? "Not selected"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Billing period</dt>
                <dd className="text-right">Monthly</dd>
              </div>
              <div className="rule-glow my-4" />
              <div className="flex justify-between gap-4 text-base font-semibold">
                <dt>Total</dt>
                <dd>{plan ? `${formatPlanPrice(plan.price, locale, currency)} / month` : "—"}</dd>
              </div>
            </dl>
            <p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              Cancel any time. Plan changes apply from the next billing period.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
