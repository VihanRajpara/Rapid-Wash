import React from 'react';
import { Navigate } from 'react-router-dom';

const requireAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      if (localStorage.getItem('LoggedIn') !== 'true') {
        return <Navigate to='/washerman' />;
      }
      return <WrappedComponent {...this.props} />;
    }
  }
}

export default requireAuth;