'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BaseInfo from '@/app/_components/Edit/BasicInfo'
import ContentsInfo from '@/app/_components/Edit/ContentsInfo'
import styles from './edit.module.scss'

const Edit = () => {
  return (
    <div>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className='grid w-full grid-cols-3 bg-gray-100 p-0'>
            <TabsTrigger className={styles.tabTrigger} value="basic">기본 정보</TabsTrigger>
            <TabsTrigger className={styles.tabTrigger} value="contents">콘텐츠</TabsTrigger>
            <TabsTrigger className={styles.tabTrigger} value="backgrond">배경</TabsTrigger>
        </TabsList>
        <TabsContent  value="basic">
          <BaseInfo/>
        </TabsContent>
        <TabsContent className='px-5' value="contents">
          <ContentsInfo/>
        </TabsContent>
        <TabsContent className='px-5' value="backgrond">후후 your password here.</TabsContent>
       </Tabs>
    </div>
  )
}

export default Edit
