import { injectable, inject } from 'tsyringe';

import { IRestaurantsRepository } from '../repositories/IRestaurantsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '@shared/errors/AppError';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

interface IRequest {
  name: string;
  phoneNumber: string;
  address: string;
  imageFilename: string;
  wallpaperFilename: string;
  latitude: number;
  longitude: number;
}
@injectable()
export class CreateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute({
    address,
    imageFilename,
    name,
    phoneNumber,
    wallpaperFilename,
    latitude,
    longitude,
  }: IRequest) {
    const restaurantExists = await this.restaurantsRepository.findOne({
      phoneNumber,
    });

    if (restaurantExists) {
      throw new AppError(ErrorsEnum.restaurantAlreadyExists);
    }

    const formattedImageFilename = await this.storageProvider.saveFile(
      imageFilename,
    );
    const formattedWallpaperFilename = await this.storageProvider.saveFile(
      wallpaperFilename,
    );

    const restaurant = await this.restaurantsRepository.create({
      address: address,
      name: name,
      image: formattedImageFilename,
      phoneNumber: phoneNumber,
      wallpaper: formattedWallpaperFilename,
      rate: 5,
      latitude,
      longitude,
    });

    return restaurant;
  }
}
