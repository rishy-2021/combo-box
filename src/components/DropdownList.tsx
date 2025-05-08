import { FC } from "react";

interface DropdownListProps {
  isOpen: boolean;
  options: string[];
  currentIndex: number;
  onSelect: (option: string) => void;
}

const DropdownList: FC<DropdownListProps> = ({
  isOpen,
  options,
  currentIndex,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <ul
      id="combo-list"
      className="absolute mt-1 list-none border w-full bg-slate-200 z-10 max-h-60 overflow-y-auto"
      role="listbox"
    >
      {options.length === 0 ? (
        <li className="px-3 py-2 text-gray-500">No results</li>
      ) : (
        options.map((option, index) => (
          <li
            key={option}
            id={`option-${index}`}
            aria-selected={currentIndex === index}
            className={`px-3 py-2 cursor-pointer border-b border-black ${
              currentIndex === index ? "bg-blue-500 text-white" : ""
            }`}
            onMouseDown={() => onSelect(option)}
          >
            {option}
          </li>
        ))
      )}
    </ul>
  );
};

export default DropdownList;
