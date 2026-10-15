// Common list of countries
export const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'Singapore',
  'Saudi Arabia',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'South Africa',
  'Malaysia',
  'Philippines',
  'Indonesia',
  'Qatar',
  'Kuwait',
  'Oman',
  'Bahrain',
  'New Zealand',
  'Ireland',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Japan',
  'South Korea',
  'Brazil',
  'Mexico',
  'Nigeria',
  'Kenya',
  'Other'
];

export const COMPANY_SIZES = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '500+'
];

export const FIX_OPTIONS = [
  'Know who did what each day',
  'Project costing',
  'Client progress view',
  'Intern tracking',
  'Replace Excel and WhatsApp'
];

export const ROLES = [
  'Founder or MD',
  'Project or Delivery head',
  'HR',
  'Operations',
  'Other'
];

export const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM',
  '06:30 PM'
];

// Helper to track analytics events safely without throwing errors
export function trackEvent(eventName, payload = {}) {
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('worklogix_event', { detail: { event: eventName, ...payload } }));
      console.log(`[Event Tracked: ${eventName}]`, payload);
      if (window.dataLayer) {
        window.dataLayer.push({ event: eventName, ...payload });
      }
      if (window.gtag) {
        window.gtag('event', eventName, payload);
      }
    }
  } catch (err) {
    console.error('Analytics tracking error:', err);
  }
}

// Generate .ics calendar invite file and trigger download
export function downloadICS({ title, description, dateStr, timeStr, timezone, location = 'Google Meet / WorkLogix Demo' }) {
  try {
    // Parse date and time into UTC string for ICS
    const [year, month, day] = dateStr.split('-').map(Number);
    let hour = 10;
    let minute = 0;
    if (timeStr) {
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        hour = parseInt(match[1], 10);
        minute = parseInt(match[2], 10);
        const ampm = match[3].toUpperCase();
        if (ampm === 'PM' && hour < 12) hour += 12;
        if (ampm === 'AM' && hour === 12) hour = 0;
      }
    }

    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // 45 min demo

    const pad = (n) => (n < 10 ? '0' + n : n);
    const formatICSDate = (d) => {
      return (
        d.getUTCFullYear() +
        pad(d.getUTCMonth() + 1) +
        pad(d.getUTCDate()) +
        'T' +
        pad(d.getUTCHours()) +
        pad(d.getUTCMinutes()) +
        pad(d.getUTCSeconds()) +
        'Z'
      );
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WorkLogix//Product Demo//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:demo-${Date.now()}@worklogix.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `WorkLogix-Demo-${dateStr}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Failed to generate ICS file:', e);
  }
}
