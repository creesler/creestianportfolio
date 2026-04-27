import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-scroll';
import Typewriter from 'typewriter-effect';

/* Fake code lines that "type" in one by one */
const codeLines = [
  { indent: 0, tokens: [{ t: 'const', c: 'text-pink-400' }, { t: ' developer', c: 'text-cyan-300' }, { t: ' = {', c: 'text-gray-400' }] },
  { indent: 1, tokens: [{ t: 'name', c: 'text-blue-300' }, { t: ': ', c: 'text-gray-500' }, { t: "'Christian Earl Turaja'", c: 'text-green-400' }, { t: ',', c: 'text-gray-500' }] },
  { indent: 1, tokens: [{ t: 'role', c: 'text-blue-300' }, { t: ': ', c: 'text-gray-500' }, { t: "'Fullstack Dev & Automation'", c: 'text-green-400' }, { t: ',', c: 'text-gray-500' }] },
  { indent: 1, tokens: [{ t: 'stack', c: 'text-blue-300' }, { t: ': [', c: 'text-gray-500' }, { t: "'Node'", c: 'text-amber-300' }, { t: ', ', c: 'text-gray-500' }, { t: "'React'", c: 'text-amber-300' }, { t: ', ', c: 'text-gray-500' }, { t: "'N8N'", c: 'text-amber-300' }, { t: '],', c: 'text-gray-500' }] },
  { indent: 1, tokens: [{ t: 'passion', c: 'text-blue-300' }, { t: ': ', c: 'text-gray-500' }, { t: "'Building things that work'", c: 'text-green-400' }, { t: ',', c: 'text-gray-500' }] },
  { indent: 1, tokens: [{ t: 'available', c: 'text-blue-300' }, { t: ': ', c: 'text-gray-500' }, { t: 'true', c: 'text-orange-400' }, { t: ',', c: 'text-gray-500' }] },
  { indent: 0, tokens: [{ t: '};', c: 'text-gray-400' }] },
];

const CodeBlock = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          // Reset after a pause
          setTimeout(() => setVisibleLines(0), 2000);
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  // Restart the animation when it resets
  useEffect(() => {
    if (visibleLines === 0) {
      const restart = setTimeout(() => {
        const timer = setInterval(() => {
          setVisibleLines((prev) => {
            if (prev >= codeLines.length) {
              setTimeout(() => setVisibleLines(0), 3000);
              clearInterval(timer);
              return prev;
            }
            return prev + 1;
          });
        }, 400);
        return () => clearInterval(timer);
      }, 500);
      return () => clearTimeout(restart);
    }
  }, [visibleLines]);

  return (
    <div className="w-full max-w-md animate-float-slow">
      {/* Editor window */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0d1117] shadow-2xl shadow-cyan-500/5 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-gray-500 text-xs font-mono ml-2">developer.js</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400/70 text-[10px] font-mono">live</span>
          </div>
        </div>

        {/* Code area */}
        <div className="p-5 font-mono text-sm leading-7 min-h-[240px]">
          {codeLines.map((line, i) => (
            <div
              key={i}
              className={`flex transition-all duration-500 ${
                i < visibleLines ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              {/* Line number */}
              <span className="text-gray-600 select-none w-8 text-right mr-4 text-xs leading-7">
                {i + 1}
              </span>
              {/* Indent */}
              <span style={{ width: `${line.indent * 24}px` }} className="inline-block" />
              {/* Tokens */}
              {line.tokens.map((token, j) => (
                <span key={j} className={token.c}>
                  {token.t}
                </span>
              ))}
              {/* Blinking cursor on last visible line */}
              {i === visibleLines - 1 && (
                <span className="inline-block w-2 h-5 bg-cyan-400 ml-0.5 animate-pulse rounded-sm translate-y-[2px]" />
              )}
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-t border-white/[0.06] text-[10px] font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400">⚡ JavaScript</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Ln 7, Col 2</span>
            <span className="text-green-400">● Prettier</span>
          </div>
        </div>
      </div>

      {/* Terminal below */}
      <div className="mt-3 rounded-xl border border-white/[0.06] bg-[#0d1117] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-white/[0.06]">
          <span className="text-gray-500 text-xs font-mono">⌘ Terminal</span>
        </div>
        <div className="p-4 font-mono text-xs text-gray-400 space-y-1">
          <p><span className="text-green-400">➜</span> <span className="text-cyan-300">~/projects</span> npm run dev</p>
          <p className="text-gray-500">  ▸ Server running on <span className="text-green-400">http://localhost:3000</span></p>
          <p className="text-gray-500">  ▸ N8N workflows: <span className="text-cyan-400">3 active</span></p>
          <p className="flex items-center gap-1">
            <span className="text-green-400">✓</span>
            <span className="text-green-400/70">Ready to build something awesome</span>
            <span className="inline-block w-1.5 h-3.5 bg-green-400/60 animate-pulse rounded-sm" />
          </p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div name="home" className="relative h-screen w-full overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-6 md:flex-row gap-10">
        {/* Left: Text content */}
        <div className="flex flex-col justify-center h-full pt-20 md:pt-0 md:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-cyan-400 font-mono text-xs tracking-wider">Available for hire</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Christian Earl
            <br />
            <span className="gradient-text">Turaja</span>
          </h1>

          <div className="text-lg sm:text-xl font-medium text-gray-400 mt-4 h-[32px] font-mono">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 25,
                strings: [
                  '> Automation Expert_',
                  '> IT Support Engineer_',
                  '> Fullstack Web Developer_',
                  '> Vibe Coder_',
                ],
              }}
            />
          </div>

          <p className="text-gray-400 mt-6 max-w-lg text-sm leading-relaxed">
            Decade-long <span className="text-white font-semibold">IT Professional</span> who
            ships production code, automates everything, and vibes while doing it.
            I bridge <span className="text-cyan-400">automation</span>,{' '}
            <span className="text-blue-400">fullstack dev</span>, and{' '}
            <span className="text-violet-400">infra support</span> into one stack.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              to="portfolio"
              smooth
              duration={500}
              className="group inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer font-semibold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              View Portfolio
              <MdOutlineKeyboardArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
            <Link
              to="contact"
              smooth
              duration={500}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white px-5 py-3.5 rounded-full border border-white/10 hover:border-white/20 cursor-pointer font-medium text-sm tracking-wide transition-all duration-300 hover:bg-white/5"
            >
              Let's Talk
            </Link>
          </div>
        </div>

        {/* Right: Code editor + terminal */}
        <div className="hidden md:flex w-1/2 justify-center items-center">
          <CodeBlock />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </div>
  );
};

export default Home;
