"use client";

import React, { useState } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const OperatingHoursSection = () => {
  const [useMonday, setUseMonday] = useState(false);
  const [timings, setTimings] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          openTime: "--:--",
          closeTime: "--:--",
        },
      }),
      {}
    )
  );

  const handleTimingChange = (day, timeType, value) => {
    setTimings((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeType]: value,
      },
    }));
  };

  const applyMondayTiming = () => {
    if (useMonday) {
      const mondayTiming = timings["Monday"];
      const updatedTimings = daysOfWeek.reduce(
        (acc, day) => ({
          ...acc,
          [day]: mondayTiming,
        }),
        {}
      );
      setTimings(updatedTimings);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Operating Hours</h2>

      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">{day}</span>

            <div className="flex items-center space-x-2">
              <input
                type="time"
                value={timings[day].openTime}
                onChange={(e) =>
                  handleTimingChange(day, "openTime", e.target.value)
                }
                className="border rounded p-2 w-full"
              />
              <span>to</span>
              <input
                type="time"
                value={timings[day].closeTime}
                onChange={(e) =>
                  handleTimingChange(day, "closeTime", e.target.value)
                }
                className="border rounded p-2 w-full"
              />
            </div>
          </div>
        ))}

        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useMonday}
              onChange={(e) => {
                setUseMonday(e.target.checked);
                if (e.target.checked) {
                  applyMondayTiming();
                }
              }}
              className="form-checkbox"
            />
            <span>Use Monday's timing for all days</span>
          </label>
        </div>
      </div>
    </div>
  );
};
