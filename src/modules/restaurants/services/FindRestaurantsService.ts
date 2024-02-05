import { injectable, inject } from 'tsyringe';

import { IRestaurantsRepository } from '../repositories/IRestaurantsRepository';
import { IFindRestaurantsDTO } from '../dtos/IFindRestaurantsDTO';

@injectable()
export class FindRestaurantsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  async execute(props: IFindRestaurantsDTO) {
    const { payload } = props;

    if (payload === '') {
      const restaurants = await this.restaurantsRepository.findAll();
      return restaurants;
    }
    const restaurants = await this.restaurantsRepository.search(payload);

    return restaurants;
  }
}
