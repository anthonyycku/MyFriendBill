import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Profile {
  name: string;
  image: string;
  googleId: string;
}

interface AuthState {
  signedIn: boolean;
  profileName: string;
  profileImage: string;
  googleId: string;
}


const initialState: AuthState = {
  signedIn: false,
  profileName: '',
  profileImage: '',
  googleId: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<Profile>) => {
      state.signedIn = true;
      state.profileName = action.payload.name;
      state.profileImage = action.payload.image;
      state.googleId = action.payload.googleId;
    },
    signOut: state => {
      state.signedIn = false;
    }
  }
})

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;

