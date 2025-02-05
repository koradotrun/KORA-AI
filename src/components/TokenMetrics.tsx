import React from 'react';
import { LineChart, Wallet } from 'lucide-react';

const TokenMetrics: React.FC = () => {
  return (
    <div className="tech-card rounded-xl p-6 border border-[#FF6B35]/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Wallet className="w-5 h-5 text-[#FF6B35]" />
          <span className="font-mono text-sm">TOKEN METRICS</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></span>
          <span className="text-xs font-mono text-gray-400">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="tech-card rounded-lg p-4 border border-[#FF6B35]/10">
          <div className="text-xs font-mono text-gray-400 mb-1">MARKET CAP</div>
          <div className="text-lg font-mono">$12.5M</div>
          <div className="text-xs font-mono text-green-400">+15.4%</div>
        </div>

        <div className="tech-card rounded-lg p-4 border border-[#FF6B35]/10">
          <div className="text-xs font-mono text-gray-400 mb-1">CIRCULATING SUPPLY</div>
          <div className="text-lg font-mono">1.2M KORA</div>
          <div className="text-xs font-mono text-gray-400">of 10M total</div>
        </div>

        <div className="tech-card rounded-lg p-4 border border-[#FF6B35]/10">
          <div className="text-xs font-mono text-gray-400 mb-1">BURNED</div>
          <div className="text-lg font-mono">245K KORA</div>
          <div className="text-xs font-mono text-green-400">+2.4% this week</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-[100px] relative">
          {/* Placeholder for chart - in production, use a proper charting library */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B35]/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-[#FF6B35]/5 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default TokenMetrics;