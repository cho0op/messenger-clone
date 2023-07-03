'use client';

import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = () => {
  return (
    <div>
      <div>asd</div>
    </div>
  );
};

export default Button;
