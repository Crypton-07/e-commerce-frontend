// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserID(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateItem(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      body: JSON.stringify(itemId),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserID(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItem(item.id);
    }
    resolve({ status: "Success" });
  });
}
