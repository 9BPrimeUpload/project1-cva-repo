import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      {
        title: "Terms of Service — Crimson Valley Academy",
      },
      {
        name: "description",
        content:
          "The terms that govern use of Crimson Valley Academy courses, accounts and community.",
      },
      {
        property: "og:title",
        content: "Terms of Service — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Terms governing academy accounts, courses and subscriptions.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms describe how students may use Crimson Valley Academy accounts, course material and community spaces."
      sections={[
        {
          heading: "1. Accounts",
          body: [
            "A student account is personal and may not be shared. You are responsible for activity that takes place under your account and for keeping your credentials secure.",
            "You must provide accurate information during enrollment, including a Roblox username that belongs to you.",
          ],
        },
        {
          heading: "2. Course material",
          body: [
            "Lessons, challenges, project briefs and written feedback are provided for your personal learning. They may not be redistributed, resold or republished without written permission.",
            "Work you create during a course belongs to you. You are free to publish and monetise your own projects.",
          ],
        },
        {
          heading: "3. Subscriptions",
          body: [
            "Plans are billed monthly and renew automatically until cancelled. Access to plan features ends when the current billing period ends.",
            "Upgrades take effect immediately. Downgrades take effect from the next billing period.",
          ],
        },
        {
          heading: "4. Conduct",
          body: [
            "Harassment, plagiarism, exploiting and sharing of paid material are grounds for removal from the academy without refund.",
          ],
        },
        {
          heading: "5. Changes",
          body: [
            "Course content and these terms may be updated as the platform and curriculum evolve. Material changes will be announced to enrolled students.",
          ],
        },
      ]}
    />
  ),
});
