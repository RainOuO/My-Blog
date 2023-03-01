import React, { useState } from "react";
import "./_Chatbot.scss";

const FAQ = [
  {
    question: "哈囉你好呀",
    answer: "歡迎來到Reain Blog!",
  },
  {
    question: "天氣如何",
    answer: "大好天氣呢!。",
  },
  {
    question: "早安",
    answer: "早安><",
  },
  {
    question: "版主是誰?",
    answer: "太神啦",
  },
];

const Chatbot = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { question: "", answer: "歡迎使用聊天機器人，請問有需要幫忙的嗎？" },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [defaultQuestion, setDefaultQuestion] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const keyword = inputValue.trim();
      if (keyword.length > 0) {
        const results = getResults(keyword);

        setChatHistory([
          ...chatHistory,
          { question: keyword, answer: results },
        ]);

        setInputValue("");
      }
    }
  };

  const getResults = (keyword) => {
    const regex = new RegExp(keyword, "i");
    const matchingFAQs = FAQ.filter((faq) => regex.test(faq.question));

    if (matchingFAQs.length > 0) {
      return matchingFAQs.map((faq) => faq.answer);
    }

    return "對不起，我不明白您的問題。";
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`chatbot-container${isExpanded ? " expanded" : ""}`}>
      <div
        className={`${isExpanded ? "header" : " header_iconNone"}`}
        onClick={toggleExpand}
      >
        <div className={`${isExpanded ? "" : "icon"}`}></div>
      </div>

      {isExpanded && (
        <div className={`${defaultQuestion ? "d-none" : "chat-options"} `}>
          <div
            className="option"
            onClick={() => {
              setChatHistory([
                ...chatHistory,
                {
                  question: "我要怎發表文章?",
                  answer: "在首頁登入google帳號就能發表囉!",
                },
              ]);
              setDefaultQuestion(true);
            }}
          >
            我要怎發表文章?
          </div>
          <div
            className="option"
            onClick={() => {
              setDefaultQuestion(true);
              setChatHistory([
                ...chatHistory,
                { question: "天氣如何", answer: "好天氣呢!" },
              ]);
            }}
          >
            天氣如何
          </div>
          <div
            className="option"
            onClick={() => {
              setDefaultQuestion(true);
              setChatHistory([
                ...chatHistory,
                {
                  question: "如何開始互動呢?",
                  answer: "可以輸入些關鍵字來查詢您的疑問",
                },
              ]);
            }}
          >
            如何開始互動呢?
          </div>
          <div
            className="option"
            onClick={() => {
              setChatHistory([
                ...chatHistory,
                { question: "版主是誰", answer: "可以到About那邊觀看唷~" },
              ]);
              setDefaultQuestion(true);
            }}
          >
            版主是誰?
          </div>
        </div>
      )}
      <div className="content">
        <div
          className={`${
            defaultQuestion ? "chat-history_none" : "chat-history"
          } `}
        >
          {chatHistory.map((chat, index) => (
            <div key={index} className={`${isExpanded ? "" : "d-none"}`}>
              {chat.question && <div className="question">{chat.question}</div>}
              <div className="answer">
                {Array.isArray(chat.answer)
                  ? chat.answer.map((answer, index) => (
                      <div key={index}>{answer}</div>
                    ))
                  : chat.answer}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`${defaultQuestion ? "input_show" : "input-container"}`}
        >
          <input
            className={`${isExpanded ? "chat_input" : "d-none"}`}
            type="text"
            value={inputValue}
            placeholder="請輸入您的問題"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
