export function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-primary uppercase">
      {children}
    </span>
  );
}
export function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
export function Section({ children, className = "", id }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}
export function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="hero-surface relative border-b">
      <div className="grid-backdrop absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl fade-up">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold text-balance sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
