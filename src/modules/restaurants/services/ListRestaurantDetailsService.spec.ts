import { CreateRestaurantService } from '../services/CreateRestaurantService';
import { FakeRestaurantsRepository } from '../repositories/fakes/FakeRestaurantsRepository';
import { ListRestaurantDetailsService } from './ListRestaurantDetailsService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import { AppError } from '@shared/errors/AppError';

let fakeRestaurantsRepository: FakeRestaurantsRepository;
let createRestaurant: CreateRestaurantService;
let listRestaurantDetails: ListRestaurantDetailsService;
let fakeDiskStorage: FakeStorageProvider;

describe('ListRestaurantDetails', () => {
  beforeEach(() => {
    fakeRestaurantsRepository = new FakeRestaurantsRepository();
    fakeDiskStorage = new FakeStorageProvider();
    createRestaurant = new CreateRestaurantService(
      fakeRestaurantsRepository,
      fakeDiskStorage,
    );
    listRestaurantDetails = new ListRestaurantDetailsService(
      fakeRestaurantsRepository,
    );
  });
  it('should be able to list a restaurant details by id', async () => {
    const restaurant = await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
      latitude: 0,
      longitude: 0,
    });

    const foundRestaurant = await listRestaurantDetails.execute(restaurant.id);

    expect(foundRestaurant).toBe(restaurant);
  });
  it('should not be able to find a restaurant with a non existing id', async () => {
    await expect(
      listRestaurantDetails.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
