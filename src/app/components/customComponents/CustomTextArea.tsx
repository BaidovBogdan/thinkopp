import { MyInputForTextInterface } from '@/app/page';
import TextArea from 'antd/es/input/TextArea';

export const MyTextArea = ({
  customLabel,
  customPlaceholder,
  customValue,
  setCustomValue,
}: MyInputForTextInterface) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomValue(e.target.value);
  };
  return (
    <div className="w-[244px] h-[100px] lg:w-[498px] lg:h-[189px]">
      <div className="flex flex-col gap-2">
        <label>{customLabel}</label>
        <div className="relative">
          <TextArea
            placeholder={customPlaceholder}
            value={customValue}
            onChange={handleChange}
            className={`border rounded-md focus:ring-2`}
            autoSize={{ minRows: 6.7, maxRows: 6.7 }}
          />
        </div>
      </div>
    </div>
  );
};
