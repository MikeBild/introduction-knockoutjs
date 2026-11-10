export type Rule =
  | 'dependent-observable'
  | 'html-binding'
  | 'inline-function'
  | 'global-ko'
  | 'jquery-template'
  | 'mapping-plugin'

export type Finding = { rule: Rule; line: number }

// TODO: Create one pattern (RegExp) per rule that recognizes a line as outdated.
// TODO: Return { rule, line } for each match; line counts from 1.
// TODO: Do not report global-ko when the file imports Knockout via ESM.
export const auditLegacy = (source: string): Finding[] => {
  void source
  return []
}
