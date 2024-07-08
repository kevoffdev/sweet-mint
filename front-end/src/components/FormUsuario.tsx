export const FormUsuario = () => {
  return (
    <form className="block">
      <input
        className="border border-black p-2 outline-none blur-none"
        placeholder="Buscar..."
        type="text"
      />
      <input className="cursor-pointer border border-black bg-black p-2 text-white" type="submit" />
    </form>
  );
};
