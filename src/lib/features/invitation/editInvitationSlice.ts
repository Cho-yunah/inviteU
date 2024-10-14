import { ContentDataType } from '@/lib/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type EditInvitationStateType = {
    title: string;
    custom_url: string;
    date: string;
    image_urls: string;
}

const initialState: ContentDataType[] = [];

export const editInvitationSlice = createSlice({
    name: 'editInvitation',
    initialState,
    reducers: {
        setBaseInfo: (state, action: PayloadAction<ContentDataType[]>) => {
            return action.payload;
        },
        setContensInfo: (state, action: PayloadAction<ContentDataType[]>) => { 
            return action.payload;
        }
    },
});
