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
                <span className="text-white">Auto</span><span className="text-[#D4AF37]">Collab</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mt-2">
              © {year} GrowVibe Technologies. All rights reserved.
            </p>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap gap-6 mb-6 md:mb-0">
            <Link href="#home" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Features
            </Link>
            <Link href="#waitlist" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Waitlist
            </Link>
          </div>
          
          {/* Social links */}
          <div className="flex items-center space-x-4">
            <a href="#" className="w-8 h-8 rounded-full bg-[rgba(218,165,32,0.05)] border border-[rgba(218,165,32,0.1)] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-[rgba(218,165,32,0.05)] border border-[rgba(218,165,32,0.1)] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-[rgba(218,165,32,0.05)] border border-[rgba(218,165,32,0.1)] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.15)] to-transparent"></div>
        
        {/* Mobile layout second row - Privacy links */}
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm">
          <div className="flex flex-wrap gap-6">
            <Link href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Privacy
            </Link>
          </div>
          
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
    </footer>
  );
}