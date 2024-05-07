import { Navigate } from "react-router-dom";

const isAuthenticated = () => {

  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    // Check token expiration
    if (decodedToken.exp < currentTime) {
      return <Navigate to="/" />;
    }
    return true; // Valid token
  } catch (error) {
    return false; // Token is invalid
  }
};

export default isAuthenticated;
