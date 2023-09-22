import React, { useEffect, useState, useRef } from 'react';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import './Chatpage.scss';
import './_Chatbot.scss';
// !原本寫的socket.io 但不能上傳到線上 就沒繼續優化了
const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const [chatbot, setChatbot] = useState(false);
  // console.log(messages);

  return (
    <div className="messenger">
      {chatbot === false ? (
        <div className=" d-wrap h-hotline" onClick={() => setChatbot(!chatbot)}>
          <div className="chat-icon"></div>
        </div>
      ) : (
        ''
      )}
      {chatbot === true ? (
        <>
          {chatbot === true ? (
            <div className="wrap">
              <div
                className="closebtn"
                role="button"
                onClick={() => setChatbot(false)}
              >
                <i className="icon icon-close"></i>
              </div>
              <div className="wrap-open">
                <div className="ember-view">
                  <div className="home-content">
                    <div className="header">
                      <div className="title">
                        <div className="logo">
                          {/* <img src={reactlogo} alt="" /> */}
                        </div>
                      </div>
                    </div>
                    <div className="body-sections">
                      <div className="dummy-bar soild">
                        <div className="card-layout scroll-section"></div>
                      </div>

                      {messages.map((message) =>
                        message.typeID !== '1' ? (
                          <div className="message__chats" key={message.id}>
                            <p className="sender__name">{message.name}</p>
                            <div className="message__sender">
                              <span>{message.text}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="message__chats" key={message.id}>
                            <p>客服人員</p>
                            <div className="message__recipient">
                              <span>{message.text}</span>
                            </div>
                          </div>
                        )
                      )}
                      <div className="">
                        <div className="message__status">
                          <p>{typingStatus}</p>
                        </div>
                        <div ref={lastMessageRef} />
                      </div>
                    </div>
                  </div>
                  <ChatFooter socket={socket} />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <ChatBody
            className="wrap"
            messages={messages}
            typingStatus={typingStatus}
            lastMessageRef={lastMessageRef}
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default ChatPage;
