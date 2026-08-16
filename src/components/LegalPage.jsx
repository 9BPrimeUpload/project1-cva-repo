import { PageHeader, Section } from "@/components/Section";
export function LegalPage({ eyebrow, title, intro, sections }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={intro} />
      <Section>
        <div className="panel mx-auto max-w-3xl space-y-8 p-8 sm:p-10">
          <p className="text-xs text-muted-foreground">Last updated: January 2026</p>
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-semibold">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
