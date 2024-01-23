import React from "react";

type RangeSliderProps = {
  name: string;
  value: string;
  changeHandler: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

export default function RangeSlider({
  name,
  value,
  changeHandler,
}: RangeSliderProps) {
  return (
    <>
      <div className='flex flex-col gap-4 text-white '>
        <div className='uppercase italic text-xl laptop:text-4xl'>{name}</div>
        <div className='flex gap-4'>
          <input
            className='slider w-full'
            name={name}
            type='range'
            min='1'
            max='10'
            step='1'
            value={value}
            onChange={changeHandler}
          />
          <div>{value}</div>
        </div>
      </div>
    </>
  );
}
