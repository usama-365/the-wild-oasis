import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { CabinType } from "../../services/supabase.ts";
import { formatCurrency } from "../../utils/helpers.ts";
import CreateOrEditCabinForm from "./CreateOrEditCabinForm.tsx";
import useDeleteCabin from "./useDeleteCabin.ts";
import useCreateCabin from "./useCreateCabin.ts";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import Table from "../../ui/Table.tsx";

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
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabin_id,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
  } = cabin;

  function handleDuplicate() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: cabinId, ...cabinWithoutId } = cabin;
    createCabin({ ...cabinWithoutId, name: `Copy of ${name}` });
  }

  return (
    <>
      <Table.Row>
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
          {/* Duplicate button */}
          <button disabled={isCreating} onClick={() => handleDuplicate()}>
            <HiSquare2Stack />
          </button>

          {/* Buttons that will triger modals */}
          <Modal>
            {/* Update button inside modal */}
            <Modal.Open opens="update-cabin">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="update-cabin">
              <CreateOrEditCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            {/* Delete button inside modal */}
            <Modal.Open opens="delete-cabin">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName="cabins"
                onConfirm={() => deleteCabin(cabin_id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
