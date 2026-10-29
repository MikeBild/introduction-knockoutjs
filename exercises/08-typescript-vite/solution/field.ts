import ko from 'knockout'

export type Validator<T> = (value: T) => string | null

export type Field<T> = {
  value: ko.Observable<T>
  error: ko.PureComputed<string | null>
  isValid: ko.PureComputed<boolean>
}

// Der Validator bestimmt T, NoInfer verhindert Literal-Types wie 17 aus dem Startwert
export const createField = <T>(initial: NoInfer<T>, validate: Validator<T>): Field<T> => {
  const value = ko.observable(initial) as ko.Observable<T>
  const error = ko.pureComputed(() => validate(value()))
  const isValid = ko.pureComputed(() => error() === null)
  return { value, error, isValid }
}
