export class CreateUserService {
  constuctor() {}

  async execute(props: any) {
    console.log('Create User Service', { props });

    return props;
  }
}
