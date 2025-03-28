"use client";
import { useState, useEffect } from 'react';

export default function AICRMDashboard() {
  const [activeSection, setActiveSection] = useState('influencers');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  
  // Mock data for influencers
  const influencers = [
    {
      id: 1,
      name: "AI Ethics Expert",
      handle: "@aiethicist",
      avatar: "/api/placeholder/48/48",
      followers: "125K",
      engagement: "4.2%",
      topics: ["AI Ethics", "Machine Learning", "Technology Policy"],
      recentPost: "The importance of responsible AI systems in modern governance structures...",
      status: "Contacted",
      fit: 92,
      roi: 3.8
    },
    {
      id: 2,
      name: "Deep Learning Daily",
      handle: "@deeplearningdaily",
      avatar: "/api/placeholder/48/48",
      followers: "245K",
      engagement: "3.8%",
      topics: ["Neural Networks", "Computer Vision", "Research"],
      recentPost: "Breaking down the latest architecture in transformer models for image recognition...",
      status: "Negotiating",
      fit: 88,
      roi: 4.2
    },
    {
      id: 3,
      name: "AI Product Hunt",
      handle: "@aiproducthunt",
      avatar: "/api/placeholder/48/48",
      followers: "82K",
      engagement: "5.1%",
      topics: ["AI Products", "Tools", "SaaS"],
      recentPost: "Featured today: 5 new AI tools that will revolutionize your content workflow...",
      status: "New Lead",
      fit: 95,
      roi: 4.5
    },
    {
      id: 4,
      name: "Future of Computing",
      handle: "@computingfuture",
      avatar: "/api/placeholder/48/48",
      followers: "175K",
      engagement: "3.5%",
      topics: ["Quantum Computing", "AI", "Tech Trends"],
      recentPost: "The intersection of quantum computing and neural networks is creating new possibilities...",
      status: "Contracted",
      fit: 87,
      roi: 3.7
    },
    {
      id: 5,
      name: "AI Developer Zone",
      handle: "@aidevzone",
      avatar: "/api/placeholder/48/48",
      followers: "110K",
      engagement: "4.7%",
      topics: ["Development", "Programming", "APIs"],
      recentPost: "Tutorial: Building your first LLM-powered application with the new framework...",
      status: "Contacted",
      fit: 91,
      roi: 4.0
    }
  ];
  
  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      name: "AI Model Launch",
      status: "Active",
      progress: 72,
      influencers: 8,
      responses: 6,
      startDate: "2025-03-10",
      endDate: "2025-04-15",
      metrics: {
        impressions: "1.2M",
        engagement: "4.2%",
        clicks: "35.4K",
        conversions: "1.2K"
      }
    },
    {
      id: 2,
      name: "Developer Conference",
      status: "Planning",
      progress: 45,
      influencers: 12,
      responses: 5,
      startDate: "2025-05-01",
      endDate: "2025-05-30",
      metrics: {
        impressions: "850K",
        engagement: "3.8%",
        clicks: "22.1K",
        conversions: "945"
      }
    },
    {
      id: 3,
      name: "AI Ethics Roundtable",
      status: "Completed",
      progress: 100,
      influencers: 5,
      responses: 5,
      startDate: "2025-02-15",
      endDate: "2025-03-05",
      metrics: {
        impressions: "620K",
        engagement: "5.3%",
        clicks: "28.7K",
        conversions: "1.5K"
      }
    }
  ];
  
  // Mock data for deals
  const deals = [
    {
      id: 1,
      influencer: "AI Ethics Expert",
      type: "Sponsored Content",
      value: "$5,000",
      status: "In Negotiation",
      progress: 65,
      startDate: "2025-04-01",
      terms: ["2 sponsored posts", "1 video review", "30-day exclusivity"],
      counterOffer: "$6,200",
      aiRecommendation: "$5,500"
    },
    {
      id: 2,
      influencer: "Deep Learning Daily",
      type: "Brand Partnership",
      value: "$12,000",
      status: "Contract Sent",
      progress: 85,
      startDate: "2025-04-15",
      terms: ["6-month partnership", "Monthly featured content", "Social media mentions"],
      counterOffer: "None",
      aiRecommendation: "Accept"
    },
    {
      id: 3,
      influencer: "AI Developer Zone",
      type: "Product Review",
      value: "$3,500",
      status: "Finalizing",
      progress: 92,
      startDate: "2025-03-30",
      terms: ["Detailed product review", "Technical deep dive", "Code examples"],
      counterOffer: "$4,000 + affiliate",
      aiRecommendation: "Accept with 10% affiliate"
    }
  ];
  
  // Filter function for search
  const filteredInfluencers = influencers.filter(influencer => 
    influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    influencer.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    influencer.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-[rgba(15,15,20,0.95)] z-30 md:relative md:bg-[rgba(15,15,20,0.8)] w-64 border-r border-[rgba(218,165,32,0.1)] transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-[rgba(218,165,32,0.1)]">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center text-xl mr-3">
              <span className="text-[#D4AF37]">AI</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Sphere</h2>
              <p className="text-xs text-gray-400">Influencer CRM Platform</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">MANAGEMENT</p>
            <ul>
              <li className={`mb-1 rounded-lg ${activeSection === 'influencers' ? 'bg-[rgba(218,165,32,0.1)]' : ''}`}>
                <button 
                  onClick={() => setActiveSection('influencers')}
                  className={`flex items-center w-full p-2.5 rounded-lg hover:bg-[rgba(218,165,32,0.05)] transition-colors ${activeSection === 'influencers' ? 'text-[#D4AF37]' : 'text-gray-300'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C23 16.7909 21.2091 15 19 15H18M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM19 7C19 8.10457 18.1046 9 17 9C15.8954 9 15 8.10457 15 7C15 5.89543 15.8954 5 17 5C18.1046 5 19 5.89543 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Influencers
                </button>
              </li>
              <li className={`mb-1 rounded-lg ${activeSection === 'outreach' ? 'bg-[rgba(218,165,32,0.1)]' : ''}`}>
                <button 
                  onClick={() => setActiveSection('outreach')}
                  className={`flex items-center w-full p-2.5 rounded-lg hover:bg-[rgba(218,165,32,0.05)] transition-colors ${activeSection === 'outreach' ? 'text-[#D4AF37]' : 'text-gray-300'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M22 12H16L14 15H10L8 12H2M22 12V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V12M22 12L20.1194 4.72833C20.0445 4.4565 19.9063 4.20786 19.7175 4.00812C19.5288 3.80839 19.2968 3.66514 19.0432 3.59384L17.2279 3.0758C16.9542 3.00012 16.6654 3 16.3815 3.07724L10.5723 4.50463C10.2066 4.60051 9.87506 4.60051 9.50939 4.50463L3.93398 3.14348C3.6557 3.06328 3.36071 3.05222 3.07729 3.11045C2.79387 3.16869 2.53334 3.29419 2.32152 3.47221C2.10971 3.65022 1.95641 3.87394 1.87583 4.12232C1.79525 4.37071 1.79051 4.63407 1.86217 4.88548L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Outreach
                </button>
              </li>
              <li className={`mb-1 rounded-lg ${activeSection === 'negotiation' ? 'bg-[rgba(218,165,32,0.1)]' : ''}`}>
                <button 
                  onClick={() => setActiveSection('negotiation')}
                  className={`flex items-center w-full p-2.5 rounded-lg hover:bg-[rgba(218,165,32,0.05)] transition-colors ${activeSection === 'negotiation' ? 'text-[#D4AF37]' : 'text-gray-300'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M16 5H14C13.4477 5 13 5.44772 13 6V11C13 11.5523 13.4477 12 14 12H16C16.5523 12 17 11.5523 17 11V6C17 5.44772 16.5523 5 16 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 7H8C7.44772 7 7 7.44772 7 8V11C7 11.5523 7.44772 12 8 12H10C10.5523 12 11 11.5523 11 11V8C11 7.44772 10.5523 7 10 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 21H3V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 17L15.5 15L21 19L18.5 21L13 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Negotiation
                </button>
              </li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">ANALYTICS</p>
            <ul>
              <li className="mb-1">
                <button className="flex items-center w-full p-2.5 rounded-lg hover:bg-[rgba(218,165,32,0.05)] transition-colors text-gray-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M9 9H9.01M15 15H15.01M9 15L15 9M9.5 4.5H14.5M4.5 9.5V14.5M9.5 19.5H14.5M19.5 9.5V14.5M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Performance
                </button>
              </li>
              <li className="mb-1">
                <button className="flex items-center w-full p-2.5 rounded-lg hover:bg-[rgba(218,165,32,0.05)] transition-colors text-gray-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M8 9L11 12L8 15M13 15H16M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Reports
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-2">SETTINGS</p>
            <ul>
              <li className="mb-1">
                <button className="flex items-center w-full p-2.5 rounded-lg hover:bg-[rgba(218,165,32,0.05)] transition-colors text-gray-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.4 15C19.1277 15.6224 19.2583 16.3353 19.73 16.83L19.79 16.89C20.1233 17.2232 20.3189 17.6756 20.3394 18.1559C20.3598 18.6363 20.2035 19.1043 19.8934 19.4644C19.5834 19.8245 19.1419 20.0527 18.6655 20.1035C18.1891 20.1544 17.708 20.0241 17.32 19.74L17.26 19.7C16.7654 19.2289 16.0519 19.0977 15.4296 19.3695C14.8073 19.6414 14.4008 20.2493 14.4 20.92V21C14.4 21.4774 14.2104 21.9353 13.8728 22.2728C13.5352 22.6104 13.0774 22.8 12.6 22.8C12.1226 22.8 11.6648 22.6104 11.3272 22.2728C10.9896 21.9353 10.8 21.4774 10.8 21V20.94C10.7874 20.2554 10.3603 19.642 9.71896 19.371C9.07761 19.1 8.35322 19.2471 7.86 19.74C7.47997 20.0547 6.97654 20.2087 6.47518 20.1581C5.97382 20.1075 5.51217 19.8641 5.20686 19.4761C4.90156 19.0881 4.77378 18.5931 4.85336 18.1107C4.93294 17.6284 5.21278 17.1951 5.62 16.9L5.68 16.84C6.15169 16.3453 6.28286 15.6318 6.01104 15.0095C5.73922 14.3872 5.13166 13.9807 4.46 13.98H4.4C3.92261 13.98 3.46477 13.7904 3.12721 13.4528C2.78964 13.1152 2.6 12.6574 2.6 12.18C2.6 11.7026 2.78964 11.2448 3.12721 10.9072C3.46477 10.5696 3.92261 10.38 4.4 10.38H4.46C5.14481 10.3792 5.75245 9.97269 6.02428 9.35039C6.2961 8.7281 6.16493 8.01454 5.69323 7.51999C5.49895 7.33688 5.3469 7.11109 5.24709 6.86107C5.14729 6.61106 5.10185 6.34255 5.11396 6.073C5.12608 5.80344 5.19548 5.54064 5.3183 5.30255C5.44112 5.06447 5.61465 4.85649 5.82627 4.69227C6.03789 4.52805 6.28239 4.41171 6.54271 4.3514C6.80303 4.29108 7.07404 4.28796 7.33568 4.34222C7.59732 4.39647 7.84453 4.50697 8.06 4.66L8.12 4.72C8.61454 5.19169 9.3281 5.32287 9.95039 5.05104C10.5727 4.77922 10.9792 4.17158 10.98 3.48677V3.42C10.98 2.94261 11.1696 2.48477 11.5072 2.14721C11.8448 1.80964 12.3026 1.62 12.78 1.62C13.2574 1.62 13.7152 1.80964 14.0528 2.14721C14.3904 2.48477 14.58 2.94261 14.58 3.42V3.48C14.5808 4.16481 14.9873 4.77246 15.6096 5.04428C16.2319 5.3161 16.9454 5.18493 17.44 4.71323C17.6555 4.50681 17.9211 4.35813 18.2096 4.27732C18.4982 4.19651 18.8015 4.18557 19.0958 4.24531C19.3901 4.30505 19.6675 4.43378 19.9078 4.62234C20.148 4.8109 20.3452 5.05463 20.4841 5.33299C20.623 5.61136 20.7003 5.91751 20.7108 6.22996C20.7212 6.54242 20.6645 6.85334 20.5446 7.14153C20.4247 7.42971 20.2446 7.68965 20.02 7.9L19.96 7.96C19.4883 8.45469 19.3571 9.16824 19.63 9.79C19.9028 10.4118 20.51 10.8184 21.19 10.82H21.25C21.7274 10.82 22.1852 11.0096 22.5228 11.3472C22.8604 11.6848 23.05 12.1426 23.05 12.62C23.05 13.0974 22.8604 13.5552 22.5228 13.8928C22.1852 14.2304 21.7274 14.42 21.25 14.42H21.19C20.5052 14.4208 19.8976 14.8273 19.6257 15.4496C19.3539 16.0719 19.485 16.7854 19.95 17.28C20.0505 17.3746 20.1256 17.4923 20.17 17.62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Settings
                </button>
              </li>
              <li className="mb-1">
                <button className="flex items-center w-full p-2.5 rounded-lg hover:bg-[rgba(218,165,32,0.05)] transition-colors text-gray-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M16 21V16.8C16 15.1198 16 14.2798 15.673 13.638C15.3854 13.0735 14.9265 12.6146 14.362 12.327C13.7202 12 12.8802 12 11.2 12H7.8C6.11984 12 5.27976 12 4.63803 12.327C4.07354 12.6146 3.6146 13.0735 3.32698 13.638C3 14.2798 3 15.1198 3 16.8V21M18.5 6.5V14M22 10L18.5 14L15 10M12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Support
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-[rgba(15,15,20,0.95)] border-b border-[rgba(218,165,32,0.1)] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="mr-4 p-2 rounded-lg bg-[rgba(20,20,25,0.6)] md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search influencers, campaigns..."
                  className="bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] rounded-lg py-2 px-4 pl-10 w-64 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-2.5 text-gray-400">
                  <path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="flex items-center">
              <button className="p-2 rounded-lg bg-[rgba(20,20,25,0.6)] mr-3 relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5.5C12 4.57174 12.4214 3.6815 13.1716 3.02513C13.9217 2.36875 14.9391 2 16 2C17.0609 2 18.0783 2.36875 18.8284 3.02513C19.5786 3.6815 20 4.57174 20 5.5C20 10 16 11 16 11M15.9991 21.4C15.9997 21.4 16 21.4 16 21.4V21.4C16.0061 22.0118 15.5824 22.5364 15 22.6M15.9991 21.4C15.9997 21.4 15.9994 21.4 15.9991 21.4M15.9991 21.4C15.946 20.7649 15.5778 19.9983 15.0001 19.6983C14.9994 19.6979 14.9987 19.6975 14.998 19.6971M15 22.6C14.4179 22.6636 13.8763 22.2682 13.8 21.7L13.8 21.7C13.7985 21.6921 13.797 21.6842 13.7957 21.6763M15 22.6C15 22.6 15 22.6 15 22.6V22.6ZM13.7957 21.6763C13.6973 21.0321 13.3167 20.2099 12.7003 19.8983C12.6996 19.8979 12.6989 19.8975 12.6982 19.8971M13.7957 21.6763C13.7957 21.6763 13.7957 21.6763 13.7957 21.6763ZM14.998 19.6971C14.4003 19.4111 13.5999 19.4111 13.0022 19.6971C13.0018 19.6973 13.0013 19.6975 13.0009 19.6977M14.998 19.6971C14.998 19.6971 14.998 19.6971 14.998 19.6971ZM13.0009 19.6977C12.9005 19.7439 12.7999 19.8176 12.6982 19.8971M13.0009 19.6977C13.0009 19.6977 13.0009 19.6977 13.0009 19.6977ZM12.6982 19.8971C12.6982 19.8971 12.6982 19.8971 12.6982 19.8971ZM12 14.5V14.6983C12 15.2806 11.7625 15.7486 11.5 16.1983C10.7489 17.4967 10 19.6 10 19.6C10 19.6 9.3 17.1 8 16.5C7.8032 16.3964 7.58613 16.3348 7.36487 16.32C7.14361 16.3052 6.9199 16.3375 6.70826 16.4151C6.49662 16.4927 6.30137 16.6143 6.13442 16.7726C5.96747 16.9308 5.8322 17.1227 5.73609 17.3373C5.63997 17.5519 5.58493 17.7847 5.57397 18.0222C5.56302 18.2596 5.59631 18.4971 5.67173 18.7205C5.74716 18.944 5.86324 19.1491 6.01344 19.3248C6.16363 19.5004 6.34503 19.6431 6.54722 19.7448C6.74941 19.8466 6.96894 19.9054 7.19222 19.9178C7.4155 19.9303 7.63889 19.8961 7.85 19.8171C9.65 19.2171 11 21.5 11 21.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.8 5.4C4.80002 5.95488 4.97892 6.49471 5.31049 6.94201C5.64206 7.38932 6.10641 7.71774 6.63687 7.87784C7.16732 8.03793 7.73455 8.01998 8.25359 7.8267C8.77262 7.63342 9.21366 7.2757 9.5122 6.8124C9.81074 6.3491 9.95024 5.80025 9.91132 5.24937C9.87241 4.69849 9.65724 4.17389 9.29978 3.7549C8.94232 3.3359 8.45997 3.04255 7.92244 2.91629C7.38491 2.79002 6.82243 2.83692 6.31376 3.05051" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>
              
              <button className="p-2 rounded-lg bg-[rgba(20,20,25,0.6)] mr-3 relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.857 17.082C16.7202 16.8614 18.4743 16.1214 19.9528 14.9322C21.4313 13.743 22.5748 12.1547 23.2683 10.3483C21.4218 9.45315 19.89 7.98129 18.8832 6.12548C17.8763 4.26968 17.4465 2.13604 17.651 0.0190468C15.7245 0.349957 13.9349 1.18739 12.5168 2.47784C11.0986 3.7683 10.1118 5.45885 9.68971 7.3262C9.26762 9.19356 9.43224 11.142 10.1635 12.9145C10.8947 14.687 12.1609 16.1948 13.784 17.251C13.784 17.251 13.8066 17.1429 14.857 17.082Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.91132 15.2498C4.6179 16.7056 4.82328 18.2178 5.49276 19.5539C6.16224 20.8899 7.25471 21.9605 8.60353 22.6033C9.95236 23.2461 11.4747 23.4224 12.9341 23.1011C14.3934 22.7799 15.7021 21.981 16.6613 20.8309C15.4774 18.9273 15.0932 16.6416 15.5898 14.4625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.4 8.4C11.4059 8.93622 10.5527 9.69937 9.9191 10.6242C9.28549 11.5491 8.89016 12.6118 8.76797 13.7217C7.65779 13.636 6.58555 13.2791 5.64902 12.6861C4.71249 12.0931 3.94072 11.2812 3.4 10.3219C2.40048 11.2385 1.66363 12.3987 1.2635 13.6885C0.863358 14.9783 0.81526 16.3522 1.12226 17.6661C1.42926 18.9799 2.07867 20.1794 2.99942 21.1339C3.92018 22.0884 5.07626 22.7616 6.34778 23.0797C6.64865 21.7889 7.29073 20.599 8.20867 19.6307C9.12661 18.6623 10.2879 17.9487 11.5682 17.5639" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              </button>
              
              <div className="w-10 h-10 rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center overflow-hidden">
                <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Content area */}
        <main className="p-6 overflow-auto bg-black min-h-[calc(100vh-64px)]">
          {/* AI Influencers List View */}
          {activeSection === 'influencers' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-1">AI Influencers</h1>
                  <p className="text-gray-400">Discover and manage top AI industry influencers</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <div className="mr-4">
                    <select className="bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] rounded-lg py-2 px-3 focus:outline-none focus:border-[#D4AF37] transition-colors">
                      <option>All Categories</option>
                      <option>AI Ethics</option>
                      <option>Machine Learning</option>
                      <option>AI Products</option>
                      <option>Research</option>
                    </select>
                  </div>
                  <button className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add Influencer
                  </button>
                </div>
              </div>
              
              {/* Influencer cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredInfluencers.map(influencer => (
                  <div 
                    key={influencer.id} 
                    className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5 hover:border-[rgba(218,165,32,0.3)] transition-colors cursor-pointer"
                    onClick={() => setSelectedInfluencer(influencer)}
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center overflow-hidden mr-3">
                        <img src={influencer.avatar} alt={influencer.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold">{influencer.name}</h3>
                          <div className={`px-2 py-0.5 rounded-full text-xs ${
                            influencer.status === 'New Lead' ? 'bg-blue-500/20 text-blue-300' : 
                            influencer.status === 'Contacted' ? 'bg-yellow-500/20 text-yellow-300' :
                            influencer.status === 'Negotiating' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {influencer.status}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">{influencer.handle}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      <div className="flex-1 border-r border-[rgba(218,165,32,0.1)] pr-3">
                        <p className="text-sm text-gray-400">Followers</p>
                        <p className="font-medium">{influencer.followers}</p>
                      </div>
                      <div className="flex-1 border-r border-[rgba(218,165,32,0.1)] px-3">
                        <p className="text-sm text-gray-400">Engagement</p>
                        <p className="font-medium">{influencer.engagement}</p>
                      </div>
                      <div className="flex-1 pl-3">
                        <p className="text-sm text-gray-400">Brand Fit</p>
                        <p className="font-medium text-[#D4AF37]">{influencer.fit}%</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-1">Topics</p>
                      <div className="flex flex-wrap gap-1">
                        {influencer.topics.map(topic => (
                          <span key={topic} className="px-2 py-0.5 bg-[rgba(218,165,32,0.07)] text-[#D4AF37] text-xs rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Recent Post</p>
                      <p className="text-sm line-clamp-2">{influencer.recentPost}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-[rgba(218,165,32,0.1)] flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-gray-400">ROI Score: </span>
                        <span className="text-[#D4AF37] font-medium">{influencer.roi}x</span>
                      </div>
                      <div className="flex">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-colors mr-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 12C16.5 12.2761 16.2761 12.5 16 12.5C15.7239 12.5 15.5 12.2761 15.5 12C15.5 11.7239 15.7239 11.5 16 11.5C16.2761 11.5 16.5 11.7239 16.5 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.5 12C12.5 12.2761 12.2761 12.5 12 12.5C11.7239 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.7239 11.5 12 11.5C12.2761 11.5 12.5 11.7239 12.5 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.5 12C8.5 12.2761 8.27614 12.5 8 12.5C7.72386 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.72386 11.5 8 11.5C8.27614 11.5 8.5 11.7239 8.5 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.3)] hover:bg-[rgba(218,165,32,0.2)] transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Influencer detail modal */}
              {selectedInfluencer && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4">
                  <div className="bg-[rgba(20,20,25,0.95)] rounded-xl border border-[rgba(218,165,32,0.2)] w-full max-w-3xl max-h-[90vh] overflow-auto">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center overflow-hidden mr-4">
                            <img src={selectedInfluencer.avatar} alt={selectedInfluencer.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">{selectedInfluencer.name}</h2>
                            <p className="text-gray-400">{selectedInfluencer.handle}</p>
                            <div className="flex mt-1">
                              {selectedInfluencer.topics.map(topic => (
                                <span key={topic} className="mr-2 px-2 py-0.5 bg-[rgba(218,165,32,0.07)] text-[#D4AF37] text-xs rounded-full">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button 
                          className="p-2 rounded-lg bg-[rgba(20,20,25,0.8)] hover:bg-[rgba(20,20,25,0.9)] transition-colors"
                          onClick={() => setSelectedInfluencer(null)}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                              <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C23 16.7909 21.2091 15 19 15H18M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM19 7C19 8.10457 18.1046 9 17 9C15.8954 9 15 8.10457 15 7C15 5.89543 15.8954 5 17 5C18.1046 5 19 5.89543 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <h3 className="text-md font-medium">Audience</h3>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Followers</span>
                            <span className="font-medium">{selectedInfluencer.followers}</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Engagement</span>
                            <span className="font-medium">{selectedInfluencer.engagement}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Brand Fit</span>
                            <span className="text-[#D4AF37] font-medium">{selectedInfluencer.fit}%</span>
                          </div>
                        </div>
                        
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                              <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <h3 className="text-md font-medium">Status</h3>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Current Status</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              selectedInfluencer.status === 'New Lead' ? 'bg-blue-500/20 text-blue-300' : 
                              selectedInfluencer.status === 'Contacted' ? 'bg-yellow-500/20 text-yellow-300' :
                              selectedInfluencer.status === 'Negotiating' ? 'bg-purple-500/20 text-purple-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              {selectedInfluencer.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Last Contact</span>
                            <span className="font-medium">Mar 18, 2025</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Response Rate</span>
                            <span className="font-medium">92%</span>
                          </div>
                        </div>
                        
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                              <path d="M16 8H8M16 8C18.2091 8 20 9.79086 20 12V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V12C4 9.79086 5.79086 8 8 8M16 8V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V8M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <h3 className="text-md font-medium">ROI</h3>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Expected ROI</span>
                            <span className="text-[#D4AF37] font-medium">{selectedInfluencer.roi}x</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Cost per Engagement</span>
                            <span className="font-medium">$0.42</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Previous Performance</span>
                            <span className="text-green-400 font-medium">+18%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-md font-medium mb-3 flex items-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                            <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          AI-Powered Insights
                        </h3>
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-l-2 border-[#D4AF37] pl-3">
                              <h4 className="text-[#D4AF37] text-sm font-medium mb-1">Audience Match</h4>
                              <p className="text-sm text-gray-300">85% overlap with your target audience. Strong resonance with AI developers and decision-makers.</p>
                            </div>
                            <div className="border-l-2 border-[#D4AF37] pl-3">
                              <h4 className="text-[#D4AF37] text-sm font-medium mb-1">Content Quality</h4>
                              <p className="text-sm text-gray-300">Consistently produces high-quality technical content with avg. 4.8min read time.</p>
                            </div>
                            <div className="border-l-2 border-[#D4AF37] pl-3">
                              <h4 className="text-[#D4AF37] text-sm font-medium mb-1">Collaboration Style</h4>
                              <p className="text-sm text-gray-300">Prefers detailed briefs and editorial freedom. Past sponsors report positive experiences.</p>
                            </div>
                            <div className="border-l-2 border-[#D4AF37] pl-3">
                              <h4 className="text-[#D4AF37] text-sm font-medium mb-1">Recommended Approach</h4>
                              <p className="text-sm text-gray-300">Technical product demos perform 3x better than traditional sponsorships with this influencer.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-3">
                        <button className="px-4 py-2 border border-[rgba(218,165,32,0.3)] text-[#D4AF37] rounded-lg hover:bg-[rgba(218,165,32,0.1)] transition-colors">
                          Add to Campaign
                        </button>
                        <button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium rounded-lg transition-colors">
                          Contact Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* AI Outreach Management View */}
          {activeSection === 'outreach' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-1">AI-Powered Outreach</h1>
                  <p className="text-gray-400">Manage influencer campaign outreach with AI assistance</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    New Campaign
                  </button>
                </div>
              </div>
              
              {/* Campaign cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                {campaigns.map(campaign => (
                  <div 
                    key={campaign.id} 
                    className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5 hover:border-[rgba(218,165,32,0.3)] transition-colors cursor-pointer"
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold">{campaign.name}</h3>
                      <div className={`px-2 py-0.5 rounded-full text-xs ${
                        campaign.status === 'Active' ? 'bg-green-500/20 text-green-300' : 
                        campaign.status === 'Planning' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {campaign.status}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <div className="h-2 bg-[rgba(20,20,25,0.6)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[rgba(218,165,32,0.6)] to-[#D4AF37] rounded-full"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-[rgba(20,20,25,0.6)] rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Influencers</p>
                        <p className="font-medium">{campaign.influencers}</p>
                      </div>
                      <div className="bg-[rgba(20,20,25,0.6)] rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Responses</p>
                        <p className="font-medium">{campaign.responses}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-4">
                      <div>
                        <p className="text-gray-400 mb-1">Start Date</p>
                        <p>{new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">End Date</p>
                        <p>{new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-[rgba(218,165,32,0.1)] flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-gray-400">Impressions: </span>
                        <span className="text-[#D4AF37] font-medium">{campaign.metrics.impressions}</span>
                      </div>
                      <div className="flex">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.3)] hover:bg-[rgba(218,165,32,0.2)] transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* AI Message Templates */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                    <path d="M12 5.5C12 4.57174 12.4214 3.6815 13.1716 3.02513C13.9217 2.36875 14.9391 2 16 2C17.0609 2 18.0783 2.36875 18.8284 3.02513C19.5786 3.6815 20 4.57174 20 5.5C20 10 16 11 16 11M15.9991 21.4C15.9997 21.4 16 21.4 16 21.4V21.4C16.0061 22.0118 15.5824 22.5364 15 22.6M15.9991 21.4C15.9997 21.4 15.9994 21.4 15.9991 21.4M15.9991 21.4C15.946 20.7649 15.5778 19.9983 15.0001 19.6983C14.9994 19.6979 14.9987 19.6975 14.998 19.6971M15 22.6C14.4179 22.6636 13.8763 22.2682 13.8 21.7L13.8 21.7C13.7985 21.6921 13.797 21.6842 13.7957 21.6763M15 22.6C15 22.6 15 22.6 15 22.6V22.6ZM13.7957 21.6763C13.6973 21.0321 13.3167 20.2099 12.7003 19.8983C12.6996 19.8979 12.6989 19.8975 12.6982 19.8971M13.7957 21.6763C13.7957 21.6763 13.7957 21.6763 13.7957 21.6763ZM14.998 19.6971C14.4003 19.4111 13.5999 19.4111 13.0022 19.6971C13.0018 19.6973 13.0013 19.6975 13.0009 19.6977M14.998 19.6971C14.998 19.6971 14.998 19.6971 14.998 19.6971ZM13.0009 19.6977C12.9005 19.7439 12.7999 19.8176 12.6982 19.8971M13.0009 19.6977C13.0009 19.6977 13.0009 19.6977 13.0009 19.6977ZM12.6982 19.8971C12.6982 19.8971 12.6982 19.8971 12.6982 19.8971ZM12 14.5V14.6983C12 15.2806 11.7625 15.7486 11.5 16.1983C10.7489 17.4967 10 19.6 10 19.6C10 19.6 9.3 17.1 8 16.5C7.8032 16.3964 7.58613 16.3348 7.36487 16.32C7.14361 16.3052 6.9199 16.3375 6.70826 16.4151C6.49662 16.4927 6.30137 16.6143 6.13442 16.7726C5.96747 16.9308 5.8322 17.1227 5.73609 17.3373C5.63997 17.5519 5.58493 17.7847 5.57397 18.0222C5.56302 18.2596 5.59631 18.4971 5.67173 18.7205C5.74716 18.944 5.86324 19.1491 6.01344 19.3248C6.16363 19.5004 6.34503 19.6431 6.54722 19.7448C6.74941 19.8466 6.96894 19.9054 7.19222 19.9178C7.4155 19.9303 7.63889 19.8961 7.85 19.8171C9.65 19.2171 11 21.5 11 21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  AI Message Templates
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5 hover:border-[rgba(218,165,32,0.3)] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Initial Outreach</h3>
                      <div className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                        Highest Response
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Personalized introduction emphasizing mutual value and alignment with the influencer's content focus.
                    </p>
                    <div className="flex justify-between mt-auto">
                      <span className="text-xs text-gray-400">82% response rate</span>
                      <button className="text-xs text-[#D4AF37] hover:underline">Use Template</button>
                    </div>
                  </div>
                  
                  <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5 hover:border-[rgba(218,165,32,0.3)] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Follow-up</h3>
                      <div className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full text-xs">
                        Recommended
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Gentle reminder with additional value proposition and flexible collaboration options.
                    </p>
                    <div className="flex justify-between mt-auto">
                      <span className="text-xs text-gray-400">68% response rate</span>
                      <button className="text-xs text-[#D4AF37] hover:underline">Use Template</button>
                    </div>
                  </div>
                  
                  <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5 hover:border-[rgba(218,165,32,0.3)] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Technical Collaboration</h3>
                      <div className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                        High Conversion
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Focused on technical integration, API access, and developer-friendly collaboration opportunities.
                    </p>
                    <div className="flex justify-between mt-auto">
                      <span className="text-xs text-gray-400">74% response rate</span>
                      <button className="text-xs text-[#D4AF37] hover:underline">Use Template</button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Campaign detail modal */}
              {selectedCampaign && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4">
                  <div className="bg-[rgba(20,20,25,0.95)] rounded-xl border border-[rgba(218,165,32,0.2)] w-full max-w-4xl max-h-[90vh] overflow-auto">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center">
                            <h2 className="text-2xl font-bold mr-3">{selectedCampaign.name}</h2>
                            <div className={`px-2 py-0.5 rounded-full text-xs ${
                              selectedCampaign.status === 'Active' ? 'bg-green-500/20 text-green-300' : 
                              selectedCampaign.status === 'Planning' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {selectedCampaign.status}
                            </div>
                          </div>
                          <p className="text-gray-400 mt-1">
                            {new Date(selectedCampaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                            {new Date(selectedCampaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <button 
                          className="p-2 rounded-lg bg-[rgba(20,20,25,0.8)] hover:bg-[rgba(20,20,25,0.9)] transition-colors"
                          onClick={() => setSelectedCampaign(null)}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-4 flex flex-col items-center justify-center">
                          <p className="text-[#D4AF37] text-2xl font-bold mb-1">{selectedCampaign.metrics.impressions}</p>
                          <p className="text-sm text-gray-400">Total Impressions</p>
                        </div>
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-4 flex flex-col items-center justify-center">
                          <p className="text-[#D4AF37] text-2xl font-bold mb-1">{selectedCampaign.metrics.engagement}</p>
                          <p className="text-sm text-gray-400">Engagement Rate</p>
                        </div>
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-4 flex flex-col items-center justify-center">
                          <p className="text-[#D4AF37] text-2xl font-bold mb-1">{selectedCampaign.metrics.clicks}</p>
                          <p className="text-sm text-gray-400">Total Clicks</p>
                        </div>
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-4 flex flex-col items-center justify-center">
                          <p className="text-[#D4AF37] text-2xl font-bold mb-1">{selectedCampaign.metrics.conversions}</p>
                          <p className="text-sm text-gray-400">Conversions</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Campaign Progress</h3>
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-5">
                          <div className="flex justify-between items-center text-sm mb-2">
                            <span>Overall Progress ({selectedCampaign.progress}%)</span>
                            <span className="text-[#D4AF37]">{selectedCampaign.influencers} influencers</span>
                          </div>
                          <div className="h-3 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden mb-5">
                            <div 
                              className="h-full bg-gradient-to-r from-[rgba(218,165,32,0.6)] to-[#D4AF37] rounded-full"
                              style={{ width: `${selectedCampaign.progress}%` }}
                            ></div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center text-sm mb-1">
                                <span>Outreach</span>
                                <span>{selectedCampaign.influencers} / {selectedCampaign.influencers}</span>
                              </div>
                              <div className="h-2 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center text-sm mb-1">
                                <span>Responses</span>
                                <span>{selectedCampaign.responses} / {selectedCampaign.influencers}</span>
                              </div>
                              <div className="h-2 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(selectedCampaign.responses / selectedCampaign.influencers) * 100}%` }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center text-sm mb-1">
                                <span>Deals Closed</span>
                                <span>{Math.floor(selectedCampaign.responses * 0.8)} / {selectedCampaign.influencers}</span>
                              </div>
                              <div className="h-2 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(Math.floor(selectedCampaign.responses * 0.8) / selectedCampaign.influencers) * 100}%` }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center text-sm mb-1">
                                <span>Content Published</span>
                                <span>{Math.floor(selectedCampaign.responses * 0.6)} / {selectedCampaign.influencers}</span>
                              </div>
                              <div className="h-2 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                                <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${(Math.floor(selectedCampaign.responses * 0.6) / selectedCampaign.influencers) * 100}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">AI Recommendations</h3>
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-l-2 border-[#D4AF37] pl-3">
                              <h4 className="text-[#D4AF37] text-sm font-medium mb-1">Follow-up Opportunity</h4>
                              <p className="text-sm text-gray-300">2 high-value influencers haven't responded in 5+ days. Recommended sending personalized follow-up.</p>
                            </div>
                            
                            <div className="border-l-2 border-[#D4AF37] pl-3">
                              <h4 className="text-[#D4AF37] text-sm font-medium mb-1">Content Focus</h4>
                              <p className="text-sm text-gray-300">Technical demo content is generating 2.3x more engagement than overview content. Consider pivoting strategy.</p>
                            </div>
                            
                            <div className="border-l-2 border-green-500 pl-3">
                              <h4 className="text-green-500 text-sm font-medium mb-1">High Performer</h4>
                              <p className="text-sm text-gray-300">AI Ethics Expert delivering 142% of projected engagement. Consider expanded partnership.</p>
                            </div>
                            
                            <div className="border-l-2 border-red-500 pl-3">
                              <h4 className="text-red-500 text-sm font-medium mb-1">Optimization Needed</h4>
                              <p className="text-sm text-gray-300">Traffic from Deep Learning Daily showing low conversion (0.8%). Recommend updating landing page.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-3">
                        <button className="px-4 py-2 border border-[rgba(218,165,32,0.3)] text-[#D4AF37] rounded-lg hover:bg-[rgba(218,165,32,0.1)] transition-colors">
                          Export Report
                        </button>
                        <button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium rounded-lg transition-colors">
                          Manage Influencers
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* AI Negotiation View */}
          {activeSection === 'negotiation' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-1">AI Negotiation Assistant</h1>
                  <p className="text-gray-400">Automated negotiation suggestions and contract management</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    New Deal
                  </button>
                </div>
              </div>
              
              {/* Deals table */}
              <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5 mb-8 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(218,165,32,0.1)]">
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Influencer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Value</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Progress</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Start Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map(deal => (
                      <tr 
                        key={deal.id} 
                        className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(20,20,25,0.9)] cursor-pointer transition-colors"
                        onClick={() => setSelectedDeal(deal)}
                      >
                        <td className="py-3 px-4">{deal.influencer}</td>
                        <td className="py-3 px-4">{deal.type}</td>
                        <td className="py-3 px-4 text-[#D4AF37]">{deal.value}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            deal.status === 'In Negotiation' ? 'bg-yellow-500/20 text-yellow-300' : 
                            deal.status === 'Contract Sent' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-purple-500/20 text-purple-300'
                          }`}>
                            {deal.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-24 h-2 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[rgba(218,165,32,0.6)] to-[#D4AF37] rounded-full"
                              style={{ width: `${deal.progress}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{new Date(deal.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                        <td className="py-3 px-4">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-colors">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.232 5.232L3.32843 17.1356C2.93791 17.5261 2.93791 18.1593 3.32843 18.5498L5.45127 20.6727C5.84179 21.0632 6.47496 21.0632 6.86548 20.6727L18.7691 8.76906M15.232 5.232L19.7694 9.76946M15.232 5.232L20.7694 10.7694" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              
              {/* AI Negotiation Assistant */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37]">
                    <path d="M19 21V19C19 16.7909 17.2091 15 15 15H9C6.79086 15 5 16.7909 5 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.5 10.5L20.5 7.5M20.5 7.5L20.5 4.5M20.5 7.5L17.5 7.5M20.5 7.5L23.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  AI Negotiation Assistant
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5 hover:border-[rgba(218,165,32,0.3)] transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 20L12 14L22 20M2 14L12 8L22 14M2 8L12 2L22 8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="font-medium">Value Assessment</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      AI analyzes follower quality, engagement rates, and content performance to determine fair market value.
                    </p>
                    <div className="bg-[rgba(20,20,25,0.8)] rounded-lg p-3 mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Industry Average</span>
                        <span className="text-sm text-[#D4AF37]">$4,200</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Your Average</span>
                        <span className="text-sm text-[#D4AF37]">$4,800</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Recommended Range</span>
                        <span className="text-sm text-[#D4AF37]">$4,500-$5,500</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-xs text-[#D4AF37] hover:underline">Generate Full Report</button>
                    </div>
                  </div>
                  
                  <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5 hover:border-[rgba(218,165,32,0.3)] transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 12H16M8 12L11 9M8 12L11 15M4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="font-medium">Response Generator</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Create professional negotiation responses based on AI analysis of industry standards and influencer value.
                    </p>
                    <div className="space-y-3 mb-3">
                      <button className="w-full text-left text-sm bg-[rgba(20,20,25,0.8)] rounded-lg p-3 hover:bg-[rgba(20,20,25,0.9)] transition-colors">
                        Accept with Minor Modifications
                      </button>
                      <button className="w-full text-left text-sm bg-[rgba(20,20,25,0.8)] rounded-lg p-3 hover:bg-[rgba(20,20,25,0.9)] transition-colors">
                        Counter Offer with Justification
                      </button>
                      <button className="w-full text-left text-sm bg-[rgba(20,20,25,0.8)] rounded-lg p-3 hover:bg-[rgba(20,20,25,0.9)] transition-colors">
                        Request Performance Metrics
                      </button>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-xs text-[#D4AF37] hover:underline">Custom Response</button>
                    </div>
                  </div>
                  
                  <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5 hover:border-[rgba(218,165,32,0.3)] transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="font-medium">Contract Templates</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      AI-optimized legal templates for different collaboration types with automatic clause suggestions.
                    </p>
                    <div className="space-y-3 mb-3">
                      <button className="w-full text-left text-sm bg-[rgba(20,20,25,0.8)] rounded-lg p-3 hover:bg-[rgba(20,20,25,0.9)] transition-colors flex justify-between items-center">
                        <span>Standard Sponsorship</span>
                        <span className="text-xs text-[#D4AF37]">View</span>
                      </button>
                      <button className="w-full text-left text-sm bg-[rgba(20,20,25,0.8)] rounded-lg p-3 hover:bg-[rgba(20,20,25,0.9)] transition-colors flex justify-between items-center">
                        <span>Technical Partnership</span>
                        <span className="text-xs text-[#D4AF37]">View</span>
                      </button>
                      <button className="w-full text-left text-sm bg-[rgba(20,20,25,0.8)] rounded-lg p-3 hover:bg-[rgba(20,20,25,0.9)] transition-colors flex justify-between items-center">
                        <span>Long-term Ambassador</span>
                        <span className="text-xs text-[#D4AF37]">View</span>
                      </button>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-xs text-[#D4AF37] hover:underline">Custom Template</button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Negotiation Activity */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Recent Negotiation Activity</h2>
                <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-5">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center overflow-hidden mt-1 mr-3 flex-shrink-0">
                        <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium mb-1">Deep Learning Daily</p>
                          <span className="text-xs text-gray-400">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">Sent a contract for the Brand Partnership deal valued at $12,000.</p>
                        <div className="flex space-x-2">
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full">Contract Sent</span>
                          <span className="px-2 py-0.5 bg-[rgba(218,165,32,0.07)] text-[#D4AF37] text-xs rounded-full">$12,000</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-[rgba(255,255,255,0.05)] pt-4 flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5.5C12 4.57174 12.4214 3.6815 13.1716 3.02513C13.9217 2.36875 14.9391 2 16 2C17.0609 2 18.0783 2.36875 18.8284 3.02513C19.5786 3.6815 20 4.57174 20 5.5C20 10 16 11 16 11" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium mb-1">AI Recommendation</p>
                          <span className="text-xs text-gray-400">4 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">For AI Developer Zone: Accept the counter-offer with a 10% affiliate commission structure.</p>
                        <div className="flex space-x-2">
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded-full">Recommendation</span>
                          <button className="px-2 py-0.5 bg-[rgba(218,165,32,0.07)] text-[#D4AF37] text-xs rounded-full hover:bg-[rgba(218,165,32,0.1)] transition-colors">
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-[rgba(255,255,255,0.05)] pt-4 flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center overflow-hidden mt-1 mr-3 flex-shrink-0">
                        <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium mb-1">AI Ethics Expert</p>
                          <span className="text-xs text-gray-400">Yesterday</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">Countered your offer with $6,200 for the sponsored content package.</p>
                        <div className="flex space-x-2">
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">Counter Offer</span>
                          <span className="px-2 py-0.5 bg-[rgba(218,165,32,0.07)] text-[#D4AF37] text-xs rounded-full">$6,200</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-[rgba(255,255,255,0.05)] pt-4 flex items-start">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 21H14M12 21V17M12 17C9.23858 17 7 14.7614 7 12M12 17C14.7614 17 17 14.7614 17 12M7 12C7 9.23858 9.23858 7 12 7M7 12H3M17 12C17 9.23858 14.7614 7 12 7M17 12H21M12 7V3" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium mb-1">System</p>
                          <span className="text-xs text-gray-400">Yesterday</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">Contract with Future of Computing was automatically renewed for another 3 months.</p>
                        <div className="flex space-x-2">
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">Auto-Renewal</span>
                          <span className="px-2 py-0.5 bg-[rgba(218,165,32,0.07)] text-[#D4AF37] text-xs rounded-full">$9,500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Deal detail modal */}
              {selectedDeal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4">
                  <div className="bg-[rgba(20,20,25,0.95)] rounded-xl border border-[rgba(218,165,32,0.2)] w-full max-w-4xl max-h-[90vh] overflow-auto">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedDeal.type} with {selectedDeal.influencer}</h2>
                          <div className="flex items-center mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              selectedDeal.status === 'In Negotiation' ? 'bg-yellow-500/20 text-yellow-300' : 
                              selectedDeal.status === 'Contract Sent' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-purple-500/20 text-purple-300'
                            }`}>
                              {selectedDeal.status}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-400">Starting {new Date(selectedDeal.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <span className="mx-2">•</span>
                            <span className="text-[#D4AF37]">{selectedDeal.value}</span>
                          </div>
                        </div>
                        <button 
                          className="p-2 rounded-lg bg-[rgba(20,20,25,0.8)] hover:bg-[rgba(20,20,25,0.9)] transition-colors"
                          onClick={() => setSelectedDeal(null)}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Deal Status</h3>
                          <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-5">
                            <div className="mb-4">
                              <div className="flex justify-between items-center text-sm mb-1">
                                <span>Progress</span>
                                <span>{selectedDeal.progress}%</span>
                              </div>
                              <div className="h-2 bg-[rgba(20,20,25,0.9)] rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[rgba(218,165,32,0.6)] to-[#D4AF37] rounded-full"
                                  style={{ width: `${selectedDeal.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                  selectedDeal.progress >= 20 ? 'bg-[#D4AF37]' : 'bg-[rgba(20,20,25,0.9)] border border-[rgba(218,165,32,0.3)]'
                                }`}>
                                  {selectedDeal.progress >= 20 ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12L10 17L19 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  ) : (
                                    <span className="text-xs">1</span>
                                  )}
                                </div>
                                <span className={selectedDeal.progress >= 20 ? 'text-[#D4AF37]' : 'text-gray-400'}>Initial Outreach</span>
                              </div>
                              
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                  selectedDeal.progress >= 40 ? 'bg-[#D4AF37]' : 'bg-[rgba(20,20,25,0.9)] border border-[rgba(218,165,32,0.3)]'
                                }`}>
                                  {selectedDeal.progress >= 40 ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12L10 17L19 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  ) : (
                                    <span className="text-xs">2</span>
                                  )}
                                </div>
                                <span className={selectedDeal.progress >= 40 ? 'text-[#D4AF37]' : 'text-gray-400'}>Negotiation</span>
                              </div>
                              
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                  selectedDeal.progress >= 60 ? 'bg-[#D4AF37]' : 'bg-[rgba(20,20,25,0.9)] border border-[rgba(218,165,32,0.3)]'
                                }`}>
                                  {selectedDeal.progress >= 60 ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12L10 17L19 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  ) : (
                                    <span className="text-xs">3</span>
                                  )}
                                </div>
                                <span className={selectedDeal.progress >= 60 ? 'text-[#D4AF37]' : 'text-gray-400'}>Contract Draft</span>
                              </div>
                              
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                  selectedDeal.progress >= 80 ? 'bg-[#D4AF37]' : 'bg-[rgba(20,20,25,0.9)] border border-[rgba(218,165,32,0.3)]'
                                }`}>
                                  {selectedDeal.progress >= 80 ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12L10 17L19 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  ) : (
                                    <span className="text-xs">4</span>
                                  )}
                                </div>
                                <span className={selectedDeal.progress >= 80 ? 'text-[#D4AF37]' : 'text-gray-400'}>Signature</span>
                              </div>
                              
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                  selectedDeal.progress >= 100 ? 'bg-[#D4AF37]' : 'bg-[rgba(20,20,25,0.9)] border border-[rgba(218,165,32,0.3)]'
                                }`}>
                                  {selectedDeal.progress >= 100 ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12L10 17L19 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  ) : (
                                    <span className="text-xs">5</span>
                                  )}
                                </div>
                                <span className={selectedDeal.progress >= 100 ? 'text-[#D4AF37]' : 'text-gray-400'}>Finalized</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Negotiation Details</h3>
                          <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-5">
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-400 mb-1">Your Offer</p>
                              <p className="text-xl text-[#D4AF37] font-medium">{selectedDeal.value}</p>
                            </div>
                            
                            {selectedDeal.counterOffer !== "None" && (
                              <div className="mb-4 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                                <p className="text-sm font-medium text-gray-400 mb-1">Counter Offer</p>
                                <p className="text-xl text-[#D4AF37] font-medium">{selectedDeal.counterOffer}</p>
                              </div>
                            )}
                            
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-400 mb-2">AI Recommendation</p>
                              <div className={`px-3 py-2 rounded-lg ${
                                selectedDeal.aiRecommendation === "Accept" ? 'bg-green-500/20 text-green-300' :
                                'bg-[rgba(218,165,32,0.07)] text-[#D4AF37]'
                              }`}>
                                {selectedDeal.aiRecommendation}
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-gray-400 mb-2">Terms</p>
                              <ul className="space-y-2">
                                {selectedDeal.terms.map((term, index) => (
                                  <li key={index} className="flex items-start">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#D4AF37] flex-shrink-0 mt-0.5">
                                      <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="text-sm">{term}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Communication History</h3>
                        <div className="bg-[rgba(20,20,25,0.7)] rounded-lg p-5 max-h-64 overflow-y-auto">
                          <div className="space-y-4">
                            <div className="flex">
                              <div className="w-8 h-8 rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center overflow-hidden mr-3 flex-shrink-0">
                                <img src="/api/placeholder/32/32" alt="Influencer" className="w-full h-full object-cover" />
                              </div>
                              <div className="bg-[rgba(20,20,25,0.8)] rounded-lg p-3 max-w-[80%]">
                                <div className="flex justify-between items-center mb-1">
                                  <p className="text-sm font-medium">{selectedDeal.influencer}</p>
                                  <span className="text-xs text-gray-400">Mar 20, 2:34 PM</span>
                                </div>
                                <p className="text-sm">Thank you for your offer. I'm interested but would need {selectedDeal.counterOffer} to accommodate the scope of work outlined.</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-end">
                              <div className="bg-[rgba(218,165,32,0.07)] rounded-lg p-3 max-w-[80%]">
                                <div className="flex justify-between items-center mb-1">
                                  <p className="text-sm font-medium">You</p>
                                  <span className="text-xs text-gray-400">Mar 19, 10:15 AM</span>
                                </div>
                                <p className="text-sm">We'd like to offer you {selectedDeal.value} for a {selectedDeal.type.toLowerCase()} collaboration. This would include {selectedDeal.terms[0].toLowerCase()} and {selectedDeal.terms[1].toLowerCase()}.</p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-[rgba(218,165,32,0.1)] border border-[rgba(218,165,32,0.3)] flex items-center justify-center overflow-hidden ml-3 flex-shrink-0">
                                <span className="text-[#D4AF37] text-xs font-medium">YOU</span>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="w-8 h-8 rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center overflow-hidden mr-3 flex-shrink-0">
                                <img src="/api/placeholder/32/32" alt="Influencer" className="w-full h-full object-cover" />
                              </div>
                              <div className="bg-[rgba(20,20,25,0.8)] rounded-lg p-3 max-w-[80%]">
                                <div className="flex justify-between items-center mb-1">
                                  <p className="text-sm font-medium">{selectedDeal.influencer}</p>
                                  <span className="text-xs text-gray-400">Mar 18, 4:20 PM</span>
                                </div>
                                <p className="text-sm">I'm interested in learning more about potential collaboration opportunities with your AI platform.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-3">
                        <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                          View Contract
                        </button>
                        <button className="px-4 py-2 border border-[rgba(218,165,32,0.3)] text-[#D4AF37] rounded-lg hover:bg-[rgba(218,165,32,0.1)] transition-colors">
                          Generate Response
                        </button>
                        <button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium rounded-lg transition-colors">
                          {selectedDeal.aiRecommendation === "Accept" ? "Accept Offer" : "Send Counter Offer"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}