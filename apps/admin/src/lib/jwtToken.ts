import constants from '@/constants';
import { Supplier } from '@repo/types';
import jwt from 'jsonwebtoken';

import { User } from '@/types/user';

export const getNewToken = async (user: Supplier | User) => {
  const token = jwt.sign({ userId: user.id }, constants.jwtSecret, {
    expiresIn: '7d',
  });
  return token;
};
