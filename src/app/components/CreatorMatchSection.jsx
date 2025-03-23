"use client";
import { useState, useEffect, useRef } from 'react';

export function CreatorMatchSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCreator, setHoveredCreator] = useState(null);
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

  const categories = [
    { id: 'all', name: 'All Niches', color: 'primary' },
    { id: 'fashion', name: 'Fashion', color: 'secondary' },
    { id: 'beauty', name: 'Beauty', color: 'accent' },
    { id: 'tech', name: 'Tech', color: 'primary' },
    { id: 'fitness', name: 'Fitness', color: 'secondary' },
    { id: 'food', name: 'Food', color: 'accent' }
  ];

  const creators = [
    { 
      id: 1, 
      category: 'fashion', 
      followers: '1.2M', 
      engagement: '4.8%', 
      name: 'StyleIcon', 
      handle: '@styleicon', 
      rating: 4.9, 
      delay: 100,
      match: 94,
      audienceMatch: 96,
      contentQuality: 92,
      brandAlignment: 94,
      posts: 845,
      topPlatform: 'Instagram',
      color: 'secondary'
    },
    { 
      id: 2, 
      category: 'tech', 
      followers: '860K', 
      engagement: '3.7%', 
      name: 'TechGuru', 
      handle: '@techguru', 
      rating: 4.7, 
      delay: 200,
      match: 91,
      audienceMatch: 89,
      contentQuality: 95,
      brandAlignment: 90,
      posts: 624,
      topPlatform: 'YouTube',
      color: 'primary'
    },
    { 
      id: 3, 
      category: 'beauty', 
      followers: '2.5M', 
      engagement: '5.2%', 
      name: 'GlowQueen', 
      handle: '@glowqueen', 
      rating: 5.0, 
      delay: 300,
      match: 97,
      audienceMatch: 98,
      contentQuality: 97,
      brandAlignment: 96,
      posts: 1257,
      topPlatform: 'TikTok',
      color: 'accent'
    },
    { 
      id: 4, 
      category: 'fitness', 
      followers: '950K', 
      engagement: '6.1%', 
      name: 'FitLife', 
      handle: '@fitlife', 
      rating: 4.8, 
      delay: 400,
      match: 93,
      audienceMatch: 95,
      contentQuality: 91,
      brandAlignment: 92,
      posts: 723,
      topPlatform: 'Instagram',
      color: 'secondary'
    },
    { 
      id: 5, 
      category: 'food', 
      followers: '1.8M', 
      engagement: '4.5%', 
      name: 'ChefMaster', 
      handle: '@chefmaster', 
      rating: 4.6, 
      delay: 500,
      match: 89,
      audienceMatch: 91,
      contentQuality: 88,
      brandAlignment: 87,
      posts: 912,
      topPlatform: 'YouTube',
      color: 'accent'
    },
    { 
      id: 6, 
      category: 'fashion', 
      followers: '720K', 
      engagement: '5.8%', 
      name: 'TrendSetter', 
      handle: '@trendsetter', 
      rating: 4.9, 
      delay: 600,
      match: 95,
      audienceMatch: 94,
      contentQuality: 96,
      brandAlignment: 95,
      posts: 687,
      topPlatform: 'TikTok',
      color: 'primary'
    }
  ];

  const filteredCreators = activeCategory === 'all' 
    ? creators 
    : creators.filter(creator => creator.category === activeCategory);

  return (
    <section 
      ref={sectionRef} 
      id="creators" 
      className="relative py-24 overflow-hidden bg-grid bg-noise"
    >
      {/* Dynamic background elements */}
      <div 
        className="absolute w-[45vw] h-[45vw] rounded-full bg-[rgba(var(--color-primary),0.03)] blur-3xl transform animate-float"
        style={{ 
          top: '10%',
          left: '15%',
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          animationDuration: '30s'
        }}
      ></div>
      <div 
        className="absolute w-[40vw] h-[40vw] rounded-full bg-[rgba(var(--color-secondary),0.04)] blur-3xl transform animate-float"
        style={{ 
          bottom: '15%',
          right: '10%',
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          animationDuration: '25s',
          animationDelay: '2s'
        }}
      ></div>
      
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-6 md:px-8 relative z-10"
      >
        <div className="text-center mb-12">
          <div className={`inline-flex items-center bg-[rgba(var(--color-primary),0.1)] rounded-full px-4 py-1.5 mb-4 border border-[rgba(var(--color-primary),0.2)] transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0 transform -translate-y-4'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[rgb(var(--color-primary))] animate-pulse mr-2"></span>
            <span className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">Creator Network</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100' : 'opacity-0 transform -translate-y-4'
          }`}>
            Find your <span className="gradient-text">perfect match</span>
          </h2>
          
          <p className={`text-[rgb(var(--color-text-secondary))] text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0 transform -translate-y-4'
          }`}>
            Our AI analyzes thousands of data points to connect you with creators who perfectly align with your brand and audience.
          </p>
        </div>
        
        {/* Interactive search bar */}
        <div 
          className={`max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="premium-card p-2 md:p-3 rounded-full flex items-center">
            <div className="flex-1 flex items-center pl-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[rgba(var(--color-primary),0.6)] mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input 
                type="text" 
                placeholder="Search by niche, follower count, or location..."
                className="w-full bg-transparent border-0 text-white focus:outline-none focus:ring-0 text-sm md:text-base"
              />
            </div>
            
            {/* Category filters in search bar */}
            <div className="hidden md:flex px-2">
              {categories.slice(0, 3).map((category) => (
                <button
                  key={category.id}
                  className={`px-3 py-1 mx-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? `bg-[rgba(var(--color-${category.color}),0.2)] text-[rgb(var(--color-${category.color}))] border border-[rgba(var(--color-${category.color}),0.3)]`
                      : 'text-[rgb(var(--color-text-secondary))] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
              
              <div className="relative group">
                <button className="px-3 py-1 mx-1 rounded-full text-xs font-medium text-[rgb(var(--color-text-secondary))] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300">
                  More
                </button>
                <div className="absolute right-0 top-full mt-2 w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="premium-card p-2 rounded-xl">
                    {categories.slice(3).map((category) => (
                      <button
                        key={category.id}
                        className={`w-full px-3 py-2 my-1 rounded-lg text-xs font-medium text-left transition-all duration-300 ${
                          activeCategory === category.id
                            ? `bg-[rgba(var(--color-${category.color}),0.2)] text-[rgb(var(--color-${category.color}))]`
                            : 'text-[rgb(var(--color-text-secondary))] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <button className="btn-primary py-2 px-6 rounded-full text-sm md:text-base">
              Find Creators
            </button>
          </div>
        </div>
        
        {/* Mobile category filters */}
        <div className={`md:hidden flex overflow-x-auto pb-4 no-scrollbar mb-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-1.5 mx-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-[rgba(var(--color-${category.color}),0.2)] text-[rgb(var(--color-${category.color}))] border border-[rgba(var(--color-${category.color}),0.3)]`
                  : 'text-[rgb(var(--color-text-secondary))] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)]'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Featured creator spotlight */}
        {filteredCreators.length > 0 && (
          <div 
            className={`mb-16 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div 
              className="premium-card overflow-hidden rounded-2xl border border-[rgba(var(--color-accent),0.2)]"
              style={{ 
                transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                {/* Featured creator visual */}
                <div className="lg:col-span-2 relative h-64 md:h-auto overflow-hidden bg-gradient-to-br from-[rgba(var(--color-accent),0.2)] to-[rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-[rgba(var(--color-accent),0.15)] flex items-center justify-center border-2 border-[rgba(var(--color-accent),0.3)]">
                      <span className="text-8xl font-thin text-[rgba(var(--color-accent),0.6)]">
                        {filteredCreators[0].name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-center mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgba(var(--color-accent),0.3)] text-white border border-[rgba(var(--color-accent),0.4)]">
                        Featured Creator
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{filteredCreators[0].name}</h3>
                    <p className="text-[rgb(var(--color-text-secondary))]">{filteredCreators[0].handle}</p>
                  </div>
                </div>
                
                {/* Featured creator details */}
                <div className="lg:col-span-3 p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 gradient-text-accent">Perfect Alignment</h3>
                        <p className="text-[rgb(var(--color-text-secondary))] text-sm md:text-base">
                          Our AI analysis shows this creator is an exceptional match for your brand
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[rgba(var(--color-accent),0.15)] border-4 border-[rgba(var(--color-accent),0.3)]">
                          <span className="text-xl font-bold gradient-text-accent">{filteredCreators[0].match}%</span>
                        </div>
                        <span className="text-xs mt-1 text-[rgb(var(--color-text-secondary))]">Match Score</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="premium-card p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-[rgb(var(--color-text-secondary))]">Followers</span>
                          <span className="text-sm font-medium text-white">{filteredCreators[0].followers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-[rgb(var(--color-text-secondary))]">Engagement</span>
                          <span className="text-sm font-medium text-[rgb(var(--color-accent))]">{filteredCreators[0].engagement}</span>
                        </div>
                      </div>
                      
                      <div className="premium-card p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-[rgb(var(--color-text-secondary))]">Platform</span>
                          <span className="text-sm font-medium text-white">{filteredCreators[0].topPlatform}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-[rgb(var(--color-text-secondary))]">Content</span>
                          <span className="text-sm font-medium text-white">{filteredCreators[0].posts} posts</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6 flex-1">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[rgb(var(--color-text-secondary))]">Audience Match</span>
                          <span className="gradient-text-accent">{filteredCreators[0].audienceMatch}%</span>
                        </div>
                        <div className="h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-secondary))] rounded-full"
                            style={{ width: `${filteredCreators[0].audienceMatch}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[rgb(var(--color-text-secondary))]">Content Quality</span>
                          <span className="gradient-text-accent">{filteredCreators[0].contentQuality}%</span>
                        </div>
                        <div className="h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-secondary))] rounded-full"
                            style={{ width: `${filteredCreators[0].contentQuality}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[rgb(var(--color-text-secondary))]">Brand Alignment</span>
                          <span className="gradient-text-accent">{filteredCreators[0].brandAlignment}%</span>
                        </div>
                        <div className="h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-secondary))] rounded-full"
                            style={{ width: `${filteredCreators[0].brandAlignment}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button className="btn-primary py-2.5 px-6">
                        View Creator Profile
                      </button>
                      
                      <div className="flex items-center">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] mr-2 hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[rgb(var(--color-text-secondary))]" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                        </button>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(var(--color-accent),0.1)] border border-[rgba(var(--color-accent),0.2)] hover:bg-[rgba(var(--color-accent),0.2)] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[rgb(var(--color-accent))]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Creator grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.slice(1).map((creator, index) => (
            <div
              key={creator.id}
              className={`transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
            >
              <div 
                className={`premium-card h-full relative transition-all duration-500 hover:-translate-y-2 border border-[rgba(var(--color-${creator.color}),0.2)] overflow-hidden rounded-xl`}
                style={{ 
                  transform: hoveredCreator === creator.id ? 
                    `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)` : 
                    'none'
                }}
                onMouseEnter={() => setHoveredCreator(creator.id)}
                onMouseLeave={() => setHoveredCreator(null)}
              >
                {/* Creator card header with gradient */}
                <div className={`h-32 relative overflow-hidden bg-gradient-to-br from-[rgba(var(--color-${creator.color}),0.3)] to-[rgba(0,0,0,0.2)]`}>
                  {/* Stats */}
                  <div className="absolute top-3 right-3 flex space-x-2 z-30">
                    <div className="premium-card px-2 py-1 rounded-md text-xs flex items-center bg-black/30 backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-[rgb(var(--color-primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-white">{creator.followers}</span>
                    </div>
                    
                    <div className="premium-card px-2 py-1 rounded-md text-xs flex items-center bg-black/30 backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-[rgb(var(--color-secondary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-white">{creator.engagement}</span>
                    </div>
                  </div>
                  
                  {/* Creator avatar */}
                  <div className="absolute -bottom-10 left-6">
                    <div className={`w-20 h-20 rounded-xl bg-[rgba(var(--color-${creator.color}),0.2)] border-2 border-[rgba(var(--color-${creator.color}),0.3)] flex items-center justify-center overflow-hidden`}>
                      <span className={`text-4xl font-thin text-[rgba(var(--color-${creator.color}),0.7)]`}>
                        {creator.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Category tag */}
                  <div className="absolute top-3 left-3 z-30">
                    <div className="px-2 py-1 rounded-md text-xs font-medium bg-black/30 backdrop-blur-sm border border-[rgba(255,255,255,0.1)]">
                      {categories.find(c => c.id === creator.category).name}
                    </div>
                  </div>
                </div>
                
                {/* Creator info */}
                <div className="p-6 pt-12">
                  <h3 className="font-semibold text-lg mb-1 flex items-center justify-between">
                    {creator.name}
                    <div className="flex items-center text-[rgb(var(--color-accent))]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm">{creator.rating}</span>
                    </div>
                  </h3>
                  <p className="text-sm text-[rgb(var(--color-text-secondary))] mb-4">{creator.handle}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[rgb(var(--color-text-secondary))]">Match Score</span>
                        <span className={`text-[rgb(var(--color-${creator.color}))]`}>{creator.match}%</span>
                      </div>
                      <div className="h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                        <div className={`h-full bg-[rgb(var(--color-${creator.color}))] rounded-full`}
                          style={{ width: `${creator.match}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[rgb(var(--color-text-secondary))]">{creator.topPlatform} • {creator.posts} posts</span>
                    
                    <div className="flex items-center">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] mr-2 hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[rgb(var(--color-text-secondary))]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                      </button>
                      <button className={`w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(var(--color-${creator.color}),0.1)] border border-[rgba(var(--color-${creator.color}),0.2)] hover:bg-[rgba(var(--color-${creator.color}),0.2)] transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-[rgb(var(--color-${creator.color}))]`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Match quality indicator */}
                  <div className="absolute -top-2 -right-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-bold flex items-center bg-[rgba(var(--color-${creator.color}),0.2)] border border-[rgba(var(--color-${creator.color}),0.3)]`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-${creator.color}))] mr-1.5`}></span>
                      <span className={`text-[rgb(var(--color-${creator.color}))]`}>{creator.match}% Match</span>
                    </div>
                  </div>
                  
                  {/* Hover detail overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-[rgba(var(--color-bg-primary),0.85)] to-[rgba(var(--color-bg-primary),0.95)] backdrop-blur-sm flex flex-col justify-center items-center p-6 transition-all duration-300 ${
                    hoveredCreator === creator.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 text-[rgb(var(--color-${creator.color}))]`}>{creator.name}</h3>
                    <div className="space-y-4 w-full">
                      <div className="premium-card p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[rgb(var(--color-text-secondary))]">Audience Match</span>
                          <span className={`text-[rgb(var(--color-${creator.color}))] font-semibold`}>{creator.audienceMatch}%</span>
                        </div>
                        <div className="h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                          <div className={`h-full bg-[rgb(var(--color-${creator.color}))] rounded-full`}
                            style={{ width: `${creator.audienceMatch}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="premium-card p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[rgb(var(--color-text-secondary))]">Content Quality</span>
                          <span className={`text-[rgb(var(--color-${creator.color}))] font-semibold`}>{creator.contentQuality}%</span>
                        </div>
                        <div className="h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                          <div className={`h-full bg-[rgb(var(--color-${creator.color}))] rounded-full`}
                            style={{ width: `${creator.contentQuality}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="premium-card p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[rgb(var(--color-text-secondary))]">Brand Alignment</span>
                          <span className={`text-[rgb(var(--color-${creator.color}))] font-semibold`}>{creator.brandAlignment}%</span>
                        </div>
                        <div className="h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                          <div className={`h-full bg-[rgb(var(--color-${creator.color}))] rounded-full`}
                            style={{ width: `${creator.brandAlignment}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <button className="mt-6 px-6 py-2 rounded-full btn-primary">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* AI recommendation and waitlist CTA */}
        <div 
          className={`mt-16 premium-card p-8 md:p-10 transition-all duration-1000 delay-700 transform-3d ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ 
            transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
          }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[rgba(var(--color-primary),0.1)] border-4 border-[rgba(var(--color-primary),0.2)] flex items-center justify-center mb-4 md:mb-0 md:mr-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[rgb(var(--color-primary))]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3 gradient-text">AI-Powered Creator Matching</h3>
              <p className="text-[rgb(var(--color-text-secondary))] mb-6">
                Join the waitlist to access our full network of over 100,000 vetted creators and experience our AI-powered matching algorithm.
              </p>
              
              <button 
                onClick={() => {
                  const waitlistSection = document.getElementById('waitlist');
                  if (waitlistSection) {
                    waitlistSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary py-3 px-8"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,0,111.91,10.83,163.56,22.88,231.86,38.84,275.37,50.63,321.39,56.44Z" 
            fill="rgb(var(--color-bg-primary))"
            fillOpacity="0.5"
          ></path>
        </svg>
      </div>
    </section>
  );
}