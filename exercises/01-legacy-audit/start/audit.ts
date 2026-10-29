export type Rule =
  | 'dependent-observable'
  | 'html-binding'
  | 'inline-function'
  | 'global-ko'
  | 'jquery-template'
  | 'mapping-plugin'

export type Finding = { rule: Rule; line: number }

// TODO: Lege je Regel ein Muster an (RegExp), das eine Zeile als Altlast erkennt.
// TODO: Gib je Treffer { rule, line } zurück, line zählt ab 1.
// TODO: Melde global-ko nicht, wenn die Datei Knockout per ESM importiert.
export const auditLegacy = (source: string): Finding[] => {
  void source
  return []
}
