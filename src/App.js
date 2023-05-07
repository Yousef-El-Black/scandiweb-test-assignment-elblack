// Packages
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Components
import Footer from "./components/Footer/Footer";
import ProductList from "./pages/ProductList/ProductList";
import AddProduct from "./pages/AddProduct/AddProduct";

function App() {
  const Layout = () => {
    return (
      <>
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProductList />,
        },
        {
          path: "/addproduct",
          element: <AddProduct />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <div
        className="container mx-auto px-5"
        style={{ boxSizing: "border-box" }}
      >
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
