import React from "react";

const ButtonWrapper = ({ onClick, className, children, type = "button" }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded-2xl bg-dark-blue text-white drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl transition duration-150 ease-in-out ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonWrapper;
