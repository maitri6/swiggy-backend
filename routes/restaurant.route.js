const express = require('express');
const router = express.Router();
const restaurantController = require('../modules/restaurant/restaurant.controller');
const {authenticated} = require('../middlewares/authenticated.middleware');

router.get('/getAllRestaurantFromSwiggy',restaurantController.getAllRestaurantFromSwiggy);
router.post('/addNewRestaurant',restaurantController.addNewRestaurant);





module.exports = router;