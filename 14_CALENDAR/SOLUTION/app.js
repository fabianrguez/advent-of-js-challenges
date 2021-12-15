const wrapper = document.querySelector('.wrapper');
const monthElement = wrapper.querySelector('.month');
const prevMonthBtn = wrapper.querySelector('.previous');
const nextMonthBtn = wrapper.querySelector('.next');

const now = new Date();
let shownDate = new Date();

function getMonthFirstDayOfWeek(month, year) {
  return new Date(year, month - 1, 1).getDay();
}

function getMonthDays(month, year) {
  return new Date(year, month, 0).getDate();
}

function removeDays() {
  const allDays = wrapper.querySelectorAll('.day');
  allDays && allDays.forEach((day) => day.remove());
}

function loadMonthDays(month, year) {
  const firstDayIndex = getMonthFirstDayOfWeek(month, year);
  const monthDays = getMonthDays(month, year);
  let today = 0;
  if (now.getMonth() + 1 === month) {
    today = now.getDate();
  }

  let days = '';
  const emptyDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const isToday = (day) => day + 1 === today && now.getFullYear() === year;
  days += Array(emptyDays)
    .fill('')
    .map((_) => `<div class="day"></div>`)
    .join('');

  days += Array(monthDays)
    .fill('')
    .map((_, index) => `<div class="day ${isToday(index + 1) ? 'today' : ''}">${index + 1}</div>`)
    .join('');

  removeDays();
  wrapper.insertAdjacentHTML('beforeend', days);
}

function loadMonthName(month) {
  const monthName = getMonthName(month);
  monthElement.textContent = monthName;
}

function getMonthName(month) {
  const date = new Date(1970, month - 1, 1);
  return date.toLocaleString('default', { month: 'long' });
}

function nextMonth() {
  if (shownDate.getMonth() === 11) {
    shownDate = new Date(shownDate.getFullYear() + 1, 0, 1);
  } else {
    shownDate = new Date(shownDate.getFullYear(), shownDate.getMonth() + 1, 1);
  }
  loadMonthName(shownDate.getMonth() + 1);
  loadMonthDays(shownDate.getMonth() + 1, shownDate.getFullYear());
}

function previousMonth() {
  if (shownDate.getMonth() === 0) {
    shownDate = new Date(shownDate.getFullYear(), 0, 0);
  } else {
    shownDate = new Date(shownDate.getFullYear(), shownDate.getMonth() - 1, 1);
  }
  loadMonthName(shownDate.getMonth() + 1);
  loadMonthDays(shownDate.getMonth() + 1, shownDate.getFullYear());
}

function initCalendar() {
  loadMonthName(now.getMonth() + 1);
  loadMonthDays(now.getMonth() + 1, now.getFullYear());
}

document.addEventListener('DOMContentLoaded', initCalendar);
nextMonthBtn.addEventListener('click', nextMonth);
prevMonthBtn.addEventListener('click', previousMonth);
