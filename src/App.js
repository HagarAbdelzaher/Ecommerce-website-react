import React from "react";
import "./App.css";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Login/Signup";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
