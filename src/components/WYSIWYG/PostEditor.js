import React from "react";
import firebase from "../../utils/firebase";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./PostEditor.scss";
const MyCkeditor = (props) => {
  const { postData, handleContentChange } = props;
  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            const documentRef = firebase.firestore().collection("posts").doc();
            const fileRef = firebase
              .storage()
              .ref("/post-info-images/" + documentRef.id);
            fileRef.put(file).then(() => {
              fileRef
                .getDownloadURL()
                .then((url) => {
                  documentRef
                    .set({
                      descriptionIMG: url,
                    })
                    .then(() => {
                      resolve({ default: url });
                    });
                })
                .catch((error) => {
                  console.error(error);
                  reject(error);
                });
            });
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
  return (
    <div>
      <div className="Apps">
        <CKEditor
          config={{
            placeholder: "開始輸入內容吧",
            toolbar: [
              "heading",
              "|",
              "fontColor",
              "fontSize",
              "fontBackgroundColor",
              "bold",
              "italic",
              "underline",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "imageUpload",
              "blockQuote",
              "undo",
              "redo",
            ],
            extraPlugins: [uploadPlugin],
            image: {
              toolbar: ["imageTextAlternative"],
              types: ["jpeg", "png", "gif"],
              uploader: uploadAdapter,
            },
            maxFileSize: 2000 * 1024, // 限制檔案大小不超過 2000KB
          }}
          data={postData[0]?.content ? postData[0]?.content : ""}
          editor={ClassicEditor}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
};

export default MyCkeditor;
