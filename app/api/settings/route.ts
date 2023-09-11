import getCurrentUser from '@/app/actions/getCurrentUser';
import prismaClient from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { image, name } = await request.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedProfile = await prismaClient.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log('settings error');
  }
}
