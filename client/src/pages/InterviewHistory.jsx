import React from 'react'
import { useState, useEffect } from 'react';
import { ServerUrl } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function InterviewHistory() {

    const [interview, setInterview] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + '/api/interview/get-interview', { withCredentials: true });
                console.log(result.data);

                setInterview(result.data);
            }catch(error){
                console.log(error);

            }
        }
        getMyInterviews();
    },[])

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-emerald-100 py-10'>
      <div className='w-[90vh] lg:[70vh] max-w-[90%] mx-auto'>
        <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
          <button 
          onClick={()=>navigate("/")}
          className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition cursor-pointer'><FaArrowLeft className='text-gray-600'/></button>

          <div>
            <h1 className='text-3xl font-bold text-gray-800 flex-nowrap'>
              Interview History

            </h1 >
            <p className='text-gray-500 mt-2'>
              Here you can view all your past interviews and their details.
            </p>
          </div >

        </div>
         {interview.length === 0 ? 

         <div className='bg-white p-10 shadow rounded-2xl text-center'>
          <p className='text-gray-500'>No interviews found. Start Your First Interview!</p>
         </div> :
         
          <div className='grid gap-5'>
            {interview.map((item, index)=>(
              <div 
              key={index}
              onClick={()=>navigate(`/report/${item._id}`)}
              className='bg-white p-6 shadow-md rounded-2xl text-center hover:shadow-xl transition-all cursor-pointer border border-gray-100'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                  <div className='flex flex-col items-start'>

                    <h3 className='text-lg font-semibold text-gray-800'>
                      {item.role}
                    </h3>
                    <p className='text-gray-500 text-sm mt-1'>
                      {item.experience} . {item.mode}
                    </p>
                    <p className='text-gray-400 text-xs mt-2'>
                      {new Date(item.createdAt).toLocaleDateString()} 
                    </p>

                  </div>

                  <div className='flex items-center gap-4'>
                    {/* SCORE */}
                    <div className="text-right">
                        <p className="text-xl font-bold text-emerald-600">
                            {item.finalScore || 0}/10
                        </p>
                        <p className="text-xs text-gray-400">
                            Overall Score
                        </p>
                    </div>

                    {/* STATUS BADGE */}
                    <span
                        className={`px-4 py-1 rounded-full text-xs font-medium ${
                            item.status === "completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                        {item.status}
                    </span>
                  </div>


                </div> 
              </div>

            ))}

          </div>
         }

      </div>
    </div>
  )
}

export default InterviewHistory
