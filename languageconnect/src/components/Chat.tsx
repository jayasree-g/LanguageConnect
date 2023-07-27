import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { LanguageActions } from "../redux/actions";

function Chat() {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  const Translate = () => {
    dispatch(
      LanguageActions.translate({ text: message }, (res) => {
        console.log(res[0].result.text);
        // dispatch(
        //   LanguageActions.getResponse({ text: res[0].result.text }, (res) => {
        //     console.log(res);
        //   })
        // );
      })
    );
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        placeholder="Enter message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => Translate()}>Send</button>
    </div>
  );
}

export default Chat;
