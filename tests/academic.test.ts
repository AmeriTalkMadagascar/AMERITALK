import { describe, expect, it } from "vitest";
import { academicTracks, getAcademicTrack } from "../lib/academic";

describe("Academic learning tracks", () => {
  it("provides BEPC, Baccalauréat and University tracks", () => {
    expect(academicTracks.map((track) => track.id)).toEqual(["bepc", "bac", "university"]);
    expect(academicTracks.every((track) => track.modules.length === 3 && track.questions.length === 5)).toBe(true);
  });

  it("has distinct, usable answer keys for every diagnostic test", () => {
    for (const track of academicTracks) {
      for (const question of track.questions) {
        expect(question.choices).toContain(question.answer);
        expect(question.explanation.length).toBeGreaterThan(10);
      }
    }
  });

  it("falls back safely to BEPC for an unknown route", () => {
    expect(getAcademicTrack("unknown").id).toBe("bepc");
  });
});
