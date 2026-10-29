export type CspOptions = {
  // Knockout 3.5 übersetzt data-bind-Ausdrücke mit new Function – ohne 'unsafe-eval' bindet nichts
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

// Trusted Types: nur diese Policy darf HTML erzeugen. Knockout 3.5.2+ reicht TrustedHTML im html-Binding durch.
// Ohne Browser-Support (oder in happy-dom) gilt derselbe Vertrag als einfacher Fallback.
export const createHtmlPolicy = (sanitize: Sanitize): HtmlPolicy => {
  const factory = (globalThis as { trustedTypes?: TrustedTypesFactory }).trustedTypes
  return factory?.createPolicy('knockout-html', { createHTML: sanitize }) ?? { createHTML: sanitize }
}
