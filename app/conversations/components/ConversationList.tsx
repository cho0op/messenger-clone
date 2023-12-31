'use client';

import ConversationBox from '@/app/conversations/components/ConversationBox';
import GroupChatModal from '@/app/conversations/components/GroupChatModal';
import useConversation from '@/app/hooks/useConversation';
import { pusherClient } from '@/app/libs/pusher';
import { FullConversationType } from '@/app/types';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList = ({
  initialItems,
  users,
}: ConversationListProps): ReactElement => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const userEmail = useMemo(() => {
    return session.data?.user?.email as string;
  }, [session.data?.user?.email]);
  const { conversationId, isOpen } = useConversation();

  useEffect(() => {
    if (!userEmail) {
      return;
    }

    const newConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (current.find((item) => item.id === conversation.id)) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateConversationHandler = ({
      id,
      messages,
    }: FullConversationType) => {
      setItems((current) => {
        return current.map((item) => {
          if (item.id === id) {
            const lastMessage = messages[messages.length - 1];
            return {
              ...item,
              messages: [...item.messages, lastMessage],
              lastMessageAt: lastMessage.createdAt,
            };
          }
          return item;
        });
      });
    };

    const deleteConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return current.filter((item) => item.id !== conversation.id);
      });

      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    };

    pusherClient.subscribe(userEmail);
    pusherClient.bind('conversation:update', updateConversationHandler);
    pusherClient.bind('conversation:new', newConversationHandler);
    pusherClient.bind('conversation:delete', deleteConversationHandler);

    return () => {
      pusherClient.unsubscribe(userEmail);
      pusherClient.unbind('conversation:update', updateConversationHandler);
      pusherClient.unbind('conversation:new', newConversationHandler);
      pusherClient.bind('conversation:delete', deleteConversationHandler);
    };
  }, [conversationId, router, userEmail]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
    fixed
    inset-y-0
    overflow-y-auto
    border-r
    border-gray-200
    pb-20
    lg:left-20
    lg:block
    lg:w-80
    lg:pb-0
  `,
          isOpen ? 'hidden' : 'left-0 block w-full'
        )}
      >
        <div className='px-5'>
          <div className='bm-4 flex justify-between pt-4'>
            <div className='text-2xl font-bold text-neutral-800'>Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className='cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition hover:opacity-75'
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => {
            return (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
