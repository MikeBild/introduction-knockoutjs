import ko from 'knockout'

export type Validator<T> = (value: T) => string | null

// TODO: Types with ko.Observable<T> and ko.PureComputed<…> instead of any
export type Field<T> = {
  value: any
  error: any
  isValid: any
}

// TODO: value as an Observable with initial, error as a pureComputed from validate(value()),
//       isValid as a pureComputed (true when error is null)
export const createField = <T>(initial: NoInfer<T>, validate: Validator<T>): Field<T> => {
  void validate
  const value = ko.observable(initial)
  return { value, error: ko.pureComputed(() => 'TODO'), isValid: ko.pureComputed(() => false) }
}
