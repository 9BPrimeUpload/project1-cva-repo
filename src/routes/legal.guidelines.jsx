import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
export const Route = createFileRoute("/legal/guidelines")({
  head: () => ({
    meta: [
      {
        title: "Community Guidelines — Crimson Valley Academy",
      },
      {
        name: "description",
        content:
          "The standards that keep the Crimson Valley Academy student community safe and useful.",
      },
      {
        property: "og:title",
        content: "Community Guidelines — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "How students are expected to behave in academy spaces.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Community Guidelines"
      intro="Academy spaces exist so students can learn, ask questions and share work without friction."
      sections={[
        {
          heading: "Be respectful",
          body: [
            "Critique work, not people. Beginner questions are welcome and should never be mocked.",
          ],
        },
        {
          heading: "Keep it on topic",
          body: [
            "Use the correct channel for your course or question. Avoid spam, advertising and off-topic self-promotion.",
          ],
        },
        {
          heading: "Credit your sources",
          body: [
            "Submitting work you did not create as your own is plagiarism and voids certificates. Using open assets is fine when credited.",
          ],
        },
        {
          heading: "Safety",
          body: [
            "Do not share personal contact details, account credentials or paid course material. Report concerns to a moderator.",
          ],
        },
        {
          heading: "Enforcement",
          body: [
            "Moderators may warn, mute or remove accounts that breach these guidelines. Serious breaches result in removal without refund.",
          ],
        },
      ]}
    />
  ),
});
