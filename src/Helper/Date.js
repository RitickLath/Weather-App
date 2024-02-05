const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currectDate = new Date();
const currectDay = daysOfWeek[currectDate.getDay()];
const currentMonth = monthsOfYear[currectDate.getMonth()];

export const Datee = `${currectDay}, ${currectDate.getDate()} ${currentMonth} ${currectDate.getFullYear()}`;
