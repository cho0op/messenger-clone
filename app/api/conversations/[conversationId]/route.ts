import getCurrentUser from '@/app/actions/getCurrentUser';
import prismaClient from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server';

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const conversation = await prismaClient.conversation.findUnique({
      where: { id: conversationId },
      include: {
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await prismaClient.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    conversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:delete', conversation);
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    return new NextResponse('Delete Error', { status: 500 });
  }
}
