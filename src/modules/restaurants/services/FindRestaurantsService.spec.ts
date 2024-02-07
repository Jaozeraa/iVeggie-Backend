import { CreateRestaurantService } from '../services/CreateRestaurantService';
import { FakeRestaurantsRepository } from '../repositories/fakes/FakeRestaurantsRepository';
import { FindRestaurantsService } from './FindRestaurantsService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeRestaurantsRepository: FakeRestaurantsRepository;
let createRestaurant: CreateRestaurantService;
let findRestaurants: FindRestaurantsService;
let fakeDiskStorage: FakeStorageProvider;

describe('FindRestaurants', () => {
  beforeEach(() => {
    fakeRestaurantsRepository = new FakeRestaurantsRepository();
    fakeDiskStorage = new FakeStorageProvider();
    createRestaurant = new CreateRestaurantService(
      fakeRestaurantsRepository,
      fakeDiskStorage,
    );
    findRestaurants = new FindRestaurantsService(fakeRestaurantsRepository);
  });
  it('should be able to find a restaurant by name', async () => {
    const restaurant = await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
      latitude: 0,
      longitude: 0,
    });

    const foundRestaurants = await findRestaurants.execute({
      payload: 'Example Restaurant',
    });

    expect(foundRestaurants).toContainEqual(restaurant);
  });
  it('should be able to find a restaurant by dish name', async () => {
    const restaurant = await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
      latitude: 0,
      longitude: 0,
    });

    const foundRestaurants = await findRestaurants.execute({
      payload: 'Example Restaurant',
    });

    expect(foundRestaurants).toContainEqual(restaurant);
  });
  it('should be able to find a restaurant by dish resume', async () => {
    const restaurant = await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
      latitude: 0,
      longitude: 0,
    });

    const foundRestaurants = await findRestaurants.execute({
      payload: 'Example Restaurant',
    });

    expect(foundRestaurants).toContainEqual(restaurant);
  });
  it('should be able to find a restaurant by dish description', async () => {
    const restaurant = await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
      latitude: 0,
      longitude: 0,
    });

    const foundRestaurants = await findRestaurants.execute({
      payload: 'Example Restaurant',
    });

    expect(foundRestaurants).toContainEqual(restaurant);
  });
  it('should be able to find all restaurants by empty payload', async () => {
    const restaurant = await createRestaurant.execute({
      name: 'Example Restaurant',
      imageFilename: 'image.jpg',
      wallpaperFilename: 'wallpaper.jpg',
      phoneNumber: '123123',
      address: 'address',
      latitude: 0,
      longitude: 0,
    });

    const foundRestaurants = await findRestaurants.execute({
      payload: '',
    });

    expect(foundRestaurants).toContainEqual(restaurant);
  });
});
