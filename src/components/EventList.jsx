import React from 'react';
import { format } from 'date-fns';

const EventList = ({ selectedDay, events }) => {
  const dayEvents = events.filter(
    (event) => format(event.day, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd')
  );

  return (
    <div className="event-list">
      <h3>Events for {format(selectedDay, 'MMMM d, yyyy')}</h3>
      {dayEvents.length > 0 ? (
        <ul>
          {dayEvents.map((event, index) => (
            <li key={index}>
              <strong>{event.title}</strong>: {event.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this day.</p>
      )}
    </div>
  );
};

export default EventList;
