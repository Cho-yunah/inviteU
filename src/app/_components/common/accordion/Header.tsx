'use client'
import React from 'react'
import Image from 'next/image'
import cx from 'classnames'
import styles from './accordion.module.scss'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useAccordion } from './Accordion'

interface AccordionHeaderProps {
    children: string | React.ReactNode;
    className?: string;
}

const Header = ({children, className}: AccordionHeaderProps) => {
    const {active, toggle} = useAccordion();
    return (
        <div className={styles.contentHeader}>
            <Switch id="contents-switch" defaultChecked={false} checked={active} onCheckedChange={toggle} />
            <Label htmlFor="contents-switch" className='pl-2 font-bold text-gray-800'>{children}</Label>
            <button
            type="button"
            className={cx(styles.toggleButton, {
                [styles.toggleIsClosed]: active === false,
            })}
            onClick={toggle}
            >
            <Image src="./Chevron.svg" alt='Chevron' width={24} height={24} />
            </button>
        </div>
    )
};

export default Header;