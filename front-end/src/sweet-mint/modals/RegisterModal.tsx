import {useEffect, useRef} from "react";

export const RegisterModel = ({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) => {
  const modalRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="fixed top-0 right-0 z-50 flex items-center justify-center w-full h-full transition-opacity duration-300 ease-in-out bg-black bg-opacity-50">
      <div ref={modalRef} className="relative w-[480px] overflow-auto bg-white p-6 shadow-lg">
        <form className="flex flex-col max-w-sm mx-auto">
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-black" onClick={onClose}>
              &times;
            </button>
          </div>
          <p className="p-1 font-bold text-center">Registraté</p>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">
              Ingresá tu email
            </label>
            <input
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              id="email"
              placeholder="Escribe tu email"
              type="email"
            />
          </div>
          <div className="flex gap-3 mb-2">
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="name">
                Ingresá tu nombre
              </label>
              <input
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                id="name"
                placeholder="Escribe tu nombre"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="lastName">
                Ingresá tu apellido
              </label>
              <input
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                id="lastName"
                placeholder="Escribe tu apellido"
                type="text"
              />
            </div>
          </div>
          <div className="flex gap-3 mb-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="password">
                Ingresá tu contraseña
              </label>
              <input
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                id="password"
                placeholder="Escribe tu contraseña"
                type="password"
              />
            </div>
            <div className="mb-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="repeatPassword"
              >
                Repite tu contraseña
              </label>
              <input
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                id="repeatassword"
                placeholder="Repite tu contraseña"
                type="password"
              />
            </div>
          </div>
          {/* <div className="flex items-start mb-5">            <div className="flex items-center h-5">              <input                id="remember"                type="checkbox"                value=""                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"                required                />                </div>                <label                htmlFor="remember"              className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"              >              Remember me            </label>          </div> */}{" "}
          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
