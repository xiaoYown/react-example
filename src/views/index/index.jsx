import { render } from 'react-dom';
import routers from './router';

import '@/assets/sass/index/main.scss';

render(
  routers,
  document.getElementById('page_index')
);
// // 实例化阶段, 此时可访问 this.props(非 es6 时 createReactClass 使用)
// getInitialState () {
// }
// // 设置默认的 props(非 es6 时 createReactClass 使用)
// getDefaultProps () {
//   console.log('get default props');
//   return {}
// }

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
// componentWillUpdata () { 组件更新前调用, 测试该方法已丢弃
//   console.log('will update');
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
// 渲染及更新时执行, 并返回一个虚拟 DOM
