"use client";
import { useState, useEffect, useRef } from 'react';
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon, 
  CheckCircleIcon, 
  StarIcon,
  BoltIcon,
  ClockIcon,
  RocketLaunchIcon,
  MegaphoneIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/solid';

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

  // Platform colors for more realistic representation
  const platformColors = {
    instagram: '#E1306C',
    tiktok: '#000000',
    youtube: '#FF0000',
    twitter: '#1DA1F2',
    facebook: '#1877F2',
    linkedin: '#0A66C2',
    pinterest: '#E60023',
    snapchat: '#FFFC00'
  };

  // Content categories for creator cards
  const contentCategories = [
    { name: 'Fashion', color: '#FF3366' },
    { name: 'Beauty', color: '#FCA5A5' },
    { name: 'Fitness', color: '#10B981' },
    { name: 'Food', color: '#FBBF24' },
    { name: 'Tech', color: '#3B82F6' },
    { name: 'Travel', color: '#8B5CF6' },
    { name: 'Gaming', color: '#6366F1' },
    { name: 'Lifestyle', color: '#EC4899' }
  ];

  return (
    <section 
      id="features" 
      ref={sectionRef} 
      className="relative py-20 overflow-hidden bg-black min-h-screen"
    >
      {/* Enhanced background gradients */}
      <div 
        className="absolute w-[45vw] h-[45vw] rounded-full blur-3xl transform"
        style={{ 
          top: '10%',
          right: '10%',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          background: 'radial-gradient(circle, rgba(252,191,73,0.15) 0%, rgba(218,165,32,0.08) 50%, rgba(0,0,0,0) 100%)'
        }}
      ></div>
      <div 
        className="absolute w-[40vw] h-[40vw] rounded-full blur-3xl transform"
        style={{ 
          bottom: '5%',
          left: '10%',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          background: 'radial-gradient(circle, rgba(86,204,242,0.15) 0%, rgba(0,0,0,0) 70%)'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Features content */}
        <div className="space-y-32">
          {/* Feature 1: AI That Knows Your Brand */}
          <div className={`flex flex-col lg:flex-row gap-10 items-center transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="lg:w-1/2 lg:pr-6">
              <div className="flex items-center mb-4">
                <BoltIcon className="w-8 h-8 text-[#D4AF37] mr-2" />
                <div className="bg-[rgba(218,165,32,0.15)] px-3 py-1 rounded-full text-xs text-[#D4AF37]">
                  Brand Intelligence
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#D4AF37]">AI That Knows</span><br />
                Your Brand
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Understands your positioning, narrative, and audience like a true teammate.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['Voice Analysis', 'Style Matching', 'Audience Insights'].map((item, i) => (
                  <div key={i} className="flex items-center text-sm text-white bg-[rgba(218,165,32,0.1)] px-3 py-1 rounded-full">
                    <CheckCircleIcon className="w-4 h-4 text-[#D4AF37] mr-1" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              {/* Brand profile showcase */}
              <div className="relative rounded-xl overflow-hidden border border-[rgba(218,165,32,0.3)] bg-[rgba(20,20,25,0.7)] p-4 shadow-lg shadow-[rgba(218,165,32,0.1)]"
                style={{ 
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
                }}>
                <div className="flex items-center justify-between mb-4 border-b border-[rgba(218,165,32,0.2)] pb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[rgba(218,165,32,0.2)] rounded-full flex items-center justify-center">
                      <StarIcon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div className="ml-3">
                      <div className="text-white font-medium">Brand Profile</div>
                      <div className="text-xs text-gray-400">AI-Generated Strategy</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[rgba(218,165,32,0.2)] flex items-center justify-center">
                      <UserGroupIcon className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[rgba(218,165,32,0.2)] flex items-center justify-center">
                      <MegaphoneIcon className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="mb-2 text-xs text-gray-400">BRAND VOICE ANALYSIS</div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Professional', value: 85 },
                      { label: 'Friendly', value: 70 },
                      { label: 'Innovative', value: 90 },
                      { label: 'Trustworthy', value: 80 }
                    ].map((trait, i) => (
                      <div key={i} className="bg-[rgba(30,30,35,0.8)] rounded-lg p-2">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm text-white">{trait.label}</div>
                          <div className="text-xs text-[#D4AF37]">{trait.value}%</div>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4AF37]" style={{ width: `${trait.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="mb-2 text-xs text-gray-400">IDEAL CREATOR MATCH</div>
                  <div className="grid grid-cols-4 gap-2">
                    {contentCategories.slice(0, 4).map((category, i) => (
                      <div key={i} className="text-center">
                        <div className="w-full aspect-square rounded-lg mb-1 flex items-center justify-center" 
                            style={{ backgroundColor: `${category.color}20` }}>
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }}></div>
                        </div>
                        <div className="text-xs text-gray-300 truncate">{category.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[rgba(30,30,35,0.8)] rounded-lg p-3">
                  <div className="text-sm text-white mb-2">Key Messaging Suggestions</div>
                  <div className="space-y-2">
                    {['Emphasize innovation', 'Focus on user benefits', 'Highlight exclusivity'].map((msg, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircleIcon className="w-4 h-4 text-[#D4AF37] mt-0.5 mr-2 shrink-0" />
                        <div className="text-xs text-gray-300">{msg}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 2: AI outreaches to thousands */}
          <div className={`flex flex-col lg:flex-row gap-10 items-center transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="lg:w-1/2 lg:pr-6">
              <div className="flex items-center mb-4">
                <RocketLaunchIcon className="w-8 h-8 text-[#D4AF37] mr-2" />
                <div className="bg-[rgba(218,165,32,0.15)] px-3 py-1 rounded-full text-xs text-[#D4AF37]">
                  Creator Outreach
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#D4AF37]">AI outreaches</span> to thousands<br />
                of relevant creators on your behalf
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                No more manual research, list building, and outreach. Our AI agent handles this for you.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['Personalized Messages', 'Smart Targeting', 'Automatic Follow-ups'].map((item, i) => (
                  <div key={i} className="flex items-center text-sm text-white bg-[rgba(218,165,32,0.1)] px-3 py-1 rounded-full">
                    <CheckCircleIcon className="w-4 h-4 text-[#D4AF37] mr-1" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              {/* Influencer outreach dashboard */}
              <div className="relative rounded-xl overflow-hidden border border-[rgba(218,165,32,0.3)] bg-[rgba(20,20,25,0.7)] p-4 shadow-lg shadow-[rgba(218,165,32,0.1)]"
                style={{ 
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
                }}>
                <div className="flex items-center justify-between mb-4 border-b border-[rgba(218,165,32,0.2)] pb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[rgba(218,165,32,0.2)] rounded-full flex items-center justify-center">
                      <UserGroupIcon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div className="ml-3">
                      <div className="text-white font-medium">Creator Outreach</div>
                      <div className="text-xs text-gray-400">Campaign: Summer Launch</div>
                    </div>
                  </div>
                  <div className="text-[#D4AF37] bg-[rgba(218,165,32,0.1)] px-2 py-1 rounded text-xs">
                    <span className="font-medium">145</span> Creators Contacted
                  </div>
                </div>
                
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Response Rate', value: '78%', icon: <ChatBubbleLeftRightIcon className="w-4 h-4" /> },
                    { label: 'Interest Rate', value: '42%', icon: <StarIcon className="w-4 h-4" /> },
                    { label: 'Avg. Response Time', value: '5.2h', icon: <ClockIcon className="w-4 h-4" /> }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[rgba(30,30,35,0.8)] rounded-lg p-2 text-center">
                      <div className="w-6 h-6 rounded-full bg-[rgba(218,165,32,0.15)] flex items-center justify-center mx-auto mb-1">
                        <div className="text-[#D4AF37]">{stat.icon}</div>
                      </div>
                      <div className="text-[#D4AF37] font-medium">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-3">
                  {[
                    { name: 'Sarah Johnson', platform: 'instagram', followers: '56.8K', category: 'Fashion', status: 'Negotiating' },
                    { name: 'Mike Chen', platform: 'youtube', followers: '124K', category: 'Tech', status: 'Interested' },
                    { name: 'Emma Smith', platform: 'tiktok', followers: '230K', category: 'Lifestyle', status: 'Accepted' },
                  ].map((creator, index) => {
                    const platformColor = platformColors[creator.platform];
                    const statusColor = creator.status === 'Accepted' ? '#10B981' : 
                                          creator.status === 'Negotiating' ? '#FBBF24' : '#3B82F6';
                    
                    return (
                      <div key={index} className="flex items-center p-3 rounded-lg bg-[rgba(30,30,35,0.8)] border-l-4"
                        style={{ borderLeftColor: platformColor }}
                      >
                        <div className="rounded-full w-10 h-10 mr-3 flex items-center justify-center" 
                             style={{ backgroundColor: `${platformColor}20` }}>
                          <div className="text-xs font-medium" style={{ color: platformColor }}>
                            {creator.platform.charAt(0).toUpperCase() + creator.platform.slice(1, 2)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-white">{creator.name}</div>
                            <div className="text-xs font-medium" style={{ color: platformColor }}>{creator.followers}</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-400">{creator.category}</div>
                            <div className="text-xs px-2 py-0.5 rounded-full" 
                                 style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>
                              {creator.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="text-center p-2 bg-[rgba(218,165,32,0.1)] rounded-lg">
                  <div className="text-[#D4AF37] font-medium text-sm">AI is actively finding 50+ more relevant creators</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 3: Say bye to back and forth emails */}
          <div className={`flex flex-col lg:flex-row gap-10 items-center transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="lg:w-1/2 lg:pr-6">
              <div className="flex items-center mb-4">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-[#D4AF37] mr-2" />
                <div className="bg-[rgba(218,165,32,0.15)] px-3 py-1 rounded-full text-xs text-[#D4AF37]">
                  Automated Negotiation
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#D4AF37]">Say bye</span> to back<br />
                and forth emails
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Our AI agent negotiates with influencers on your behalf and collaborates with them from start to finish.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['Fair Pricing', 'Clear Deliverables', 'Fast Agreements'].map((item, i) => (
                  <div key={i} className="flex items-center text-sm text-white bg-[rgba(218,165,32,0.1)] px-3 py-1 rounded-full">
                    <CheckCircleIcon className="w-4 h-4 text-[#D4AF37] mr-1" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              {/* Negotiation and collaboration tracker */}
              <div className="relative rounded-xl overflow-hidden border border-[rgba(218,165,32,0.3)] bg-[rgba(20,20,25,0.7)] p-4 shadow-lg shadow-[rgba(218,165,32,0.1)]"
                style={{ 
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
                }}>
                <div className="flex items-center justify-between mb-4 border-b border-[rgba(218,165,32,0.2)] pb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[rgba(218,165,32,0.2)] rounded-full flex items-center justify-center">
                      <ArrowTrendingUpIcon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div className="ml-3">
                      <div className="text-white font-medium">Campaign Performance</div>
                      <div className="text-xs text-gray-400">Real-time Metrics</div>
                    </div>
                  </div>
                  <div className="text-[#D4AF37] flex items-center">
                    <BoltIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Live Data</span>
                  </div>
                </div>
                
                <div className="bg-[rgba(30,30,35,0.8)] rounded-lg p-3 mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm text-white">Negotiation Success Rate</div>
                    <div className="text-sm text-green-400 flex items-center">
                      <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                      8.5%
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div className="h-full w-[85%] bg-gradient-to-r from-[#D4AF37] to-green-400"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <div>0%</div>
                    <div className="font-medium text-[#D4AF37]">85%</div>
                    <div>100%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'Avg. Negotiation Time', value: '2.5 days', change: '-40%', positive: true },
                    { label: 'Cost Savings', value: '$12,450', change: '+22%', positive: true },
                  ].map((metric, i) => (
                    <div key={i} className="bg-[rgba(30,30,35,0.8)] rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                      <div className="text-lg text-white font-medium mb-1">{metric.value}</div>
                      <div className={`text-xs flex items-center ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.positive ? 
                          <ArrowTrendingUpIcon className="w-3 h-3 mr-1" /> : 
                          <ArrowTrendingUpIcon className="w-3 h-3 mr-1 transform rotate-180" />
                        }
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-[rgba(30,30,35,0.8)] rounded-lg p-3">
                  <div className="text-sm text-white mb-3">Campaign Completion Status</div>
                  <div className="space-y-3">
                    {[
                      { stage: 'Creator Outreach', progress: 100, color: '#10B981' },
                      { stage: 'Negotiation & Terms', progress: 85, color: '#FBBF24' },
                      { stage: 'Content Creation', progress: 60, color: '#3B82F6' },
                      { stage: 'Review & Approval', progress: 40, color: '#8B5CF6' },
                      { stage: 'Campaign Launch', progress: 25, color: '#EC4899' },
                    ].map((stage, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <div className="text-xs text-gray-300">{stage.stage}</div>
                          <div className="text-xs font-medium" style={{ color: stage.color }}>{stage.progress}%</div>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ 
                            width: `${stage.progress}%`,
                            backgroundColor: stage.color
                          }}></div>
                        </div>
                      </div>
                    ))}
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