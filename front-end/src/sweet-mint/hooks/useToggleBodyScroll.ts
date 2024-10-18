import {useEffect} from "react";

export const useToggleBodyScroll = ({isModalOpen}: {isModalOpen: boolean}) => {
  useEffect(() => {
    if (isModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);
};
