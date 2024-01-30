import styled from "styled-components";
import { useState } from "react";

import { CabinType } from "../../services/supabase.ts";
import { formatCurrency } from "../../utils/helpers.ts";
import CreateOrEditCabinForm from "./CreateOrEditCabinForm.tsx";
import useDeleteCabin from "./useDeleteCabin.ts";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono", serif;
`;

const Price = styled.div`
  font-family: "Sono", serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono", serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

type CabinRowProps = {
  cabin: CabinType;
};

export default function CabinRow({ cabin }: CabinRowProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabin_id,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
  } = cabin;

  return (
    <>
      <TableRow role={"row"}>
        <Img src={image || ""} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {max_capacity} guests</div>
        <Price>{formatCurrency(regular_price || 0)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => setShowEditForm((prevState) => !prevState)}>
            Edit
          </button>
          <button onClick={() => deleteCabin(cabin_id)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>
      {showEditForm && <CreateOrEditCabinForm cabinToEdit={cabin} />}
    </>
  );
}
