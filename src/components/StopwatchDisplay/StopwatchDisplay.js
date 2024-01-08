import React, { useEffect, useState } from "react";
import { useStopwatch } from "../../contexts/StopwatchContexts";

const StopwatchDisplay = () => {
  const { stopwatchState } = useStopwatch();
  const { elapsedTime, isRunning, startingTime } = stopwatchState;

  const [formattedTime, setFormattedTime] = useState("00:00");

  const formatTime = (secs) => {
    const mm = Math.floor(secs / 60);
    const ss = Math.floor(secs % 60);
    return `${mm.toString().padStart(2, "0")}:${ss
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isRunning) {
      const countdownTime = startingTime - elapsedTime;
      setFormattedTime(formatTime(countdownTime));
    } else {
      setFormattedTime("00:00");
    }
  }, [elapsedTime, isRunning, startingTime]);

  return <>{formattedTime}</>;
};

export default StopwatchDisplay;
