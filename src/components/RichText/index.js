import React from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // 编辑器 传输 JSON格式; 显示 '已编辑完'信息时, 使用此方法
import htmlToDraft from 'html-to-draftjs'; // 将 传输格式(html) 转换为 draftjs格式
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { http } from '../../utils/api';
import styles from './index.less';

class Wysiwyg extends React.Component {
  constructor(props) {
    super(props);
    let editorState = EditorState.createEmpty();
    if (typeof props.content !== 'undefined') {
      const html = props.content; // 模拟 html格式数据
      const str2 = html.replace(/&lt;/g, '<');
      const str3 = str2.replace(/&gt;/g, '>');
      const content1 = str3.replace(/&amp;nbsp;/g, '&nbsp;');
      const content = content1.replace(/&quot;/g, '"');
      // const content = content1.replace(/"/g, '')
      const contentBlock = htmlToDraft(content); // 转换 html 成 draft格式

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        editorState = EditorState.createWithContent(contentState);
      }
    }
    this.state = {
      editorState,
    };
  }

  /**
   * 富文本编辑器内容改变
   */
  onEditorChange = onEditor => {
    const content = draftToHtml(onEditor);
    this.props.getContent(content);
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  /**
   * 富文本编辑器上传图片
   */
  imageUploadCallBack = file =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${http}/file/fileUploader`);
      const data = new FormData();
      data.append('file', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve({ data: { link: `${http}/file/getImg?path=${response.data}` } });
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onEditorChange}
          localization={{ locale: 'zh' }}
          toolbarClassName={styles.editorBar}
          editorClassName={styles.editorCon}
          toolbar={{
            image: {
              previewImage: true,
              uploadCallback: this.imageUploadCallBack,
            },
          }}
        />
      </div>
    );
  }
}

export default Wysiwyg;
