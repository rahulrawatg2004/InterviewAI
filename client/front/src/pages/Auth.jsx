//import React from 'react'
import {BsRobot} from 'react-icons/bs';
import {IoSparkles} from 'react-icons/io5';
import {motion} from 'motion/react';
import {FcGoogle} from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerURL } from '../App';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice.js';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const { displayName, email } = user;
      const result = await axios.post(
        `${ServerURL}/api/auth/google`,
        { name: displayName, email },
        { withCredentials: true }
      );
      const loggedInUser = result?.data?.user ?? result?.data;
      dispatch(setUser(loggedInUser));
      navigate('/');
    } catch (error) {
      console.log(error);
      dispatch(setUser(null));
    }
  };
  return (
    <div className = 'w-full min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6 py-20'>
        <motion.div 
        initial = {{opacity: 0, y: -40}}
        animate = {{opacity: 1, y: 0}}
        transition = {{duration: 1.05}}
        className="w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200">
          <div className = 'flex items-center justify-center gap-3 mb-6'>
            <div className = 'bg-black text-white w-9 h-9 rounded-lg flex items-center justify-center shrink-0'>
                <BsRobot size={18} />
            </div>
            <h2 className='font-semibold text-lg'>InterviewAI</h2>
          </div>
            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
              Continue with 
              <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                <IoSparkles size={16} />
                AI Smart Interview 
              </span>
            </h1>
            <p className = 'text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
              Sign in to your account and unlock the power of AI for your interview preparation.
            </p>
            <motion.button 
             onClick = {handleGoogleAuth}
            whileHover = {{opacity: 0.7, scale: 1.05}}
            whileTap = {{opacity: 1, scale: 0.95}}
            className = 'w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md'>
                <FcGoogle size={20} />
                Continue with Google
            </motion.button>
        </motion.div>
    </div>
  )
}

export default Auth
