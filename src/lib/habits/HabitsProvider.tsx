import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { LabSession, Mode, ReflectionNote, LawKey } from "./types";
import { blankSession, getPreset, sessionFromPreset, PRESETS } from "./presets";
import { storage } from "./storage";

type Action =
  | { type: "load_preset"; presetId: string }
  | { type: "blank" }
  | { type: "patch"; patch: Partial<LabSession>; label: string }
  | { type: "patch_loop"; field: keyof LabSession["loop"]; value: string }
  | { type: "toggle_law"; law: LawKey; index: number }
  | { type: "set_law_note"; law: LawKey; note: string }
  | { type: "toggle_today" }
  | { type: "add_note"; text: string }
  | { type: "remove_note"; id: string }
  | { type: "replace"; session: LabSession };

function reducer(state: LabSession, action: Action): LabSession {
  switch (action.type) {
    case "load_preset": {
      const p = getPreset(action.presetId);
      return p ? sessionFromPreset(p) : state;
    }
    case "blank":
      return blankSession();
    case "patch":
      return { ...state, ...action.patch, lastChange: action.label };
    case "patch_loop":
      return {
        ...state,
        loop: { ...state.loop, [action.field]: action.value },
        lastChange: `Updated ${action.field}.`,
      };
    case "toggle_law": {
      const law = state.laws[action.law];
      const checked = law.checked.map((c, i) => (i === action.index ? !c : c));
      return {
        ...state,
        laws: { ...state.laws, [action.law]: { ...law, checked } },
        lastChange: `Toggled "${law.tips[action.index]}".`,
      };
    }
    case "set_law_note":
      return {
        ...state,
        laws: { ...state.laws, [action.law]: { ...state.laws[action.law], note: action.note } },
        lastChange: `Added a note to "${action.law}".`,
      };
    case "toggle_today": {
      const streak = state.streak.slice();
      streak[29] = !streak[29];
      return { ...state, streak, lastChange: streak[29] ? "Marked today done." : "Unmarked today." };
    }
    case "add_note": {
      const note: ReflectionNote = { id: crypto.randomUUID(), ts: Date.now(), text: action.text };
      return { ...state, notes: [note, ...state.notes], lastChange: "Added a reflection note." };
    }
    case "remove_note":
      return { ...state, notes: state.notes.filter((n) => n.id !== action.id), lastChange: "Removed a note." };
    case "replace":
      return action.session;
    default:
      return state;
  }
}

type HistoryEntry = { state: LabSession; label: string };

type Ctx = {
  session: LabSession;
  dispatch: React.Dispatch<Action>;
  mode: Mode;
  setMode: (m: Mode) => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: () => void;
  loadPreset: (id: string) => void;
  startBlank: () => void;
};

const HabitsContext = createContext<Ctx | null>(null);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [session, baseDispatch] = useReducer(reducer, undefined as unknown as LabSession, () => {
    if (typeof window === "undefined") return blankSession();
    return storage.get<LabSession>("session", blankSession());
  });
  const [mode, setModeState] = useState<Mode>("simulated");
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  const past = useRef<HistoryEntry[]>([]);
  const future = useRef<HistoryEntry[]>([]);
  const [, force] = useState(0);
  const tick = () => force((n) => n + 1);

  // Hydrate prefs on mount
  useEffect(() => {
    const t = storage.get<"light" | "dark">("theme", "light");
    const m = storage.get<Mode>("mode", "simulated");
    setThemeState(t);
    setModeState(m);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  // Persist
  useEffect(() => storage.set("session", session), [session]);
  useEffect(() => {
    storage.set("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  useEffect(() => storage.set("mode", mode), [mode]);

  const dispatch = useCallback(
    (action: Action) => {
      // Snapshot before mutating
      past.current.push({ state: session, label: session.lastChange });
      if (past.current.length > 50) past.current.shift();
      future.current = [];
      baseDispatch(action);
      tick();
    },
    [session],
  );

  const undo = useCallback(() => {
    const prev = past.current.pop();
    if (!prev) return;
    future.current.push({ state: session, label: session.lastChange });
    baseDispatch({ type: "replace", session: prev.state });
    tick();
  }, [session]);

  const redo = useCallback(() => {
    const next = future.current.pop();
    if (!next) return;
    past.current.push({ state: session, label: session.lastChange });
    baseDispatch({ type: "replace", session: next.state });
    tick();
  }, [session]);

  const reset = useCallback(() => {
    past.current = [];
    future.current = [];
    baseDispatch({ type: "blank" });
    storage.remove("session");
    tick();
  }, []);

  const loadPreset = useCallback((id: string) => dispatch({ type: "load_preset", presetId: id }), [dispatch]);
  const startBlank = useCallback(() => dispatch({ type: "blank" }), [dispatch]);
  const setMode = useCallback((m: Mode) => setModeState(m), []);
  const setTheme = useCallback((t: "light" | "dark") => setThemeState(t), []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;
      if (e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.key.toLowerCase() === "z" && e.shiftKey) || e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  const value = useMemo<Ctx>(
    () => ({
      session,
      dispatch,
      mode,
      setMode,
      theme,
      setTheme,
      undo,
      redo,
      canUndo: past.current.length > 0,
      canRedo: future.current.length > 0,
      reset,
      loadPreset,
      startBlank,
    }),
    [session, dispatch, mode, setMode, theme, setTheme, undo, redo, reset, loadPreset, startBlank],
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used within HabitsProvider");
  return ctx;
}

export { PRESETS };