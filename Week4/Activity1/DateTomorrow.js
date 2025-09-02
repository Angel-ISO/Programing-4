function isDateTomorrowYesterdayFutureOrPast(date) {
  const now = new Date();
  const today = now.getDate();
  const dateDay = date.getDate();

  if (dateDay - 1 === today) {
    return "Tomorrow";
  } else if (dateDay + 1 === today) {
    return "Yesterday";
  } else if (dateDay > today) {
    return "Future";
  } else {
    return "Past";
  }
}

module.exports = { isDateTomorrowYesterdayFutureOrPast };