'use client';
import { Input, Tooltip } from 'antd';
import { useState } from 'react';
import { MyInputForTextInterface } from '../../page';

export const MyInputForNumber = ({
  customLabel,
  customPlaceholder,
  customValue,
  setCustomValue,
}: MyInputForTextInterface) => {
  const [warningMessage, setWarningMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      setWarningMessage('');
      setCustomValue(inputValue);
    } else {
      setWarningMessage('Можно вводить только числа');
    }
  };

  return (
    <div className="w-[244px] h-[50px] lg:w-[498px] lg:h-[89px]">
      <div className="flex flex-col gap-2">
        <label>{customLabel}</label>
        <div className="relative">
          <Input
            placeholder={customPlaceholder}
            value={customValue}
            onChange={handleChange}
            className="border h-[54px] rounded-md focus:ring-2"
          />
          {warningMessage && (
            <Tooltip
              title={warningMessage}
              placement="right"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
            >
              <span className="text-red-500">{warningMessage}</span>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
