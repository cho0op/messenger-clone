'use client';

import useOtherUser from '@/app/hooks/useOtherUser';
import { ConversationWithUsers } from '@/app/types';

interface ProfileDrawerProps {
  data: ConversationWithUsers;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer = ({ onClose, isOpen, data }: ProfileDrawerProps) => {
  const otherUser = useOtherUser(data);
  return <div></div>;
};

export default ProfileDrawer;
