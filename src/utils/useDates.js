import { useState, useEffect } from "react";
import {
  format,
  isSameWeek,
  isSameMonth,
  eachDay,
  startOfWeek,
  lastDayOfWeek,
  addWeeks,
  subWeeks
} from "date-fns";

// format dates
function formatDates(dates) {
  if (dates.constructor === Array) {
    return dates.map(x => x.toString().slice(0, 10));
  }
  return dates.toString().slice(0, 15);
}

// for days of the week for calendar
function formatDays(days) {
  return days.map(x => format(x, "D"));
}

// useDates custom hook
export const useDates = (base = new Date()) => {
  const [todaysDate, setTodaysDate] = useState(base);
  const [currentWeek, setCurrentWeek] = useState({
    weekStart: startOfWeek(base),
    weekEnd: lastDayOfWeek(base)
  });
  const [currentMonth, setCurrentMonth] = useState(
    format(currentWeek.weekEnd, "MMMM")
  );

  const [currentDays, setCurrentDays] = useState(
    eachDay(startOfWeek(base), lastDayOfWeek(base))
  );

  const getNextWeek = (start = currentWeek.weekStart) => {
    const nextWeek = addWeeks(start, 1);

    setCurrentWeek({
      weekStart: startOfWeek(nextWeek),
      weekEnd: lastDayOfWeek(nextWeek)
    });
  };

  const getPrevWeek = (start = currentWeek.weekStart) => {
    const prevWeek = subWeeks(start, 1);

    setCurrentWeek({
      weekStart: startOfWeek(prevWeek),
      weekEnd: lastDayOfWeek(prevWeek)
    });
  };

  // checks if dates are in the same week
  const checkForSameWeek = (a, b) => {
    return isSameWeek(a, b);
  };

  const checkForSameMonth = (activeMonth, testDay) => {
    if (isSameMonth(activeMonth, testDay) === true) {
      return true;
    }
    return false;
  };

  // update the days anytime weekStart/End changes
  useEffect(() => {
    setCurrentDays(eachDay(currentWeek.weekStart, currentWeek.weekEnd));
    setCurrentMonth(format(currentWeek.weekEnd, "MMMM"));
  }, [currentWeek.weekStart, currentWeek.weekEnd]);

  return {
    todaysDate,
    setTodaysDate,
    currentDays,
    currentWeek,
    currentMonth,
    setCurrentMonth,
    getPrevWeek,
    getNextWeek,
    checkForSameWeek,
    checkForSameMonth
  };
};

export { formatDates, formatDays };
