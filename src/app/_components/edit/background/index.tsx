import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Slider from '../../common/slider'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

const slideArr = [
  { id: 1, title: 'Slide 1', color: 'bg-blue-100', url: '/img/background_1.png' },
  { id: 2, title: 'Slide 2', color: 'bg-green-100', url: '/img/background_2.png' },
  { id: 3, title: 'Slide 3', color: 'bg-red-100', url: '/img/background_3.png' },
  { id: 4, title: 'Slide 4', color: 'bg-yellow-100', url: '/img/background_4.png' },
  { id: 5, title: 'Slide 5', color: 'bg-yellow-100', url: '/img/background_5.png' },
  { id: 6, title: 'Slide 6', color: 'bg-yellow-100', url: '/img/background_6.png' },
]

const Background = ({
  form,
  checkedSlide,
  setCheckedSlide,
}: {
  form: any
  checkedSlide: null | number
  setCheckedSlide: Dispatch<SetStateAction<null>>
}) => {
  useEffect(() => {
    console.log('checkedSlide:', checkedSlide)
  }, [checkedSlide])

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
