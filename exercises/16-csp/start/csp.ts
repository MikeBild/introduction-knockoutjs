export type CspOptions = {
  allowEval: boolean
  reportTo?: string
  trustedTypes?: boolean
}

// TODO: Direktiven mit „; “ verbinden, in dieser Reihenfolge:
//   default-src 'self'
//   script-src 'self' (plus 'unsafe-eval', wenn allowEval)
//   object-src 'none'
//   base-uri 'none'
//   frame-ancestors 'none'
//   require-trusted-types-for 'script' (nur mit trustedTypes)
//   report-to <reportTo> (nur mit reportTo)
export const buildCsp = (options: CspOptions): string => {
  void options
  return ''
}

type Sanitize = (html: string) => string
export type HtmlPolicy = { createHTML(input: string): unknown }
type TrustedTypesFactory = {
  createPolicy(name: string, rules: { createHTML: Sanitize }): HtmlPolicy
}

// TODO: Gibt es globalThis.trustedTypes, erzeuge die Policy 'knockout-html' mit createHTML: sanitize.
//       Sonst gib ein Objekt { createHTML: sanitize } als Fallback zurück.
//       Wichtig: In beiden Fällen läuft jedes HTML durch sanitize.
export const createHtmlPolicy = (sanitize: Sanitize): HtmlPolicy => {
  void sanitize
  const factory = (globalThis as { trustedTypes?: TrustedTypesFactory }).trustedTypes
  void factory
  return { createHTML: (html) => html }
}
