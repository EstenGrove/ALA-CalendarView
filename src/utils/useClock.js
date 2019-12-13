import { useState, useEffect } from "react";

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState(null);

  function updateClock() {
    let dayOrNight = "AM";
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let mins = currentTime.getMinutes();
    let secs = currentTime.getSeconds();
    if (hours > 12) {
      hours = hours - 12;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    let timeString = hours + ":" + mins + ":" + secs + " " + dayOrNight;
    return timeString;
  }

  useEffect(() => {
    const clockID = setInterval(() => {
      setCurrentTime(updateClock());
    }, 1000);

    return () => clearInterval(clockID);
  });

  return {
    currentTime,
    updateClock
  };
};
