import React, { useCallback, useEffect, useState } from 'react'
import styles from './drawer.module.scss'
import { IoClose } from 'react-icons/io5'
import DrawerItem from './DrawerItem'
import { DrawerItemArray } from './drawerItemsArray'

interface BottomDrawerProps {
  showDrawer: boolean
  setShowDrawer: (showDrawer: boolean) => void
  handleAddComponent: (component: any) => void
}

const BottomDrawer = ({ showDrawer, setShowDrawer, handleAddComponent }: BottomDrawerProps) => {
  const [isVisible, setIsVisible] = useState(showDrawer)
  const [isAnimating, setIsAnimating] = useState(false) // 애니메이션 상태

  useEffect(() => {
    if (showDrawer) {
      setIsVisible(true)
      setTimeout(() => setIsAnimating(true), 0)
    } else {
      setIsAnimating(false)
    }
  }, [showDrawer])

  const handleClickCloseButton = () => {
    setShowDrawer(false)
  }

  const handleClickDrawerItem = useCallback(
    (name: string) => {
      handleAddComponent(name)
      setShowDrawer(false)
    },
    [handleAddComponent],
  )

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setIsVisible(false)
    }, 600)
  }

  if (!isVisible) return null

  return (
    <div>
      <div
        className={`${styles.drawerContainer} ${isAnimating ? styles.open : styles.close}`}
        onAnimationEnd={handleAnimationEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.drawerBody}>
          <div className={styles.drawerHeader}>
            <h2 className="text-base font-semibold">콘텐츠 종류</h2>
            <div className="bottom-drawer__content__header__close">
              <button onClick={handleClickCloseButton}>
                <IoClose className="size-5" />
              </button>
            </div>
          </div>
          <div className={styles.drawerContent}>
            {DrawerItemArray.map((item, index) => (
              <DrawerItem
                key={item.name + index}
                {...item}
                onClickItem={() => handleClickDrawerItem(item.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(BottomDrawer)
