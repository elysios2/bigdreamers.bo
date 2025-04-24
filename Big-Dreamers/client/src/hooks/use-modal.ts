import { useState, createContext, useContext } from 'react';

type ModalType = 'subscribe' | 'plan' | null;

interface ModalContextType {
  activeModal: ModalType;
  modalData: string | null;
  openModal: (type: ModalType, data?: string) => void;
  closeModal: () => void;
}

// Create a context with default values
const ModalContext = createContext<ModalContextType>({
  activeModal: null,
  modalData: null,
  openModal: () => {},
  closeModal: () => {},
});

// Custom hook to use the modal context
export function useModal() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<string | null>(null);
  
  const openModal = (type: ModalType, data?: string) => {
    setActiveModal(type);
    if (data) {
      setModalData(data);
    }
  };
  
  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };
  
  return {
    activeModal,
    modalData,
    openModal,
    closeModal,
  };
}
