import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ValidateLogin from '@/components/ValidateLogin';

// class Index extends React.Component {
//   constructor () {
//     super();
//     this.state = {
//       navs: []
//     };
//   }
//   render () {
//     // const pathname = window.location.pathname;
//     return (
//       <Provider store={ store }>
//         <div>
//           {this.props.children}
//         </div>
//       </Provider>
//     );
//   }
// };
const routers = (
  <ValidateLogin>
    <Router>
    </Router>
  </ValidateLogin>
);

export default routers;
