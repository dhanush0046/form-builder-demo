import React, { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${props.className || ''}`}
    >
      {children}
    </select>
  );
};

export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const SelectValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  return <span {...props} />;
};

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

export const SelectItem: React.FC<SelectItemProps> = (props) => {
  return <option {...props} />;
};