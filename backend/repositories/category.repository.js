const categories = [{ id: 1, label: 'AC Repair', icon: 'mode_fan', caption: '12 Pros' },
  { id: 2, label: 'Electrician', icon: 'offline_bolt', caption: '24 Pros' },
  { id: 3, label: 'Deep Clean', icon: 'cleaning_services', caption: '18 Pros' },
  { id: 4, label: 'Electronics', icon: 'laptop_mac', caption: 'On-site diagnosis' },
  { id: 5, label: 'Fitness', icon: 'fitness_center', caption: 'Personal Coach' },
  { id: 6, label: 'Tutors', icon: 'school', caption: 'K-12 & STEM' },]

const getAllCategories = () => {
  return categories;
};

module.exports = {
  getAllCategories
};