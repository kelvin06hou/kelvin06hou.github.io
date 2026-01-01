const table = document.getElementById("timetable");

/* ---------- Header ---------- */
const headerRow = document.createElement("tr");
headerRow.innerHTML =
  "<th>Time</th>" + days.map(d => `<th>${d}</th>`).join("");
table.appendChild(headerRow);

/* ---------- Time Slots ---------- */
function generateTimeSlots() {
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

const timeSlots = generateTimeSlots();
const occupied = {}; // Tracks merged cells

/* ---------- Build Table ---------- */
timeSlots.forEach(time => {
  const row = document.createElement("tr");
  row.innerHTML = `<td class="time">${time}</td>`;

  days.forEach(day => {
    const key = `${day}-${time}`;
    if (occupied[key]) return;

    const course = courses.find(
      c => c.day === day && c.start === time
    );

    if (course) {
      const span =
        (parseTime(course.end) - parseTime(course.start)) /
        slotMinutes;

      const cell = document.createElement("td");
      cell.rowSpan = span;
      cell.className = `course type-${course.type}`;
      cell.innerHTML = `<strong>${course.name}</strong>`;

      row.appendChild(cell);
      markOccupied(day, course.start, course.end);
    } else {
      row.appendChild(document.createElement("td"));
    }
  });

  table.appendChild(row);
});

/* ---------- Helpers ---------- */
function parseTime(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function markOccupied(day, start, end) {
  let current = parseTime(start);
  const endMin = parseTime(end);

  while (current < endMin) {
    const h = String(Math.floor(current / 60)).padStart(2, "0");
    const m = current % 60 === 0 ? "00" : "30";
    occupied[`${day}-${h}:${m}`] = true;
    current += slotMinutes;
  }
}