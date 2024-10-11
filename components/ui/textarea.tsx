import React, { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${props.className || ''}`}
    />
  );
};