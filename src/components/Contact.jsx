import React from 'react';
import { MdOutlineSend } from 'react-icons/md';
import useReveal from '../hooks/useReveal';

const Contact = () => {
  const [titleRef, titleVis] = useReveal();
  const [formRef, formVis] = useReveal(0.1);

  return (
    <div name="contact" className="relative py-14 w-full">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-screen-lg p-6 mx-auto relative z-10">
        <div ref={titleRef} className={`reveal ${titleVis ? 'visible' : ''} mb-12`}>
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Get in Touch</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg">
            Have a project in mind or need IT automation? Send me a message below.
          </p>
        </div>

        <div ref={formRef} className={`reveal ${formVis ? 'visible' : ''} flex justify-center`} style={{ transitionDelay: '0.15s' }}>
          <form
            action="https://getform.io/f/b982d355-c590-4324-983c-b564eb3aad79"
            method="POST"
            className="flex flex-col w-full md:w-3/5 gap-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 text-sm"
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows="8"
              required
              className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 text-sm resize-none"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 text-white w-fit px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 mx-auto mt-2"
            >
              Send Message
              <MdOutlineSend size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;