import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

export const setAuthToken = (token) => {
  if (!token) {
    delete API.defaults.headers.common["Authorization"];
    return;
  }
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
