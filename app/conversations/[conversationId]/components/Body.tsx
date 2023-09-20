'use client';

import MessageBox from '@/app/conversations/[conversationId]/components/MessageBox';
import useConversation from '@/app/hooks/useConversation';
import { pusherClient } from '@/app/libs/pusher';
import { FullMessageType } from '@/app/types';
import axios from 'axios';
import { find } from 'lodash';
import { ReactElement, useEffect, useRef, useState } from 'react';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps): ReactElement => {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  const messageHandler = (message: FullMessageType) => {
    axios.post(`/api/conversations/${conversationId}/seen`);
    setMessages((current) => {
      if (find(current, { id: message.id })) {
        return current;
      }

      return [...current, message];
    });
    bottomRef?.current?.scrollIntoView();
  };

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    pusherClient.bind('messages:new', messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
    };
  }, [conversationId]);

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
