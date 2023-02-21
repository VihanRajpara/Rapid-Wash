import React from 'react';
import { Navigate } from 'react-router-dom';

const requireAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        return <Navigate to='/user' />;
      }
      return <WrappedComponent {...this.props} />;
    }
  }
}

export default requireAuth;