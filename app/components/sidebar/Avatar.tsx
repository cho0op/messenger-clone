'use client';

import useActiveList from '@/app/hooks/useActiveList';
import { User } from '@prisma/client';
import Image from 'next/image';
import { ReactElement } from 'react';

interface AvatarProps {
  user?: User;
}

const Avatar = ({ user }: AvatarProps): ReactElement => {
  const { members } = useActiveList();
  const isActive = user?.email && members.indexOf(user.email) !== -1;

  return (
    <div className='relative'>
      <div className='relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11'>
        <Image
          src={user?.image || '/images/placeholder.jpg'}
          alt='avatar'
          fill
        />
      </div>
      {isActive && (
        <span className='absolute right-0.5 top-0.5 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white'></span>
      )}
    </div>
  );
};

export default Avatar;
