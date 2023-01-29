import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React from 'react';

const FileUpload = () => {
  return (
    <CKEditor
      config={{
        ckfinder: {
          // 請於此處設定上傳圖片之 API 路由
          uploadUrl: '/1/content/image',
        },
      }}
      editor={ClassicEditor}
      data="<p>Hello from CKEditor 5!</p>"
      onInit={(editor) => {
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  );
};
export default FileUpload;
