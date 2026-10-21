// Mock slot data: every provider gets the same daily arrival times, generated for a
// rolling window starting today so the booking screen always has dates to show.
const DAYS_AHEAD = 14;

const DAILY_TIMES = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00'
];

const pad = (n) => String(n).padStart(2, '0');

const toIsoDate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Marks a few slots as booked in a pattern that varies by provider and day
// but stays the same between requests.
const isBooked = (providerId, dayIndex, timeIndex) =>
  (providerId * 7 + dayIndex * 3 + timeIndex * 5) % 4 === 0;

const getSlotsByProviderAndDate = (providerId, date) => {
  const id = Number(providerId);
  const today = new Date();

  for (let dayIndex = 0; dayIndex < DAYS_AHEAD; dayIndex++) {
    const day = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + dayIndex
    );
    if (toIsoDate(day) !== date) {
      continue;
    }
    return DAILY_TIMES.map((time, timeIndex) => ({
      id: `${id}-${date}-${time}`,
      providerId: id,
      date,
      time,
      available: !isBooked(id, dayIndex, timeIndex)
    }));
  }

  return [];
};

module.exports = {
  getSlotsByProviderAndDate
};
