import React, { Component } from 'react';
import config from 'config/config';
import { GMTToStr } from '@/utils/utils';

function NotPublish (report) {
  return report.publishStatus ? '' : <div className="m-myReportNotPublish font-24">未发布</div>;
}

class MyReportFile extends React.Component {
  render () {
    return (
      <div className="m-myReport-report">
        <ul className="m-myReport-report-list">
          {this.props.items.map(item => (
            <li key={item.reportId} className="m-myReport-report-item" onClick={this.previewReport.bind(this, item.reportGatherId)}>
              <div className={`m-myReport-report-item-image ${item.imgUrl ? '' : 's-none'}`} style={{ backgroundImage: `url(${item.imgUrl ? item.imgUrl : '/m/static/images/default-cover.png'})` }}>
                { NotPublish(item) }
              </div>
              <div className="m-myReport-report-item-details">
                <div className="m-report-details-title font-28">{item.title || '无标题'}</div>
                <div className="m-report-details-desc font-22">{item.description}</div>
                <div className="m-report-details-footed font-20">
                  <span className="m-report-details-footed-time">更新时间: {GMTToStr(item.lastModifyTime)}</span>
                  <span className="m-report-details-footed-read">阅读数: {item.clickNum}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // 打开预览报告
  previewReport (reportGatherId) {
    window.location.href = `${config.apiUrl}/gather/${reportGatherId}`;
  }
};

export default MyReportFile;
