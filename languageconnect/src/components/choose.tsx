import React from "react";
import { Link, useLocation } from "react-router-dom";

const Choose = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Choose An Option</h1>
      <p className="text-lg mb-4">
        Start your learning journey and select your preferred path:
      </p>
      <div className="flex mt-4">
        <Link
          to={`/chat?lang=${lang}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
        >
          Learn through Conversations
        </Link>
        <Link
          to={`/vocabulary?lang=${lang}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Build Vocabulary
        </Link>
      </div>
    </div>
  );
};

export default Choose;
