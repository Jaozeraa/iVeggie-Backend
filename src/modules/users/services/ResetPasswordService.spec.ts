import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { ResetPasswordService } from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const { pin } = await fakeUserTokensRepository.generate({
      userId: user.id,
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const updatedUser = await fakeUsersRepository.findById(user.id);

    await resetPassword.execute({ pin, password: '123123' });

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset password with non existing token', async () => {
    await expect(
      resetPassword.execute({
        pin: 'non-existing-pin',
        password: 'random password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non existing user', async () => {
    const { pin } = await fakeUserTokensRepository.generate({
      userId: 'Non existing user id',
    });
    await expect(
      resetPassword.execute({
        pin,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password after 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const { pin } = await fakeUserTokensRepository.generate({
      userId: user.id,
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ pin, password: '123123' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
