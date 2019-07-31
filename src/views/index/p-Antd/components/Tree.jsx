import React from 'react';
import { Tree, Icon } from 'antd';
import TreeSearch from './TreeSearch';

// const { TreeNode } = Tree;

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' }
        ]
      },
      {
        title: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' }
    ]
  },
  {
    title: '0-2',
    key: '0-2'
  }
];
/**
 * @description - 生成 treeData 测试代码
 * @param {number} len - 每一层级节点数 (not must)
 * @param {number} level - 最高层级, 从 0 开始 (not must)
 * @param {number} currentLevel - 当前层级数 (not must)
 * @param {number} parentKey - 父级 key (not must)
 */
function createTreeData (len = 10, level = 2, currentLevel = 0, parentKey) {
  let result = [];
  let item;
  for (let i = 0; i < len; i++) {
    item = { key: `${parentKey ? parentKey + '-' : ''}${i}`, title: `${parentKey ? parentKey + '-' : ''}${i}` };
    if (currentLevel < level) {
      item.children = createTreeData(len, level, currentLevel + 1, item.key);
    }
    result.push(item);
  }
  return result;
}

class Demo extends React.Component {
  render () {
    return (
      <TreeSearch
        treeData={ createTreeData() }
        // treeData={ treeData }
        // searchValue="o"
        // selectedKeys="0-1-0-0"
        // treeProps={{ className }}
        // treeNodeProps={({ key, title }) => ({ key, title: 'title-' + title })}
        onSelect={ item => console.log(item) }
      />
      // <Tree
      //   showLine
      //   checkable
      //   // showIcon
      //   defaultExpandAll
      //   defaultSelectedKeys={['0-0-0']}
      //   switcherIcon={<Icon type="down" />}
      // >
      //   <TreeNode title="parent 1" key="0-0">
      //     <TreeNode title="leaf" key="0-0-0" />
      //     <TreeNode
      //       title="leaf"
      //       key="0-0-1"
      //     />
      //   </TreeNode>
      // </Tree>
    );
  }
}

export default Demo;
