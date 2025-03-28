"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);
  
  useEffect(() => {
    // Handle scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-[rgba(0,0,0,0.85)] backdrop-blur-lg border-b border-[rgba(218,165,32,0.15)]' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#home" className="relative group flex items-center">
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="text-white">Auto</span><span className="text-[#D4AF37]">Collab</span>
            </span>
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#BF9D30] to-[#D4AF37] transition-all duration-300 group-hover:w-full"></div>
          </Link>
          
          {/* Join Waitlist Button - Always Visible */}
          <button 
            onClick={() => {
              const waitlistSection = document.getElementById('waitlist');
              if (waitlistSection) {
                waitlistSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium py-2 px-5 rounded-full transition-all duration-300"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}