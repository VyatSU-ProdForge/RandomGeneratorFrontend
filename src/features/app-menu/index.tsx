import { Modal } from '@/components/composite/modal';
import { AppMenuData, type MenuItem } from './menu';
import { useAuthContext } from '@/providers/use-auth-context';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/app/navigation/routes';

export function AppMenuModal({isModalOpen, onClose}: {isModalOpen: boolean, onClose: () => void}): React.ReactElement {

  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      title: 'Проверка честности',
      icon: '🔍',
      onClick: () => {
        onClose();
        navigate(RoutePath.Audit);
      }
    },
    {
      title: 'Как работает алгоритм', 
      icon: '❓',
      onClick: () => {
        onClose();
        navigate(RoutePath.Algorithm);
      }
    },
    {
      title: 'Выйти',
      icon: '🚪',
      onClick: () => {
        onClose();
        logout();
        navigate(RoutePath.Login)
      }
    }
  ];

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={onClose}
      >
        <AppMenuData items={menuItems} />
      </Modal>
    </div>
  );
}