import { baseUrl } from "./constants";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
}

export const getProfile = (token) => {
  return fetch(`${baseUrl}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};

export async function updateBudget(budget) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3002/profile/budget", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ budget }),
    credentials: "include",
  });

  if (!res.ok) throw new Error(res.status);

  return res.json(); // returns the updated user object
}

export const addGift = (token, gift) => {
  return fetch(`${baseUrl}/gifts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gift),
  }).then(checkResponse);
};

export const updateGiftStatus = (token, index, status) => {
  return fetch(`${baseUrl}/gifts/${index}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  }).then(checkResponse);
};

export const deleteGift = (token, index) => {
  return fetch(`${baseUrl}/gifts/${index}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};
