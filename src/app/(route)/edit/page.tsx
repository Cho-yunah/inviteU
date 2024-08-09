'use client'

import React from 'react'
import { Tabs } from 'antd'

import BaseInfo from '@/app/_components/Edit/BaseInfo'
import EditContents from '@/app/_components/Edit/EditContents'

import styles from './edit.module.scss'

const Edit = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        className={styles.customTabs}
        items={[
          {
            label: '기본정보',
            key: '1',
            children: (
              <div className={styles.tabInner}>
                <BaseInfo />
              </div>
            ),
          },
          {
            label: '콘텐츠',
            key: '2',
            children: (
              <div className={styles.tabInner}>
                <EditContents />
              </div>
            ),
          },
          {
            label: '배경',
            key: '3',
            children: 'Tab 3',
          },
        ]}
      />
    </div>
  )
}

export default Edit
