'use client';

import MessageInput from '@/app/conversations/[conversationId]/components/MessageInput';
import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPhoto } from 'react-icons/hi2';

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId,
    });
  };

  return (
    <div className='flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-2'>
      <HiPhoto size={30} className='text-sky-500' />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='lg:pag-4 flex w-full items-center gap-2'
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
      </form>
    </div>
  );
};

export default Form;
