import React from 'react';
const WhoLikesUser = ({ postListWhoLikeID }) => {
  return (
    <div>
      {postListWhoLikeID.map((e) => {
        let likeID = e.id;
        let likeList = e.LikeBy;
        let likeEmail = e.LikeByEmail;
        let likeuserImage = e.LikeuserPhot;
        let tidyUser_info = [];
        for (let i = 0; i < likeList.length; i++) {
          let newsssss = {
            name: likeList[i],
            email: likeEmail[i],
            photo: likeuserImage[i],
          };
          tidyUser_info.push(newsssss);
        }
        return (
          <React.Fragment key={likeID}>
            {tidyUser_info.map((v, index) => {
              return (
                <div className="d-flex" key={`${likeID}-${index}`}>
                  <div className="modal_like_photo">
                    <img src={v.photo} alt="" />
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="modal_like_userName">{v.name}</p>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WhoLikesUser;
