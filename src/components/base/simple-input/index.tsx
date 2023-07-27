import clsx from 'clsx';
import { type FC, type InputHTMLAttributes, useRef } from 'react';
import { GrClose } from 'react-icons/gr';

// heroicons v2

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  titleCenter?: boolean;
  title: string;
  value: string;
  error?: string;
  onChangeText: (value: string) => void;
  typeNumber?: boolean;
  disabled?: boolean;
}

export const SimpleInput: FC<SimpleInputProps> = ({
  titleCenter,
  title,
  value,
  error,
  onChangeText,
  typeNumber,
  disabled,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const _handleRemoveText = () => {
    onChangeText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div>
      <h2
        className={clsx(
          'pb-3 font-medium drop-shadow-md',
          titleCenter ? 'text-center' : null,
        )}
      >
        {title}
      </h2>
      <div className="relative">
        <input
          ref={inputRef}
          value={value}
          disabled={disabled}
          type={typeNumber ? 'number' : 'text'}
          onChange={(e) => {
            onChangeText(e.target.value);
          }}
          className={clsx(
            'h-12 w-full rounded-xl border-2 border-gray-400 px-2 pr-8 shadow-md outline-none transition-all focus:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-100',
            error ? 'border-red-500' : 'focus:border-blue-600',
          )}
          {...rest}
        />
        {value ? (
          <div className="absolute right-0 top-0 flex h-full items-center justify-center pr-3">
            <GrClose
              className="cursor-pointer text-gray-900 drop-shadow-md"
              onClick={_handleRemoveText}
            />
          </div>
        ) : null}
      </div>
      {error ? (
        <span className="mt-3 block rounded-xl bg-red-500 px-2 text-sm text-white shadow-md drop-shadow-md before:absolute before:-top-2 before:left-4 before:h-0 before:w-0 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-red-500 before:content-['']">
          {error}
        </span>
      ) : null}
    </div>
  );
};
