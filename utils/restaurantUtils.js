const { Dishes, Cuisines, Restaurants } = require("./data");

/**
 * Generates a random menu item based on a given cuisine.
 * @param {string} cuisine - The desired cuisine for the menu item.
 * @returns {*} A random menu item with a name, description, price, and special status.
 */

function generateRandomMenuItem(cuisine) {
  const dishes = Dishes[cuisine];
  const selectDish = dishes[Math.floor(Math.random() * dishes.length)];
  const price = (Math.random() * 20 + 5).toFixed(2);
  const isDailySpecial = Math.random() > 0.8;
  return { ...selectDish, price, isDailySpecial };
}

/**
 * Selects a random cuisine type for a restaurant.
 * @returns {*} A random cuisine type.
 */

function selectRandomCuisine() {
  return Cuisines[Math.floor(Math.random() * Cuisines.length)];
}

/**
 * Generates a menu for a restaurant, including a random cuisine type and a list of menu items.
 * @returns {*} An object representing the restaurant's menu, including the cuisine type and items.
 */

function generateMenu() {
  const cuisine = selectRandomCuisine();
  const calculateItemCount = Math.floor(Math.random() * 6) +5;
  const menu = [];
  for (i = 0; i < calculateItemCount; i++) {
    menu.push(generateRandomMenuItem(cuisine));
  }
  return { cuisine, items: menu };
}

module.exports = { generateRandomMenuItem, selectRandomCuisine, generateMenu };
