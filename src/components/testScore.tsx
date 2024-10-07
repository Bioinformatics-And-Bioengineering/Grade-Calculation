import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import CircleScore from './circleScore.tsx'
import { TestSubject } from '../redux/testSubject/slice.ts'
import { modifySubjectInfo } from '@/redux/testSubject/action.ts'
import { AppDispatch } from '@/redux/store.ts'

type TestScoreProps = {
  testId: string
  termId: string
  subject: TestSubject
}

const TestScore: React.FC<TestScoreProps> = (props) => {
  const {
    testId,
    subject: { id, name: subjectName, score, maxScore }
  } = props

  const percentage = (score / maxScore) * 100

  const [modalOpen, setModalOpen] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const { control, handleSubmit } = useForm<TestSubject>({
    defaultValues: {
      name: subjectName,
      score: score,
      maxScore: maxScore
    }
  })

  const validationRules = {
    name: {
      required: '科目名を入力してください。'
    },
    score: {},
    maxScore: {}
  }

  const handleClickOpen = () => {
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const onSubmit = (data: TestSubject) => {
    const payload = {
      testId: testId,
      subject: { ...data, id: id, score: Number(data.score), maxScore: Number(data.maxScore) }
    }
    dispatch(modifySubjectInfo(payload))
    console.log(payload)
    setModalOpen(false)
  }

  return (
    <Box
      alignItems='center'
      display='flex'
      sx={{
        bgcolor: '#eeeeee',
        padding: '8px',
        borderRadius: '5px',
        width: '100%',
        height: '80px',
        marginBottom: '8px'
      }}
    >
      <Typography sx={{ marginRight: '8px', width: '30%' }}>{subjectName}</Typography>

      <CircleScore score={score} maxScore={maxScore} />
      <Box sx={{ flexGrow: 1, marginLeft: '16px', marginRight: '8px' }}>
        <LinearProgress
          variant='determinate'
          value={percentage}
          sx={{
            height: '50px',
            border: '2px solid #726c6c',
            backgroundColor: '#D9D9D9',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#48CAC3'
            }
          }}
        />
      </Box>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={modalOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>科目情報</DialogTitle>
          <DialogContent>
            <Controller
              name='name'
              control={control}
              rules={validationRules.name}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  required
                  margin='dense'
                  id='subjectName'
                  label='科目名'
                  type='text'
                  fullWidth
                  variant='standard'
                />
              )}
            />
            <Controller
              name='score'
              control={control}
              rules={validationRules.score}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin='dense'
                  id='score'
                  label='点数'
                  type='number'
                  fullWidth
                  variant='standard'
                  onFocus={(e) =>
                    e.target.addEventListener(
                      'wheel',
                      (e) => {
                        e.preventDefault()
                      },
                      { passive: false }
                    )
                  }
                  onBlur={(e) =>
                    e.target.removeEventListener('wheel', (e) => {
                      e.preventDefault()
                    })
                  }
                />
              )}
            />
            <Controller
              name='maxScore'
              control={control}
              rules={validationRules.maxScore}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin='dense'
                  id='maxScore'
                  label='最大点数'
                  type='number'
                  fullWidth
                  variant='standard'
                  onFocus={(e) =>
                    e.target.addEventListener(
                      'wheel',
                      (e) => {
                        e.preventDefault()
                      },
                      { passive: false }
                    )
                  }
                  onBlur={(e) =>
                    e.target.removeEventListener('wheel', (e) => {
                      e.preventDefault()
                    })
                  }
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type='submit'>修正</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default TestScore
