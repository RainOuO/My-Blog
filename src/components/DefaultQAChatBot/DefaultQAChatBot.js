import React from 'react';
import './_DefaultQuestion.scss';
const DefaultQAChatBot = ({
  chatHistory,
  setChatHistory,
  defaultQuestion,
  setDefaultQuestion,
}) => {
  console.log('chatHistory', chatHistory);
  console.log('defaultQuestion', defaultQuestion);
  return (
    <div className={`${defaultQuestion ? 'd-none' : 'chat-options'} `}>
      <div
        className="option"
        onClick={() => {
          console.log('按下去');
          setDefaultQuestion(true);
          setChatHistory([
            ...chatHistory,
            {
              question: '我要怎發表文章?',
              answer: '在首頁登入google帳號就能發表囉!',
            },
          ]);
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
            {
              question: '這是個什麼樣的網站?',
              answer: '這是個會分享JS技術文章、React文章的blog!',
            },
          ]);
        }}
      >
        這是什麼樣的網站?
      </div>
      <div
        className="option"
        onClick={() => {
          setDefaultQuestion(true);
          setChatHistory([
            ...chatHistory,
            {
              question: '如何開始互動呢?',
              answer: '可以輸入些關鍵字來查詢您的疑問',
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
            { question: '版主是誰', answer: '可以到About那邊觀看唷~' },
          ]);
          setDefaultQuestion(true);
        }}
      >
        版主是誰?
      </div>
    </div>
  );
};

export default DefaultQAChatBot;
