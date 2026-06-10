import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PRESETS, useHabits } from "@/lib/habits/HabitsProvider";
import type { LawKey } from "@/lib/habits/types";
import { explainSetup, compareWeakStrong } from "@/lib/habits/mockEngine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Trash2, Plus, Sparkles, GitCompare } from "lucide-react";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab — Atomic Habits Lab" },
      { name: "description", content: "Design your habit loop, apply the Four Laws, and track progress." },
      { property: "og:title", content: "Atomic Habits Lab — Lab" },
      { property: "og:description", content: "A 3-panel sandbox for designing better habits." },
    ],
  }),
  component: LabPage,
});

function LabPage() {
  return (
    <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
      <h1 className="sr-only">Atomic Habits Lab — Habit Design Sandbox</h1>
      <div className="grid gap-4 lg:grid-cols-[260px_1fr_320px]">
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </div>
    </main>
  );
}

/* -------------------- Left Panel -------------------- */
function LeftPanel() {
  const { session, loadPreset, startBlank, mode, setMode, reset } = useHabits();
  return (
    <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
      <Panel title="Presets" subtitle="Click to load instantly">
        <ul className="space-y-1.5">
          {PRESETS.map((p) => {
            const active = session.presetId === p.id;
            return (
              <li key={p.id}>
                <button
                  onClick={() => loadPreset(p.id)}
                  className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? "border-primary/40 bg-primary/5 text-foreground"
                      : "border-transparent hover:bg-muted"
                  }`}
                >
                  <span aria-hidden>{p.emoji}</span>
                  <span className="truncate">{p.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <Button variant="outline" size="sm" className="mt-3 w-full" onClick={startBlank}>
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Blank lab
        </Button>
      </Panel>

      <Panel title="Mode">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium">{mode === "live" ? "Live" : "Simulated"}</div>
            <p className="text-xs text-muted-foreground">
              {mode === "live" ? "Calls a live model." : "Polished mocked outputs."}
            </p>
          </div>
          <Switch
            checked={mode === "live"}
            onCheckedChange={(v) => setMode(v ? "live" : "simulated")}
            aria-label="Toggle live mode"
          />
        </div>
        {mode === "live" ? (
          <p className="mt-2 rounded-md border border-dashed border-border bg-muted px-2 py-1.5 text-xs text-muted-foreground">
            Live mode is opt-in. Mocked outputs remain available.
          </p>
        ) : null}
      </Panel>

      <Panel title="Settings">
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={reset}>
          <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Clear session
        </Button>
      </Panel>
    </aside>
  );
}

/* -------------------- Center Panel -------------------- */
function CenterPanel() {
  const { session, dispatch } = useHabits();
  const [explainOpen, setExplainOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const compare = compareWeakStrong(session);
  const explanation = explainSetup(session);

  return (
    <section className="space-y-4">
      <Panel title="Habit">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Title">
            <Input
              value={session.title}
              onChange={(e) => dispatch({ type: "patch", patch: { title: e.target.value }, label: "Edited title." })}
              placeholder="e.g. Read 10 minutes nightly"
            />
          </Field>
          <Field label="Frequency">
            <Input
              value={session.frequency}
              onChange={(e) =>
                dispatch({ type: "patch", patch: { frequency: e.target.value }, label: "Edited frequency." })
              }
              placeholder="Daily, Weekdays, etc."
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Goal">
              <Textarea
                rows={2}
                value={session.goal}
                onChange={(e) => dispatch({ type: "patch", patch: { goal: e.target.value }, label: "Edited goal." })}
                placeholder="What outcome do you want?"
              />
            </Field>
          </div>
        </div>
      </Panel>

      <Panel
        title="Habit loop"
        subtitle="Cue → Craving → Response → Reward"
        action={
          <Button variant="outline" size="sm" onClick={() => setExplainOpen(true)}>
            <Lightbulb className="mr-1.5 h-3.5 w-3.5" /> Explain this setup
          </Button>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { f: "cue", t: "Cue", h: "What triggers the habit?" },
              { f: "craving", t: "Craving", h: "What you actually want." },
              { f: "response", t: "Response", h: "The action — keep it tiny." },
              { f: "reward", t: "Reward", h: "What closes the loop." },
            ] as const
          ).map(({ f, t, h }) => (
            <div key={f} className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-baseline justify-between">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t}</Label>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{h}</p>
              <Textarea
                rows={2}
                className="mt-2"
                value={session.loop[f]}
                onChange={(e) => dispatch({ type: "patch_loop", field: f, value: e.target.value })}
              />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Four Laws of Behavior Change" subtitle="Make it obvious, attractive, easy, satisfying">
        <Tabs defaultValue="obvious">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="obvious">Obvious</TabsTrigger>
            <TabsTrigger value="attractive">Attractive</TabsTrigger>
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="satisfying">Satisfying</TabsTrigger>
          </TabsList>
          {(["obvious", "attractive", "easy", "satisfying"] as LawKey[]).map((law) => (
            <TabsContent key={law} value={law} className="mt-3 space-y-3">
              {session.laws[law].tips.length === 0 ? (
                <p className="text-sm text-muted-foreground">No suggestions yet — add a note below.</p>
              ) : (
                <ul className="space-y-2">
                  {session.laws[law].tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 rounded-md border border-border bg-card p-2.5">
                      <Checkbox
                        id={`${law}-${i}`}
                        checked={session.laws[law].checked[i]}
                        onCheckedChange={() => dispatch({ type: "toggle_law", law, index: i })}
                      />
                      <Label htmlFor={`${law}-${i}`} className="cursor-pointer text-sm leading-snug">
                        {tip}
                      </Label>
                    </li>
                  ))}
                </ul>
              )}
              <Field label="Your notes">
                <Textarea
                  rows={2}
                  value={session.laws[law].note}
                  onChange={(e) => dispatch({ type: "set_law_note", law, note: e.target.value })}
                  placeholder={`How will you make it ${law}?`}
                />
              </Field>
            </TabsContent>
          ))}
        </Tabs>
      </Panel>

      <Panel
        title="Weak vs strong design"
        subtitle="Same habit, written two ways"
        action={
          <Button variant="outline" size="sm" onClick={() => setCompareOpen(true)}>
            <GitCompare className="mr-1.5 h-3.5 w-3.5" /> Why?
          </Button>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Weak</div>
            <p className="mt-1 text-sm">{compare.weak}</p>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">Strong</div>
            <p className="mt-1 text-sm">{compare.strong}</p>
          </div>
        </div>
      </Panel>

      <Dialog open={explainOpen} onOpenChange={setExplainOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Explain this setup
            </DialogTitle>
            <DialogDescription>A plain-language read of your current habit design.</DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-foreground">{explanation}</p>
        </DialogContent>
      </Dialog>

      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Why the strong version works</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{compare.why}</p>
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* -------------------- Right Panel -------------------- */
function RightPanel() {
  const { session, dispatch } = useHabits();
  const [draft, setDraft] = useState("");
  const current = currentStreak(session.streak);
  const longest = longestStreak(session.streak);

  return (
    <aside className="space-y-4">
      <Panel title="Identity">
        <Textarea
          rows={2}
          value={session.identity}
          onChange={(e) =>
            dispatch({ type: "patch", patch: { identity: e.target.value }, label: "Edited identity." })
          }
          placeholder="I am the kind of person who…"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Identity-based habits stick because each rep is a vote for who you're becoming.
        </p>
      </Panel>

      <Panel
        title="Streak"
        subtitle={`Current ${current} • Longest ${longest}`}
        action={
          <Button size="sm" variant={session.streak[29] ? "secondary" : "default"} onClick={() => dispatch({ type: "toggle_today" })}>
            {session.streak[29] ? "Done today" : "Mark today"}
          </Button>
        }
      >
        <div className="grid grid-cols-10 gap-1">
          {session.streak.map((d, i) => (
            <div
              key={i}
              title={`Day ${i - 29 === 0 ? "today" : `${29 - i} ago`}`}
              className={`aspect-square rounded-sm border ${
                d ? "border-primary/40 bg-primary/70" : "border-border bg-muted"
              }`}
            />
          ))}
        </div>
      </Panel>

      <Panel title="Reflection">
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What did you notice?"
            onKeyDown={(e) => {
              if (e.key === "Enter" && draft.trim()) {
                dispatch({ type: "add_note", text: draft.trim() });
                setDraft("");
              }
            }}
          />
          <Button
            size="sm"
            onClick={() => {
              if (!draft.trim()) return;
              dispatch({ type: "add_note", text: draft.trim() });
              setDraft("");
            }}
          >
            Add
          </Button>
        </div>
        <ul className="mt-3 space-y-2">
          {session.notes.length === 0 ? (
            <li className="text-xs text-muted-foreground">No notes yet.</li>
          ) : (
            session.notes.map((n) => (
              <li key={n.id} className="group flex items-start justify-between gap-2 rounded-md border border-border bg-card p-2.5">
                <div>
                  <p className="text-sm leading-snug">{n.text}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {new Date(n.ts).toLocaleString()}
                  </p>
                </div>
                <button
                  aria-label="Delete note"
                  className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                  onClick={() => dispatch({ type: "remove_note", id: n.id })}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))
          )}
        </ul>
      </Panel>

      <Panel title="What changed">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {session.lastChange}
        </p>
      </Panel>
    </aside>
  );
}

/* -------------------- Helpers -------------------- */
function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
      <header className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function currentStreak(arr: boolean[]) {
  let n = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i]) n++;
    else break;
  }
  return n;
}
function longestStreak(arr: boolean[]) {
  let max = 0;
  let cur = 0;
  for (const d of arr) {
    if (d) {
      cur++;
      max = Math.max(max, cur);
    } else cur = 0;
  }
  return max;
}