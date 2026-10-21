const slotRepository =
  require('../repositories/slot.repository');

const providerRepository =
  require('../repositories/provider.repository');

const getSlotsByProviderAndDate = (providerId, date) => {
  const provider =
    providerRepository.getProviderById(providerId);

  if (!provider) {
    const error = new Error('Provider not found');
    error.statusCode = 404;
    throw error;
  }

  if (!date) {
    const error = new Error('Date is required');
    error.statusCode = 400;
    throw error;
  }

  return slotRepository
    .getSlotsByProviderAndDate(providerId, date);
};

module.exports = {
  getSlotsByProviderAndDate
};