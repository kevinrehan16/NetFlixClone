import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
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
        <Route path={"/ai-recommendations"} element={<AIRecommendations />} />
      </Routes>
    </div>
  )
}

export default App
