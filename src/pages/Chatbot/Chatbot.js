import React, { useEffect, useRef, useState } from 'react';
import './_Chatbot.scss';
import DefaultQAChatBot from '../../components/DefaultQAChatBot/DefaultQAChatBot';
const FAQ = [
  {
    question: '哈囉你好呀',
    answer: '歡迎來到Reain Blog!',
  },
  {
    question: '天氣如何',
    answer: '大好天氣呢!。',
  },
  {
    question: '早安',
    answer: '早安><',
  },
  {
    question: '版主是誰?',
    answer: '太神啦',
  },
];

const Chatbot = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { question: '', answer: '歡迎使用聊天機器人，請問有需要幫忙的嗎？' },
  ]);
  console.log('目前chatHistory111', chatHistory);
  const [isExpanded, setIsExpanded] = useState(false);
  const [defaultQuestion, setDefaultQuestion] = useState(false);
  const lastMessageRef = useRef(null);
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const keyword = inputValue.trim();
      if (keyword.length > 0) {
        const results = getResults(keyword);
        setChatHistory([
          ...chatHistory,
          { question: keyword, answer: results },
        ]);

        setInputValue('');
      }
    }
  };
  const getResults = (keyword) => {
    const regex = new RegExp(keyword, 'i');
    const matchingFAQs = FAQ.filter((faq) => regex.test(faq.question));
    if (matchingFAQs.length > 0) {
      return matchingFAQs.map((faq) => faq.answer);
    }
    return '對不起，我不明白您的問題。';
  };
  // 切換展開/收合聊天機器人
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const inputContainerClassess = defaultQuestion
    ? 'input_show'
    : 'input-container';
  const inputTextClassess = isExpanded ? 'chat_input' : 'd-none';
  const chathistoryClassess = defaultQuestion
    ? 'chat-history_none'
    : 'chat-history';
  const isheaderHandlerIcon = isExpanded ? 'header' : ' header_iconNone';
  return (
    <div className={`chatbot-container${isExpanded ? ' expanded' : ''}`}>
      <div className={isheaderHandlerIcon} onClick={toggleExpand}>
        <div className={`${isExpanded ? '' : 'icon'}`}></div>
      </div>
      {/* 聊天機器人展開狀態下，顯示預設問題列表 */}
      {isExpanded && (
        <DefaultQAChatBot
          setChatHistory={setChatHistory}
          setDefaultQuestion={setDefaultQuestion}
          chatHistory={chatHistory}
          defaultQuestion={defaultQuestion}
        />
      )}
      <div className="content">
        <div className={chathistoryClassess}>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              ref={lastMessageRef}
              className={`${isExpanded ? '' : 'd-none'}`}
            >
              {chat.question && (
                <div className="question-container">
                  <div className="question">
                    <span>{chat.question}</span>
                  </div>
                </div>
              )}
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
        <div className={inputContainerClassess}>
          <input
            className={inputTextClassess}
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
