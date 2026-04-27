import React from 'react';
import { SiNodedotjs, SiPython, SiReact, SiJavascript, SiMongodb } from 'react-icons/si';
import { FaNetworkWired, FaServer, FaCodeBranch } from 'react-icons/fa';
import { BsGearWideConnected, BsCloudFill } from 'react-icons/bs';
import useReveal from '../hooks/useReveal';

const Experience = () => {
  const [titleRef, titleVis] = useReveal();
  const [gridRef, gridVis] = useReveal(0.05);

  const techs = [
    { id: 1, icon: <BsGearWideConnected size={36} />, title: 'N8N / Make', color: 'text-pink-400', border: 'border-pink-500/20', bg: 'bg-pink-500/5' },
    { id: 2, icon: <SiJavascript size={36} />, title: 'JavaScript', color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/5' },
    { id: 3, icon: <SiNodedotjs size={36} />, title: 'NodeJS', color: 'text-green-400', border: 'border-green-500/20', bg: 'bg-green-500/5' },
    { id: 4, icon: <SiReact size={36} />, title: 'React', color: 'text-cyan-400', border: 'border-cyan-500/20', bg: 'bg-cyan-500/5' },
    { id: 5, icon: <SiPython size={36} />, title: 'Python', color: 'text-blue-300', border: 'border-blue-400/20', bg: 'bg-blue-400/5' },
    { id: 6, icon: <FaNetworkWired size={36} />, title: 'Network / CCNA', color: 'text-cyan-300', border: 'border-cyan-400/20', bg: 'bg-cyan-400/5' },
    { id: 7, icon: <FaServer size={36} />, title: 'Datto / RMM', color: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/5' },
    { id: 8, icon: <BsCloudFill size={36} />, title: 'Azure / M365', color: 'text-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/5' },
    { id: 9, icon: <SiMongodb size={36} />, title: 'MongoDB', color: 'text-green-300', border: 'border-green-400/20', bg: 'bg-green-400/5' },
    { id: 10, icon: <FaCodeBranch size={36} />, title: 'API / Webhooks', color: 'text-gray-300', border: 'border-gray-500/20', bg: 'bg-gray-500/5' },
  ];

  return (
    <div name="experience" className="relative py-14 w-full">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-screen-lg p-6 mx-auto relative z-10">
        <div ref={titleRef} className={`reveal ${titleVis ? 'visible' : ''} mb-16`}>
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">What I Use</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg">
            Technologies I utilize for automation, development, and robust IT infrastructure.
          </p>
        </div>

        <div ref={gridRef} className={`reveal ${gridVis ? 'visible' : ''} w-full grid grid-cols-2 sm:grid-cols-5 gap-4`}>
          {techs.map(({ id, icon, title, color, border, bg }, index) => (
            <div
              key={id}
              className={`group flex flex-col items-center justify-center py-8 px-4 rounded-2xl ${bg} border ${border} hover:border-white/20 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-default`}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <div className={`${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>
              <p className="text-gray-300 text-xs font-semibold text-center group-hover:text-white transition-colors">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;