import { configureStore } from '@reduxjs/toolkit'
import testSubjectReducer from './testSubject/slice'

export const store = configureStore({
  reducer: {
    testSubject: testSubjectReducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
