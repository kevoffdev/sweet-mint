import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {useAuth} from "../sweet-mint/hooks/useAuth";
import {Status} from "../sweet-mint/types";
import {RegisterModel} from "../sweet-mint/modals/RegisterModal";
import {LoginModal} from "../sweet-mint/modals/LoginModal";

export const Login = () => {
  const {status, logoutUser, profile} = useAuth();
  const [isModalRegisterOpen, setModalRegisterOpen] = useState(false);
  const [isModalLoginOpen, setModalLoginOpen] = useState(false);

  useEffect(() => {
    if (isModalRegisterOpen || isModalLoginOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "auto";
    }
  }, [isModalRegisterOpen, isModalLoginOpen]);

  const isAuthenticated = status === Status.Authenticated;
  const openRegisterModal = () => setModalRegisterOpen(true);
  const closeRegisterModal = () => setModalRegisterOpen(false);
  const openLoginModal = () => setModalLoginOpen(true);
  const closeLoginModal = () => setModalLoginOpen(false);

  return (
    <>
      <nav className="">
        <ul className="flex items-center justify-center gap-3 p-2">
          <li>
            {isAuthenticated ? (
              <p className="uppercase">{profile.firstName}</p>
            ) : (
              <button className="" onClick={() => openRegisterModal()}>
                CREAR CUENTA
              </button>
            )}
          </li>
          <li>|</li>
          <li>
            {isAuthenticated ? (
              <Link className="uppercase" to={"/panel/admin"}>
                Panel de administración
              </Link>
            ) : (
              <button onClick={() => openLoginModal()}>INICIAR SESIÓN</button>
            )}
          </li>
          {isAuthenticated && (
            <>
              <li>|</li>
              <button>SALIR</button>
            </>
          )}
        </ul>
      </nav>
      {isModalRegisterOpen && (
        <RegisterModel isOpen={isModalRegisterOpen} onClose={closeRegisterModal} />
      )}
      {isModalLoginOpen && <LoginModal isOpen={isModalLoginOpen} onClose={closeLoginModal} />}
    </>
  );
};
