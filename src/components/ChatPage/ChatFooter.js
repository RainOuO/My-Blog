import React, { useState } from 'react';
const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('');
  const handleTyping = (e) => {
    if (message === '') {
      e.preventDefault();
    }
  };
  socket.emit('typing', `${localStorage.getItem('userName')} is typing`);
  // !原本寫的socket.io 但不能上傳到線上 就沒繼續優化了
  // - 聊天對話
  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   if (message.trim() && localStorage.getItem("userName")) {
  //     socket.emit("message", {
  //       text: message,
  //       name: localStorage.getItem("userName"),
  //       id: `${socket.id}${Math.random()}`,
  //       socketID: socket.id,
  //     });
  //   }
  //   setMessage("");
  // };
  // > 客服回答
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message === '蘋果') {
      socket.emit('message', {
        text: message,
        // name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        typeID: socket.id,
      });
      socket.emit('message', {
        text: '好吃的水果',
        // name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        typeID: '1',
      });
    } else if (message === '今天天氣如何') {
      socket.emit('message', {
        text: message,
        // name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        typeID: socket.id,
      });
      socket.emit('message', {
        text: '很不錯適合出遊玩',
        // name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        typeID: '1',
      });
    } else if (message === '履歷怎寫') {
      socket.emit('message', {
        text: message,
        // name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        typeID: socket.id,
      });
      socket.emit('message', {
        text: '請參考範例 example.com',
        // name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        typeID: '1',
      });
    } else if (message === '哈囉') {
      socket.emit('message', {
        text: message,
        // name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        typeID: socket.id,
      });
      socket.emit('message', {
        text: '早安你好呀~~',
        id: `${socket.id}${Math.random()}`,
        typeID: '1',
      });
    } else {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        typeID: socket.id,
      });
      socket.emit('message', {
        text: '找不到相關資訊呢~',
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        typeID: '1',
      });
    }
    setMessage('');
  };
  return (
    <div className="chatBoxBottom">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="請輸入"
          className="chatMessageInput form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        {/* <button
          className="chatSumnitButton"
          onClick={(e) => {
            if (message === "") {
              e.preventDefault();
            }
          }}
        >
          發送
        </button> */}
      </form>
    </div>
  );
};

export default ChatFooter;
