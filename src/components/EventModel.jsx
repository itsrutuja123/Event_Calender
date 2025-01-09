import React, { useState } from 'react';
import { format } from 'date-fns';

const EventModal = ({ selectedDay, onClose, onSave }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleSave = () => {
    if (eventTitle && eventDescription) {
      const eventData = {
        title: eventTitle,
        description: eventDescription,
        date: format(selectedDay, 'yyyy-MM-dd'),
      };
      onSave(eventData); // Pass the event data to the parent component
    }
  };

  return (
    <div className="event-modal">
      <div className="modal-content">
        <h3>Add Event on {format(selectedDay, 'MMMM d, yyyy')}</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        ></textarea>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
