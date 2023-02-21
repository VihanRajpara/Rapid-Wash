// import { useNavigate } from "react-router-dom";
export const logout = () => {
    localStorage.removeItem('LoggedIn');
    window.location.href = '/washerman';
    // useNavigate('/washerman')
  
  }