import React from 'react';
import { Steps, Button, Icon } from 'antd';

const { Step } = Steps;
let steps = [{
  title: '信息填写',
  status: 'process',
  icon: ''
}, {
  title: '注册申请',
  status: 'wait',
  icon: ''
}, {
  title: '注册成功',
  status: 'wait',
  icon: ''
}];

class ViewSteps extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 0,
      steps
    };
  }
  componentWillMount () {
  }
  next () {
    let { current, steps } = this.state;

    if (current > 2) {
      return;
    } else if (current === 1 && steps[1].status === 'process') {
      return this.register();
    } else if (current < 2) {
      steps[current + 1].status = 'process';
    }
    steps[current].status = 'finished';

    this.setState({
      steps,
      current: current + 1
    });
  }
  register () {
    let { steps } = this.state;
    steps[1].icon = 'loading';
    this.setState({ steps });

    setTimeout(() => {
      steps[1].status = 'finished';
      steps[1].icon = '';
      this.setState({ steps });
      this.next();
    }, 3000);
  }
  render () {
    const { steps } = this.state;

    return (
      <div className="g-antd-steps">
        <Steps>
          {
            steps.map((step, index) => (
              <Step
                key={ index }
                status={ step.status }
                title={ step.title }
                icon={ step.icon ? <Icon type={ step.icon } /> : '' }
              />
            ))
          }
        </Steps>
        <div style={{ paddingTop: '200px' }}>
          <Button onClick={() => this.next()}>下一步</Button>
        </div>
      </div>
    );
  }
};

export default ViewSteps;
