const router      = require('express').Router();
const db = require('../db/config');

const Restaurants ={
	findAllByUser: (userId)=> db.manyOrNone('SELECT * FROM restaurants WHERE user_id=$1', [userId]), 

	findById: (id, userId)=>db.one(`SELECT * FROM restaurants WHERE  id= $1 AND user_id=$2`, [id, userId]), 

	findRestaurantIdExist:()=> db.manyOrNone(`SELECT restaurant_id FROM Restaurants`),

  findAllRestaurants:()=> db.manyOrNone(`SELECT * FROM restaurants`), 

  create: (restaurant_id, name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating, userId) => {
    return db.one(
  		`INSERT INTO restaurants (restaurant_id, name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating,user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *`,
      [restaurant_id, name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating, userId]
  	);
  },


	delete: (id, userId) => db.none('DELETE FROM restaurants WHERE id = $1 AND user_id=$2', [id, userId])
};


module.exports = Restaurants;