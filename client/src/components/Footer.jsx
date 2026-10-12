import React from 'react';
import { BsRobot } from 'react-icons/bs';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden bg-gradient-to-br from-violet-50 via-blue-50 to-emerald-50 px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      {/* Soft decorative glows */}
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-white/80 bg-white/80 px-6 py-9 shadow-xl shadow-violet-900/5 backdrop-blur-xl sm:px-10 sm:py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_0.6fr] md:items-center">
          <div>
            <a
              href="/"
              aria-label="InterviewAl home"
              className="inline-flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-blue-600 to-emerald-500 text-white shadow-lg shadow-violet-500/20">
                <BsRobot size={21} />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Interview<span className="bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent">Al</span>
              </span>
            </a>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Your AI-powered interview practice partner. Build communication
              skills, strengthen technical knowledge, and grow your confidence
              one practice session at a time.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1.5 text-xs font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Practice. Improve. Succeed.
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <p className="text-sm font-semibold text-slate-800">Ready to get started?</p>
            <a
              href="/interview"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Start practicing
              <HiOutlineArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-5 text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} InterviewAl. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 sm:text-sm">
            Made to help you feel interview-ready.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
