"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Footer() {
  const [year, setYear] = useState(2025);
  
  useEffect(() => {
    // Set current year dynamically
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative py-10 bg-black overflow-hidden">
      {/* Subtle gold gradients */}
      <div className="absolute w-[40vw] h-[40vw] rounded-full bg-[rgba(218,165,32,0.02)] blur-3xl -top-20 -right-20"></div>
      <div className="absolute w-[35vw] h-[35vw] rounded-full bg-[rgba(184,134,11,0.02)] blur-3xl -bottom-20 -left-20"></div>
      
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.3)] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          {/* Logo and copyright */}
          <div className="mb-6 md:mb-0">
            <Link href="#home" className="inline-block group">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Grow</span><span className="text-[#D4AF37]">Vibe</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mt-2">
              © {year} GrowVibe Technologies. All rights reserved.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-6 mb-6 md:mb-0">
            <Link href="#home" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Features
            </Link>
            <button 
              onClick={() => {
                const waitlistSection = document.getElementById('waitlist');
                if (waitlistSection) {
                  waitlistSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[#D4AF37] hover:text-white border-b border-[rgba(218,165,32,0.3)] hover:border-[#D4AF37] transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}