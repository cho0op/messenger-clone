import getCurrentUser from '@/app/actions/getCurrentUser';

import prismaClient from '@/app/libs/prismadb';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await prismaClient.message.create({
      data: {
        conversation: { connect: { id: conversationId } },
        sender: { connect: { id: currentUser.id } },
        body: message,
        seen: { connect: { id: currentUser.id } },
        image,
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prismaClient.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return NextResponse.json(newMessage);
  } catch (error: any) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
