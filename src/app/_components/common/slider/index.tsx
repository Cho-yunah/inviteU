'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './style.scss'

import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'

interface slideProps {
  slideArr?: Array<{ id: number; title: string; color: string; url: any }>
  checkedSlide: string
  setCheckedSlide: any
  field?: any
}

export default function Slider({ slideArr, checkedSlide, setCheckedSlide, field }: slideProps) {
  const [checked, setChecked] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  const onSlideChange = (swiper: any) => {
    setActiveSlide(swiper.activeIndex)
  }

  const checkHandler = (e: any) => {
    if (e.target.checked) {
      setCheckedSlide(activeSlide)
      setChecked(true)
    } else {
      setCheckedSlide(null)
    }
    field.onChange(`${activeSlide}`)
  }

  return (
    <div className="mt-1">
      <div className="absolute top-0 right-1 z-50">
        <input
          type="checkbox"
          id="check"
          checked={+checkedSlide == activeSlide ? true : false}
          onChange={checkHandler}
        />
        <label htmlFor="check" className="left-[300px]"></label>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        onSlideChange={onSlideChange}
      >
        {slideArr?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`p-0 m-0 flex justify-center w-full ${+checkedSlide == slide.id && 'shadow-[0_2px_3px_5px_rgba(135,211,248,0.5)]'}`}
            >
              <Image src={slide.url} alt={slide.title} width={300} height={550} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
