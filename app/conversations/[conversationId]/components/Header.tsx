'use client';

import { Conversation } from '@prisma/client';
import { ReactElement } from 'react';

interface HeaderProps {
  // conversation: Conversation & {
  //   users: User[];
  // };
  conversation: Conversation;
}

const Header = ({ conversation }: HeaderProps): ReactElement => {
  return <div>Header</div>;
};

export default Header;
