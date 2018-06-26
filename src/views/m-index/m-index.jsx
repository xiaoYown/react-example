import { render } from 'react-dom';
import routers from './router';

import Loading from '@/plugins/loading';

import '@/assets/sass/index/main.scss';

// 全局绑定 loading 组件
global.Loading = Loading;

// 渲染及更新时执行, 并返回一个虚拟 DOM
render(
  routers,
  document.getElementById('page_index')
);

// // render之前调用
// componentWillMount () {
//   console.log('will mount');
// }
// // render 之后调用
// componentDidMount () {
//   console.log('did mount');
// }
// // 组件接收新的参数时调用
// componentWillReceiveProps () {
//   console.log('props change');
// }
// props 更新时, 判断是否有变化, 无时返回 false, 阻止更新 dom
// shouldComponentUpdate (nextProps, nexState) {
//   return nextProps.num !== nexState.num;
// }
// // 组件更新完成后调用
// componentDidUpdate () {
//   console.log('update');
// }
// // 组件卸载前调用
// componentWillUnmount () {
//   console.log('will unmount');
//   store.unsubscribe(this.watchStore.bind(this));
// }
