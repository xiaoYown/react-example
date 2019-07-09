import React, { Component } from 'react';
import { withRouter } from 'react-router';

class MyReportFolder extends React.Component {
  getFolderId (id) {
    this.props.history.push(`/m/index/myreport/${id}`);
  }
  render () {
    return (
      <div className="m-myReport-folder font-20">
        <ul className="m-myReport-folder-list">
          {this.props.items.map(item => (
            <li key={item.folderId} className="m-myReport-folder-item" onClick={this.getFolderId.bind(this, item.folderId)}>
              <div className="m-myReport-folder-item-icon"></div>
              <div className="m-myReport-folder-item-name">{item.folderName}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default withRouter(MyReportFolder);
