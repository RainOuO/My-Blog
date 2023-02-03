import React from "react";
import "./_AboutMe.scss";
import myPhoto from "../../images/me.jpg";
import work from "../../images/work.png";
import html2canvas from "html2canvas";
import ChatPage from "../../components/ChatPage/ChatPage";
import jsPDF from "jspdf";
const AboutMe = ({ socket }) => {
  const exportPDF = () => {
    const input = document.getElementById("aboutPDF");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWitdrh = 208;
      const imgHight = (canvas.height * imgWitdrh) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWitdrh, imgHight);
      pdf.save("aboutMe_Rain.pdf");
      // save是檔案名稱
    });
  };
  return (
    <>
      <ChatPage socket={socket} />
      <div className="about_background" id="aboutPDF"></div>
      <div className="abouts">
        <div className="about custom-container container">
          <h1 className="text-center mb-md-3 mb-5">Wanna Know Me? </h1>
          <div className="aboutme row">
            <div className="col-md-6 col-12 myPhoto">
              <img src={myPhoto} alt="大頭貼" />
            </div>
            <div className="col-md-6 col-12 about_info ">
              <div className="">
                <h2>蔡雨信</h2>
              </div>
              <div className="about_info_skill">
                <p className="d-flex  align-items-center">
                  23歲，近幾個月剛完成資策會的"前端工程師就業養成班"進修課程，對前端的領域深深的著迷的愛好者!
                  對於網頁前端技術如HTML、CSS、JavaScript、React都有相關經驗，
                  也會串接前後端api，而在後端部分我對於Node.js、PHP也有相關的經驗，
                  而我目前也在努力專研JavaScript以及學習React.js等各項技術。
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-center mb-md-3 mb-5">Work</h2>
          <div className="work row">
            <div className="col-md-6 col-12 about_info ">
              <div className="about_info_skill">
                <p className="d-flex  align-items-center">
                  近期工作在新北板橋嘉聯科技擔任前端助理工程師，主要負責前端視覺功能部分，與設計部門設計師配合製作版面，
                  與後端RD部門配合Form表單Api的傳送處理，主要工作內容是政府網頁與店商的前端設計，
                  用到技術有bootstrap 5、JQuery 、XD 、JavaScript、SCSS 、
                  部分前端套件。
                </p>
              </div>
            </div>
            <div className="col-md-6 col-12 myPhoto">
              <img src={work} alt="工作圖" />
            </div>
          </div>
          <h2 className="text-center mb-md-3 mb-5">What Skills I Have</h2>
          <div className=" row">
            <div className="col-md-6 col-12 about_info ">
              <div className="about_info_skill">
                <p className="d-flex  align-items-center">
                  目前因為工作方面是接觸較多SCSS、JavaScript，自己閒暇時間是專研React框架，
                  目前本Blog也是使用React技術搭配Firebase與Node.js串接Line
                  api和socket.io等技術，
                  設計部份是使用Figma，前端視覺部份是使用scss搭配bootstrap來切版呈現。
                  後端部份略懂PHP、MySQL，之前上課的時候有參與資料庫database設計，與其他組員設計了專題使用的資料庫內容與欄位運用。
                  Git也會使用，上課期間大專題組員遇到Git版本控制問題，我都會主動去協調解決衝突。
                </p>
              </div>
            </div>
            <div className="col-md-6 col-12 skillContent">
              <div className="skillTop">
                <div className="con-title sk-title">
                  <span>Frontend Development</span>
                </div>
                <div className="skill-content">
                  <div className="skill-con-left">
                    <div className="skill-bar">
                      <span>HTML</span>
                      <div className="skill-level">
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <span>CSS</span>
                      <div className="skill-level">
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <span>SCSS</span>
                      <div className="skill-level">
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                      </div>
                    </div>
                  </div>
                  <div className="skill-con-right">
                    <div className="skill-bar">
                      <span>React</span>
                      <div className="skill-level">
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="no"></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <span>JavaScript</span>
                      <div className="skill-level">
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="no"></div>
                        <div className="no"></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <span>Bootstrap</span>
                      <div className="skill-level">
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="no"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skillBottom">
                <div className="con-title sk-title">
                  <span>Backend Development</span>
                </div>
                <div className="skill-content">
                  <div className="skill-con-left">
                    <div className="skill-bar">
                      <span>Node.js</span>
                      <div className="skill-level">
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="no"></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <span>PHP</span>
                      <div className="skill-level">
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="no"></div>
                        <div className="no"></div>
                        <div className="no"></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <span>MySQL</span>
                      <div className="skill-level">
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="yes"></div>
                        <div className="no"></div>
                        <div className="no"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row Contact_me">
            <div className="col-12 mb-5 mt-5">
              <div>
                <h3 className="text-center">
                  想更加了解我嗎?那就把他轉成PDF觀看吧!
                </h3>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <button className="PDF-btn" onClick={() => exportPDF()}>
                  轉成PDF下載
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
