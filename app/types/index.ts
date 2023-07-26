import { Message, User } from '@prisma/client';

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = {
  users: User[];
  messages: FullMessageType[];
};
