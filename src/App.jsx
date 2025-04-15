import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.scss'

function App() {
  const dispatch = useDispatch();
  const breakLength = useSelector(state => state.breakLength);
  const sessionLength = useSelector(state => state.sessionLength);
  const timerLabel = useSelector(state => state.timerLabel);
  const timeLeft = useSelector(state => state.timeLeft);
  const isRunning = useSelector(state => state.isRunning);
  const audioRef = useRef(null);

  // Format time as MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle timer functionality
  useEffect(() => {
    let intervalId = null;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        dispatch({ type: 'DECREMENT_TIME' });
      }, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, dispatch]);
  
  // Handle timer completion and switching
  useEffect(() => {
    if (timeLeft === 0) {
      audioRef.current.play();
      
      // Small delay to ensure we reach 00:00 before switching
      setTimeout(() => {
        dispatch({ type: 'SWITCH_TIMER' });
      }, 1000);
    }
  }, [timeLeft, dispatch]);

  // Handle break length controls
  const handleBreakDecrement = () => {
    if (!isRunning) {
      dispatch({ type: 'BREAK_DECREMENT' });
    }
  };

  const handleBreakIncrement = () => {
    if (!isRunning) {
      dispatch({ type: 'BREAK_INCREMENT' });
    }
  };

  // Handle session length controls
  const handleSessionDecrement = () => {
    if (!isRunning) {
      dispatch({ type: 'SESSION_DECREMENT' });
    }
  };

  const handleSessionIncrement = () => {
    if (!isRunning) {
      dispatch({ type: 'SESSION_INCREMENT' });
    }
  };

  // Handle start/stop and reset
  const handleStartStop = () => {
    dispatch({ type: 'START_STOP' });
  };

  const handleReset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    dispatch({ type: 'RESET' });
  };

  return (
    <div id="clock-container">
      <h1>25 + 5 Clock</h1>
      
      <div className="length-controls">
        <div id="break-label">
          <h2>Break Length</h2>
          <div className="controls">
            <button id="break-decrement" onClick={handleBreakDecrement}>
              <i className="fas fa-arrow-down"></i>
            </button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment" onClick={handleBreakIncrement}>
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
        
        <div id="session-label">
          <h2>Session Length</h2>
          <div className="controls">
            <button id="session-decrement" onClick={handleSessionDecrement}>
              <i className="fas fa-arrow-down"></i>
            </button>
            <span id="session-length">{sessionLength}</span>
            <button id="session-increment" onClick={handleSessionIncrement}>
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div id="timer">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>
      
      <div className="timer-controls">
        <button id="start_stop" onClick={handleStartStop}>
          <i className={`fas ${isRunning ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button id="reset" onClick={handleReset}>
          <i className="fas fa-rotate"></i>
        </button>
      </div>
      
      <audio
        id="beep"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App
