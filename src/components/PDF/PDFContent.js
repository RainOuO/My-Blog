import React, { useState, useEffect } from "react";
import axios from "axios";
import PostEditor from "../WYSIWYG/PostEditor";
import { useLocation } from "react-router-dom";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ChatPage from "../ChatPage/ChatPage";
import "./_PDF.scss";
function PDFContent({ socket }) {
  // === 貼文ID從網址字串抓 ===
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const postID = urlSearchParams.get("postID");
  console.log(postID);
  // === 編輯時預覽圖片用 ===
  const [showPhoto, setShowPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [getData, setGetData] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    location: "",
    tags: "",
    photo: "",
    content: "",
  });
  function handleChange(e) {
    console.log("handleChange", e.target.name, e.target.value);
    let newPostData = { ...postData };
    newPostData[e.target.name] = e.target.value;
    setPostData(newPostData);
  }

  const handleGetDataChange = (e, editor) => {
    const data = editor.getData();
    setGetData(data);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setPostData({ title: "", location: "", tags: "", photo: "" });
    setGetData("");
  };

  // === 圖片上傳 ===
  function handleUpload(e) {
    setPostData({ ...postData, photo: e.target.files[0] });

    const file = e.target.files[0];
    setShowPhoto(URL.createObjectURL(file));
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  }

  // 圖片預覽
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log("objectUrl", objectUrl);
    setPreview(objectUrl);

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // === 送出 (發布狀態1) ===
  async function handleSubmit(e) {
    // 把預設行為關掉
    e.preventDefault();
    try {
      let status = 1;
      let post_type = 1;
      let post_id = postID;
      let create_time = moment().format("YYYY-MM-DD HH:mm:ss");
      // 要上傳的FormData
      let formData = new FormData();
      formData.append("title", postData.title);
      formData.append("location", postData.location);
      formData.append("content", getData);
      formData.append("tags", postData.tags);
      formData.append("photo", postData.photo);
      formData.append("create_time", create_time);
      formData.append("status", status);
      formData.append("post_type_id", post_type);
      formData.append("post_id", post_id);
    } catch (e) {
      console.error("postEdit", e);
    }
  }

  /// === 草稿 (草稿狀態2) ===
  async function handleDraft(e) {
    // 把預設行為關掉
    e.preventDefault();
    try {
      let post_id = postID;
      let status = 2;
      let post_type = 1;
      let create_time = moment().format("YYYY-MM-DD HH:mm:ss");
      // 要上傳的FormData
      let formData = new FormData();
      formData.append("title", postData.title);
      formData.append("location", postData.location);
      formData.append("content", getData);
      formData.append("tags", postData.tags);
      formData.append("photo", postData.photo);
      formData.append("create_time", create_time);
      formData.append("status", status);
      formData.append("post_type_id", post_type);
      formData.append("post_id", post_id);
    } catch (e) {
      console.error("postEdit", e);
    }
  }

  // console.log('postData', postData);
  // console.log('postData[0]', postData[0] ? postData[0].user_id : '');
  console.log("postData", postData);
  const exportPDF = () => {
    const input = document.getElementById("Apps");
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
      pdf.save("goatrank.pdf");
      // save是檔案名稱
    });
  };
  return (
    <>
      <div className="cummunity_postEdit" id="Apps">
        <button onClick={() => exportPDF()}>轉成PDF吧!</button>
        <div className="d-flex justify-content-center">
          <form className="post_edit_bar d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div className="mt-2 edit_title d-flex align-items-center">
                <p className="mt-3">貼文編輯：一般貼文</p>
              </div>
              <div className="d-flex justify-content-end mt-4 post_edit_button ">
                <button className="btn" onClick={handleClick}>
                  清空
                </button>
                <button className="btn" onClick={handleDraft}>
                  儲存草稿
                </button>
                <button className="btn" onClick={handleSubmit}>
                  發布
                </button>
              </div>
            </div>

            <div className="post_cover_photo d-flex flex-column justify-content-end align-items-end">
              <label className="cover_photo_upload d-flex flex-column justify-content-center align-items-center">
                <div>封面照片上傳</div>
                <input
                  className="form-control mt-2"
                  accept="image/*"
                  hidden
                  type="file"
                  id="photo"
                  name="photo"
                  // defaultValue={postData[0] ? postData[0].photo : ''}
                  onChange={handleUpload}
                />
              </label>
            </div>
            <label className="mt-2"></label>
            <input
              className="form-control mt-2"
              placeholder="請輸入貼文標題"
              maxLength="50"
              type="text"
              id="title"
              name="title"
              defaultValue={postData[0] ? postData[0].post_title : ""}
              onChange={handleChange}
            />
            <div className="d-flex row">
              <div className="col-6">
                <label className="mt-3"></label>
                <input
                  className="form-control mt-2"
                  placeholder="請輸入城市地區"
                  type="text"
                  id="location"
                  name="location"
                  defaultValue={postData[0] ? postData[0].coordinate : ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label className="mt-3">(請輸入＃區分標籤)</label>
                <input
                  className="form-control mt-2"
                  placeHolder="#台北市"
                  type="text"
                  id="tags"
                  name="tags"
                  defaultValue={postData[0] ? postData[0].coordinate : ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr></hr>
            <form className="my-2">
              <p>貼文編輯器</p>
              <PostEditor
                // getData={getData}
                postData={postData}
                setGetData={setGetData}
                handleContentChange={handleGetDataChange}
              />
              {/* <h3>{getData}</h3> */}
              {/* <PostEditor /> */}
              {/* <label
              className="photo_upload d-flex align-items-center
              justify-content-center"
            >
              上傳照片
              <input
                type="file"
                accept="images/*"
                hidden
                // onChange={changeHandler}
                multiple
                className="form-control"
              ></input>
            </label>

            <label className="post_photo_upload">
              <input type="file" accept="image/*" multiple hidden />
            </label>
            <PhotoReviewSwiperDefault></PhotoReviewSwiperDefault> */}
            </form>
            {/* <div className="post_map">
              <p>行程地圖</p>
              <div className="map_photo">
                <img alt="" src={mapPhoto} />
              </div>
            </div> */}
            <div className="d-flex justify-content-end my-3  post_edit_button ">
              <button className="btn" onClick={handleClick}>
                清空
              </button>
              <button className="btn" onClick={handleDraft}>
                儲存草稿
              </button>
              <button className="btn" onClick={handleSubmit}>
                發布
              </button>
            </div>
          </form>
        </div>
        <ChatPage socket={socket} />
      </div>
    </>
  );
}

export default PDFContent;
