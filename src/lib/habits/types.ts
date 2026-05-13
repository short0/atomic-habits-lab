export type HabitLoop = {
  cue: string;
  craving: string;
  response: string;
  reward: string;
};

export type LawKey = "obvious" | "attractive" | "easy" | "satisfying";

export type FourLaws = Record<LawKey, { tips: string[]; checked: boolean[]; note: string }>;

export type ReflectionNote = { id: string; ts: number; text: string };

export type LabSession = {
  id: string;
  presetId: string | null;
  title: string;
  goal: string;
  frequency: string;
  identity: string;
  loop: HabitLoop;
  laws: FourLaws;
  streak: boolean[]; // last 30 days, index 29 = today
  notes: ReflectionNote[];
  weakExample: string;
  strongExample: string;
  lastChange: string;
};

export type Mode = "simulated" | "live";

export type Preset = {
  id: string;
  emoji: string;
  name: string;
  blurb: string;
  quickActions: string[];
  session: Omit<LabSession, "id" | "lastChange">;
};