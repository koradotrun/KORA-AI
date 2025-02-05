import React, { useState, useEffect } from 'react';
import { Github, Twitter, Bot, Cpu, Database, Network, LineChart, Terminal, Shield, Zap, Code, Rocket } from 'lucide-react';
import Logo from './components/Logo';
import DataFlowDiagram from './components/DataFlowDiagram';
import ProgressBar from './components/ProgressBar';
import TechBackground from './components/TechBackground';
import NewsTerminal from './components/NewsTerminal';
import Modal from './components/Modal';
import DocsModal from './components/DocsModal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunchClick = () => {
    setIsModalOpen(true);
  };

  const handleDocsClick = () => {
    setIsDocsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <TechBackground />
      
      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DocsModal isOpen={isDocsModalOpen} onClose={() => setIsDocsModalOpen(false)} />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-black z-50">
        <div 
          className="h-full bg-[#FF6B35] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-[#FF6B35]/20 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="tech-card rounded-lg px-4 py-2 border border-[#FF6B35]/30">
              <div className="flex items-center space-x-2">
                <img src="https://swsroot.xyz/assets/kora.png" alt="KORA" className="w-6 h-6" />
                <span className="font-mono font-bold text-xl gradient-text tracking-wider">KORA</span>
              </div>
            </div>
            
            <button 
              className="md:hidden tech-card rounded-lg p-2 border border-[#FF6B35]/30"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-[#FF6B35]"></div>
                <div className="w-6 h-0.5 bg-[#FF6B35]"></div>
                <div className="w-6 h-0.5 bg-[#FF6B35]"></div>
              </div>
            </button>

            <div className="hidden md:flex items-center space-x-6">
              <a href="https://github.com/koradotrun" target="_blank" rel="noopener noreferrer" className="tech-card rounded-lg px-3 py-2 border border-[#FF6B35]/10 hover:border-[#FF6B35]/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Github size={16} className="text-[#FF6B35]" />
                  <span className="font-mono text-sm">GITHUB</span>
                </div>
              </a>
              <a href="https://x.com/koradotrun" target="_blank" rel="noopener noreferrer" className="tech-card rounded-lg px-3 py-2 border border-[#FF6B35]/10 hover:border-[#FF6B35]/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Twitter size={16} className="text-[#FF6B35]" />
                  <span className="font-mono text-sm">TWITTER</span>
                </div>
              </a>
              <a href="https://t.me/koradotrun" target="_blank" rel="noopener noreferrer" className="tech-card rounded-lg px-3 py-2 border border-[#FF6B35]/10 hover:border-[#FF6B35]/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Network size={16} className="text-[#FF6B35]" />
                  <span className="font-mono text-sm">TELEGRAM</span>
                </div>
              </a>
              <button 
                onClick={handleLaunchClick}
                className="tech-card rounded-lg px-4 py-2 border-2 border-[#FF6B35] hover:bg-[#FF6B35]/10 transition-all duration-300"
              >
                <span className="font-mono text-sm font-bold">LAUNCH APP</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 space-y-2`}>
            <a href="https://github.com/koradotrun" target="_blank" rel="noopener noreferrer" className="tech-card block rounded-lg px-3 py-2 border border-[#FF6B35]/10">
              <div className="flex items-center space-x-2">
                <Github size={16} className="text-[#FF6B35]" />
                <span className="font-mono text-sm">GITHUB</span>
              </div>
            </a>
            <a href="https://x.com/koradotrun" target="_blank" rel="noopener noreferrer" className="tech-card block rounded-lg px-3 py-2 border border-[#FF6B35]/10">
              <div className="flex items-center space-x-2">
                <Twitter size={16} className="text-[#FF6B35]" />
                <span className="font-mono text-sm">TWITTER</span>
              </div>
            </a>
            <a href="https://t.me/koradotrun" target="_blank" rel="noopener noreferrer" className="tech-card block rounded-lg px-3 py-2 border border-[#FF6B35]/10">
              <div className="flex items-center space-x-2">
                <Network size={16} className="text-[#FF6B35]" />
                <span className="font-mono text-sm">TELEGRAM</span>
              </div>
            </a>
            <button 
              onClick={handleLaunchClick}
              className="tech-card w-full rounded-lg px-4 py-2 border-2 border-[#FF6B35] hover:bg-[#FF6B35]/10 transition-all duration-300"
            >
              <span className="font-mono text-sm font-bold">LAUNCH APP</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="tech-card inline-block rounded-lg p-4 border-2 border-[#FF6B35]/30 glow-effect backdrop-blur-sm mb-6">
              <Terminal className="w-8 md:w-12 h-8 md:h-12 text-[#FF6B35]" />
            </div>
          </div>
          <div className="tech-card rounded-xl p-4 md:p-8 border border-[#FF6B35]/20 backdrop-blur-sm mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-mono font-bold mb-4 gradient-text tracking-tight">
              FINANCIAL REAL-TIME INSIGHT & DATA
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl text-gray-400 font-mono tracking-widest mb-6">
              AGGREGATOR FOR YIELD
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></span>
              <span className="font-mono text-xs md:text-sm text-gray-400">SYSTEM STATUS: OPERATIONAL</span>
            </div>
            <p className="max-w-2xl mx-auto text-gray-400 mb-6 font-mono text-xs md:text-sm leading-relaxed px-2 md:px-0">
              KORA is an AI-driven platform that gathers real-time insights to generate taboos based on current events and market trends.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleLaunchClick}
                className="tech-card w-full md:w-auto rounded-lg px-6 py-3 border-2 border-[#FF6B35] hover:bg-[#FF6B35]/10 transition-all duration-300"
              >
                <span className="font-mono text-sm font-bold">GET STARTED</span>
              </button>
              <button 
                onClick={handleDocsClick}
                className="tech-card w-full md:w-auto rounded-lg px-6 py-3 border border-[#FF6B35]/30 hover:border-[#FF6B35] transition-all duration-300"
              >
                <span className="font-mono text-sm">READ DOCS</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Terminal Section */}
      <section className="py-12 px-4 relative">
        <div className="container mx-auto">
          <NewsTerminal />
        </div>
      </section>

      {/* Data Flow Section */}
      <section className="py-12 px-4 relative">
        <div className="container mx-auto">
          <DataFlowDiagram />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 md:py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Shield className="w-6 md:w-8 h-6 md:h-8" />, title: "SMART CONTRACTS", desc: "Automated token launches and profit distribution" },
              { icon: <Database className="w-6 md:w-8 h-6 md:h-8" />, title: "REAL-TIME DATA", desc: "Instant market analysis and trend detection" },
              { icon: <Network className="w-6 md:w-8 h-6 md:h-8" />, title: "AI NETWORK", desc: "Multi-agent system for comprehensive analysis" },
              { icon: <Cpu className="w-6 md:w-8 h-6 md:h-8" />, title: "NEURAL PROCESSING", desc: "Advanced pattern recognition and prediction" }
            ].map((item, i) => (
              <div key={i} className="tech-card rounded-xl p-4 md:p-6 border border-[#FF6B35]/20 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 md:mb-4 text-[#FF6B35]">{item.icon}</div>
                  <h3 className="font-mono text-xs md:text-sm font-bold mb-2">{item.title}</h3>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent mb-3 md:mb-4"></div>
                  <p className="text-gray-400 font-mono text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-12 md:py-20 px-4 relative">
        <div className="container mx-auto">
          <ProgressBar />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 px-4 relative">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Core Directive */}
          <div className="tech-card rounded-xl p-6 md:p-8 border border-[#FF6B35]/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Terminal className="w-5 md:w-6 h-5 md:h-6 text-[#FF6B35]" />
              <h3 className="font-mono text-xs md:text-sm font-bold gradient-text">CORE DIRECTIVE</h3>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent mb-4"></div>
            <p className="text-gray-400 font-mono text-xs leading-relaxed">
              Launch tokens on pump fun based on current news and market trends. Our AI gathers information and analyzes data from various sources using different AI systems and techniques.
            </p>
          </div>

          {/* Key Features */}
          <div className="tech-card rounded-xl p-6 md:p-8 border border-[#FF6B35]/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-5 md:w-6 h-5 md:h-6 text-[#FF6B35]" />
              <h3 className="font-mono text-xs md:text-sm font-bold gradient-text">KEY FEATURES</h3>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent mb-4"></div>
            <ul className="space-y-3 font-mono text-xs">
              {[
                "Gathers information from multiple data sources",
                "Launches tokens based on market trends",
                "Analyzes market trends using AI agents",
                "Improves exponentially over time"
              ].map((feature, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full"></span>
                  <span className="text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="tech-card rounded-xl p-6 md:p-8 border border-[#FF6B35]/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <LineChart className="w-5 md:w-6 h-5 md:h-6 text-[#FF6B35]" />
              <h3 className="font-mono text-xs md:text-sm font-bold gradient-text">VISION</h3>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent mb-4"></div>
            <p className="text-gray-400 font-mono text-xs leading-relaxed">
              This AI agent is more than just a tool—it's a catalyst for innovation. We're creating possibilities for developers and enthusiasts to collaborate and shape the future of decentralized finance.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#FF6B35]/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Grid Background for Footer */}
          <div className="absolute inset-0 tech-grid opacity-5"></div>
          
          {/* Main Footer Content */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="https://swsroot.xyz/assets/kora.png" alt="KORA" className="w-6 h-6" />
                <span className="font-mono text-xl gradient-text font-bold tracking-wider">KORA</span>
              </div>
              <p className="font-mono text-sm text-gray-400 max-w-sm">
                Financial real-time insight & data aggregator for yield. Powered by advanced AI technology.
              </p>
              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></span>
                  <span className="font-mono text-xs text-gray-400">All Systems Operational</span>
                </div>
              </div>
            </div>

            {/* Connect Section */}
            <div className="space-y-4">
              <h3 className="font-mono text-sm text-[#FF6B35] tracking-wider">CONNECT</h3>
              <div className="flex flex-wrap gap-2">
                <a href="https://github.com/koradotrun" target="_blank" rel="noopener noreferrer" className="tech-card rounded-lg p-3 border border-[#FF6B35]/10 hover:border-[#FF6B35]/30 transition-all duration-300">
                  <Github className="w-5 h-5 text-[#FF6B35]" />
                </a>
                <a href="https://x.com/koradotrun" target="_blank" rel="noopener noreferrer" className="tech-card rounded-lg p-3 border border-[#FF6B35]/10 hover:border-[#FF6B35]/30 transition-all duration-300">
                  <Twitter className="w-5 h-5 text-[#FF6B35]" />
                </a>
                <a href="https://t.me/koradotrun" target="_blank" rel="noopener noreferrer" className="tech-card rounded-lg p-3 border border-[#FF6B35]/10 hover:border-[#FF6B35]/30 transition-all duration-300">
                  <Network className="w-5 h-5 text-[#FF6B35]" />
                </a>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleLaunchClick}
                    className="tech-card rounded-lg px-3 py-2 border border-[#FF6B35]/30 hover:border-[#FF6B35] transition-all duration-300 text-[#FF6B35] hover:text-white"
                  >
                    <span className="font-mono text-xs tracking-wider">LAUNCH</span>
                  </button>
                  <div className="tech-card flex-1 rounded-lg px-3 py-2 border border-[#FF6B35]/10">
                    <span className="font-mono text-xs text-gray-500">BETA COMING SOON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 mt-12 pt-6 border-t border-[#FF6B35]/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="tech-card rounded-lg px-4 py-2 border border-[#FF6B35]/20">
                <span className="font-mono text-xs text-gray-400">© 2025 KORA.RUN - All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="tech-card rounded-lg px-4 py-2 border border-[#FF6B35]/20">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-gray-400">Built with</span>
                    <Zap className="w-4 h-4 text-[#FF6B35]" />
                    <span className="font-mono text-xs text-gray-400">in Web3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;