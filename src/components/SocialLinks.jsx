import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      icon: <FaLinkedin size={16} />,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      hoverColor: 'hover:text-blue-400 hover:border-blue-500/40 hover:shadow-blue-500/20',
    },
    {
      id: 2,
      icon: <FaGithub size={16} />,
      label: 'Github',
      href: 'https://github.com',
      hoverColor: 'hover:text-white hover:border-gray-400/40 hover:shadow-gray-500/20',
    },
    {
      id: 3,
      icon: <HiOutlineMail size={16} />,
      label: 'Mail',
      href: 'mailto:creesler@gmail.com',
      hoverColor: 'hover:text-cyan-400 hover:border-cyan-500/40 hover:shadow-cyan-500/20',
    },
    {
      id: 4,
      icon: <BsFillPersonLinesFill size={16} />,
      label: 'Resume',
      href: 'resume.pdf',
      download: true,
      hoverColor: 'hover:text-green-400 hover:border-green-500/40 hover:shadow-green-500/20',
    },
  ];

  return (
    <div className="hidden lg:flex flex-col fixed left-5 top-1/2 -translate-y-1/2 z-40 gap-3">
      {links.map(({ id, icon, label, href, hoverColor, download }) => (
        <a
          key={id}
          href={href}
          download={download}
          target="_blank"
          rel="noreferrer"
          title={label}
          className={`group relative flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-gray-500 text-sm transition-all duration-300 hover:shadow-lg hover:scale-110 ${hoverColor}`}
        >
          {icon}
          {/* Tooltip */}
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-[#161b22] border border-white/10 text-xs font-medium text-white whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;