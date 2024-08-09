import React from 'react'

import {
  Flex,
  Input,
  DatePicker,
  DatePickerProps,
  TimePicker,
  TimePickerProps,
} from 'antd'

import EditStep from './EditStep/EditStep'
import EditButton from './EditButton/EditButton'

import styles from './edit.module.scss'

export default function BaseInfo() {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('Change:', e.target.value)
  }

  const datePickerOnChange: DatePickerProps['onChange'] = (
    date,
    dateString,
  ) => {
    console.log(date, dateString)
  }

  const timePickerOnChange: TimePickerProps['onChange'] = (
    time,
    timeString,
  ) => {
    console.log(time, timeString)
  }

  return (
    <div>
      <h2 className={styles.tabTitle}>기본정보</h2>
      <EditStep title="초대장 제목" isRequire>
        <Input
          showCount
          maxLength={60}
          placeholder="내용을 입력해주세요"
          onChange={onChange}
        />
      </EditStep>
      <EditStep title="링크 생성" isRequire>
        <Input
          showCount
          maxLength={60}
          placeholder="기본 URL/wearegettingmarry"
          onChange={onChange}
        />
      </EditStep>
      <EditStep title="날짜" isRequire>
        <div className={styles.line}>
          <DatePicker onChange={datePickerOnChange} />
        </div>
        <div className={styles.line}>
          <TimePicker
            use12Hours
            format="h:mm a"
            onChange={timePickerOnChange}
          />
        </div>
      </EditStep>
      <EditStep title="대표이미지" isRequire>
        <div className={styles.uploadImage}>
          <p className={styles.uploadText}>이미지 파일을 업로드해 주세요</p>
          <p className={styles.uploadDesc}>최대 파일 사이즈 : 5MB</p>
          <EditButton text="파일 선택" type="secondary" />
        </div>
      </EditStep>
    </div>
  )
}
