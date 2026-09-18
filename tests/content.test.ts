import { describe, expect, it } from "vitest";
import { allWords, lessons, situations } from "../lib/content";

describe("Ameritalk learning content", () => {
  it("contains progressive lessons for all three levels", () => {
    expect(lessons.length).toBeGreaterThanOrEqual(4);
    expect(new Set(lessons.map((lesson) => lesson.level))).toEqual(new Set(["Beginner", "Intermediate", "Advanced"]));
    expect(lessons.every((lesson) => lesson.words.length >= 4 && lesson.dialogue.length >= 3)).toBe(true);
  });

  it("keeps word ids unique and provides context for each word", () => {
    const ids = allWords.map((word) => word.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(allWords.every((word) => word.english && word.french && word.example && word.phonetic)).toBe(true);
  });

  it("offers practical situation practice cards", () => {
    expect(situations.length).toBeGreaterThanOrEqual(4);
    expect(situations.every((situation) => situation.title && situation.detail && situation.icon)).toBe(true);
  });
});
