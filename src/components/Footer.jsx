import { Link } from "@tanstack/react-router";
import logo from "@/assets/image.png";
const columns = [
  {
    title: "Academy",
    links: [
      {
        label: "About",
        to: "/about",
      },
      {
        label: "Courses",
        to: "/courses",
      },
      {
        label: "Plans",
        to: "/plans",
      },
      {
        label: "Careers",
        to: "/careers",
      },
      {
        label: "Contact",
        to: "/contact",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "FAQ",
        to: "/faq",
      },
      {
        label: "Student Resources",
        to: "/faq",
      },
      {
        label: "Certificates",
        to: "/faq",
      },
      {
        label: "Community",
        to: "/contact",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Terms of Service",
        to: "/legal/terms",
      },
      {
        label: "Privacy Policy",
        to: "/legal/privacy",
      },
      {
        label: "Refund Policy",
        to: "/legal/refunds",
      },
      {
        label: "Community Guidelines",
        to: "/legal/guidelines",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        to: "/about",
      },
      {
        label: "Contact",
        to: "/contact",
      },
    ],
  },
];
export function Footer() {
  return (
    <footer className="mt-24 border-t bg-[var(--surface)]/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={logo}
                alt="Crimson Valley Academy logo"
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-10"
              />
              <span className="font-display text-base font-semibold">
                Crimson Valley <span className="text-primary">Academy</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Practical Roblox development education — scripting, building, design and production —
              taught through projects, challenges and mentorship.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold tracking-[0.18em] text-silver uppercase">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label + link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Crimson Valley Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
