import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
export const Route = createFileRoute("/legal/refunds")({
  head: () => ({
    meta: [
      {
        title: "Refund Policy — Crimson Valley Academy",
      },
      {
        name: "description",
        content: "How refunds and cancellations work for Crimson Valley Academy subscriptions.",
      },
      {
        property: "og:title",
        content: "Refund Policy — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "Cancellation and refund terms for academy plans.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      intro="Plans are monthly, cancellable at any time, and we aim to resolve billing issues quickly and fairly."
      sections={[
        {
          heading: "Cancellations",
          body: [
            "You can cancel a subscription at any time. Access continues until the end of the current billing period and the subscription does not renew afterwards.",
          ],
        },
        {
          heading: "Refund eligibility",
          body: [
            "If you were charged in error, charged after cancelling, or could not access purchased course content, contact us and we will review the charge.",
            "Because course material is delivered immediately, refunds are generally not issued for periods where course content was accessed.",
          ],
        },
        {
          heading: "How to request",
          body: [
            "Use the contact form with the email address on the account and the date of the charge. Reviews are handled by the academy team.",
          ],
        },
      ]}
    />
  ),
});
