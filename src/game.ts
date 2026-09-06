export type Resource = "warmth" | "supplies" | "trust";

export interface Resources {
  warmth: number;
  supplies: number;
  trust: number;
}

export interface Choice {
  id: string;
  title: string;
  detail: string;
  effects: Partial<Resources>;
  route: number;
  usesRelic?: boolean;
}

export interface Camp {
  name: string;
  location: string;
  report: string;
  choices: Choice[];
}

export interface WeatherSeed {
  id: string;
  name: string;
  note: string;
  relic: string;
  penalties: Array<Partial<Resources>>;
  paid: boolean;
}

export type EndingId = "lost" | "dawn" | "signal" | "return";

export interface GameState {
  seedId: string;
  campIndex: number;
  resources: Resources;
  choices: string[];
  routeScore: number;
  relicUsed: boolean;
  ending: EndingId | null;
}

export const camps: Camp[] = [
  {
    name: "Camp 1",
    location: "River shelf",
    report: "The bridge is gone. Mara can wade the packs across, or you can spend daylight finding a higher crossing.",
    choices: [
      { id: "c1-fire", title: "Dry the rope by the fire", detail: "Leave later with lighter packs.", effects: { warmth: 2, supplies: -2 }, route: 0 },
      { id: "c1-share", title: "Share the load with Mara", detail: "Cross now and let her choose the pace.", effects: { warmth: -1, supplies: -1, trust: 2 }, route: 0 },
      { id: "c1-ridge", title: "Climb to the stone crossing", detail: "Gain ground before the cold arrives.", effects: { warmth: -2, supplies: 1, trust: -1 }, route: 1 },
    ],
  },
  {
    name: "Camp 2",
    location: "Bent pines",
    report: "A torn cache bag hangs above the snow line. The marked route continues beneath a stand of bent pines.",
    choices: [
      { id: "c2-cache", title: "Recover the cache", detail: "Spend body heat for sealed rations.", effects: { warmth: -2, supplies: 3 }, route: 1 },
      { id: "c2-shelter", title: "Build an early shelter", detail: "Use canvas and wait for the gusts to ease.", effects: { warmth: 2, supplies: -2 }, route: 0 },
      { id: "c2-follow", title: "Follow Mara's pine route", detail: "Trust her shorter unmarked line.", effects: { supplies: -1, trust: 2 }, route: 0 },
    ],
  },
  {
    name: "Camp 3",
    location: "White basin",
    report: "The basin reflects the last daylight. Tracks split toward the ridge marker and a shallow cave.",
    choices: [
      { id: "c3-marker", title: "Take the ridge marker", detail: "Keep the observatory in sight.", effects: { warmth: -2, trust: -1 }, route: 1 },
      { id: "c3-cave", title: "Rest in the shallow cave", detail: "Burn a ration block and warm both bedrolls.", effects: { warmth: 2, supplies: -2, trust: 1 }, route: 0 },
      { id: "c3-rations", title: "Give Mara the last sweet ration", detail: "Move slowly while she recovers.", effects: { supplies: -2, trust: 3 }, route: 0 },
    ],
  },
  {
    name: "Camp 4",
    location: "Mirror pass",
    report: "A brass post points toward the observatory. Your signal lens can mark the route, but its flare will crack the glass.",
    choices: [
      { id: "c4-lens", title: "Use the signal lens", detail: "Spend the relic so Mara can follow your light.", effects: { warmth: -1, supplies: -1, trust: 2 }, route: 1, usesRelic: true },
      { id: "c4-wrap", title: "Keep the lens wrapped", detail: "Save the relic and descend together.", effects: { warmth: 1, supplies: -1, trust: 1 }, route: 0 },
      { id: "c4-cut", title: "Cut straight across the pass", detail: "Keep the high line without waiting.", effects: { warmth: -2, trust: -2 }, route: 2 },
    ],
  },
  {
    name: "Camp 5",
    location: "Last cairn",
    report: "The final cairn has fallen. You have enough lamp oil for the climb or enough canvas for one protected rest.",
    choices: [
      { id: "c5-climb", title: "Burn oil on the climb", detail: "Spend supplies to hold the upper route.", effects: { supplies: -3, warmth: 1 }, route: 1 },
      { id: "c5-rest", title: "Pitch the canvas", detail: "Take warmth now and surrender the high route.", effects: { warmth: 3, supplies: -2 }, route: -1 },
      { id: "c5-ask", title: "Let Mara decide", detail: "Give her the compass and follow.", effects: { warmth: -1, trust: 3 }, route: 0 },
    ],
  },
  {
    name: "Camp 6",
    location: "Observatory steps",
    report: "Night covers the valley. The door is iced shut, and the return shelter is one ridge below.",
    choices: [
      { id: "c6-door", title: "Force the observatory door", detail: "Use the last tools and hold the high ground.", effects: { supplies: -2, warmth: -1 }, route: 1 },
      { id: "c6-together", title: "Work the hinge together", detail: "Move slowly and follow Mara's count.", effects: { warmth: -1, trust: 2 }, route: 0 },
      { id: "c6-return", title: "Descend to the return shelter", detail: "End the climb while the route is still visible.", effects: { warmth: -1, supplies: -1 }, route: -2 },
    ],
  },
];

