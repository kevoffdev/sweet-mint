import {FormEvent, useEffect, useRef} from "react";
import {Toaster, toast} from "sonner";

import {useAuth} from "../hooks/useAuth";
import {useClickOutside} from "../hooks/useClickOutside";

export const LoginModal = ({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) => {
  const {loginUser, errorMessage, cleanErrorMessage} = useAuth();
  const modalRef = useRef<null | HTMLDivElement>(null);

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (password.length < 6) {
      console.log("debe tener mas de 6 caracteres");
      toast.error("debe tener mas de 6 caracteres");

      return;
    }

    loginUser({
      emailAdress: email,
      password,
    });

    form.reset();
    // onClose();
  }

  useClickOutside({modalRef, isOpen, onClose});

  useEffect(() => {
    if (errorMessage?.length) {
      toast.error(errorMessage);
      cleanErrorMessage();
    }
  }, [errorMessage]);

  return (
    <div className="fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <Toaster />
      <div ref={modalRef} className="relative w-[480px] overflow-auto bg-white p-6 shadow-lg">
        <form className="mx-auto flex max-w-sm flex-col" onSubmit={handleForm}>
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-black" onClick={onClose}>
              &times;
            </button>
          </div>
          <p className="p-1 text-center font-bold">Inicia sesión</p>
          <div className="mb-2">
            <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="email">
              Ingresá tu email
            </label>
            <input
              required
              autoComplete="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              id="email"
              name="email"
              placeholder="Escribe tu email"
              type="email"
            />
          </div>
          <div className="mb-2">
            <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="password">
              Ingresá tu contraseña
            </label>
            <input
              required
              autoComplete="new-password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              id="password"
              name="password"
              placeholder="Escribe tu contraseña"
              type="password"
            />
          </div>
          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
