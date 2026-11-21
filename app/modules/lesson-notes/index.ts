import { describeDraft, type NoteDraft } from "./lib/draft";

export type { NoteDraft };

/**
 * What the Lesson note composer shows for the text in the box: the count
 * against the limit, whether there is anything new to save, and whether the
 * server would accept it. `savedBody` is the Note as last saved (the server
 * stores it trimmed), or "" when the Student has not written one.
 */
export function describeNoteDraft(draft: string, savedBody: string): NoteDraft {
  return describeDraft(draft, savedBody);
}
