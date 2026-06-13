import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const LOGS = [
  '[SYS] Initializing boot sequence...',
  '[SYS] Loading kernel modules...',
  '[SYS] Mounting file systems...',
  '[NET] Establishing secure connection...',
  '[NET] Handshake successful - TLS v1.3',
  '[GPU] Detecting graphics pipeline...',
  '[GPU] Vulkan backend initialized',
  '[MEM] Allocating heap memory...',
  '[MEM] Heap: 2048MB OK',
  '[AST] Loading asset manifest...',
  '[AST] 47 assets queued for download',
  '[AST] Texture atlas compiled',
  '[AST] Shader cache rebuilt',
  '[UI] Building component tree...',
  '[UI] Layout engine ready',
  '[ANI] Loading animation curves...',
  '[ANI] Spring physics initialized',
  '[SND] Audio context suspended',
  '[DAT] Fetching portfolio data...',
  '[DAT] Profile loaded: M.FAJAR',
  '[DAT] Skills matrix decoded',
  '[DAT] Projects indexed',
  '[SEC] Running integrity checks...',
  '[SEC] All signatures valid',
  '[SYS] Ready to initialize...',
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState('00');
  const [logs, setLogs] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrambleText = useCallback((text: string, progress: number) => {
    const revealed = Math.floor(progress * text.length);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      if (i < revealed) {
        result += text[i];
      } else if (text[i] === ' ') {
        result += ' ';
      } else {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    return result;
  }, []);

  useEffect(() => {
    let currentProgress = 0;
    let logIndex = 0;

    // Progress counter
    progressIntervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 4 + 0.5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      }
      setProgress(currentProgress);
      setDisplayProgress(String(Math.floor(currentProgress)).padStart(2, '0'));
    }, 80);

    // System logs
    logIntervalRef.current = setInterval(() => {
      if (logIndex < LOGS.length) {
        setLogs((prev) => [...prev, LOGS[logIndex]]);
        logIndex++;
      } else if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
      }
    }, 150);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);

      // Small delay before reveal
      setTimeout(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(labelRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
        })
          .to(
            overlayRef.current,
            {
              clipPath: 'inset(50% 0% 50% 0%)',
              duration: 0.8,
              ease: 'power4.inOut',
            },
            '-=0.1'
          )
          .to(overlayRef.current, {
            opacity: 0,
            duration: 0.2,
          });
      }, 500);
    }
  }, [progress, isComplete, onComplete]);

  const handleSkip = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setProgress(100);
    setDisplayProgress('100');
    setLogs(LOGS);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] bg-void flex flex-col items-center justify-center cursor-pointer"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      onClick={handleSkip}
    >
      {/* Center content */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo / Label */}
        <div ref={labelRef} className="text-center">
          <div className="font-mono text-xs tracking-[0.3em] text-terminal/40 mb-2">
            {scrambleText('[DECRYPTING_ASSETS]', progress / 100)}
          </div>
        </div>

        {/* Large percentage */}
        <div className="font-display text-[120px] md:text-[180px] font-bold leading-none text-terminal tracking-tighter tabular-nums">
          {displayProgress}
          <span className="text-neon text-[60px] md:text-[80px]">%</span>
        </div>

        {/* Progress bars */}
        <div className="w-[280px] md:w-[400px] space-y-2">
          <div className="h-[2px] bg-terminal/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-neon transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 bg-neon/30 blur-sm transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="h-[2px] bg-terminal/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-holo transition-all duration-150"
              style={{ width: `${Math.max(0, progress - 10)}%` }}
            />
          </div>
          <div className="h-[1px] bg-terminal/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-terminal/40 transition-all duration-200"
              style={{ width: `${Math.max(0, progress - 20)}%` }}
            />
          </div>
        </div>

        {/* System info */}
        <div className="font-mono text-[10px] text-terminal/30 tracking-wider flex gap-8">
          <span>SYS.VER.2.4.1</span>
          <span className="text-neon/60">{isComplete ? 'READY' : 'LOADING'}</span>
          <span>MEM: 2048MB</span>
        </div>
      </div>

      {/* System logs - bottom right */}
      <div className="absolute bottom-8 right-8 max-w-[350px] text-right">
        <div className="font-mono text-[9px] text-terminal/30 leading-relaxed space-y-0.5">
          {logs.slice(-12).map((log, i) => (
            <div
              key={i}
              className="opacity-0 animate-in fade-in duration-200"
              style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
            >
              <span className="text-neon/50">{String(logs.length - 12 + i).padStart(3, '0')}</span>{' '}
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Skip hint */}
      <div className="absolute bottom-8 left-8 font-mono text-[10px] text-terminal/20">
        [CLICK TO SKIP]
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-4 h-4 border-l border-t border-neon/20" />
      <div className="absolute top-8 right-8 w-4 h-4 border-r border-t border-neon/20" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-b border-neon/20" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-neon/20" />
    </div>
  );
}
