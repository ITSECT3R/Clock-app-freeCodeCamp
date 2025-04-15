import { createStore } from 'redux';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timerLabel: 'Session',
  timeLeft: 25 * 60, // in seconds (25 minutes)
  isRunning: false
};

const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BREAK_DECREMENT':
      return {
        ...state,
        breakLength: state.breakLength > 1 ? state.breakLength - 1 : 1,
        timeLeft: state.timerLabel === 'Break' ? (state.breakLength > 1 ? (state.breakLength - 1) * 60 : 60) : state.timeLeft
      };
    case 'BREAK_INCREMENT':
      return {
        ...state,
        breakLength: state.breakLength < 60 ? state.breakLength + 1 : 60,
        timeLeft: state.timerLabel === 'Break' ? (state.breakLength < 60 ? (state.breakLength + 1) * 60 : 60 * 60) : state.timeLeft
      };
    case 'SESSION_DECREMENT':
      return {
        ...state,
        sessionLength: state.sessionLength > 1 ? state.sessionLength - 1 : 1,
        timeLeft: state.timerLabel === 'Session' ? (state.sessionLength > 1 ? (state.sessionLength - 1) * 60 : 60) : state.timeLeft
      };
    case 'SESSION_INCREMENT':
      return {
        ...state,
        sessionLength: state.sessionLength < 60 ? state.sessionLength + 1 : 60,
        timeLeft: state.timerLabel === 'Session' ? (state.sessionLength < 60 ? (state.sessionLength + 1) * 60 : 60 * 60) : state.timeLeft
      };
    case 'RESET':
      return initialState;
    case 'START_STOP':
      return {
        ...state,
        isRunning: !state.isRunning
      };
    case 'DECREMENT_TIME':
      return {
        ...state,
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0
      };
    case 'SWITCH_TIMER':
      const newTimerLabel = state.timerLabel === 'Session' ? 'Break' : 'Session';
      const newTimeLeft = (newTimerLabel === 'Session' ? state.sessionLength : state.breakLength) * 60;
      return {
        ...state,
        timerLabel: newTimerLabel,
        timeLeft: newTimeLeft
      };
    default:
      return state;
  }
};

const store = createStore(clockReducer);

export default store;