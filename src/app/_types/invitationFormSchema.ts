import dayjs from 'dayjs'
import { z } from 'zod'

export const invitationFormSchema = z.object({
  user_id: z.string().min(10),
  title: z
    .string()
    .min(7, {
      message: '초대장 제목은 7자 이상 입력해주세요.',
    })
    .max(60, {
      message: '초대장 제목은 60자 이하로 입력해주세요.',
    }),
  custom_url: z
    .string()
    .min(6, {
      message: '6자 이상 입력해주세요.',
    })
    .refine((value) => /^[a-z-]+$/g.test(value), {
      message: '커스텀 주소는 영어 소문자로 입력해주세요.',
    }),
  date: z.string().refine((value) => dayjs(value).isAfter(dayjs(), 'day'), {
    message: '날짜는 오늘 이후로 선택해주세요.',
  }),
  time: z.string().min(5, {
    message: '시간을 선택해주세요.',
  }),
  primary_image: z.string().min(3, {
    message: '이미지 URL을 넣어주세요.',
  }),
  background_image: z.string().min(1, { message: '배경 이미지를 선택해주세요.' }),
  contents: z
    .array(
      z.object({
        type: z.string().nonempty({ message: '콘텐츠 타입을 입력해주세요.' }), // 예: 'text', 'image'
        text: z.string().optional(), // text가 없는 경우 optional로 설정
        layout: z.string().optional(), // layout 정보가 필요할 경우
        urls: z.string().url().optional(), // 이미지 URL 등이 있을 경우
        ratio: z.union([z.number(), z.string()]).optional(), // 문자열도 허용// 이미지 비율이 필요할 경우
        font_size: z.union([z.number(), z.string()]).optional(), // 숫자와 문자열 모두 허용
        font_type: z.string().optional(), // 폰트 타입이 필요할 경우
        size: z.string().optional(), // 간격 크기가 필요할 경우
        main_address: z.string().optional(), // 주소 정보가 필요할 경우
        detail_address: z.string().optional(), // 상세 주소 정보가 필요할 경우
        post_number: z.string().optional(), // 우편번호 정보가 필요할 경우
      }),
    )
    .min(1, { message: '콘텐츠를 추가해주세요.' }),
})
