import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom'
import SignUp from '@/components/login/signUpForm.tsx'
import Login from '@/components/login/signIn.tsx'
import PasswordReset from '@/components/login/passwordReset.tsx'
import Dashboard from '@/pages/dashboard.tsx'
import TestResult from '@/pages/testResult.tsx'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase.ts'

const PrivateRoutes = () => {
  const location = useLocation()

  const [isLogin, setIsLogin] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (session?.user) {
        setIsLogin(true)
      } else {
        const {
          data: { user }
        } = await supabase.auth.getUser()
        setIsLogin(!!user)
      }
    }
    checkAuth()
  }, [])

  if (isLogin === null) {
    return <div>Loading...</div> // ローディング中
  }

  if (isLogin === false) {
    return <Navigate to='/login' state={{ redirectPath: location.pathname }} /> // 未ログインならログインページにリダイレクト
  }

  return <Outlet />
}

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* 公開ルート */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/password-reset' element={<PasswordReset />} />

          {/* プライベートルート */}
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/test' element={<TestResult />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
