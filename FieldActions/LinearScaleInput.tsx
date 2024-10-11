import { useState } from 'react';

export const LinearScaleInput = ({ min = 1, max = 10 }) => {
  const [value, setValue] = useState(min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full"
      />
      <div className="flex justify-between">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <p className="text-gray-700 mt-2 text-center">{value}</p>
    </div>
  );
};
