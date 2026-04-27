import React, { useState } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';
import useReveal from '../hooks/useReveal';

import fbImg from '../assets/videos/fbmessenger_autorespond.png';
import fbVid from '../assets/videos/fbmessenger_autorespond.mp4';
import pdfImg from '../assets/videos/pdf_extraction_with_email_notif.png';
import pdfVid from '../assets/videos/pdf_extraction_with_email_notif.mp4';
import waImg from '../assets/videos/whatsapp_autorespond.png';
import waVid from '../assets/videos/whatsapp_autorespond.mp4';

const Portfolio = () => {
  const [titleRef, titleVis] = useReveal();
  const [activeVideo, setActiveVideo] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'FB Messenger AI Auto-Respond',
      desc: 'N8N workflow using Webhooks, AI Agent with OpenRouter Chat Model, and HTTP Requests to auto-respond intelligently to Facebook Messenger messages.',
      tags: ['N8N', 'AI Agent', 'Webhooks', 'OpenRouter'],
      img: fbImg,
      video: fbVid,
      accent: 'cyan',
    },
    {
      id: 2,
      title: 'PDF Extraction + Email Notification',
      desc: 'Automated pipeline: Google Drive triggers PDF downloads, extracts text with AI (Gemini), appends to Sheets, then composes and emails a billing report.',
      tags: ['N8N', 'Google Drive', 'Gemini AI', 'Gmail'],
      img: pdfImg,
      video: pdfVid,
      accent: 'blue',
    },
    {
      id: 3,
      title: 'WhatsApp AI Auto-Respond',
      desc: 'WhatsApp trigger feeds into a Gemini-powered AI Agent with memory, handling reservations via Google Sheets — a fully hands-free customer service bot.',
      tags: ['N8N', 'WhatsApp', 'Gemini AI', 'Sheets'],
      img: waImg,
      video: waVid,
      accent: 'violet',
    },
  ];

  const accentMap = {
    cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'shadow-cyan-500/20', tag: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
    blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/20', tag: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
    violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', glow: 'shadow-violet-500/20', tag: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
  };

  return (
    <>
      <div name="portfolio" className="relative py-14 w-full">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-screen-lg p-6 mx-auto relative z-10">
          <div ref={titleRef} className={`reveal ${titleVis ? 'visible' : ''} mb-16`}>
            <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">My Work</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Automation <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-lg">
              Real-world automation workflows I've built using N8N, AI models, and API integrations.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {projects.map((project, index) => {
              const a = accentMap[project.accent];
              return <ProjectCard key={project.id} project={project} a={a} index={index} onPlay={setActiveVideo} />;
            })}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
            >
              <FaTimes size={14} />
            </button>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full rounded-2xl"
              style={{ maxHeight: '80vh' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

const ProjectCard = ({ project, a, index, onPlay }) => {
  const [ref, vis] = useReveal(0.08);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`reveal ${vis ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={`group relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 sm:p-8 hover:border-white/[0.12] transition-all duration-500 glow-cyan-hover`}>
        {/* Image / Video preview */}
        <div className="relative md:w-1/2 overflow-hidden rounded-xl">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {/* Play overlay */}
          <div
            onClick={() => onPlay(project.video)}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer rounded-xl"
          >
            <div className={`w-16 h-16 rounded-full ${a.bg} border ${a.border} flex items-center justify-center shadow-lg ${a.glow} hover:scale-110 transition-transform`}>
              <FaPlay className={`${a.text} ml-1`} size={20} />
            </div>
          </div>
          {/* Corner badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${a.tag} border backdrop-blur-sm`}>
            Live Demo
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium border ${a.tag}`}>
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => onPlay(project.video)}
            className={`inline-flex items-center gap-2 ${a.text} font-semibold text-sm hover:underline underline-offset-4 transition-all group/btn cursor-pointer w-fit`}
          >
            <FaPlay size={10} />
            See it in Action
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
