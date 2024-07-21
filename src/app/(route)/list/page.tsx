import React from 'react';
import styles from "../../page.module.css";
import ListItem from '../../components/ListItem';


const List = () => {
  return (
    <div >
        <div className='p-[1rem]'>
          <h1 className='text-gray-700 text-2xl font-bold pt-2 pb-2'>내 초대장</h1>
        </div>
        <div className='w-full text-center'>
          <button className={[styles.mainButton, 'rounded-[10px]', 'text-sm','shadow-sm'].join(' ')}>초대장 생성 +</button>
        </div>
       <ListItem />
    </div>
  )
}

export default List;