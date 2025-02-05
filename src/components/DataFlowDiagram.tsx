import React from 'react';

const DataFlowDiagram: React.FC = () => {
  return (
    <div className="relative py-8 md:py-0" style={{ minHeight: '600px', height: 'auto' }}>
      {/* TWITTER MONITORS */}
      <div className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0 mb-4 md:mb-0">
        <div className="tech-card rounded-none px-4 md:px-6 py-1.5 border border-[#FF6B35]/30 bg-black/90 mx-auto text-center">
          <span className="font-mono text-[11px] md:text-[13px] tracking-[0.2em]">TWITTER MONITORS</span>
        </div>
      </div>

      {/* System Updates */}
      <div className="relative md:absolute md:top-[100px] left-0 right-0 mb-4 md:mb-0">
        <div className="tech-card rounded-none border border-[#FF6B35]/30 bg-black/90 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="py-4 md:py-6 text-center border-b md:border-b-0 md:border-r border-[#FF6B35]/30">
              <div className="font-mono text-[11px] md:text-[13px] mb-2 md:mb-3 tracking-[0.2em]">REALTIME NEWS</div>
              <div className="text-[10px] md:text-[11px] text-gray-500 font-mono leading-relaxed px-2">Neural network processing trends in real-time</div>
            </div>
            <div className="py-4 md:py-6 text-center border-b md:border-b-0 md:border-r border-[#FF6B35]/30">
              <div className="font-mono text-[11px] md:text-[13px] mb-2 md:mb-3 tracking-[0.2em]">TRENDS</div>
              <div className="text-[10px] md:text-[11px] text-gray-500 font-mono leading-relaxed px-2">Market sentiment and pattern analysis</div>
            </div>
            <div className="py-4 md:py-6 text-center">
              <div className="font-mono text-[11px] md:text-[13px] mb-2 md:mb-3 tracking-[0.2em]">KOLS</div>
              <div className="text-[10px] md:text-[11px] text-gray-500 font-mono leading-relaxed px-2">Key opinion leader tracking</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Stack */}
      <div className="relative md:absolute md:top-[280px] left-0 right-0 mb-4 md:mb-0">
        <div className="tech-card rounded-none border border-[#FF6B35]/30 bg-black/90 p-4 md:p-8">
          <h3 className="font-mono text-center mb-6 md:mb-12 text-[11px] md:text-[13px] tracking-[0.2em]">AI STACK: DATA ANALYSIS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            <div className="text-center">
              <div className="tech-card w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-none border border-[#FF6B35]/30 flex items-center justify-center bg-black">
                <span className="text-[#FF6B35] font-mono text-xl md:text-2xl">&gt;_</span>
              </div>
              <span className="font-mono text-[11px] md:text-[13px] block mb-2 md:mb-3 tracking-[0.2em]">DEEPSEEK</span>
              <p className="text-[10px] md:text-[11px] text-gray-500 font-mono leading-relaxed">Automated token launches and profit distribution</p>
            </div>
            <div className="text-center">
              <div className="tech-card w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-none border border-[#FF6B35]/30 flex items-center justify-center bg-black">
                <span className="text-[#FF6B35] font-mono text-xl md:text-2xl">⚡</span>
              </div>
              <span className="font-mono text-[11px] md:text-[13px] block mb-2 md:mb-3 tracking-[0.2em]">GROK</span>
              <p className="text-[10px] md:text-[11px] text-gray-500 font-mono leading-relaxed">Instant market analysis and trend detection</p>
            </div>
            <div className="text-center">
              <div className="tech-card w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-none border border-[#FF6B35]/30 flex items-center justify-center bg-black">
                <span className="text-[#FF6B35] font-mono text-xl md:text-2xl">⚙</span>
              </div>
              <span className="font-mono text-[11px] md:text-[13px] block mb-2 md:mb-3 tracking-[0.2em]">HIVE / BUZZ</span>
              <p className="text-[10px] md:text-[11px] text-gray-500 font-mono leading-relaxed">Multi-agent system for comprehensive analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Box */}
      <div className="relative md:absolute md:top-[600px] md:left-1/2 md:-translate-x-1/2 w-full max-w-xl mx-auto">
        <div className="tech-card rounded-none px-3 md:px-5 py-2 md:py-2.5 border border-[#FF6B35]/30 bg-black/90">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img src="https://swsroot.xyz/assets/pump.png" alt="Pump" className="w-4 h-4" />
            <span className="font-mono text-[11px] md:text-[13px] tracking-[0.2em]">Pump fun token launch</span>
            <span className="text-[#FF6B35] text-[11px] md:text-[13px] font-mono ml-auto tracking-[0.2em]">KORA BUYS 10% AS DEV</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFlowDiagram;