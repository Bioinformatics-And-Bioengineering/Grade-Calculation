import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { supabase } from '@/utils/supabase.ts'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'

const theme = createTheme()

// Zod schema for form validation
const schema = z.object({
  email: z.string().email('正しいメールアドレスを入力してください')
})

type FormData = z.infer<typeof schema>

const PasswordReset = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const [message, setMessage] = useState<string | null>(null)

  const handlePasswordReset = async (data: FormData) => {
    setMessage(null)
    const { error } = await supabase.auth.resetPasswordForEmail(data.email)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('パスワードリセットのリンクをメールで送信しました。')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h4'>
            パスワードリセット
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(handlePasswordReset)}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='メールアドレス'
                  autoComplete='email'
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
            {message && (
              <Typography color={message.includes('送信') ? 'primary' : 'error'} align='center'>
                {message}
              </Typography>
            )}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              リセットリンクを送信
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  ログイン画面に戻る
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default PasswordReset
