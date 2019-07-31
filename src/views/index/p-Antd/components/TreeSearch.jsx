import React from 'react';
import { Tree, Input } from 'antd';
import './TreeSearch.scss';

/**
 * @description - 过滤不符合搜索条件的节点
 * @param {Object} data - 树结构数据
 * @param {string} text - 搜索文本
 * @param {Function} generate - 提取 title 函数
 */
function filterNotMatch (data, text, generate) {
  let isMatch = false;
  let children;
  for (let i = data.length - 1; i >= 0; i--) {
    isMatch = generate(data[i]).title.indexOf(text) !== -1;
    if (data[i].children && data[i].children.length) {
      children = filterNotMatch(data[i].children, text, generate);
    }
    if ((!isMatch && !children) || (!isMatch && children && !children.length)) {
      data.splice(i, 1);
    }
  }
  return data;
}
/**
 * @description - 获取结构树所有 key
 * @param {Object[]} data - 树结构数据
 * @param {Function} generate - 提取 key 函数
 */
function getAllKeys (data, generate, keys = []) {
  data.forEach(item => {
    keys.push(generate(item).key);
    if (item.children && item.children.length) {
      keys = keys.concat(getAllKeys(item.children, generate));
    }
  });
  return keys;
}

/**
 * @description - 获取选中节点父节点 key, 用于展开节点
 * @param {Object[object]} data - 树结构数据
 * @param {Function} generate - 提取 key 函数
 */
function findSelectedNode (data, selectedKeys, generate) {
  let item;
  for (let i = 0; i < data.length; i++) {
    item = data[i];
    if (selectedKeys.indexOf(generate(item).key !== -1)) {
      return item;
    }
    if (item.children && item.children.length) {
      return findSelectedParent(item.children, selectedKeys, generate);
    }
  }
  return {};
}

/**
 * @description - 获取选中节点父节点 key, 用于展开节点
 * @param {Object[object]} data - 树结构数据
 * @param {Object[string]} selectedKeys - 选中节点 key
 * @param {Object[string]} parentKeys - 父节点数组(not must)
 * @param {Function} generate - 获取 treeNode 属性函数
 */
function findSelectedParent (data, selectedKeys, parentData, generate) {
  let key;
  !parentData && (parentData = []);
  data.forEach(item => {
    key = generate(item).key;
    if (selectedKeys.indexOf(key) !== -1) {
      parentData.push(item);
    }
    if (item.children && item.children.length) {
      findSelectedParent(item.children, selectedKeys, parentData, generate);
    }
  });
  return parentData;
}

const { TreeNode } = Tree;

/**
 * @param {Object[]} treeData - 结构树数据 (must)
 *
 * @param {string} searchValue - 初始搜索框显示值 (not must)
 * @param {string} selectedKeys - 当前选中项 key(此组件仅允许选中一个) (not must)
 * @param {Object} treeProps - ant 树 入参 (not must)
 * @param {Function} treeNodeProps - 获取 treeNode 属性函数, 用于生成 treeNode props. 若传入, 必须返回 key/title (not must)
 * @callback onSelect - 选中事件, 回传选中项数据 (not must)
 */

class TreeSearch extends React.Component {
  constructor (props) {
    super(props);

    let { treeData, searchValue, selectedKeys, treeNodeProps } = props;
    treeNodeProps && (this.treeNodeProps = treeNodeProps);

    let _searchValue = searchValue || selectedKeys ? this.treeNodeProps(findSelectedNode(treeData, [selectedKeys], this.treeNodeProps)).title : '';
    let expandedKeys = findSelectedParent(treeData, [selectedKeys], null, this.treeNodeProps).map(item => this.treeNodeProps(item).key);

    this.state = {
      expandedKeys,
      treeDisplay: 'none',
      searchValue: _searchValue,
      autoExpandParent: true,
      treeDataFilter: null // 经过过滤的结构树
    };
  }
  treeNodeProps = item => ({ key: item.key, title: item.title })

  componentDidMount () {
    this.refs.search.input.addEventListener('click', this.focus);
    this.refs.search.input.addEventListener('blur', this.blur);
  }
  componentWillUnmount () {
    this.refs.search.input.removeEventListener('click', this.focus);
    this.refs.search.input.removeEventListener('blur', this.blur);
  }
  focus = () => {
    // TODO: 若需要 focus 时做塞选
    // this.changeSearch({ target: { value: this.state.searchValue } });
    this.state.treeDisplay !== 'block' && this.setState({ treeDisplay: 'block' });
  }
  blur = () => {
    // this.state.treeDisplay !== 'none' && this.setState({ treeDisplay: 'none' });
  }
  changeSearch = (e) => { // 搜索框 改变时, 生成过滤后的 treeData,expandedKeys
    let { value } = e.target;
    let treeDataFilter;
    let expandedKeys = [];
    let treeData = JSON.parse(JSON.stringify(this.props.treeData));
    if (value) {
      treeDataFilter = filterNotMatch(treeData, value, this.treeNodeProps);
      expandedKeys = getAllKeys(treeData, this.treeNodeProps);
    }
    if (!treeDataFilter || !treeDataFilter.length) {
      treeDataFilter = null;
    }
    this.setState({
      searchValue: value,
      autoExpandParent: true,
      expandedKeys,
      treeDataFilter,
      treeDisplay: 'block'
    });
  }
  loopNode = (treeData) => {
    let searchValue = this.state.searchValue || '';
    let _this = this;

    function loop (data) {
      return data.map(item => {
        let { title } = _this.treeNodeProps(item);
        let props = _this.treeNodeProps(item);
        let _title;

        if (searchValue && new RegExp(searchValue).test(title)) { // 检测搜索文本匹配
          _title = <span dangerouslySetInnerHTML={{
            __html: title.replace(new RegExp(`(${searchValue})+`, 'gi'), text => `<span style="color: #f50">${text}</span>`)
          }}></span>;
        } else {
          _title = title;
        }
        props.title && delete props.title;

        if (item.children) {
          return <TreeNode {...props} title={ _title } data={ item }>
            {loop(item.children)}
          </TreeNode>;
        } else {
          return <TreeNode {...props} title={ _title } data={ item } />;
        }
      });
    }
    return loop(treeData);
  }
  onExpand = (expandedKeys) => {
    this.setState({ expandedKeys, autoExpandParent: false });
  }
  onSelect = (keys, e) => {
    let { data } = e.node.props;
    this.props.onSelect && this.props.onSelect(data); // 选中回传
    this.refs.search.input.blur(); // 选中后失焦, 隐藏下拉
    this.setState({
      searchValue: this.treeNodeProps(data).title
    });
  }

  render () {
    const { expandedKeys, searchValue, treeDisplay, autoExpandParent, treeDataFilter } = this.state;
    const { treeData, treeProps } = this.props;

    return (
      <div className="m-treeSelectSearch">
        <Input ref="search" value={ searchValue } onChange={ this.changeSearch }></Input>
        <div className="m-treeWrapper" style={{ display: treeDisplay }} onMouseDown={(e) => e.preventDefault()}>
          <Tree
            { ...treeProps }
            showLine
            expandedKeys={ expandedKeys }
            autoExpandParent={autoExpandParent}
            onExpand={ this.onExpand }
            onSelect={ this.onSelect }
          >
            { this.loopNode(treeDataFilter || treeData) }
          </Tree>
        </div>
      </div>
    );
  }
}

export default TreeSearch;
