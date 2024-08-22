import {ProductProps, SortBy} from "../sweet-mint/types";

export const getProductsSorted = (sortBy: SortBy, products: ProductProps[]) => {
  switch (sortBy) {
    case SortBy.HIGHESTTOLOWESTPRICE:
      return [...products].sort((a, b) => b.price - a.price);
    case SortBy.LOWESTTOHIGHESTPRICE:
      return [...products].sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};
