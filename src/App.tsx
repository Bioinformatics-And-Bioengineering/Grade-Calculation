import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import SignUp from './components/login/SignUpForm.tsx'
import Login from './components/login/index.tsx'
import PasswordReset from './components/login/PasswordReset.tsx'
import Dashboard from './pages/dashboard.tsx'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase.ts'

const PrivateRoutes = () => {
    const location = useLocation()

    const [isLogin, setIsLogin] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser()
            setIsLogin(!!user) // ユーザーが存在するかどうかを判定
        }
        checkAuth()
    }, [])

    if (isLogin === null) {
        return <div>Loading...</div> // 判定中のロード画面などを表示
    }
    if (isLogin == false) {
        return <Navigate to="/login" state={{ redirectPath: location.pathname }} />
    }
    return <Login />
}

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/" element={<></>} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App
