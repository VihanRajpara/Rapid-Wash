import React from 'react';
import { Navigate } from 'react-router-dom';

const requireAuthu = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      if (localStorage.getItem('LoggedIn') !== 'true') {
        return <WrappedComponent {...this.props} />;
      }
      return <Navigate to='/washerman/dashboard' />;
    }
  }
}
export default requireAuthu;