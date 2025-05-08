import { FC, useEffect, useRef, useState } from "react";
import InputBox from "./InputBox";
import DropdownList from "./DropdownList";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ComboBox: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setCurrentIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const search = inputValue.trim().toLowerCase();

    if (search) {
      const matches = MONTHS.filter((month) =>
        month.toLowerCase().includes(search)
      );
      setFilteredOptions(matches);
      setIsOpen(true);
      setCurrentIndex(-1);
    } else {
      setFilteredOptions([]);
      setIsOpen(false);
      setCurrentIndex(-1);
    }
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredOptions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % filteredOptions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setCurrentIndex(
          (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
        );
        break;
      case "Enter":
        e.preventDefault();
        if (currentIndex >= 0) {
          selectOption(filteredOptions[currentIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setCurrentIndex(-1);
        break;
    }
  };

  const selectOption = (value: string) => {
    setInputValue(value);
    setIsOpen(false);
    setCurrentIndex(-1);
  };

  return (
    <div ref={containerRef} className="relative w-72" aria-expanded={isOpen}>
      <InputBox
        value={inputValue}
        onChange={setInputValue}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (filteredOptions.length) setIsOpen(true);
        }}
        currentIndex={currentIndex}
        hasOptions={isOpen}
      />
      <DropdownList
        isOpen={isOpen}
        options={filteredOptions}
        currentIndex={currentIndex}
        onSelect={selectOption}
      />
    </div>
  );
};

export default ComboBox;
