import React from "react";

interface ButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export function Button({ text, isSelected, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        `px-4 py-2 rounded-md font-semibold border transition ` +
        (isSelected
          ? "bg-sky-600 text-white hover:bg-sky-500"
          : "bg-white text-sky-600 hover:bg-gray-100 border-sky-600 ")
      }
    >
      {text}
    </button>
  );
}
