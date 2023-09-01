document.addEventListener('DOMContentLoaded', function () {
  const monthYearElement = document.getElementById('month-year');
  const datesElement = document.getElementById('dates');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  

  let currentDate = new Date();

  function updateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    monthYearElement.textContent = `${months[month]} ${year}`;

    let datesHTML = '';

    // Fill the previous month's days
    for (let i = firstDayIndex; i > 0; i--) {
      datesHTML += `<div class="date prev-month">${prevMonthLastDay - i + 1}</div>`;
    }

    // Fill the current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const isToday = i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear();
      datesHTML += `<div class="date ${isToday ? 'today' : ''}">${i}</div>`;
    }

    // Fill the next month's days
    for (let i = 1; i < 7 - lastDayIndex; i++) {
      datesHTML += `<div class="date next-month">${i}</div>`;
    }

    datesElement.innerHTML = datesHTML;
  }

  updateCalendar();

  prevBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  });

  nextBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  });
  // Function to update the clock's time
  function updateClock() {
    const clockElement = document.querySelector('.clock');
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    let amPm = 'AM';

    // Convert to 12-hour format and determine AM or PM
    if (hours >= 12) {
      amPm = 'PM';
    }
    if (hours > 12) {
      hours -= 12;
    }
    if (hours === 0) {
      hours = 12; // Display 12:00 AM instead of 0:00 AM
    }

    // Format the time with leading zeros if needed
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${amPm}`;

    // Update the clock's display
    clockElement.textContent = formattedTime;
  }

  // Update the clock every second
  setInterval(updateClock, 1000);
});
