import React from 'react';
import { X, Network } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="tech-card relative w-full max-w-md rounded-xl border border-[#FF6B35]/30 bg-black/90 backdrop-blur-md p-6 md:p-8">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mb-6">
            <div className="tech-card inline-block rounded-lg p-4 border border-[#FF6B35]/30 mb-4">
              <Network className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <h3 className="font-mono text-xl font-bold mb-2">COMING SOON</h3>
            <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent mb-4"></div>
            <p className="text-gray-400 font-mono text-sm leading-relaxed mb-4">
              This feature will be available in the upcoming beta release. Check our progress bar for the latest development updates.
            </p>
            <div className="tech-card rounded-lg p-3 border border-[#FF6B35]/10 bg-black/50">
              <p className="text-[#FF6B35] font-mono text-xs">
                Current Development Progress: 35%
              </p>
            </div>
          </div>

          <a 
            href="https://t.me/koradotrun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="tech-card block w-full rounded-lg px-6 py-3 border-2 border-[#FF6B35] hover:bg-[#FF6B35]/10 transition-all duration-300"
          >
            <span className="font-mono text-sm font-bold">JOIN TELEGRAM</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;