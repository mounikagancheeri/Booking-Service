const services = [
  {
    id: 1,
    providerId: 1,
    name: 'AC Inspection',
    price: 499,
    durationMinutes: 30,
    description: 'Basic inspection and diagnosis'
  },
  {
    id: 2,
    providerId: 1,
    name: 'AC General Service',
    price: 999,
    durationMinutes: 60,
    description: 'Complete cleaning and maintenance'
  },
  {
    id: 3,
    providerId: 1,
    name: 'AC Repair',
    price: 799,
    durationMinutes: 90,
    description: 'Repair based on diagnosis'
  },
  {
    id: 4,
    providerId: 2,
    name: 'AC Inspection',
    price: 399,
    durationMinutes: 30,
    description: 'Inspection and diagnosis'
  }
];

const getServicesByProviderId = (providerId) => {
  return services.filter(
    service =>
      service.providerId === Number(providerId)
  );
};

module.exports = {
  getServicesByProviderId
};