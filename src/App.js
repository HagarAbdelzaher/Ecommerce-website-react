import React from "react";
import "./App.css";
import Login from "./components/Login/Login.jsx";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const user = useSelector((state) => state.user.user);
  const { authUser } = user;
  console.log(user);
  console.log("--------------------");
  console.log(authUser);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
