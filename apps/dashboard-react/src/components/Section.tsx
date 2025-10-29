import React from 'react';
import styles from '../pages/Dashboard.module.css';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className }) => (
  <section className={styles.section + (className ? ` ${className}` : '')}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    {children}
  </section>
);
