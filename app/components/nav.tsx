'use client';

import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

const navItems = {
  '/': {
    name: 'about',
  },
  '/work': {
    name: 'work',
  },
  '/blog': {
    name: 'blog',
  },
};

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight text-neutral-800 dark:text-neutral-200 sticky top-0 backdrop-blur-xs py-1 z-40">
      <nav
          className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative w-full"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-200 dark:bg-neutral-800 transition-colors duration-300 focus:outline-none cursor-pointer border border-neutral-300 dark:border-neutral-700 select-none shadow-inner"
            aria-label="Toggle theme"
          >
            <span
              className={`${
                theme === 'dark' ? 'translate-x-[22px]' : 'translate-x-[2px]'
              } flex items-center justify-center h-5 w-5 transform rounded-full bg-white dark:bg-neutral-900 shadow-md transition-transform duration-300 ease-in-out text-[10px] select-none pointer-events-none`}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
          </button>
        </nav>
    </aside>
  );
}