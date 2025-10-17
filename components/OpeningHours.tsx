import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Clock, Phone } from 'lucide-react';

interface DaySchedule {
  day: string;
  hours: string;
  isClosed?: boolean;
}

interface OpeningHoursProps {
  customSchedule?: DaySchedule[];
  brandColor?: string;
  phone?: string;
}

// Pure utility function for time parsing and status checking
const parseTimeString = (timeStr: string): { openTime: number; closeTime: number } | null => {
  // Handle 24-hour format (e.g., "08:00 – 18:00")
  const match24 = timeStr.match(/(\d{1,2}):(\d{2})\s*–\s*(\d{1,2}):(\d{2})/);
  if (match24) {
    const openHour = parseInt(match24[1]);
    const openMinute = parseInt(match24[2]);
    const closeHour = parseInt(match24[3]);
    const closeMinute = parseInt(match24[4]);
    
    return {
      openTime: openHour * 60 + openMinute,
      closeTime: closeHour * 60 + closeMinute
    };
  }
  
  // Handle 12-hour format (e.g., "8:00 AM – 6:00 PM")
  const match12 = timeStr.match(/(\d+):(\d+)\s*(AM|PM)\s*–\s*(\d+):(\d+)\s*(AM|PM)/);
  if (match12) {
    let openHour = parseInt(match12[1]);
    const openMinute = parseInt(match12[2]);
    const openPeriod = match12[3];
    let closeHour = parseInt(match12[4]);
    const closeMinute = parseInt(match12[5]);
    const closePeriod = match12[6];

    // Convert to 24-hour format
    if (openPeriod === 'PM' && openHour !== 12) openHour += 12;
    if (openPeriod === 'AM' && openHour === 12) openHour = 0;
    if (closePeriod === 'PM' && closeHour !== 12) closeHour += 12;
    if (closePeriod === 'AM' && closeHour === 12) closeHour = 0;

    return {
      openTime: openHour * 60 + openMinute,
      closeTime: closeHour * 60 + closeMinute
    };
  }
  
  return null;
};

const checkOpenStatus = (schedule: DaySchedule[]): { isOpen: boolean; message: string } => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  
  // Find today's schedule by matching the day name
  const todaySchedule = schedule.find(item => item.day === currentDay);
  
  if (!todaySchedule || todaySchedule.isClosed) {
    return { isOpen: false, message: 'Closed Now' };
  }

  const timeRange = parseTimeString(todaySchedule.hours);
  if (!timeRange) {
    return { isOpen: false, message: 'Closed Now' };
  }

  const { openTime, closeTime } = timeRange;
  const isOpen = currentTime >= openTime && currentTime < closeTime;
  
  return {
    isOpen,
    message: isOpen ? 'Open Now' : 'Closed Now'
  };
};

