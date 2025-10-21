import React, { type InputHTMLAttributes } from 'react';
import styles from './app-input.module.scss';

interface IAppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function AppInput({ label, error, className, ...props }: IAppInputProps): React.ReactElement {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input 
        className={`${styles.input} ${error ? styles.error : ''} ${className || ''}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

