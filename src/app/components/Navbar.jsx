"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navbarRef = useRef(null);
  
  useEffect(() => {
    // Handle scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'waitlist'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
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
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#home" className="relative group flex items-center">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">Grow</span><span className="text-[#D4AF37]">Vibe</span>
            </span>
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#BF9D30] to-[#D4AF37] transition-all duration-300 group-hover:w-full"></div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-8 mr-8">
              <NavLink 
                href="#home" 
                active={activeSection === 'home'} 
              >
                Home
              </NavLink>
              <NavLink 
                href="#features" 
                active={activeSection === 'features'} 
              >
                Features
              </NavLink>
            </div>
            
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
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative w-12 h-12 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className={`w-6 relative transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}>
              <span className={`block absolute h-0.5 w-6 bg-[#D4AF37] transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-0' : '-translate-y-1.5'}`}></span>
              <span className={`block absolute h-0.5 bg-[#D4AF37] transform transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 w-0' : 'opacity-100 w-6'}`}></span>
              <span className={`block absolute h-0.5 w-6 bg-[#D4AF37] transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-90 translate-y-0' : 'translate-y-1.5'}`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[rgba(0,0,0,0.95)] backdrop-blur-lg transform transition-all duration-500 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden z-40`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center space-y-8 text-center">
            <MobileNavLink 
              href="#home" 
              active={activeSection === 'home'} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </MobileNavLink>
            <MobileNavLink 
              href="#features" 
              active={activeSection === 'features'} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </MobileNavLink>
            
            <div className="pt-10 w-full">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  const waitlistSection = document.getElementById('waitlist');
                  if (waitlistSection) {
                    setTimeout(() => {
                      waitlistSection.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }
                }}
                className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium py-4 px-8 rounded-full transition-all duration-300 w-64 text-lg mx-auto"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }) {
  return (
    <a 
      href={href} 
      className={`relative py-2 transition-colors duration-300 ${
        active 
          ? 'text-[#D4AF37]' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#BF9D30] to-[#D4AF37] transform origin-left transition-transform duration-300 ${
        active ? 'scale-x-100' : 'scale-x-0'
      }`}></span>
    </a>
  );
}

function MobileNavLink({ href, children, active, onClick }) {
  return (
    <a 
      href={href}
      onClick={onClick}
      className={`text-3xl font-light transition-colors duration-300 relative ${
        active 
          ? 'text-[#D4AF37]' 
          : 'text-gray-300'
      }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#BF9D30] to-[#D4AF37] rounded-full"></span>
      )}
    </a>
  );
}