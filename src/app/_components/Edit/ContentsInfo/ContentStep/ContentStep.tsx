'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import cx from 'classnames'

import styles from './contentStep.module.scss'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface Props {
  title: string
  description: string
  children: React.ReactNode
}

export default function ContentStep({ title, description, children }: Props) {
  const slideRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true)

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }

  const toggleButtonOnClick = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (isOpen && slideRef.current) {
      console.log('slideRef:', slideRef)
      slideRef!.current!.parentElement!.style.display = 'block';
      const height = slideRef.current.style.getPropertyValue('--accordion-height');
  
      if (height === '0' || !height) {
        slideRef.current.parentElement!.style.setProperty(
          '--accordion-height',
          `${slideRef.current.clientHeight}px`,
        );
      }
    }
  }, [isOpen]);

  return (
    <div className={styles.contentStep} ref={slideRef}>
      <div className={styles.contentHeader}>
        <Switch id="contents-switch" defaultChecked={false} checked={isOpen} onCheckedChange={toggleButtonOnClick} />
        <Label htmlFor="contents-switch" className='pl-2 font-bold text-gray-800'>{title}</Label>
        <button
          type="button"
          className={cx(styles.toggleButton, {
            [styles.toggleIsClosed]: isOpen === false,
          })}
          onClick={toggleButtonOnClick}
        >
          <Image src="./Chevron.svg" alt='Chevron' width={24} height={24} />
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
