"use client";
import { useState, useEffect, useRef } from 'react';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-black">
      {/* Subtle background gradients */}
      <div 
        className="absolute w-[45vw] h-[45vw] rounded-full bg-[rgba(218,165,32,0.05)] transform"
        style={{ 
          top: '5%',
          right: '15%',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-[rgba(184,134,11,0.08)] to-transparent"
      ></div>
      
      {/* Subtle gold line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.5)] to-transparent"></div>
      
      {/* Wave separator with subtle gold */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden opacity-60">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,0,111.91,10.83,163.56,22.88,231.86,38.84,275.37,50.63,321.39,56.44Z" 
            fill="rgba(184,134,11,0.15)"
          ></path>
        </svg>
      </div>
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-20 pb-12 text-center">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-[#D4AF37]">Autonomous</span> influencer<br />
            marketing to grow your <span className="text-[#D4AF37]">revenue</span>
          </h1>
          
          <p className={`text-lg text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
  Join top brands using <span className="font-bold text-white">GrowVibe AI</span> to automate creator collaborations and win millions of hearts! 🚀❤️
</p>

          
          <div className={`max-w-xl mx-auto transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative w-full max-w-md mb-4 group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2.5C7.5 2.5 5 5 5 10C5 15 7.5 17.5 10 17.5C12.5 17.5 15 15 15 10C15 5 12.5 2.5 10 2.5Z" fill="#D4AF37" fillOpacity="0.7"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter Brand URL" 
                  className="w-full py-3 px-12 rounded-full bg-[rgba(0,0,0,0.7)] border border-[rgba(218,165,32,0.3)] text-white focus:outline-none focus:border-[#D4AF37] transition-all duration-300"
                />
                <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#D4AF37] text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-[#BF9D30] transition-all">
                  Analyze
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center border border-[rgba(218,165,32,0.5)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-300">No credit card required</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center border border-[rgba(218,165,32,0.5)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12L16 14" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-300">Limited time offer!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video section with elegant styling */}
      <div className={`relative w-full max-w-4xl mx-auto px-6 transition-all duration-1000 delay-700 mb-16 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="relative">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[rgba(218,165,32,0.3)] bg-[rgba(0,0,0,0.6)]">
            {/* Replace with actual video player */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Placeholder for video */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Play button with subtle styling */}
              <button className="relative z-10 bg-[#D4AF37] hover:bg-[#BF9D30] text-black rounded-full py-3 px-6 font-medium flex items-center gap-2 transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L19 12L5 21V3Z" fill="currentColor"/>
                </svg>
                Learn how to use GrowVibe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}