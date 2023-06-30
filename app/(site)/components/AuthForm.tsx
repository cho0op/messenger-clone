'use client';

import Button from '@/app/components/buttons/Button';
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
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input label='Name' id='name' register={register} errors={errors} />
          )}
          <Input
            label='Email'
            id='email'
            type='email'
            register={register}
            errors={errors}
          />
          <Input
            label='Password'
            id='password'
            type='password'
            register={register}
            errors={errors}
          />
          <div>
            <Button />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
