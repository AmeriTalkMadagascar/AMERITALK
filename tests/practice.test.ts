import { describe, expect, it } from "vitest";
import { allWords } from "../lib/content";
import { calculateScore, dueReviewWordIds, lessonXp, pronunciationFeedback, pronunciationScore, shouldAutoStopVoice, weakWordIds } from "../lib/practice";

describe("Practice scoring", () => {
  it("calculates bounded percentage scores", () => {
    expect(calculateScore(1, 1)).toBe(100);
    expect(calculateScore(1, 2)).toBe(50);
    expect(calculateScore(4, 0)).toBe(0);
    expect(calculateScore(7, 2)).toBe(100);
  });

  it("prioritizes mistakes for smart review", () => {
    expect(weakWordIds(["water", "hello"], ["from", "name"])).toEqual(["water", "hello"]);
    expect(weakWordIds([], ["from", "name"], 1)).toEqual(["from"]);
  });

  it("returns actionable pronunciation feedback", () => {
    const word = allWords[0];
    expect(pronunciationFeedback(90, word).title).toContain("Good");
    expect(pronunciationFeedback(72, word).detail).toContain(word.english);
    expect(pronunciationFeedback(50, word).title).toContain("again");
  });

  it("scores a transcription against the target phrase", () => {
    expect(pronunciationScore("Hello my name is Alex", "Hello my name is Alex")).toBe(100);
    expect(pronunciationScore("Hello my name is Alex", "Hello name is Alex")).toBe(80);
    expect(pronunciationScore("Hello", "")).toBe(0);
  });

  it("waits for a short silence after speech before stopping", () => {
    expect(shouldAutoStopVoice({ metering: -60, hasDetectedSpeech: true, silenceDurationMillis: 500, durationMillis: 1800 })).toBe(false);
    expect(shouldAutoStopVoice({ metering: -60, hasDetectedSpeech: true, silenceDurationMillis: 900, durationMillis: 2200 })).toBe(true);
    expect(shouldAutoStopVoice({ metering: -60, hasDetectedSpeech: false, silenceDurationMillis: 1200, durationMillis: 2200 })).toBe(false);
    expect(shouldAutoStopVoice({ metering: -20, hasDetectedSpeech: true, silenceDurationMillis: 1000, durationMillis: 2200 })).toBe(false);
    expect(shouldAutoStopVoice({ metering: -20, hasDetectedSpeech: false, silenceDurationMillis: 0, durationMillis: 8000 })).toBe(true);
  });

  it("rewards harder lessons and streaks with more XP", () => {
    expect(lessonXp("Advanced", 4, 100)).toBeGreaterThan(lessonXp("Beginner", 1, 70));
    expect(lessonXp("Beginner", 1, 100)).toBeGreaterThan(lessonXp("Beginner", 1, 70));
  });

  it("returns due review words in oldest-first order", () => {
    expect(dueReviewWordIds({ hello: "2026-09-10", water: "2026-09-12", name: "2026-09-20" }, "2026-09-14")).toEqual(["hello", "water"]);
  });
});
