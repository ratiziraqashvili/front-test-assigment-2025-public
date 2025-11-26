import React from "react";

interface HeaderProps {
  text: string;
}

export const Header = ({ text }: HeaderProps) => {
  return <h1 className="font-semibold text-xl">{text}</h1>;
};
