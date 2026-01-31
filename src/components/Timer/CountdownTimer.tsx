import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

interface TimerState {
  remaining: number;
  status: TimerStatus;
  lastUpdated: number;
  initialTime: number;
}

const STORAGE_KEY = 'countdown-timer-state';

const CountdownTimer: React.FC = () => {
  const [inputSeconds, setInputSeconds] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState(10000); // in milliseconds
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [initialTime, setInitialTime] = useState(10000);
  const intervalRef = useRef<number | null>(null);

  // Load saved state on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const state: TimerState = JSON.parse(saved);
        setInitialTime(state.initialTime);
        setInputSeconds(Math.floor(state.initialTime / 1000));

        if (state.status === 'running') {
          const elapsed = Date.now() - state.lastUpdated;
          const newRemaining = Math.max(0, state.remaining - elapsed);
          setTimeRemaining(newRemaining);
          
          if (newRemaining > 0) {
            setStatus('running');
          } else {
            setStatus('completed');
          }
        } else if (state.status === 'paused') {
          setTimeRemaining(state.remaining);
          setStatus('paused');
        } else {
          setTimeRemaining(state.initialTime);
          setStatus(state.status);
        }
      } catch (e) {
        console.error('Error loading timer state:', e);
      }
    }
  }, []);

  // Save state whenever it changes
  const saveState = useCallback(() => {
    const state: TimerState = {
      remaining: timeRemaining,
      status,
      lastUpdated: Date.now(),
      initialTime,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [timeRemaining, status, initialTime]);

  useEffect(() => {
    saveState();
  }, [timeRemaining, status, saveState]);

  // Timer logic
  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 10) {
            setStatus('completed');
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status]);

  const handleStart = () => {
    if (status === 'idle') {
      const ms = inputSeconds * 1000;
      setInitialTime(ms);
      setTimeRemaining(ms);
    }
    setStatus('running');
  };

  const handlePause = () => {
    setStatus('paused');
  };

  const handleResume = () => {
    setStatus('running');
  };

  const handleReset = () => {
    setTimeRemaining(initialTime);
    setStatus('idle');
  };

  const handleInputChange = (value: string) => {
    const num = Math.max(1, parseInt(value) || 1);
    setInputSeconds(num);
    const ms = num * 1000;
    setInitialTime(ms);
    setTimeRemaining(ms);
  };

  // Format time display
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: milliseconds.toString().padStart(2, '0'),
    };
  };

  const time = formatTime(timeRemaining);
  const progress = initialTime > 0 ? ((initialTime - timeRemaining) / initialTime) * 100 : 0;

  const getStatusStyle = () => {
    switch (status) {
      case 'running':
        return 'status-running';
      case 'paused':
        return 'status-paused';
      case 'completed':
        return 'status-completed';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'paused':
        return 'Paused';
      case 'completed':
        return 'Completed';
      default:
        return 'Ready';
    }
  };

  return (
    <div className="task-card">
      <h2 className="section-title">⏱️ Countdown Timer</h2>

      {/* Timer Input */}
      <div className="mb-6">
        <label className="label-text">Starting Time (seconds)</label>
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => handleInputChange(e.target.value)}
          min={1}
          disabled={status === 'running' || status === 'paused'}
          className="input-base w-full max-w-xs"
        />
      </div>

      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className="timer-display mb-4">
          {time.minutes}:{time.seconds}
          <span className="text-2xl text-muted-foreground">.{time.milliseconds}</span>
        </div>

        {/* Status Badge */}
        <span className={`timer-status ${getStatusStyle()}`}>
          {getStatusLabel()}
        </span>

        {/* Time's Up Message */}
        {status === 'completed' && (
          <p className="text-destructive font-semibold mt-4 animate-pulse-soft">
            ⏰ Time's up!
          </p>
        )}
      </div>

      {/* Progress Ring Visual */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={553}
            strokeDashoffset={553 - (553 * progress) / 100}
            className="transition-all duration-100"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">
            {Math.round(100 - progress)}%
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-3">
        {status === 'idle' && (
          <button onClick={handleStart} className="btn-primary flex items-center gap-2">
            <Play size={18} />
            Start
          </button>
        )}

        {status === 'running' && (
          <button onClick={handlePause} className="btn-secondary flex items-center gap-2">
            <Pause size={18} />
            Pause
          </button>
        )}

        {status === 'paused' && (
          <>
            <button onClick={handleResume} className="btn-primary flex items-center gap-2">
              <Play size={18} />
              Resume
            </button>
          </>
        )}

        {(status === 'paused' || status === 'completed') && (
          <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
            <RotateCcw size={18} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
