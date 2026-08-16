import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ExternalLink, X, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader, Section, SectionHeading } from "@/components/Section";
import { positions } from "@/data/academy";
import { submitStaffApplication } from "@/lib/staffApplications";
import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { sendStaffApplicationEmbed } from "@/lib/auth";
export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      {
        title: "Careers — Crimson Valley Academy",
      },
      {
        name: "description",
        content:
          "Open roles at Crimson Valley Academy: educators, developer mentors, curriculum developers, moderators and more.",
      },
      {
        property: "og:title",
        content: "Careers — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Join the team teaching the next generation of Roblox developers.",
      },
    ],
  }),
  component: CareersPage,
});
const applicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  age: z
    .string()
    .trim()
    .min(1, "Please enter your age")
    .regex(/^\d+$/, "Age must be a valid number")
    .refine((value) => Number(value) >= 15, {
      message: "Minimum age requirement is 15.",
    }),
  roblox: z.string().trim().min(3, "Please enter your Roblox username").max(50),
  discord: z.string().trim().min(2, "Please enter your Discord username").max(50),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().trim().min(20, "Tell us a little more about your experience").max(2000),
  portfolio: z.string().trim().max(300).optional().or(z.literal("")),
  motivation: z.string().trim().min(20, "Please tell us why you want to join").max(2000),
  availability: z.string().min(1, "Please select your availability").default("Full-time"),
});
const formatFirebaseAuthError = (error) => {
  const message = error?.message || "";

  if (message.includes("requires-recent-login")) {
    return "For security, please sign in again and then try verifying your email one more time.";
  }

  if (message.includes("email-already-in-use")) {
    return "That email address is already in use. Please choose another one.";
  }

  if (message.includes("invalid-email")) {
    return "Please enter a valid email address.";
  }

  if (message.includes("too-many-requests")) {
    return "Too many verification attempts. Please wait a moment and try again.";
  }

  return "We couldn’t verify that email right now. Please try again in a moment.";
};

