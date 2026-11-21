import { describe, it, expect } from "vitest";
import { describeNoteDraft } from "../index";

describe("describeNoteDraft", () => {
  it("cannot save an empty box when there is no Note yet", () => {
    expect(describeNoteDraft("", "")).toEqual({
      length: 0,
      limit: 2000,
      tooLong: false,
      unsaved: false,
      canSave: false,
    });
  });

  it("cannot save whitespace only, though it differs from the saved Note", () => {
    const draft = describeNoteDraft("   \n ", "old note");
    expect(draft.unsaved).toBe(true);
    expect(draft.length).toBe(0);
    expect(draft.canSave).toBe(false);
  });

  it("can save new text", () => {
    const draft = describeNoteDraft("Position beats length", "");
    expect(draft).toMatchObject({ length: 21, unsaved: true, canSave: true });
  });

  it("has nothing to save when the text matches the saved Note", () => {
    const draft = describeNoteDraft("same", "same");
    expect(draft.unsaved).toBe(false);
    expect(draft.canSave).toBe(false);
  });

  it("ignores surrounding whitespace, as the server trims it", () => {
    const draft = describeNoteDraft("  same  \n", "same");
    expect(draft.length).toBe(4);
    expect(draft.unsaved).toBe(false);
  });

  it("accepts exactly the limit", () => {
    const draft = describeNoteDraft("a".repeat(2000), "");
    expect(draft.tooLong).toBe(false);
    expect(draft.canSave).toBe(true);
  });

  it("refuses one character over the limit", () => {
    const draft = describeNoteDraft("a".repeat(2001), "");
    expect(draft).toMatchObject({
      length: 2001,
      tooLong: true,
      canSave: false,
    });
  });
});
