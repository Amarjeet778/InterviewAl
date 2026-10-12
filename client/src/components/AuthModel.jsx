import React, { use, useEffect } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Auth from '../pages/Auth.jsx';
import { useSelector } from 'react-redux';

function AuthModel({onClose}) {
    const userdata = useSelector((state) => state.user.userdata);
    useEffect(() => {
        if(userdata){
            onClose();
        }
    }, [userdata, onClose]);
  return (
    <div className='fixed inset-0 bg-black/10  flex justify-center items-center z-[999] backdrop-blur-sm px-3'>
        <div className='w-full max-w-md relative'>
            <button onClick={onClose} className='absolute top-8 right-5 text-gray-500 hover:text-gray-700 text-xl'> 
                <AiOutlineClose size={20} />
            </button> 
            <Auth isModel = {true} />
        </div>
      
    </div>
  )
}

export default AuthModel
