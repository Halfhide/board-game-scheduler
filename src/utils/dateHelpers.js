import { format, parseISO } from 'date-fns';

/**
 * Format a date string to a readable format
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date (e.g., "Friday, March 15, 2026")
 */
export function formatDate(dateString) {
  try {
    return format(parseISO(dateString), 'EEEE, MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Generate an array of dates from a start date to an end date
 * @param {string} startDate - ISO date string (YYYY-MM-DD)
 * @param {string} endDate - ISO date string (YYYY-MM-DD)
 * @returns {string[]} Array of ISO date strings
 */
export function generateDateRange(startDate, endDate) {
  const dates = [];
  let current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

/**
 * Sort dates in ascending order
 * @param {Array} dates - Array of date objects with 'date' property
 * @returns {Array} Sorted array
 */
export function sortDates(dates) {
  return [...dates].sort((a, b) =>
    parseISO(a.date) - parseISO(b.date)
  );
}
