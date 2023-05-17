import React from "react";
import "./App.css";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Login/Signup";
import Home from "./pages/Home";
import Cart from "./components/Cart/Cart";
import WishList from "./components/WishList/WishList";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const user = useSelector((state) => state.user.user);
  const { authUser } = user;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          {/* This should be the line when the main component get implemented */}
          {/* <Route
            path="/"
            element={authUser ? <Main></Main> : <Login></Login>}
          ></Route> */}
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/wishlist" element={<WishList/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
