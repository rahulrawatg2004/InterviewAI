//import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
// replaced FaUserAstronaut with mainIcon image
import { useNavigate } from "react-router-dom";
import { ServerURL } from '../App';
import axios from 'axios';
import { setUser } from "../store/userSlice";
import AuthModel from "./AuthModel";
import mainIcon from "../assets/mainIcon.png";
import userIcon from "../assets/userIcon.png";


function Navbar() {
  const user = useSelector((state) => state.user?.user ?? null);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.get(`${ServerURL}/api/auth/logout`, { withCredentials: true });
      dispatch(setUser(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border
             border-gray-200 px-8 py-4 flex justify-between items-center
             relative"
      >
        
        
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={mainIcon} alt="InterviewAI logo" className="w-10 h-10 rounded-lg object-contain" />
          <h1 className="font-semibold hidden md:block text-lg">InterviewAI</h1>
        </div>
        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <button
              onClick={() => {
                if(!user){
                  setShowAuth(true);
                  return;
                }
                setShowCreditPopup((prev) => !prev);
                setShowUserPopup(false);
              }}
              className="flex items-center gap-2 bg-gray-100
                                px-4 py-2 rounded-full text-md hover:bg-gray-200
                                transition"
            >
              <BsCoin size={20} />
              {user?.credits || 0}
            </button>
            {showCreditPopup && (
             <div className='absolute right-[-50px] mt-3 w-64
                             bg-white shadow-xl border border-gray-200 rounded-x1
                            p-5 z-50'>
                <p className='text-sm text-gray-600 mb-4'>Need
                 more credits to continue interviews?
                </p>
                <button onClick={() => navigate("/pricing")}
                        className='w-full bg-black text-white py-2
                                  rounded-lg text-sm'>Buy more credits
                </button>
              </div>
            )}

          </div>
          <div className="relative">
            <button
              onClick={() => {
                if(!user){
                  setShowAuth(true);
                  return;
                }
                setShowUserPopup((prev) => !prev);
                setShowCreditPopup(false);
              }}
              className={
                user
                  ? 'h-10 w-10 bg-white rounded-full border-2 border-black flex items-center justify-center text-black font-semibold focus:outline-none'
                  : 'h-10 px-4 bg-transparent border-none rounded-none flex items-center justify-center gap-2 font-semibold focus:outline-none'
              }
            >
              {user ? (
                user?.name?.charAt(0)?.toUpperCase()
              ) : (
                <img src={userIcon} alt="user icon" style={{ width: 40, height: 40 }} />
              )}
            </button>
            {showUserPopup && (
              <div className='absolute right-0 mt-3 w-48 bg-white
                              shadow-xl border border-gray-200 rounded-xl p-4
                              z-50'>
                              <p className='text-md text-blue-500 font-medium mb-1'>                            
                                {user?.name}
                              </p>
                              
                              <button onClick={() => navigate("/history")}
                                      className='w-full text-left text-sm py-2
                                                hover: text-black text-gray-600'>InterView
                                History</button>
                              <button onClick={handleLogout}
                                 className='w-full text-left text-sm py-2
                                                      flex items-center gap-2 text-red-500'>
                                <HiOutlineLogout size={16}/>
                                Logout
                                </button>
                </div>
            )}
            
          </div>
        </div>
      </motion.div>
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
    </div>
  );
}

export default Navbar;
