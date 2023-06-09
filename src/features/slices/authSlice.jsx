import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (data, thunkAPI) => {
    console.log(thunkAPI.getState());
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${thunkAPI.getState().user.user.token}`,
      },
    };
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/account/update/",
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "users/updateAddress",
  async (data, thunkAPI) => {
    console.log(thunkAPI.getState());
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${thunkAPI.getState().user.user.token}`,
      },
    };
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/account/update/address",
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      username: "",
      password: "",
      token: "",
      first_name: "",
      last_name: "",
      email: "",
      address: {
        detailed_address: "",
        district: "",
        city: "",
        country: "",
        floor_no: "",
        apartment_no: "",
        building_no: "",
        street: "",
      },
      authUser: false,
    },
  },
  reducers: {
    // set user state from sessionStorage
    setUser(state, action) {
      let userlogging = JSON.parse(sessionStorage.getItem("authUser"));
      if (userlogging) {
        state.user = userlogging.user;
        state.user.authUser = true;
        state.user.token = userlogging.token;
      }
    },
    login(state, action) {
      const userlogging = action.payload;
      const userValidation = /^[A-Za-z0-9]{4,10}$/i.test(userlogging.username);
      const passwordValidation = /^[A-Za-z0-9]{4,}$/i.test(
        userlogging.password
      );
      if (!userValidation || !passwordValidation) {
        state.user.authUser = false;
      } else {
        console.log(userlogging.token);
        state.user = userlogging.user;
        state.user.authUser = true;
        state.user.token = userlogging.token;
        const saveState = JSON.stringify(userlogging);
        sessionStorage.setItem("authUser", saveState);
      }
    },
    logout(state) {
      state.user = {
        username: "",
        password: "",
        authUser: false,
      };
      sessionStorage.clear();
    },
    async updateProfile(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log(state.user);
        state.user.first_name = action.payload.first_name;
        state.user.last_name = action.payload.last_name;
        state.user.email = action.payload.email;
        let data = {
          user: state.user,
          authUser: true,
          token: state.user.token,
        };
        sessionStorage.setItem("authUser", JSON.stringify(data));
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.user.address = action.payload;
        let data = {
          user: state.user,
          authUser: true,
          token: state.user.token,
        };
        sessionStorage.setItem("authUser", JSON.stringify(data));
      });
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
