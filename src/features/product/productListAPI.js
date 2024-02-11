// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO TO display the loader we are using set time out so that it fetch the product after 3 sec
    setTimeout(async () => {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      resolve({ data });
    }, 3000);
    // console.log(data);
  });
}

export function fetchProductByFilter(filter, sort, pagination) {
  //? filter = {"category": "smartphone"}
  //? sortby = {"sort": "price"}
  //? Pagination = {"page" : 1 , "limit": 10}
  //TODO : Will have to make dynamic filter, currently works for individual category
  // console.log(filter);
  console.log(pagination);
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    // console.log(categoryValues);
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItemCount = await response.headers.get("X-Total-Count");
    resolve({ data: { product: data, totalItemCount: totalItemCount } });
  });
}
// export function fetchProductBySorting(sort) {
//   //? sortby = {"sort": "price"}
//   //TODO : Will have to make dynamic sorting, currently works for individual high to low or low to high
//   let queryString = "";
//   switch (sort.order) {
//     case "desc":
//       queryString += `${"_sort"}=-${sort.sort}&`;
//       break;
//     default:
//       queryString += `${"_sort"}=${sort.sort}&`;
//       break;
//   }
//   return new Promise(async (resolve) => {
//     const response = await fetch(
//       "http://localhost:8080/products?" + queryString
//     );
//     const data = await response.json();
//     resolve({ data });
//     // console.log(data);
//   });
// }
