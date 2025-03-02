'use client';

import { useState, useCallback, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer for the calendar
const localizer = momentLocalizer(moment);

// Custom event component to style appointments based on status
const EventComponent = ({ event }: any) => {
  const appointment = event.resource;
  let bgColor = 'bg-blue-100 border-blue-300';
  let textColor = 'text-blue-800';
  
  if (appointment.status === 'Confirmed') {
    bgColor = 'bg-green-100 border-green-300';
    textColor = 'text-green-800';
  } else if (appointment.status === 'Cancelled') {
    bgColor = 'bg-red-100 border-red-300';
    textColor = 'text-red-800';
  }
  
  return (
    <div className={`p-1 rounded overflow-hidden border ${bgColor}`}>
      <div className={`text-xs font-semibold truncate ${textColor}`}>{event.title}</div>
      <div className="text-xs truncate">{appointment.time} ({appointment.duration})</div>
    </div>
  );
};

// Custom day header component to ensure day names are displayed
const DayHeaderComponent = ({ date, label }: any) => {
  return (
    <div className="text-center py-2 font-medium">
      <div className="text-xs text-gray-500">{moment(date).format('ddd')}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
};

interface AppointmentCalendarProps {
  events: any[];
  currentDate: Date;
  onSelectEvent: (event: any) => void;
}

export default function AppointmentCalendar({ 
  events, 
  currentDate,
  onSelectEvent 
}: AppointmentCalendarProps) {
  // Set up calendar views
  const [view, setView] = useState('month');
  
  // Custom toolbar to match the app's styling
  const CustomToolbar = ({ label, onView, onNavigate, views }: any) => {
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {views.map((name: string) => (
            <button
              key={name}
              type="button"
              onClick={() => onView(name)}
              className={`px-3 py-1 text-sm rounded-md ${
                view === name 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  // Handle view change
  const handleViewChange = useCallback((newView: string) => {
    setView(newView);
  }, []);
  
  // Memoize the calendar components for better performance
  const { components, defaultDate } = useMemo(() => ({
    components: {
      event: EventComponent,
      toolbar: CustomToolbar,
      header: DayHeaderComponent,
    },
    defaultDate: currentDate
  }), [currentDate]);

  // Custom formats to ensure proper display of dates
  const formats = {
    monthHeaderFormat: (date: Date) => moment(date).format('MMMM YYYY'),
    dayHeaderFormat: (date: Date) => moment(date).format('dddd, MMMM D'),
    dayRangeHeaderFormat: ({ start, end }: { start: Date, end: Date }) => 
      `${moment(start).format('MMMM D')} - ${moment(end).format('MMMM D, YYYY')}`,
    dayFormat: (date: Date) => moment(date).format('D'),
  };

  // Add custom styles to fix calendar display
  const customStyles = `
    .rbc-month-view {
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
    }
    .rbc-header {
      padding: 8px 0;
      font-weight: 500;
      border-bottom: 1px solid #e5e7eb;
    }
    .rbc-header + .rbc-header {
      border-left: 1px solid #e5e7eb;
    }
    .rbc-day-bg + .rbc-day-bg {
      border-left: 1px solid #e5e7eb;
    }
    .rbc-month-row + .rbc-month-row {
      border-top: 1px solid #e5e7eb;
    }
    .rbc-off-range-bg {
      background-color: #f9fafb;
    }
    .rbc-off-range {
      color: #9ca3af;
    }
    .rbc-today {
      background-color: #ecfdf5;
    }
  `;

  return (
    <>
      <style jsx global>{customStyles}</style>
      <div className="h-[700px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.MONTH}
          views={['month', 'week', 'day', 'agenda']}
          date={currentDate}
          onNavigate={() => {}}
          onView={handleViewChange}
          onSelectEvent={onSelectEvent}
          components={components}
          formats={formats}
          popup
          selectable
          className="bg-white"
          showMultiDayTimes
        />
      </div>
    </>
  );
} 