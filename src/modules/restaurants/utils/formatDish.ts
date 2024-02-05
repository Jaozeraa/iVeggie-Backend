import { Dish, Restaurant } from '@prisma/client';

const filesUrl = `${process.env.APP_API_URL}/files/`;

export const formatDish = (dish: Dish) => {
  const formattedDish = {
    ...dish,
    imageUrl: `${filesUrl}${dish.image}`,
  };

  return formattedDish;
};

export const formatDishes = (dishes: Dish[]) => {
  return dishes.map(restaurant => formatDish(restaurant));
};
