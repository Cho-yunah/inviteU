import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type EditInvitationStateType = {
    title: string;
    custom_url: string;
    date: string;
    image_urls: string;
}

const initialState: EditInvitationStateType[] = [];

export const editInvitationSlice = createSlice({
    name: 'editInvitation',
    initialState,
    reducers: {
        setEditInvitation: (state, action: PayloadAction<EditInvitationStateType[]>) => {
            return action.payload;
        },
    },
});
