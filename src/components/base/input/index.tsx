import clsx from 'clsx';
import { type FC, type InputHTMLAttributes, useRef } from 'react';
import { GrClose } from 'react-icons/gr';

// heroicons v2

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  titleCenter?: boolean;
  title?: string;
  value: string;
  error?: string;
  onChangeText: (value: string) => void;
  otherType?: string;
  disabled?: boolean;
  noSpaces?: boolean;
  onRemoveText?: () => void;
}

export const Input: FC<InputProps> = ({
  titleCenter,
  title,
  value,
  error,
  onChangeText,
  otherType,
  disabled,
  noSpaces,
  onRemoveText,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const _handleRemoveText = () => {
    if (onRemoveText) {
      onRemoveText();
    }
    onChangeText('');
    if (inputRef.current) {
      inputRef.current.focus();
      onChangeText('');
    }
  };
  const _handleChangeText = (e: string) => {
    if (!noSpaces) {
      onChangeText(e);
    } else if (e !== ' ') {
      onChangeText(e.replace(/\s/g, ''));
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
          type={otherType || 'text'}
          onFocus={() => {
            if (value === '0') {
              onChangeText('');
            }
          }}
          onChange={(e) => {
            _handleChangeText(e.target.value);
          }}
          className={clsx(
            'h-12 w-full rounded-xl px-2 pr-8 shadow-md outline-none focus:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-100',
            error ? 'border border-red-500' : 'focus:border-blue-600',
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
        <span className="mt-3 inline-block rounded-xl bg-red-500 px-2 text-sm text-white shadow-md drop-shadow-md before:absolute before:-top-2 before:left-4 before:h-0 before:w-0 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-red-500 before:content-['']">
          {error}
        </span>
      ) : null}
    </div>
  );
};
