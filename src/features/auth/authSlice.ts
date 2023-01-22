import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GoogleImageKey, GoogleNameKey } from "../../global/constants/google-account.constants";

interface UserInfo {
  name: string;
  imageUrl: string;
}

interface AuthState {
  signedIn: boolean | null;
  userInfo: UserInfo;
}

const getInitialStateFromLocalStorage = (key: string): string => {
  const property = localStorage.getItem(key);
  return property === null ? '' : property;
}


const initialState: AuthState = {
  signedIn: null,
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
      state.signedIn = true;
      localStorage.setItem(GoogleNameKey, action.payload.name);
      localStorage.setItem(GoogleImageKey, action.payload.imageUrl);
    },
    signOut: state => {
      state.userInfo.name = '';
      state.userInfo.imageUrl = '';
      state.signedIn = false;
      localStorage.removeItem(GoogleNameKey);
      localStorage.removeItem(GoogleImageKey);
    },
    setSignedInStatus: (state, action: PayloadAction<boolean>) => {
      state.signedIn = action.payload;
    }
  }
})

export const { signIn, signOut, setSignedInStatus } = authSlice.actions;

export default authSlice.reducer;

