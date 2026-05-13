
# Atomic Habits Lab — Build Plan

A calm, minimalist learning + habit-design sandbox. Mocked outputs by default, optional live LLM mode, full localStorage persistence, undo/redo, and a polished 3-panel Lab layout that gracefully collapses on tablet/mobile.

## Routes (TanStack Start)

```
src/routes/
  __root.tsx          # Shell + ThemeProvider + HabitsProvider + nav
  index.tsx           # Home (hero, presets, how-it-works, CTA)
  lab.tsx             # Lab (3-panel desktop, stacked mobile)
  learn.tsx           # Deeper explainer: loop, 4 Laws, identity, weak vs strong
```

Each route gets distinct `head()` metadata (title, description, og tags).

## Design System

- Light default; `.dark` toggled on `<html>`. Persist `theme` in localStorage.
- Neutral palette in `src/styles.css` using oklch:
  - background: near-white / near-black
  - foreground, muted, border (subtle), accent (single calm hue, e.g. soft indigo/teal)
  - card with soft shadow token `--shadow-soft`
- Typography: Inter (system fallback). Generous line-height, ample spacing scale.
- No gradients, no decorative noise. Subtle 1px borders, 12–16px radii.
- Reusable shadcn primitives: Button, Card, Input, Textarea, Tabs, Switch, Tooltip, Dialog, Badge, Separator, ScrollArea.

## State Architecture

`src/lib/habits/` module:

- `types.ts` — `Habit`, `HabitLoop` (cue/craving/response/reward), `FourLaws` (obvious/attractive/easy/satisfying with checklist + notes), `Identity`, `StreakState`, `ReflectionNote`, `LabSession`, `Preset`.
- `presets.ts` — 4 built-in presets (Reading, Gym, Water, Study no-phone), each with full loop, Four Laws suggestions, identity framing, sample streak, 3–5 quick-action prompts, and a "weak vs strong" comparison example.
- `mockEngine.ts` — deterministic mocked "AI" outputs (explain-this-setup, suggestion text, weak/strong comparisons) keyed off habit fields.
- `liveEngine.ts` — optional Lovable AI Gateway call (only used when mode = live). Mode toggle is visually obvious (badge "Simulated" vs "Live").
- `storage.ts` — typed localStorage wrapper (`ahl:v1:*` keys): theme, mode, currentSession, recentHabits, selectedPresetId.
- `historyStore.ts` — undo/redo stack (zustand + custom past/future arrays). Tracks major actions: preset change, habit edit, setup replay, settings change, session clear. Keyboard shortcuts: ⌘Z / ⌘⇧Z.
- `HabitsProvider.tsx` — React context exposing session, dispatch, undo, redo, reset, mode, setMode.

## Components

`src/components/`
- `theme-toggle.tsx` — sun/moon switch.
- `mode-badge.tsx` — pill showing Simulated/Live with tooltip.
- `app-header.tsx` — logo wordmark, nav (Home/Lab/Learn), theme toggle, undo/redo/reset icon buttons (with tooltips + shortcuts).
- `home/hero.tsx`, `home/preset-grid.tsx`, `home/how-it-works.tsx`, `home/cta.tsx`.
- `lab/left-panel.tsx` — preset selector (list), habit input (title + goal), mode toggle, settings (reset session, clear notes).
- `lab/center-panel.tsx`
  - `habit-builder.tsx` — title, goal, frequency.
  - `loop-designer.tsx` — 4 labeled cards (Cue / Craving / Response / Reward) with inline definitions and editable text.
  - `four-laws-checklist.tsx` — 4 collapsible sections, each with checklist + free-text suggestions; "Explain this setup" button → mockEngine output in a Dialog.
  - `weak-vs-strong.tsx` — side-by-side comparison toggle.
- `lab/right-panel.tsx`
  - `identity-card.tsx` — "I am the kind of person who…" framing input + preset suggestions.
  - `streak-tracker.tsx` — 7/30 day grid, mark today done, computes current/longest streak.
  - `reflection-notes.tsx` — timestamped notes list, add/delete.
  - `what-changed.tsx` — short summary of last action (drives the "explanation of what changed" requirement).
- `learn/concept-card.tsx` — reusable explainer card for loop, four laws, identity.

## Responsive Layout

Lab uses CSS grid:
- Desktop ≥1024px: `grid-cols-[280px_1fr_340px]`, full height minus header.
- Tablet 640–1023px: 2 columns, right panel becomes a bottom drawer/tabs.
- Mobile <640px: single column stack, sticky top action bar (mode badge, undo/redo, save), section anchors.

## Persistence & Reset

- All state autosaved (debounced 300ms) to localStorage.
- "Reset to home" clears current session + selectedPresetId, navigates to `/`, preserves theme, mode, and recent habits.
- Undo/redo stack capped at 50 entries; persisted in memory only (not localStorage) to avoid replay confusion.

## Accessibility

- All interactive elements are buttons/inputs (no div-as-button).
- Visible `:focus-visible` ring using `--ring`.
- ARIA labels on icon buttons; `aria-live="polite"` on what-changed panel.
- Tap targets ≥44px on mobile.
- Color contrast ≥ AA in both themes.

## Optional Live Mode

- Off by default. Toggle in left panel + settings.
- When enabled, "Explain this setup" and suggestion buttons call a server function (`src/lib/ai.functions.ts`) using Lovable AI Gateway (`google/gemini-2.5-flash`).
- If Lovable Cloud isn't enabled, toggle shows disabled state with tooltip "Enable Cloud to use Live mode" — mocked mode remains fully functional. (No Cloud enablement in this plan; mocked is the polished default. We can wire live mode later if user wants.)

## Out of Scope

- Auth (explicitly none).
- Backend/database (localStorage only).
- Multi-user sync.

## Deliverables Checklist

- [ ] Routes: `/`, `/lab`, `/learn` with per-route SEO meta.
- [ ] Theme toggle + persistence; light default.
- [ ] 4 fully populated presets with quick actions.
- [ ] Mocked engine produces "Explain this setup" + weak-vs-strong outputs.
- [ ] Undo / Redo / Reset wired with keyboard shortcuts.
- [ ] Streak tracker, reflection notes, identity framing, what-changed panel.
- [ ] Responsive 3-panel → stacked layout verified at desktop/tablet/mobile.
- [ ] A11y pass: focus rings, aria labels, contrast.
