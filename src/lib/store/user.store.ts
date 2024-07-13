import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';
import { User } from "../../../interface/user.interface";

const initialState: User = {
  id: uuid(),
  firstName: 'Aeyll',
  lastName: 'Lo',
  nickname: 'Aeyll lo'
}
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    editNickName(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
    }
  },
});

export const { editNickName } = userSlice.actions

export default userSlice.reducer;