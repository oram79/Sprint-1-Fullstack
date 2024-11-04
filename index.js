const { Restaurants, Cuisines } = require("./utils/data");
const express = require('express');
const path = require('path');
const { generateRandomMenuItem, generateMenu, selectRandomCuisine } = require("./utils/restaurantUtils");

const app = express();
let restaurantData = {};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Renders The Main Home Page

app.get('/', (request, response) => {
  const randomRestaurant =
    Restaurants[Math.floor(Math.random() * Restaurants.length)];
  const randomMenu = generateMenu();
  response.render('index', {
    restaurants: Restaurants,
    randomRestaurant,
    randomMenu,
  });
});

  // Renders The Restaurant Page
  
  app.get('/restaurant', (request, response) => {
    const restaurantId = request.query.restaurantId;
    const restaurant = Restaurants.find((r) => r.id === restaurantId);
    if (restaurant) {
      const menuData = generateMenu();
      response.render('restaurant', { restaurant, menuData });
    } else {
      response.status(404).send('Restaurant not found...');
    }
    console.log(`restaurantId: ${restaurantId}`);

  });


  // Renders The Restuarants Specials

  app.get('/alerts', (request, response) => {
    const specials = Restaurants.map((restaurant) => {
      const menuData = generateMenu();
      const specialItems = menuData.items.filter((item) => item.dailySpecial);
      return {
        restaurantName: restaurant.name,
        cuisine: menuData.cuisine,
        specialItems,
      };
    });
    console.log(specials);
    response.render('alerts', { specials });
  });


  // Renders The Contact Page
  app.get('/contact', (request, response) => {
    response.render('contact', { Restaurants });
});
  


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});