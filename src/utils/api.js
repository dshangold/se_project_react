const baseUrl = "http://localhost:3001";

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-type": "application/json",
    },
  }).then(handleServerResponse);
};

const addItem = ({ name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(handleServerResponse);
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  }).then(handleServerResponse);
};

const api = {
  getItems,
  addItem,
  deleteItem,
};

export default api;
export function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
