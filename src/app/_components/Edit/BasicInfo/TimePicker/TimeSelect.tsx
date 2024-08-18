import React from 'react';
import styles from '../../edit.module.scss'

export interface TimeSelectProps {
    arr: string[];
    item:string;
    setItem: React.Dispatch<React.SetStateAction<string>>;
  }
  
const TimeSelect = ({arr, item, setItem }: TimeSelectProps) => {
  
    const handleClick = (e) => {
      console.log(e.currentTarget.id)
      setItem(e.currentTarget.id)
    }
  
    return (
      <div className="flex flex-col p-1 h-[135px] overflow-auto">
        {
          arr.map(i =>(
            <span id={i} className={`${styles.timeItem} ${i==item && styles.active}`} key={i} onClick={handleClick}>{i}</span>
          ))
        }
      </div>
  
    )
  }

export default TimeSelect;