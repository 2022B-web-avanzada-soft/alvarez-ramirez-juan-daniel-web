// Component for a product

import React from "react";
export interface ProductProps {
  name: string;
  id: string;
  price: number;
  description: string;
}

export const ProductTemplate = ({
  name,
  id,
  price,
  description,
}: ProductProps) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{price}</td>
      <td>{description}</td>
    </tr>
  );
};
