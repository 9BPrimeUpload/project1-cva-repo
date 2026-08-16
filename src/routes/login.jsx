import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { login, logout, resendVerification, resetPassword } from "@/lib/auth";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader, Section } from "@/components/Section";
export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      {
        title: "Student Login — Crimson Valley Academy",
      },
      {
        name: "description",
        content: "Sign in to your Crimson Valley Academy student account to continue your courses.",
      },
      {
        property: "og:title",
        content: "Student Login — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Access your academy dashboard, courses and certificates.",
      },
    ],
  }),
  component: LoginPage,
});
function LoginPage() {
  const [mode, setMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [allowLoginWithoutVerify, setAllowLoginWithoutVerify] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.emailVerified) {
      router.navigate({ to: "/dashboard" });
      return;
    }

    if (mode === "login" && user && !user.emailVerified && !allowLoginWithoutVerify) {
      setMode("verify");
    }
  }, [mode, user, loading, router, allowLoginWithoutVerify]);

  function mapAuthError(error) {
    const code = error?.code || "";
    if (code.includes("email-already-in-use")) return "This email is already registered.";
    if (code.includes("invalid-email")) return "Please enter a valid email address.";
    if (code.includes("weak-password")) return "Password should be at least 6 characters.";
    if (code.includes("wrong-password") || code.includes("user-not-found")) return "Invalid email or password.";
    if (code.includes("user-disabled")) return "This account has been disabled.";
    if (code.includes("network-request-failed")) return "Network error. Please try again.";
    return "Unable to complete authentication. Please try again.";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setResetSent(false);
    setVerificationSent(false);

    try {
      if (mode === "login") {
        setAllowLoginWithoutVerify(false);
        const user = await login(email, password);
        setUserEmail(email);
        if (!user.emailVerified) {
          toast.success("Please verify your email before continuing.");
          setMode("verify");
          return;
        }
        toast.success("Signed in successfully.");
      }
    } catch (error) {
      toast.error(mapAuthError(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendVerification() {
    setVerificationLoading(true);
    try {
      await resendVerification();
      setVerificationSent(true);
      toast.success("Verification email resent.");
    } catch (error) {
      toast.error(mapAuthError(error));
    } finally {
      setVerificationLoading(false);
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setResetLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
      toast.success("Password reset email sent.");
    } catch (error) {
      toast.error(mapAuthError(error));
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Student account"
        title={mode === "login" ? "Welcome back" : "Start your enrollment"}
        description="Your account holds your plan, enrolled courses, progress and certificates."
      />
      <Section className="py-8">
        <div className="panel mx-auto max-w-md p-8">
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-surface p-1 shadow-sm ring-1 ring-border">
            {['login', 'enroll'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  mode === m
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-surface text-foreground hover:bg-secondary/80 hover:text-primary-foreground"
                }`}
              >
                {m === "login" ? "Login" : "Enroll now"}
              </button>
            ))}
          </div>

          {mode !== "reset" ? (
            mode === "login" ? (
              user && user.emailVerified ? (
                <div className="mt-7 space-y-4 rounded-2xl border border-border bg-surface p-6 text-sm text-foreground">
                  <p className="text-sm">
                    You're signed in as <strong className="font-medium">{user.email}</strong>.
                  </p>
                  <div className="flex flex-wrap gap-3 sm:flex-row sm:items-center sm:justify-start sm:gap-4">
                    <Button asChild variant="hero" size="lg" className="w-auto px-6">
                      <Link to="/dashboard">Go to dashboard</Link>
                    </Button>
                    <Button
                      type="button"
                      variant="glass"
                      size="lg"
                      className="w-auto px-6"
                      onClick={async () => {
                        try {
                          await logout();
                          toast.success("Signed out.");
                        } catch (err) {
                          toast.error("Unable to sign out. Try again.");
                        }
                      }}
                    >
                      Sign out
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" maxLength={255} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" className="mt-2" />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              )
            ) : (
              <div className="mt-7 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Ready to start? Click below to open the enrollment flow.
                </p>
                <Button asChild variant="hero" size="lg" className="w-full">
                  <Link to="/enroll">Enroll now</Link>
                </Button>
              </div>
            )
          ) : (
            <form className="mt-7 space-y-5" onSubmit={handleResetPassword}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" maxLength={255} className="mt-2" />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={resetLoading}>
                {resetLoading ? "Sending reset email..." : "Send reset email"}
              </Button>
              {resetSent && (
                <p className="text-sm text-primary">Check your inbox for reset instructions.</p>
              )}
            </form>
          )}

          {mode !== "reset" && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() => {
                  setMode("reset");
                  setResetSent(false);
                }}
                className="text-primary underline"
              >
                Forgot password?
              </button>
            </p>
          )}

          {mode === "verify" ? (
            <div className="mt-7 space-y-4 rounded-2xl border border-border bg-surface p-6 text-sm text-foreground">
              <p>
                We sent a verification link to <strong>{userEmail || user?.email}</strong>.
              </p>
              <p>If you already verified, refresh the page or sign in again.</p>
              <div className="flex flex-wrap gap-3 sm:flex-row sm:items-center sm:justify-start sm:gap-4">
                <Button
                  type="button"
                  variant="hero"
                  size="lg"
                  className="w-auto px-6"
                  onClick={handleResendVerification}
                  disabled={verificationLoading}
                >
                  {verificationLoading ? "Resending..." : "Resend verification email"}
                </Button>
                        <Button
                  type="button"
                  variant="glass"
                  size="lg"
                  className="w-auto px-6"
                  onClick={async () => {
                    setAllowLoginWithoutVerify(true);
                    setVerificationSent(false);
                    setMode("login");

                    if (user && !user.emailVerified) {
                      try {
                        await logout();
                        toast.success("Signed out. You can log in after verifying your email.");
                      } catch (error) {
                        toast.error("Unable to sign out. Please try again.");
                      }
                    }
                  }}
                >
                  Back to login
                </Button>
              </div>
              {verificationSent && (
                <p className="text-sm text-primary">Verification email resent. Check your inbox.</p>
              )}
            </div>
          ) : null}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New to the academy?{" "}
            <Link to="/enroll" className="text-primary hover:underline">
              Start the enrollment flow
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
