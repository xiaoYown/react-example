import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import store from '@/store/index/store';
// import { isLogin, login } from '@custom/utils/user';

import AppCmpt from '../../App';
import NavCmpt from '../mixins/Nav';

import PageMyReport from '../p-MyReport/MyReport';
import PageMyTeam from '../p-MyTeam/MyTeam';
import PageMessage from '../p-Message/Message';
// import PageCenter from '@custom/components/m-center/center';
import PageLibrary from '../p-library/library';
import PageAntd from '../p-Antd/Antd';

class Index extends React.Component {
  constructor () {
    super();
    this.state = {
      navs: []
    };
  }
  render () {
    // const pathname = window.location.pathname;

    return (
      <Provider store={ store }>
        <div>
          {this.props.children}
          {/* <NavCmpt/> */}
        </div>
      </Provider>
    );
    // // 简报库页不需要登录也可以访问
    // if (isLogin() || /^\/m\/index\/library/.test(pathname)) {
    //   return (
    //     <Provider store={ store }>
    //       <div>
    //         {this.props.children}
    //         <NavCmpt/>
    //       </div>
    //     </Provider>
    //   );
    // } else {
    //   // login();
    //   return (<div></div>);
    // }
  }
};
const routers = (
  <Router>
    <AppCmpt>
      <Index>
        <Route exact path="/m/index/myreport" component={ PageMyReport }/>
        <Route exact path="/m/index/myreport/:id" component={ PageMyReport }/>
        <Route exact path="/m/index/myteam" component={ PageMyTeam }/>
        <Route exact path="/m/index/message" component={ PageMessage }/>
        <Route exact path="/m/index/antd" component={ PageAntd }/>
        <Route exact path="/m/index/library" component={ PageLibrary }/>
      </Index>
    </AppCmpt>
  </Router>
);
/* <Route exact path="/m/index/center" component={ PageCenter }/> */

export default routers;
