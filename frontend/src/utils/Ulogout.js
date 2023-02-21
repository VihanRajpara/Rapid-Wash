export const logout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/user';
  }