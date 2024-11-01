import {Link} from "react-router-dom";

import {useAuth} from "../sweet-mint/hooks/useAuth";
import {AUTH_ROLE, Status} from "../sweet-mint/types";
import {RegisterModel} from "../sweet-mint/modals/RegisterModal";
import {LoginModal} from "../sweet-mint/modals/LoginModal";
import {useModal} from "../sweet-mint/hooks/useModal";
import {useToggleBodyScroll} from "../sweet-mint/hooks/useToggleBodyScroll";

export const Login = () => {
  const {status, logoutUser, profile} = useAuth();
  const {
    isModalOpen: isModalRegisterOpen,
    openModal: openRegisterModal,
    closeModal: closeRegisterModal,
  } = useModal();
  const {
    isModalOpen: isModalLoginOpen,
    openModal: openLoginModal,
    closeModal: closeLoginModal,
  } = useModal();

  useToggleBodyScroll({isModalOpen: isModalLoginOpen});
  useToggleBodyScroll({isModalOpen: isModalRegisterOpen});
  const isAuthenticatedAdmin = status === Status.Authenticated && profile.role === AUTH_ROLE.CLIENT;

  return (
    <>
      <nav className="">
        <ul className="flex items-center justify-center gap-3 p-2">
          {isAuthenticatedAdmin ? (
            <>
              <li>
                <p className="uppercase">{profile.firstName}</p>
              </li>
              <li>|</li>
              <li>
                <Link className="uppercase" to={"/panel/admin"}>
                  Panel de administración
                </Link>
              </li>
              <li>|</li>
              <button onClick={logoutUser}>SALIR</button>
            </>
          ) : (
            <>
              <li>
                <button className="" onClick={() => openRegisterModal()}>
                  CREAR CUENTA
                </button>
              </li>
              <li>|</li>
              <li>
                <button onClick={() => openLoginModal()}>INICIAR SESIÓN</button>
              </li>
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
