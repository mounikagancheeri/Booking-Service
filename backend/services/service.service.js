const providerRepository=require('../repositories/provider.repository');
const serviceRepository=require('../repositories/service.repository');

  const getServicesByProviderId = (providerId) => {
  const provider =
    providerRepository.getProviderById(providerId);

  if (!provider) {
    const error = new Error('Provider not found');
    error.statusCode = 404;
    throw error;
  }

  return serviceRepository
    .getServicesByProviderId(providerId);
};

module.exports = {
  getServicesByProviderId
}