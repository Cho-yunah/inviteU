import React, { createContext } from 'react'
import Header from '../accordion/Header';
import Content from '../accordion/Content';
import styles from './accordion.module.scss'
import AnimationAccordion from '../accordion/AnimationAccordion';

interface AccordionContextProps {
    active: boolean;
    toggle: () => void;
}

const AccordionContext = createContext<AccordionContextProps>({
    active: false,
    toggle: () => {}
})

export const useAccordion= () => {
    const context = React.useContext(AccordionContext);
    if (!context) {
        throw new Error('useAccordion must be used within an AccordionProvider');
    }
    return context;
};

const Accordion = ({children}: {children: React.ReactNode}) => {
    const [active, setActive] = React.useState(false);

    const toggle = () => {
        setActive(prev => !prev);
    }

    return (
        <AccordionContext.Provider value={{active, toggle}}>
            <div className={styles.contentStep}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
}

Accordion.Header = Header;
Accordion.Content = Content;
Accordion.Animation = AnimationAccordion;

export default Accordion;
