import React, { useEffect, useState } from "react";
import { wordsWithMeanings } from "./words";
import { useAppDispatch } from "../redux/hooks";
import { LanguageActions } from "../redux/actions";
import { languageOptions } from "./keys";
import { useLocation } from "react-router-dom";
import languageFacts from "./facts";
import didYouKnow from "../images/didYouKnow.gif";

const VocabularyBuilderPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useAppDispatch();
  const [words, setWords] = useState(wordsWithMeanings);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang");
  const [selectedLanguage, setSelectedLanguage] = useState(lang || "en");
  const [isLoading, setIsLoading] = useState(false);
  const [idx, setIdx] = useState<number>(1);

  const handleWordChange = (idx: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + idx) % words.length);
  };

  const translate = (message: string, key: string) => {
    return new Promise<string>((resolve, reject) => {
      dispatch(
        LanguageActions.translate({ text: message, key: key }, (res) => {
          if (res && res[0] && res[0].result && res[0].result.text) {
            resolve(res[0].result.text);
          }
        })
      );
    });
  };

  useEffect(() => {
    setIdx(Math.floor(Math.random() * (languageFacts.length - 0)));
  }, [isLoading]);

  useEffect(() => {
    if (selectedLanguage !== "en") {
      setIsLoading(true);
      const translateWordAndMeaning = async (wordObj: {
        word: string;
        meaning: string;
      }) => {
        const translatedWord = await translate(wordObj.word, selectedLanguage);
        const translatedMeaning = await translate(
          wordObj.meaning,
          selectedLanguage
        );
        return { word: translatedWord, meaning: translatedMeaning };
      };

      const translateAllWords = async () => {
        try {
          const translatedWords = await Promise.all(
            wordsWithMeanings.map(translateWordAndMeaning)
          );
          setWords(translatedWords);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      };

      translateAllWords();
    } else {
      setWords(wordsWithMeanings);
    }
  }, [selectedLanguage]);

  if (!isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 border rounded-lg mb-4"
        >
          <option value="">Select a language</option>
          {languageOptions.map((language) => (
            <option key={language.key} value={language.key}>
              {language.name}
            </option>
          ))}
        </select>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Vocabulary Builder</h1>
          <div>
            <h2 className="text-xl mb-2">
              Word: {words[currentIndex].word}
              {selectedLanguage !== "en" && (
                <span className="text-gray-600 text-sm ml-2">
                  {wordsWithMeanings[currentIndex].word}
                </span>
              )}
            </h2>
            <p className="text-xl mb-2">
              Meaning: {words[currentIndex].meaning}
              {selectedLanguage !== "en" && (
                <span className="text-gray-600 text-sm ml-2">
                  {wordsWithMeanings[currentIndex].meaning}
                </span>
              )}
            </p>
          </div>
          <div className=" flex gap-4">
            <button
              onClick={() => handleWordChange(-1)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Previous Word
            </button>
            <button
              onClick={() => handleWordChange(1)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Next Word
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center bg-gray-600 h-screen text-cyan-50">
      <div className=" font-bold text-2xl text-[#d7d7d9]">Searching...</div>
      <img src={didYouKnow} alt="Minions GIF" className=" ml-20" />
      <div className=" font-bold text-3xl my-4">Did you know?</div>
      <div className=" max-w-[60%] text-center text-lg">
        {languageFacts[idx]}
      </div>
    </div>
  );
};

export default VocabularyBuilderPage;
