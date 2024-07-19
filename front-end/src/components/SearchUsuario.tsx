import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const SearchUsuario = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const onChange = (value: string) => {
    setSearch(value);
    value ? navigate(`${pathname}?query=${value}`) : navigate(pathname);
  };

  return (
    <div className="grid grid-cols-[1fr,40px]">
      <input
        className="border border-black p-2 outline-none blur-none"
        placeholder="Buscar..."
        type="text"
        value={search}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="flex cursor-pointer items-center justify-center border border-black bg-black text-white">
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
