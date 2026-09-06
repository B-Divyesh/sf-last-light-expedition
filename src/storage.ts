import type { GameState } from "./game";

export interface Settings {
  sound: boolean;
  reducedMotion: boolean;
  rememberRun: boolean;
}

const settingsKey = "last-light:settings";
const runKey = "last-light:run";

export const defaultSettings: Settings = { sound: false, reducedMotion: false, rememberRun: false };

export function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(settingsKey);
    return stored ? { ...defaultSettings, ...(JSON.parse(stored) as Partial<Settings>) } : { ...defaultSettings };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
}

export function loadRun(): GameState | null {
  try {
    const stored = localStorage.getItem(runKey);
    if (!stored) return null;
    const value = JSON.parse(stored) as Partial<GameState>;
    const validResources = value.resources
      && [value.resources.warmth, value.resources.supplies, value.resources.trust].every((item) => typeof item === "number" && Number.isFinite(item));
    const valid = value.seedId === "MIST-042"
      && Number.isInteger(value.campIndex)
      && value.campIndex! >= 0
      && value.campIndex! <= 6
      && validResources
      && Array.isArray(value.choices)
      && typeof value.routeScore === "number"
      && typeof value.relicUsed === "boolean"
      && (value.ending === null || ["lost", "dawn", "signal", "return"].includes(value.ending ?? ""));
    return valid ? value as GameState : null;
  } catch {
    return null;
  }
}

export function saveRun(game: GameState, remember: boolean): void {
  if (remember) localStorage.setItem(runKey, JSON.stringify(game));
  else localStorage.removeItem(runKey);
}

export function clearRun(): void {
  localStorage.removeItem(runKey);
}
