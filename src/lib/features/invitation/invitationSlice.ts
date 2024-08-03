import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InvitationStateType =  {
  email: string;
  phone: string;
  user_metadata: {
    name: string;
  }
};

const initialState = {
  email: '',
  phone: '',
  user_metadata: {
    name: '',
  },
} as InvitationStateType;

export const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    setInvitation: (state, action: PayloadAction<InvitationStateType>) => {
      return action.payload;
    },

  },
});

export const {setInvitation} = invitationSlice.actions;
export default invitationSlice.reducer;