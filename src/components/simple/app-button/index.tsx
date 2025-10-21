import React, { type ButtonHTMLAttributes } from 'react';
import styles from './app-button.module.scss';

interface IAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'google';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function AppButton({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  icon,
  className, 
  ...props 
}: IAppButtonProps): React.ReactElement {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}

