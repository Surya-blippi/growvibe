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
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  UserIcon,
  GlobeAltIcon,
  PaperAirplaneIcon,
  InboxIcon,
  CheckIcon,
  XMarkIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  HandThumbUpIcon
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
                {/* Company Header */}
                <div className="flex items-center justify-between mb-5 border-b border-[rgba(218,165,32,0.2)] pb-4">
                  <div className="flex items-center">
                    {/* Company Logo */}
                    <div className="w-12 h-12 bg-[rgba(218,165,32,0.2)] rounded-full flex items-center justify-center mr-3">
                      <StarIcon className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    {/* Company Name and URL */}
                    <div>
                      <div className="text-xl font-bold text-white">TechVision Pro</div>
                      <div className="text-xs text-[#D4AF37]">www.techvisionpro.com</div>
                    </div>
                  </div>
                  <div className="bg-[rgba(218,165,32,0.15)] px-3 py-1 rounded text-xs text-[#D4AF37]">
                    Enterprise Tech
                  </div>
                </div>
                
                {/* Brand Positioning/Narrative */}
                <div className="mb-5">
                  <div className="mb-2 text-xs text-gray-400">BRAND POSITIONING & NARRATIVE</div>
                  <div className="space-y-3">
                    {[
                      { title: "Innovation Leader", description: "Pushing technological boundaries with cutting-edge solutions" },
                      { title: "Customer-Centric", description: "Solving real problems for modern businesses with intuitive tools" },
                      { title: "Industry Disruptor", description: "Challenging traditional approaches with next-gen technology" }
                    ].map((point, i) => (
                      <div key={i} className="bg-[rgba(30,30,35,0.8)] rounded-lg p-2">
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-[rgba(218,165,32,0.2)] flex items-center justify-center mt-0.5 mr-2 shrink-0">
                            <CheckCircleIcon className="w-4 h-4 text-[#D4AF37]" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{point.title}</div>
                            <div className="text-xs text-gray-300">{point.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* ICP Demographics */}
                <div>
                  <div className="mb-2 text-xs text-gray-400">IDEAL CUSTOMER PROFILE (ICP)</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[rgba(30,30,35,0.8)] rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <UserIcon className="w-4 h-4 text-[#D4AF37] mr-2" />
                        <div className="text-sm text-white">Demographics</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="text-xs text-gray-300">Age Range</div>
                          <div className="text-xs text-white">28-45</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-xs text-gray-300">Gender</div>
                          <div className="text-xs text-white">65% Male / 35% Female</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-xs text-gray-300">Income</div>
                          <div className="text-xs text-white">$85K+ annually</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[rgba(30,30,35,0.8)] rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <GlobeAltIcon className="w-4 h-4 text-[#D4AF37] mr-2" />
                        <div className="text-sm text-white">Psychographics</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="text-xs text-gray-300">Job Roles</div>
                          <div className="text-xs text-white">IT Decision Makers</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-xs text-gray-300">Company Size</div>
                          <div className="text-xs text-white">50-500 employees</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-xs text-gray-300">Industry</div>
                          <div className="text-xs text-white">Tech, Finance, Healthcare</div>
                        </div>
                      </div>
                    </div>
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
          
          {/* Feature 3: Say bye to back and forth emails - COMPLETELY REDESIGNED */}
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
              {/* New Email Thread Visualization */}
              <div className="relative rounded-xl overflow-hidden border border-[rgba(218,165,32,0.3)] bg-[rgba(20,20,25,0.7)] p-4 shadow-lg shadow-[rgba(218,165,32,0.1)]"
                style={{ 
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)` 
                }}>
                
                {/* Negotiation Stats Header */}
                <div className="flex items-center justify-between mb-4 border-b border-[rgba(218,165,32,0.2)] pb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[rgba(218,165,32,0.2)] rounded-full flex items-center justify-center">
                      <EnvelopeIcon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div className="ml-3">
                      <div className="text-white font-medium">Negotiation AI</div>
                      <div className="text-xs text-gray-400">Campaign: Product Launch</div>
                    </div>
                  </div>
                  <div className="text-green-400 bg-[rgba(16,185,129,0.1)] px-2 py-1 rounded text-xs">
                    <CheckIcon className="inline-block w-3 h-3 mr-1" />
                    <span className="font-medium">Active</span>
                  </div>
                </div>
                
                {/* Negotiation Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Outreach', value: '247', icon: <PaperAirplaneIcon className="w-4 h-4" /> },
                    { label: 'Negotiations', value: '128', icon: <ChatBubbleLeftRightIcon className="w-4 h-4" /> },
                    { label: 'Deals Closed', value: '93', icon: <HandThumbUpIcon className="w-4 h-4" /> },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[rgba(30,30,35,0.8)] rounded-lg p-2 text-center">
                      <div className="w-6 h-6 rounded-full bg-[rgba(218,165,32,0.15)] flex items-center justify-center mx-auto mb-1">
                        <div className="text-[#D4AF37]">{stat.icon}</div>
                      </div>
                      <div className="text-white font-medium">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Email Thread - COMPLETELY NEW */}
                <div className="bg-[rgba(30,30,35,0.8)] rounded-lg mb-3 overflow-hidden">
                  {/* Email Thread Header */}
                  <div className="bg-[rgba(20,20,25,0.7)] p-3 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[rgba(59,130,246,0.2)] flex items-center justify-center mr-2">
                        <div className="text-xs font-medium text-[#3B82F6]">YT</div>
                      </div>
                      <div>
                        <div className="text-sm text-white">Alex Rivera</div>
                        <div className="text-xs text-gray-400">YouTube Creator • 235K Subscribers</div>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-[rgba(251,191,36,0.2)] text-[#FBBF24]">
                      Negotiating
                    </div>
                  </div>
                  
                  {/* Email Messages */}
                  <div className="max-h-64 overflow-y-auto p-2 space-y-3">
                    {/* Outreach Email */}
                    <div className="bg-[rgba(20,20,25,0.5)] p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <div className="text-xs text-[#D4AF37] flex items-center">
                          <StarIcon className="w-3 h-3 mr-1" />
                          AI Agent
                        </div>
                        <div className="text-xs text-gray-400">2 days ago</div>
                      </div>
                      <div className="text-sm text-white mb-1">Product Launch Collaboration Opportunity</div>
                      <div className="text-xs text-gray-300">
                        Hi Alex, I noticed your tech review videos get great engagement. Our client TechVision Pro is launching a new product and would love to collaborate...
                      </div>
                    </div>
                    
                    {/* Creator Response */}
                    <div className="bg-[rgba(59,130,246,0.1)] p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <div className="text-xs text-[#3B82F6] flex items-center">
                          <UserIcon className="w-3 h-3 mr-1" />
                          Alex Rivera
                        </div>
                        <div className="text-xs text-gray-400">2 days ago</div>
                      </div>
                      <div className="text-sm text-white mb-1">Re: Product Launch Collaboration</div>
                      <div className="text-xs text-gray-300">
                        Thanks for reaching out! I'm interested but my usual rate for product feature videos is $3,500. Does this work with your budget?
                      </div>
                    </div>
                    
                    {/* AI Negotiation */}
                    <div className="bg-[rgba(20,20,25,0.5)] p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <div className="text-xs text-[#D4AF37] flex items-center">
                          <StarIcon className="w-3 h-3 mr-1" />
                          AI Agent
                        </div>
                        <div className="text-xs text-gray-400">1 day ago</div>
                      </div>
                      <div className="text-sm text-white mb-1">Re: Product Launch Collaboration</div>
                      <div className="text-xs text-gray-300">
                        Hi Alex, our budget is $2,800 for this campaign. However, we can offer exclusive early access to upcoming products and feature your review on our website...
                      </div>
                    </div>
                    
                    {/* Creator Counter */}
                    <div className="bg-[rgba(59,130,246,0.1)] p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <div className="text-xs text-[#3B82F6] flex items-center">
                          <UserIcon className="w-3 h-3 mr-1" />
                          Alex Rivera
                        </div>
                        <div className="text-xs text-gray-400">1 day ago</div>
                      </div>
                      <div className="text-sm text-white mb-1">Re: Product Launch Collaboration</div>
                      <div className="text-xs text-gray-300">
                        That sounds interesting. I can do $3,100 with the additional perks you mentioned. I'd also need the product at least 7 days before the launch date.
                      </div>
                    </div>
                    
                    {/* AI Final Offer */}
                    <div className="bg-[rgba(20,20,25,0.5)] p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <div className="text-xs text-[#D4AF37] flex items-center">
                          <StarIcon className="w-3 h-3 mr-1" />
                          AI Agent
                        </div>
                        <div className="text-xs text-gray-400">12 hours ago</div>
                      </div>
                      <div className="text-sm text-white mb-1">Re: Final Offer</div>
                      <div className="text-xs text-gray-300">
                        Deal! We can do $3,100 plus the early access perks. We'll ship the product 10 days before launch for your review. If you agree, I'll send over the contract today.
                      </div>
                    </div>
                  </div>
                  
                  {/* Deal Summary */}
                  <div className="p-3 border-t border-gray-800 bg-[rgba(20,20,25,0.5)]">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-400 mb-1">Initial Ask</div>
                        <div className="text-sm font-medium text-white">$3,500</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-400 mb-1">Final Price</div>
                        <div className="text-sm font-medium text-green-400">$3,100</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-400 mb-1">Savings</div>
                        <div className="text-sm font-medium text-[#D4AF37]">$400</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Negotiation Results */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[rgba(30,30,35,0.8)] rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <CurrencyDollarIcon className="w-4 h-4 text-[#D4AF37] mr-2" />
                      <div className="text-sm text-white">Campaign Savings</div>
                    </div>
                    <div className="text-lg text-white font-medium mb-1">$42,750</div>
                    <div className="text-xs text-green-400 flex items-center">
                      <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                      23% below initial asks
                    </div>
                  </div>
                  
                  <div className="bg-[rgba(30,30,35,0.8)] rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <DocumentTextIcon className="w-4 h-4 text-[#D4AF37] mr-2" />
                      <div className="text-sm text-white">Contract Status</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="flex flex-col items-center">
                        <div className="text-sm font-medium text-white">93</div>
                        <div className="text-xs text-gray-400">Signed</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-sm font-medium text-[#FBBF24]">24</div>
                        <div className="text-xs text-gray-400">Pending</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-sm font-medium text-red-400">11</div>
                        <div className="text-xs text-gray-400">Declined</div>
                      </div>
                    </div>
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