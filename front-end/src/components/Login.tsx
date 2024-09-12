import {useEffect, useState} from "react";

import {useAuth} from "../sweet-mint/hooks/useAuth";
import {Status} from "../sweet-mint/types";
import {RegisterModel} from "../sweet-mint/modals/RegisterModal";

export const Login = () => {
  const {errorMessage, message, status, registerUser, loginUser, logoutUser, profile} = useAuth();
  const [isModalLoginOpen, setModalLoginOpen] = useState(false);

  useEffect(() => {
    if (isModalLoginOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "auto";
    }
  }, [isModalLoginOpen]);
  const openModal = () => setModalLoginOpen(true);
  const closeModal = () => setModalLoginOpen(false);

  return (
    <>
      <nav className="">
        <ul className="flex items-center justify-center gap-3 p-2">
          {status === Status.Authenticated ? (
            <>
              <li className="">
                <button
                  className="uppercase"
                  onClick={() => {
                    console.log(1);
                  }}
                >
                  {profile.firstName}
                </button>
              </li>
              <li>|</li>
              <li className="">
                <button className="" onClick={() => logoutUser()}>
                  SALIR
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className=""
                  onClick={
                    () =>
                      // registerUser({
                      // firstName: "kevoff",
                      // lastName: "suvia",
                      // emailAdress: "kevinsuvia@gmail.com",
                      // password: "123456",
                      // confirmedPassword: "123456",
                      // })
                      openModal()
                    // console.log(modalLogin);
                  }
                >
                  CREAR CUENTA
                </button>
              </li>
              <li>|</li>
              <li>
                <button
                  onClick={() =>
                    loginUser({
                      emailAdress: "kevinsuvia@gmail.com",
                      password: "123456",
                    })
                  }
                >
                  INICIAR SESIÓN
                </button>
              </li>
              {/* {errorMessage && <li>{errorMessage}</li>} /}
{/ {message && <li>{message}</li>} */}
            </>
          )}
        </ul>
      </nav>
      {isModalLoginOpen && <RegisterModel isOpen={isModalLoginOpen} onClose={closeModal} />}
    </>
  );
};