function CareersPage() {
  // Step states: 'initial' -> 'verify-email' -> 'application' -> 'discord' -> 'success'
  const [currentStep, setCurrentStep] = useState("initial");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState(auth.currentUser?.email ?? "");

  // Check if user is already authenticated and verified
  useEffect(() => {
    if (auth.currentUser && auth.currentUser.emailVerified) {
      if (currentStep === "verify-email") {
        setCurrentStep("application");
      }
    }
    setVerificationEmail(auth.currentUser?.email ?? "");
  }, [currentStep]);

  const handleApplyClick = () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to apply");
      return;
    }

    setVerificationEmail(auth.currentUser.email ?? "");

    if (auth.currentUser.emailVerified) {
      setCurrentStep("application");
    } else {
      setCurrentStep("verify-email");
      setVerificationSent(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in");
      return;
    }

    const nextEmail = verificationEmail.trim();
    if (!nextEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      toast.error("Enter a valid email address to verify");
      return;
    }

    try {
      setIsLoading(true);

      if (nextEmail === auth.currentUser.email) {
        if (!auth.currentUser.emailVerified) {
          await sendEmailVerification(auth.currentUser);
          toast.success("Verification email sent to " + nextEmail);
        } else {
          toast.success("Your account email is already verified.");
        }
      } else {
        toast.success("We will use " + nextEmail + " for your application updates.");
      }

      setVerificationSent(true);
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error(formatFirebaseAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in");
      return;
    }

    try {
      setIsLoading(true);

      const nextEmail = verificationEmail.trim();
      const isSameAsCurrentAccountEmail = nextEmail === auth.currentUser.email;

      if (isSameAsCurrentAccountEmail) {
        await auth.currentUser.reload();

        if (auth.currentUser.emailVerified) {
          toast.success("Email verified! Proceeding to application...");
          setCurrentStep("application");
          return;
        }

        toast.error("Email not yet verified. Please check your inbox and verify.");
        return;
      }

      toast.success("Application email confirmed. Proceeding to the form...");
      setCurrentStep("application");
    } catch (error) {
      console.error("Error checking verification:", error);
      toast.error(formatFirebaseAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    const parsed = applicationSchema.safeParse({
      name: form.get("name"),
      age: form.get("age"),
      roblox: form.get("roblox"),
      discord: form.get("discord"),
      position: selectedPosition,
      experience: form.get("experience"),
      portfolio: form.get("portfolio"),
      motivation: form.get("motivation"),
      availability: form.get("availability"),
    });

    if (!parsed.success) {
      const next = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setFormData(parsed.data);
    setCurrentStep("discord");
  };

  const handleDiscordConfirm = async () => {
    if (!formData) return;

    try {
      setIsLoading(true);

      // Final check - user must be authenticated and verified
      if (!auth.currentUser) {
        toast.error("You must be logged in to apply");
        return;
      }

      if (!auth.currentUser.emailVerified) {
        toast.error("Your email must be verified to apply");
        return;
      }

      // Submit to Firestore
      await submitStaffApplication(formData);

      try {
        await sendStaffApplicationEmbed({
          fullName: formData.name,
          email: auth.currentUser.email,
          age: formData.age,
          robloxUsername: formData.roblox,
          discordUsername: formData.discord,
          position: formData.position,
          availability: formData.availability,
          experience: formData.experience,
          portfolioLink: formData.portfolio || "",
          motivation: formData.motivation,
        });
      } catch (discordError) {
        console.error('Failed to send staff Discord embed:', discordError);
        toast.warning('Application saved, but the Discord notification could not be sent.');
      }

      setCurrentStep("success");
      setFormData(null);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setCurrentStep("initial");
    setSelectedPosition("");
    setFormData(null);
  };
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build Your Career With Crimson Valley Academy"
        description="We work with educators, mentors and developers who care about teaching real skill. Roles are remote and structured around clear responsibilities. Minimum age requirement: 15+."
      />

      <Section>
        <SectionHeading
          align="left"
          eyebrow="Open positions"
          title="Roles we're currently reviewing"
          description="Applications stay open continuously. If a role fits your experience, apply with your Roblox username and portfolio."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {positions.map((p) => (
            <article key={p.id} className="panel panel-hover flex flex-col p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <span className="rounded-full border px-2.5 py-1 text-[11px] text-primary">
                  {p.type}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold tracking-[0.16em] text-silver uppercase">
                    Responsibilities
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {p.responsibilities.map((r) => (
                      <li key={r}>· {r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-[0.16em] text-silver uppercase">
                    Requirements
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {p.requirements.map((r) => (
                      <li key={r}>· {r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto pt-7">
                <Button
                  variant="glass"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setSelectedPosition(p.title);
                    handleApplyClick();
                  }}
                >
                  Apply
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="apply" className="pt-0">
        <div className="panel mx-auto max-w-3xl p-8 sm:p-10">
          <SectionHeading
            align="left"
            eyebrow="Application"
            title="Apply to join the team"
            description="Applications are reviewed by the academy team. We follow up through Discord."
          />
        </div>
      </Section>

      {/* Email Verification Modal */}
      {currentStep === "verify-email" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="panel max-w-md w-full p-8 rounded-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/20 rounded-full p-4">
                <Mail className="size-8 text-primary" />
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-center mb-2">Verify Your Email</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              We need to verify your email address before you can apply to join the team.
            </p>

            <div className="mb-6 space-y-2">
              <Label htmlFor="verification-email">Email to verify</Label>
              <Input
                id="verification-email"
                type="email"
                value={verificationEmail}
                onChange={(event) => setVerificationEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {!verificationSent ? (
              <>
                <p className="text-xs text-muted-foreground text-center mb-4">
                  Enter the email address you want to use for application updates.
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handleSendVerificationEmail}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Continue"}
                </Button>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground text-center mb-4">
                  {verificationEmail === auth.currentUser?.email
                    ? "Click the verification link in your email, then continue."
                    : "This email will be used for application communication. Confirm to continue."}
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckVerification}
                  disabled={isLoading}
                >
                  {isLoading ? "Checking..." : "Continue"}
                </Button>
              </>
            )}

            <button
              onClick={() => setCurrentStep("initial")}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {currentStep === "application" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="panel max-w-2xl w-full p-8 rounded-2xl my-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold">Staff Application</h3>
                <p className="text-sm text-muted-foreground mt-1">Position: {selectedPosition}</p>
              </div>
              <button
                onClick={() => setCurrentStep("initial")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleApplicationSubmit} noValidate>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" maxLength={100} className="mt-2" />
                {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" min={15} max={120} className="mt-2" />
                {errors.age && <p className="mt-1.5 text-xs text-destructive">{errors.age}</p>}
              </div>
              <div>
                <Label htmlFor="roblox">Roblox Username</Label>
                <Input id="roblox" name="roblox" maxLength={50} className="mt-2" />
                {errors.roblox && <p className="mt-1.5 text-xs text-destructive">{errors.roblox}</p>}
              </div>
              <div>
                <Label htmlFor="discord">Discord Username</Label>
                <Input id="discord" name="discord" maxLength={50} className="mt-2" />
                {errors.discord && <p className="mt-1.5 text-xs text-destructive">{errors.discord}</p>}
              </div>
              <div>
                <Label htmlFor="availability">Your Availability</Label>
                <Select name="availability" defaultValue="Full-time">
                  <SelectTrigger id="availability" className="mt-2">
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                {errors.availability && <p className="mt-1.5 text-xs text-destructive">{errors.availability}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="experience">Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  maxLength={2000}
                  className="mt-2"
                />
                {errors.experience && <p className="mt-1.5 text-xs text-destructive">{errors.experience}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="portfolio">Portfolio (link)</Label>
                <Input
                  id="portfolio"
                  name="portfolio"
                  maxLength={300}
                  placeholder="Roblox group, game link or portfolio URL"
                  className="mt-2"
                />
                {errors.portfolio && <p className="mt-1.5 text-xs text-destructive">{errors.portfolio}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="motivation">Why do you want to join?</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  rows={4}
                  maxLength={2000}
                  className="mt-2"
                />
                {errors.motivation && <p className="mt-1.5 text-xs text-destructive">{errors.motivation}</p>}
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <Button type="submit" variant="hero" size="lg" className="flex-1">
                  Next: Discord Confirmation
                </Button>
                <Button
                  type="button"
                  variant="glass"
                  size="lg"
                  onClick={() => setCurrentStep("initial")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Discord Confirmation Modal */}
      {currentStep === "discord" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="panel max-w-md w-full p-8 rounded-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/20 rounded-full p-4">
                <ExternalLink className="size-8 text-primary" />
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-center mb-2">Join Discord Server</h3>
            <p className="mb-6 text-center text-sm font-extrabold text-primary">
              <strong>It is MANDATORY</strong> for <strong>ALL STUDENTS and STAFF</strong> who enroll through the website to join the Discord server and open a ticket regarding their role.
            </p>

            <div className="space-y-3 mb-4">
              <p className="text-xs text-muted-foreground text-center">✓ Direct team support</p>
              <p className="text-xs text-muted-foreground text-center">✓ Application status updates</p>
              <p className="text-xs text-muted-foreground text-center">✓ Team collaboration</p>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full mb-3"
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
              onClick={handleDiscordConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "I've Joined - Submit Application"}
            </Button>

            <button
              onClick={() => setCurrentStep("application")}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {currentStep === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="panel max-w-md w-full p-8 rounded-2xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-500/20 rounded-full p-4">
                <CheckCircle2 className="size-8 text-green-500" />
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-2">Application Submitted!</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Thank you for applying to Crimson Valley Academy. Your application has been received.
            </p>

            <div className="bg-muted p-4 rounded-lg mb-6 text-left space-y-3">
              <p className="text-xs font-semibold text-foreground">Next Steps:</p>
              <p className="text-xs text-muted-foreground">
                • Check your Discord server for updates on your application status
              </p>
              <p className="text-xs text-muted-foreground">
                • Open a ticket in our Discord server if you have any questions
              </p>
              <p className="text-xs text-muted-foreground">
                • Our team will review your application and reach out through Discord
              </p>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full mb-3"
              onClick={() => {
                window.open("https://discord.gg/BuTTgwnv8j", "_blank");
              }}
            >
              <ExternalLink className="size-4 mr-2" />
              Open Discord Server
            </Button>

            <Button
              variant="glass"
              size="lg"
              className="w-full"
              onClick={handleCloseSuccess}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
