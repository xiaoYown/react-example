import React from 'react';
import { Upload, Button, Icon } from 'antd';

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }
];
/**
 * @description - props 参数描述
 * @param {string} accept - 接受上传的文件类型(https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
 * @param {string|(file) => Promise} - action - 上传的地址
 * @param {boolean} directory - 支持上传文件夹
 */
const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  defaultFileList: [...fileList]
};

class ViewUpload extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  componentWillMount () {
  }
  render () {
    return (
      <div className="g-antd-upload">
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </div>
    );
  }
};

export default ViewUpload;
