import {useAuth} from "../sweet-mint/hooks/useAuth";
import {Status} from "../sweet-mint/types";

export const Login = () => {
  const {errorMessage, message, status, registerUser, loginUser, profile} = useAuth();

  console.log(errorMessage);

  return (
    <nav className="">
      <ul className="flex items-center justify-center gap-3 p-2">
        {status === Status.Authenticated ? (
          <>
            <li className="">
              <button className="uppercase" onClick={() => {}}>
                {profile.firstName}
              </button>
            </li>
            <li>|</li>
            <li className="">
              <button className="" onClick={() => {}}>
                SALIR
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                className=""
                onClick={() =>
                  registerUser({
                    firstName: "kevoff",
                    lastName: "suvia",
                    emailAdress: "kevinsuvia@gmail.com",
                    password: "123456",
                    confirmedPassword: "123456",
                  })
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
            {errorMessage && <li>{errorMessage}</li>}
            {message && <li>{message}</li>}
          </>
        )}
      </ul>
    </nav>
  );
};
