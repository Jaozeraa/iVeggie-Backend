import { RefreshUserTokenService } from './RefreshUserTokenService';
import { AuthenticateUserService } from './AuthenticateUserService';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let authenticateUser: AuthenticateUserService;
let refreshUserToken: RefreshUserTokenService;

describe('RefreshUserToken', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    refreshUserToken = new RefreshUserTokenService(fakeUsersRepository);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to get a new access token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    const newTokens = await refreshUserToken.execute(response.refreshToken);

    expect(newTokens).toHaveProperty('accessToken');
  });
  it('should not be able to get a new access token with non existing refresh token', async () => {
    await expect(
      refreshUserToken.execute('non-existing-refresh-token'),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to get a new access token with refresh token of a non existing account', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    await fakeUsersRepository.delete(user.id);

    await expect(
      refreshUserToken.execute(response.refreshToken),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to get a new access token with expired refresh token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123123',
    });

    const { secret: refreshTokenSecret } = authConfig.jwtRefreshToken;

    const refreshToken = sign({}, refreshTokenSecret, {
      expiresIn: '-1s',
      subject: user.id,
    });

    await expect(refreshUserToken.execute(refreshToken)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
