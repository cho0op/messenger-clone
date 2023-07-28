import { ReactElement } from 'react';

interface IParams {
  conversationId: string;
}

const ConversationId = async ({
  params,
}: {
  params: IParams;
}): Promise<ReactElement> => {
  return <div>Converation id</div>;
};

export default ConversationId;
