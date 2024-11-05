import { MyInputForTextInterface } from '@/app/page';
import { Input, Tooltip } from 'antd';

export const MyCustomInput = ({
  customLabel,
  customPlaceholder,
  customValue,
  setCustomValue,
}: MyInputForTextInterface) => {
  const formatInput = (value: string) => {
    const numericValue = value.replace(/\D/g, '').substring(0, 14);

    let formattedValue = '';

    if (numericValue.length > 0) {
      formattedValue += numericValue.substring(0, 3);
    }
    if (numericValue.length > 3) {
      formattedValue += '-' + numericValue.substring(3, 6);
    }
    if (numericValue.length > 6) {
      formattedValue += '-' + numericValue.substring(6, 9);
    }
    if (numericValue.length > 9) {
      formattedValue += '-' + numericValue.substring(9, 11);
    }
    if (numericValue.length > 11) {
      formattedValue += '-' + numericValue.substring(11, 14);
    }

    return formattedValue;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatInput(inputValue);
    setCustomValue(formattedValue);
  };

  const isInvalidFormat = customValue?.length >= 1 && customValue.length <= 17;

  return (
    <div className="w-[244px] h-[50px] lg:w-[498px] lg:h-[89px]">
      <div className="flex flex-col gap-2">
        <label>{customLabel}</label>
        <div className="relative">
          <Input
            placeholder={customPlaceholder}
            value={customValue}
            onChange={handleChange}
            className={`border h-[54px] rounded-md focus:ring-2 ${
              isInvalidFormat && 'border-red-500'
            }`}
          />
          {isInvalidFormat && (
            <Tooltip
              title="Неверный формат"
              placement="right"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
            >
              <span>Неверный формат</span>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
