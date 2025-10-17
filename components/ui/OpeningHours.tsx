import React, { useState, useEffect, useMemo } from 'react';
import { Clock } from 'lucide-react';

interface OpeningHoursProps {
  hours?: {
    day: string;
    hours: string;
    open: boolean;
  }[];
  phone?: string;
  brandColor?: string;
}

const Phone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default function OpeningHours({
  hours,
  phone = "01494 123456",
  brandColor = "#3b82f6",
}: OpeningHoursProps) {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  const defaultHours = [
    { day: "Monday", hours: "08:30 – 17:30", open: true },
    { day: "Tuesday", hours: "08:30 – 17:30", open: true },
    { day: "Wednesday", hours: "08:30 – 17:30", open: true },
    { day: "Thursday", hours: "08:30 – 17:30", open: true },
    { day: "Friday", hours: "08:30 – 17:30", open: true },
    { day: "Saturday", hours: "09:00 – 13:00", open: true },
    { day: "Sunday", hours: "Closed", open: false },
  ];

  // ✅ Stable displayHours with useMemo
  const displayHours = useMemo(() => {
    return (hours || defaultHours).map(hour => ({
      ...hour,
      isToday: hour.day.toLowerCase() === currentDay,
    }));
  }, [hours, currentDay]);

  const [isOpen, setIsOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const today = displayHours.find(h => h.isToday);

    if (!today || !today.open || today.hours.toLowerCase() === 'closed') {
      setIsOpen(false);
      setStatusMessage('Closed now');
      return;
    }

    const match = today.hours.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
    if (!match) return;

    const [_, oh, om, ch, cm] = match.map(Number);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = oh * 60 + om;
    const closeMinutes = ch * 60 + cm;

    if (nowMinutes >= openMinutes && nowMinutes <= closeMinutes) {
      setIsOpen(true);
      setStatusMessage('Open now');
    } else {
      setIsOpen(false);
      setStatusMessage('Closed now');
    }
  }, [displayHours]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: brandColor }}>
          <Clock className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900">Opening Hours</h2>
          <p className={`text-sm font-medium ${isOpen ? 'text-green-600' : 'text-red-600'}`}>{statusMessage}</p>
        </div>
      </div>

      <div className="space-y-3">
        {displayHours.map((hour, i) => (
          <div
            key={i}
            className={`flex justify-between items-center py-3 px-4 rounded-lg transition-all duration-200 ${
              hour.isToday ? 'bg-blue-50 border border-blue-200' : 'border-b border-gray-100 last:border-b-0'
            }`}
          >
            <span className={`font-medium text-lg ${hour.isToday ? 'text-blue-900' : 'text-gray-700'}`}>
              {hour.day}
              {hour.isToday && (
                <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Today</span>
              )}
            </span>
            <span className={`font-semibold text-lg ${hour.open ? 'text-gray-900' : 'text-red-600'}`}>
              {hour.hours}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Emergency services available 24/7</p>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition text-sm font-medium"
          >
            <Phone />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
