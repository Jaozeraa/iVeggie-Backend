import { CreateRestaurantService } from '../services/CreateRestaurantService';
import { FakeRestaurantsRepository } from '../repositories/fakes/FakeRestaurantsRepository';
import { AppError } from '@shared/errors/AppError';
import { validate } from 'uuid';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeRestaurantsRepository: FakeRestaurantsRepository;
let createRestaurant: CreateRestaurantService;
let fakeDiskStorage: FakeStorageProvider;

describe('CreateRestaurant', () => {
  beforeEach(() => {
    fakeRestaurantsRepository = new FakeRestaurantsRepository();
    fakeDiskStorage = new FakeStorageProvider();
    createRestaurant = new CreateRestaurantService(
      fakeRestaurantsRepository,
      fakeDiskStorage,
    );
  });
  it('should be able to create an restaurant', async () => {
    const restaurant = await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
    });

    expect(restaurant).toHaveProperty('id');
    expect(validate(restaurant.id)).toBe(true);
  });
  it('should not be able to create an restaurant with the same phone number as another restaurant', async () => {
    await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
    });

    await expect(
      createRestaurant.execute({
        name: 'Example Restaurant',
        imageFilename: 'image.jpg',
        wallpaperFilename: 'wallpaper.jpg',
        phoneNumber: '123123',
        address: 'address',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
