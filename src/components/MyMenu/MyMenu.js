import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "firebase/compat/firestore";

const MyMenu = () => {
  const menuItems = [
    {
      name: "我的文章",
      path: "/my/posts",
    },
    { name: "我的收藏", path: "/my/collections" },
    { name: "會員資料", path: "/my/settings" },
  ];
  // const [menuItems, setMenuItems] = useState([]);

  return (
    <div>
      {menuItems.map((menu) => {
        return (
          <ul key={menu.name}>
            <Link to={menu.path}>{menu.name}</Link>
          </ul>
        );
      })}
    </div>
  );
};

export default MyMenu;
