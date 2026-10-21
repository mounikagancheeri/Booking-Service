const serviceService =
  require('../services/service.service');

const asyncHandler =
  require('../utils/async.handler');

const getServicesByProviderId = asyncHandler(
  async (req, res) => {
    const { providerId } = req.params;

    const services =
      await serviceService
        .getServicesByProviderId(providerId);

    res.status(200).json({
      success: true,
      data: services
    });
  }
);

module.exports = {
  getServicesByProviderId
};