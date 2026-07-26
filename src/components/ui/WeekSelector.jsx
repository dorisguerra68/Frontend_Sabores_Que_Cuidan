import React from "react";

const dayOptions = [
  { day: 'L', num: 14 },
  { day: 'M', num: 15 },
  { day: 'X', num: 16 },
  { day: 'J', num: 17 },
  { day: 'V', num: 18 },
  { day: 'S', num: 19 },
  { day: 'D', num: 20 }
];

export function WeekSelector({ selectedDay, onSelectDay }) {
  return (
    <section className="week-selector">
      {dayOptions.map((item) => (
        <button
          key={item.num}
          className={`day-card ${selectedDay === item.num ? 'active' : ''}`}
          onClick={() => onSelectDay(item.num)}
          type="button"
        >
          <span className="day-letter">{item.day}</span>
          <span className="day-number">{item.num}</span>
        </button>
      ))}
    </section>
  );
}
