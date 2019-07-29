import React from 'react';
import {
  AutoComplete,
  Cascader,
  Checkbox,
  Form
} from 'antd';
import Forms from './DataInputForm';

const dataSource = ['1111', '2222', '3333'];
const CheckboxGroup = Checkbox.Group;
const NormalLoginForm = Forms.NormalLoginForm;
const WrappedNormalLoginForm = Form.create({
  name: 'horizontal_login'
})(NormalLoginForm);

const cascaderData = [{
  value: '1',
  label: '1-label',
  children: [{
    value: '1-1',
    label: '1-1-label',
    children: [{
      value: '1-1-1',
      label: '1-1-1-label'
    }]
  }]
}, {
  value: '2',
  label: '2-label',
  children: [{
    value: '2-1',
    label: '2-1-label'
  }]
}];
const checkGroupOption = ['1', '2', '3'];

class ViewDataInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      indeterminate: true,
      isCheckAll: false,
      checkedList: ['1'],
      username: 'user-1',
      password: '123456'
    };
  }
  onCheckAll = e => {
    let isCheckAll = e.target.checked;
    let checkedList = isCheckAll ? checkGroupOption : [];

    this.setState({
      indeterminate: false,
      isCheckAll,
      checkedList
    });
  }
  onCheckListChange = checkedList => {
    this.setState({
      indeterminate: !!checkedList.length && checkedList.length < checkGroupOption.length,
      isCheckAll: checkedList.length === checkGroupOption.length,
      checkedList
    });
  }
  render () {
    const { isCheckAll, checkedList } = this.state;
    return (
      <div className="g-antd-autocomplete">
        <div className="text">AutoComplete: ['1111', '2222', '3333']</div>
        <AutoComplete dataSource={dataSource} />
        <div className="splice"></div>
        <div className="text">Cascader</div>
        <Cascader options={cascaderData} style={{ width: '300px' }} />
        <div className="splice"></div>
        <div className="text">Checkbox</div>
        <div>
          <Checkbox
            checked={isCheckAll}
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAll}
          />
        </div>
        <CheckboxGroup
          options={checkGroupOption}
          value={checkedList}
          onChange={this.onCheckListChange}
        />
        <div className="splice"></div>
        <div className="text">form</div>
        <WrappedNormalLoginForm />
        <div className="splice"></div>
      </div>
    );
  }
};

export default ViewDataInput;
