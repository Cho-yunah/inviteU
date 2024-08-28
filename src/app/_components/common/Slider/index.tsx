'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';

interface slideProps {
  slideArr?: Array<{id: number, title: string, color: string, url: any}>
  // slideArr?: Array<{id: number, title: string, color: string, url: string}>
}

export default function Slider({slideArr}: slideProps) {
  console.log(slideArr)


  return (
    <>
      <Swiper pagination={{clickable: true}} modules={[Pagination, Navigation]} className="mySwiper">
        {slideArr?.map((slide) => ( 
          <SwiperSlide key={slide.id}>
            <div className={`p-0 shadow-md flex justify-center`}>
                <Image src={slide.url} alt={slide.title} width={250} height={650} />
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