import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
// import clothes from "../../assets/images/clothes.jpg";

// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function Categories() {
  const [buttons, setButtons] = useState([]);
  const clothes =
    "https://img-lcwaikiki.mncdn.com/Resource/Images/Banner/010523-EGEN-sliderd-r.jpg";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/categories/")
      .then((response) => {
        const data = response.data;
        setButtons(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center py-8">
        {buttons.map((button, index) => {
          return (
            <div key={index} className="mr-4">
              <Link to={"/categories/" + button.id}>
                <Button
                  size="lg"
                  ripple={true}
                  className=" bg-white text-black hover:bg-yellow-700 duration-300 ease-in-out"
                >
                  {button.name}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      <div className=" p-2 w-[55%] mx-auto rounded-md">
        <h3 className="text-red-900 text-center text-xl font-inter font-bold tracking-normal leading-none">
          SALES UP TO 50%
        </h3>
      </div>
      <div className="flex justify-center item-center py-4">
        <img
          className="h-[400px] w-[70%] rounded-md shadow-lg shadow-gray-600"
          src={clothes}
          alt="clothes"
        ></img>
      </div>
    </div>
  );
}

export default Categories;
