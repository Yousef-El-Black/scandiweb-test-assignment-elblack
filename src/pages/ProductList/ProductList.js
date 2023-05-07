import { Helmet } from "react-helmet";
import "./ProductList.scss";
import { goToAddProduct } from "../../utils/links";
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { deleteData } from "../../hooks/deleteData";
import { links } from "../../environment/environment";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productsExist, setProductsExist] = useState(false);
  const [deletedProducts, setDeletedProducts] = useState([]);

  const getData = async () => {
    await axios
      .get(`${links.serverLink}/scandiweb-server/getdata.php`)
      .then((response) => {
        const data = response.data;
        setProducts(data); // Update the products state with the fetched data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteMass = () => {
    setDeletedProducts(
      $("[type='checkbox']:checked")
        .map(function () {
          return $(this).parent().attr("id");
        })
        .get()
    );
  };

  useEffect(() => {
    getData();
    setProductsExist(products.length);
  }, [products]);

  return (
    <>
      <header className="d-flex justify-content-between align-items-center w-100 ">
        <div className="title">Product List</div>
        <div className="btns flex justify-content-between align-items-center">
          <button className="px-3 py-2 mx-2" onClick={goToAddProduct}>
            ADD
          </button>
          <button
            className="px-3 py-2 mx-2"
            id="delete-product-btn"
            onClick={() => {
              setDeletedProducts(
                $("[type='checkbox']:checked")
                  .map(function () {
                    return $(this).parent().attr("id");
                  })
                  .get()
              );
              deleteData(deletedProducts);
            }}
          >
            MASS DELETE
          </button>
        </div>
      </header>
      <div>
        <Helmet>
          <title>Product List</title>
        </Helmet>
        <main className="min-height-content my-0">
          <div className="container d-flex p-3 gap-3 w-100 flex-wrap justify-content-center">
            {productsExist ? (
              Array.isArray(products) ? (
                products.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="px-2 py-5 border d-flex flex-column justify-content-center align-items-center col-2 position-relative text-center"
                      id={product.sku}
                    >
                      <input
                        type="checkbox"
                        className="delete-checkbox position-absolute"
                        name="delete-checkbox"
                        onClick={handleDeleteMass}
                      />
                      <p className="m-0">{product.sku}</p>
                      <p className="m-0">{product.name}</p>
                      <p className="m-0">{product.price}$</p>
                      <p className={`m-0 ${product.size == 0 ? "d-none" : ""}`}>
                        Size: {product.size}MB
                      </p>
                      <p className={`${product.weight == 0 ? "d-none" : ""}`}>
                        Weight: {product.weight}KG
                      </p>
                      <p
                        className={`${
                          product.width == 0 &&
                          product.length == 0 &&
                          product.height == 0
                            ? "d-none"
                            : ""
                        }`}
                      >
                        Dimension: {product.width}x{product.height}x
                        {product.length}
                      </p>
                    </div>
                  );
                })
              ) : (
                console.log(products)
              )
            ) : (
              // (
              //   <h1>Data is not Valid!</h1>
              // )
              <h1>No Data to show</h1>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductList;
