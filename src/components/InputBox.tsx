import React from "react";

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  currentIndex: number;
  hasOptions: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  currentIndex,
  hasOptions,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      className="border px-3 py-2 w-full"
      aria-controls="combo-list"
      aria-autocomplete="list"
      aria-activedescendant={
        currentIndex >= 0 ? `option-${currentIndex}` : undefined
      }
      aria-expanded={hasOptions}
    />
  );
};

export default InputBox;
