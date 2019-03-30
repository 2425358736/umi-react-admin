import { Upload, Icon, Modal } from 'antd';
import React from 'react';
import { http } from '@/utils/api';

class UploadImg extends React.Component {
  constructor(props) {
    super(props);
    const fileList = [];
    if (props.fileList) {
      if (
        props.fileList !== null &&
        typeof props.fileList !== 'undefined' &&
        props.fileList !== ''
      ) {
        if (props.fileList.length > 0) {
          const imgArr = props.fileList.split('#');
          imgArr.forEach((img, i) => {
            if (img !== '') {
              const json = {
                uid: i,
                status: 'done',
                name: img,
                url: img,
              };
              fileList.push(json);
            }
          });
        }
      }
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.fileList === '') {
      this.setState({ fileList: [] });
    }
  };

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    let imgUrl = '';
    fileList.forEach(file => {
      if (typeof file.response !== 'undefined') {
        imgUrl = `${imgUrl + file.response.data.ossPath}`;
      } else {
        imgUrl = `${imgUrl + file.name}`;
      }
    });
    if (imgUrl.indexOf('http') >= 0) {
      this.props.callback(imgUrl);
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>上传图片</div>
      </div>
    );
    return (
      <div style={{ display: 'inline-block' }}>
        <Upload
          action={`${http}/file/fileUploader`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          maskClosable={false}
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="." style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadImg;
