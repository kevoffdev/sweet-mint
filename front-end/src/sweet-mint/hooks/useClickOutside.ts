import {useEffect} from "react";

export const useClickOutside = ({
  modalRef,
  isOpen,
  onClose,
}: {
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
};
