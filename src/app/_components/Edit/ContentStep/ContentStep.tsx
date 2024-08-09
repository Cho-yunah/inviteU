import React, { useState } from 'react'
import { Switch } from 'antd'
import Image from 'next/image'
import cx from 'classnames'
// import ChevronIcon from '/public/chevron_top.svg'

import styles from './contentStep.module.scss'

interface Props {
  title: string
  description: string
  children: React.ReactNode
}

export default function ContentStep({ title, description, children }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }

  const toggleButtonOnClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={styles.contentStep}>
      <div className={styles.contentHeader}>
        <Switch defaultChecked onChange={onChange} size="small" />
        <span className={styles.headerTitle}>{title}</span>
        <button
          type="button"
          className={cx(styles.toggleButton, {
            [styles.toggleIsClosed]: isOpen === false,
          })}
          onClick={toggleButtonOnClick}
        >
          {/* <Image src={ChevronIcon} alt="contents toggle icon" width="28" /> */}
        </button>
      </div>
      {isOpen && (
        <div className={styles.contentDesc}>
          <p className={styles.description}>{description}</p>
          <div>{children}</div>
        </div>
      )}
    </div>
  )
}
