import React from 'react'
import { BsRobot } from "react-icons/bs"
import { IoSparkles } from "react-icons/io5"
import { motion } from 'framer-motion'
import { FcGoogle } from "react-icons/fc"
import { auth, provider } from '../utils/firebase.js'
import { signInWithPopup} from "firebase/auth"
import { ServerUrl } from '../App.jsx'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserdata } from '../redux/userSlice.js'




function Auth({isModel =false}) {

    const dispatch = useDispatch();

    const handleGoogleSignIn = async () => {
        try{
            const response = await signInWithPopup(auth, provider);
            let User = response.user;
            let name = User.displayName;
            let email = User.email;
            const result = await axios.post(ServerUrl + "/api/auth/google", {name, email}, {withCredentials: true});
            dispatch(setUserdata(result.data.user));

        }catch(error){
            console.error("Error signing in with Google:", error);
            dispatch(setUserdata(null)); // Set user data to null in case of an error
        }
  
    }
  return (
    <div className={`w-full  ${isModel ? "py-4" : "min-h-screen flex justify-center items-center px-6 py-20 bg-[#f3f3f3]"} `}>
        <motion.div 
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5}}
        className='w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[24px]"} bg-white rounded-3xl shadow-2xl border border-gray-200 p-8'>
            <div className='flex justify-center items-center mb-6 gap-3'>
                <div className='text-white bg-black p-2 rounded-lg'>
                    <BsRobot size={18} />
                </div>
                <h2 className='text-lg font-semibold'>InterviewAl</h2>
            </div>
            <h1 className='text-2xl md:text-3xl font-semibold mb-4 text-center leading-snug'>Continue with
                <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                    <IoSparkles size={18} />
                    AI Interview Assistant
                </span>
            </h1>
            <p className='text-gray-500 text-center mb-6 text-sm leading-relaxed'>
                Sign in to your account to continue
            </p>

            <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-full bg-black justify-center items-center text-white py-3 rounded-full flex gap-3 hover:bg-gray-800 transition-colors duration-300'>
                <FcGoogle size={20} />  
                Continue with Google
            </motion.button>

        </motion.div>
        
      
    </div>
  )
}

export default Auth
    