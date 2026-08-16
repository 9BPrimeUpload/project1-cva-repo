import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact — Crimson Valley Academy",
      },
      {
        name: "description",
        content: "Join the Crimson Valley Academy Discord server for support, updates and community.",
      },
      {
        property: "og:title",
        content: "Contact — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Connect with the academy on Discord.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Join Our Discord"
        description="All academy communication happens in Discord. Join the server to connect with the team, ask questions and stay updated."
      />

      <Section>
        <div className="mx-auto max-w-2xl">
          <div className="panel p-12 sm:p-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-2xl bg-primary/10 p-6">
                <MessageCircle className="size-12 text-primary" />
              </div>
            </div>
            
            <h2 className="text-3xl font-semibold mb-4">
              Connect With Us on Discord
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Our Discord server is where students, educators, and community members connect. Get support, ask questions about courses, collaborate on projects, and stay in the loop with the latest academy updates.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <span className="text-primary font-semibold shrink-0">✓</span>
                <span className="text-sm text-muted-foreground">Direct support from educators and mentors</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-semibold shrink-0">✓</span>
                <span className="text-sm text-muted-foreground">Course announcements and updates</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-semibold shrink-0">✓</span>
                <span className="text-sm text-muted-foreground">Collaborate and share projects with other students</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-semibold shrink-0">✓</span>
                <span className="text-sm text-muted-foreground">Join our developer community</span>
              </div>
            </div>

            <Button
              variant="hero"
              size="xl"
              onClick={() => window.open("https://discord.gg/BuTTgwnv8j", "_blank")}
              className="inline-flex gap-2"
            >
              <MessageCircle className="size-5" />
              Join Discord Server
              <ArrowRight className="size-5" />
            </Button>

            <p className="mt-8 text-xs text-muted-foreground">
              https://discord.gg/BuTTgwnv8j
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
