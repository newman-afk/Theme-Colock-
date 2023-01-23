const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    toggle.innerHTML = "Dark mode";
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light mode";
  }
});

let hourStart = "0deg";
let minuteStart = "0deg";
let secondStart = "0deg";
let firstTime = true;
function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  const hourDeg = `${scale(hoursForClock, 0, 11, 0, 330)}deg`;
  const minuteDeg = `${scale(minutes, 0, 59, 0, 354)}deg`;
  const secondDeg = `${scale(seconds, 0, 59, 0, 354)}deg`;
  if (firstTime) {
    hourStart = hourDeg;
    minuteStart = minuteDeg;
    secondStart = secondDeg;
    firstTime = false;
  }
  hourEl.classList.remove("run");
  hourEl.offsetHeight;
  document.documentElement.style.setProperty("--hour-start", hourStart);
  document.documentElement.style.setProperty("--hour-end", hourDeg);
  if (!hours && hourStart !== hourDeg) {
    document.documentElement.style.setProperty("--hour-start", "-30deg");
  }
  hourEl.classList.add("run");
  hourStart = hourDeg;

  minuteEl.classList.remove("run");
  minuteEl.offsetHeight;
  console.log(minuteStart);
  document.documentElement.style.setProperty("--minute-start", minuteStart);
  document.documentElement.style.setProperty("--minute-end", minuteDeg);
  if (!minutes && minuteStart !== minuteDeg) {
    document.documentElement.style.setProperty("--minute-start", "-6deg");
  }
  minuteEl.classList.add("run");
  minuteStart = minuteDeg;

  secondEl.classList.remove("run");
  secondEl.offsetHeight;
  document.documentElement.style.setProperty("--second-start", secondStart);
  document.documentElement.style.setProperty("--second-end", secondDeg);
  if (!seconds) {
    document.documentElement.style.setProperty("--second-start", "-6deg");
  }
  secondEl.classList.add("run");
  secondStart = secondDeg;

  timeEl.innerHTML = `${hoursForClock}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

setTime();

setInterval(setTime, 1000);
