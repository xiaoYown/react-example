import React from 'react';
import { Pagination } from 'antd';

let pageList = [];
for (let i = 0; i < 200; i++) {
  pageList.push({ text: i + 1 });
}

class ViewPagination extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPage: 1,
      total: 0
    };
  }
  componentWillMount () {
    this.setState({
      total: pageList.length
    });
  }

  changeSize (page) {
    this.setState({
      currentPage: page
    });
  }

  render () {
    let startIndex = (this.state.currentPage - 1) * 10;
    let list = pageList.slice(startIndex, startIndex + 10);

    return (
      <div className="g-antd-pagination">
        <h4>列表: </h4>
        <ul>
          {
            list.map((item, index) => (
              <li key={index}>{item.text}</li>
            ))
          }
        </ul>
        <div>----------------------------</div>
        <Pagination
          defaultCurrent={this.state.currentPage}
          total={this.state.total}
          onChange={this.changeSize.bind(this)}
        />
      </div>
    );
  }
};

export default ViewPagination;
