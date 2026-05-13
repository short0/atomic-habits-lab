import type { LabSession } from "./types";

export function explainSetup(s: LabSession): string {
  const id = s.identity?.trim() || "the kind of person you want to become";
  const cue = s.loop.cue || "a clear moment in your day";
  const reward = s.loop.reward || "a small but real payoff";
  return [
    `Your habit is built around the identity: "${id}".`,
    `The cue is "${cue}". Each time it happens, your brain rehearses the loop.`,
    `The craving — "${s.loop.craving || "a small internal pull"}" — gives the loop emotional fuel.`,
    `The response — "${s.loop.response || "the action you take"}" — should be small enough to never miss.`,
    `The reward — "${reward}" — closes the loop so your brain wants to repeat it.`,
    `Across the Four Laws, the strongest habits are made obvious, attractive, easy, and satisfying. Lean on environment design first; willpower last.`,
  ].join(" ");
}

export function compareWeakStrong(s: LabSession) {
  return {
    weak: s.weakExample || "I'll try to do better.",
    strong:
      s.strongExample ||
      `After ${s.loop.cue || "[clear cue]"}, I will ${s.loop.response || "[tiny action]"}.`,
    why: "Strong habits name the cue, the action, and keep the action tiny enough to never fail.",
  };
}