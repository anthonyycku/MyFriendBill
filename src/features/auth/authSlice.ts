import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  name: string;
  imageUrl: string;
}

interface AuthState {
  signedIn: boolean;
  userInfo: UserInfo;
}

const initialState: AuthState = {
  signedIn: false,
  userInfo: { name: '', imageUrl: '' }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: state => {
      state.signedIn = true;
    },
    signOut: state => {
      state.signedIn = false;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo.name = action.payload.name;
      state.userInfo.imageUrl = action.payload.imageUrl;
    }
  }
})

export const { signIn, signOut, setUserInfo } = authSlice.actions;

export default authSlice.reducer;

