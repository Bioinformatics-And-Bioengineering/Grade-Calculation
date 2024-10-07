import { createAsyncThunk } from '@reduxjs/toolkit'
import { TestSubject, TestSubjects } from './slice'
import { supabase } from '../../utils/supabase'

import { Database } from '@/types/supabase'

type SubjectRow = Database['public']['Tables']['subjects']['Row']

export const fetchTestSubjectsList = createAsyncThunk<TestSubjects[], { termName: string }, { rejectValue: string }>(
  'testSubject/fetchAllData',
  async ({ termName }, { rejectWithValue }) => {
    try {
      const {
        data: { user: authedUser }
      } = await supabase.auth.getUser()
      if (!authedUser) {
        return rejectWithValue('認証されたユーザーが見つかりません')
      }

      const { data, error } = await supabase
        .from('tests')
        .select(
          `
        id,
        test_name,
        term_id (term_name),
        subjects (
          id,
          subject_name,
          score,
          max_score
        )
        `
        )
        .eq('term_id.term_name', termName)
        .eq('user_id', authedUser.id)

      if (error) {
        console.log(error)
        return rejectWithValue('データ取得に失敗しました: ' + error.message)
      }

      const formattedData: TestSubjects[] = data.map((test) => ({
        testId: test.id,
        testName: test.test_name,
        testSubjects: (test.subjects as SubjectRow[]).map((subject) => ({
          id: subject.id,
          name: subject.subject_name,
          score: subject.score,
          maxScore: subject.max_score
        }))
      }))

      return formattedData
    } catch (error) {
      console.log(error)
      return rejectWithValue('予期しないエラーが発生しました')
    }
  }
)

export const updateTestSubject = createAsyncThunk<TestSubjects, { updateData: TestSubject }, { rejectValue: string }>(
  'testSubject/update',
  async ({ updateData }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from('tests').update(updateData).eq('id', updateData.id)

      if (error) {
        return rejectWithValue('データ更新に失敗しました: ' + error.message)
      }
      return data ? data[0] : rejectWithValue('データが見つかりません')
    } catch (error) {
      console.log(error)
      return rejectWithValue('予期しないエラーが発生しました')
    }
  }
)

export const modifySubjectInfo = createAsyncThunk<
  { testId: string; subject: TestSubject },
  { testId: string; subject: TestSubject },
  { rejectValue: string }
>('testSubject/modifySubjectInfo', async (payload: { testId: string; subject: TestSubject }, { rejectWithValue }) => {
  try {
    const { error } = await supabase
      .from('subjects')
      .update({
        subject_name: payload.subject.name,
        score: payload.subject.score,
        max_score: payload.subject.maxScore
      })
      .eq('id', payload.subject.id)
    if (error) {
      return rejectWithValue(error.message)
    }

    return { testId: payload.testId, subject: payload.subject }
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message)
    } else {
      return rejectWithValue(`Unknown error: ${err}`)
    }
  }
})
