const courses = [
  {
    days: ["Mon", "Tue"],
    start: "09:00",
    end: "10:30",
    name: "Microbiology",
    type: "lecture"
  },
  {
    days: ["Wed"],
    start: "13:00",
    end: "15:00",
    name: "Statistics",
    type: "lecture"
  },
  {
    days: ["Thu"],
    start: "10:00",
    end: "12:00",
    name: "CRISPR Lab",
    type: "lab"
  },
  {
    days: ["Fri"],
    start: "15:30",
    end: "17:00",
    name: "Group Meeting",
    type: "meeting"
  }
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const startHour = 8;
const endHour = 20;
const slotMinutes = 30;
