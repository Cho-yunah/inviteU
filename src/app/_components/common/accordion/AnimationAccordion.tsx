import React, { useEffect } from 'react';
import { useAccordion } from './index';
import { cx } from 'class-variance-authority';
import styles from './accordion.module.scss';

interface Props {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

const AnimationAccordion = ({ children, duration = 1500, className }: Props) => {
  const { active } = useAccordion();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = React.useState(0);

  const childrenElement = React.cloneElement(children as React.ReactElement, { contentRef, duration });

  const handleHeight = () => {
    if (!contentRef.current) {
      setMaxHeight(0);
      return;
    }
    setMaxHeight(active ? contentRef.current.clientHeight : 0);
  };

  useEffect(() => {
    requestAnimationFrame(handleHeight);
  }, [active]);

  return (
    <div className={cx(styles.animate, className)} style={{ maxHeight }}>
      {childrenElement}
    </div>
  );
};

export default AnimationAccordion;