export type Rule =
  | 'dependent-observable'
  | 'html-binding'
  | 'inline-function'
  | 'global-ko'
  | 'jquery-template'
  | 'mapping-plugin'

export type Finding = { rule: Rule; line: number }

// Je Regel ein Muster, das eine Zeile als Altlast markiert
const rules: Array<{ rule: Rule; pattern: RegExp }> = [
  { rule: 'dependent-observable', pattern: /\bko\.dependentObservable\s*\(/ },
  { rule: 'html-binding', pattern: /data-bind\s*=\s*["'][^"']*\bhtml\s*:/ },
  { rule: 'inline-function', pattern: /data-bind\s*=\s*["'][^"']*\bfunction\s*\(/ },
  { rule: 'global-ko', pattern: /(^|[^.\w])ko\.applyBindings\s*\(/ },
  { rule: 'jquery-template', pattern: /type\s*=\s*["']text\/x-jquery-tmpl["']|\.tmpl\s*\(/ },
  { rule: 'mapping-plugin', pattern: /\bko\.mapping\b|knockout\.mapping/ },
]

export const auditLegacy = (source: string): Finding[] => {
  const hasEsmImport = /^\s*import\s+(\w+|\*\s+as\s+\w+)\s+from\s+["']knockout["']/m.test(source)
  return source.split('\n').flatMap((text, index) =>
    rules
      .filter(({ rule, pattern }) => !(rule === 'global-ko' && hasEsmImport) && pattern.test(text))
      .map(({ rule }) => ({ rule, line: index + 1 })),
  )
}
