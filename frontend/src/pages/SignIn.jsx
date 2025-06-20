import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const SignIn = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //! THIS useAuthStore is in the folder store/authStore.js you need to install ZUSTAND to apply this coding
  const {login, isLoading, error} = useAuthStore(); 

  const handleLogin = async (e) =>{
    e.preventDefault();

    try {
      const {message} = await login(username, password);
      toast.success(message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5' style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/background_banner.jpg)"}}>
      
      <div className='max-w-[350px] w-full mx-auto px-8 py-14 bg-black/75 rounded mt-8'>
        <h1 className='text-3xl font-medium text-white mb-7'>Sign In</h1>

        <form onSubmit={handleLogin} className='flex flex-col space-y-4'>
          <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-full h-[50px] bg-[#333] text-white px-5 rounded text-base' />
          <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full h-[50px] bg-[#333] text-white px-5 rounded text-base' />

          {error && <p className='text-red-500'>{error.response.data.message}</p>}

          <button type='submit' disabled={isLoading} className='w-full h-[50px] bg-[#e50914] rounded py-2 text-base hover:opacity-90 text-white cursor-pointer'>Sign In</button>
        </form>

        <div className='mt-10 text-[#737373] text-sm'>
          <p>New to Netflix? <span onClick={() => navigate("/signup")} className='ml-2 text-white font-medium cursor-pointer hover:underline'>Sign Up Now</span></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
