import { configureStore } from '@reduxjs/toolkit'
import invitationReducer from './features/invitation/invitationSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      invitation: invitationReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']