import { User } from '@/interface/user.interface';
import { v4 as uuid } from 'uuid';

export const user: User = {
  id: uuid(),
  firstName: 'Aeyll',
  lastName: 'Lo',
  nickname: 'Aeyll lo',
};
