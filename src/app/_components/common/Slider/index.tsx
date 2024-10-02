'use client';

import React, { useState } from 'react';
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
  checkedSlide: number;
  setCheckedSlide: any;
}

export default function Slider({slideArr, checkedSlide, setCheckedSlide}: slideProps) {
  const [checked, setChecked] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
    
    const onSlideChange = (swiper: any) => {
      setActiveSlide(swiper.activeIndex+1)
      // console.log(checkedSlide, activeSlide)
    }

    const checkHandler = (e: any) => {
      // console.log(e.target.checked)
      if(e.target.checked) {
        setCheckedSlide(activeSlide)
        setChecked(true)
      }
      else setCheckedSlide(0)
    }

  return (
    <>
      <div className=''>
        <input type="checkbox" id="check" checked={checked && checkedSlide==activeSlide? true: false} onChange={checkHandler}/>
        <label htmlFor="check" className="absolute left-[300px]"></label>
      </div>
      <Swiper 
        pagination={{clickable: true}} 
        modules={[Pagination, Navigation]} 
        onSlideChange={onSlideChange}
      >
        {slideArr?.map((slide) => ( 
          <SwiperSlide key={slide.id} >
            <div className={`p-0 shadow-md flex justify-center ${checkedSlide==slide.id && 'shadow-[0_0px_3px_5px_rgba(135,211,248,0.5)]'}`}>
                <Image src={slide.url} alt={slide.title} width={250} height={650} />
            </div>
          </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
}