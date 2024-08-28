'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';

import Image from 'next/image';
import background_1 from '/public/background/background_1.png';
import background_2 from '/public/background/background_2.png';
import { Pagination } from 'swiper/modules';

interface slideProps {
  slideArr?: Array<{id: number, title: string, color: string, url: any}>
  // slideArr?: Array<{id: number, title: string, color: string, url: string}>
}

export default function Slider({slideArr}: slideProps) {
  console.log(slideArr)


  return (
    <>
      <Swiper pagination={{clickable: true}} modules={[Pagination]} className="mySwiper">
        {slideArr?.map((slide) => ( 
          <SwiperSlide key={slide.id}>
            <div className={` p-5 ${slide.color}`}>
                {/* {slide.title} */}
                {/* {slide.url} */}
                <Image src={slide.url} alt={slide.title} width={250} height={450} />
            </div>
          </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
}


const slideInfo = [
  {id: 1, title: 'Slide 1', color: 'bg-blue-100', url: ''},
  {id: 2, title: 'Slide 2', color: 'bg-green-100', url: ''},
  {id: 3, title: 'Slide 3', color: 'bg-red-100', url: ''},
  {id: 4, title: 'Slide 4', color: 'bg-yellow-100', url: ''},
]