const OpeningHours: React.FC<OpeningHoursProps> = ({ 
  customSchedule,
  brandColor = "#22c55e",
  phone = "01494 123 456"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<{ isOpen: boolean; message: string }>({ 
    isOpen: false, 
    message: 'Closed Now' 
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const blockRef = useRef<HTMLDivElement>(null);

  const defaultSchedule: DaySchedule[] = [
    { day: "Monday", hours: "08:00 – 18:00" },
    { day: "Tuesday", hours: "08:00 – 18:00" },
    { day: "Wednesday", hours: "08:00 – 18:00" },
    { day: "Thursday", hours: "08:00 – 18:00" },
    { day: "Friday", hours: "08:00 – 18:00" },
    { day: "Saturday", hours: "08:00 – 14:00" },
    { day: "Sunday", hours: "Closed", isClosed: true }
  ];

  // Stabilize schedule to prevent unnecessary re-renders
  const schedule = useMemo(() => customSchedule || defaultSchedule, [customSchedule]);

  // Stabilize display hours with current day highlighting
  const displayHours = useMemo(() => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    // Helper function to expand grouped days
    const expandGroupedDays = (schedule: DaySchedule[]): DaySchedule[] => {
      const fullDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const shortDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      
      return schedule.flatMap(item => {
        // Check if this is a grouped day format (contains dash or en-dash)
        if (item.day.includes('–') || item.day.includes('-')) {
          // Split by dash and clean up whitespace
          const parts = item.day.split(/[–-]/).map(part => part.trim());
          
          if (parts.length === 2) {
            const [startDay, endDay] = parts;
            
            // Find indices in short day names array
            const startIndex = shortDayNames.findIndex(day => 
              day.toLowerCase() === startDay.toLowerCase() || 
              day.toLowerCase().startsWith(startDay.toLowerCase())
            );
            const endIndex = shortDayNames.findIndex(day => 
              day.toLowerCase() === endDay.toLowerCase() || 
              day.toLowerCase().startsWith(endDay.toLowerCase())
            );
            
            if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
              // Expand the range
              const expandedDays: DaySchedule[] = [];
              for (let i = startIndex; i <= endIndex; i++) {
                expandedDays.push({
                  day: fullDayNames[i],
                  hours: item.hours,
                  isClosed: item.isClosed,
                  isToday: fullDayNames[i] === currentDay
                });
              }
              return expandedDays;
            }
          }
        }
        
        // Handle individual days - normalize to full day names
        const normalizedDay = fullDayNames.find(fullDay => 
          fullDay.toLowerCase() === item.day.toLowerCase() ||
          fullDay.toLowerCase().startsWith(item.day.toLowerCase())
        ) || item.day;
        
        return [{
          ...item,
          day: normalizedDay,
          isToday: normalizedDay === currentDay
        }];
      });
    };
    
    // Expand grouped days and ensure we have all 7 days
    const expandedSchedule = expandGroupedDays(schedule);
    
    // Ensure all 7 days are present (fill missing days with default schedule)
    const fullDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const completeSchedule: DaySchedule[] = [];
    
    fullDayNames.forEach(dayName => {
      const existingDay = expandedSchedule.find(item => item.day === dayName);
      if (existingDay) {
        completeSchedule.push(existingDay);
      } else {
        // Add missing day with default hours
        const isWeekend = dayName === 'Saturday' || dayName === 'Sunday';
        completeSchedule.push({
          day: dayName,
          hours: isWeekend ? (dayName === 'Saturday' ? '08:00 – 14:00' : 'Closed') : '08:00 – 18:00',
          isClosed: dayName === 'Sunday',
          isToday: dayName === currentDay
        });
      }
    });
    
    return completeSchedule;
  }, [schedule]);

  // Update current time every minute for accurate status
  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Check open status when time changes
  useEffect(() => {
    const status = checkOpenStatus(displayHours);
    setCurrentStatus(status);
  }, [currentTime, displayHours]);

  // IntersectionObserver for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => {
      if (blockRef.current) {
        observer.unobserve(blockRef.current);
      }
    };
  }, []);

  return (
    <div ref={blockRef} className="w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Status Badge */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: brandColor }}
            >
              <Clock className="w-7 h-7 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Opening Hours
          </h2>
          
          {/* Status Badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm shadow-md ${
              currentStatus.isOpen 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-700 text-white'
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full ${
                currentStatus.isOpen ? 'bg-white animate-pulse' : 'bg-gray-400'
              }`} />
              {currentStatus.message}
            </div>
          </div>

          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            We're here when you need us
          </p>

        </div>

        {/* Schedule Card */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-8 sm:p-10 lg:p-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-3">
              {displayHours.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-4 px-5 rounded-xl transition-all duration-300 ${
                    item.isToday
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 shadow-md'
                      : 'bg-gray-50/50 hover:bg-gray-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-lg ${
                      item.isToday ? 'text-green-800' : 'text-gray-800'
                    }`}>
                      {item.day}
                    </span>
                    {item.isToday && (
                      <span className="text-xs font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full uppercase tracking-wide">
                        Today
                      </span>
                    )}
                  </div>
                  <span className={`font-semibold text-lg ${
                    item.isClosed ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-green-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Need urgent assistance?</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Outside of business hours? Give us a call and we'll do our best to help with emergency breakdowns and urgent repairs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-10 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-gray-700 font-medium mb-6 text-lg">
            Questions about our opening times?
          </p>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-lg"
            style={{ 
              backgroundColor: brandColor,
              boxShadow: `0 10px 30px -10px ${brandColor}80`
            }}
          >
            <Phone className="w-6 h-6" />
            Call Us: {phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;