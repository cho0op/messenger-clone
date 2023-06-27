'use client';

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  disabled,
  id,
  label,
  required,
  errors,
  type,
  register,
}) => {
  return (
    <div>
      <label
        className='block text-sm font-medium leading-6 text-gray-900'
        htmlFor={id}
      >
        {label}
      </label>
      <div className='mt-2'>
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
        />
      </div>
    </div>
  );
};

export default Input;
