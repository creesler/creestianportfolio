import React from 'react';
import useReveal from '../hooks/useReveal';

const About = () => {
  const [titleRef, titleVis] = useReveal();
  const [bodyRef, bodyVis] = useReveal(0.1);
  const [certRef, certVis] = useReveal(0.1);
  const [focusRef, focusVis] = useReveal(0.1);

  return (
    <div name="about" className="relative py-14 w-full">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-screen-lg p-6 mx-auto relative z-10">
        <div ref={titleRef} className={`reveal ${titleVis ? 'visible' : ''} mb-12`}>
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Get to know me</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div ref={bodyRef} className={`reveal ${bodyVis ? 'visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          <div className="bg-white/[0.03] p-8 sm:p-10 rounded-2xl border border-white/[0.06] glow-cyan-hover transition-shadow duration-500">
            <p className="text-lg leading-relaxed text-gray-300">
              I bring extensive experience bridging the gap between{' '}
              <strong className="text-cyan-400 font-semibold">IT Infrastructure Support</strong> and{' '}
              <strong className="text-blue-400 font-semibold">Modern Automation Development</strong>.
              My journey began in enterprise-level IT Desktop Support, where I mastered network troubleshooting,
              system administration, and resolving complex technical issues across international organizations.
            </p>

            <p className="text-lg leading-relaxed text-gray-300 mt-6">
              Today, I operate as a Fullstack WebApp &amp; Automation Developer. I design robust workflows using
              tools like <strong className="text-pink-400 font-semibold">N8N and Make</strong>, develop custom
              web applications using <strong className="text-green-400 font-semibold">NodeJS and React</strong>,
              and seamlessly integrate CRM APIs. This dual expertise allows me to not only build modern software
              solutions but also ensure they run on secure, well-architected systems.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                ref={certRef}
                className={`reveal-left ${certVis ? 'visible' : ''} bg-white/[0.03] p-6 rounded-xl border border-white/[0.06] hover:-translate-y-1 transition-transform duration-300`}
                style={{ transitionDelay: '0.3s' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-lg">✦</div>
                  <h3 className="font-bold text-lg text-white">Certifications</h3>
                </div>
                <ul className="text-gray-400 space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 text-xs">▸</span>
                    <span>Kaseya Certified Tech — Datto RMM <span className="text-gray-500">(2025–2027)</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 text-xs">▸</span>
                    <span>Cisco Certified Network Associate (CCNA)</span>
                  </li>
                </ul>
              </div>

              <div
                ref={focusRef}
                className={`reveal-right ${focusVis ? 'visible' : ''} bg-white/[0.03] p-6 rounded-xl border border-white/[0.06] hover:-translate-y-1 transition-transform duration-300`}
                style={{ transitionDelay: '0.3s' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-lg">⚡</div>
                  <h3 className="font-bold text-lg text-white">Core Focus</h3>
                </div>
                <ul className="text-gray-400 space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 text-xs">▸</span>
                    <span>Business Process Automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 text-xs">▸</span>
                    <span>Fullstack Web Development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 text-xs">▸</span>
                    <span>Enterprise Cloud Support (M365 / Azure)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;