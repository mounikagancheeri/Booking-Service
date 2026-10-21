const express = require('express');
const catergoryController = require('../controllers/category.controller');

const router = express.Router();

router.get('/', catergoryController.getcategories);
module.exports = router;