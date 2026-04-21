import React, { useEffect } from 'react';
import { PresentationSegment } from '../types';

interface PresentationModalProps {
  segment: PresentationSegment;
  onClose: () => void;
}

const PresentationModal: React.FC<PresentationModalProps> = ({ segment, onClose }) => {
  const isPurpose = segment.id === 'purpose';
  const isEnergizer = segment.id === 'energizer';
  const isKnowledge = segment.id === 'knowledge';
  const isTools = segment.id === 'tools';
  const isWorkshop = segment.id === 'workshop';
  const purposeVideoUrl = 'https://mnscorp-my.sharepoint.com/:v:/r/personal/andrew_mccourt_mnscorp_net/Documents/AI%20Champions%20Kick%20Off%20-%20Avatar%20Video.mp4?csf=1&web=1&e=FMGbDj';
  const knowledgeBaseUrl = 'https://mnscorp-my.sharepoint.com/:p:/r/personal/andrew_mccourt_mnscorp_net/Documents/AI%20Champions%20Kick%20Off%20-%20Knowledge%20Base.pptx?d=w67c7e160235843a7abb8f43b5fab2b07&csf=1&web=1&e=FUEOCJ';
  const toolsDeckUrl = 'https://mnscorp-my.sharepoint.com/:p:/g/personal/andrew_mccourt_mnscorp_net/IQAYDMnQtc06SIUNSRJGbEDfAUdpyOkPIyzrHobcVKpKZQo?e=vDKKbV';
  const workshopDeckUrl = 'https://mnscorp.sharepoint.com/:p:/r/sites/FinanceAnalyticsCentreofExcellence/_layouts/15/Doc.aspx?sourcedoc=%7B82ECD0D2-CFE0-46CE-97C8-17603AA399DD%7D&file=Use%20Case%20Discovery.pptx&action=view&mobileredirect=true';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onClose]);

  const parseNumberedPoints = (text: string) => {
    const numberedChunks = text.split(/\(\d+\)\s*/).map(chunk => chunk.trim());
    if (numberedChunks.length < 3) {
      return null;
    }

    const intro = numberedChunks[0].replace(/\s*:\s*$/, '');
    const items = numberedChunks
      .slice(1)
      .map(item => item.replace(/^(and\s+)/i, '').replace(/[,.]\s*$/, '').trim())
      .filter(Boolean);

    if (items.length < 2) {
      return null;
    }

    return { intro, items };
  };

  const listContent = segment.content ? parseNumberedPoints(segment.content) : null;
  const shouldCenterBodyText = !listContent;
  const isQuotedContent =
    !!segment.content &&
    ((segment.content.trim().startsWith('"') && segment.content.trim().includes('"', 1)) ||
      (segment.content.trim().startsWith('“') && segment.content.trim().includes('”')));



  const showDualPane = !!segment.imageUrl;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4 bg-black/95 backdrop-blur-xl font-sans">
      <div className="bg-slate-900 border-[6px] md:border-[10px] border-cyan-500 rounded-[2.5rem] w-[98vw] h-[98vh] shadow-[0_0_150px_rgba(6,182,212,0.3)] transform animate-in fade-in zoom-in duration-300 flex flex-col overflow-hidden">
        
        <div className="px-8 md:px-16 pt-4 md:pt-8 shrink-0">
          <div className="flex items-center gap-6 mb-4 border-b-2 border-slate-800 pb-4">
            <span className="text-6xl md:text-7xl drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">{segment.icon}</span>
            <div className="flex flex-col flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tighter uppercase leading-none">
                {segment.title}
              </h2>
              <div className="flex justify-between items-center mt-1">
                <p className="text-slate-500 font-bold tracking-[0.2em] uppercase text-sm">Sector AI Champions // Live Data Feed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col px-8 md:px-16 relative">
          <div className="flex-1 flex flex-col min-h-0">
            {showDualPane ? (
              <div className="flex-1 flex flex-col md:flex-row items-stretch gap-10 py-4">
                <div className={`w-full ${segment.id === 'outline' ? 'md:w-[480px]' : segment.id === 'microsoft' ? 'md:w-[510px]' : 'md:w-[340px]'} shrink-0 flex flex-col items-center justify-center relative`}>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        <div className="w-[120%] h-[120%] border-[20px] border-cyan-500/20 rounded-full animate-ping duration-[4s]" />
                    </div>
                    <div className="relative z-10 w-full">
                        <div className="absolute -top-4 -left-2 w-12 h-12 border-t-4 border-l-4 border-cyan-500 animate-pulse" />
                        <div className="absolute -bottom-4 -right-2 w-12 h-12 border-b-4 border-r-4 border-cyan-500 animate-pulse" />
                        <div className={`aspect-square md:w-full rounded-[1.5rem] border-[8px] border-slate-800 overflow-hidden shadow-2xl ${segment.id === 'outline' ? 'bg-white p-4' : 'bg-slate-800'}`}>
                            <img 
                                src={segment.imageUrl} 
                                alt={segment.title} 
                                className={`w-full h-full ${segment.id === 'outline' ? 'object-contain' : 'object-cover'}`}
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-stretch relative">
                    <div className={`relative z-10 bg-slate-800/20 p-8 md:p-10 rounded-[2.5rem] border-2 border-slate-700/40 backdrop-blur-sm overflow-hidden h-full flex flex-col ${shouldCenterBodyText ? 'justify-center' : 'justify-start'}`}>
                        {listContent ? (
                          <div className={`text-slate-100 font-semibold tracking-tight h-full overflow-y-auto custom-scrollbar-v pr-4 text-left ${
                            isEnergizer ? 'text-2xl md:text-4xl leading-[1.18] px-4' : 'text-xl md:text-2xl leading-[1.45]'
                          }`}>
                            <p>{listContent.intro}:</p>
                            <ul className="mt-4 list-disc pl-8 space-y-4">
                              {listContent.items.map((item, index) => (
                                <li key={`${segment.id}-item-${index}`}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className={`text-slate-100 whitespace-pre-wrap font-semibold tracking-tight h-full overflow-y-auto custom-scrollbar-v pr-4 ${
                            shouldCenterBodyText
                              ? 'flex items-center text-left text-2xl md:text-4xl leading-[1.18] px-4'
                              : 'text-left text-xl md:text-2xl leading-[1.42]'
                          } ${isQuotedContent ? 'italic' : 'not-italic'}`}>
                              {segment.content || "Standby for incoming transmission..."}
                          </div>
                        )}
                        {(isPurpose || isKnowledge || isTools || isWorkshop) && (
                          <div className="mt-8">
                            <button
                              onClick={() =>
                                window.open(
                                  isPurpose
                                    ? purposeVideoUrl
                                    : isKnowledge
                                    ? knowledgeBaseUrl
                                    : isTools
                                    ? toolsDeckUrl
                                    : workshopDeckUrl,
                                  '_blank',
                                  'noopener,noreferrer'
                                )
                              }
                              className="w-full md:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-lg md:text-xl rounded-2xl transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] uppercase tracking-wide"
                            >
                              {isPurpose
                                ? '↗ Open Purpose Video'
                                : isKnowledge
                                ? '↗ Open Knowledge Base'
                                : isTools
                                ? '↗ Open Tools Deck'
                                : '↗ Launch Workshop Deck'}
                            </button>
                          </div>
                        )}
                    </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar-v flex items-center justify-center">
                <div className="text-slate-200 text-3xl md:text-5xl leading-[1.3] font-black italic text-center max-w-5xl">
                  {listContent ? (
                    <div>
                      <p>{listContent.intro}:</p>
                      <ul className="mt-6 list-disc text-left pl-12 space-y-4 text-2xl md:text-4xl">
                        {listContent.items.map((item, index) => (
                          <li key={`${segment.id}-single-item-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap">{segment.content || "Standby for incoming transmission..."}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-8 md:px-16 pb-6 md:pb-10 shrink-0">
          <button
            onClick={onClose}
            className={`w-full ${segment.id === 'thanks' ? 'bg-red-600 hover:bg-red-500 shadow-[0_0_40px_rgba(220,38,38,0.3)]' : 'bg-slate-800 hover:bg-slate-700'} text-white font-black py-6 rounded-[1.5rem] transition-all active:scale-[0.98] flex items-center justify-center gap-6 group text-2xl md:text-3xl uppercase tracking-widest`}
          >
            <span>{segment.id === 'thanks' ? 'Decommission Presentation' : 'Return to Game'}</span>
            <span className="group-hover:translate-x-3 transition-transform text-4xl">→</span>
          </button>
        </div>

        <style>{`
          .custom-scrollbar-v::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar-v::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar-v::-webkit-scrollbar-thumb {
            background: #0891b2;
            border-radius: 4px;
          }
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-scan {
            animation: scan 3s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PresentationModal;
