import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type InvitationStateType =  {
  address: string;
  created_at: string;
  custom_url: string;
  date: string;
  description: string;
  title: string;
  subtitle: string;
};

const initialState :InvitationStateType[] =[];

export const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    setInvitation: (state, action: PayloadAction<InvitationStateType[]>) => {
      return action.payload;
    },
  },
});

export const {setInvitation} = invitationSlice.actions;
export default invitationSlice.reducer;