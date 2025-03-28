"use client";
import { useState, useEffect, useRef } from 'react';
import supabase from '../utils/supabaseClient';

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(333); // Default initial value
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
    
    // Fetch the current waitlist count from Supabase
    const fetchWaitlistCount = async () => {
      try {
        const { data, error } = await supabase
          .from('waitlist_counter')
          .select('counter')
          .eq('id', 1)
          .single();
          
        if (!error && data) {
          setWaitlistCount(data.counter);
        } else {
          console.error('Error fetching waitlist count:', error);
        }
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
      }
    };
    
    fetchWaitlistCount();
    
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
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    
    if (email) {
      setShowAnimation(true);
      
      try {
        // 1. Insert the new user entry
        const { error: insertError } = await supabase
          .from('autocollab')
          .insert([
            { email: email, website: 'https://example.com' }
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
            
            if (!updateError) {
              // 5. Update local state with new count
              setWaitlistCount(newCount);
            } else {
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
          setEmail('');
        }, 3000);
        
      } catch (error) {
        console.error('Unexpected error:', error);
        
        // Still update UI to show success, even if there was an error
        setTimeout(() => {
          setShowAnimation(false);
          setIsSubmitted(true);
          setEmail('');
        }, 3000);
      }
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
          {showAnimation ? (
            <div className="py-6 flex flex-col items-center justify-center">
              {/* Processing animation */}
              <div className="relative">
                <div className="absolute inset-0 animate-ping-slow rounded-full bg-[rgba(218,165,32,0.2)] scale-150"></div>
                <div className="absolute inset-0 animate-ping-fast rounded-full bg-[rgba(218,165,32,0.3)] scale-125"></div>
                
                <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#D4AF37] border-b-[#D4AF37] animate-spin"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
                    <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11499 17.053 3.99476 18.5291 5.47086C20.0052 6.94695 20.885 8.91565 21 11V11.5Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Joining the waitlist...</h3>
                <p className="text-gray-300">
                  We're adding you to our growing community
                </p>
              </div>
              
              {/* Animated progress bar */}
              <div className="w-full h-2 bg-gray-800 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#BF9D30] animate-progressBar"></div>
              </div>
            </div>
          ) : !isSubmitted ? (
            <form onSubmit={handleSubmitEmail} className="space-y-4">
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
              <div className="w-16 h-16 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.3)] flex items-center justify-center mx-auto mb-4 animate-celebrateIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Animated confetti elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
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
              
              <h4 className="text-xl font-bold text-white mb-2 animate-bounceIn">You're on the list!</h4>
              <p className="text-gray-400 mb-4 animate-fadeInUp">
                We've saved your spot. You'll be notified when it's your turn to get access.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-[#D4AF37] text-sm border-b border-[rgba(218,165,32,0.3)] hover:border-[#D4AF37] animate-fadeInUp"
              >
                Add another email
              </button>
            </div>
          )}
        </div>
        
        {/* Testimonial/social proof section - unchanged */}
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
      
      {/* Animation keyframes - unchanged */}
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
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-pulse {
          animation: pulse 1.5s ease infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}