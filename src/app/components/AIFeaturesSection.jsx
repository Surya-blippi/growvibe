"use client";
import { useState, useEffect, useRef } from 'react';

export function AIFeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(null);
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Generate particles only on the client side
    const particlesArray = Array.from({ length: 15 }).map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 15,
      animationDelay: Math.random() * 5
    }));
    setParticles(particlesArray);
    
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
    
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
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

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden bg-black"
      id="ai-features"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Animated gold particles - Client-side only rendering */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-[#D4AF37] opacity-20 animate-float" 
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animationDuration: `${particle.animationDuration}s`,
              animationDelay: `${particle.animationDelay}s`
            }}
          />
        ))}
      </div>
      
      {/* Subtle moving gradient background */}
      <div 
        className="absolute w-[60vw] h-[60vw] rounded-full bg-[rgba(218,165,32,0.03)] blur-3xl transform"
        style={{ 
          top: '5%',
          right: '10%',
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
        }}
      ></div>
      <div 
        className="absolute w-[60vw] h-[60vw] rounded-full bg-[rgba(218,165,32,0.02)] blur-3xl transform"
        style={{ 
          bottom: '5%',
          left: '10%',
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Enhanced header with decorative elements */}
        <div className="text-center mb-20 relative">
          {/* Decorative line elements */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-8 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-40"></div>
          
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <span className="text-[#D4AF37] relative inline-block">
              AI-powered
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-40"></span>
            </span> distribution<br />
            engine for your business
          </h2>
          
          <div className={`w-16 h-1 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30 my-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-30 scale-100' : 'opacity-0 scale-0'
          }`}></div>
        </div>
        
        {/* Enhanced feature cards with consistent styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Feature 1 */}
          <div 
            className={`group relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
            onMouseEnter={() => setActiveFeature(0)}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(218,165,32,0.1)] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative bg-[rgba(20,20,25,0.9)] rounded-2xl p-8 md:p-10 border border-[rgba(218,165,32,0.1)] overflow-hidden h-full transform transition-all duration-500 group-hover:border-[rgba(218,165,32,0.3)] group-hover:-translate-y-2"
              style={{ 
                transform: activeFeature === 0 ? `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg) translateY(-0.5rem)` 
                        : `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
              }}
            >
              {/* Icon with enhanced styling */}
              <div className="mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgba(218,165,32,0.2)] to-[rgba(218,165,32,0.05)] flex items-center justify-center border border-[rgba(218,165,32,0.2)] group-hover:border-[rgba(218,165,32,0.3)] transition-all duration-300">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C9.02 3 6.47 5.14 5.9 8H6.9C7.41 5.84 9.53 4.18 12 4.18C14.47 4.18 16.59 5.84 17.1 8H18.1C17.53 5.14 14.98 3 12 3Z" fill="#D4AF37"/>
                    <path d="M12 19.82C9.28 19.82 7.04 17.62 6.93 14.93C6.92 14.65 6.67 14.43 6.39 14.43H5.91C5.6 14.43 5.35 14.69 5.36 15.01C5.5 18.24 8.42 20.93 12 21C15.59 20.93 18.5 18.24 18.64 15.01C18.65 14.69 18.4 14.43 18.09 14.43H17.61C17.33 14.43 17.08 14.65 17.07 14.93C16.96 17.62 14.72 19.82 12 19.82Z" fill="#D4AF37"/>
                    <path d="M22 11.5C22 10.12 20.88 9 19.5 9H18.07C17.77 9 17.5 9.31 17.61 9.6C17.72 9.89 17.79 10.2 17.79 10.53C17.79 11.94 16.64 13.08 15.24 13.08H8.76C7.36 13.08 6.21 11.94 6.21 10.53C6.21 10.2 6.28 9.89 6.39 9.6C6.5 9.31 6.23 9 5.93 9H4.5C3.12 9 2 10.12 2 11.5C2 12.88 3.12 14 4.5 14H19.5C20.88 14 22 12.88 22 11.5Z" fill="#D4AF37"/>
                  </svg>
                </div>
                <div className="w-16 h-1 mx-auto bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.3)] to-transparent my-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 transition-colors group-hover:text-white">Match with the right<br />influencers in 1 click</h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Our AI agent scans all social media platforms, evaluating content, audience insights, and engagement trends from over 5M micro & nano creators to find your ideal creators.
              </p>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-[rgba(218,165,32,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-[rgba(218,165,32,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div 
            className={`group relative transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
            onMouseEnter={() => setActiveFeature(1)}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(218,165,32,0.1)] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative bg-[rgba(20,20,25,0.9)] rounded-2xl p-8 md:p-10 border border-[rgba(218,165,32,0.1)] overflow-hidden h-full transform transition-all duration-500 group-hover:border-[rgba(218,165,32,0.3)] group-hover:-translate-y-2"
              style={{ 
                transform: activeFeature === 1 ? `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg) translateY(-0.5rem)` 
                        : `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
              }}
            >
              {/* Icon with enhanced styling */}
              <div className="mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgba(218,165,32,0.2)] to-[rgba(218,165,32,0.05)] flex items-center justify-center border border-[rgba(218,165,32,0.2)] group-hover:border-[rgba(218,165,32,0.3)] transition-all duration-300">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0001 1.99979C13.9627 1.99979 15.5593 3.59642 15.5593 5.55906C15.5593 7.4626 14.1222 9.01405 12.287 9.11567C12.1741 9.10447 12.059 9.10447 11.9461 9.11567C10.1109 9.01405 8.67383 7.4626 8.67383 5.55906C8.67383 3.59642 10.2705 1.99979 12.0001 1.99979Z" fill="#D4AF37"/>
                    <path d="M7.01108 11.8881C8.97372 11.8881 10.5704 13.4847 10.5704 15.4474C10.5704 17.3509 9.13329 18.9023 7.29803 19.004C7.18513 18.9928 7.07004 18.9928 6.95714 19.004C5.12188 18.9023 3.68481 17.3509 3.68481 15.4474C3.68481 13.4847 5.28144 11.8881 7.01108 11.8881Z" fill="#D4AF37"/>
                    <path d="M16.9892 11.8881C18.9518 11.8881 20.5484 13.4847 20.5484 15.4474C20.5484 17.3509 19.1114 18.9023 17.2761 19.004C17.1632 18.9928 17.0481 18.9928 16.9352 19.004C15.1 18.9023 13.6629 17.3509 13.6629 15.4474C13.6629 13.4847 15.2595 11.8881 16.9892 11.8881Z" fill="#D4AF37"/>
                    <path d="M12.0002 12.0776C12.4608 12.0776 12.8694 12.1858 13.2257 12.3709C12.8413 12.9508 12.6116 13.6329 12.6116 14.3708C12.6116 15.3662 13.0146 16.2817 13.6629 16.9524C13.2091 17.772 12.4427 18.3968 11.517 18.6952C11.1831 18.7932 10.8326 18.8464 10.4719 18.8464C8.50925 18.8464 6.91262 17.2497 6.91262 15.3095C6.91262 13.3469 8.50925 11.7502 10.2389 11.7502H12.0002V12.0776Z" fill="#D4AF37"/>
                  </svg>
                </div>
                <div className="w-16 h-1 mx-auto bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.3)] to-transparent my-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 transition-colors group-hover:text-white">Fully autonomous,<br />from start to finish</h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Launch multiple creator campaigns at once-outreach thousands of creators, negotiate, and close deals in a few hours. All with minimal human in the loop.
              </p>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-[rgba(218,165,32,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-[rgba(218,165,32,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div 
            className={`group relative transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
            onMouseEnter={() => setActiveFeature(2)}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(218,165,32,0.1)] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative bg-[rgba(20,20,25,0.9)] rounded-2xl p-8 md:p-10 border border-[rgba(218,165,32,0.1)] overflow-hidden h-full transform transition-all duration-500 group-hover:border-[rgba(218,165,32,0.3)] group-hover:-translate-y-2"
              style={{ 
                transform: activeFeature === 2 ? `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg) translateY(-0.5rem)` 
                        : `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
              }}
            >
              {/* Icon with enhanced styling */}
              <div className="mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgba(218,165,32,0.2)] to-[rgba(218,165,32,0.05)] flex items-center justify-center border border-[rgba(218,165,32,0.2)] group-hover:border-[rgba(218,165,32,0.3)] transition-all duration-300">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3H5Z" fill="#D4AF37" fillOpacity="0.3"/>
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#D4AF37"/>
                    <path d="M14.67 2H9.33C8.6 2 8 2.6 8 3.33V5.67C8 6.4 8.6 7 9.33 7H14.67C15.4 7 16 6.4 16 5.67V3.33C16 2.6 15.4 2 14.67 2Z" fill="#D4AF37"/>
                  </svg>
                </div>
                <div className="w-16 h-1 mx-auto bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.3)] to-transparent my-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 transition-colors group-hover:text-white">No more missed attributions<br />in creator campaigns</h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                With state-of-the-art analytics, you'll gain full visibility into campaign and creator-level metrics, ensuring accurate performance tracking, ROI measurement, and data-driven decision-making.
              </p>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-[rgba(218,165,32,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-[rgba(218,165,32,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative bottom element */}
        <div className={`w-40 h-px mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-20 mt-20 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-20 scale-100' : 'opacity-0 scale-0'
        }`}></div>
      </div>
    </section>
  );
}