import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import api           from './api'
import Calendar      from './pages/Calendar'
import Todo          from './pages/Todo'
import Routine       from './pages/Routine'
import My            from './pages/My'
import Login         from './pages/Login'
import KakaoCallback from './pages/KakaoCallback'
import KakaoSignup   from './pages/KakaoSignup'

import Header from './component/Header'
import Navi   from './component/Navi'

export default function App() {
  const [isLoggedIn,  setIsLoggedIn]  = useState(false)
  const [loading,     setLoading]     = useState(true)
  const [needsSignup, setNeedsSignup] = useState(false)
  const [user,        setUser]        = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        setNeedsSignup(false)
        setIsLoggedIn(false)
        setUser(null)
        setLoading(false)
        return
      }
      try {
        const res = await api.get('/kakao/user-info', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = res.data
        if (!data || !data.nickName) {
          setNeedsSignup(true)
          setIsLoggedIn(false)
          setUser(null)
        } else {
          setUser({
            name:          data.nickName,
            profileImage:  data.profileUrl,
            statusMessage: data.introText,
          })
          setIsLoggedIn(true)
          setNeedsSignup(false)
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 404) {
          setNeedsSignup(true)
          setIsLoggedIn(false)
          setUser(null)
        } else {
          setIsLoggedIn(false)
          setNeedsSignup(false)
          setUser(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) return null

  const dummyUser = { name:'게스트', profileImage:'', statusMessage:'' }

  return (
    <Router>
      {isLoggedIn && <Header user={user} />}
      <div className="page-content">
        <Routes>
          <Route
            path="/"
            element={
              needsSignup
                ? <Navigate to="/signup" replace/>
                : isLoggedIn
                  ? <Navigate to="/calendar" replace/>
                  : <Navigate to="/login"    replace/>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={
              <KakaoSignup
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
                setNeedsSignup={setNeedsSignup}
              />
            }
          />
          <Route
            path="/callback"
            element={
              <KakaoCallback
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
                setNeedsSignup={setNeedsSignup}
              />
            }
          />
          <Route path="/calendar" element={<Calendar user={user||dummyUser} />} />
          <Route path="/todo"     element={<Todo     user={user||dummyUser} />} />
          <Route path="/routine"  element={<Routine  user={user||dummyUser} />} />
          <Route
            path="/my"
            element={
              <My
                user={user||dummyUser}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
      </div>
      {isLoggedIn && <Navi />}
    </Router>
  )
}
