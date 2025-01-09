import React, { useState } from 'react';
import { format, addMonths, subMonths, parse } from 'date-fns';
import CalendarGrid from '../components/CalenderGrid';

const Home = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState({}); // Store events in an object with keys as date strings

  // Handle switching to the next month
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Handle switching to the previous month
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Handle day click to select a day
  const handleDayClick = (day) => {
    setSelectedDay(format(day, 'yyyy-MM-dd')); // Store the selected day in 'YYYY-MM-DD' format
  };

  // Handle adding a new event
  const handleAddEvent = (event) => {
    if (!selectedDay) return;

    // Update the events for the selected day
    const updatedEvents = { ...events };
    if (!updatedEvents[selectedDay]) {
      updatedEvents[selectedDay] = [];
    }
    updatedEvents[selectedDay].push(event);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents)); // Persist events to localStorage
  };

  // Handle deleting an event
  const handleDeleteEvent = (index) => {
    if (!selectedDay) return;

    const updatedEvents = { ...events };
    updatedEvents[selectedDay].splice(index, 1);
    if (updatedEvents[selectedDay].length === 0) {
      delete updatedEvents[selectedDay];
    }
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents)); // Persist updated events
  };

  // Retrieve events from localStorage on initial load
  React.useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Dynamic Event Calendar</h1>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handlePrevMonth}
        >
          Previous
        </button>
        <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <CalendarGrid currentMonth={currentMonth} onDayClick={handleDayClick} />

      {/* Selected Day Events */}
      {selectedDay && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Events for {selectedDay}</h3>

          {/* Event List */}
          <ul className="mt-2">
            {events[selectedDay] && events[selectedDay].length > 0 ? (
              events[selectedDay].map((event, index) => (
                <li
                  key={index}
                  className="p-2 border rounded mb-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{event.name}</p>
                    <p className="text-sm text-gray-600">
                      {event.startTime} - {event.endTime}
                    </p>
                    {event.description && (
                      <p className="text-sm text-gray-500">{event.description}</p>
                    )}
                  </div>
                  <button
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteEvent(index)}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No events for this day.</p>
            )}
          </ul>

          {/* Add Event Form */}
          <form
            className="mt-4 p-4 border rounded"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const event = {
                name: formData.get('name'),
                startTime: formData.get('startTime'),
                endTime: formData.get('endTime'),
                description: formData.get('description'),
              };
              handleAddEvent(event);
              e.target.reset(); // Clear the form
            }}
          >
            <h4 className="text-md font-semibold mb-2">Add Event</h4>
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              required
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex gap-2 mb-2">
              <input
                type="time"
                name="startTime"
                required
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="time"
                name="endTime"
                required
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <textarea
              name="description"
              placeholder="Description (Optional)"
              className="w-full p-2 border rounded mb-2"
            ></textarea>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            >
              Add Event
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
