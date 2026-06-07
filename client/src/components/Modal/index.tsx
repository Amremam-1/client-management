"use client";

import Header from "../Header";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 p-4">
      <div className="dark:bg-darksec w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg">
        <Header
          name={name}
          buttonComponent={
            <button
              className="bg-blue-primary flex h-7 w-7 items-center justify-center rounded-full text-white"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          textSmall
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
