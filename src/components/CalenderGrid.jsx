import React, { useState } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, addDays, startOfWeek } from 'date-fns';
import EventModal from './EventModel'; // Ensure the correct import
import EventList from './EventList'; // Ensure the correct import
import '../style/calendergrid.css';

const CalendarGrid = ({ currentMonth, setCurrentMonth }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState([]);

  const goToPreviousMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1)); // Navigate to the previous month
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1)); // Navigate to the next month
  };

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfMonth(currentMonth);
  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handleDayClick = (day) => {
    if (selectedDay && format(day, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd')) {
      // If the same day is clicked again, deselect it
      setSelectedDay(null);
      setShowEventModal(false); // Close the form if the same day is clicked
    } else {
      setSelectedDay(day);
      setShowEventModal(true); // Open the event form
    }
  };

  const handleEventSave = (eventData) => {
    // Save the event data for the selected day
    setEvents([...events, { ...eventData, day: selectedDay }]);
    setShowEventModal(false); // Close the form after saving
    setSelectedDay(null); // Deselect the day
  };

  return (
    <div className="calendar-container">
      <div className="calendar-left">
        <div className="month-container">
          <button className="month-button" onClick={goToPreviousMonth}>
            &lt;
          </button>
          <span className="month-name">{format(currentMonth, 'MMMM yyyy')}</span>
          <button className="month-button" onClick={goToNextMonth}>
            &gt;
          </button>
        </div>

        <div className="calendar-grid">
          {days.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${format(day, 'd') === format(new Date(), 'd') ? 'today' : ''} ${
                format(day, 'i') === 6 || format(day, 'i') === 0 ? 'weekend' : ''
              }`}
              onClick={() => handleDayClick(day)}
            >
              {format(day, 'd')}
            </div>
          ))}
        </div>
      </div>

      <div className="calendar-right">
        {showEventModal && (
          <EventModal
            selectedDay={selectedDay}
            onClose={() => setShowEventModal(false)}
            onSave={handleEventSave} // Pass the save handler
          />
        )}
        {selectedDay && !showEventModal && (
          <EventList selectedDay={selectedDay} events={events} />
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;
