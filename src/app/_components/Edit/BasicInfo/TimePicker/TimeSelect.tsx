import React from 'react';
import styles from '../../edit.module.scss'

export interface TimeSelectProps {
    id?: string;
    arr: string[];
    item:string;
    setItem: React.Dispatch<React.SetStateAction<string>>;
  }
  
const TimeSelect = ({id, arr, item, setItem }: TimeSelectProps) => {
  
    const handleClick = (e) => {
      setItem(e.currentTarget.innerText)
    }
  
    return (
      <div className="flex flex-col p-1 h-[135px] overflow-auto">
        {
          arr.map(i =>(
            <span className={`${styles.timeItem} ${i==item && styles.active}`} key={i} onClick={handleClick}>{i}</span>
          ))
        }
      </div>
  
    )
  }

export default TimeSelect;