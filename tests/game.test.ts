import { describe, expect, it } from "vitest";
import { camps, choose, createGame, endings, weatherSeeds, type EndingId } from "../src/game";

function finish(sequence: string[]) {
  return sequence.reduce((state, choiceId) => choose(state, choiceId), createGame());
}

describe("deterministic expedition rules", () => {
  it("authors six camps with three irreversible choices each", () => {
    expect(camps).toHaveLength(6);
    expect(camps.every((camp) => camp.choices.length === 3)).toBe(true);
    const ids = camps.flatMap((camp) => camp.choices.map((choice) => choice.id));
    expect(new Set(ids).size).toBe(18);
  });

  it("ships one sample and eight complete-edition seeds", () => {
    expect(weatherSeeds.filter((seed) => !seed.paid)).toHaveLength(1);
    expect(weatherSeeds.filter((seed) => seed.paid)).toHaveLength(8);
    expect(new Set(weatherSeeds.map((seed) => seed.relic)).size).toBe(9);
  });

  it("replays the same seed and decisions exactly", () => {
    const choices = ["c1-share", "c2-follow", "c3-cave", "c4-lens", "c5-ask", "c6-together"];
    expect(finish(choices)).toEqual(finish(choices));
  });

  it("reaches every authored ending after six decisions", () => {
    const paths: Record<EndingId, string[]> = {
      dawn: ["c1-share", "c2-follow", "c3-cave", "c4-lens", "c5-ask", "c6-together"],
      signal: ["c1-ridge", "c2-cache", "c3-cave", "c4-wrap", "c5-climb", "c6-door"],
      return: ["c1-fire", "c2-cache", "c3-cave", "c4-wrap", "c5-rest", "c6-return"],
      lost: ["c1-ridge", "c2-cache", "c3-marker", "c4-cut", "c5-climb", "c6-door"],
    };
    for (const [expected, path] of Object.entries(paths)) {
      const state = finish(path);
      expect(state.campIndex).toBe(6);
      expect(state.choices).toHaveLength(6);
      expect(state.ending).toBe(expected);
      expect(endings[state.ending!].name).toBeTruthy();
    }
  });

  it("rejects a choice from a different camp", () => {
    expect(() => choose(createGame(), "c6-door")).toThrow("not available");
  });
});
