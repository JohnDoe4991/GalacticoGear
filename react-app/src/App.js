import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetProducts from "./components/Products/GetAllProducts";
import ProductDetailPage from "./components/Products/ProductDetail";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import ShoppingCart from "./components/Cart";
import FavoritesPage from "./components/Favorites";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Switch>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/all">
              <GetProducts />
            </Route>
            <Route path="/products/:id">
              <ProductDetailPage />
            </Route>
            <Route exact path="/carts">
              <ShoppingCart />
            </Route>
            <Route exact path="/favorites">
              <FavoritesPage />
            </Route>
            <Route>Page Not Found</Route>
          </Switch>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
