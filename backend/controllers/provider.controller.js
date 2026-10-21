const providerService =
  require('../services/provider.service');

  const asyncHandler=require('../utils/async.handler');

// const getProviders = (req, res) => {
//   const { categoryId } = req.query;

//   const providers =
//     providerService.getAllProviders(categoryId);

//   res.status(200).json({
//     success: true,
//     data: providers
//   });
// };

const getProviders = asyncHandler(async (req, res) => {
  const { categoryId } = req.query;

  const providers =
    await providerService.getAllProviders(categoryId);

  res.status(200).json({
    success: true,
    data: providers
  });
});



const getProviderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const provider = await providerService.getProviderById(id);

  res.status(200).json({
    success: true,
    data: provider
  });
});     
    

module.exports = {
  getProviders,
  getProviderById
};
