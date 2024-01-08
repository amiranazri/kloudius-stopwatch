import React, { createContext, useState, useContext } from "react";

export const StopwatchContext = createContext("");

export const StopwatchProvider = ({ children }) => {
  const [stopwatchState, setStopwatchState] = useState({
    delay: "",
    duration: "",
    error: "",
    elapsedTime: 0,
    isRunning: false,
    intervalId: null, // Add intervalId to keep track of the interval
    startingTime: 0,
  });

  const startTimer = (delay, duration) => {
    if (stopwatchState.isRunning) return;

    const intervalId = setInterval(() => {
      setStopwatchState((prevState) => {
        if (prevState.elapsedTime <= 0) {
          clearInterval(prevState.intervalId);
          alert("Times Up");
          return {
            ...prevState,
            elapsedTime: 0,
            isRunning: false,
            intervalId: null,
          };
        }
        return { ...prevState, elapsedTime: prevState.elapsedTime - 1 };
      });
    }, 1000);

    const startingTime = delay * 60 + duration * 60;

    setStopwatchState({
      delay,
      duration,
      elapsedTime: duration * 60,
      isRunning: true,
      intervalId,
      startingTime,
    });
  };

  return (
    <StopwatchContext.Provider value={{ stopwatchState, startTimer }}>
      {children}
    </StopwatchContext.Provider>
  );
};

export const useStopwatch = () => {
  const context = useContext(StopwatchContext);
  return context;
};
