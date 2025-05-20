import { createAction } from '@reduxjs/toolkit'
import { store } from '../store'

export const resetState = (sliceName: keyof ReturnType<typeof store.getState>) =>
  createAction(`${sliceName}/resetState`)()
