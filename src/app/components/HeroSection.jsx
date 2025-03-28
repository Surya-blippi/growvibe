"use client";
import { useState, useEffect, useRef } from 'react';
import supabase from '../utils/supabaseClient';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  
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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const validateUrl = (url) => {
    // Check if URL is empty
    if (!url.trim()) {
      return "Please enter a website URL";
    }
    
    // Add https:// if not present
    let urlToCheck = url;
    if (!url.match(/^https?:\/\//i)) {
      urlToCheck = 'https://' + url;
    }
    
    try {
      // Try to create a URL object to validate
      new URL(urlToCheck);
      
      // Check for valid domain format
      if (!urlToCheck.match(/^https?:\/\/([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}|localhost)(:[0-9]{1,5})?(\/.*)?$/i)) {
        return "Please enter a valid website URL";
      }
      
      return ""; // Valid URL
    } catch (err) {
      return "Please enter a valid website URL";
    }
  };

  const handleTryForFree = (e) => {
    e.preventDefault();
    
    // Validate URL
    const error = validateUrl(websiteUrl);
    setUrlError(error);
    
    if (!error) {
      // If URL is valid, show the email popup
      setShowEmailPopup(true);
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    
    if (email) {
      setShowAnimation(true);
      
      try {
        // 1. Insert the new user entry
        const { error: insertError } = await supabase
          .from('autocollab')
          .insert([
            { email: email, website: websiteUrl }
          ]);
        
        if (insertError) {
          console.error('Error inserting data:', insertError);
        } else {
          // 2. Get the current counter value
          const { data: counterData, error: fetchError } = await supabase
            .from('waitlist_counter')
            .select('counter')
            .eq('id', 1)
            .single();
          
          if (!fetchError && counterData) {
            // 3. Increment the counter value
            const newCount = counterData.counter + 1;
            
            // 4. Update the counter in the database
            const { error: updateError } = await supabase
              .from('waitlist_counter')
              .update({ counter: newCount })
              .eq('id', 1);
            
            if (updateError) {
              console.error('Error updating counter:', updateError);
            }
          } else {
            console.error('Error fetching counter:', fetchError);
          }
        }
        
        // Show success animation after submission
        setTimeout(() => {
          setShowAnimation(false);
          setIsSubmitted(true);
        }, 3000);
        
      } catch (error) {
        console.error('Unexpected error:', error);
        
        // Still show success to user for better UX
        setTimeout(() => {
          setShowAnimation(false);
          setIsSubmitted(true);
        }, 3000);
      }
    }
  };

  const closePopup = () => {
    setShowEmailPopup(false);
    setIsSubmitted(false);
    setShowAnimation(false);
    setEmail('');
  };

  const handleWebsiteUrlChange = (e) => {
    setWebsiteUrl(e.target.value);
    // Clear error when user starts typing again
    if (urlError) {
      setUrlError('');
    }
  };

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
      
      {/* Main content - Increased top padding */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-32 pb-12 text-center">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-[#D4AF37]">Grow</span> blazing fast with<br />
            AI influencer marketing <span className="text-[#D4AF37]">agent</span>
          </h1>
          
          <p className={`text-lg text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Our AI agent understands your brand and automates influencer discovery,<br />outreach, and negotiation to drive powerful creator collaborations.
          </p>

          
          <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col items-center justify-center mb-6">
              {/* Expanded and redesigned input field with premium button */}
              <form onSubmit={handleTryForFree} className="relative w-full max-w-2xl mb-2 group">
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2.5C7.5 2.5 5 5 5 10C5 15 7.5 17.5 10 17.5C12.5 17.5 15 15 15 10C15 5 12.5 2.5 10 2.5Z" fill="#D4AF37" fillOpacity="0.7"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  value={websiteUrl}
                  onChange={handleWebsiteUrlChange}
                  placeholder="Enter website URL to find relevant creators" 
                  className={`w-full py-4 px-14 rounded-full bg-[rgba(0,0,0,0.7)] border ${urlError ? 'border-red-500' : 'border-[rgba(218,165,32,0.3)]'} text-white focus:outline-none focus:border-[#D4AF37] transition-all duration-300 text-base`}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#D4AF37] to-[#BF9D30] text-black rounded-full px-8 py-2.5 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(218,165,32,0.3)] group-hover:scale-105"
                >
                  Try for free
                </button>
              </form>
              
              {/* URL validation error message */}
              {urlError && (
                <div className="mb-4 text-red-500 text-sm mt-1">
                  {urlError}
                </div>
              )}
              
              <div className="flex items-center justify-center gap-12 mt-2">
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
                  <span className="text-sm text-gray-300">Join waitlist now</span>
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
            {/* Actual video player */}
            <video 
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/autocollab.mp4"
              preload="metadata"
              playsInline
              poster="/video-poster.jpg" // Optional: Add a poster image if you have one
              onEnded={() => setIsVideoPlaying(false)}
            />
            
            {/* Overlay with play button */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isVideoPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              onClick={toggleVideo}
            >
              {/* Video overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Play button */}
              <button className="relative z-10 bg-[#D4AF37] hover:bg-[#BF9D30] text-black rounded-full p-4 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L19 12L5 21V3Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            {/* Video controls when playing */}
            {isVideoPlaying && (
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                <button 
                  onClick={toggleVideo}
                  className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black rounded-full p-2 flex items-center justify-center transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4H6V20H10V4Z M18 4H14V20H18V4Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email popup */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#111] border border-[rgba(218,165,32,0.3)] rounded-xl p-6 md:p-8 max-w-md w-full relative animate-scaleIn">
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {showAnimation ? (
              <div className="py-12 flex flex-col items-center justify-center">
                {/* Exciting animation when processing */}
                <div className="relative">
                  {/* Pulsing circles */}
                  <div className="absolute inset-0 animate-ping-slow rounded-full bg-[rgba(218,165,32,0.2)] scale-150"></div>
                  <div className="absolute inset-0 animate-ping-fast rounded-full bg-[rgba(218,165,32,0.3)] scale-125"></div>
                  
                  {/* Spinning gold ring */}
                  <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#D4AF37] border-b-[#D4AF37] animate-spin"></div>
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11499 17.053 3.99476 18.5291 5.47086C20.0052 6.94695 20.885 8.91565 21 11V11.5Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* Animated message */}
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-bold text-white mb-2 animate-bounce">Finding creators for you...</h3>
                  <p className="text-gray-300">
                    Our AI is analyzing {websiteUrl} and searching for the perfect match
                  </p>
                </div>
                
                {/* Animated progress bar */}
                <div className="w-full h-2 bg-gray-800 rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#BF9D30] animate-progressBar"></div>
                </div>
              </div>
            ) : !isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.3)] flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM16.707 8.707L10 15.414L7.293 12.707L8.707 11.293L10 12.586L15.293 7.293L16.707 8.707Z" fill="#D4AF37"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Almost there!</h3>
                  <p className="text-gray-300 mb-6">
                    We'll analyze {websiteUrl} and find the perfect creators for your brand.
                  </p>
                </div>

                <form onSubmit={handleSubmitEmail} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Your email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address" 
                      className="w-full py-3 px-4 rounded-lg bg-[rgba(0,0,0,0.4)] border border-[rgba(218,165,32,0.3)] text-white focus:outline-none focus:border-[#D4AF37] transition-all duration-300"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BF9D30] text-black rounded-full py-3 px-4 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(218,165,32,0.3)] hover:scale-105"
                  >
                    Join waitlist & get creator insights
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By joining, you'll receive emails with relevant creator recommendations for your brand.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.3)] flex items-center justify-center mx-auto mb-6 animate-celebrateIn">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Animated confetti elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#ffffff' : '#BF9D30',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.6 + 0.4,
                        animation: `confettiFall ${Math.random() * 3 + 2}s linear forwards, confettiFade ${Math.random() * 2 + 1}s ease-out forwards`,
                        animationDelay: `${Math.random() * 0.5}s`
                      }}
                    />
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 animate-bounceIn">You're in!</h3>
                <p className="text-gray-300 mb-6 animate-fadeInUp">
                  We're excited to help you discover amazing creators for your brand. Watch your inbox for insights coming soon!
                </p>
                <button 
                  onClick={closePopup}
                  className="px-8 py-3 bg-transparent border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[rgba(218,165,32,0.1)] transition-all duration-300 animate-fadeInUp"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes ping-fast {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.25); opacity: 0; }
        }
        
        @keyframes progressBar {
          0% { width: 0; }
          50% { width: 70%; }
          75% { width: 90%; }
          100% { width: 100%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes celebrateIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.3); }
          75% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        
        @keyframes bounceIn {
          0% { transform: translateY(25px); opacity: 0; }
          50% { transform: translateY(-10px); }
          70% { transform: translateY(5px); }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes confettiFall {
          from { transform: translateY(-20px) rotate(0deg); }
          to { transform: translateY(100vh) rotate(360deg); }
        }
        
        @keyframes confettiFade {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-ping-fast {
          animation: ping-fast 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-progressBar {
          animation: progressBar 3s ease-in-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .animate-celebrateIn {
          animation: celebrateIn 0.8s ease-out forwards;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}