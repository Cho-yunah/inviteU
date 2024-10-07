import React from 'react'
import styles from '../../edit.module.scss'

export interface TimeSelectProps {
  id: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

const TimeSelect = ({ id, options, value, onChange }: TimeSelectProps) => {
  return (
    <div className="flex flex-col p-1 h-[135px] overflow-auto">
      {options.map((option) => (
        <button
          key={option}
          className={`py-1 px-2 m-1 rounded-md ${
            value === option ? 'bg-blue-400 text-white' : 'bg-white text-black'
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default TimeSelect
