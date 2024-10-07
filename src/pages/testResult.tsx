import { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { TestScore, Header } from '@/components'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchTestSubjectsList } from '@/redux/testSubject/action'
import { TestSubjects } from '../redux/testSubject/slice'

const TestResult = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { testSubjectsList, status, error } = useSelector((state: RootState) => state.testSubject)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTestSubjectsList({ termName: '３年後期' }))
    }
  }, [dispatch, status])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <>
      <Header />
      <Box display='flex' alignItems='center' justifyContent='center' marginTop={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h3' textAlign='center'>
              中間・期末テスト
            </Typography>
          </Grid>
          {(testSubjectsList as TestSubjects[]).map((testSubjects) => {
            return (
              <Grid item xs={12} md={6} key={testSubjects.testName}>
                <Typography variant='h5' textAlign='center'>
                  {testSubjects.testName}
                </Typography>
                {testSubjects.testSubjects.map((subject) => {
                  return (
                    <Box m={2} key={`${testSubjects.testName}-${subject.name}`}>
                      <TestScore
                        testId={testSubjects.testId}
                        termId={'32b51308-229f-4381-b3ae-9415dc2cfa75'}
                        subject={subject}
                      />
                    </Box>
                  )
                })}
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

export default TestResult
