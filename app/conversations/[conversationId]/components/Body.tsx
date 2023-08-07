'use client';

import MessageBox from '@/app/conversations/[conversationId]/components/MessageBox';
import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import { ReactElement, useRef, useState } from 'react';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps): ReactElement => {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, index) => {
        return (
          <MessageBox
            isLast={index === messages?.length - 1}
            key={message.id}
            data={message}
          />
        );
      })}
      <div ref={bottomRef} className={'pt-24'} />
    </div>
  );
};

export default Body;
