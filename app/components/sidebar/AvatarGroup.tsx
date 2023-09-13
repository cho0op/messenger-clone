import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users: User[];
}

const AvatarGroup = ({ users }: AvatarGroupProps) => {
  const slicedUsers = users.slice(0, 3);

  // create position map object that taker 3 users and place them id 3 angles of block
  // 1. top left
  // 2. top right
  // 3. bottom left

  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0',
  };

  return (
    <div className='relative h-11 w-11'>
      {slicedUsers.map((user, index) => {
        return (
          <div
            key={user.id}
            className={`
          absolute
          inline-block
          h-[21px]
          w-[21px]
          overflow-hidden
          rounded-full
          ${positionMap[index as keyof typeof positionMap]}
        `}
          >
            <Image
              className='h-6 w-6 rounded-full'
              src={user?.image || '/images/placeholder.jpg'}
              fill
              alt={'Avatar'}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AvatarGroup;
