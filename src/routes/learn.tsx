import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Atomic Habits Lab" },
      {
        name: "description",
        content: "Plain-language explanations of the habit loop, the Four Laws, and identity-based habits.",
      },
      { property: "og:title", content: "Atomic Habits Lab — Learn" },
      { property: "og:description", content: "Understand the ideas behind the lab in 5 minutes." },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">The ideas, in plain language</h1>
      <p className="mt-3 text-muted-foreground">
        You don't need to read the book to design better habits. Here's the working set.
      </p>

      <Section title="The habit loop">
        <p>
          Every habit runs the same loop: a <b>cue</b> triggers a <b>craving</b>, you take a <b>response</b>,
          and you get a <b>reward</b>. The brain remembers what worked and reaches for it again next time
          the cue appears.
        </p>
        <Grid
          items={[
            ["Cue", "The signal — a time, place, person, or feeling."],
            ["Craving", "The internal pull — the thing you actually want."],
            ["Response", "The action you take. Keep it small enough to never miss."],
            ["Reward", "What closes the loop and tells your brain to repeat it."],
          ]}
        />
      </Section>

      <Section title="The Four Laws">
        <p>
          To build a habit, run it through four checks. To break one, invert each.
        </p>
        <Grid
          items={[
            ["Make it obvious", "Design the environment so the cue is impossible to miss."],
            ["Make it attractive", "Pair it with something you already enjoy."],
            ["Make it easy", "Reduce friction. Two minutes is enough to start."],
            ["Make it satisfying", "Track it. Visible progress is its own reward."],
          ]}
        />
      </Section>

      <Section title="Identity beats outcomes">
        <p>
          Goal-only habits ("lose 10kg") rely on willpower. Identity-based habits ("I am someone who trains")
          turn each rep into a vote for who you're becoming. Outcomes follow identity, not the other way around.
        </p>
      </Section>

      <Section title="Weak vs strong design">
        <div className="grid gap-3 sm:grid-cols-2">
          <Card label="Weak" tone="muted">
            "I'll try to read more this year."
          </Card>
          <Card label="Strong" tone="primary">
            "After I get into bed at 10:30pm, I will read one page."
          </Card>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Strong habits name the cue, name the action, and keep the action tiny.
        </p>
      </Section>

      <div className="mt-12 flex justify-center">
        <Button asChild>
          <Link to="/lab">Try it in the Lab</Link>
        </Button>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

function Grid({ items }: { items: [string, string][] }) {
  return (
    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
      {items.map(([t, d]) => (
        <li key={t} className="rounded-lg border border-border bg-card p-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t}</div>
          <p className="mt-1 text-sm">{d}</p>
        </li>
      ))}
    </ul>
  );
}

function Card({ label, tone, children }: { label: string; tone: "muted" | "primary"; children: React.ReactNode }) {
  const cls =
    tone === "primary"
      ? "border-primary/30 bg-primary/5 text-foreground"
      : "border-border bg-muted/40 text-foreground";
  const labelCls = tone === "primary" ? "text-primary" : "text-muted-foreground";
  return (
    <div className={`rounded-lg border p-3 ${cls}`}>
      <div className={`text-xs font-semibold uppercase tracking-wide ${labelCls}`}>{label}</div>
      <p className="mt-1 text-sm">{children}</p>
    </div>
  );
}