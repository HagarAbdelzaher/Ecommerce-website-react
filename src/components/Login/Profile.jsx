import React from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const Profile = () => {
  const token = useSelector((state) => state.user.user.token);
  const decodedToken = jwt_decode(token);
  const { username, name, email, phone } = decodedToken;

  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-screen m-2">
      <Card className="w-2/5 m-2">
        <CardHeader
          variant="gradient"
          color="blue"
          className=" m-1 mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            {username}'s Profile
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="body1">
            <strong>Name: </strong> {name}
          </Typography>
          <Typography variant="body1">
            <strong>Email: </strong> {email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone: </strong> {phone}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;
