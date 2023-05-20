import React from "react";
import "./App.css";
import Login from "./components/Login/Login.jsx";
import SingleCategory from "./components/Filteredproducts/SingleCategory";
import SingleProduct from "./components/Filteredproducts/SingleProduct";
import Signup from "./components/Login/Signup";
import Profile from "./components/Login/Profile";
import Cart from "./components/Cart/Cart";
import WishList from "./components/WishList/WishList";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
function App() {
  const user = useSelector((state) => state.user.user);
  const { authUser } = user;
  return (
    <div className="App">
      {
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/" element={<Main></Main> }></Route>
            {/* <Route
              path="/login"
              element={authUser ? <Main></Main> : <Login></Login>}
            ></Route> */}
            <Route
              path="/categories/:id"
              element={<SingleCategory></SingleCategory>}
            ></Route>
            <Route
              path="/products/:id"
              element={<SingleProduct></SingleProduct>}
            ></Route>

            <Route
              path="/cart"
              element={authUser ? <Cart /> : <Login />}
            ></Route>
            <Route
              path="/wishlist"
              element={authUser ? <WishList /> : <Login />}
            ></Route>
            <Route
              path="/profile"
              element={authUser ? <Profile></Profile> : <Login></Login>}
            ></Route>
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
