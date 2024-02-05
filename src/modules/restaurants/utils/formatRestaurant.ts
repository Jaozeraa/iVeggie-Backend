import { Dish, Restaurant } from '@prisma/client';
import { formatDishes } from './formatDish';

const filesUrl = `${process.env.APP_API_URL}/files/`;

type FulfilledRestaurant = Restaurant & Partial<{ dishes: Dish[] }>;
export const formatRestaurant = (restaurant: FulfilledRestaurant) => {
  const formattedRestaurant = {
    ...restaurant,
    imageUrl: `${filesUrl}${restaurant.image}`,
    wallpaperUrl: `${filesUrl}${restaurant.wallpaper}`,
    ...(restaurant.dishes
      ? {
          dishes: formatDishes(restaurant.dishes),
        }
      : {}),
  };

  return formattedRestaurant;
};

export const formatRestaurants = (restaurants: FulfilledRestaurant[]) => {
  return restaurants.map(restaurant => formatRestaurant(restaurant));
};
