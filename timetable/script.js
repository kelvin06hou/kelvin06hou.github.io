const table = document.getElementById("timetable");

// 表頭
const header = document.createElement("tr");
header.innerHTML = "<th>Time</th>" + days.map(d => `<th>${d}</th>`).join("");
table.appendChild(header);

// 產生時間列
function generateTimeSlots() {
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

const timeSlots = generateTimeSlots();
const occupied = {}; // 紀錄被 rowspan 覆蓋的格子

timeSlots.forEach(time => {
  const row = document.createElement("tr");
  row.innerHTML = `<td class="time">${time}</td>`;

  days.forEach(day => {
    const key = `${day}-${time}`;
    if (occupied[key]) return;

    const course = courses.find(c =>
      c.day === day && c.start === time
    );

    if (course) {
      const start = parseTime(course.start);
      const end = parseTime(course.end);
      const span = (end - start) / slotMinutes;

      const cell = document.createElement("td");
      cell.className = `course type-${course.type || "lecture"}`;
      cell.rowSpan = span;
      cell.innerHTML = `<strong>${course.name}</strong>`;

      row.appendChild(cell);

      markOccupied(day, course.start, course.end);
    } else {
      row.appendChild(document.createElement("td"));
    }
  });

  table.appendChild(row);
});

function parseTime(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function markOccupied(day, start, end) {
  let current = parseTime(start);
  const endMin = parseTime(end);

  while (current < endMin) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    occupied[`${day}-${String(h).padStart(2, "0")}:${m === 0 ? "00" : "30"}`] = true;
    current += slotMinutes;
  }
}