const slotService =
  require('../services/slot.service');

const asyncHandler =
    require('../utils/async.handler');

const getSlotsByProviderAndDate = asyncHandler(
  async (req, res) => {
    const { providerId } = req.params;
    const { date } = req.query;

    const slots =
      await slotService.getSlotsByProviderAndDate(
        providerId,
        date
      );

    res.status(200).json({
      success: true,
      data: slots
    });
  }
);

module.exports = {
  getSlotsByProviderAndDate
};