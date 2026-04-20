
import React, { useRef, useEffect, useState } from 'react';
import { SEGMENTS, GAME_CONFIG, PLATFORMS } from '../constants';
import { Player, Entity, Platform } from '../types';
import PresentationModal from './PresentationModal';
import aiChampionsLogo from '../assets/ai-champions-logo.png';

const GameView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const [visitedSegmentIds, setVisitedSegmentIds] = useState<Set<string>>(new Set());
  const [hasStarted, setHasStarted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const logoImageRef = useRef<HTMLImageElement | null>(null);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  // Player state
  const player = useRef<Player>({
    x: 200,
    y: 0, // Drop from the top
    vx: 0,
    vy: 0,
    width: GAME_CONFIG.PLAYER_SIZE,
    height: GAME_CONFIG.PLAYER_SIZE,
    facing: 'right',
    onGround: false
  });

  // Camera state
  const camera = useRef({ x: 0, y: 0 });

  // Entity placement (the icons)
  const entities = useRef<Entity[]>(SEGMENTS.map((s, i) => ({
    x: 800 + (i * 1000), // Adjusted for more items
    y: 400 + (Math.sin(i) * 30),
    segmentId: s.id,
    icon: s.icon,
    collected: false,
    lastCollectedAt: 0
  })));

  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys.current[e.code] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.code] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const logo = new Image();
    logo.src = aiChampionsLogo;
    logo.onload = () => {
      logoImageRef.current = logo;
      setIsLogoLoaded(true);
    };
  }, []);

  const resetGame = () => {
    setVisitedSegmentIds(new Set());
    setActiveSegmentId(null);
    setIsClosing(false);
    setIsFullyClosed(false);
    setHasStarted(false);
    player.current = {
      x: 200,
      y: 0,
      vx: 0,
      vy: 0,
      width: GAME_CONFIG.PLAYER_SIZE,
      height: GAME_CONFIG.PLAYER_SIZE,
      facing: 'right',
      onGround: false
    };
    camera.current = { x: 0, y: 0 };
    entities.current.forEach(e => {
      e.collected = false;
      e.lastCollectedAt = 0;
    });
    keys.current = {};
  };

  const closeSegment = () => {
    if (activeSegmentId === 'thanks') {
      setIsClosing(true);
      setTimeout(() => {
        setIsFullyClosed(true);
      }, 1000);
      return;
    }
    setActiveSegmentId(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyClosed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;

    const update = () => {
      if (!hasStarted || activeSegmentId || isClosing) {
        render();
        animationFrame = requestAnimationFrame(update);
        return;
      }

      // Input handling
      if (keys.current['ArrowLeft'] || keys.current['KeyA']) {
        player.current.vx -= GAME_CONFIG.ACCELERATION;
        player.current.facing = 'left';
      } else if (keys.current['ArrowRight'] || keys.current['KeyD']) {
        player.current.vx += GAME_CONFIG.ACCELERATION;
        player.current.facing = 'right';
      } else {
        player.current.vx *= GAME_CONFIG.FRICTION;
      }

      // Jump
      if ((keys.current['Space'] || keys.current['ArrowUp'] || keys.current['KeyW']) && player.current.onGround) {
        player.current.vy = GAME_CONFIG.JUMP_FORCE;
        player.current.onGround = false;
      }

      // Apply Gravity
      player.current.vy += GAME_CONFIG.GRAVITY;

      // Limit Speed
      if (Math.abs(player.current.vx) > GAME_CONFIG.MAX_SPEED) {
        player.current.vx = Math.sign(player.current.vx) * GAME_CONFIG.MAX_SPEED;
      }

      // Horizontal Collision
      player.current.x += player.current.vx;
      checkCollisions(true);

      // Vertical Collision
      player.current.y += player.current.vy;
      player.current.onGround = false;
      checkCollisions(false);

      // Boundary check
      if (player.current.x < 0) player.current.x = 0;
      if (player.current.y > GAME_CONFIG.LEVEL_HEIGHT + 500) {
        player.current.y = 0;
        player.current.vy = 0;
        player.current.x = Math.max(100, player.current.x - 500);
      }

      // Entity Interaction
      const now = Date.now();
      entities.current.forEach(entity => {
        // 2 Second Cooldown Logic
        if (entity.lastCollectedAt && now - entity.lastCollectedAt < 2000) return;

        const dx = (player.current.x + player.current.width/2) - entity.x;
        const dy = (player.current.y + player.current.height/2) - entity.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 80) {
          entity.lastCollectedAt = now;
          entity.collected = true; // Mark as collected at least once
          setActiveSegmentId(entity.segmentId);
          setVisitedSegmentIds(prev => new Set(prev).add(entity.segmentId));
        }
      });

      // Camera Follow
      camera.current.x = player.current.x - canvas.width / 2 + player.current.width / 2;
      camera.current.y = player.current.y - canvas.height / 2 + player.current.height / 2;
      
      camera.current.x = Math.max(0, Math.min(camera.current.x, GAME_CONFIG.LEVEL_WIDTH - canvas.width));
      camera.current.y = Math.max(0, Math.min(camera.current.y, GAME_CONFIG.LEVEL_HEIGHT - canvas.height));

      render();
      animationFrame = requestAnimationFrame(update);
    };

    const checkCollisions = (horizontal: boolean) => {
      PLATFORMS.forEach(plat => {
        if (
          player.current.x < plat.x + plat.w &&
          player.current.x + player.current.width > plat.x &&
          player.current.y < plat.y + plat.h &&
          player.current.y + player.current.height > plat.y
        ) {
          if (horizontal) {
            if (player.current.vx > 0) player.current.x = plat.x - player.current.width;
            if (player.current.vx < 0) player.current.x = plat.x + plat.w;
            player.current.vx = 0;
          } else {
            if (player.current.vy > 0) {
              player.current.y = plat.y - player.current.height;
              player.current.onGround = true;
            }
            if (player.current.vy < 0) player.current.y = plat.y + plat.h;
            player.current.vy = 0;
          }
        }
      });
    };

    const render = () => {
      const { width, height } = canvas;
      const now = Date.now();
      ctx.clearRect(0, 0, width, height);

      drawBackground(ctx, width, height);

      ctx.save();
      ctx.translate(-camera.current.x, -camera.current.y);

      PLATFORMS.forEach(plat => {
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#06b6d4';
        
        ctx.beginPath();
        ctx.roundRect(plat.x, plat.y, plat.w, plat.h, 8);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
        ctx.beginPath();
        for(let lx = plat.x + 20; lx < plat.x + plat.w; lx += 40) {
          ctx.moveTo(lx, plat.y);
          ctx.lineTo(lx, plat.y + plat.h);
        }
        ctx.stroke();
      });

      entities.current.forEach(ent => {
        const isVisited = visitedSegmentIds.has(ent.segmentId);
        const inCooldown = ent.lastCollectedAt && (now - ent.lastCollectedAt < 2000);
        
        ctx.save();
        ctx.translate(ent.x, ent.y + Math.sin(Date.now() / 300) * 15);
        
        // Only show glow if NOT in cooldown
        if (!inCooldown) {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 80);
          gradient.addColorStop(0, 'rgba(34, 211, 238, 0.4)');
          gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, 80, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.font = '60px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Visual feedback for cooldown
        ctx.globalAlpha = inCooldown ? 0.2 : 1;
        
        // Optional: grayscale or desaturate in cooldown would be nice but requires pixel manipulation or SVG filters. 
        // Simple alpha and removing the glow is effective for a 2D canvas.
        ctx.fillText(ent.icon, 0, 0);

        ctx.font = 'bold 20px sans-serif';
        ctx.fillStyle = '#ffffff';
        // Keep title slightly more visible than icon during cooldown for readability
        ctx.globalAlpha = inCooldown ? 0.4 : 1;
        const seg = SEGMENTS.find(s => s.id === ent.segmentId);
        ctx.fillText(seg?.shortName.toUpperCase() || "", 0, -60);

        // Progress bar for cooldown
        if (inCooldown && ent.lastCollectedAt) {
          const elapsed = now - ent.lastCollectedAt;
          const progress = elapsed / 2000;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.fillRect(-40, 60, 80, 6);
          ctx.fillStyle = '#22d3ee';
          ctx.fillRect(-40, 60, 80 * progress, 6);
        }
        
        ctx.restore();
      });

      // Draw Player
      ctx.save();
      const px = player.current.x;
      const py = player.current.y;
      const pw = player.current.width;
      const ph = player.current.height;
      const isRight = player.current.facing === 'right';

      // Simple Pixel Art Man
      const drawPixel = (x: number, y: number, w: number, h: number, color: string) => {
        ctx.fillStyle = color;
        // Flip x if facing left
        const finalX = isRight ? px + x : px + pw - x - w;
        ctx.fillRect(finalX, py + y, w, h);
      };

      const pSize = pw / 8; // 8x8 grid

      // Hair (Orange)
      drawPixel(pSize * 1, 0, pSize * 6, pSize * 2, '#f97316'); // Top hair
      drawPixel(pSize * 0, pSize * 1, pSize * 2, pSize * 3, '#f97316'); // Side hair
      
      // Face (Skin)
      drawPixel(pSize * 2, pSize * 2, pSize * 5, pSize * 3, '#ffedd5');
      
      // Eyes (Two eyes for better visibility, drawPixel handles the flip)
      drawPixel(pSize * 3, pSize * 3, pSize * 1, pSize * 1, '#000000');
      drawPixel(pSize * 5, pSize * 3, pSize * 1, pSize * 1, '#000000');
      
      // Shirt (Blue)
      drawPixel(pSize * 1, pSize * 5, pSize * 6, pSize * 2, '#2563eb');
      
      // Pants (Dark Blue)
      drawPixel(pSize * 1, pSize * 7, pSize * 6, pSize * 1, '#1e3a8a');
      
      ctx.restore();
      ctx.restore();

      if (!hasStarted) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
        ctx.fillRect(0, 0, width, height);

        const stackTop = Math.max(36, height * 0.05);
        let currentY = stackTop;
        let logoTopY = stackTop;
        let logoHeight = 0;

        if (isLogoLoaded && logoImageRef.current) {
          const maxLogoWidth = Math.min(760, width * 0.62);
          const scale = maxLogoWidth / logoImageRef.current.width;
          const logoWidth = logoImageRef.current.width * scale;
          logoHeight = logoImageRef.current.height * scale;
          logoTopY = Math.max(24, (height - logoHeight) / 2);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(
            logoImageRef.current,
            width / 2 - logoWidth / 2,
            logoTopY,
            logoWidth,
            logoHeight
          );
          currentY = logoTopY + logoHeight;
        }

        const drawTextPanel = (
          text: string,
          y: number,
          font: string,
          textColor: string,
          bgColor: string
        ) => {
          ctx.font = font;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const metrics = ctx.measureText(text);
          const boxWidth = metrics.width + 56;
          const boxHeight = 62;
          const boxX = width / 2 - boxWidth / 2;
          const boxY = y - boxHeight / 2;

          ctx.fillStyle = bgColor;
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.28)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 14);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = textColor;
          ctx.fillText(text, width / 2, y);
        };

        const infoPanelGap = 62;
        const panelStackHeight = infoPanelGap * 2;
        const centeredStackTop = (height / 2) - (panelStackHeight / 2);
        const infoPanelStartY = Math.max(120, centeredStackTop);

        drawTextPanel(
          "AI CHAMPIONS: MANCHESTER KICK OFF",
          infoPanelStartY,
          'bold 54px sans-serif',
          '#22d3ee',
          'rgba(2, 6, 23, 0.66)'
        );
        drawTextPanel(
          "W/A/S/D or Arrows: Move & Jump • Collect Icons to Present",
          infoPanelStartY + infoPanelGap,
          '28px sans-serif',
          '#cbd5e1',
          'rgba(2, 6, 23, 0.6)'
        );
        drawTextPanel(
          "CLICK ANYWHERE TO INITIALIZE",
          infoPanelStartY + (infoPanelGap * 2),
          'bold 30px sans-serif',
          '#22d3ee',
          'rgba(2, 6, 23, 0.66)'
        );

      }

      if (isClosing) {
        ctx.fillStyle = 'black';
        ctx.globalAlpha = Math.min(1, (Date.now() % 1000) / 1000);
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
      }
    };

    const drawBackground = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#020617');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      const offsetX = (-camera.current.x * 0.5) % gridSize;
      const offsetY = (-camera.current.y * 0.5) % gridSize;

      for (let x = offsetX; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = offsetY; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(34, 211, 238, 0.02)';
      const pX = -camera.current.x * 0.2;
      for (let i = 0; i < 10; i++) {
        const sx = (i * 1000 + pX) % (w + 1000);
        ctx.fillRect(sx, h - 400, 200, 400);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, activeSegmentId, visitedSegmentIds, isClosing, isFullyClosed, isLogoLoaded]);

  const activeSegment = SEGMENTS.find(s => s.id === activeSegmentId);

  if (isFullyClosed) {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center gap-12 font-sans overflow-hidden">
        <div className="hud-scanline" />
        <h1 className="text-cyan-400 font-black text-6xl md:text-8xl tracking-tighter animate-pulse text-center px-4">
          MISSION SUCCESSFUL
        </h1>
        <button 
          onClick={resetGame}
          className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-3xl rounded-2xl transition-all active:scale-95 shadow-[0_0_50px_rgba(6,182,212,0.4)] z-50 border-4 border-cyan-400"
        >
          RELIVE THE WRAP
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-slate-950 overflow-hidden font-sans">
      <div className="hud-scanline" />
      
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
         <div className="bg-slate-900/90 border-l-4 border-cyan-500 px-6 py-3 rounded-r-xl backdrop-blur-xl shadow-2xl">
            <h1 className="text-cyan-400 font-black tracking-[0.1em] text-xl uppercase">AI Champions - Manchester Kick Off</h1>
            <p className="text-slate-400 text-xs font-bold">APRIL 2026 // KICK OFF SESSION</p>
         </div>
      </div>

      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="w-full h-full object-cover cursor-crosshair"
        onClick={() => !hasStarted && setHasStarted(true)}
      />

      {activeSegment && (
        <PresentationModal
          segment={activeSegment}
          onClose={closeSegment}
        />
      )}

      <div className="absolute bottom-2 left-4 right-4 z-20 flex justify-center items-end pointer-events-none">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-1 w-full max-w-4xl bg-slate-950/60 p-0.5 rounded-lg border border-slate-800 backdrop-blur-md">
            {SEGMENTS.map(s => (
                <div key={s.id} className={`p-0.5 md:p-1 rounded-md border transition-all duration-500 ${activeSegmentId === s.id ? 'border-cyan-400 bg-cyan-900/40 shadow-[0_0_5px_rgba(34,211,238,0.3)]' : visitedSegmentIds.has(s.id) ? 'border-green-500 bg-green-950/20 opacity-100' : 'border-slate-800 bg-slate-900/60 opacity-40'}`}>
                    <div className="flex flex-col items-center gap-0">
                      <span className="text-xs md:text-sm">{visitedSegmentIds.has(s.id) ? '✅' : s.icon}</span>
                      <span className="text-[5px] md:text-[7px] font-bold text-white truncate uppercase text-center w-full leading-tight">{s.shortName}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GameView;
