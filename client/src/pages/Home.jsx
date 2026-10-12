import React, { useState } from 'react';

import Navbar from '../components/Navbar.jsx';

import { HiSparkles } from 'react-icons/hi';

import { motion } from 'framer-motion';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import AuthModel from '../components/AuthModel.jsx';

import {

  BsBarChart,

  BsClock,

  BsFileEarmarkText,

  BsMic,

  BsRobot,

  BsArrowUpRight,

  BsCheckCircleFill,

} from 'react-icons/bs';

import hrImg from '../assets/HR.png';

import techImg from '../assets/tech.png';

import aiImg from '../assets/ai-ans.png';

import confidenceImg from '../assets/confi.png';

import creditImg from '../assets/credit.png';

import pdfImg from '../assets/pdf.png';

import resumeImg from '../assets/resume.png';

import AnalyticsImg from '../assets/history.png';

import Footer from '../components/Footer.jsx';



const reveal = {

  hidden: { opacity: 0, y: 24 },

  visible: { opacity: 1, y: 0 },

};



function Home() {

  const userdata = useSelector((state) => state.user.userdata);

  const [showAuthModel, setShowAuthModel] = useState(false);

  const navigate = useNavigate();



  const goTo = (path) => {

    if (!userdata) {

      setShowAuthModel(true);

      return;

    }

    navigate(path);

  };



  const steps = [

    {

      icon: <BsRobot size={22} />,

      step: 'STEP 01',

      title: 'Personalize your practice',

      description: 'Choose your target role and experience level to get relevant questions.',

    },

    {

      icon: <BsMic size={22} />,

      step: 'STEP 02',

      title: 'Speak with AI',

      description: 'Experience a realistic voice interview with role-based questions.',

    },

    {

      icon: <BsClock size={22} />,

      step: 'STEP 03',

      title: 'Review your progress',

      description: 'Understand your performance and identify areas to improve.',

    },

  ];



  const features = [

    {

      image: aiImg,

      icon: <BsRobot size={21} />,

      title: 'AI-powered feedback',

      description: 'Get insights into communication, confidence, and technical accuracy.',

      tag: 'SMART EVALUATION',

    },

    {

      image: resumeImg,

      icon: <BsFileEarmarkText size={21} />,

      title: 'Resume-based interviews',

      description: 'Practice questions inspired by your resume, skills, and projects.',

      tag: 'PERSONALIZED PRACTICE',

    },

    {

      image: pdfImg,

      icon: <BsFileEarmarkText size={21} />,

      title: 'Downloadable reports',

      description: 'Keep a clear record of strengths, weaknesses, and improvement tips.',

      tag: 'ACTIONABLE INSIGHTS',

    },

    {

      image: AnalyticsImg,

      icon: <BsBarChart size={21} />,

      title: 'History and analytics',

      description: 'Review previous sessions and track your interview performance.',

      tag: 'TRACK YOUR GROWTH',

    },

  ];



  const modes = [

    {

      image: hrImg,

      title: 'HR Interview',

      description: 'Build confidence with behavioral and communication questions.',

    },

    {

      image: techImg,

      title: 'Technical Interview',

      description: 'Prepare for role-specific concepts and technical questions.',

    },

    {

      image: confidenceImg,

      title: 'Confidence Insights',

      description: 'Explore voice and delivery insights to improve your responses.',

    },

    {

      image: creditImg,

      title: 'Flexible Credits',

      description: 'Choose a plan that fits your interview practice needs.',

    },

  ];



  return (

    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-blue-50 to-emerald-50 text-slate-900">

      <Navbar />



      <main>

        {/* Hero section */}

        <section className="relative px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:pb-28 lg:pt-20">

          <div className="pointer-events-none absolute left-[-100px] top-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

          <div className="pointer-events-none absolute right-[-80px] top-20 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />



          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">

            <motion.div

              initial="hidden"

              animate="visible"

              variants={reveal}

              transition={{ duration: 0.65 }}

              className="text-center lg:text-left"

            >

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">

                  <HiSparkles size={17} />

                </span>

                AI-powered interview practice

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              </div>



              <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl xl:text-[4.25rem]">

                Your next interview

                <span className="mt-1 block bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text pb-2 text-transparent">

                  starts here.

                </span>

              </h1>



              <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">

                Practice real interview scenarios with AI, get personalized feedback, and build the confidence to take your next career step.

              </p>



              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">

                <motion.button

                  onClick={() => goTo('/interview')}

                  whileHover={{ y: -2, scale: 1.02 }}

                  whileTap={{ scale: 0.98 }}

                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-emerald-600 cursor-pointer"

                >

                  Start Mock Interview <BsArrowUpRight size={17} />

                </motion.button>

                <motion.button

                  onClick={() => goTo('/history')}

                  whileHover={{ y: -2 }}

                  whileTap={{ scale: 0.98 }}

                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 cursor-pointer"

                >

                  View Interview History

                </motion.button>

              </div>



              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-slate-500 lg:justify-start">

                {['Practice at your own pace', 'Personalized feedback', 'Progress you can review'].map((item) => (

                  <span key={item} className="inline-flex items-center gap-2">

                    <BsCheckCircleFill className="text-emerald-500" /> {item}

                  </span>

                ))}

              </div>

            </motion.div>



            {/* Uses the existing project image; no new assets required */}

            <motion.div

              initial={{ opacity: 0, scale: 0.96, y: 18 }}

              animate={{ opacity: 1, scale: 1, y: 0 }}

              transition={{ duration: 0.7, delay: 0.15 }}

              className="relative mx-auto w-full max-w-xl"

            >

              <div className="absolute inset-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-200/70 to-sky-200/70 blur-2xl" />

              <div className="relative rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-slate-300/50 sm:p-5">

                <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-white sm:px-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">

                      <BsRobot size={21} />

                    </div>

                    <div>

                      <p className="text-sm font-semibold">InterviewAl AI</p>

                      <p className="mt-0.5 text-xs text-slate-300">Your personal interview coach</p>

                    </div>

                  </div>

                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">Ready to practice</span>

                </div>



                <div className="p-3 sm:p-5">

                  <div className="mb-4 flex items-center justify-between gap-3">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Your practice space</p>

                      <h2 className="mt-1 text-lg font-bold text-slate-800 sm:text-xl">Prepare with confidence</h2>

                    </div>

                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600"><BsMic size={22} /></div>

                  </div>

                  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-sky-50">

                    <img src={aiImg} alt="AI interview feedback preview" className="mx-auto h-48 w-full object-contain p-3 sm:h-60" />

                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">

                    {[

                      { label: 'Interview modes', value: 'HR + Tech' },

                      { label: 'Feedback', value: 'Personalized' },

                      { label: 'Reports', value: 'Downloadable' },

                    ].map((item) => (

                      <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3">

                        <p className="text-[10px] leading-4 text-slate-500 sm:text-xs">{item.label}</p>

                        <p className="mt-1 text-xs font-bold text-slate-800 sm:text-sm">{item.value}</p>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

              <div className="absolute -left-3 top-1/3 hidden items-center gap-2 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:flex lg:-left-8">

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><BsBarChart size={18} /></span>

                <span><span className="block text-xs text-slate-500">Your growth</span><span className="text-sm font-semibold text-slate-800">Track progress</span></span>

              </div>

            </motion.div>

          </div>

        </section>



        {/* Existing three-step section, redesigned */}

        <section className="px-5 py-16 sm:px-8 lg:py-20">

          <div className="mx-auto max-w-7xl">

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal} transition={{ duration: 0.5 }} className="mx-auto mb-12 max-w-2xl text-center">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Simple process</p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A better way to prepare</h2>

              <p className="mt-4 leading-7 text-slate-500">From your first practice session to useful feedback, everything stays straightforward.</p>

            </motion.div>



            <div className="grid gap-5 md:grid-cols-3">

              {steps.map((item, index) => (

                <motion.div

                  key={item.step}

                  initial="hidden"

                  whileInView="visible"

                  viewport={{ once: true, amount: 0.2 }}

                  variants={reveal}

                  transition={{ duration: 0.5, delay: index * 0.12 }}

                  whileHover={{ y: -5 }}

                  className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-8"

                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white">{item.icon}</div>

                    <span className="text-xs font-bold tracking-[0.16em] text-slate-300">{item.step}</span>

                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>

                </motion.div>

              ))}

            </div>

          </div>

        </section>



        {/* Existing AI capabilities section */}

        <section className="px-5 py-16 sm:px-8 lg:py-20">

          <div className="mx-auto max-w-7xl">

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="mb-12 text-center">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Made for your next step</p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Powerful tools. <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">Clearer progress.</span></h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">Everything you need to practice, reflect, and prepare for the interviews that matter.</p>

            </motion.div>



            <div className="grid gap-5 md:grid-cols-2">

              {features.map((item, index) => (

                <motion.div

                  key={item.title}

                  initial="hidden"

                  whileInView="visible"

                  viewport={{ once: true, amount: 0.15 }}

                  variants={reveal}

                  transition={{ duration: 0.5, delay: index * 0.08 }}

                  whileHover={{ y: -4 }}

                  className="group grid items-center gap-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-900/5 sm:grid-cols-[0.9fr_1.1fr] sm:p-7"

                >

                  <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50 p-3 sm:h-48">

                    <img src={item.image} alt={item.title} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" />

                  </div>

                  <div className="py-1">

                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">{item.icon}</div>

                    <p className="text-[10px] font-bold tracking-[0.17em] text-emerald-600">{item.tag}</p>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">{item.title}</h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </section>



        {/* Existing interview modes section */}

        <section className="px-5 py-16 sm:px-8 lg:py-20">

          <div className="mx-auto max-w-7xl">

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="mb-12 text-center">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Practice your way</p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">One platform, multiple <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">interview modes</span></h2>

            </motion.div>



            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {modes.map((item, index) => (

                <motion.div

                  key={item.title}

                  initial="hidden"

                  whileInView="visible"

                  viewport={{ once: true, amount: 0.2 }}

                  variants={reveal}

                  transition={{ duration: 0.45, delay: index * 0.08 }}

                  whileHover={{ y: -5 }}

                  className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"

                >

                  <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50 p-3">

                    <img src={item.image} alt={item.title} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" />

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>

                </motion.div>

              ))}

            </div>

          </div>

        </section>

      </main>



      <Footer />

      {showAuthModel && <AuthModel onClose={() => setShowAuthModel(false)} />}

    </div>

  );

}



export default Home;
