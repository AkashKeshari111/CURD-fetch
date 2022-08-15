import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DeleteApi, getApi } from "../Api/Api";
import { postApi } from "../Api/Api";
import { getPageData, getSortData } from "../Utils/Utils";
const Products = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = getPageData(Number(searchParams.get("page")) || 1);

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(3);
  const initialSort = getSortData(searchParams.get("order") || "ASC");
  const [order, setOrderBy] = useState(initialSort);

  //   const [total, setTotal] = useState(null);

  const getAllData = (page, limit, order) => {
    getApi(page, limit, order)
      .then((res) => {
        setData(res);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postApi(form)
      .then((res) => res.json())
      .then((res) => {
        setData([...data, res]);

        // console.log(res);
        setForm({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDelete = (id) => {
    DeleteApi(id)
      .then((res) => {
        getAllData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllData(page, limit, order);
  }, [page, limit, order]);

  useEffect(() => {
    setSearchParams({ page, order });
  }, [page, order, setSearchParams]);

  //   console.log("abcd", data);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={onChange} />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={onChange}
        />
        <input type="submit" />
      </form>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        PREV
      </button>
      <button>{page}</button>
      <button onClick={() => setPage(page + 1)}>NEXT</button>
      <br />
      <button onClick={() => setOrderBy(order === "ASC" ? "ASC" : "ASC")}>
        Sort by ASC price
      </button>
      <button onClick={() => setOrderBy(order === "DESC" ? "DESC" : "DESC")}>
        Sort by DESC price
      </button>
      <table border="1px">
        <thead>
          <tr>
            <th>id</th>
            <th>Product name</th>
            <th>Product price</th>
            <th>Know more</th>
            <th><button>Delete All</button></th>
          </tr>
        </thead>
        <tbody>
          {data.map((prod) => {
            return (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>
                  <Link to={`/products/${prod.id}`}>View Details</Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(prod.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
