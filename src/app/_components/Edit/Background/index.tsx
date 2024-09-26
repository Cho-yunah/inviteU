import React, { useState } from 'react'
import Slider from '../../common/Slider';

const slideArr = [
    {id: 1, title: 'Slide 1', color: 'bg-blue-100', url: '/img/background_1.png'},
    {id: 2, title: 'Slide 2', color: 'bg-green-100', url: '/img/background_2.png'},
    {id: 3, title: 'Slide 3', color: 'bg-red-100', url: '/img/background_3.png'},
    {id: 4, title: 'Slide 4', color: 'bg-yellow-100', url: '/img/background_4.png'},
    {id: 5, title: 'Slide 5', color: 'bg-yellow-100', url: '/img/background_5.png'},
    {id: 6, title: 'Slide 6', color: 'bg-yellow-100', url: '/img/background_6.png'},
]

const Background = () => {
    const [checkedSlide, setCheckedSlide] = useState(0);
    return (
        <div className='w-max-[350px]'>
            <div className='flex leading-7 items-center my-2'>
                <p className='justify-center font-semibold'>배경 선택</p>
                <span className='text-red-600 self-start pl-1'>*</span>
            </div>
            <div className="mt-3 relative">
                <Slider slideArr={slideArr} checkedSlide={checkedSlide} setCheckedSlide={setCheckedSlide}/>
            </div>
        </div>
    )
}

export default Background;