'use client';

import { ReactElement } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required: true;
  placeholder?: string;
}
const MessageInput = ({
  errors,
  register,
  required,
  type,
  placeholder,
  id,
}: MessageInputProps): ReactElement => {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className='w-full rounded-full bg-neutral-100 px-4 py-2 font-light text-black focus:outline-none'
      />
    </div>
  );
};

export default MessageInput;
