const { sendResponse } = require('../../helpers/requesthandler.helper');
const RestaurantModel = require('../restaurant/restaurant.model');
const fetch = require('cross-fetch');


exports.getAllRestaurantFromSwiggy = async (req, res, next) => {
    try {
       const url = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.4498954&lng=74.6399163&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
        //const url = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
      
        
        const restaurants = data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;

        let array = []



        for (const restaurantData of restaurants) {
            const findRestaurant = await RestaurantModel.findOne({ id: restaurantData.info.id });

            if (!findRestaurant) {
                let obj = {
                    id: restaurantData.info.id,
                    name: restaurantData.info.name,
                    locality: restaurantData.info.locality,
                    areaName: restaurantData.info.areaName,
                    city: "Ajmer",
                    avgRating: restaurantData.info.avgRating,
                    cuisines: restaurantData.info.cuisines,
                    cloudinaryImageId: restaurantData.info.cloudinaryImageId,
                    deliveryTime: restaurantData.info.sla.deliveryTime,
                    slaString: restaurantData.info.sla.slaString,
                    lastMileTravel: restaurantData.info.sla.lastMileTravel,
                    serviceability: restaurantData.info.sla.serviceability,
                    nextCloseTime: restaurantData.info.availability.nextCloseTime,
                    opened: restaurantData.info.availability.opened
                };
                array.push(obj)

            }//else{
                // const url = "https://www.swiggy.com/dapi/restaurants/list/update";
                // const response = await fetch(url, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
                //     }
                // });
                // if (!response.ok) {
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                // }
                // const data = await response.json();


           // }


        }

        await RestaurantModel.create(array);
        return sendResponse(res, true, 200, "Restaurants fetched successfully", restaurants);

    } catch (error) {
        console.log(error)
    }
};

exports.addNewRestaurant = async(req, res, next) => {
    try{
       const url = "https://www.swiggy.com/dapi/restaurants/list/update";
      
       const requestBody = req.body;
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
                    },
                    
                    body: requestBody,
                    mode: 'cors',
                    method: "POST"
                });
                const data =await response.text();
                console.log(data)
             

    }catch(error){
        console.log(error);
    }
};


