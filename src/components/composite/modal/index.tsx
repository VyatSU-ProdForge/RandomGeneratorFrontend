import styles from './styles/modal.module.scss';

interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    showCloseButton?: boolean;
    className?: string;
  }
  
export function Modal({ 
children, 
isOpen, 
onClose,
showCloseButton = true,
className = ''
}: ModalProps): React.ReactElement | null {
    
    const handleCloseModal = (): void => {
      onClose();
    };
  
    const handleOverlayClick = (e: React.MouseEvent): void => {
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    };
  
    const handleModalClick = (e: React.MouseEvent): void => {
      e.stopPropagation();
    };
  
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        <div className={`${styles.modal} ${className}`} onClick={handleModalClick}>
          {showCloseButton && (
            <button className={styles.modalClose} onClick={handleCloseModal}>
              ×
            </button>
          )}
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    );
}