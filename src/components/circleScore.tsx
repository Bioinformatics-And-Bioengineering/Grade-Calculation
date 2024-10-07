import React from 'react'
import { Box, Typography } from '@mui/material'

interface CircleScoreProps {
  score: number
  maxScore: number
}

const CircleScore: React.FC<CircleScoreProps> = ({ score, maxScore }) => {
  const calculateFontSize = (text: number) => {
    const length = text.toString().length
    return length > 4 ? '12px' : '16px'
  }
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '2px solid #000',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant='h6'
          component='span'
          sx={{
            position: 'absolute',
            top: '32%',
            left: '32%',
            transform: 'translate(-50%, -50%)',
            fontSize: calculateFontSize(score)
          }}
        >
          {score}
        </Typography>
        <Typography
          variant='h4'
          component='span'
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(15deg)'
          }}
        >
          /
        </Typography>
        <Typography
          variant='h6'
          component='span'
          sx={{
            position: 'absolute',
            top: '65%',
            left: '70%',
            transform: 'translate(-50%, -50%)',
            fontSize: calculateFontSize(maxScore)
          }}
        >
          {maxScore}
        </Typography>
      </Box>
    </Box>
  )
}

export default CircleScore
