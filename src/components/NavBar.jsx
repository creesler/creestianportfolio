import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 1, link: 'home', label: 'Home' },
    { id: 2, link: 'about', label: 'About' },
    { id: 3, link: 'portfolio', label: 'Portfolio' },
    { id: 4, link: 'experience', label: 'Skills' },
    { id: 5, link: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-[#0a0a0f]/70 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-screen-lg mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="relative group cursor-default">
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="gradient-text">Xtian</span>
            <span className="text-cyan-400 animate-pulse">.</span>
          </h1>
          <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300" />
        </div>

        {/* Desktop nav — floating pill */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-md">
            {links.map(({ id, link, label }) => (
              <Link
                key={id}
                to={link}
                smooth
                duration={500}
                spy={true}
                onSetActive={() => setActiveSection(link)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 ${
                  activeSection === link
                    ? 'text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 shadow-inner'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {activeSection === link && (
                  <span className="absolute inset-0 rounded-full border border-cyan-500/30 animate-pulse pointer-events-none" />
                )}
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:creesler@gmail.com"
            className="ml-4 px-5 py-2 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.04] active:scale-[0.97] transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setNav(!nav)}
          className="md:hidden relative z-50 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
        >
          {nav ? <FaTimes size={16} /> : <FaBars size={16} />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 bg-[#0a0a0f]/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          nav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          {links.map(({ id, link, label }, index) => (
            <Link
              key={id}
              to={link}
              smooth
              duration={500}
              onClick={() => setNav(false)}
              className={`text-3xl font-light tracking-wide cursor-pointer transition-all duration-300 py-3 px-8 rounded-xl ${
                nav ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } text-gray-400 hover:text-white hover:bg-white/5`}
              style={{ transitionDelay: nav ? `${index * 80}ms` : '0ms' }}
            >
              <span className="text-cyan-500 font-mono text-sm mr-3">0{id}.</span>
              {label}
            </Link>
          ))}
        </div>

        <a
          href="mailto:creesler@gmail.com"
          className={`mt-10 px-8 py-3 rounded-full text-sm font-semibold tracking-wide bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 transition-all duration-500 ${
            nav ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: nav ? '400ms' : '0ms' }}
        >
          creesler@gmail.com
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
