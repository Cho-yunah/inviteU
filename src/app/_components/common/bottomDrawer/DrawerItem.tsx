import React from 'react'
import styles from './drawer.module.scss'

type DrawerItemProps = {
  name: string
  icon: JSX.Element
  text: string
  onClickItem: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const DrawerItem = ({ name, icon, text, onClickItem }: DrawerItemProps) => {
  return (
    <button name={name} type="button" className={styles.drawerItem} onClick={onClickItem}>
      <div className={styles.icon}>{icon}</div>
      <p>{text}</p>
    </button>
  )
}

export default React.memo(DrawerItem)
