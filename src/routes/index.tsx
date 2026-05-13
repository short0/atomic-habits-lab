import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Target, Repeat, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRESETS, useHabits } from "@/lib/habits/HabitsProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atomic Habits Lab — Design better habits, calmly" },
      {
        name: "description",
        content:
          "A minimalist sandbox to design habits using the cue/craving/response/reward loop and the Four Laws of Behavior Change.",
      },
      { property: "og:title", content: "Atomic Habits Lab" },
      {
        property: "og:description",
        content: "Design tiny, repeatable habits using the Four Laws of Behavior Change.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const router = useRouter();
  const { loadPreset, startBlank } = useHabits();

  const launch = (id: string) => {
    loadPreset(id);
    router.navigate({ to: "/lab" });
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" /> Inspired by Atomic Habits
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Design tiny habits that quietly compound.
          </h1>
          <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">
            Atomic Habits Lab is a calm sandbox for designing the cue, craving, response, and reward
            behind any habit — and stress-testing it against the Four Laws of Behavior Change.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/lab">
                Open the Lab <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                startBlank();
                router.navigate({ to: "/lab" });
              }}
            >
              Start a blank lab
            </Button>
          </div>
        </div>
      </section>

      {/* Presets */}
      <section className="pb-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Start with a preset</h2>
            <p className="text-sm text-muted-foreground">Each preset is fully designed — open and explore.</p>
          </div>
          <Link to="/learn" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
            Learn the ideas →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => launch(p.id)}
              className="group rounded-xl border border-border bg-card p-5 text-left shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="mb-3 text-2xl">{p.emoji}</div>
              <div className="text-sm font-semibold">{p.name}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.blurb}</p>
              <div className="mt-4 inline-flex items-center text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open in lab <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border py-16">
        <h2 className="mb-10 text-center text-xl font-semibold tracking-tight">How it works</h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: 1, icon: Target, t: "Choose a habit", d: "Pick a preset or write your own goal." },
            { n: 2, icon: Repeat, t: "Design the loop", d: "Name the cue, craving, response, and reward." },
            { n: 3, icon: CheckCircle2, t: "Apply Four Laws", d: "Make it obvious, attractive, easy, satisfying." },
            { n: 4, icon: Sparkles, t: "Track + reflect", d: "Mark days done; jot what changed." },
          ].map(({ n, icon: Icon, t, d }) => (
            <li key={n} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-muted text-foreground">{n}</span>
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Button asChild>
            <Link to="/lab">
              Start designing <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Built as a learning sandbox. All data stays on this device.
      </footer>
    </main>
  );
}
