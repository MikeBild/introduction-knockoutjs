import ko from 'knockout'

export type Validator<T> = (value: T) => string | null

// TODO: Typen mit ko.Observable<T> und ko.PureComputed<…> statt any
export type Field<T> = {
  value: any
  error: any
  isValid: any
}

// TODO: value als Observable mit initial, error als pureComputed aus validate(value()),
//       isValid als pureComputed (true, wenn error null ist)
export const createField = <T>(initial: NoInfer<T>, validate: Validator<T>): Field<T> => {
  void validate
  const value = ko.observable(initial)
  return { value, error: ko.pureComputed(() => 'TODO'), isValid: ko.pureComputed(() => false) }
}
