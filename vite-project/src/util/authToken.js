import jwtDecode from "jwt-decode";

export const getEmailFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  return jwtDecode(token).sub;
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};