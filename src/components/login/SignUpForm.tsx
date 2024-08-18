import React, { useState } from 'react'

import { supabase } from '../../../utils/supabase.ts'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { authInputSchema, type AuthFormInput } from '../../../types/AuthFormInput'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

const SignUp = () => {
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const { handleSubmit, control } = useForm<AuthFormInput>({
        resolver: zodResolver(authInputSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleSignUp = async (data: AuthFormInput) => {
        const { email, password } = data
        const { error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            setError(error.message)
        } else {
            navigate('/dashboard')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                    <Typography component="h1" variant="h4">
                        サインアップ
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(handleSignUp)}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="メールアドレス"
                                    autoComplete="email"
                                    autoFocus
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="パスワード"
                                    type="password"
                                    autoComplete="current-password"
                                    {...field}
                                />
                            )}
                        />
                        {error && (
                            <Typography color="error" align="center">
                                {error}
                            </Typography>
                        )}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            サインアップ
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {'アカウントを持っている場合'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignUp
