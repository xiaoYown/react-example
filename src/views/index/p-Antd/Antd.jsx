import React from 'react';
import { version, Button, Row, Col, Affix } from 'antd';

import 'antd/dist/antd.css';
import './Antd.scss';

class MyReport extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      num: 0,
      top: 100
    };
  }
  componentWillMount () {
  }
  render () {
    return (
      <div className="g-antd">
        <div>Current antd version: { version }</div>
        <div>------------------------- button</div>
        <Button type="primary">Example button</Button>
        <div>------------------------- grid</div>
        <div>
          <Row>
            <Col span={12}>col-12</Col>
            <Col span={12}>col-12</Col>
          </Row>
          <Row>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
          </Row>
          <Row>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
          </Row>
        </div>
        <div>------------------------- grid</div>
        <div className="gutter-example">
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="bg">col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="bg">col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="bg">col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="bg">col-6</div>
            </Col>
          </Row>
        </div>
        <div>------------------------- Affix</div>
        <Affix offsetTop={this.state.top}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                top: this.state.top + 10
              });
            }}
          >
            Affix top
          </Button>
        </Affix>
      </div>
    );
  }
};

export default MyReport;
