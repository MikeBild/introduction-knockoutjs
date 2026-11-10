export type CspOptions = {
  // Knockout 3.5 translates data-bind expressions with new Function – without 'unsafe-eval' nothing binds
  allowEval: boolean
  reportTo?: string
  trustedTypes?: boolean
}

export const buildCsp = ({ allowEval, reportTo, trustedTypes = false }: CspOptions): string =>
  [
    "default-src 'self'",
    allowEval ? "script-src 'self' 'unsafe-eval'" : "script-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    ...(trustedTypes ? ["require-trusted-types-for 'script'"] : []),
    ...(reportTo ? [`report-to ${reportTo}`] : []),
  ].join('; ')

type Sanitize = (html: string) => string
export type HtmlPolicy = { createHTML(input: string): unknown }
type TrustedTypesFactory = {
  createPolicy(name: string, rules: { createHTML: Sanitize }): HtmlPolicy
}

// Trusted Types: only this policy may create HTML. Knockout 3.5.2+ passes TrustedHTML through in the html binding.
// Without browser support (or in happy-dom) the same contract applies as a simple fallback.
export const createHtmlPolicy = (sanitize: Sanitize): HtmlPolicy => {
  const factory = (globalThis as { trustedTypes?: TrustedTypesFactory }).trustedTypes
  return factory?.createPolicy('knockout-html', { createHTML: sanitize }) ?? { createHTML: sanitize }
}
