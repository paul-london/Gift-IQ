import { baseUrl } from "./constants";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}
export const signup = ({ name, email, password, confirmPassword }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, confirmPassword }),
  }).then(checkResponse);
};
export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
