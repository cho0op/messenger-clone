'use client';

import Input from '@/app/components/inputs/Input';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === 'REGISTER') {
    }
    if (variant === 'LOGIN') {
    }
    setIsLoading(false);
  };

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const socialAction = (action: string) => {
    setIsLoading(false);
  };

  return (
    <div className='sm:maw-w-md mt-8 sm:mx-auto sm:w-full'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='' onSubmit={handleSubmit(onSubmit)}>
          <Input label='Email' id='email' register={register} errors={errors} />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
