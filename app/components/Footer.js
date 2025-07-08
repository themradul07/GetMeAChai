import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-500 px-8 py-10 flex flex-col gap-6 md:flex-row md:justify-around  md:items-start text-sm">
      
      {/* Left: Info and Author */}
      <div className="flex text-xs flex-col gap-2 md:items-start items-center text-center md:text-left">
        <div className="text-lg font-semibold text-gray-200">Get Me A Chai ☕</div>
        <p className="max-w-sm text-gray-400">
          A crowdfunding platform where creators can get support from their fans — one chai at a time.
        </p>
        <div className="text-gray-500">Made with ❤️ by Mradul Gandhi</div>
        <div className="text-gray-600">© {new Date().getFullYear()} All rights reserved.</div>
      </div>

      {/* Center: Navigation Links */}
      

      {/* Right: Social Icons */}
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">Connect with me</div>
        <div className="flex gap-4">
          {/* GitHub */}
          <Link href="https://github.com/themradul07" target="_blank" aria-label="GitHub">
            <svg className="w-5 h-5 hover:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2.3c-3.1.7-3.8-1.5-3.8-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1 3 .8.1-.6.4-1 .7-1.3-2.5-.3-5-1.2-5-5.3 0-1.2.4-2.1 1-2.9-.1-.3-.4-1.4.1-2.9 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.6-.3s1.8.1 2.6.3c2-.1 2.8-1 2.8-1 .5 1.5.2 2.6.1 2.9.6.8 1 1.8 1 2.9 0 4.1-2.5 5-5 5.3.4.4.8 1 .8 2.1v3.2c0 .4.3.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </Link>
          {/* LinkedIn */}
          <Link href="https://www.linkedin.com/in/mradul-gandhi-744067299/" target="_blank" aria-label="LinkedIn">
            <svg className="w-5 h-5 hover:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14C2.2 0 1 1.2 1 2.7v18.5C1 22.8 2.2 24 4 24h15c1.8 0 3-1.2 3-2.7V2.7C22 1.2 20.8 0 19 0zM8 20H5v-9h3v9zM6.5 9.5C5.1 9.5 4 8.4 4 7s1.1-2.5 2.5-2.5S9 5.6 9 7s-1.1 2.5-2.5 2.5zM20 20h-3v-4.5c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V20h-3v-9h3v1.2c.4-.6 1.3-1.2 2.5-1.2 2.5 0 3.7 1.6 3.7 4.1V20z"/>
            </svg>
          </Link>
          
          {/* Email */}
          <Link href="mailto:mradulgandhi18@gmail.com" aria-label="Email">
            <svg className="w-5 h-5 hover:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12.713L.015 3.375A1.993 1.993 0 012 2h20c.768 0 1.462.432 1.819 1.108L12 12.713zM0 5.697V20c0 1.103.897 2 2 2h20c1.103 0 2-.897 2-2V5.697L12 15.287 0 5.697z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
