import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/learn/habit-stacking")({
  head: () => ({
    meta: [
      { title: "Habit Stacking — A Beginner's Guide | Atomic Habits Lab" },
      {
        name: "description",
        content:
          "Habit stacking uses the formula 'After [Current Habit], I will [New Habit]' to attach new behaviors to routines you already do.",
      },
      { property: "og:title", content: "Habit Stacking — A Beginner's Guide" },
      {
        property: "og:description",
        content: "Learn the habit stacking formula from Atomic Habits with practical examples you can use today.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://habit-design-studio.lovable.app/learn/habit-stacking" },
    ],
    links: [
      { rel: "canonical", href: "https://habit-design-studio.lovable.app/learn/habit-stacking" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to build a habit stack",
          description:
            "Use the 'After [Current Habit], I will [New Habit]' formula to attach a new habit to an existing routine.",
          step: [
            { "@type": "HowToStep", name: "Pick an anchor habit", text: "Choose something you already do every day without thinking — brushing your teeth, pouring coffee, sitting at your desk." },
            { "@type": "HowToStep", name: "Pick a tiny new habit", text: "Keep the new habit small enough to finish in under two minutes." },
            { "@type": "HowToStep", name: "Write the sentence", text: "After [Current Habit], I will [New Habit]." },
            { "@type": "HowToStep", name: "Repeat it daily", text: "Run the stack at the same cue every day until it feels automatic." },
          ],
        }),
      },
    ],
  }),
  component: HabitStackingPage,
});

function HabitStackingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Guide</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Habit stacking: the simplest way to start</h1>
      <p className="mt-3 text-muted-foreground">
        Habit stacking is the most practical idea in <em>Atomic Habits</em>. Instead of relying on motivation, you
        attach a new habit to one you already do. The cue is built in.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">The formula</h2>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
          After <b>[Current Habit]</b>, I will <b>[New Habit]</b>.
        </div>
        <p className="text-sm text-muted-foreground">
          The current habit is your anchor — something you do every day without thinking. The new habit is tiny enough
          to finish in under two minutes.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            ["After I pour my morning coffee", "I will write one sentence in my journal."],
            ["After I sit down at my desk", "I will open my most important task first."],
            ["After I brush my teeth at night", "I will read one page of a book."],
            ["After I close my laptop for the day", "I will do ten push-ups."],
          ].map(([a, b]) => (
            <li key={a} className="rounded-lg border border-border bg-card p-3 text-sm">
              <span className="text-muted-foreground">{a}, </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Three rules that make stacks stick</h2>
        <ol className="space-y-3 text-sm">
          <li>
            <b>Be specific.</b> "After lunch" is vague. "After I put my plate in the dishwasher" is a real cue.
          </li>
          <li>
            <b>Stay tiny.</b> A two-minute version always beats a perfect one you skip.
          </li>
          <li>
            <b>One stack at a time.</b> Lock it in for two weeks before adding another.
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Try it in the Lab</h2>
        <p className="text-sm text-muted-foreground">
          Use the Lab to write your stack as a habit loop — the anchor is the cue, the new habit is the response, and
          finishing it is the reward.
        </p>
        <div className="pt-2">
          <Button asChild>
            <Link to="/lab">Open the Lab</Link>
          </Button>
        </div>
      </section>

      <div className="mt-12 border-t border-border pt-6 text-sm">
        <Link to="/learn" className="text-muted-foreground hover:text-foreground">
          ← Back to Learn
        </Link>
      </div>
    </main>
  );
}