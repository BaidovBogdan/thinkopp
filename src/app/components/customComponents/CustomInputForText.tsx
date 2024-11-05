'use client';
import React, { useEffect, useState } from 'react';
import { MyInputForTextInterface } from '../../page';
import { Input, Tooltip } from 'antd';

export const MyInputForText = ({
  customLabel,
  customPlaceholder,
  customValue,
  setCustomValue,
}: MyInputForTextInterface) => {
  const [isClick, setIsClicked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCustomValue(inputValue);
  };

  const isEmpty = customValue.trim() === '';

  useEffect(() => {
    if (customValue) {
      setIsClicked(false);
    }
  }, [customValue]);

  return (
    <div className="w-[244px] h-[50px] lg:w-[498px] lg:h-[89px]">
      <div className="flex flex-col gap-2">
        <label>{customLabel}</label>
        <div className="relative">
          <Input
            placeholder={customPlaceholder}
            value={customValue}
            onChange={handleChange}
            onClick={() => setIsClicked(true)}
            className={`border h-[54px] rounded-md focus:ring-2 ${
              isEmpty && isClick
                ? 'border-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {isEmpty && isClick && (
            <Tooltip
              title="Заполните поле"
              placement="right"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
            >
              <span>Заполните поле</span>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
