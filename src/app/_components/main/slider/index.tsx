'use client'

import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './style.scss'

// import required modules
import { Pagination } from 'swiper/modules'

export default function Slider() {
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {slideInfo.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`size-full p-5 ${slide.color}`}>{slide.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

const slideInfo = [
  { id: 1, title: 'Slide 1', color: 'bg-blue-100', url: '' },
  { id: 2, title: 'Slide 2', color: 'bg-green-100', url: '' },
  { id: 3, title: 'Slide 3', color: 'bg-red-100', url: '' },
  { id: 4, title: 'Slide 4', color: 'bg-yellow-100', url: '' },
]
