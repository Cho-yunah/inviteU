import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InvitationStateType = {
  id: string
  user_id: string
  created_at: string
  custom_url: string
  date: string
  time: string
  description?: string
  title: string
  background_image: string
  primary_image: string
  contents: []
}

const initialState: InvitationStateType[] = []

export const invitationSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {
    setInvitationList: (state, action: PayloadAction<InvitationStateType[]>) => {
      return action.payload
    },
  },
})

export const { setInvitationList } = invitationSlice.actions
export default invitationSlice.reducer
