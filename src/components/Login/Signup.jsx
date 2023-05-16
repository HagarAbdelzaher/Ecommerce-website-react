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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    address: {
      detailed_address: "",
      country: "",
      city: "",
      apartment_no: "",
      building_no: "",
      floor_no: "",
      street: "",
      district: "",
    },
  };
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onAddressChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      address: { ...values.address, [name]: value },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/account/register/",
        values
      );
      console.log(response.data);
      // handle success response
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status >= 400) {
        const errorMessage = error.response.data;
        console.log(error.response.data);
        toast.error(error.response.data?.error || "Error signing up", {
          position: toast.POSITION.TOP_CENTER,
        });

        console.log(errorMessage);
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

  const isDisabled =
    !values.username ||
    !values.email ||
    !values.password ||
    !values.first_name ||
    !values.last_name ||
    !values.address.country ||
    !values.address.city ||
    !values.address.building_no ||
    !values.address.street ||
    !values.address.apartment_no ||
    !values.address.district;

  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-screen m-2">
      <Card className="w-2/5 m-2">
        <CardHeader
          variant="gradient"
          color="blue"
          className=" m-1 mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Username"
            size="lg"
            type="text"
            name="username"
            value={values.username}
            onChange={onChange}
            required
          />
          <Input
            label="Email"
            size="lg"
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            required
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
            required
          />
          <Input
            label="First Name"
            size="lg"
            type="text"
            name="first_name"
            value={values.first_name}
            onChange={onChange}
            required
          />
          <Input
            label="Last Name"
            size="lg"
            type="text"
            name="last_name"
            value={values.last_name}
            onChange={onChange}
            required
          />
          <Input
            label="Detailed Address"
            size="lg"
            type="text"
            name="detailed_address"
            value={values.address.detailed_address}
            onChange={onAddressChange}
          />
          <select
            label="Country"
            size="lg"
            name="country"
            value={values.address.country}
            onChange={onAddressChange}
            required
          >
            <option value="">Select a country</option>
            <option value="AF">Afghanistan</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="AZ">Azerbaijan</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BY">Belarus</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BT">Bhutan</option>
            <option value="BO">Bolivia</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BW">Botswana</option>
            <option value="BR">Brazil</option>
            <option value="BN">Brunei</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="BI">Burundi</option>
            <option value="CV">Cabo Verde</option>
            <option value="KH">Cambodia</option>
            <option value="CM">Cameroon</option>
            <option value="CA">Canada</option>
            <option value="CF">Central African Republic</option>
            <option value="TD">Chad</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CO">Colombia</option>
            <option value="KM">Comoros</option>
            <option value="CD">Congo, Democratic Republic of the</option>
            <option value="CG">Congo, Republic of the</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">Cote d'Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czechia</option>
            <option value="DK">Denmark</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="GQ">Equatorial Guinea</option>
            <option value="ER">Eritrea</option>
            <option value="EE">Estonia</option>
            <option value="SZ">Eswatini</option>
            <option value="ET">Ethiopia</option>
            <option value="FJ">Fiji</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GA">Gabon</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GR">Greece</option>
            <option value="GD">Grenada</option>
            <option value="GT">Guatemala</option>
            <option value="GN">Guinea</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="GY">Guyana</option>
            <option value="HT">Haiti</option>
            <option value="HN">Honduras</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JO">Jordan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="KE">Kenya</option>
            <option value="KI">Kiribati</option>
            <option value="XK">Kosovo</option>
            <option value="KW">Kuwait</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="LA">Laos</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LS">Lesotho</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MG">Madagascar</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="MV">Maldives</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MH">Marshall Islands</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="MX">Mexico</option>
            <option value="FM">Micronesia</option>
            <option value="MD">Moldova</option>
            <option value="MC">Monaco</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MA">Morocco</option>
            <option value="MZ">Mozambique</option>
            <option value="MM">Myanmar</option>
            <option value="NA">Namibia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NL">Netherlands</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="KP">North Korea</option>
            <option value="MK">North Macedonia</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PW">Palau</option>
            <option value="PS">Palestine</option>
            <option value="PA">Panama</option>
            <option value="PG">Papua New Guinea</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="QA">Qatar</option>
            <option value="RO">Romania</option>
            <option value="RU">Russia</option>
            <option value="RW">Rwanda</option>
            <option value="KN">Saint Kitts and Nevis</option>
            <option value="LC">Saint Lucia</option>
            <option value="VC">Saint Vincent and the Grenadines</option>
            <option value="WS">Samoa</option>
            <option value="SM">San Marino</option>
            <option value="ST">Sao Tome and Principe</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
          </select>
          <Input
            label="City"
            size="lg"
            type="text"
            name="city"
            value={values.address.city}
            onChange={onAddressChange}
            required
          />
          <Input
            label="Apartment No."
            size="lg"
            type="text"
            name="apartment_no"
            value={values.address.apartment_no}
            onChange={onAddressChange}
            required
          />
          <Input
            label="Building No."
            size="lg"
            type="text"
            name="building_no"
            value={values.address.building_no}
            onChange={onAddressChange}
            required
          />
          <Input
            label="Floor No."
            size="lg"
            type="text"
            name="floor_no"
            value={values.address.floor_no}
            onChange={onAddressChange}
          />
          <Input
            label="Street"
            size="lg"
            type="text"
            name="street"
            value={values.address.street}
            onChange={onAddressChange}
            required
          />
          <Input
            label="District"
            size="lg"
            type="text"
            name="district"
            value={values.address.district}
            onChange={onAddressChange}
            required
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Signup;
