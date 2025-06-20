import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //! THIS useAuthStore is in the folder store/authStore.js you need to install ZUSTAND to apply this coding
  const {signup, isLoading, error} = useAuthStore(); 

  const handleSignUp = async (e) => {
    e.preventDefault();
    // console.log(username, email, password);
    try {
      await signup(username, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5' style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/background_banner.jpg)"}}>
      
      <div className='max-w-[350px] w-full mx-auto px-8 py-14 bg-black/75 rounded mt-8'>
        <h1 className='text-3xl font-medium text-white mb-7'>Sign Up</h1>

        <form onSubmit={handleSignUp} action="/" method='post' className='flex flex-col space-y-4'>
          <input 
            type="text" 
            placeholder='John Deo' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full h-[50px] bg-[#333] text-white px-5 rounded text-base' />
          <input 
            type="email" 
            placeholder='johndoe@gmail.com' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full h-[50px] bg-[#333] text-white px-5 rounded text-base' />
          <input 
            type="password" 
            placeholder='Enter your password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full h-[50px] bg-[#333] text-white px-5 rounded text-base' />

          {error && <p className='text-red-500'>{error.response.data.message}</p>}

          <button type='submit' disabled={isLoading} className='w-full h-[50px] bg-[#e50914] rounded py-2 text-base hover:opacity-90 text-white cursor-pointer'>Sign Up</button>
        </form>

        <div className='mt-10 text-[#737373] text-sm'>
          <p>Already have an account? <span onClick={() => navigate("/signin")} className='ml-2 text-white font-medium cursor-pointer hover:underline'>Sign In Now</span></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
