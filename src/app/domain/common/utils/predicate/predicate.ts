import { Either, Error, Success } from '~/app/domain/common/utils'

export type Predicate<N> = (value: N) => boolean

export type CombinedPredicated<R, L> = Array<[Predicate<R>, L]>

export const predicate = <L, R>({
  error,
  value,
  predicate,
}: {
  error: L
  value: R
  predicate: Predicate<R>
}): Either<L, R> => {
  if (!predicate(value)) return new Error(error)
  return new Success(value)
}

export const combinedPredicates = <L, R>({
  value,
  predicatePairs,
}: {
  value: R
  predicatePairs: CombinedPredicated<R, L>
}): Either<L, R> => {
  for (const [verifier, error] of predicatePairs) {
    if (verifier(value)) {
      return new Error(error)
    }
  }

  return new Success(value)
}
