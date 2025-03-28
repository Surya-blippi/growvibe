"use client";
import { useState, useEffect, useRef } from 'react';

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(632);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Simulate people joining the waitlist at a slower rate (every hour)
    const interval = setInterval(() => {
      setWaitlistCount(prev => {
        // Random increase between 1-10 people
        const increase = Math.floor(Math.random() * 10) + 1;
        return prev + increase;
      });
    }, 3600000); // Update every hour (3600000 ms)
    
    // Fixed increase by 2 every hour
    const fixedInterval = setInterval(() => {
      setWaitlistCount(prev => prev + 2);
    }, 3600000); // Every hour
    
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      observer.disconnect();
      clearInterval(interval);
      clearInterval(fixedInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate submission success
      setIsSubmitted(true);
      setEmail('');
      // Increment the counter immediately for better feedback
      setWaitlistCount(prev => prev + 1);
    }
  };

  return (
    <section 
      id="waitlist" 
      ref={sectionRef} 
      className="relative py-20 overflow-hidden bg-black"
    >
      {/* Curved gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-full h-[120%] top-0 rounded-[50%] bg-gradient-to-r from-[rgba(184,134,11,0.2)] to-[rgba(218,165,32,0.15)]"
          style={{
            transform: 'translateY(-65%)',
            filter: 'blur(5px)'
          }}
        ></div>
      </div>
      
      {/* Subtle gold gradient accents */}
      <div 
        className="absolute w-[40vw] h-[40vw] rounded-full bg-[rgba(218,165,32,0.03)] blur-3xl transform"
        style={{ 
          top: '10%',
          right: '15%',
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
        }}
      ></div>
      
      <div 
        ref={containerRef}
        className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center"
      >
        {/* Main headline */}
        <h2 className={`text-5xl md:text-6xl font-bold mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0 transform -translate-y-4'
        }`}>
          Creator collab on <span className="text-[#D4AF37]">steroids</span>
        </h2>
        
        {/* Waitlist counter */}
        <div className={`mb-10 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-2 tabular-nums">
            {waitlistCount.toLocaleString()}
          </div>
          <p className="text-gray-400">people on the waitlist</p>
        </div>
        
        {/* Email form */}
        <div className={`max-w-md mx-auto transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[rgba(0,0,0,0.5)] border border-[rgba(218,165,32,0.3)] rounded-full py-4 px-5 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium rounded-full px-5 py-2.5 transition-all duration-300"
                >
                  Join Waitlist
                </button>
              </div>
              
              <p className="text-xs text-center text-gray-400">
                No credit card required. We'll notify you when it's your turn to get access.
              </p>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.3)] flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">You're on the list!</h4>
              <p className="text-gray-400 mb-4">
                We've saved your spot. You'll be notified when it's your turn to get access.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-[#D4AF37] text-sm border-b border-[rgba(218,165,32,0.3)] hover:border-[#D4AF37]"
              >
                Add another email
              </button>
            </div>
          )}
        </div>
        
        {/* Testimonial/social proof */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="bg-[rgba(20,20,25,0.7)] rounded-xl border border-[rgba(80,80,85,0.3)] p-6">
            <div className="h-8 w-8 rounded-full bg-[rgba(218,165,32,0.1)] flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-300 text-sm font-medium mb-2">
              24/7 Support
            </p>
            <p className="text-gray-400 text-sm">
              Our dedicated team is always available to help you succeed.
            </p>
          </div>
          
          <div className="bg-[rgba(20,20,25,0.7)] rounded-xl border border-[rgba(80,80,85,0.3)] p-6">
            <div className="h-8 w-8 rounded-full bg-[rgba(218,165,32,0.1)] flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </div>
            <p className="text-gray-300 text-sm font-medium mb-2">
              Premium Benefits
            </p>
            <p className="text-gray-400 text-sm">
              Early members receive special pricing and exclusive features.
            </p>
          </div>
          
          <div className="bg-[rgba(20,20,25,0.7)] rounded-xl border border-[rgba(80,80,85,0.3)] p-6">
            <div className="h-8 w-8 rounded-full bg-[rgba(218,165,32,0.1)] flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <p className="text-gray-300 text-sm font-medium mb-2">
              Growing Community
            </p>
            <p className="text-gray-400 text-sm">
              Join thousands of brands already revolutionizing their marketing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}