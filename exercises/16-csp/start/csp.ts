export type CspOptions = {
  allowEval: boolean
  reportTo?: string
  trustedTypes?: boolean
}

// TODO: Join the directives with “; ”, in this order:
//   default-src 'self'
//   script-src 'self' (plus 'unsafe-eval' when allowEval)
//   object-src 'none'
//   base-uri 'none'
//   frame-ancestors 'none'
//   require-trusted-types-for 'script' (only with trustedTypes)
//   report-to <reportTo> (only with reportTo)
export const buildCsp = (options: CspOptions): string => {
  void options
  return ''
}

type Sanitize = (html: string) => string
export type HtmlPolicy = { createHTML(input: string): unknown }
type TrustedTypesFactory = {
  createPolicy(name: string, rules: { createHTML: Sanitize }): HtmlPolicy
}

// TODO: If globalThis.trustedTypes exists, create the policy 'knockout-html' with createHTML: sanitize.
//       Otherwise return an object { createHTML: sanitize } as a fallback.
//       Important: in both cases every piece of HTML runs through sanitize.
export const createHtmlPolicy = (sanitize: Sanitize): HtmlPolicy => {
  void sanitize
  const factory = (globalThis as { trustedTypes?: TrustedTypesFactory }).trustedTypes
  void factory
  return { createHTML: (html) => html }
}
