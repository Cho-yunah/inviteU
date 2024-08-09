import React from 'react'
import cx from 'classnames'

import styles from './editButton.module.scss'

interface Props {
  text: string
  type?: 'primary' | 'secondary'
  position?: 'right'
}

export default function EditButton({ text, type, position }: Props) {
  return (
    <button
      type="button"
      className={cx(styles.editButton, {
        [styles.secondary]: type === 'secondary',
        [styles.positionRight]: position === 'right',
      })}
    >
      {text}
    </button>
  )
}
