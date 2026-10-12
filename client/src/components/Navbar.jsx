import React, { useState } from 'react';
import { BsRobot, BsCoin, BsArrowUpRight, BsCheckCircleFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaUserAstronaut } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserdata } from '../redux/userSlice.js';
import { ServerUrl } from '../App.jsx';
import axios from 'axios';
import AuthModel from './AuthModel.jsx';

function Navbar() {
  const { userdata } = useSelector((state) => state.user);
  const [showCredits, setShowCredits] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModel, setShowAuthModel] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeMenus = () => {
    setShowCredits(false);
    setShowUserMenu(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserdata(null));
      closeMenus();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const openProtectedMenu = (menu) => {
    if (!userdata) {
      setShowAuthModel(true);
      closeMenus();
      return;
    }
    if (menu === 'credits') {
      setShowCredits((current) => !current);
      setShowUserMenu(false);
    } else {
      setShowUserMenu((current) => !current);
      setShowCredits(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <motion.nav
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-lg shadow-violet-900/[0.06] backdrop-blur-xl sm:rounded-3xl sm:px-6 sm:py-4"
        >
          <button
            type="button"
            onClick={() => {
              closeMenus();
              window.location.reload();             
            }}
            className="group flex min-w-0 items-center gap-3 text-left cursor-pointer"
            aria-label="Go to InterviewAl home"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-indigo-500 to-emerald-400 text-white shadow-md shadow-violet-500/20 transition duration-300 group-hover:rotate-3 group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-2xl">
              <BsRobot size={21} />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">Interview<span className="bg-gradient-to-r from-violet-600 to-emerald-500 bg-clip-text text-transparent">Al</span></span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-400 sm:block">Your AI interview coach</span>
            </span>
          </button>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="relative">
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openProtectedMenu('credits')}
                aria-expanded={showCredits}
                className="flex items-center gap-2 rounded-full border border-violet-100 bg-gradient-to-r from-violet-50 to-blue-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-violet-200 hover:shadow-md hover:shadow-violet-500/10 sm:px-4 sm:py-2.5 cursor-pointer"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-amber-500 shadow-sm"><BsCoin size={16} /></span>
                <span>{userdata?.credits ?? 0}</span>
                <span className="hidden text-xs font-medium text-slate-500 sm:inline">credits</span>
              </motion.button>

              <AnimatePresence>
                {showCredits && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/10 sm:w-72 "
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-emerald-50 text-amber-500"><BsCoin size={20} /></span>
                      <div>
                        <p className="font-bold text-slate-900">Your credits</p>
                        <p className="text-xs text-slate-500">{userdata?.credits ?? 0} available to use</p>
                      </div>
                    </div>
                    <p className="mb-4 text-sm leading-6 text-slate-500 ">Need more credits for your next practice session?</p>
                    <button
                      type="button"
                      onClick={() => { closeMenus(); navigate('/pricing'); }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:from-violet-700 hover:to-indigo-700 cursor-pointer"
                    >
                      Explore plans <BsArrowUpRight size={15} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative ">
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openProtectedMenu('user')}
                aria-label="Open user menu"
                aria-expanded={showUserMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-indigo-500 to-emerald-400 p-[2px] shadow-md shadow-violet-500/20 sm:h-11 sm:w-11 cursor-pointer"
              >
                <span className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-extrabold text-slate-800">
                  {userdata?.name ? userdata.name.trim().charAt(0).toUpperCase() : <FaUserAstronaut size={17} />}
                </span>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-900/10 sm:w-72 "
                  >
                    <div className="bg-gradient-to-br from-violet-50 via-blue-50 to-emerald-50 p-5">
                      <p className="truncate font-bold text-slate-900">{userdata?.name || 'Your account'}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><BsCheckCircleFill className="text-emerald-500" /> Ready for your next interview</p>
                    </div>
                    <div className="space-y-1 p-3">
                      <button
                        type="button"
                        onClick={() => { closeMenus(); navigate('/history'); }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700 cursor-pointer"
                      >
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600"><FaUserAstronaut size={16} /></span>
                        View History
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50 cursor-pointer"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50"><HiOutlineLogout size={18} /></span>
                        Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.nav>
      </header>

      {showAuthModel && <AuthModel onClose={() => setShowAuthModel(false)} />}
    </>
  );
}

export default Navbar;