export const weatherSeeds: WeatherSeed[] = [
  { id: "MIST-042", name: "Crosswind", note: "Cold gusts reach camps 2, 4, and 6.", relic: "signal lens", penalties: [{}, { warmth: -1 }, {}, { warmth: -1 }, {}, { warmth: -1 }], paid: false },
  { id: "FROST-118", name: "Hard frost", note: "Food freezes at the basin and last cairn.", relic: "charcoal chart", penalties: [{ warmth: -1 }, {}, { supplies: -1 }, {}, { supplies: -1 }, {}], paid: true },
  { id: "RAIN-233", name: "Needle rain", note: "Wet canvas costs warmth on low routes.", relic: "waxed match case", penalties: [{}, { warmth: -1 }, { warmth: -1 }, {}, {}, { supplies: -1 }], paid: true },
  { id: "CLEAR-307", name: "Clear cold", note: "The route is visible, but the final ridge freezes fast.", relic: "brass star chart", penalties: [{}, {}, {}, {}, { warmth: -1 }, { warmth: -2 }], paid: true },
  { id: "SNOW-414", name: "Dry snow", note: "Drifts take supplies to cross.", relic: "red survey thread", penalties: [{ supplies: -1 }, {}, { supplies: -1 }, {}, { supplies: -1 }, {}], paid: true },
  { id: "THAW-526", name: "Late thaw", note: "Soft ground slows the middle camps.", relic: "folding field cup", penalties: [{}, {}, { warmth: -1, supplies: -1 }, { warmth: -1 }, {}, {}], paid: true },
  { id: "CLOUD-619", name: "Low cloud", note: "Mara must lead when the ridge disappears.", relic: "blue glass compass", penalties: [{}, { trust: -1 }, {}, { trust: -1 }, {}, { trust: -1 }], paid: true },
  { id: "GALE-702", name: "Ridge gale", note: "The upper route costs heat.", relic: "copper wind gauge", penalties: [{}, { warmth: -1 }, { warmth: -1 }, { warmth: -1 }, {}, {}], paid: true },
  { id: "ASH-835", name: "Ash sky", note: "Dark snow hides two supply markers.", relic: "etched quartz lens", penalties: [{ supplies: -1 }, {}, {}, { supplies: -1 }, {}, { warmth: -1 }], paid: true },
];

export const endings: Record<EndingId, { name: string; summary: string }> = {
  lost: { name: "The light goes out", summary: "The expedition stops before the last descent. You and Mara mark the route for a safe recovery team." },
  dawn: { name: "A shared dawn", summary: "The spent lens guides Mara through the last whiteout. You open the observatory together as morning reaches the ridge." },
  signal: { name: "The observatory signal", summary: "Your high route leaves enough gear to wake the old beacon. Its first pulse crosses the valley before night settles." },
  return: { name: "The sheltered return", summary: "You turn from the summit and reach the lower shelter. The expedition ends safely, with a route worth trying again." },
};

export function createGame(seedId = "MIST-042"): GameState {
  if (!weatherSeeds.some((seed) => seed.id === seedId)) throw new Error("Unknown weather seed");
  return { seedId, campIndex: 0, resources: { warmth: 7, supplies: 7, trust: 7 }, choices: [], routeScore: 0, relicUsed: false, ending: null };
}

export function resolveEnding(state: Pick<GameState, "resources" | "routeScore" | "relicUsed">): EndingId {
  const { warmth, supplies, trust } = state.resources;
  if (warmth <= 0 || supplies <= 0 || trust <= 0) return "lost";
  if (trust >= 12 && state.relicUsed) return "dawn";
  if (state.routeScore >= 4 && warmth >= 2 && supplies >= 2) return "signal";
  return "return";
}

export function choose(state: GameState, choiceId: string): GameState {
  if (state.ending) throw new Error("This expedition has ended");
  const camp = camps[state.campIndex];
  const choice = camp?.choices.find((item) => item.id === choiceId);
  if (!camp || !choice) throw new Error("That route choice is not available");
  const seed = weatherSeeds.find((item) => item.id === state.seedId);
  if (!seed) throw new Error("Weather seed is missing");
  const penalty = seed.penalties[state.campIndex] ?? {};
  const nextResources: Resources = {
    warmth: state.resources.warmth + (choice.effects.warmth ?? 0) + (penalty.warmth ?? 0),
    supplies: state.resources.supplies + (choice.effects.supplies ?? 0) + (penalty.supplies ?? 0),
    trust: state.resources.trust + (choice.effects.trust ?? 0) + (penalty.trust ?? 0),
  };
  const campIndex = state.campIndex + 1;
  const next: GameState = {
    ...state,
    campIndex,
    resources: nextResources,
    choices: [...state.choices, choice.id],
    routeScore: state.routeScore + choice.route,
    relicUsed: state.relicUsed || Boolean(choice.usesRelic),
    ending: null,
  };
  if (campIndex === camps.length) {
    next.ending = resolveEnding(next);
  }
  return next;
}

export function effectText(choice: Choice): string {
  return (Object.entries(choice.effects) as Array<[Resource, number]>)
    .filter(([, value]) => value !== 0)
    .map(([name, value]) => `${name} ${value > 0 ? "+" : ""}${value}`)
    .join(" · ");
}
