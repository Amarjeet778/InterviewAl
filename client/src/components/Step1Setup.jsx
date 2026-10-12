import React from 'react'
import { motion } from 'framer-motion'
import { FaUserTie, FaBriefcase, FaFileUpload, FaMicrophoneAlt, FaChartLine, FaArrowLeft } from 'react-icons/fa'
import { useState } from 'react'
import axios from 'axios'
import { ServerUrl } from '../App.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setUserdata } from '../redux/userSlice.js'
import { useNavigate } from 'react-router-dom'




function Step1Setup({ onStart }) {
  const userdata = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [mode, setMode] = useState('Technical');
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState('');
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();


  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    try {

      const response = await axios.post(ServerUrl + "/api/interview/resume", formData, { withCredentials: true });
      console.log(response.data);

      setRole(response.data.role || []);
      setExperience(response.data.experience || []);
      setProjects(response.data.projects || []);
      setSkills(response.data.skills || []);
      setResumeText(response.data.resumeText || '');
      setAnalysisDone(true);
      setAnalyzing(false);

    } catch (err) {

      console.log("Error analyzing resume:", err);
      setAnalyzing(false);
    }
  }

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await axios.post(ServerUrl + "/api/interview/generate-questions", {
        role,
        experience,
        projects,
        skills,
        mode,
        resumeText,
      }, { withCredentials: true });

      console.log(result.data);

      if (userdata) {
        dispatch(setUserdata({ ...userdata, credits: result.data.creditsLeft }));
      }
      setLoading(false);
      onStart(result.data);
    } catch (err) {
      console.log("Error generating questions:", err);
      setLoading(false);
    }

  }

  return (
    <motion.div
      initial={{ opacity: 0, }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 px-4'>
      <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>
        <motion.div
          initial={{ x: -40, opacity: 0, }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='relative flex justify-center flex-col p-12 bg-gradient-to-br from-green-50 to-green-100'>
          <div className="flex items-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow hover:shadow-md transition cursor-pointer"
              aria-label="Go back to home"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Start Your AI Interview
            </h1>
          </div>
          <p className='text-gray-700 text-lg mb-6'>Practice real interview scenarios powered by AI. Improve communication skills, technical skills, and cofidence.</p>

          <div className='space-y-5'>
            {
              [
                {
                  icon: <FaUserTie className='text-green-600 text-xl' />,
                  text: "Choose Role & Experince",
                },
                {
                  icon: <FaMicrophoneAlt className='text-green-600 text-xl' />,
                  text: "Smart Voice Interview",
                },
                {
                  icon: <FaChartLine className='text-green-600 text-xl' />,
                  text: "Performance Analytics",
                },
              ].map((item, index) => (
                <motion.div key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  className='flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm cursor-pointer'>
                  {item.icon}
                  <span className='text-gray-700 font-medium'>{item.text}</span>
                </motion.div>
              ))
            }

          </div>

        </motion.div>


        <motion.div
          initial={{ x: 80, opacity: 0, }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='bg-white p-12'>

          <h2 className='text-3xl font-bold text-gray-800 mb-8'>Interview SetUp</h2>
          <div className='space-y-6'>
            <div className='relative'>
              <FaUserTie className='text-gray-400 top-4 left-4 absolute' />
              <input type="text" placeholder='Enter Role' className='w-full pr-4 py-3 pl-12 flex-1 p-3 border rounded-xl border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition' onChange={(e) =>
                setRole(e.target.value)
              } value={role} />
            </div>
            <div className='relative'>
              <FaBriefcase className='text-gray-400 top-4 left-4 absolute' />
              <input type="text" placeholder='Experience (eg. 2 years)' className='w-full pr-4 py-3 pl-12 flex-1 p-3 border rounded-xl border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition' onChange={(e) =>
                setExperience(e.target.value)
              } value={experience} />
            </div>
            <select value={mode} onChange={(e) => setMode(e.target.value)} className='w-full pr-4 py-3 pl-12 flex-1 p-3 border rounded-xl border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition cursor-pointer' >
              <option value='Technical'>Technical Interview</option>
              <option value='HR'>HR Interview</option>

            </select>

            {
              !analysisDone && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => document.getElementById("resumeUpload").click()} className='border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-green-500 transition'>
                  <FaFileUpload className='mx-auto text-red-400 text-3xl mb-4' />
                  <input type="file" accept=".pdf" className='hidden' id="resumeUpload" onChange={(e) => {
                    setResumeFile(e.target.files[0]);
                  }} />

                  <p className='text-gray-600 font-medium' >
                    {resumeFile ? resumeFile.name : 'Upload Resume (PDF)'}
                  </p>
                  {resumeFile && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={(e) => { e.stopPropagation(); handleUploadResume() }}
                      className='mt-4 bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-800 transition cursor-pointer'

                    >
                      {analyzing ? "Analyzing..." : "Analyze Resume"}
                    </motion.button>
                  )}

                </motion.div>
              )
            }
            {
              analysisDone && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className='bg-gray-50 border border-gray-200 rounded-xl space-y-4 p-5'>
                  <h3 className='text-lg font-semibold text-gray-700'>Resume Analysis</h3>
                  {
                    projects.length > 0 && (
                      <div>
                        <p className='text-gray-600 font-medium mb-1'>Projects:</p>
                        <ul className='list-disc list-inside text-gray-600'>
                          {projects.map((project, index) => (
                            <li key={index}>{project}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  }
                  {
                    skills.length > 0 && (
                      <div>
                        <p className='text-gray-600 font-medium mb-1'>Skills:</p>
                        <div className='flex flex-wrap gap-2 text-gray-600'>
                          {skills.map((skill, index) => (
                            <span key={index} className='bg-green-100 px-3 py-1 rounded-full'>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  }

                </motion.div>
              )
            }



            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full bg-green-500 text-white py-3 rounded-full text-lg hover:bg-green-600 disabled:bg-gray-500 font-semibold shadow-md duration-300 transition cursor-pointer' >
              {loading ? "Starting Interview..." : "Start Interview"}
            </motion.button>



          </div>

        </motion.div>

      </div>

    </motion.div>
  )
}

export default Step1Setup
