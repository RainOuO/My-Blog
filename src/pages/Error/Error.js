import React from 'react';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <div style={{ background: '#ccc', height: '88vh' }}>
      <h1 className="text-center">找不到畫面 請重新搜尋</h1>
      <h2 className="text-center">
        請按這<Link to="/">回首頁</Link>
      </h2>
    </div>
  );
};

export default Error;
