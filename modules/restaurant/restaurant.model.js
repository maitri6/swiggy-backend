const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    id: String,
    name: String,
    locality: String,
    areaName: String,
    city: String,
    cuisines: [String],
    avgRating: Number,
    costForTwo: String,
    cloudinaryImageId: String,
    badges: {
        isOpen: String
    },
    sla: {
        deliveryTime: String,
        slaString:{
            type: String,
            default : '40-45 mins'
        },
        serviceability: String,
        lastMileTravel: Number
    },
     availability: {
        nextCloseTime : String,
         opened: String
     }
});

const restaurant = mongoose.model("restaurant",restaurantSchema);
module.exports = restaurant;