// SASS
import "./AddProduct.scss";

// Packages
import { Helmet } from "react-helmet";

// React
import { useEffect, useState } from "react";

// Utils
import { goToProductList } from "../../utils/links";
import { saveForm } from "../../hooks/postData";

const AddProduct = () => {
  const [typeSwitcherValue, setTypeSwitcherValue] = useState("");
  const [validData, setValidData] = useState(false);
  const [formatData, setFormatData] = useState({
    sku: "",
    name: "",
    price: 0,
    size: 0,
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
  });

  const handleSaveBtn = async (e) => {
    e.preventDefault();

    if (validData) {
      await saveForm(e, formatData);
    }
  };

  const handleTypeSwitcher = (e) => {
    setTypeSwitcherValue(e.target.value);
  };

  useEffect(() => {
    if (formatData.sku && formatData.name && formatData.price) {
      if (typeSwitcherValue === "dvd") {
        if (formatData.size) {
          setValidData(true);
        }
      } else if (typeSwitcherValue === "furniture") {
        if (formatData.width && formatData.height && formatData.length) {
          setValidData(true);
        }
      } else if (typeSwitcherValue === "book") {
        if (formatData.weight) {
          setValidData(true);
        }
      }
    }
  }, [
    formatData.height,
    formatData.length,
    formatData.name,
    formatData.price,
    formatData.size,
    formatData.sku,
    formatData.weight,
    formatData.width,
    typeSwitcherValue,
  ]);

  return (
    <>
      <header className="d-flex justify-content-between align-items-center w-100 ">
        <div className="title">Add Product</div>
        <div className="btns flex justify-content-between align-items-center">
          <button
            type="submit"
            form="product_form"
            className="px-3 py-2 mx-2"
            onClick={(e) => handleSaveBtn(e)}
          >
            Save
          </button>
          <button className="px-3 py-2 mx-2" onClick={goToProductList}>
            Cancel
          </button>
        </div>
      </header>
      <div className="min-height-content">
        <Helmet>
          <title>Add Product</title>
        </Helmet>
        <form id="product_form" method="post" action="index.php">
          <div className="sku">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              name="sku"
              id="sku"
              required
              onChange={(e) =>
                setFormatData({ ...formatData, sku: e.target.value })
              }
            />
          </div>
          <div className="name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) =>
                setFormatData({ ...formatData, name: e.target.value })
              }
            />
          </div>
          <div className="price">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              onChange={(e) =>
                setFormatData({ ...formatData, price: e.target.value })
              }
            />
          </div>
          <div className="type-switcher">
            <label htmlFor="productType">Type Switcher</label>
            <select
              id="productType"
              required
              onChange={(e) => handleTypeSwitcher(e)}
            >
              <option></option>
              <option disabled>Type Switcher</option>
              <option value="dvd">DVD</option>
              <option value="book">Book</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
          {/* Start DVD */}
          <div
            className={`dvd ${typeSwitcherValue === "dvd" ? "" : "d-none"}`}
            id="DVD"
          >
            <div>
              <label htmlFor="size">Size (MB)</label>
              <input
                type="number"
                id="size"
                required={typeSwitcherValue === "dvd"}
                onChange={(e) =>
                  setFormatData({ ...formatData, size: e.target.value })
                }
              />
            </div>
            <p className="my-3 fw-semibold fs-6">Please, provide size</p>
          </div>
          {/* End DVD */}

          {/* Start Furniture */}
          <div
            className={`furniture ${
              typeSwitcherValue === "furniture" ? "" : "d-none"
            }`}
            id="Furniture"
          >
            <div className="my-2">
              <label htmlFor="height">Height (CM)</label>
              <input
                type="number"
                id="height"
                required={typeSwitcherValue === "furniture"}
                onChange={(e) =>
                  setFormatData({ ...formatData, height: e.target.value })
                }
              />
            </div>
            <div className="my-2">
              <label htmlFor="width">Width (CM)</label>
              <input
                type="number"
                id="width"
                required={typeSwitcherValue === "furniture"}
                onChange={(e) =>
                  setFormatData({ ...formatData, width: e.target.value })
                }
              />
            </div>
            <div className="my-2">
              <label htmlFor="length">Length (CM)</label>
              <input
                type="number"
                id="length"
                required={typeSwitcherValue === "furniture"}
                onChange={(e) =>
                  setFormatData({ ...formatData, length: e.target.value })
                }
              />
            </div>
            <p className="my-3 fw-semibold fs-6">Please, provide dimensions</p>
          </div>
          {/* End Furniture */}

          {/* Start Book */}
          <div
            className={`book ${typeSwitcherValue === "book" ? "" : "d-none"}`}
            id="Book"
          >
            <div>
              <label htmlFor="weight">Weight (KG)</label>
              <input
                type="number"
                id="weight"
                required={typeSwitcherValue === "book"}
                onChange={(e) =>
                  setFormatData({ ...formatData, weight: +e.target.value })
                }
              />
            </div>
            <p className="my-3 fw-semibold fs-6">Please, provide weight</p>
          </div>
          {/* End Book */}
        </form>
      </div>
    </>
  );
};

export default AddProduct;
