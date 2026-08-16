import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      {
        title: "Privacy Policy — Crimson Valley Academy",
      },
      {
        name: "description",
        content: "How Crimson Valley Academy collects, uses and protects student information.",
      },
      {
        property: "og:title",
        content: "Privacy Policy — Crimson Valley Academy",
      },
      {
        property: "og:description",
        content: "What student data the academy collects and why.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="We collect the minimum information needed to run the academy and never sell student data."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "Account details you provide: name, email address, Roblox username and optionally a Discord username.",
            "Learning activity: course progress, submitted assignments and certificates issued.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To provide course access, track progress, deliver feedback, issue certificates and respond to support requests.",
            "To send service messages about your enrollment. We do not send marketing email without consent.",
          ],
        },
        {
          heading: "Sharing",
          body: [
            "Student data is not sold. It is shared only with service providers required to operate the academy, such as payment and hosting providers, and only as needed.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can request a copy of your data or ask for your account to be deleted by contacting the academy team.",
          ],
        },
      ]}
    />
  ),
});
