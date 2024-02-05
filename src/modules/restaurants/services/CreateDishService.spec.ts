import { CreateRestaurantService } from '../services/CreateRestaurantService';
import { CreateDishService } from '../services/CreateDishService';
import { FakeRestaurantsRepository } from '../repositories/fakes/FakeRestaurantsRepository';
import { AppError } from '@shared/errors/AppError';
import { validate } from 'uuid';
import { FakeDishesRepository } from '../repositories/fakes/FakeDishesRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeRestaurantsRepository: FakeRestaurantsRepository;
let fakeDishesRepository: FakeDishesRepository;
let createRestaurant: CreateRestaurantService;
let createDish: CreateDishService;
let diskStorage: FakeStorageProvider;

describe('CreateDish', () => {
  beforeEach(() => {
    diskStorage = new FakeStorageProvider();
    fakeRestaurantsRepository = new FakeRestaurantsRepository();
    fakeDishesRepository = new FakeDishesRepository();
    createRestaurant = new CreateRestaurantService(
      fakeRestaurantsRepository,
      diskStorage,
    );
    createDish = new CreateDishService(
      fakeRestaurantsRepository,
      fakeDishesRepository,
      diskStorage,
    );
  });
  it('should be able to create a dish', async () => {
    const restaurant = await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
    });

    const dish = await createDish.execute({
      name: 'Example Dish',
      price: 10,
      restaurantId: restaurant.id,
      description: 'description',
      imageFilename: 'image.jpg',
      resume: 'resume',
    });

    expect(dish).toHaveProperty('id');
    expect(validate(dish.id)).toBe(true);
  });

  it('should not be able to create a dish with not existing restaurant', async () => {
    await expect(
      createDish.execute({
        name: 'Example Dish',
        price: 10,
        restaurantId: 'non-existing-id',
        description: 'description',
        imageFilename: 'image.jpg',
        resume: 'resume',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
