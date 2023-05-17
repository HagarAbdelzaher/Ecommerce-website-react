import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      username: "",
      password: "",

      authUser: false,
    },
  },
  reducers: {
    login(state, action) {
      const userlogging = action.payload;
      const userValidation = /^[A-Za-z0-9]{4,10}$/i.test(userlogging.username);
      const passwordValidation = /^[A-Za-z0-9]{4,}$/i.test(
        userlogging.password
      );
      if (!userValidation || !passwordValidation) {
        state.user.authUser = false;
      } else {
        state.user = userlogging.user;
        state.user.authUser = true;
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
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
