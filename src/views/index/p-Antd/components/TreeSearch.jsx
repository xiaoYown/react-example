import React from 'react';
import { Tree, Input } from 'antd';

/**
 * @description - 获取选中节点父节点 key, 用于展开节点
 * @param {Object[object]} data - 树结构数据
 * @param {Object[string]} selectedKeys - 选中节点 key
 * @param {Object[string]} parentKeys - 父节点数组(not must)
 */
function findSelectedNode (data, selectedKeys, generateKey) {
  let item;
  for (let i = 0; i < data.length; i++) {
    item = data[i];
    if (selectedKeys.indexOf(generateKey(item) !== -1)) {
      return item;
    }
    if (item.children && item.children.length) {
      return findSelectedParent(item.children, selectedKeys, generateKey);
    }
  }
  return {};
}

/**
 * @description - 获取选中节点父节点 key, 用于展开节点
 * @param {Object[object]} data - 树结构数据
 * @param {Object[string]} selectedKeys - 选中节点 key
 * @param {Object[string]} parentKeys - 父节点数组(not must)
 * @param {Function} generateKey - 获取 key
 */
function findSelectedParent (data, selectedKeys, parentData, generateKey) {
  let key;
  !parentData && (parentData = []);
  data.forEach(item => {
    key = generateKey(item);
    if (selectedKeys.indexOf(key) !== -1) {
      parentData.push(item);
    }
    if (item.children && item.children.length) {
      findSelectedParent(item.children, selectedKeys, parentData, generateKey);
    }
  });
  return parentData;
}

const { TreeNode } = Tree;

/**
 * @param {string} searchValue - 初始搜索框显示值
 * @param {string} selectedKeys - 当前选中项 key(此组件仅允许选中一个)
 * @param {string} treeClass - 树 class
 * @param {Object} treeProps - ant 树 入参
 * @param {Function} generateTitle - title 生成函数
 * @param {Function} generateKey - key 生成函数
 * @callback onSelect - 选中事件, 回传选中项数据
 */

class TreeSearch extends React.Component {
  constructor (props) {
    super(props);

    let { treeData, searchValue, selectedKeys, generateKey, generateTitle } = props;
    this.generateKey = generateKey || (item => item.key);
    this.generateTitle = generateTitle || (item => item.title);

    let _searchValue = searchValue || selectedKeys ? this.generateTitle(findSelectedNode(treeData, [selectedKeys], this.generateKey)) : '';
    let expandedKeys = findSelectedParent(treeData, [selectedKeys], null, this.generateKey).map(item => this.generateKey(item));

    this.state = {
      expandedKeys,
      treeDisplay: 'none',
      searchValue: _searchValue
    };
  }
  componentDidMount () {
    this.refs.search.input.addEventListener('click', this.focus);
    this.refs.search.input.addEventListener('blur', this.blur);
  }
  componentWillUnmount () {
    this.refs.search.input.removeEventListener('click', this.focus);
    this.refs.search.input.removeEventListener('blur', this.blur);
  }
  focus = () => {
    this.state.treeDisplay !== 'block' && this.setState({ treeDisplay: 'block' });
  }
  blur = () => {
    this.state.treeDisplay !== 'none' && this.setState({ treeDisplay: 'none' });
  }
  changeSearch = (e) => {
    this.setState({
      searchValue: e.target.value
    });
  }
  loopNode = (treeData) => {
    let searchValue = this.state.searchValue || '';
    let generateKey = this.props.generateKey || (item => item.key);
    let generateTitle = this.props.generateTitle || (item => item.title);

    function loop (data) {
      return data.map(item => {
        let title = generateTitle(item);
        let key = generateKey(item);
        let index = title.indexOf(searchValue);
        let preKey = title.substr(0, index);
        let sufKey = title.substr(index + searchValue.length);
        let _title;

        if (index > -1) {
          _title = <span>
            { preKey }<span style={{color: '#f50'}}>{ searchValue }</span>{ sufKey }
          </span>;
        } else {
          _title = title;
        }
        if (item.children) {
          return <TreeNode key={ key } title={ _title } data={ item }>
            {loop(item.children)}
          </TreeNode>;
        } else {
          return <TreeNode key={ key } title={ _title } data={ item } />;
        }
      });
    }
    return loop(treeData);
  }
  onExpand = (expandedKeys) => {
    this.setState({ expandedKeys });
  }
  onSelect = (keys, e) => {
    let { data } = e.node.props;
    this.props.onSelect && this.props.onSelect(data);
    this.refs.search.input.blur();
    this.setState({
      searchValue: this.generateTitle(data)
    });
  }

  render () {
    const { expandedKeys, searchValue, treeDisplay } = this.state;
    const { treeData, wrapperClass, treeClass, treeProps } = this.props;

    return (
      <div
        className={ wrapperClass }
        style={{ position: 'relative' }}
      >
        <Input ref="search" value={ searchValue } onChange={ this.changeSearch }></Input>
        <div onMouseDown={(e) => e.preventDefault()}>
          <Tree
            { ...treeProps }
            style={{ position: 'absolute', top: '100%', display: treeDisplay }}
            showLine
            className={ treeClass }
            expandedKeys={ expandedKeys }
            autoExpandParent={true}
            onExpand={ this.onExpand }
            onSelect={ this.onSelect }
          >
            { this.loopNode(treeData) }
          </Tree>
        </div>
      </div>
    );
  }
}

export default TreeSearch;
