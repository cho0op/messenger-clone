'use client';

import ReactSelect from 'react-select';

interface SelectProps {
  label: string;
  isMulti?: boolean;
  value?: Record<string, any> | Record<string, any>[];
  options: Record<string, any>[];
  disabled?: boolean;
  onChange: (value: any) => void;
}

const Select = ({
  options,
  isMulti,
  disabled,
  onChange,
  value,
  label,
}: SelectProps) => {
  return (
    <div className='z-[100]'>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          menuPortalTarget={document.body}
          isMulti={isMulti}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          options={options}
          classNames={{
            control: () => 'text-sm',
          }}
        />
      </div>
    </div>
  );
};

export default Select;
