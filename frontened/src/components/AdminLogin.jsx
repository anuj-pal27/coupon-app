import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function AdminLogin() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
      e.preventDefault();
      try{
        const response = await axios.post(`${backendUrl}/api/admin/login`,{username,password})
        localStorage.setItem('token',response.data.token);
        navigate('/admin/panel');
      }catch(err){
        setError('Invalid credentials. Please try again.');
      }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold text-center mb-4'>Admin Login</h2>
            {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
            <form onSubmit={handleLogin} className='space-y-4'>
                <input type="text" placeholder="Username" value={username}
                onChange={(e) => setUsername(e.target.value)} required 
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2
                focus:ring-blue-500'/>
                <input type='password' placeholder='Password' value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-md 
                hover:bg-blue-700 transition'>Login</button>
            </form>
            <div className='text-center mt-4'>
              <p className='text-sm'>Don&apos;t have an admin account?</p>
              <button onClick={()=>navigate('/create')} 
              className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition'>
                Create Admin
              </button>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin;