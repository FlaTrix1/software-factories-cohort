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

export function describeDraft(draft: string, savedBody: string): NoteDraft {
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
