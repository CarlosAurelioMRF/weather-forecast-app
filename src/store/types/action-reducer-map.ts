import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  PayloadAction,
} from '@reduxjs/toolkit'

export type ActionMap<T> = T extends void
  ? ActionCreatorWithoutPayload
  : ActionCreatorWithPayload<T>

export type ReducerMap<S, T = void> = (state: S, payload: PayloadAction<T>) => void
