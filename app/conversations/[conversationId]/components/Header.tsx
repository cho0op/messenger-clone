'use client';

import Avatar from '@/app/components/sidebar/Avatar';
import AvatarGroup from '@/app/components/sidebar/AvatarGroup';
import ProfileDrawer from '@/app/conversations/[conversationId]/components/ProfileDrawer';
import useActiveList from '@/app/hooks/useActiveList';
import useOtherUser from '@/app/hooks/useOtherUser';
import { ConversationWithUsers } from '@/app/types';
import Link from 'next/link';
import { ReactElement, useMemo, useState } from 'react';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';

interface HeaderProps {
  conversation: ConversationWithUsers;
}

const Header = ({ conversation }: HeaderProps): ReactElement => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const { members } = useActiveList();
  const isActive = otherUser?.email && members.indexOf(otherUser.email) !== -1;

  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
      <div className='flex w-full justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6'>
        <div className='flex items-center gap-3'>
          <Link
            href='/conversations'
            className={
              'block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden'
            }
          >
            <HiChevronLeft />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className='flex flex-col'>
            <div>{conversation.name || otherUser?.name}</div>
            <div className='text-sm font-light text-neutral-500'>
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          className='cursor-pointer text-sky-500 transition hover:text-sky-600'
          onClick={() => setDrawerOpen(true)}
        />
      </div>
    </>
  );
};

export default Header;
