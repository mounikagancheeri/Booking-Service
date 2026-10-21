const express = require('express');
const providerController = require('../controllers/provider.controller');  
const serviceController = require('../controllers/service.controller');
const {
  getSlotsByProviderAndDate
} = require('../controllers/slot.controller');
const router = express.Router();

router.get('/', providerController.getProviders);
router.get('/:id', providerController.getProviderById);
router.get(
  '/:providerId/services',
  serviceController.getServicesByProviderId
);
router.get(
  '/:providerId/slots',
  getSlotsByProviderAndDate
);
module.exports = router;