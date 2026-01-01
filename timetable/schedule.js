const { type } = require("node:os");

const courses = [
  {
  day: "Thu",
  start: "10:00",
  end: "12:00",
  name: "CRISPR Lab",
  type: "lab"
},
  {
    day: "Tue",
    start: "13:00",
    end: "15:00",
    name: "Statistics",
    type: "lecture"
  },
  {
    day: "Thu",
    start: "10:00",
    end: "12:00",
    name: "CRISPR Lab",
    type: "lab"
  }
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const startHour = 8;
const endHour = 20;
const slotMinutes = 30;