import prismaClient from '@/app/libs/prismadb';

const getMessages = async (conversationId: string) => {
  try {
    return await prismaClient.message.findMany({
      where: { conversationId },
      include: { sender: true, seen: true },
      orderBy: { createdAt: 'asc' },
    });
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
