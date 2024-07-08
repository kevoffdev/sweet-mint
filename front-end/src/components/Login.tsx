import {Link} from "react-router-dom";

export const Login = () => {
  return (
    <nav>
      <ul className="flex gap-3">
        <li>
          <Link className="" to="/">
            Crear cuenta
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link to="#">Iniciar sesión</Link>
        </li>
      </ul>
    </nav>
  );
};
