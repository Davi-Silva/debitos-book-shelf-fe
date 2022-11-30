import { ReactNode } from 'react';

export type ModalProps = {
  children: ReactNode | ReactNode[];
  title: string;
  onClose: () => void;
};
