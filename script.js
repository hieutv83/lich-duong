// Lấy các phần tử HTML cần dùng
const monthYearEl = document.getElementById("month-year");
const daysEl = document.getElementById("days");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const todayBtn = document.getElementById("today");

// Tháng và năm đang hiển thị (tháng trong JavaScript đếm từ 0: 0 = tháng 1)
const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

function renderCalendar(month, year) {
  // Tiêu đề, ví dụ: "Tháng 10, 2026"
  monthYearEl.textContent = `Tháng ${month + 1}, ${year}`;

  // Ngày 1 của tháng rơi vào thứ mấy? getDay(): 0 = CN, 1 = T2, ..., 6 = T7
  // Lịch bắt đầu từ Thứ Hai nên đổi lại: T2 = 0, ..., CN = 6
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;

  // Mẹo: ngày 0 của tháng sau chính là ngày cuối của tháng này
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  daysEl.innerHTML = "";

  // 1. Các ngày cuối của tháng trước, để lấp chỗ trống đầu lịch
  for (let i = firstDay - 1; i >= 0; i--) {
    addDay(daysInPrevMonth - i, "other-month");
  }

  // 2. Các ngày của tháng hiện tại
  for (let day = 1; day <= daysInMonth; day++) {
    const classes = [];
    const isToday =
      day === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear();
    if (isToday) classes.push("today");

    // Ô thứ (firstDay + day - 1) trong lưới; cột thứ 7 (chỉ số 6) là Chủ Nhật
    if ((firstDay + day - 1) % 7 === 6) classes.push("sunday");

    addDay(day, classes.join(" "));
  }

  // 3. Các ngày đầu của tháng sau, để lấp đầy hàng cuối cùng
  const totalCells = firstDay + daysInMonth;
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let day = 1; day <= remaining; day++) {
    addDay(day, "other-month");
  }
}

// Tạo một ô ngày và thêm vào lưới
function addDay(number, className) {
  const cell = document.createElement("div");
  cell.textContent = number;
  if (className) cell.className = className;
  daysEl.appendChild(cell);
}

// Nút lùi một tháng
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

// Nút tới một tháng
nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Nút quay về tháng hiện tại
todayBtn.addEventListener("click", () => {
  currentMonth = now.getMonth();
  currentYear = now.getFullYear();
  renderCalendar(currentMonth, currentYear);
});

// Vẽ lịch lần đầu khi mở trang
renderCalendar(currentMonth, currentYear);
