import React from 'react';
import { Upload, Modal, Icon } from 'antd';
import FileUploader from './Service';
import { http } from '@/utils/api';

class UploadPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      lowSource: null,
    };
  }

  componentWillReceiveProps = newProps => {
    if (newProps.fileUrl) {
      let arr = [];
      if (typeof newProps.fileUrl === 'string') {
        newProps.fileUrl.split('#').forEach((url, i) => {
          arr.push({
            uid: i + 1,
            name: 'url',
            status: 'done',
            url,
          });
        });
      } else {
        arr = newProps.fileUrl;
        arr.forEach((json, j) => {
          if (json.response) {
            arr[j] = {
              uid: json.uid,
              name: json.name,
              status: json.status,
              url: json.response.data.filePath,
            };
          }
        });
      }
      this.setState({
        fileList: arr,
      });
    } else {
      this.setState({
        fileList: [],
      });
    }
  };

  render() {
    const { fileList, lowSource } = this.state;
    const { number, disabled } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={() => {
            this.setState({
              previewVisible: false,
            });
          }}
        >
          <img alt="example" style={{ width: '100%' }} src={lowSource} />
        </Modal>
        <Upload
          onPreview={file => {
            this.setState({
              previewVisible: true,
              lowSource: file.url,
            });
          }}
          fileList={fileList}
          name="file"
          action={`${http}${FileUploader}`}
          listType="picture-card"
          {...this.props}
        >
          {fileList.length >= number || disabled ? null : uploadButton}
        </Upload>
      </div>
    );
  }
}

export default UploadPicture;
