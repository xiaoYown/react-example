import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader, Tag, Tabs, Button, Statistic, Row, Col } from 'antd';

const { TabPane } = Tabs;

const Description = ({ term, list, span = 12 }) => (
  <Col span={span}>
    <div className="description">
      <div className="term">{term}</div>
      {
        list.map((item, index) => (
          <div key={index} className="detail">{item.label}: {item.detail()}</div>
        ))
      }
    </div>
  </Col>
);

const content = (user) => (
  <Row>
    <Description
      term="User"
      list={[
        { label: 'Name', detail: () => <strong>{ user.name }</strong> },
        { label: 'Age', detail: () => <strong>{ user.age }</strong> }
      ]}
    />
    <Description
      term="User"
      list={[
        { label: 'Job', detail: () => <strong>{ user.job }</strong> }
      ]}
    />
  </Row>
);

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render () {
    return <PageHeader
      title="Title"
      subTitle="This is a subtitle"
      tags={<Tag color="red">Warning</Tag>}
    >
      <div>
        <div>{content(this.props.user)}</div>
      </div>
    </PageHeader>;
  }
}

export default connect(state => ({
  user: state.user
}))(Header);
