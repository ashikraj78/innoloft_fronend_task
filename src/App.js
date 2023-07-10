import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Product from "./components/Product";
import TopHeader from "./components/TopHeader";
import Home from "./components/Home";
import EditProduct from "./components/EditProduct";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";

function NotFound() {
  return <h2>Page not found</h2>;
}
function PublicPages() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        path="/product"
        element={
          <div className="backg">
            <div className="bodyMargin flex ">
              <MainNavigation />
              <Product />
            </div>
          </div>
        }
      />
      <Route
        path="/product/edit"
        element={
          <div className="backg">
            <div className="bodyMargin flex">
              <MainNavigation />
              <EditProduct />
            </div>
          </div>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div>
            <TopHeader />
            <PublicPages />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
