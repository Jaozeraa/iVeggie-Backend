import { container } from 'tsyringe';

import IHashProvider from './models/IHashProvider';
import Argon2HashProvider from './implementations/Argon2HashProvider';

container.registerSingleton<IHashProvider>('HashProvider', Argon2HashProvider);
