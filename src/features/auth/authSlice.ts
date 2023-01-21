import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GoogleImageKey, GoogleNameKey } from "../../global/constants/google-account.constants";

interface UserInfo {
  name: string;
  imageUrl: string;
}

interface AuthState {
  userInfo: UserInfo;
}

const getInitialStateFromLocalStorage = (key: string): string => {
  const property = localStorage.getItem(key);
  return property === null ? '' : property;
}


const initialState: AuthState = {
  userInfo: {
    name: getInitialStateFromLocalStorage(GoogleNameKey),
    imageUrl: getInitialStateFromLocalStorage(GoogleImageKey)
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo.name = action.payload.name;
      state.userInfo.imageUrl = action.payload.imageUrl;
      localStorage.setItem(GoogleNameKey, action.payload.name);
      localStorage.setItem(GoogleImageKey, action.payload.imageUrl);
    },
    signOut: state => {
      state.userInfo.name = '';
      state.userInfo.imageUrl = '';
      localStorage.removeItem(GoogleNameKey);
      localStorage.removeItem(GoogleImageKey);
    }
  }
})

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;

