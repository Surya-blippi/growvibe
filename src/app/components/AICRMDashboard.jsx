"use client";
import { useState, useEffect } from 'react';

export default function AICRMDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'followers', direction: 'desc' });
  const [selectedRow, setSelectedRow] = useState(null);
  const [influencerData, setInfluencerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial data from CSV
  const csvInfluencers = [
    { full_name: "AIsoldier", username: "ai.soldier", platform: "Instagram", followers: "76766", engagement_rate: "10.0%", location: "", categories: "AI", match_score: "53%" },
    { full_name: "Futurepedia", username: "futurepedia_io", platform: "YouTube", followers: "317000", engagement_rate: "4.0%", location: "US", categories: "AI", match_score: "52%" },
    { full_name: "Futurepedia", username: "futurepediaio", platform: "TikTok", followers: "25400", engagement_rate: "11.0%", location: "US", categories: "AI", match_score: "52%" },
    { full_name: "SIRIO — Personal Branding with AI", username: "heysirio", platform: "Instagram", followers: "68279", engagement_rate: "36.0%", location: "", categories: "AI", match_score: "51%" },
    { full_name: "Caleb Torres", username: "perceiveai", platform: "Instagram", followers: "240889", engagement_rate: "0%", location: "", categories: "AI", match_score: "51%" },
    { full_name: "AI Toolz", username: "aitoolz", platform: "TikTok", followers: "76900", engagement_rate: "5.0%", location: "AU", categories: "AI", match_score: "51%" },
    { full_name: "sebastienjefferies", username: "sebastienjefferies", platform: "TikTok", followers: "484200", engagement_rate: "5.0%", location: "GB", categories: "AI", match_score: "51%" },
    { full_name: "The AI Chronicle", username: "aichronicle1", platform: "TikTok", followers: "47000", engagement_rate: "10.0%", location: "BH", categories: "AI", match_score: "51%" },
    { full_name: "Digital Magic", username: "digital_magic", platform: "YouTube", followers: "22200", engagement_rate: "5.0%", location: "AT", categories: "AI", match_score: "51%" },
    { full_name: "Matt Farmer", username: "mattfarmerai", platform: "Instagram", followers: "68140", engagement_rate: "3.0%", location: "", categories: "AI", match_score: "51%" },
    { full_name: "AI News Central", username: "ainewscentral", platform: "Instagram", followers: "32353", engagement_rate: "0%", location: "", categories: "AI", match_score: "51%" },
    { full_name: "Andreas Massouras | A.I for Entrepeneurs", username: "andremass.ai", platform: "Instagram", followers: "71627", engagement_rate: "0%", location: "", categories: "AI", match_score: "51%" },
    { full_name: "Chris Cordero", username: "officialchriscordero", platform: "TikTok", followers: "6311", engagement_rate: "12.0%", location: "US", categories: "Content Creation", match_score: "51%" },
    { full_name: "How To In 5 Minutes", username: "HowToIn5Minutes", platform: "YouTube", followers: "267000", engagement_rate: "5.0%", location: "ID", categories: "AI", match_score: "51%" },
    { full_name: "Victor C", username: "aisavvy", platform: "TikTok", followers: "72500", engagement_rate: "11.0%", location: "MD", categories: "AI", match_score: "51%" },
    { full_name: "The AI Learning Center", username: "the_ai_learning_center", platform: "Instagram", followers: "3765", engagement_rate: "0%", location: "", categories: "AI", match_score: "51%" },
    { full_name: "Bob Doyle Media", username: "BobDoyleMedia", platform: "YouTube", followers: "46400", engagement_rate: "5.0%", location: "US", categories: "AI", match_score: "51%" },
    { full_name: "Austin Armstrong", username: "socialtypro", platform: "Instagram", followers: "816028", engagement_rate: "3.0%", location: "", categories: "AI", match_score: "50%" },
    { full_name: "Nick Bondar", username: "nickismeta", platform: "Instagram", followers: "156493", engagement_rate: "0%", location: "", categories: "AI", match_score: "50%" },
    { full_name: "Insidr.ai", username: "insidr.ai", platform: "TikTok", followers: "61000", engagement_rate: "12.0%", location: "DK", categories: "AI", match_score: "50%" },
    { full_name: "mattfarmerai", username: "mattfarmerai", platform: "TikTok", followers: "110800", engagement_rate: "10.0%", location: "CA", categories: "AI; Marketing", match_score: "50%" },
    { full_name: "Chem Beast", username: "chembeast4530", platform: "YouTube", followers: "34100", engagement_rate: "4.0%", location: "US", categories: "AI", match_score: "50%" },
    { full_name: "AI Tools & News", username: "aidailyinsights", platform: "TikTok", followers: "198200", engagement_rate: "6.0%", location: "AE", categories: "AI", match_score: "50%" },
    { full_name: "Riley Brown", username: "rileybrown.ai", platform: "TikTok", followers: "579900", engagement_rate: "10.0%", location: "US", categories: "AI", match_score: "50%" },
    { full_name: "TechTok", username: "howfinity", platform: "TikTok", followers: "616400", engagement_rate: "5.0%", location: "US", categories: "AI", match_score: "50%" }
  ];

  // Generate synthetic influencers
  const generateSyntheticInfluencers = (count) => {
    const platforms = ["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn"];
    const statusOptions = ["New Lead", "Contacted", "Negotiating", "Contracted"];
    const aiTopics = ["AI Ethics", "Machine Learning", "Computer Vision", "NLP", "Robotics", "AI Tools", "Prompt Engineering", "AI Research", "AI Business", "AI Art", "LLMs", "Neural Networks"];
    const countries = ["US", "UK", "CA", "AU", "DE", "FR", "JP", "IN", "BR", "SG", "NL", "ES", "IT"];
    
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // Create influencer handles from names
    const firstNames = ["AI", "Tech", "Digital", "Future", "Neural", "Smart", "Deep", "Data", "Cyber", "Quantum", "Virtual", "Synthesis", "Cognitive", "Robo", "Machine", "Intelligent", "Auto", "Logic", "Vision", "Mind"];
    const lastNames = ["Expert", "Guru", "Master", "Genius", "Wizard", "Ninja", "Pro", "Hacker", "Pioneer", "Mentor", "Architect", "Visionary", "Engineer", "Scientist", "Creator", "Explorer", "Innovator", "Futurist", "Insider", "Specialist"];
    
    const result = [];
    for (let i = 0; i < count; i++) {
      const firstName = getRandomElement(firstNames);
      const lastName = getRandomElement(lastNames);
      const fullName = `${firstName} ${lastName}`;
      
      // Make username from full name
      const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${getRandomInt(1, 999)}`;
      
      const platform = getRandomElement(platforms);
      const followers = getRandomInt(1000, 2000000);
      const formattedFollowers = followers > 999999 
        ? `${(followers / 1000000).toFixed(1)}M` 
        : followers > 999 
          ? `${(followers / 1000).toFixed(1)}K` 
          : followers.toString();
          
      const engagementRate = (Math.random() * 15).toFixed(1) + "%";
      const location = Math.random() > 0.3 ? getRandomElement(countries) : "";
      
      // Generate random topics
      const topicsCount = getRandomInt(1, 3);
      const topics = [];
      for (let j = 0; j < topicsCount; j++) {
        let topic = getRandomElement(aiTopics);
        while (topics.includes(topic)) {
          topic = getRandomElement(aiTopics);
        }
        topics.push(topic);
      }
      
      // Generate last contact date (within the last 60 days)
      const today = new Date();
      const daysAgo = getRandomInt(0, 60);
      const lastContactDate = new Date(today);
      lastContactDate.setDate(lastContactDate.getDate() - daysAgo);
      const lastContact = daysAgo === 0 
        ? "Today" 
        : daysAgo === 1 
          ? "Yesterday"
          : `${lastContactDate.toLocaleString('default', { month: 'short' })} ${lastContactDate.getDate()}, ${lastContactDate.getFullYear()}`;
          
      // Generate value based on followers and engagement
      const followerValue = parseInt(followers);
      const engagementValue = parseFloat(engagementRate) / 100;
      const baseValue = Math.sqrt(followerValue) * engagementValue * getRandomInt(20, 50);
      const roundedValue = Math.round(baseValue / 100) * 100;
      const formattedValue = `$${roundedValue.toLocaleString()}`;
      
      const matchScore = (getRandomInt(40, 95)) + "%";
      const status = getRandomElement(statusOptions);
      
      result.push({
        id: i + csvInfluencers.length + 1,
        full_name: fullName,
        username: username,
        platform,
        followers: formattedFollowers,
        engagement_rate: engagementRate,
        location,
        categories: topics.join(", "),
        match_score: matchScore,
        status,
        lastContact,
        value: formattedValue,
      });
    }
    return result;
  };

  // Process influencer data
  useEffect(() => {
    const processedCsvData = csvInfluencers.map((item, index) => {
      // Generate status
      const statusOptions = ["New Lead", "Contacted", "Negotiating", "Contracted"];
      const status = statusOptions[index % statusOptions.length];
      
      // Generate last contact date
      const today = new Date();
      const daysAgo = index % 30;
      const lastContactDate = new Date(today);
      lastContactDate.setDate(lastContactDate.getDate() - daysAgo);
      const lastContact = daysAgo === 0 
        ? "Today" 
        : daysAgo === 1 
          ? "Yesterday" 
          : `${lastContactDate.toLocaleString('default', { month: 'short' })} ${lastContactDate.getDate()}, ${lastContactDate.getFullYear()}`;
      
      // Generate value based on followers and engagement
      const followerValue = parseInt(item.followers.replace(/[KM]/g, '')) * (item.followers.includes('K') ? 1000 : item.followers.includes('M') ? 1000000 : 1);
      const engagementValue = parseFloat(item.engagement_rate) / 100;
      const baseValue = Math.sqrt(followerValue) * engagementValue * 30;
      const roundedValue = Math.round(baseValue / 100) * 100;
      const formattedValue = `$${roundedValue.toLocaleString()}`;
      
      // Convert categories to topics array
      const topics = item.categories.split(';').map(topic => topic.trim());
      
      return {
        id: index + 1,
        name: item.full_name,
        handle: `@${item.username}`,
        followers: item.followers,
        engagement: item.engagement_rate,
        topics,
        status,
        lastContact,
        value: formattedValue,
        matchScore: item.match_score,
        platform: item.platform,
        location: item.location || "Unknown"
      };
    });
    
    // Add synthetic data to reach ~300 entries
    const syntheticData = generateSyntheticInfluencers(275); // Reduced to 275 to keep the total entries manageable
    
    // Process synthetic data to match the format of our CRM
    const processedSyntheticData = syntheticData.map(item => {
      return {
        id: item.id,
        name: item.full_name,
        handle: `@${item.username}`,
        followers: item.followers,
        engagement: item.engagement_rate,
        topics: item.categories.split(', '),
        status: item.status,
        lastContact: item.lastContact,
        value: item.value,
        matchScore: item.match_score,
        platform: item.platform,
        location: item.location || "Unknown"
      };
    });
    
    // Combine both datasets
    setInfluencerData([...processedCsvData, ...processedSyntheticData]);
    setIsLoading(false);
  }, []);

  // Sorting logic
  const sortedData = [...influencerData].sort((a, b) => {
    if (sortConfig.key === 'followers') {
      const aValue = parseInt(a.followers.replace(/[KM]/g, '')) * (a.followers.includes('K') ? 1000 : a.followers.includes('M') ? 1000000 : 1);
      const bValue = parseInt(b.followers.replace(/[KM]/g, '')) * (b.followers.includes('K') ? 1000 : b.followers.includes('M') ? 1000000 : 1);
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (sortConfig.key === 'engagement') {
      const aValue = parseFloat(a.engagement);
      const bValue = parseFloat(b.engagement);
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (sortConfig.key === 'value') {
      const aValue = parseInt(a.value.replace(/[^\d]/g, ''));
      const bValue = parseInt(b.value.replace(/[^\d]/g, ''));
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (sortConfig.key === 'matchScore') {
      const aValue = parseInt(a.matchScore);
      const bValue = parseInt(b.matchScore);
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    // Default string comparison
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter based on search query, status, and platform
  const filteredInfluencers = sortedData.filter(influencer => 
    (influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     influencer.handle.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === 'All' || influencer.status === statusFilter) &&
    (platformFilter === 'All' || influencer.platform === platformFilter)
  );

  // Status badge color helper
  const getStatusColor = (status) => {
    switch(status) {
      case 'New Lead': return 'bg-blue-500/20 text-blue-300';
      case 'Contacted': return 'bg-yellow-500/20 text-yellow-300';
      case 'Negotiating': return 'bg-purple-500/20 text-purple-300';
      case 'Contracted': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };
  
  // Platform badge color helper
  const getPlatformColor = (platform) => {
    switch(platform) {
      case 'Instagram': return 'bg-pink-500/20 text-pink-300';
      case 'TikTok': return 'bg-teal-500/20 text-teal-300';
      case 'YouTube': return 'bg-red-500/20 text-red-300';
      case 'Twitter': return 'bg-blue-500/20 text-blue-300';
      case 'LinkedIn': return 'bg-indigo-500/20 text-indigo-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  // Handle sort request
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Determine sorting icon
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14l5 5 5-5M7 10l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    
    return sortConfig.direction === 'asc' ? (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2">AI Influencer CRM</h1>
        <p className="text-gray-400">Manage your AI industry influencer relationships</p>
      </header>
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search influencers..."
              className="bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] rounded-lg py-2 px-4 pl-10 w-full md:w-64 focus:outline-none focus:border-[#D4AF37] transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-2.5 text-gray-400">
              <path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Status Filter */}
          <select 
            className="bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] rounded-lg py-2 px-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="New Lead">New Lead</option>
            <option value="Contacted">Contacted</option>
            <option value="Negotiating">Negotiating</option>
            <option value="Contracted">Contracted</option>
          </select>
          
          {/* Platform Filter */}
          <select 
            className="bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.1)] rounded-lg py-2 px-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          >
            <option value="All">All Platforms</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="YouTube">YouTube</option>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>
        
        <button className="bg-[#D4AF37] hover:bg-[#BF9D30] text-black font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add Influencer
        </button>
      </div>
      
      {/* Table Info Bar */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-400">
          Showing all {filteredInfluencers.length} influencers
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading ? (
        <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-20 flex justify-center items-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse delay-150"></div>
            <span className="text-gray-400 ml-2">Loading influencer data...</span>
          </div>
        </div>
      ) : (
        /* Main Table */
        <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] overflow-hidden">
          <div className="overflow-x-auto max-h-[calc(100vh-280px)]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-[rgba(20,20,25,0.9)] z-10">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => requestSort('name')}
                    >
                      Name {getSortIcon('name')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => requestSort('platform')}
                    >
                      Platform {getSortIcon('platform')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => requestSort('followers')}
                    >
                      Followers {getSortIcon('followers')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => requestSort('engagement')}
                    >
                      Engagement {getSortIcon('engagement')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Topics</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => requestSort('status')}
                    >
                      Status {getSortIcon('status')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => requestSort('lastContact')}
                    >
                      Last Contact {getSortIcon('lastContact')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => requestSort('value')}
                    >
                      Value {getSortIcon('value')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => requestSort('matchScore')}
                    >
                      Match {getSortIcon('matchScore')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInfluencers.map((influencer) => (
                  <tr 
                    key={influencer.id} 
                    className={`border-t border-[rgba(255,255,255,0.05)] hover:bg-[rgba(20,20,25,0.9)] transition-colors ${selectedRow === influencer.id ? 'bg-[rgba(218,165,32,0.05)]' : ''}`}
                    onClick={() => setSelectedRow(influencer.id)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[rgba(20,20,25,0.6)] border border-[rgba(218,165,32,0.2)] flex items-center justify-center text-sm mr-3 overflow-hidden">
                          <span className="text-[#D4AF37]">{influencer.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{influencer.name}</div>
                          <div className="text-gray-400 text-xs">{influencer.handle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getPlatformColor(influencer.platform)}`}>
                        {influencer.platform}
                      </span>
                    </td>
                    <td className="py-3 px-4">{influencer.followers}</td>
                    <td className="py-3 px-4">{influencer.engagement}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {influencer.topics.slice(0, 2).map((topic, i) => (
                          <span key={i} className="px-2 py-0.5 bg-[rgba(218,165,32,0.07)] text-[#D4AF37] text-xs rounded-full">
                            {topic}
                          </span>
                        ))}
                        {influencer.topics.length > 2 && (
                          <span className="px-2 py-0.5 bg-[rgba(218,165,32,0.03)] text-[#D4AF37] text-xs rounded-full">
                            +{influencer.topics.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(influencer.status)}`}>
                        {influencer.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{influencer.lastContact}</td>
                    <td className="py-3 px-4 text-[#D4AF37]">{influencer.value}</td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-[rgba(20,20,25,0.6)] rounded-full h-1.5">
                        <div 
                          className="bg-[#D4AF37] h-1.5 rounded-full" 
                          style={{ width: influencer.matchScore }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{influencer.matchScore}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 rounded bg-[rgba(218,165,32,0.1)] hover:bg-[rgba(218,165,32,0.2)] transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H16M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="p-1 rounded bg-[rgba(218,165,32,0.1)] hover:bg-[rgba(218,165,32,0.2)] transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.232 5.232L3.32843 17.1356C2.93791 17.5261 2.93791 18.1593 3.32843 18.5498L5.45127 20.6727C5.84179 21.0632 6.47496 21.0632 6.86548 20.6727L18.7691 8.76906M15.232 5.232L19.7694 9.76946" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="p-1 rounded bg-[rgba(218,165,32,0.1)] hover:bg-[rgba(218,165,32,0.2)] transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12V22H4V12M12 17V12M12 12L9 15M12 12L15 15M8 7V3C8 2.46957 8.21071 1.96086 8.58579 1.58579C8.96086 1.21071 9.46957 1 10 1H14C14.5304 1 15.0391 1.21071 15.4142 1.58579C15.7893 1.96086 16 2.46957 16 3V7M2 7H22" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredInfluencers.length === 0 && (
            <div className="py-8 text-center text-gray-400">
              No influencers found matching your search criteria
            </div>
          )}
        </div>
      )}
      
      {/* Quick Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-4">
          <p className="text-sm text-gray-400 mb-1">Total Influencers</p>
          <p className="text-2xl font-bold">{influencerData.length}</p>
        </div>
        <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-4">
          <p className="text-sm text-gray-400 mb-1">Active Negotiations</p>
          <p className="text-2xl font-bold">{influencerData.filter(i => i.status === 'Negotiating').length}</p>
        </div>
        <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-4">
          <p className="text-sm text-gray-400 mb-1">Total Contracts</p>
          <p className="text-2xl font-bold">{influencerData.filter(i => i.status === 'Contracted').length}</p>
        </div>
        <div className="bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] p-4">
          <p className="text-sm text-gray-400 mb-1">Total Investment</p>
          <p className="text-2xl font-bold text-[#D4AF37]">
            {!isLoading && `$${influencerData
              .filter(i => i.status === 'Contracted')
              .reduce((sum, i) => sum + parseInt(i.value.replace(/[^\d]/g, '')), 0)
              .toLocaleString()}`}
          </p>
        </div>
      </div>
      
      {/* Action Bar */}
      <div className="mt-6 flex justify-between items-center bg-[rgba(20,20,25,0.7)] backdrop-blur-sm rounded-xl border border-[rgba(218,165,32,0.1)] px-4 py-3">
        <div className="flex items-center">
          <span className="text-gray-400 mr-2">Quick Actions:</span>
          <button className="text-[#D4AF37] bg-[rgba(218,165,32,0.07)] hover:bg-[rgba(218,165,32,0.12)] px-3 py-1 rounded text-sm mr-2">
            Export Data
          </button>
          <button className="text-[#D4AF37] bg-[rgba(218,165,32,0.07)] hover:bg-[rgba(218,165,32,0.12)] px-3 py-1 rounded text-sm mr-2">
            Generate Report
          </button>
          <button className="text-[#D4AF37] bg-[rgba(218,165,32,0.07)] hover:bg-[rgba(218,165,32,0.12)] px-3 py-1 rounded text-sm">
            Bulk Actions
          </button>
        </div>
        <div className="text-sm text-gray-400">
          Last updated: March 24, 2025
        </div>
      </div>
    </div>
  );
}