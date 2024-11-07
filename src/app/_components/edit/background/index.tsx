import React, { Dispatch, SetStateAction } from 'react'
import Slider from '../../common/slider'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const slideArr = [
  { id: 1, title: 'Slide 1', url: '/img/background_1.png' },
  { id: 2, title: 'Slide 2', url: '/img/background_2.png' },
  { id: 3, title: 'Slide 3', url: '/img/background_3.png' },
  { id: 4, title: 'Slide 4', url: '/img/background_4.png' },
  { id: 5, title: 'Slide 5', url: '/img/background_5.png' },
  { id: 6, title: 'Slide 6', url: '/img/background_6.png' },
  { id: 7, title: 'Slide 7', url: '/img/background_7.png' },
  { id: 8, title: 'Slide 8', url: '/img/background_8.png' },
  { id: 9, title: 'Slide 9', url: '/img/background_9.png' },
  { id: 10, title: 'Slide 10', url: '/img/background_10.png' },
  { id: 11, title: 'Slide 11', url: '/img/background_11.png' },
  { id: 12, title: 'Slide 12', url: '/img/background_12.png' },
]

const Background = ({
  form,
  checkedSlide,
  setCheckedSlide,
}: {
  form: any
  checkedSlide: string
  setCheckedSlide: Dispatch<SetStateAction<string>>
}) => {
  return (
    <FormField
      control={form.control}
      name="background_image"
      render={({ field, formState: { errors } }) => (
        <FormItem className="relative">
          <div className="flex leading-7 items-center my-2">
            <FormLabel className="justify-center font-semibold">배경 선택</FormLabel>
            <span className="text-red-600 self-start pl-1">*</span>
          </div>
          <FormMessage className="text-xs text-red-400 p-1" />
          <FormControl className="relative">
            <Slider
              field={field}
              slideArr={slideArr}
              checkedSlide={checkedSlide}
              setCheckedSlide={setCheckedSlide}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default Background
