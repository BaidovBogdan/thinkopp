'use client';
import { MyInputForTextInterface } from '@/app/page';
import { Select, Tooltip } from 'antd';
import { useEffect, useState } from 'react';

export const MySelect = ({
  customLabel,
  customPlaceholder,
  customValue,
  setCustomValue,
  options,
}: MyInputForTextInterface) => {
  const isEmpty = customValue.trim() === '';
  const [isClick, setIsClicked] = useState(false);
  useEffect(() => {
    if (customValue) {
      setIsClicked(false);
    }
  }, [customValue]);

  return (
    <div className="w-[244px] h-[60px] lg:w-[498px] lg:h-[89px]">
      <div className="flex flex-col gap-2">
        <label>{customLabel}</label>
        <div className="relative">
          <Select
            placeholder={customPlaceholder}
            options={options}
            value={customValue || undefined}
            onClick={() => setIsClicked(true)}
            onChange={setCustomValue}
            variant={'outlined'}
            className={`border h-[54px] rounded-md focus:ring-2 ${
              isEmpty && isClick
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            style={{ width: '100%' }}
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
