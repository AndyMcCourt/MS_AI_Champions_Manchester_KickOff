import React, { useEffect, useState } from 'react';
import { PresentationSegment } from '../types';
import { QUIZ_DATA } from '../constants';

interface PresentationModalProps {
  segment: PresentationSegment;
  onClose: () => void;
}

const PresentationModal: React.FC<PresentationModalProps> = ({ segment, onClose }) => {
  const [quizMode, setQuizMode] = useState<'intro' | 'question' | 'answer' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const isQuiz = segment.id === 'quiz';
  const isPurpose = segment.id === 'purpose';
  const isEnergizer = segment.id === 'energizer';
  const isKnowledge = segment.id === 'knowledge';
  const isTools = segment.id === 'tools';
  const isChallenge = segment.id === 'challenge';
  const isWorkshop = segment.id === 'workshop';
  const purposeVideoUrl = 'https://mnscorp-my.sharepoint.com/:v:/r/personal/andrew_mccourt_mnscorp_net/Documents/AI%20Champions%20Kick%20Off%20-%20Avatar%20Video.mp4?csf=1&web=1&e=FMGbDj';
  const knowledgeBaseUrl = 'https://mnscorp-my.sharepoint.com/:p:/r/personal/andrew_mccourt_mnscorp_net/Documents/AI%20Champions%20Kick%20Off%20-%20Knowledge%20Base.pptx?d=w67c7e160235843a7abb8f43b5fab2b07&csf=1&web=1&e=FUEOCJ';
  const toolsDeckUrl = 'https://mnscorp-my.sharepoint.com/:p:/g/personal/andrew_mccourt_mnscorp_net/IQAYDMnQtc06SIUNSRJGbEDfAUdpyOkPIyzrHobcVKpKZQo?e=vDKKbV';
  const excelChallengeUrl = 'https://mnscorp.sharepoint.com/:x:/r/sites/FinanceAnalyticsCentreofExcellence/_layouts/15/Doc.aspx?sourcedoc=%7BC7A06B26-876E-4911-A3CB-2F1A5B7D05C9%7D&file=FHB_after.xlsx&action=default&mobileredirect=true';
  const workshopDeckUrl = 'https://mnscorp.sharepoint.com/:p:/r/sites/FinanceAnalyticsCentreofExcellence/_layouts/15/Doc.aspx?sourcedoc=%7B82ECD0D2-CFE0-46CE-97C8-17603AA399DD%7D&file=Use%20Case%20Discovery.pptx&action=view&mobileredirect=true';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        if (!isQuiz || quizMode === 'intro' || quizMode === 'results') {
           if (quizMode !== 'intro' || !isQuiz) {
             e.preventDefault();
             e.stopPropagation();
             onClose();
           }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onClose, isQuiz, quizMode]);

  const startQuiz = () => setQuizMode('question');
  
  const revealAnswers = () => {
    setQuizMode('answer');
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUIZ_DATA.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuizMode('question');
    } else {
      setQuizMode('results');
    }
  };

  const currentQuestion = QUIZ_DATA[currentQuestionIndex];

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

  const renderQuizContent = () => {
    if (quizMode === 'intro') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center gap-12 text-center py-10">
          <div className="relative">
            <div className="absolute -inset-8 bg-cyan-500/10 blur-3xl animate-pulse rounded-full" />
            <h3 className="text-4xl md:text-5xl font-black text-cyan-400 uppercase tracking-[0.2em] relative z-10">
              Engagement Protocol Required
            </h3>
          </div>
          <p className="text-slate-400 text-2xl max-w-2xl leading-relaxed italic">
            {segment.content}
          </p>
          <button 
            onClick={startQuiz}
            className="px-16 py-8 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-4xl rounded-3xl transition-all shadow-[0_0_60px_rgba(6,182,212,0.4)] border-b-8 border-cyan-800 active:translate-y-2 active:border-b-0"
          >
            INITIALIZE SYNC
          </button>
        </div>
      );
    }

    if (quizMode === 'question') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in slide-in-from-bottom duration-500">
           <div className="w-full max-w-5xl bg-slate-800/40 p-16 rounded-[4rem] border-4 border-cyan-500/30 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan" />
              <span className="block text-cyan-500 font-black text-2xl uppercase tracking-[0.5em] mb-8">Incoming Transmission // Q{currentQuestionIndex + 1}</span>
              <h4 className="text-5xl md:text-7xl font-black text-white italic leading-tight tracking-tighter">
                "{currentQuestion.question}"
              </h4>
              <button 
                onClick={revealAnswers}
                className="mt-16 w-full py-8 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-3xl rounded-2xl transition-all shadow-xl"
              >
                ACCESS RANKED DATA
              </button>
           </div>
        </div>
      );
    }

    if (quizMode === 'answer') {
      const mid = Math.ceil(currentQuestion.answers.length / 2);
      const leftCol = currentQuestion.answers.slice(0, mid);
      const rightCol = currentQuestion.answers.slice(mid);

      return (
        <div className="flex-1 flex flex-col items-center justify-start p-2 animate-in fade-in duration-500 overflow-hidden">
           <div className="w-full max-w-7xl h-full flex flex-col">
              <div className="flex justify-between items-end mb-4 border-b-2 border-slate-800 pb-2">
                  <h4 className="text-2xl font-black text-cyan-400 uppercase tracking-widest">Ranked Answer Matrix // Q{currentQuestionIndex + 1}</h4>
                  <div className="text-slate-500 font-mono text-xs uppercase">Status: Decrypted</div>
              </div>
              
              <div className="flex flex-row gap-8 overflow-hidden">
                {/* Left Column */}
                <div className="flex-1 flex flex-col gap-2">
                  {leftCol.map((ans, idx) => (
                    <div key={idx} className="bg-slate-800/40 px-6 py-3 rounded-xl border-l-4 border-cyan-500 flex justify-between items-center group hover:bg-slate-700/60 transition-colors border border-slate-700/30">
                      <span className="text-white text-xl font-bold truncate pr-4">
                        <span className="text-cyan-600/50 mr-3 font-mono">[{String(idx + 1).padStart(2, '0')}]</span> 
                        {ans.text}
                      </span>
                      <div className={`px-4 py-1 rounded-lg font-black text-sm shrink-0 shadow-lg ${ans.points > 0 ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/30' : 'bg-red-900/40 text-red-400 border border-red-500/30'}`}>
                        {ans.points > 0 ? `+${ans.points}` : ans.points}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="flex-1 flex flex-col gap-2">
                  {rightCol.map((ans, idx) => {
                    const actualIdx = mid + idx;
                    return (
                      <div key={actualIdx} className="bg-slate-800/40 px-6 py-3 rounded-xl border-l-4 border-cyan-500 flex justify-between items-center group hover:bg-slate-700/60 transition-colors border border-slate-700/30">
                        <span className="text-white text-xl font-bold truncate pr-4">
                          <span className="text-cyan-600/50 mr-3 font-mono">[{String(actualIdx + 1).padStart(2, '0')}]</span> 
                          {ans.text}
                        </span>
                        <div className={`px-4 py-1 rounded-lg font-black text-sm shrink-0 shadow-lg ${ans.points > 0 ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/30' : 'bg-red-900/40 text-red-400 border border-red-500/30'}`}>
                          {ans.points > 0 ? `+${ans.points}` : ans.points}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto pt-6 pb-2">
                <button 
                    onClick={nextQuestion}
                    className="w-full py-6 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-2xl rounded-2xl transition-all shadow-xl border-t-2 border-cyan-400 active:scale-[0.99]"
                >
                    {currentQuestionIndex < QUIZ_DATA.length - 1 ? 'PROCEED TO NEXT SYNC' : 'COMPLETE PROTOCOL'}
                </button>
              </div>
           </div>
        </div>
      );
    }

    if (quizMode === 'results') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                <h3 className="text-6xl font-black text-green-400 uppercase tracking-tighter mb-4 animate-bounce">SYNC SUCCESSFUL</h3>
                <div className="w-72 h-72 rounded-full border-[15px] border-green-500/20 flex flex-col items-center justify-center mb-12 relative">
                    <div className="absolute inset-0 border-[4px] border-green-500 rounded-full animate-ping opacity-20" />
                    <span className="text-slate-500 text-xl font-bold uppercase tracking-widest">Final Rank</span>
                    <span className="text-8xl font-black text-white leading-none">A+</span>
                </div>
                <p className="text-2xl text-slate-300 font-medium mb-12 max-w-xl">
                    Team knowledge synchronization complete. All strategic directives are now aligned.
                </p>
                <button 
                    onClick={onClose}
                    className="px-16 py-8 bg-green-600 hover:bg-green-500 text-white font-black text-3xl rounded-[2rem] shadow-[0_0_80px_rgba(34,197,94,0.4)] transition-all hover:scale-105"
                >
                    RETURN TO SECTOR ALPHA
                </button>
            </div>
        );
    }

    return null;
  };

  const showDualPane = !isQuiz && !!segment.imageUrl;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4 bg-black/95 backdrop-blur-xl font-sans">
      <div className={`bg-slate-900 border-[6px] md:border-[10px] ${quizMode === 'results' ? 'border-green-500' : 'border-cyan-500'} rounded-[2.5rem] w-[98vw] h-[98vh] shadow-[0_0_150px_rgba(6,182,212,0.3)] transform animate-in fade-in zoom-in duration-300 flex flex-col overflow-hidden`}>
        
        <div className="px-8 md:px-16 pt-4 md:pt-8 shrink-0">
          <div className="flex items-center gap-6 mb-4 border-b-2 border-slate-800 pb-4">
            <span className="text-6xl md:text-7xl drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">{segment.icon}</span>
            <div className="flex flex-col flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tighter uppercase leading-none">
                {segment.title}
              </h2>
              <div className="flex justify-between items-center mt-1">
                <p className="text-slate-500 font-bold tracking-[0.2em] uppercase text-sm">Sector AI Champions // Live Data Feed</p>
                {isQuiz && quizMode !== 'intro' && quizMode !== 'results' && (
                    <div className="flex items-center gap-4">
                         <div className="text-right hidden sm:block">
                             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sync Progress</div>
                             <div className="w-32 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden border border-slate-700">
                                 <div 
                                     className="h-full bg-cyan-500 transition-all duration-500" 
                                     style={{ width: `${((currentQuestionIndex + (quizMode === 'answer' ? 1 : 0)) / QUIZ_DATA.length) * 100}%` }} 
                                 />
                             </div>
                         </div>
                         <div className="bg-cyan-500 text-slate-900 font-black px-4 py-1 rounded-lg text-lg">
                            {currentQuestionIndex + 1}/10
                         </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col px-8 md:px-16 relative">
          <div className="flex-1 flex flex-col min-h-0">
            {isQuiz ? renderQuizContent() : showDualPane ? (
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
                        {(isPurpose || isKnowledge || isTools || isChallenge || isWorkshop) && (
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
                                    : isChallenge
                                    ? excelChallengeUrl
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
                                : isChallenge
                                ? '↗ Launch Excel Challenge'
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

        {(!isQuiz || quizMode === 'intro') && (
            <div className="px-8 md:px-16 pb-6 md:pb-10 shrink-0">
                <button
                    onClick={onClose}
                    className={`w-full ${segment.id === 'thanks' ? 'bg-red-600 hover:bg-red-500 shadow-[0_0_40px_rgba(220,38,38,0.3)]' : 'bg-slate-800 hover:bg-slate-700'} text-white font-black py-6 rounded-[1.5rem] transition-all active:scale-[0.98] flex items-center justify-center gap-6 group text-2xl md:text-3xl uppercase tracking-widest`}
                >
                    <span>{segment.id === 'thanks' ? 'Decommission Presentation' : 'Return to Game'}</span>
                    <span className="group-hover:translate-x-3 transition-transform text-4xl">→</span>
                </button>
            </div>
        )}

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
