'use client';

import LoadingModal from '@/app/components/LoadingModal';
import Avatar from '@/app/components/sidebar/Avatar';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useState } from 'react';

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps): ReactElement => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);

    axios
      .post('/api/conversations/', {
        userId: data.id,
      })
      .then((response) => {
        router.push(`/conversations/${response.data.id}`);
      });
  }, [data.id, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className='
        transition-pointer
        relative
        flex
        w-full
        items-center
        space-x-3
        rounded-lg
        bg-white
        p-3
        hover:bg-neutral-100
      '
      >
        <Avatar user={data} />
        <div className={'min-w-0 flex-1'}>
          <div className='focus:outline-none'>
            <div className='mb-1 flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-900'>{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
