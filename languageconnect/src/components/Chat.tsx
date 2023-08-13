import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { LanguageActions } from "../redux/actions";
import { languageOptions } from "./keys";
import { useLocation, useParams } from "react-router-dom";
import languageFacts from "./facts";
import didYouKnow from "../images/didYouKnow.gif";

function Chat() {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const [response, setResponse] = useState("");
  const [inEng, setInEng] = useState("");
  const [translation, setTranslation] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang");
  const [selectedLanguage, setSelectedLanguage] = useState(lang || "en");
  const [isLoading, setIsLoading] = useState(false);
  const [idx, setIdx] = useState<number>(0);

  const handleTranslate = () => {
    if (!message || !selectedLanguage) return;

    setIsLoading(true);

    dispatch(
      LanguageActions.translate({ text: message, key: "en" }, (res) => {
        setTranslation(res[0].result.text);
        dispatch(
          LanguageActions.getResponse({ text: res[0].result.text }, (res) => {
            setInEng(res.chatbot.response);
            dispatch(
              LanguageActions.translate(
                { text: res.chatbot.response, key: selectedLanguage },
                (res) => {
                  setResponse(res[0].result.text);
                  setIsLoading(false);
                }
              )
            );
          })
        );
      })
    );
  };

  useEffect(() => {
    setIdx(Math.random() * (languageFacts.length - 0));
  }, [isLoading]);

  if (!isLoading) {
    return (
      <div className="flex flex-col items-center p-6">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={message}
            placeholder="Enter your message"
            onChange={(e) => setMessage(e.target.value)}
            className="px-4 py-2 border rounded-lg w-1/2"
          />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">Select a language</option>
            {languageOptions.map((language) => (
              <option key={language.key} value={language.key}>
                {language.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleTranslate}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Translate
          </button>
        </div>
        <div className="text-center">
          <p className="text-lg mb-2">{translation}</p>
          <p className="text-lg mb-2">{response}</p>
          <p className="text-gray-600 text-sm">{inEng}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center bg-gray-600 h-screen text-cyan-50">
      <img src={didYouKnow} alt="Minions GIF" className=" ml-20" />
      <div className=" font-bold text-3xl my-4">Did you know?</div>
      <div className=" max-w-[60%] text-center text-lg">
        {languageFacts[idx]}
      </div>
    </div>
  );
}

export default Chat;
