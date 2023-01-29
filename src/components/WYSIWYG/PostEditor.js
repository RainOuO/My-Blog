import React from "react";
import Editor from "ckeditor5-custom-build-full/build/ckeditor";
// import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { ImageToolbar } from '@ckeditor/ckeditor5-image/src/imagetoolbar';

import "./PostEditor.scss";
// TODO: 圖像toolbar叫出來
const MyCkeditor = (props) => {
  const IMG_URL = "http://localhost:3007";
  const { postData, setGetData, handleContentChange } = props;

  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // fetch(`${API_URL}/post/${UPLOAD_ENDPOINT}`, {
            //   method: 'post',
            //   body: body,
            // })
            //   .then((res) => res.json())
            //   .then((res) => {
            //     console.log(res);
            //     resolve({
            //       default: `${IMG_URL}/post/${res}`,
            //     });
            //   })
            //   .catch((err) => {
            //     reject(err);
            //   });
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  console.log("postData", postData);
  return (
    <div>
      <div className="Apps">
        <CKEditor
          config={{
            placeholder: "開始輸入內容吧",
            toolbar: [
              "heading",
              "|",
              "FontColor",
              "bold",
              "italic",
              "underline",
              "link",
              "bulletedList",
              "|",
              "uploadImage",
              "|",
              "undo",
              "redo",
            ],
            extraPlugins: [uploadPlugin],
            image: {
              toolbar: ["toggleImageCaption", "imageTextAlternative"],
            },
          }}
          data={postData[0]?.content ? postData[0]?.content : ""}
          editor={Editor}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.,
            // console.log('Editor is ready to use!', editor);
          }}
          onChange={handleContentChange}
          // onChange={(event, editor) => {
          //   const data = editor.getData();
          //   setGetData(data);
          //   // console.log({ data });
          // }}
          onBlur={(event, editor) => {
            // console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            // console.log('Focus.', editor);
          }}
        />
      </div>
    </div>
  );
};

export default MyCkeditor;
