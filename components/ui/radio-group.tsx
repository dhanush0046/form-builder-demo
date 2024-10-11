import React, { InputHTMLAttributes } from 'react';

export interface RadioGroupProps {
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

export interface RadioGroupItemProps extends InputHTMLAttributes<HTMLInputElement> {}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = (props) => {
  return (
    <input
      type="radio"
      {...props}
      className={`form-radio h-5 w-5 text-blue-600 ${props.className || ''}`}
    />
  );
};