import { CreateRestaurantService } from '../services/CreateRestaurantService';
import { FakeRestaurantsRepository } from '../repositories/fakes/FakeRestaurantsRepository';
import { ListDishDetailsService } from './ListDishDetailsService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import { AppError } from '@shared/errors/AppError';
import { FakeDishesRepository } from '../repositories/fakes/FakeDishesRepository';

let fakeDishesRepository: FakeDishesRepository;
let fakeRestaurantsRepository: FakeRestaurantsRepository;
let createRestaurant: CreateRestaurantService;
let listDishDetails: ListDishDetailsService;
let fakeDiskStorage: FakeStorageProvider;

describe('ListDishDetailsService', () => {
  beforeEach(() => {
    fakeDishesRepository = new FakeDishesRepository();
    fakeRestaurantsRepository = new FakeRestaurantsRepository();
    fakeDiskStorage = new FakeStorageProvider();
    createRestaurant = new CreateRestaurantService(
      fakeRestaurantsRepository,
      fakeDiskStorage,
    );
    listDishDetails = new ListDishDetailsService(fakeDishesRepository);
  });
  it('should be able to list a dish detail by id', async () => {
    const restaurant = await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
    });

    const dish = await fakeDishesRepository.create({
      name: 'Example Dish',
      price: '10',
      restaurantId: restaurant.id,
      description: 'description',
      image: 'image.jpg',
      resume: 'resume',
    });

    const foundDish = await listDishDetails.execute(dish.id);

    expect(foundDish).toEqual({ dish, suggestedDishes: [] });
  });
  it('should not be able to find a dish with a non existing id', async () => {
    await expect(
      listDishDetails.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
