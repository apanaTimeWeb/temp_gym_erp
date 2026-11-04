// RESPONSIBILITY: Owns the published weekly schedule configuration and table columns.
export const LANDING_SCHEDULE_DAYS = [
  { key: 'monday', labelKey: 'schedule.days.monday' },
  { key: 'tuesday', labelKey: 'schedule.days.tuesday' },
  { key: 'wednesday', labelKey: 'schedule.days.wednesday' },
  { key: 'thursday', labelKey: 'schedule.days.thursday' },
  { key: 'friday', labelKey: 'schedule.days.friday' },
  { key: 'saturday', labelKey: 'schedule.days.saturday' },
  { key: 'sunday', labelKey: 'schedule.days.sunday' },
] as const;

export const LANDING_SCHEDULE = [
  { time: '06:00 AM - 08:00 AM', monday: 'Cardio (Sunita)', tuesday: 'CrossFit (Arjun)', wednesday: 'Yoga (Pooja)', thursday: 'Strength (Rajesh)', friday: 'Zumba (Sunita)', saturday: 'CrossFit (Arjun)', sunday: 'Rest' },
  { time: '08:00 AM - 10:00 AM', monday: 'Strength (Rajesh)', tuesday: 'Yoga (Pooja)', wednesday: 'Cardio (Sunita)', thursday: 'CrossFit (Arjun)', friday: 'Strength (Rajesh)', saturday: 'Yoga (Pooja)', sunday: 'Open Gym' },
  { time: '06:00 PM - 08:00 PM', monday: 'Zumba (Sunita)', tuesday: 'Strength (Rajesh)', wednesday: 'CrossFit (Arjun)', thursday: 'Yoga (Pooja)', friday: 'Cardio (Sunita)', saturday: 'Zumba (Sunita)', sunday: 'Open Gym' },
  { time: '08:00 PM - 10:00 PM', monday: 'CrossFit (Arjun)', tuesday: 'Cardio (Sunita)', wednesday: 'Strength (Rajesh)', thursday: 'Zumba (Sunita)', friday: 'Yoga (Pooja)', saturday: 'Rest', sunday: 'Closed' },
] as const;
