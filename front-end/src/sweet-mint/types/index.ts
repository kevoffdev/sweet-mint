export interface ProductProps {
  title: string;
  price: number;
  categoria: string;
  tipo: string;
  image: string;
  quantity: number;
  id: number;
}

export interface CartContextProps {
  productsCart: Record<string, { quantity: number }>;
  addProduct: ({
    id,
    quantity,
  }: {
    id: ProductProps["id"];
    quantity: number;
  }) => void;
  removeProduct: (id: ProductProps["id"]) => void;
}

export enum SortBy {
  OLDTONEW = "oldToNew",
  NEWTOOLD = "newToOld",
  HIGHESTTOLOWESTPRICE = "highestToLowestPrice",
  LOWESTTOHIGHESTPRICE = "lowestToHighestPrice",
}
