import {FormEvent} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const FormUsuario = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const query = new URLSearchParams(useLocation().search).get("query");
  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const search = formData.get("search");

    search ? navigate(`${pathname}?query=${search}`) : navigate(pathname);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border border-black p-2 outline-none blur-none"
        defaultValue={query ?? ""}
        name="search"
        placeholder="Buscar..."
        type="text"
      />
      <input className="cursor-pointer border border-black bg-black p-2 text-white" type="submit" />
    </form>
  );
};
