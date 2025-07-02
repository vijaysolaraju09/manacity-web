import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { useTheme } from '../../hooks/useTheme';
import styles from './SettingsModal.module.scss';

interface Props {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const SettingsModal = ({ open, onClose, onLogout }: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <AiOutlineClose />
            </button>
            <h3>Settings</h3>
            <div className={styles.themeOptions}>
              <button
                onClick={() => setTheme('light')}
                className={theme === 'light' ? styles.active : ''}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={theme === 'dark' ? styles.active : ''}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('colored')}
                className={theme === 'colored' ? styles.active : ''}
              >
                Colored
              </button>
            </div>
            <button className={styles.logoutBtn} onClick={onLogout}>
              Logout
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
