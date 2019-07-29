import React from 'react';
import { Row, Col } from 'antd';

class ViewGrid extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  componentWillMount () {
  }
  render () {
    return (
      <div className="g-antd-grid">
        <div className="splice"></div>
        <Row>
          <Col span={12} className="gutter-box">col-6</Col>
          <Col span={12} className="gutter-box">col-6</Col>
        </Row>
        <Row>
          <Col span={8} className="gutter-box">col-6</Col>
          <Col span={8} className="gutter-box">col-6</Col>
          <Col span={8} className="gutter-box">col-6</Col>
        </Row>
        <Row>
          <Col span={6} className="gutter-box">col-6</Col>
          <Col span={6} className="gutter-box">col-6</Col>
          <Col span={6} className="gutter-box">col-6</Col>
          <Col span={6} className="gutter-box">col-6</Col>
        </Row>
        <div className="splice"></div>
        <Row gutter={16}>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
        </Row>
        <div className="splice"></div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
        </Row>
        <div className="splice"></div>
        <Row>
          <Col span={8} className="gutter-box">col-8</Col>
          <Col span={8} offset={8} className="gutter-box">col-8</Col>
        </Row>
        <div className="splice"></div>
        <Row>
          <Col span={16} push={8} className="gutter-box">col-16</Col>
          <Col span={8} pull={16} className="gutter-box">col-8</Col>
        </Row>
        <div className="splice"></div>
        <Row type="flex" justify="start">
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
        </Row>
        <Row type="flex" justify="end">
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
          <Col span={4} className="gutter-box">col-4</Col>
        </Row>
      </div>
    );
  }
};

export default ViewGrid;
