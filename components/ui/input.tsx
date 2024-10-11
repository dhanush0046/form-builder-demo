import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${props.className || ''}`}
    />
  );
};