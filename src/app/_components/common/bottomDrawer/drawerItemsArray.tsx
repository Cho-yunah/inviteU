import { FaRegImage, FaRegFileVideo, FaMapLocationDot } from 'react-icons/fa6'
import { IoText } from 'react-icons/io5'
import { RxTextAlignMiddle } from 'react-icons/rx'

export interface DrawerItemType {
  name: string
  icon: JSX.Element
  text: string
}

export const DrawerItemArray: DrawerItemType[] = [
  { name: 'image', icon: <FaRegImage className="size-8" />, text: 'Image' },
  { name: 'video', icon: <FaRegFileVideo className="size-8" />, text: 'Video' },
  { name: 'text', icon: <IoText className="size-8" />, text: 'Text' },
  { name: 'interval', icon: <RxTextAlignMiddle className="size-8" />, text: 'Interval' },
  { name: 'map', icon: <FaMapLocationDot className="size-8" />, text: 'Map' },
]
