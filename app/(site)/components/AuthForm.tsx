'use client';

import AuthSocialButton from '@/app/(site)/components/AuthSocialButton';
import Button from '@/app/components/buttons/Button';
import Input from '@/app/components/inputs/Input';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsGithub, BsGoogle } from 'react-icons/bs';

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
      axios
        .post('api/register', data)
        .catch(() => {
          toast.error('error');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === 'LOGIN') {
    }
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
  console.log('isLoading', isLoading);
  return (
    <div className='sm:maw-w-md mt-8 sm:mx-auto sm:w-full'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              label='Name'
              id='name'
              register={register}
              errors={errors}
            />
          )}
          <Input
            disabled={isLoading}
            label='Email'
            id='email'
            type='email'
            register={register}
            errors={errors}
          />
          <Input
            disabled={isLoading}
            label='Password'
            id='password'
            type='password'
            register={register}
            errors={errors}
          />
          <div>
            <Button type='submit' fullWidth disabled={isLoading}>
              {variant === 'LOGIN' ? 'Sign In' : 'Sign Up'}
            </Button>
          </div>
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div className='items flex-center absolute inset-0 items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 leading-[0.3em] text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <div className='mt-6 flex gap-2'>
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction('github')}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction('github')}
          />
        </div>
      </div>
      <div className='mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500'>
        <div>
          {variant === 'LOGIN'
            ? 'New to Messenger?'
            : 'Already have an account?'}
        </div>
        <div onClick={toggleVariant} className='cursor-pointer underline'>
          {variant === 'LOGIN' ? 'Create an account' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
