// 'use client'
import React from 'react';
import { useAccordion } from "./Accordion";

interface AccordionContentProps {
    children: React.ReactNode;
    className?: string;
    description: string;
    contentRef?: React.MutableRefObject<HTMLDivElement>;
    duration?: number;  
}

const Content: React.FC<AccordionContentProps> = ({children, className, description,  contentRef, duration=1000}) => {
    const {active} = useAccordion();

    if (duration && duration > 0) {
        const animateStyle: React.CSSProperties = {
          visibility: !active? 'hidden' : 'visible',
          pointerEvents: !active ? 'none' : 'auto',
          transition : `max-height ${duration}ms ease-in-out`
        };
        return (
          <div ref={contentRef} style={animateStyle} className={className}>
            <p>{description}</p>
            {children}
          </div>
        );
    }

    return (<>
        { active && (
            <div ref={contentRef} className={className}>
                {children}
            </div>
        )}
    </>
    )
}

export default Content;