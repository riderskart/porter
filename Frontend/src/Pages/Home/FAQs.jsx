import React, { useState } from "react";
import { FAQ_List } from "../../Constants/homeConstants";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQs = () => {
  // Constants
  const [isOpened, setIsOpened] = useState(null);
  // UI for questions
  const Question_Answer = ({ item, index }) => {
    return (
      <div className="my-10 hover:border border-[#949597] px-10 py-5 rounded-xl bg-primary">
        {isOpened === index ? (
          <button
            className="mx-5 w-full flex justify-between"
            onClick={() => {
              setIsOpened(null);
            }}
          >
            <h1 className="text-[1.5rem] phone:text-[1.25rem] font-Fredoka text-start heading-text-gray ">
              {item?.question}
            </h1>
            <span>
              <ChevronUp />
            </span>
          </button>
        ) : (
          <button
            className="mx-5 w-full flex justify-between"
            onClick={() => {
              setIsOpened(index);
            }}
          >
            <h1 className="text-[1.5rem] phone:text-[1.25rem] font-Fredoka  text-start heading-text-gray">
              {item?.question}
            </h1>
            <span>
              <ChevronDown />
            </span>
          </button>
        )}
        {isOpened === index && (
          <h1 className="mx-7 font-Fredoka para-text-gray para-text-gray p-4">
            {item?.answer}
          </h1>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#D5D5D7]">
      {/* Heading */}
      <div className="Heading flex flex-col justify-center items-center">
        <h1 className="text-[3rem] font-semibold phone:text-[1.5rem] heading-text-gray font-Fredoka ">
          Frequently Asked Questions
        </h1>
        <h3 className="text-lg phone:text-sm subtitle-text-gray">
          In case you have more Questions
        </h3>
      </div>

      {/* Questions */}
      <div className="All-Questions mt-20 phone:mt-2 w-3/5 phone:w-4/5">
        {FAQ_List.map((item, index) => {
          return <Question_Answer key={index} item={item} index={index} />;
        })}
      </div>
    </div>
  );
};

export default FAQs;
