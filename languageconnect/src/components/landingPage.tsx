import React, { useState, useEffect, useRef } from "react";
import { languageOptions } from "./keys";
import { useNavigate } from "react-router-dom";
import downArrow from "../images/downArrow.png";

const LandingPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showProceed, setShowProceed] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const proceedButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleArrowClick = () => {
    setShowProceed(true);

    if (proceedButtonRef.current) {
      const proceedButtonBottom =
        proceedButtonRef.current.getBoundingClientRect().bottom;
      window.scrollTo({
        top: proceedButtonBottom + 60,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center relative p-6">
      <p className="text-4xl font-bold mb-4">Welcome to LanguageConnect!</p>
      <p className="text-lg mb-4">Choose the language you want to learn:</p>
      <div className="flex flex-wrap justify-center gap-4 mx-6">
        {languageOptions.map((language) => (
          <div
            key={language.key}
            className={`p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ${
              selectedLanguage === language.key
                ? "bg-blue-500 text-white transform scale-105"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => {
              setSelectedLanguage(language.key);
              setShowArrow(true);
            }}
          >
            <h2 className="text-xl">{language.name}</h2>
          </div>
        ))}
      </div>
      {showArrow && !showProceed && (
        <div
          className="cursor-pointer absolute right-0 mb-6 mr-6"
          style={{
            top: `${window.innerHeight - 100}px`,
          }}
          onClick={handleArrowClick}
        >
          <img height={100} width={100} src={downArrow} alt="down" />
        </div>
      )}
      <div ref={proceedButtonRef}>
        {showProceed && (
          <button
            id="proceed-button"
            className="mt-4 mb-10 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => navigate(`/choose?lang=${selectedLanguage}`)}
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
