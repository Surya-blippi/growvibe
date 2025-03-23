"use client";
import { useState, useEffect, useRef } from 'react';

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  
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

  const featureItems = [
    {
      title: "AI-Powered Creator Match",
      subtitle: "Our AI reviews 100K+ creators to find your perfect matches.",
      image: "creator-match-cards.png",
      buttonText: "Book a Demo"
    },
    {
      title: "Automated Campaign Management",
      subtitle: "Let AI streamline your briefings, outreach, replies, and review content, allowing you to focus on strategy.",
      image: "campaign-management.png",
      buttonText: "Book a Demo"
    },
    {
      title: "Real-Time Performance Analysis",
      subtitle: "Monitor engagement, sentiment, and ROI as they happen in key areas.",
      image: "performance-analysis.png",
      buttonText: "Book a Demo"
    },
    {
      title: "Revolutionary Performance",
      subtitle: "Scale your creator marketing without scaling your team.",
      image: "revolutionary-performance.png",
      buttonText: "Book a Demo",
      stats: [
        {label: "Impressions", value: "300K"},
        {label: "Likes", value: "25K"},
        {label: "Conversion Rate", value: "35%"}
      ]
    }
  ];

  return (
    <section 
      id="features" 
      ref={sectionRef} 
      className="relative py-20 overflow-hidden bg-black min-h-screen"
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute w-[45vw] h-[45vw] rounded-full bg-[rgba(218,165,32,0.03)] blur-3xl transform"
        style={{ 
          top: '10%',
          right: '10%',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-[rgba(184,134,11,0.05)] to-transparent"
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Features content */}
        <div className="space-y-32">
          {/* Feature 1: AI-Powered Creator Match */}
          <div className={`flex flex-col lg:flex-row gap-10 items-center transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="lg:w-1/2 lg:pr-6">
              <div className="text-sm text-[#D4AF37] mb-2 uppercase tracking-wider">Our Solutions</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#D4AF37]">AI-Powered</span><br />
                Creator Match
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Our AI reviews 100K+ creators to find your perfect matches.
              </p>
              <button className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium rounded-full px-8 py-3 transition-all duration-300">
                Book a Demo
              </button>
            </div>
            
            <div className="lg:w-1/2 relative">
              {/* Creator cards grid */}
              <div className="grid grid-cols-3 gap-3 relative"
                style={{ 
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
                }}>
                {Array.from({ length: 9 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg overflow-hidden bg-[rgba(30,30,35,0.8)] border border-[rgba(80,80,85,0.3)] transform transition-all duration-300"
                    style={{ 
                      transform: `translate(${(mousePosition.x - 0.5) * 10 * ((index % 3) - 1)}px, ${(mousePosition.y - 0.5) * 10 * (Math.floor(index / 3) - 1)}px)`,
                      zIndex: 9 - index
                    }}
                  >
                    <div className="p-2">
                      <div className="rounded-full bg-gray-700 w-8 h-8 mb-2 mx-auto overflow-hidden"></div>
                      <div className="h-1 w-16 bg-gray-700 rounded-full mb-2 mx-auto"></div>
                      <div className="h-px bg-gray-800 my-2"></div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <div className="w-10 h-2 bg-gray-700 rounded-full"></div>
                        <div className="w-8 h-2 bg-[rgba(218,165,32,0.3)] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <div className="w-12 h-2 bg-gray-700 rounded-full"></div>
                        <div className="w-6 h-2 bg-[rgba(218,165,32,0.3)] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="w-8 h-2 bg-gray-700 rounded-full"></div>
                        <div className="w-10 h-2 bg-[rgba(218,165,32,0.3)] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Feature 2: Automated Campaign Management */}
          <div className={`flex flex-col lg:flex-row gap-10 items-center transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="lg:w-1/2 lg:pr-6">
              <div className="text-sm text-[#D4AF37] mb-2 uppercase tracking-wider">Our Solutions</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#D4AF37]">Automated</span><br />
                Campaign Management
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Let AI streamline your briefings, outreach, replies, and review content, allowing you to focus on strategy.
              </p>
              <button className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium rounded-full px-8 py-3 transition-all duration-300">
                Book a Demo
              </button>
            </div>
            
            <div className="lg:w-1/2 relative">
              {/* Campaign management table */}
              <div className="relative rounded-xl overflow-hidden border border-[rgba(80,80,85,0.3)] bg-[rgba(20,20,25,0.7)]"
                style={{ 
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
                }}>
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-gray-700 w-6 h-6 mr-3"></div>
                    <div className="w-24 h-3 bg-gray-700 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex items-center p-2 rounded-lg bg-[rgba(30,30,35,0.8)] border border-[rgba(50,50,55,0.5)]"
                        style={{ 
                          transform: `translateX(${(mousePosition.x - 0.5) * 5}px)` 
                        }}
                      >
                        <div className="rounded-full bg-gray-700 w-8 h-8 mr-3"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div className="w-20 h-2 bg-gray-700 rounded-full"></div>
                            <div className="w-16 h-2 bg-gray-700 rounded-full"></div>
                          </div>
                          
                          <div className="flex space-x-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="flex items-center">
                                <div className="w-4 h-4 rounded-full border border-[rgba(218,165,32,0.5)] flex items-center justify-center mr-1">
                                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                                </div>
                                <div className="w-12 h-2 bg-gray-700 rounded-full"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 3: Real-Time Performance Analysis */}
          <div className={`flex flex-col lg:flex-row gap-10 items-center transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="lg:w-1/2 lg:pr-6">
              <div className="text-sm text-[#D4AF37] mb-2 uppercase tracking-wider">Our Solutions</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#D4AF37]">Real-Time</span><br />
                Performance Analysis for<br />
                Instant Insights
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Monitor engagement, sentiment, and ROI as they happen in key areas.
              </p>
              <button className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium rounded-full px-8 py-3 transition-all duration-300">
                Book a Demo
              </button>
            </div>
            
            <div className="lg:w-1/2 relative">
              {/* Performance analysis dashboard */}
              <div className="relative rounded-xl overflow-hidden border border-[rgba(80,80,85,0.3)] bg-[rgba(20,20,25,0.7)]"
                style={{ 
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
                }}>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg bg-[rgba(30,30,35,0.8)] border border-[rgba(50,50,55,0.5)] p-3">
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-24 h-2 bg-gray-700 rounded-full"></div>
                        <div className="text-[#D4AF37] text-sm">90%</div>
                      </div>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-[90%] bg-[#D4AF37]"></div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-[rgba(30,30,35,0.8)] border border-[rgba(50,50,55,0.5)] p-3">
                      <div className="w-24 h-2 bg-gray-700 rounded-full mb-3"></div>
                      <div className="flex justify-between items-center">
                        <div className="w-3 h-3 rounded-full bg-[#D4AF37]"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-[rgba(30,30,35,0.8)] border border-[rgba(50,50,55,0.5)] p-3 mb-4">
                    <div className="w-36 h-2 bg-gray-700 rounded-full mb-4"></div>
                    <div className="flex items-end h-32 space-x-2">
                      {[60, 45, 75, 30, 90, 50, 65].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center space-y-1">
                          <div 
                            className="w-full bg-gradient-to-t from-[rgba(218,165,32,0.3)] to-[rgba(218,165,32,0.7)] rounded-t" 
                            style={{ height: `${height}%` }}
                          ></div>
                          <div className="w-6 h-1 bg-gray-700 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-[rgba(30,30,35,0.8)] border border-[rgba(50,50,55,0.5)] p-2 text-center">
                      <div className="text-xs text-gray-400 mb-1">18-24</div>
                      <div className="text-[#D4AF37] font-medium">45%</div>
                    </div>
                    <div className="rounded-lg bg-[rgba(30,30,35,0.8)] border border-[rgba(50,50,55,0.5)] p-2 text-center">
                      <div className="text-xs text-gray-400 mb-1">25-34</div>
                      <div className="text-[#D4AF37] font-medium">30%</div>
                    </div>
                    <div className="rounded-lg bg-[rgba(30,30,35,0.8)] border border-[rgba(50,50,55,0.5)] p-2 text-center">
                      <div className="text-xs text-gray-400 mb-1">35-44</div>
                      <div className="text-[#D4AF37] font-medium">25%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 4: Revolutionary Performance */}
          <div className={`flex flex-col lg:flex-row gap-10 items-center transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="lg:w-1/2 lg:pr-6">
              <div className="text-sm text-[#D4AF37] mb-2 uppercase tracking-wider">Our Solutions</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#D4AF37]">Revolutionary</span><br />
                Performance
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Scale your creator marketing without scaling your team.
              </p>
              <button className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium rounded-full px-8 py-3 transition-all duration-300">
                Book a Demo
              </button>
            </div>
            
            <div className="lg:w-1/2 relative">
              {/* Revolutionary performance timeline visualization */}
              <div className="relative"
                style={{ 
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
                }}>
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-gray-700 w-8 h-8 mr-3"></div>
                    <div className="flex-1">
                      <div className="w-48 h-3 bg-gray-700 rounded-full mb-1"></div>
                      <div className="w-32 h-2 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="relative ml-4 pl-6 border-l border-[rgba(218,165,32,0.3)]">
                    <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[#D4AF37] transform -translate-x-1.5"></div>
                    <div className="mb-2">Use AI to find influencers to collaborate with my brand</div>
                    
                    <div className="flex -ml-2 mb-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} 
                          className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 -ml-1"
                          style={{ zIndex: 8 - i }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative ml-4 pl-6 border-l border-[rgba(218,165,32,0.3)] mb-8">
                  <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[#D4AF37] transform -translate-x-1.5"></div>
                  <div className="mb-4">Your collaboration is up and running, keep track of your results in a handy dashboard</div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-lg bg-[rgba(30,30,35,0.8)] border border-[rgba(50,50,55,0.5)]"></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-center">
                    <div className="text-[#D4AF37] text-3xl font-bold">300K</div>
                    <div className="text-xs text-gray-400">Impressions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#D4AF37] text-3xl font-bold">25K</div>
                    <div className="text-xs text-gray-400">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#D4AF37] text-3xl font-bold">35%</div>
                    <div className="text-xs text-gray-400">Conversion Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}