import React, { useEffect, useState } from 'react'
import styles from './drawer.module.scss'
import { FaRegImage, FaRegFileVideo, FaMapLocationDot } from 'react-icons/fa6'
import { IoText, IoClose } from 'react-icons/io5'
import { RxTextAlignMiddle } from 'react-icons/rx'

interface BottomDrawerProps {
  showDrawer: boolean
  setShowDrawer: (showDrawer: boolean) => void
  handleAddComponent: (component: any) => void
}

const BottomDrawer = ({ showDrawer, setShowDrawer, handleAddComponent }: BottomDrawerProps) => {
  const [isVisible, setIsVisible] = useState(showDrawer)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (showDrawer) {
      setIsVisible(true)
      setIsClosing(false)
    } else {
      setIsClosing(true)
      handleAnimationEnd()
    }
  }, [showDrawer])

  const handleClickCloseButton = () => {
    setIsClosing(true)
    setShowDrawer(false)
  }

  const handleClickDrawerItem = (e: any) => {
    // console.log(e.currentTarget.id);
    handleAddComponent(e.currentTarget.id)
    setIsClosing(true)
    setShowDrawer(false)
  }

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setIsVisible(false)
    }, 600)
  }

  if (!showDrawer && !isVisible) return null

  return (
    <div>
      <div className={`${styles.drawerContainer} ${isClosing ? styles.close : styles.open}`}>
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
            <button className={styles.drawerItem} onClick={handleClickDrawerItem} id="image">
              <div className={styles.icon}>
                <FaRegImage className="size-8" />
              </div>
              <p>Image</p>
            </button>
            <button className={styles.drawerItem} onClick={handleClickDrawerItem} id="video">
              <div>
                <FaRegFileVideo className="size-8" />
              </div>
              <p>Video</p>
            </button>
            <button className={styles.drawerItem} onClick={handleClickDrawerItem} id="text">
              <div>
                <IoText className="size-8" />
              </div>
              <p>Text</p>
            </button>
            <button className={styles.drawerItem} onClick={handleClickDrawerItem} id="interval">
              <div>
                <RxTextAlignMiddle className="size-8" />
              </div>
              <p>Interval</p>
            </button>
            <button className={styles.drawerItem} onClick={handleClickDrawerItem} id="map">
              <div>
                <FaMapLocationDot className="size-8" />
              </div>
              <p>Map</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomDrawer
