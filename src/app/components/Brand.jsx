"use client";
import { useState, useEffect, useRef } from 'react';

export function Brand({ brandUrl = "@yourbrand", onBack }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [activeTab, setActiveTab] = useState('positioning');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [highlightedAttribute, setHighlightedAttribute] = useState(null);
  const dashboardRef = useRef(null);
  const [particles, setParticles] = useState([]);
  
  // Mock data for brand positioning
  const brandData = {
    name: brandUrl.replace('@', ''),
    followers: '15.4K',
    engagement: '3.2%',
    sentiment: 'Positive',
    categories: ['Fashion', 'Lifestyle', 'Sustainable'],
    topHashtags: ['#fashion', '#sustainable', '#lifestyle', '#premium'],
    competitors: [
      { name: 'CompetitorA', overlap: '62%' },
      { name: 'CompetitorB', overlap: '48%' },
      { name: 'CompetitorC', overlap: '37%' }
    ],
    positioning: {
      premium: 78,
      innovative: 65,
      sustainable: 82,
      authentic: 71,
      trendy: 68
    }
  };
  
  // Mock data for audience/ICP
  const audienceData = {
    demographics: {
      ageGroups: [
        { group: '18-24', percentage: 32 },
        { group: '25-34', percentage: 45 },
        { group: '35-44', percentage: 15 },
        { group: '45+', percentage: 8 }
      ],
      gender: { female: 62, male: 38 },
      topLocations: [
        { location: 'New York', percentage: 18 },
        { location: 'Los Angeles', percentage: 15 },
        { location: 'London', percentage: 12 },
        { location: 'Toronto', percentage: 8 },
        { location: 'Sydney', percentage: 7 }
      ]
    },
    interests: [
      { name: 'Fashion', percentage: 86 },
      { name: 'Wellness', percentage: 72 },
      { name: 'Travel', percentage: 64 },
      { name: 'Sustainability', percentage: 58 },
      { name: 'Technology', percentage: 42 }
    ],
    idealCustomer: {
      persona: 'Urban Professional',
      ageRange: '25-34',
      interests: 'Fashion, Sustainability, Wellness',
      income: '$75K-$120K',
      painPoints: 'Time constraints, Ethical concerns, Quality seeking',
      goals: 'Self-expression, Social recognition, Sustainability'
    },
    engagement: {
      bestTimeToPost: '6PM-8PM EST',
      bestDays: 'Wednesday, Saturday',
      contentPreference: 'Video, Carousel Posts'
    }
  };
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setIsLoaded(true);
    }, 2500);
    
    const handleMouseMove = (e) => {
      if (!dashboardRef.current) return;
      
      const { left, top, width, height } = dashboardRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      setMousePosition({ x, y });
    };
    
    // Generate particles only on the client side
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      key: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 15 + 10,
      animationDelay: Math.random() * 5
    }));
    
    setParticles(newParticles);
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Helper to render loading skeleton
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-[rgba(218,165,32,0.1)] rounded ${className}`}></div>
  );

  return (
    <section 
      ref={dashboardRef}
      className="relative min-h-screen bg-black py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[70vw] h-[70vw] rounded-full bg-[rgba(218,165,32,0.02)] blur-3xl transform top-0 right-0 opacity-60"
          style={{ transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` }}
        ></div>
        <div className="absolute w-[60vw] h-[60vw] rounded-full bg-[rgba(184,134,11,0.02)] blur-3xl transform bottom-0 left-0 opacity-40"
          style={{ transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)` }}
        ></div>
        
        {/* Particle effect */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <div 
              key={particle.key}
              className="absolute rounded-full bg-[#D4AF37] opacity-10 animate-float"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                animationDuration: `${particle.animationDuration}s`,
                animationDelay: `${particle.animationDelay}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with brand info */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <button
              onClick={onBack}
              className="flex items-center text-gray-400 hover:text-[#D4AF37] mb-4 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[rgba(20,20,25,0.7)] flex items-center justify-center mr-2 border border-[rgba(218,165,32,0.1)] group-hover:border-[rgba(218,165,32,0.3)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Back to Home</span>
            </button>
            
            <div className="flex items-center">
              <div className="w-16 h-16 bg-[rgba(20,20,25,0.6)] rounded-xl flex items-center justify-center text-2xl mr-4 border border-[rgba(218,165,32,0.2)]">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(218,165,32,0.3)] to-[rgba(218,165,32,0.1)] rounded-lg blur"></div>
                  <span className="relative text-[#D4AF37]">{brandData.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1 group" onClick={() => isAnalyzing ? null : navigator.clipboard.writeText(`@${brandData.name}`)}>
                  {isAnalyzing ? (
                    <Skeleton className="w-48 h-10" />
                  ) : (
                    <span className="flex items-center">
                      @{brandData.name}
                      <svg className="ml-2 w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V17M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V10M20 14H10M10 14L13 11M10 14L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </h1>
                <div className="flex flex-wrap items-center text-gray-400">
                  {isAnalyzing ? (
                    <Skeleton className="w-64 h-5" />
                  ) : (
                    <>
                      <div className="flex items-center mr-4 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[rgba(218,165,32,0.3)] mr-1.5"></div>
                        <span>{brandData.followers} followers</span>
                      </div>
                      <div className="flex items-center mr-4 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[rgba(218,165,32,0.4)] mr-1.5"></div>
                        <span>{brandData.engagement} engagement</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <div className="w-3 h-3 rounded-full bg-[rgba(218,165,32,0.6)] mr-1.5"></div>
                        <span className="text-[#D4AF37]">{brandData.sentiment} sentiment</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {!isAnalyzing && (
            <button className="mt-4 md:mt-0 bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium py-2 px-5 rounded-full transition-all duration-300 flex items-center shadow-[0_0_15px_rgba(218,165,32,0.3)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 16L12 8M12 8L8 12M12 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Export Insights
            </button>
          )}
        </div>
        
        {/* Loading state with improved styling */}
        {isAnalyzing && (
          <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-8 md:p-12 mb-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.3)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.3)] to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[rgba(218,165,32,0.3)] to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-[rgba(218,165,32,0.3)] to-transparent"></div>
            </div>
            
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(20,20,25,0.8)] border border-[rgba(218,165,32,0.2)] mb-6 relative">
              <div className="absolute inset-1 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin"></div>
              <div className="w-10 h-10 rounded-full bg-[rgba(218,165,32,0.1)]"></div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Analyzing <span className="text-[#D4AF37]">@{brandData.name}</span></h2>
            
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Our AI is examining your brand's content, audience data, engagement patterns, and market positioning to generate comprehensive insights tailored to your business goals.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 text-sm">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-[rgba(218,165,32,0.1)] flex items-center justify-center mr-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                </div>
                <span className="text-gray-300">Analyzing content</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-[rgba(218,165,32,0.1)] flex items-center justify-center mr-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                </div>
                <span className="text-gray-300">Identifying audience patterns</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-[rgba(218,165,32,0.1)] flex items-center justify-center mr-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                </div>
                <span className="text-gray-300">Mapping market position</span>
              </div>
            </div>
            
            <div className="relative w-full max-w-md mx-auto h-2 bg-[rgba(20,20,25,0.6)] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.1)] to-transparent animate-pulse"></div>
              <div className="h-full bg-gradient-to-r from-[rgba(218,165,32,0.7)] to-[#D4AF37] rounded-full animate-progress-bar" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}
        
        {/* Dashboard content with improved tabs */}
        {!isAnalyzing && (
          <>
            {/* Tabs - with animated indicator */}
            <div className="mb-10 relative overflow-hidden">
              <div className="flex border-b border-[rgba(20,20,25,0.7)]">
                <button
                  className={`py-3 px-6 font-medium relative ${
                    activeTab === 'positioning' 
                      ? 'text-[#D4AF37]' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('positioning')}
                >
                  <div className="flex items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8V16M12 8H8M12 8H16M12 16H8M12 16H16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Brand Positioning
                  </div>
                </button>
                
                <button
                  className={`py-3 px-6 font-medium relative ${
                    activeTab === 'audience' 
                      ? 'text-[#D4AF37]' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('audience')}
                >
                  <div className="flex items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3744 16.8931 16.7718 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3744 7.10686 16.7718 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Audience & ICP
                  </div>
                </button>
                
                {/* Animated indicator */}
                <div className="absolute bottom-0 h-0.5 bg-[#D4AF37] transition-all duration-300"
                  style={{
                    left: activeTab === 'positioning' ? '0%' : '50%',
                    width: '50%',
                    transform: 'translateX(0)',
                  }}
                ></div>
              </div>
            </div>
            
            {/* Brand Positioning Tab */}
            {activeTab === 'positioning' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Positioning Radar Chart */}
                <div className="lg:col-span-2 bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-6 md:p-8 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(218,165,32,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="rgba(218,165,32,0.1)" stroke="#D4AF37" strokeWidth="2"/>
                        <path d="M12 8V16M12 8H8M12 8H16M12 16H8M12 16H16M8 12H16" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Brand Positioning</h3>
                  </div>
                  
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Radar chart visualization with improved styling */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Background circles */}
                      {[1, 2, 3, 4].map((level) => (
                        <div 
                          key={level} 
                          className="absolute rounded-full border border-[rgba(255,255,255,0.05)]"
                          style={{
                            width: `${level * 25}%`,
                            height: `${level * 25}%`,
                          }}
                        ></div>
                      ))}
                      
                      {/* Axis lines */}
                      {Object.keys(brandData.positioning).map((key, i) => {
                        const angle = (i * (360 / Object.keys(brandData.positioning).length)) * (Math.PI / 180);
                        return (
                          <div 
                            key={key}
                            className="absolute top-1/2 left-1/2 w-1/2 origin-left border-t border-dashed border-[rgba(255,255,255,0.05)]"
                            style={{
                              transform: `rotate(${angle}rad)`,
                            }}
                          ></div>
                        );
                      })}
                      
                      {/* Data points and polygon */}
                      <svg viewBox="-100 -100 200 200" className="absolute inset-0 w-full h-full">
                        {/* Background fill with gradient */}
                        <defs>
                          <linearGradient id="polygonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(218,165,32,0.3)" />
                            <stop offset="100%" stopColor="rgba(218,165,32,0.1)" />
                          </linearGradient>
                        </defs>
                        
                        <polygon 
                          points={Object.values(brandData.positioning).map((value, i) => {
                            const percent = value / 100;
                            const angle = (i * (360 / Object.keys(brandData.positioning).length)) * (Math.PI / 180);
                            const x = percent * 80 * Math.cos(angle);
                            const y = percent * 80 * Math.sin(angle);
                            return `${x},${y}`;
                          }).join(' ')}
                          fill="url(#polygonGradient)"
                          stroke="#D4AF37"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                          className="transition-all duration-500"
                        />
                        
                        {/* Data points */}
                        {Object.entries(brandData.positioning).map(([key, value], i) => {
                          const percent = value / 100;
                          const angle = (i * (360 / Object.keys(brandData.positioning).length)) * (Math.PI / 180);
                          const x = percent * 80 * Math.cos(angle);
                          const y = percent * 80 * Math.sin(angle);
                          const isHighlighted = highlightedAttribute === key;
                          
                          return (
                            <g key={i}>
                              <circle 
                                cx={x}
                                cy={y}
                                r={isHighlighted ? "6" : "4"}
                                fill={isHighlighted ? "#D4AF37" : "rgba(218,165,32,0.5)"}
                                stroke={isHighlighted ? "#D4AF37" : "rgba(218,165,32,0.2)"}
                                strokeWidth="1"
                                className="transition-all duration-300"
                                onMouseEnter={() => setHighlightedAttribute(key)}
                                onMouseLeave={() => setHighlightedAttribute(null)}
                              />
                              {isHighlighted && (
                                <text
                                  x={x}
                                  y={y - 12}
                                  textAnchor="middle"
                                  fill="#D4AF37"
                                  fontSize="10"
                                  fontWeight="bold"
                                >
                                  {value}%
                                </text>
                              )}
                            </g>
                          );
                        })}
                      </svg>
                      
                      {/* Labels with hover effects */}
                      {Object.keys(brandData.positioning).map((key, i) => {
                        const angle = (i * (360 / Object.keys(brandData.positioning).length)) * (Math.PI / 180);
                        const x = 105 * Math.cos(angle);
                        const y = 105 * Math.sin(angle);
                        const isHighlighted = highlightedAttribute === key;
                        
                        return (
                          <div 
                            key={key}
                            className={`absolute text-sm font-medium capitalize transition-all duration-300 cursor-pointer ${
                              isHighlighted ? 'text-[#D4AF37]' : 'text-gray-300'
                            }`}
                            style={{
                              top: `calc(50% + ${y}px)`,
                              left: `calc(50% + ${x}px)`,
                              transform: 'translate(-50%, -50%)',
                            }}
                            onMouseEnter={() => setHighlightedAttribute(key)}
                            onMouseLeave={() => setHighlightedAttribute(null)}
                          >
                            {key}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Brand Categories & Hashtags */}
                <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-6 md:p-8 flex flex-col group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(218,165,32,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 9H4M10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9ZM16 15H20M16 15C16 16.1046 15.1046 17 14 17C12.8954 17 12 16.1046 12 15C12 13.8954 12.8954 13 14 13C15.1046 13 16 13.8954 16 15ZM5 15L9 15M5 15C5 16.1046 4.10457 17 3 17C1.89543 17 1 16.1046 1 15C1 13.8954 1.89543 13 3 13C4.10457 13 5 13.8954 5 15ZM19 9L23 9M19 9C19 10.1046 18.1046 11 17 11C15.8954 11 15 10.1046 15 9C15 7.89543 15.8954 7 17 7C18.1046 7 19 7.89543 19 9Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Brand Categories</h3>
                  </div>
                  
                  <div className="mb-6 relative z-10">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {brandData.categories.map((category, index) => (
                        <span key={category} className="px-4 py-1.5 rounded-full bg-[rgba(218,165,32,0.07)] text-[#D4AF37] text-sm font-medium border border-[rgba(218,165,32,0.2)] hover:bg-[rgba(218,165,32,0.12)] transition-colors cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent w-full my-6"></div>
                    
                    <h4 className="text-md font-medium mb-3 flex items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                        <path d="M7 20L4 4L12 13L10 16L17 21L15 13L18 10L10 2L7 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Top Hashtags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brandData.topHashtags.map((hashtag, index) => (
                        <span key={hashtag} className="px-3 py-1 rounded-full bg-[rgba(20,20,25,0.9)] text-gray-300 hover:text-white text-sm transition-colors cursor-pointer border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]" style={{ animationDelay: `${index * 100}ms` }}>
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-4 mt-auto flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                      <path d="M12 12H19M19 12L16 9M19 12L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Competition Overlap
                  </h3>
                  
                  {brandData.competitors.map((competitor, index) => (
                    <div key={competitor.name} className="mb-3 group relative z-10">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>{competitor.name}</span>
                        <span className="text-[#D4AF37]">{competitor.overlap}</span>
                      </div>
                      <div className="relative h-2 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.03)] to-transparent rounded-full animate-pulse"></div>
                        <div 
                          className="h-full bg-gradient-to-r from-[rgba(218,165,32,0.6)] to-[#D4AF37] rounded-full transition-all duration-1000"
                          style={{ 
                            width: isLoaded ? competitor.overlap : '0%',
                            transitionDelay: `${800 + index * 300}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* AI Recommendations */}
                <div className="lg:col-span-3 bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-6 md:p-8 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(218,165,32,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center mr-4 relative">
                      <div className="absolute inset-0 rounded-lg blur-[1px] bg-[rgba(218,165,32,0.1)]"></div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                        <path d="M9.5 14.5L11.9 16.9C12 17 12.1 17 12.2 16.9L20 9" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 4V9H15" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 12V20H20V17" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">AI-Generated Recommendations</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    <div className="bg-[rgba(20,20,25,0.6)] rounded-lg p-5 border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-colors group relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[rgba(218,165,32,0.7)] to-[rgba(218,165,32,0.3)]"></div>
                      <h4 className="text-[#D4AF37] font-medium text-sm mb-2 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M12 16H12.01M12 8V12M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Positioning Opportunity
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Leverage your strong <span className="text-[#D4AF37] font-medium">sustainability</span> score in your content to differentiate from competitors who score lower in this area.
                      </p>
                    </div>
                    
                    <div className="bg-[rgba(20,20,25,0.6)] rounded-lg p-5 border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-colors group relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[rgba(218,165,32,0.7)] to-[rgba(218,165,32,0.3)]"></div>
                      <h4 className="text-[#D4AF37] font-medium text-sm mb-2 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M7 20L4 4L12 13L10 16L17 21L15 13L18 10L10 2L7 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Hashtag Strategy
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Incorporate more specific niche hashtags alongside your top performers to reach untapped segments of your target audience.
                      </p>
                    </div>
                    
                    <div className="bg-[rgba(20,20,25,0.6)] rounded-lg p-5 border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-colors group relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[rgba(218,165,32,0.7)] to-[rgba(218,165,32,0.3)]"></div>
                      <h4 className="text-[#D4AF37] font-medium text-sm mb-2 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M16.5 4.5H18C19.1046 4.5 20 5.39543 20 6.5V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6.5C4 5.39543 4.89543 4.5 6 4.5H7.5M16.5 4.5C16.5 3.39543 15.6046 2.5 14.5 2.5H9.5C8.39543 2.5 7.5 3.39543 7.5 4.5M16.5 4.5C16.5 5.60457 15.6046 6.5 14.5 6.5H9.5C8.39543 6.5 7.5 5.60457 7.5 4.5M14 12L10 8M14 12L10 16M14 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Competitive Edge
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Focus on <span className="text-[#D4AF37] font-medium">authenticity</span> to create distinction from CompetitorA, which has the highest audience overlap but scores lower on authentic positioning.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-right">
                    <button className="text-[#D4AF37] text-sm flex items-center mx-auto md:ml-auto md:mr-0 hover:text-white transition-colors">
                      <span>Generate More Recommendations</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                        <path d="M13 5L20 12L13 19M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Audience & ICP Tab with enhanced styling */}
            {activeTab === 'audience' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Demographics section */}
                <div className="lg:col-span-2 bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-6 md:p-8 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(218,165,32,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3744 16.8931 16.7718 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3744 7.10686 16.7718 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Audience Demographics</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {/* Age distribution with animated bars */}
                    <div>
                      <h4 className="text-lg font-medium mb-4 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                          <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Age Distribution
                      </h4>
                      {audienceData.demographics.ageGroups.map((age, index) => (
                        <div key={age.group} className="mb-3 group cursor-pointer" onMouseEnter={() => setHighlightedAttribute(age.group)} onMouseLeave={() => setHighlightedAttribute(null)}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className={highlightedAttribute === age.group ? 'text-white' : 'text-gray-300'}>{age.group}</span>
                            <span className="text-[#D4AF37]">{age.percentage}%</span>
                          </div>
                          <div className="relative h-3 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.05)] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div 
                              className="h-full bg-gradient-to-r from-[rgba(218,165,32,0.4)] to-[rgba(218,165,32,0.7)] rounded-full transition-all duration-1000 relative overflow-hidden"
                              style={{ 
                                width: isLoaded ? `${age.percentage}%` : '0%',
                                transitionDelay: `${500 + index * 200}ms`
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.2)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Gender & location with improved visuals */}
                    <div>
                      <h4 className="text-lg font-medium mb-4 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Gender Split
                      </h4>
                      <div className="relative h-5 mb-4 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[rgba(218,165,32,0.6)] to-[rgba(218,165,32,0.8)] rounded-l-full transition-all duration-1000"
                          style={{ 
                            width: isLoaded ? `${audienceData.demographics.gender.female}%` : '0%',
                            transitionDelay: `800ms`
                          }}
                        ></div>
                        <div className="absolute top-0 bottom-0 right-0 h-full bg-[rgba(255,255,255,0.2)] rounded-r-full transition-all duration-1000"
                          style={{ 
                            width: isLoaded ? `${audienceData.demographics.gender.male}%` : '0%',
                            transitionDelay: `1000ms`
                          }}
                        ></div>
                        
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-px h-full bg-black/20 absolute left-[62%]"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-8 mb-8">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-gradient-to-r from-[rgba(218,165,32,0.6)] to-[rgba(218,165,32,0.8)] rounded-full mr-2"></div>
                          <span className="text-sm">Female {audienceData.demographics.gender.female}%</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[rgba(255,255,255,0.2)] rounded-full mr-2"></div>
                          <span className="text-sm">Male {audienceData.demographics.gender.male}%</span>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-medium mb-4 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Top Locations
                      </h4>
                      
                      <div className="space-y-2">
                        {audienceData.demographics.topLocations.slice(0, 3).map((location, index) => (
                          <div key={location.location} className="flex items-center justify-between p-2 rounded-lg bg-[rgba(20,20,25,0.9)] border border-[rgba(218,165,32,0.05)] hover:border-[rgba(218,165,32,0.2)] transition-colors relative overflow-hidden group cursor-pointer">
                            <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[rgba(218,165,32,0.3)] to-transparent" style={{ width: `${location.percentage * 4}%` }}></div>
                            <span className="text-sm group-hover:text-white transition-colors">{location.location}</span>
                            <span className="text-sm text-[#D4AF37]">{location.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Interests section with enhancements */}
                <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-6 md:p-8 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(218,165,32,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Audience Interests</h3>
                  </div>
                  
                  <div className="relative z-10">
                    {audienceData.interests.map((interest, index) => (
                      <div key={interest.name} className="mb-3 group cursor-pointer" onMouseEnter={() => setHighlightedAttribute(interest.name)} onMouseLeave={() => setHighlightedAttribute(null)}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={highlightedAttribute === interest.name ? 'text-white' : 'text-gray-300'}>{interest.name}</span>
                          <span className="text-[#D4AF37]">{interest.percentage}%</span>
                        </div>
                        <div className="relative h-3 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(218,165,32,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div 
                            className="h-full bg-gradient-to-r from-[rgba(218,165,32,0.4)] to-[#D4AF37] rounded-full transition-all duration-1000 relative overflow-hidden"
                            style={{ 
                              width: isLoaded ? `${interest.percentage}%` : '0%',
                              transitionDelay: `${500 + index * 200}ms`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.2)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent w-full my-6"></div>
                  
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                      <path d="M8 7V3M12 7V3M16 7V3M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M14 13L12 15M12 15L10 13M12 15V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Engagement Insights
                  </h3>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="p-3 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-colors flex items-start group cursor-pointer relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[rgba(218,165,32,0.3)] via-[rgba(218,165,32,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="w-8 h-8 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center text-xs mr-3 flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="9" stroke="#D4AF37" strokeWidth="2"/>
                          <path d="M12 7V12L16 14" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#D4AF37]">Best Time to Post</h4>
                        <p className="text-gray-400 text-sm">{audienceData.engagement.bestTimeToPost}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-colors flex items-start group cursor-pointer relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[rgba(218,165,32,0.3)] via-[rgba(218,165,32,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="w-8 h-8 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center text-xs mr-3 flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="4" width="18" height="16" rx="2" stroke="#D4AF37" strokeWidth="2"/>
                          <path d="M16 2V6M8 2V6M3 10H21M8 14H10M14 14H16M8 18H10M14 18H16" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#D4AF37]">Best Days</h4>
                        <p className="text-gray-400 text-sm">{audienceData.engagement.bestDays}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-colors flex items-start group cursor-pointer relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[rgba(218,165,32,0.3)] via-[rgba(218,165,32,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="w-8 h-8 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center text-xs mr-3 flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 9V3H15M10 8L21 3M3 15V21H9M14 16L3 21" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#D4AF37]">Content Preference</h4>
                        <p className="text-gray-400 text-sm">{audienceData.engagement.contentPreference}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Ideal Customer Profile (ICP) with premium styling */}
                <div className="lg:col-span-3 bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-6 md:p-8 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(218,165,32,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center mr-4 relative">
                      <div className="absolute inset-0 rounded-lg blur-[1px] bg-[rgba(218,165,32,0.1)]"></div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                        <path d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 17L19 19M5 17L3 19M17 7L19 5M5 7L3 5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">Ideal Customer Profile (ICP)</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div className="bg-[rgba(20,20,25,0.6)] rounded-lg p-5 border border-[rgba(218,165,32,0.1)] transition-colors group/card relative overflow-hidden hover:border-[rgba(218,165,32,0.3)]">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[rgba(218,165,32,0.5)] to-transparent"></div>
                      <h4 className="text-[#D4AF37] font-medium mb-4 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3744 16.8931 16.7718 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3744 7.10686 16.7718 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Demographics
                      </h4>
                      <div className="space-y-4">
                        <div className="group/field cursor-pointer p-2 rounded-md hover:bg-[rgba(20,20,25,0.9)] transition-colors">
                          <div className="text-sm text-gray-400 mb-1">Persona</div>
                          <div className="font-medium text-white group-hover/field:text-[#D4AF37] transition-colors">{audienceData.idealCustomer.persona}</div>
                        </div>
                        <div className="group/field cursor-pointer p-2 rounded-md hover:bg-[rgba(20,20,25,0.9)] transition-colors">
                          <div className="text-sm text-gray-400 mb-1">Age Range</div>
                          <div className="font-medium text-white group-hover/field:text-[#D4AF37] transition-colors">{audienceData.idealCustomer.ageRange}</div>
                        </div>
                        <div className="group/field cursor-pointer p-2 rounded-md hover:bg-[rgba(20,20,25,0.9)] transition-colors">
                          <div className="text-sm text-gray-400 mb-1">Income</div>
                          <div className="font-medium text-white group-hover/field:text-[#D4AF37] transition-colors">{audienceData.idealCustomer.income}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[rgba(20,20,25,0.6)] rounded-lg p-5 border border-[rgba(218,165,32,0.1)] transition-colors group/card relative overflow-hidden hover:border-[rgba(218,165,32,0.3)]">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[rgba(218,165,32,0.5)] to-transparent"></div>
                      <h4 className="text-[#D4AF37] font-medium mb-4 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Interests & Preferences
                      </h4>
                      <div className="space-y-4">
                        <div className="group/field cursor-pointer p-2 rounded-md hover:bg-[rgba(20,20,25,0.9)] transition-colors">
                          <div className="text-sm text-gray-400 mb-1">Primary Interests</div>
                          <div className="font-medium text-white group-hover/field:text-[#D4AF37] transition-colors">{audienceData.idealCustomer.interests}</div>
                        </div>
                        <div className="group/field cursor-pointer p-2 rounded-md hover:bg-[rgba(20,20,25,0.9)] transition-colors">
                          <div className="text-sm text-gray-400 mb-1">Pain Points</div>
                          <div className="font-medium text-white group-hover/field:text-[#D4AF37] transition-colors">{audienceData.idealCustomer.painPoints}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[rgba(20,20,25,0.6)] rounded-lg p-5 border border-[rgba(218,165,32,0.1)] transition-colors group/card relative overflow-hidden hover:border-[rgba(218,165,32,0.3)]">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[rgba(218,165,32,0.5)] to-transparent"></div>
                      <h4 className="text-[#D4AF37] font-medium mb-4 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M5 19C5 19 5 14.5 12 14.5C19 14.5 19 19 19 19M12 11.9999C12 11.9999 12 11.9999 12 11.9999C9.79086 11.9999 8 10.2091 8 7.99996C8 5.79082 9.79086 3.99996 12 3.99996C14.2091 3.99996 16 5.79082 16 7.99996C16 10.2091 14.2091 11.9999 12 11.9999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Goals & Motivations
                      </h4>
                      <div>
                        <div className="group/field cursor-pointer p-2 rounded-md hover:bg-[rgba(20,20,25,0.9)] transition-colors mb-5">
                          <div className="text-sm text-gray-400 mb-1">Primary Goals</div>
                          <div className="font-medium text-white group-hover/field:text-[#D4AF37] transition-colors">{audienceData.idealCustomer.goals}</div>
                        </div>
                        
                        <button className="w-full py-3 bg-[rgba(218,165,32,0.1)] border border-[#D4AF37] text-[#D4AF37] rounded-md hover:bg-[rgba(218,165,32,0.2)] transition-all duration-300 text-sm font-medium flex items-center justify-center group/btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 transition-transform duration-300 group-hover/btn:translate-x-1">
                            <path d="M15 12L9 16.5V7.5L15 12Z" fill="currentColor"/>
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          Generate Content Ideas for ICP
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center">
                    <button className="bg-[#D4AF37] text-black font-medium py-2 px-6 rounded-full hover:bg-[#BF9D30] transition-all duration-300 shadow-[0_0_15px_rgba(218,165,32,0.3)] flex items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M9.5 14.5L11.9 16.9C12 17 12.1 17 12.2 16.9L20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 14H15M15 14L11 10M15 14L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Create Custom Campaign for This ICP
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}