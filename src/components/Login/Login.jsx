import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { login } from "../../features/slices/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const intitalState = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState(intitalState);
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/account/login/",
        values
      );
      const token = response.data.token;
      dispatch(login({ ...values, authUser: true, token }));
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status >= 400) {
        console.log(error.response.data);
        toast.error(error.response.data?.error || "Wrong Credintials", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  const isDisabled = !values.username || !values.password;

  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-screen m-2">
      <Card className="w-2/5 m-2">
        <CardHeader
          variant="gradient"
          color="blue"
          className=" m-1 mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="username"
            size="lg"
            type="text"
            name="username"
            value={values.username}
            onChange={onChange}
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
          />
          <div className="-ml-2.5"></div>
          <div className="text-center">
            <Link className="text-blue-500" to="/signup">
              Don't have an account? Sign up here.
            </Link>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Login;
