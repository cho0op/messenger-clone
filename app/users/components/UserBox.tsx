'use client';

import { User } from '@prisma/client';
import { ReactElement } from 'react';

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps): ReactElement => {
  return <div>фывфыв</div>;
};

export default UserBox;
