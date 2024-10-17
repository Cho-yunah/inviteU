import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InvitationType = {
  id: string
  title: string
  custom_url: string
  date: Date
  background_image: number
  primary_image: string
}

const initialState = {
  list: [] as InvitationType[],
  currentInvitation: null as InvitationType | null,
}

export const editInvitationSlice = createSlice({
  name: 'editInvitation',
  initialState,
  reducers: {
    setInvitationList: (state, action: PayloadAction<InvitationType[]>) => {
      state.list = action.payload
    },
    setCurrentInvitation: (state, action: PayloadAction<InvitationType>) => {
      state.currentInvitation = action.payload
    },
  },
})

export const { setInvitationList, setCurrentInvitation } = editInvitationSlice.actions
export default editInvitationSlice.reducer
