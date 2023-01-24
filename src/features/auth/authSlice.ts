import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthProfile {
  name: string;
  image: string;
  googleId: string;
}

interface AuthState {
  signedIn: boolean;
  profileName: string;
  profileImage: string;
  googleId: string;
  userDatabaseId: number | null;
}


const initialState: AuthState = {
  signedIn: false,
  profileName: '',
  profileImage: '',
  googleId: '',
  userDatabaseId: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthProfile>) => {
      state.signedIn = true;
      state.profileName = action.payload.name;
      state.profileImage = action.payload.image;
      state.googleId = action.payload.googleId;
    },
    signOut: state => {
      state.signedIn = false;
    },
    setUserDatabaseId: (state, action: PayloadAction<number>) => {
      state.userDatabaseId = action.payload;
    }
  }
})

export const { signIn, signOut, setUserDatabaseId } = authSlice.actions;

export default authSlice.reducer;

