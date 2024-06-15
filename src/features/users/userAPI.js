// A mock function to mimic making an async request for data
export function fetchLoggedInOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/own");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/own");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/" + userData.id, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
