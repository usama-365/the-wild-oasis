import { useState } from "react";
import Button from "../../ui/Button.tsx";
import CreateOrEditCabinForm from "./CreateOrEditCabinForm.tsx";
import Modal from "../../ui/Modal.tsx";

export default function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function closeModal() {
    setIsOpenModal(false);
  }

  function openModal() {
    setIsOpenModal(true);
  }

  return (
    <div>
      <Button onClick={openModal}>Add new cabin</Button>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <CreateOrEditCabinForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
