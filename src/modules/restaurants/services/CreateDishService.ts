import { injectable, inject } from 'tsyringe';

import { IRestaurantsRepository } from '../repositories/IRestaurantsRepository';
import { AppError } from '@shared/errors/AppError';
import { IDishesRepository } from '../repositories/IDishesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

interface IRequest {
  name: string;
  description: string;
  resume: string;
  price: string;
  imageFilename: string;
  restaurantId: string;
}

@injectable()
export class CreateDishService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
    @inject('DishesRepository')
    private dishesRepository: IDishesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    description,
    imageFilename,
    name,
    price,
    restaurantId,
    resume,
  }: IRequest) {
    const restaurant = await this.restaurantsRepository.findById(restaurantId);

    if (!restaurant) {
      throw new AppError(ErrorsEnum.restaurantNotFound);
    }

    const formattedImageFilename = await this.storageProvider.saveFile(
      imageFilename,
    );

    const dish = await this.dishesRepository.create({
      description,
      image: formattedImageFilename,
      name,
      price: price,
      restaurantId,
      resume,
    });

    return dish;
  }
}
