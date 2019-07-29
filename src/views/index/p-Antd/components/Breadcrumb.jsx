import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const routes = [{
  path: '/1',
  breadcrumbName: 'name-1'
}, {
  path: '/2',
  breadcrumbName: 'name-2'
}, {
  path: '/3',
  breadcrumbName: 'name-3'
}];

function itemRender (route, params, routes, path) {
  const last = routes.indexOf(route) === routes.length - 1;

  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={path[path.length - 1]}>{route.breadcrumbName}</Link>
  );
}

class ViewBreadcrumb extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  componentWillMount () {
  }
  render () {
    return (
      <div className="g-antd-breadcrumb">
        <Breadcrumb itemRender={itemRender} routes={routes}/>
      </div>
    );
  }
};

export default ViewBreadcrumb;
