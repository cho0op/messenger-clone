import useActiveList from '@/app/hooks/useActiveList';
import { pusherClient } from '@/app/libs/pusher';
import { Channel, Members } from 'pusher-js';
import { useEffect, useState } from 'react';

const useActiveChanel = () => {
  const { set, members, add, remove } = useActiveList();
  const [activeChanel, setActiveChanel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChanel;

    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger');
      setActiveChanel(channel);
    }

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );

      set(initialMembers);
    });

    return () => {};
  }, [activeChanel]);
};

export default useActiveChanel;
