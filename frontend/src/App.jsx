import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Moviepage from './pages/Moviepage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AIRecommendations from './pages/AIRecommendations'
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore'

const App = () => {

  const {fetchUser, fetchingUser} = useAuthStore();
  const location = useLocation(); //It will force the page to load again, even if it's the same URL.

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if(fetchingUser){
    return <p className='text-white'>Loading...</p>
  }

  return (
    <div>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/movie/:id"} element={<Moviepage />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/ai-recommendations"} element={<AIRecommendations key={location.key} />} />
      </Routes>
    </div>
  )
}

export default App
