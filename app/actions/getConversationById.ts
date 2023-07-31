import getCurrentUser from '@/app/actions/getCurrentUser';
import prismaClient from '@/app/libs/prismadb';
import { Conversation } from '@prisma/client';

export const getConversationById = async (
  conversationId: string
): Promise<Conversation | null> => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.email) {
    return null;
  }

  try {
    return await prismaClient.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
