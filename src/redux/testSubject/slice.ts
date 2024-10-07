import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTestSubjectsList, modifySubjectInfo } from './action'

export interface TestSubject {
  id: string
  name: string
  score: number
  maxScore: number
}

export interface TestSubjects {
  testId: string
  testName: string
  testSubjects: TestSubject[]
}

export interface TestSubjectsListState {
  testSubjectsList: TestSubjects[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TestSubjectsListState = {
  testSubjectsList: [],
  status: 'idle',
  error: null
}

export const testSubjectSlice = createSlice({
  name: 'testSubjects',
  initialState,
  reducers: {
    addSubject: (state, action: PayloadAction<{ testId: string; subject: TestSubject }>) => {
      const { testId, subject } = action.payload
      const targetTest = state.testSubjectsList.find((test) => test.testId === testId)

      if (targetTest) {
        targetTest.testSubjects.push(subject)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestSubjectsList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTestSubjectsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.testSubjectsList = action.payload
      })
      .addCase(fetchTestSubjectsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'エラーが発生しました'
      })
      // .addCase(modifySubjectInfo.pending, (state) => {
      // state.status = 'loading'
      // })
      .addCase(
        modifySubjectInfo.fulfilled,
        (state, action: PayloadAction<{ testId: string; subject: TestSubject }>) => {
          state.status = 'succeeded'
          const { testId, subject } = action.payload

          const targetTest = state.testSubjectsList.find((test: TestSubjects) => test.testId === testId)
          if (targetTest) {
            const targetSubjectIndex = targetTest.testSubjects.findIndex((subj) => subj.id === subject.id)
            if (targetSubjectIndex !== -1) {
              targetTest.testSubjects[targetSubjectIndex] = subject
            }
          }
        }
      )
      .addCase(modifySubjectInfo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'エラーが発生しました'
      })
  }
})

export const { addSubject } = testSubjectSlice.actions
export default testSubjectSlice.reducer
