import styles from './FunnelStep.module.css';

export interface FunnelStepProps {
  title: string;
  value: string | number;
  className?: string;
}

export const FunnelStep: React.FC<FunnelStepProps> = ({
  title,
  value,
  className,
}) => {
  return (
    <div className={`${styles.funnelStep} ${className || ''}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
};
