import type { FourLaws, LabSession, Preset } from "./types";

const emptyLaws = (tips: Record<string, string[]>): FourLaws => ({
  obvious: { tips: tips.obvious, checked: tips.obvious.map(() => false), note: "" },
  attractive: { tips: tips.attractive, checked: tips.attractive.map(() => false), note: "" },
  easy: { tips: tips.easy, checked: tips.easy.map(() => false), note: "" },
  satisfying: { tips: tips.satisfying, checked: tips.satisfying.map(() => false), note: "" },
});

const streakFrom = (pattern: number[]): boolean[] => {
  const arr = Array(30).fill(false);
  pattern.forEach((i) => (arr[i] = true));
  return arr;
};

export const PRESETS: Preset[] = [
  {
    id: "read-nightly",
    emoji: "📖",
    name: "Read 10 minutes nightly",
    blurb: "A small reading habit anchored to your bedtime routine.",
    quickActions: [
      "Place book on pillow each morning",
      "Set a 10-minute timer",
      "Track pages read each night",
      "Pick a book you genuinely enjoy",
      "Pair with a cup of herbal tea",
    ],
    session: {
      presetId: "read-nightly",
      title: "Read 10 minutes nightly",
      goal: "Read at least 10 minutes before bed.",
      frequency: "Every night",
      identity: "I am a reader.",
      loop: {
        cue: "I get into bed and plug in my phone across the room.",
        craving: "I want to wind down and escape the day.",
        response: "Pick up the book on my pillow and read for 10 minutes.",
        reward: "Calmer mind, faster sleep, and one step closer to finishing the book.",
      },
      laws: emptyLaws({
        obvious: ["Leave book on pillow each morning", "Charge phone in another room"],
        attractive: ["Choose a book you can't put down", "Pair reading with a favorite tea"],
        easy: ["Only commit to 10 minutes", "Use a bookmark to remove friction"],
        satisfying: ["Log pages read in a journal", "Track nightly streak on a calendar"],
      }),
      streak: streakFrom([20, 21, 22, 24, 25, 26, 27, 28, 29]),
      notes: [
        { id: "n1", ts: Date.now() - 86400000, text: "Easier than expected once the book was on the pillow." },
      ],
      weakExample: "I'll try to read more this year.",
      strongExample: "After I get into bed at 10:30pm, I will read one page.",
    },
  },
  {
    id: "gym-after-work",
    emoji: "🏋️",
    name: "Go to the gym after work",
    blurb: "Use the end of your workday as the cue to train.",
    quickActions: [
      "Pack gym bag the night before",
      "Wear gym clothes under work outfit",
      "Commit to 5 minutes only",
      "Schedule a workout buddy",
      "Plan a post-gym reward meal",
    ],
    session: {
      presetId: "gym-after-work",
      title: "Go to the gym after work",
      goal: "Train at the gym 4x per week after work.",
      frequency: "Weekdays",
      identity: "I am the kind of person who trains.",
      loop: {
        cue: "I shut my laptop at 6pm.",
        craving: "I want to release the day's tension and feel strong.",
        response: "Drive directly to the gym without going home first.",
        reward: "Endorphin lift, better sleep, visible progress over weeks.",
      },
      laws: emptyLaws({
        obvious: ["Pack gym bag the night before", "Put bag in the car each morning"],
        attractive: ["Make a playlist you only listen to at the gym", "Train with a friend"],
        easy: ["Pick a gym on the way home", "Plan the first exercise in advance"],
        satisfying: ["Log every session", "Take progress photos monthly"],
      }),
      streak: streakFrom([15, 16, 18, 19, 22, 23, 25, 26, 29]),
      notes: [],
      weakExample: "I want to get in shape this year.",
      strongExample: "After I leave work at 6pm, I will drive straight to the gym for 30 minutes.",
    },
  },
  {
    id: "drink-water",
    emoji: "💧",
    name: "Drink more water",
    blurb: "Anchor a glass of water to things you already do.",
    quickActions: [
      "Fill bottle first thing in morning",
      "Drink one glass before each coffee",
      "Keep bottle visible on desk",
      "Mark fill lines with hour goals",
      "Pair water with each meal",
    ],
    session: {
      presetId: "drink-water",
      title: "Drink more water",
      goal: "Drink 2L of water every day.",
      frequency: "Daily",
      identity: "I am someone who takes care of their body.",
      loop: {
        cue: "I sit down at my desk in the morning.",
        craving: "I want to feel alert and clear-headed.",
        response: "Drink one full glass of water before opening email.",
        reward: "Less afternoon fatigue, fewer headaches.",
      },
      laws: emptyLaws({
        obvious: ["Keep a 1L bottle on the desk", "Fill it the night before"],
        attractive: ["Add lemon or cucumber slices", "Use a bottle you actually like"],
        easy: ["Pre-fill bottles for the day", "Sip, don't gulp"],
        satisfying: ["Mark hour-by-hour fill lines", "Tick off each refill"],
      }),
      streak: streakFrom([18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]),
      notes: [],
      weakExample: "Drink more water.",
      strongExample: "After I sit down at my desk, I will drink one full glass of water.",
    },
  },
  {
    id: "study-no-phone",
    emoji: "📚",
    name: "Study without phone distractions",
    blurb: "Make focused study the easy choice and the phone the hard one.",
    quickActions: [
      "Leave phone in another room",
      "Use a single-tab study mode",
      "Block sites for 25-minute sessions",
      "Place a notebook open on the desk",
      "Reward each session with a short walk",
    ],
    session: {
      presetId: "study-no-phone",
      title: "Study without phone distractions",
      goal: "Complete 2 focused 25-minute study blocks per day.",
      frequency: "Weekdays",
      identity: "I am a focused learner.",
      loop: {
        cue: "I sit down at my desk after lunch.",
        craving: "I want to make real progress on what matters.",
        response: "Phone goes in a drawer; start a 25-minute timer.",
        reward: "Visible progress, calmer mind, sense of mastery.",
      },
      laws: emptyLaws({
        obvious: ["Open notes before sitting down", "Keep notebook visible on desk"],
        attractive: ["Pair study with favorite music", "Study in a place you find pleasant"],
        easy: ["Phone in a drawer in another room", "Use a website blocker"],
        satisfying: ["Tick off each Pomodoro", "Take a short walk after each block"],
      }),
      streak: streakFrom([19, 20, 22, 23, 24, 26, 27, 28, 29]),
      notes: [],
      weakExample: "I'll try not to use my phone while studying.",
      strongExample: "After I sit down to study, I will put my phone in the drawer in the kitchen.",
    },
  },
];

export const getPreset = (id: string | null) => PRESETS.find((p) => p.id === id) ?? null;

export const blankSession = (): LabSession => ({
  id: crypto.randomUUID(),
  presetId: null,
  title: "",
  goal: "",
  frequency: "Daily",
  identity: "",
  loop: { cue: "", craving: "", response: "", reward: "" },
  laws: emptyLaws({ obvious: [], attractive: [], easy: [], satisfying: [] }),
  streak: Array(30).fill(false),
  notes: [],
  weakExample: "",
  strongExample: "",
  lastChange: "Started a blank lab.",
});

export const sessionFromPreset = (preset: Preset): LabSession => ({
  ...JSON.parse(JSON.stringify(preset.session)),
  id: crypto.randomUUID(),
  lastChange: `Loaded preset: ${preset.name}`,
});