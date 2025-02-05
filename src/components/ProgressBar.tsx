import React from 'react';

const ProgressBar: React.FC = () => {
  const stages = ['ROADMAP', 'GITHUB', 'DEMO', 'BETA', 'RELEASE'];
  const currentStage = 2; // 0-based index
  const progress = 35; // percentage

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="font-mono text-sm tracking-widest text-[#FF6B35] mb-1">DEVELOPMENT PROGRESS: {progress}%</h3>
      </div>

      <div className="tech-card rounded-xl p-6 border border-[#FF6B35]/20 backdrop-blur-sm">
        <div className="relative">
          {/* Main Progress Bar */}
          <div className="h-1 bg-gray-800/50 rounded-full mb-8">
            <div 
              className="h-full bg-[#FF6B35] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute h-3 w-3 rounded-full bg-[#FF6B35] -right-1.5 -top-1 glow-effect"></div>
            </div>
          </div>

          {/* Stage Markers */}
          <div className="flex justify-between relative">
            {stages.map((stage, index) => {
              const isActive = index <= currentStage;
              const isCompleted = index < currentStage;

              return (
                <div 
                  key={stage}
                  className="flex flex-col items-center relative"
                  style={{ width: '20%' }}
                >
                  {/* Connector Line */}
                  {index < stages.length - 1 && (
                    <div className="absolute w-full h-px top-2.5 left-1/2 bg-[#FF6B35]/20"></div>
                  )}

                  {/* Stage Marker */}
                  <div 
                    className={`w-5 h-5 rounded-full mb-3 z-10 flex items-center justify-center
                      ${isActive ? 'border-2 border-[#FF6B35] bg-black' : 'bg-gray-800/50'}
                      ${isCompleted ? 'bg-[#FF6B35]' : ''}
                    `}
                  >
                    {isCompleted && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>

                  {/* Stage Label */}
                  <span className={`font-mono text-xs tracking-wider text-center
                    ${isActive ? 'text-[#FF6B35]' : 'text-gray-600'}
                  `}>
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;