import React from 'react'
import cx from 'classnames'

import styles from './editButton.module.scss'

interface Props {
  type: 'button' | 'submit' | 'reset'
  text: string
  style?: 'primary' | 'secondary'
  position?: 'right'
  className?: string
  props?:any
}

export default function EditButton({ type, text, style, position, className, props }: Props) {
  return (
    <button
      type={type}
      className={cx(styles.editButton, className, {
        [styles.secondary]: style === 'secondary',
        [styles.positionRight]: position === 'right',
      })}
      {...props}
    >
      {text}
    </button>
  )
}
