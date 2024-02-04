export class CreateRestaurantService {
  constuctor() {}

  async execute(props: any) {
    console.log('Create Restaurant Service', { props });

    return props;
  }
}
