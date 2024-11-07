'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './style.scss'

import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'

interface slideProps {
  slideArr?: Array<{ id: number; title: string; url: any }>
  checkedSlide: string
  setCheckedSlide: any
  field?: any
}

export default function Slider({ slideArr, checkedSlide, setCheckedSlide, field }: slideProps) {
  // const [checked, setChecked] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  const onSlideChange = (swiper: any) => {
    setActiveSlide(swiper.activeIndex)
  }

  const checkHandler = (e: any) => {
    if (e.target.checked) {
      setCheckedSlide(activeSlide)
      // setChecked(true)
    } else {
      setCheckedSlide(null)
    }
    field.onChange(`${activeSlide}`)
  }

  useEffect(() => {
    field.onChange(`${activeSlide}`)
  }, [])

  return (
    <div className="mt-1 max-w-[370px]">
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
        initialSlide={+checkedSlide} // 초기 슬라이드 설정
      >
        {slideArr?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Image src={slide.url} alt={slide.title} width={300} height={430} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
