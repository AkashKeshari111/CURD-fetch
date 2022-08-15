export const getApi = (page,limit,order) => {
  return fetch(`http://localhost:8080/product?_page=${page}&_limit=${limit}&_sort=price&_order=${order}`).then((res) => res.json());
};


export const postApi = (form) => {
  return fetch(`http://localhost:8080/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      price: form.price,
    }),
  });
};


export const getApiData = ({id}) => {
    return fetch(`http://localhost:8080/product/${id}`).then((res) => res.json());
  };


  export const DeleteApi=(id)=>{
    return fetch(`http://localhost:8080/product/${id}`,{
        method:"DELETE",
    }).then(res=>res.json())
}