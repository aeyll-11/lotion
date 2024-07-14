import { User } from '@/interface/user.interface';
import { user } from '@/utils/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: User = user;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editNickName(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
    },
  },
});

export const { editNickName } = userSlice.actions;

export default userSlice.reducer;
