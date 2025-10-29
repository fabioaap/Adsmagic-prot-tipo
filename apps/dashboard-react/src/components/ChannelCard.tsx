import styles from './ChannelCard.module.css';

export interface ChannelCardProps {
  name: string;
  value: string | number;
  percentage: string;
  className?: string;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  name,
  value,
  percentage,
  className,
}) => {
  return (
    <div className={`${styles.channelCard} ${className || ''}`}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.value}>{value}</p>
      <p className={styles.percentage}>{percentage}</p>
    </div>
  );
};
