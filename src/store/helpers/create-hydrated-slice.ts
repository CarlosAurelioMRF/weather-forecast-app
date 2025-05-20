import {
  ActionReducerMapBuilder,
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'
import { castDraft } from 'immer'

export const createHydratedSlice = <
  T,
  Reducers extends SliceCaseReducers<T>,
  Name extends string = string
>({
  name,
  initialState,
  reducers,
  extraReducers,
}: {
  name: Name
  initialState: T
  reducers: ValidateSliceCaseReducers<T, Reducers>
  extraReducers?: ((builder: ActionReducerMapBuilder<T>) => void) | undefined
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      resetState: (state) => {
        state = castDraft(initialState)
        return state
      },
      ...reducers,
    },
    extraReducers,
  })
}
