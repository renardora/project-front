export const getCurrentMonthYear = () => {
  const now = new Date();
  const monthNames = [
    "январе",
    "феврале",
    "марте",
    "апреле",
    "мае",
    "июне",
    "июле",
    "августе",
    "сентябре",
    "октябре",
    "ноябре",
    "декабре",
  ];
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  if (now.getDate() > 25) {
    return { month: monthNames[currentMonth], year: currentYear };
  } else {
    const previousMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
    const year = previousMonth === 11 ? currentYear - 1 : currentYear;
    return { month: monthNames[previousMonth], year };
  }
};

export const getNextMonthYear = () => {
  const now = new Date();
  const monthNames = [
    "январе",
    "феврале",
    "марте",
    "апреле",
    "мае",
    "июне",
    "июле",
    "августе",
    "сентябре",
    "октябре",
    "ноябре",
    "декабре",
  ];
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return {
    month: monthNames[currentMonth % 12],
    year: currentYear + (currentMonth === 11 ? 1 : 0),
  };
};

export const getCurrentDaysWeek = () => {
  const today = new Date();
  const startOfWeekDay = new Date(today);
  startOfWeekDay.setDate(today.getDate() - today.getDay() + 1);
  const startOfWeekMonth = startOfWeekDay.getMonth();
  const endOfWeekDay = new Date(today);
  endOfWeekDay.setDate(today.getDate() + (7 - today.getDay()));
  const endOfWeekMonth = endOfWeekDay.getMonth();
  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeekDay);
    currentDate.setDate(startOfWeekDay.getDate() + i);
    weekDates.push(currentDate.getDate());
  }

  return [
    { day: startOfWeekDay.getDate(), month: monthNames[startOfWeekMonth % 12]},
    { day: endOfWeekDay.getDate(), month: monthNames[endOfWeekMonth % 12]},
    { weekDates: weekDates},
  ];
};
