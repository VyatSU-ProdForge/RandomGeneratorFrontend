import React from 'react';
import styles from './styles/menu.module.scss';

export interface MenuItem {
  title: string;
  onClick: () => void;
  icon?: string;
  disabled?: boolean;
}

interface AppMenuProps {
  items: MenuItem[];
  onItemClick?: (item: MenuItem) => void; // опционально, если нужен кастомный обработчик
}

export function AppMenuData({ items, onItemClick }: AppMenuProps): React.ReactElement {
  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled) {
      if (onItemClick) {
        onItemClick(item);
      } else {
        item.onClick();
      }
    }
  };

  return (
    <div className={styles.menuContent}>
      <div className={styles.menuItems}>
        {items.map((item, index) => (
          <button
            key={index}
            className={`${styles.menuItem} ${item.disabled ? styles.disabled : ''}`}
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
          >
            {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
            <span className={styles.itemTitle}>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}