import React from 'react'

import styles from './editStep.module.scss'

interface Props {
  title: string
  children: React.ReactNode
  isRequire?: boolean
}

export default function EditStep({ title, isRequire, children }: Props) {
  return (
    <div className={styles.contents}>
      <p className={styles.contentsTitle}>
        {title}
        {isRequire ? <span className={styles.star}>*</span> : ''}
      </p>
      {children}
    </div>
  )
}
