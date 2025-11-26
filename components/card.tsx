import React from "react";

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded-xl bg-white w-[80%] p-6 flex flex-col">
      {children}
    </div>
  );
};