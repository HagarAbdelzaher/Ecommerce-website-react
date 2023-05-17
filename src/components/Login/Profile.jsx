import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

const Profile = () => {
  //   const user = useSelector((state) => state.auth.user);
  const user = {
    username: "user123",
    first_name: "firstname",
    last_name: "lastname",
    email: "user@gmail.com",
    address: { street: "1122", district: "Maadi", country: "EG" },
  };
  const avatarSrc =
    "https://a0.anyrgb.com/pngimg/546/1112/loli-profile-icon-share-icon-interface-avatar-icon-design-user-female-svg-face-thumbnail.png";

  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-screen  bg-white">
      <Avatar src={avatarSrc} size="xxl" />
      <Card className="w-2/5 mt-n20">
        <CardHeader
          variant="gradient"
          color="blue"
          className="m-1 mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white" className="mt-4">
            {user.username}'s Profile
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="body1">
            <strong>Name: </strong> {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body1">
            <strong>Email: </strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Address: </strong> {user.address.street},{" "}
            {user.address.district}, {user.address.city} ({user.address.country}
            )
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;
