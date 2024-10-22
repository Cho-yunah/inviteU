import { ContentDataType } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { set } from 'lodash'

// 초대장 항목의 타입 정의
export type InvitationStateType = {
  id?: string
  user_id: string
  custom_url: string
  date: string
  time: string
  title: string
  background_image: string
  primary_image: string
  contents?: ContentDataType[]
}

// Redux state의 초기 상태 설정
interface InvitationSliceState {
  list: InvitationStateType[] // 전체 리스트
  selected: InvitationStateType | null // 선택된 초대장
}

const initialState: InvitationSliceState = {
  list: [], // 초기에는 비어있는 리스트
  selected: null, // 선택된 초대장 초기화
}

// 전처리 함수
const sanitizeInvitationData = (data: any) => {
  const { created_at, ...sanitizedData } = data
  sanitizedData.contents = sanitizedData.contents.map((content: any) => {
    const { created_at, ...rest } = content
    return rest
  })
  return sanitizedData
}

export const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    // 리스트 전체 데이터를 저장
    setInvitationList(state, action: PayloadAction<InvitationStateType[]>) {
      state.list = action.payload
    },
    // 특정 초대장 데이터를 선택하여 저장
    setSelectedInvitation(state, action: PayloadAction<InvitationStateType>) {
      state.selected = sanitizeInvitationData(action.payload) // 전처리 후 저장
    },
    // 선택된 초대장 초기화
    clearSelectedInvitation(state) {
      state.selected = null
    },
  },
})

// 액션과 리듀서 내보내기
export const { setInvitationList, setSelectedInvitation, clearSelectedInvitation } =
  invitationSlice.actions
export default invitationSlice.reducer
