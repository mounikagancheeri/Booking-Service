const providers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    specialization: 'AC Technician',
    categoryId: 1,
    rating: 4.9,
    reviews: 124,
    experience: 7,
    priceFrom: 499,
    verified: true,
    location: 'Gachibowli, Hyderabad',
    nextAvailable: '2026-10-10T16:00:00'
  },
  {
    id: 2,
    name: 'Arjun Reddy',
    specialization: 'AC Technician',
    categoryId: 1,
    rating: 4.7,
    reviews: 86,
    experience: 5,
    priceFrom: 399,
    verified: true,
    location: 'Madhapur, Hyderabad',
    nextAvailable: '2026-10-10T17:30:00'
  },
  {
    id: 3,
    name: 'Suresh Kumar',
    specialization: 'Electrician',
    categoryId: 2,
    rating: 4.8,
    reviews: 98,
    experience: 8,
    priceFrom: 350,
    verified: true,
    location: 'Kondapur, Hyderabad',
    nextAvailable: '2026-10-11T10:00:00'
  }
];

const getAllProviders = (categoryId) => {
  if (!categoryId) {
    return providers;
  }

  return providers.filter(
    provider =>
      provider.categoryId === Number(categoryId)
  );
};

const getProviderById = (id) => {
  return providers.find(
    provider => provider.id === Number(id)
  );
};

module.exports = {
  getAllProviders,
  getProviderById
};