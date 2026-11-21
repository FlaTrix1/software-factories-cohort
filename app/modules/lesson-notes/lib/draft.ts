import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteDraft = {
  /** Characters the server will keep: it trims the body before saving. */
  length: number;
  limit: number;
  tooLong: boolean;
  /** The draft differs from the last saved body. */
  unsaved: boolean;
  canSave: boolean;
};

/**
 * What the Lesson note composer shows for the text in the box: the count
 * against the limit, whether there is anything new to save, and whether the
 * server would accept it. `savedBody` is the Note as last saved (the server
 * stores it trimmed), or "" when the Student has not written one.
 */
export function describeNoteDraft(draft: string, savedBody: string): NoteDraft {
  const trimmed = draft.trim();
  const length = trimmed.length;
  const tooLong = length > MAX_NOTE_LENGTH;
  const unsaved = trimmed !== savedBody;
  return {
    length,
    limit: MAX_NOTE_LENGTH,
    tooLong,
    unsaved,
    canSave: unsaved && length > 0 && !tooLong,
  };
}
