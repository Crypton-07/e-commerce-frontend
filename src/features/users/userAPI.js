// A mock function to mimic making an async request for data
export function fetchLoggedInOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8085/orders?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8085/users/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8085/users/" + userData.id, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
