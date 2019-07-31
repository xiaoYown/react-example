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

class Demo extends React.Component {
  render () {
    return (
      <TreeSearch
        treeData={ treeData }
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
