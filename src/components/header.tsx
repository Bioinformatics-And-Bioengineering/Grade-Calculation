import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/') // ホームページに戻る
  }

  return (
    <Box sx={{ padding: '10px', backgroundColor: '#f5f5f5', width: '100%' }}>
      <Box
        display='flex'
        alignItems='center'
        sx={{ cursor: 'pointer', width: 'fit-content' }}
        onClick={handleBackToHome}
      >
        <IconButton color='primary'>
          <HomeIcon fontSize='large' />
        </IconButton>

        <Typography variant='h5' component='div' sx={{ flexGrow: 1, textAlign: 'left' }}>
          ホーム
        </Typography>
      </Box>
    </Box>
  )
}

export default Header
