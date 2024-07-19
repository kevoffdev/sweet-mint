import {SortBy} from "../types";

export const SortBySelect = ({onChange}: {onChange: (value: SortBy) => void}) => {
  return (
    <select
      className="border-2 px-4 py-3 outline-none"
      onChange={(e) => onChange(e.target.value as SortBy)}
    >
      <option value={SortBy.OLDTONEW}>Más viejo a más nuevo</option>
      <option value={SortBy.NEWTOOLD}>Más nuevo a más viejo</option>
      <option value={SortBy.HIGHESTTOLOWESTPRICE}>Precio mayor a menor</option>
      <option value={SortBy.LOWESTTOHIGHESTPRICE}>Precio menor a mayor</option>
    </select>
  );
};
