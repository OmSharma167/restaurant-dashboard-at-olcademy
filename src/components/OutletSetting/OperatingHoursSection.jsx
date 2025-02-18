"use client";

import { useState } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Dummy offer data
const dummyOffers = [
  "10% off on all meals",
  "Free dessert with any main course",
  "Buy one get one free on drinks",
  "30% off on family meals",
  "Kids eat free",
];

export const OperatingHoursSection = () => {
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [timings, setTimings] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          openTime: "09:00",
          closeTime: "22:00",
          offers: {},
        },
      }),
      {}
    )
  );
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState("");

  const handleTimingChange = (day, timeType, value) => {
    setTimings((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeType]: value,
      },
    }));
  };

  const generateTimeSlots = (openTime, closeTime) => {
    const slots = [];
    const current = new Date(`2000-01-01T${openTime}`);
    const end = new Date(`2000-01-01T${closeTime}`);

    while (current < end) {
      slots.push(
        current.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  };

  const handleTimeSlotToggle = (timeSlot) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(timeSlot)
        ? prev.filter((slot) => slot !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  const handleAddOffer = () => {
    if (selectedTimeSlots.length > 0 && selectedOffer) {
      setTimings((prev) => {
        const updatedOffers = { ...prev[selectedDay].offers };
        selectedTimeSlots.forEach((slot) => {
          updatedOffers[slot] = selectedOffer;
        });
        return {
          ...prev,
          [selectedDay]: {
            ...prev[selectedDay],
            offers: updatedOffers,
          },
        };
      });
      setSelectedTimeSlots([]);
      setSelectedOffer("");
    }
  };

  const timeSlots = generateTimeSlots(
    timings[selectedDay].openTime,
    timings[selectedDay].closeTime
  );

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        Operating Hours and Offers
      </h2>

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
                className="w-full border rounded p-2"
              />
              <span>to</span>
              <input
                type="time"
                value={timings[day].closeTime}
                onChange={(e) =>
                  handleTimingChange(day, "closeTime", e.target.value)
                }
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Set Offers</h3>
        <div className="space-y-4">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full border rounded p-2"
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Time Slots:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <label key={slot} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTimeSlots.includes(slot)}
                    onChange={() => handleTimeSlotToggle(slot)}
                    className="form-checkbox"
                  />
                  <span>{slot}</span>
                </label>
              ))}
            </div>
          </div>

          <select
            value={selectedOffer}
            onChange={(e) => setSelectedOffer(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select an offer</option>
            {dummyOffers.map((offer) => (
              <option key={offer} value={offer}>
                {offer}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddOffer}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Offer
          </button>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Current Offers</h3>
        {daysOfWeek.map((day) => (
          <div key={day} className="mb-4">
            <h4 className="font-medium">{day}</h4>
            {Object.entries(timings[day].offers).length > 0 ? (
              <ul className="list-disc pl-5">
                {Object.entries(timings[day].offers)
                  .reduce((acc, [slot, offer]) => {
                    const existingOfferIndex = acc.findIndex(
                      (item) => item.offer === offer
                    );
                    if (existingOfferIndex !== -1) {
                      acc[existingOfferIndex].slots.push(slot);
                    } else {
                      acc.push({ offer, slots: [slot] });
                    }
                    return acc;
                  }, [])
                  .map(({ offer, slots }, index) => (
                    <li key={index}>
                      {offer}: {slots.join(", ")}
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500">No offers set for this day.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};









// "use client";

// import React, { useState } from "react";

// const daysOfWeek = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const dummyOffers = [
//   "10% off on all items",
//   "Buy 1 Get 1 Free",
//   "20% off on selected items",
//   "Free dessert with main course",
//   "Happy Hour: 50% off on drinks",
// ];

// export const OperatingHoursSection = () => {
//   const [useMonday, setUseMonday] = useState(false);
//   const [timings, setTimings] = useState(
//     daysOfWeek.reduce(
//       (acc, day) => ({
//         ...acc,
//         [day]: {
//           openTime: "--:--",
//           closeTime: "--:--",
//           offers: [],
//         },
//       }),
//       {}
//     )
//   );

//   const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
//   const [selectedOffer, setSelectedOffer] = useState("");
//   const [offerTimeSlot, setOfferTimeSlot] = useState({
//     start: "--:--",
//     end: "--:--",
//   });

//   const handleTimingChange = (day, timeType, value) => {
//     setTimings((prev) => ({
//       ...prev,
//       [day]: {
//         ...prev[day],
//         [timeType]: value,
//       },
//     }));
//   };

//   const applyMondayTiming = () => {
//     if (useMonday) {
//       const mondayTiming = timings["Monday"];
//       const updatedTimings = daysOfWeek.reduce(
//         (acc, day) => ({
//           ...acc,
//           [day]: mondayTiming,
//         }),
//         {}
//       );
//       setTimings(updatedTimings);
//     }
//   };

//   const addOfferToTimeSlot = () => {
//     if (
//       selectedOffer &&
//       offerTimeSlot.start !== "--:--" &&
//       offerTimeSlot.end !== "--:--"
//     ) {
//       const updatedTimings = { ...timings };
//       updatedTimings[selectedDay].offers.push({
//         timeSlot: `${offerTimeSlot.start} - ${offerTimeSlot.end}`,
//         offer: selectedOffer,
//       });
//       setTimings(updatedTimings);
//       setSelectedOffer("");
//       setOfferTimeSlot({ start: "--:--", end: "--:--" });
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">Operating Hours</h2>

//       <div className="space-y-4">
//         {daysOfWeek.map((day) => (
//           <div key={day} className="grid grid-cols-3 items-center gap-4">
//             <span className="font-medium">{day}</span>

//             <div className="flex items-center space-x-2">
//               <input
//                 type="time"
//                 value={timings[day].openTime}
//                 onChange={(e) =>
//                   handleTimingChange(day, "openTime", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//               />
//               <span>to</span>
//               <input
//                 type="time"
//                 value={timings[day].closeTime}
//                 onChange={(e) =>
//                   handleTimingChange(day, "closeTime", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//           </div>
//         ))}

//         <div className="mt-4">
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={useMonday}
//               onChange={(e) => {
//                 setUseMonday(e.target.checked);
//                 if (e.target.checked) {
//                   applyMondayTiming();
//                 }
//               }}
//               className="form-checkbox"
//             />
//             <span>Use Monday's timing for all days</span>
//           </label>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-xl font-semibold mb-4">
//             Set Offers for Time Slots
//           </h3>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Select Day
//               </label>
//               <select
//                 value={selectedDay}
//                 onChange={(e) => setSelectedDay(e.target.value)}
//                 className="border rounded p-2 w-full"
//               >
//                 {daysOfWeek.map((day) => (
//                   <option key={day} value={day}>
//                     {day}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Select Offer
//               </label>
//               <select
//                 value={selectedOffer}
//                 onChange={(e) => setSelectedOffer(e.target.value)}
//                 className="border rounded p-2 w-full"
//               >
//                 <option value="">Select an offer</option>
//                 {dummyOffers.map((offer, index) => (
//                   <option key={index} value={offer}>
//                     {offer}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4 mt-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Start Time
//               </label>
//               <input
//                 type="time"
//                 value={offerTimeSlot.start}
//                 onChange={(e) =>
//                   setOfferTimeSlot({ ...offerTimeSlot, start: e.target.value })
//                 }
//                 className="border rounded p-2 w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">End Time</label>
//               <input
//                 type="time"
//                 value={offerTimeSlot.end}
//                 onChange={(e) =>
//                   setOfferTimeSlot({ ...offerTimeSlot, end: e.target.value })
//                 }
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//           </div>

//           <button
//             onClick={addOfferToTimeSlot}
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add Offer to Time Slot
//           </button>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-xl font-semibold mb-4">Current Offers</h3>
//           {daysOfWeek.map((day) => (
//             <div key={day} className="mb-4">
//               <h4 className="text-lg font-medium">{day}</h4>
//               {timings[day].offers.length > 0 ? (
//                 <ul className="list-disc pl-5">
//                   {timings[day].offers.map((offer, index) => (
//                     <li key={index}>
//                       <strong>{offer.timeSlot}</strong>: {offer.offer}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No offers set for this day.</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useState } from "react";
// import { Plus, Trash2, Tag } from "lucide-react";

// const daysOfWeek = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const EmptyTimeSlot = {
//   openTime: "--:--",
//   closeTime: "--:--",
//   offer: {
//     isActive: false,
//     name: "",
//     description: "",
//     discount: "",
//   },
// };

// export const OperatingHoursSection = () => {
//   const [useMonday, setUseMonday] = useState(false);
//   const [timings, setTimings] = useState(
//     daysOfWeek.reduce(
//       (acc, day) => ({
//         ...acc,
//         [day]: [{ ...EmptyTimeSlot }],
//       }),
//       {}
//     )
//   );

//   const handleTimingChange = (day, slotIndex, timeType, value) => {
//     setTimings((prev) => ({
//       ...prev,
//       [day]: prev[day].map((slot, idx) =>
//         idx === slotIndex ? { ...slot, [timeType]: value } : slot
//       ),
//     }));
//   };

//   const handleOfferChange = (day, slotIndex, field, value) => {
//     setTimings((prev) => ({
//       ...prev,
//       [day]: prev[day].map((slot, idx) =>
//         idx === slotIndex
//           ? {
//               ...slot,
//               offer: {
//                 ...slot.offer,
//                 [field]: value,
//               },
//             }
//           : slot
//       ),
//     }));
//   };

//   const toggleOffer = (day, slotIndex) => {
//     setTimings((prev) => ({
//       ...prev,
//       [day]: prev[day].map((slot, idx) =>
//         idx === slotIndex
//           ? {
//               ...slot,
//               offer: {
//                 ...slot.offer,
//                 isActive: !slot.offer.isActive,
//               },
//             }
//           : slot
//       ),
//     }));
//   };

//   const addTimeSlot = (day) => {
//     setTimings((prev) => ({
//       ...prev,
//       [day]: [...prev[day], { ...EmptyTimeSlot }],
//     }));
//   };

//   const removeTimeSlot = (day, slotIndex) => {
//     setTimings((prev) => ({
//       ...prev,
//       [day]: prev[day].filter((_, idx) => idx !== slotIndex),
//     }));
//   };

//   const applyMondayTiming = () => {
//     if (useMonday) {
//       const mondayTiming = timings["Monday"];
//       const updatedTimings = daysOfWeek.reduce(
//         (acc, day) => ({
//           ...acc,
//           [day]: [...mondayTiming],
//         }),
//         {}
//       );
//       setTimings(updatedTimings);
//     }
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-6">Operating Hours & Offers</h2>

//       <div className="space-y-6">
//         {daysOfWeek.map((day) => (
//           <div key={day} className="border rounded-lg p-4 bg-white shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <span className="font-medium text-lg">{day}</span>
//               <button
//                 onClick={() => addTimeSlot(day)}
//                 className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
//               >
//                 <Plus size={16} />
//                 <span className="text-sm">Add Time Slot</span>
//               </button>
//             </div>

//             <div className="space-y-4">
//               {timings[day].map((slot, slotIndex) => (
//                 <div
//                   key={slotIndex}
//                   className="bg-gray-50 p-4 rounded-lg space-y-3"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="flex-1 flex items-center gap-2">
//                       <input
//                         type="time"
//                         value={slot.openTime}
//                         onChange={(e) =>
//                           handleTimingChange(
//                             day,
//                             slotIndex,
//                             "openTime",
//                             e.target.value
//                           )
//                         }
//                         className="border rounded p-2 w-full"
//                       />
//                       <span className="text-gray-500">to</span>
//                       <input
//                         type="time"
//                         value={slot.closeTime}
//                         onChange={(e) =>
//                           handleTimingChange(
//                             day,
//                             slotIndex,
//                             "closeTime",
//                             e.target.value
//                           )
//                         }
//                         className="border rounded p-2 w-full"
//                       />
//                     </div>
//                     {timings[day].length > 1 && (
//                       <button
//                         onClick={() => removeTimeSlot(day, slotIndex)}
//                         className="text-red-500 hover:text-red-600 p-1"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     )}
//                   </div>

//                   <div className="border-t pt-3">
//                     <div className="flex items-center gap-2 mb-2">
//                       <button
//                         onClick={() => toggleOffer(day, slotIndex)}
//                         className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
//                       >
//                         <Tag size={16} />
//                         <span className="text-sm">
//                           {slot.offer.isActive ? "Edit Offer" : "Add Offer"}
//                         </span>
//                       </button>
//                     </div>

//                     {slot.offer.isActive && (
//                       <div className="space-y-3 bg-white p-3 rounded border">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Offer Name
//                           </label>
//                           <input
//                             type="text"
//                             value={slot.offer.name}
//                             onChange={(e) =>
//                               handleOfferChange(
//                                 day,
//                                 slotIndex,
//                                 "name",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="e.g., Happy Hour, Lunch Special"
//                             className="border rounded p-2 w-full"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Description
//                           </label>
//                           <input
//                             type="text"
//                             value={slot.offer.description}
//                             onChange={(e) =>
//                               handleOfferChange(
//                                 day,
//                                 slotIndex,
//                                 "description",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="e.g., 20% off on all beverages"
//                             className="border rounded p-2 w-full"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Discount
//                           </label>
//                           <input
//                             type="text"
//                             value={slot.offer.discount}
//                             onChange={(e) =>
//                               handleOfferChange(
//                                 day,
//                                 slotIndex,
//                                 "discount",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="e.g., 20% OFF, Buy 1 Get 1"
//                             className="border rounded p-2 w-full"
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="mt-6">
//           <label className="flex items-center gap-2 text-gray-700">
//             <input
//               type="checkbox"
//               checked={useMonday}
//               onChange={(e) => {
//                 setUseMonday(e.target.checked);
//                 if (e.target.checked) {
//                   applyMondayTiming();
//                 }
//               }}
//               className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//             />
//             <span>Use Monday's timing for all days</span>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OperatingHoursSection;
